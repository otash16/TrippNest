import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { GraphQLUpload, FileUpload } from 'graphql-upload';


import { Member, Members } from '../../libs/dto/member/member';

import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { WithoutGuard } from '../auth/guards/without.guard';
import { getSerialForImage, shapeIntoMogoObjectId, validMimeTypes } from '../../libs/config';
import { Message } from '../../libs/enums/common.enum';
import { createWriteStream } from 'fs';
import path from 'path';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Member)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		console.log('Mutation: signup');
		console.log('input:', input);
		return await this.memberService.signup(input);
	}

	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		try {
			console.log('Mutation: login');
			return await this.memberService.login(input);
		} catch (err) {
			console.log('Error, signup', err);
			throw new InternalServerErrorException(err);
		}
	}

	// Authenticated

	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('Query: checkAuth');
		console.log('memberNick:', memberNick);
		// console.log(typeof memberId);
		// console.log(memberId);
		return `Hi ${memberNick}`;
	}

	@Roles(MemberType.USER, MemberType.AGENT)
	@UseGuards(RolesGuard)
	@Query(() => String)
	public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {
		console.log('Query: checkAuth');
		// console.log('memberNick:', memberNick);
		// console.log(typeof memberId);
		// console.log(memberId);
		return `Hi ${authMember.memberNick} you are ${authMember.memberType} (memberId: ${authMember._id})`;
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Member)
	public async updateMember(
		@Args('input') input: MemberUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Member> {
		console.log('Mutation: updateMember');
		delete input._id;
		return await await this.memberService.updateMember(memberId, input);
	}

	@UseGuards(WithoutGuard)
	@Query(() => Member)
	public async getMember(
		@Args('memberId') input: string,
		@AuthMember('_id') memberId: ObjectId, //
	): Promise<Member> {
		console.log('Mutation: getMember');
		const targetId = shapeIntoMogoObjectId(input);
		return await this.memberService.getMember(memberId, targetId);
	}

	@UseGuards(WithoutGuard)
	@Query(() => Members)
	public async getAgents(@Args('input') input: AgentsInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Members> {
		console.log('Query: getAgents');
		return await this.memberService.getAgents(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Member)
	public async likeTargetMember(
		@Args('memberId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Member> {
		console.log('Mutation: likeTargetmember');
		const likeRefId = shapeIntoMogoObjectId(input);
		return await this.memberService.likeTargetMember(memberId, likeRefId);
	}

	/** ADMIN */

	// Authorization
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query(() => Members)
	public async getAllMemberByAdmin(@Args('input') input: MembersInquiry): Promise<Members> {
		console.log('Mutation: getAllMemberByAdmin');
		return await this.memberService.getAllMemberByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Member)
	public async updateMemberByAdmin(@Args('input') input: MemberUpdate): Promise<Member> {
		console.log('Mutation: updateMemberByAdmin');
		return await this.memberService.updateMemberByAdmin(input);
	}

	/** UPLOADER **/
	@UseGuards(AuthGuard)
	@Mutation((returns) => String)
	public async imageUploader(
		@Args({ name: 'file', type: () => GraphQLUpload })
		{ createReadStream, filename, mimetype }: FileUpload,
		@Args('target') target: String,
	): Promise<string> {
		console.log('Mutation: imageUploader');

		if (!filename) throw new Error(Message.UPLOAD_FAILED);
		const validMime = validMimeTypes.includes(mimetype);
		if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

		const imageName = getSerialForImage(filename);
		const url = `uploads/${target}/${imageName}`;
		const stream = createReadStream();

		const result = await new Promise((resolve, reject) => {
			stream
				.pipe(createWriteStream(url))
				.on('finish', async () => resolve(true))
				.on('error', () => reject(false));
		});
		if (!result) throw new Error(Message.UPLOAD_FAILED);

		return url;
	}

	@UseGuards(AuthGuard)
@Mutation(() => [String])
public async imagesUploader(
  @Args('files', { type: () => [GraphQLUpload] })
  files: Promise<FileUpload>[],
  @Args('target') target: string,
): Promise<string[]> {
  console.log('Mutation: imagesUploader');

  const uploadedImages: string[] = [];

  const promisedList = files.map(async (imgPromise: Promise<FileUpload>) => {
    try {
      const { filename, mimetype, createReadStream } = await imgPromise;

      const validMime = validMimeTypes.includes(mimetype);
      if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

      const imageName = getSerialForImage(filename);
      const url = `uploads/${target}/${imageName}`;
      const stream = createReadStream();

      await new Promise<void>((resolve, reject) => {
        stream
          .pipe(createWriteStream(url))
          .on('finish', () => resolve())
          .on('error', (err) => reject(err));
      });

      uploadedImages.push(url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  });

  await Promise.all(promisedList);

  if (uploadedImages.length === 0) {
    throw new Error('No images were uploaded');
  }

  return uploadedImages;
}
}