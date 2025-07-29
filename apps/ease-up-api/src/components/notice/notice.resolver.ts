import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NoticeService } from './notice.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Notice, Notices } from '../../libs/dto/notice/notice';
import { AllNoticesInquiry, NoticeInput, NoticesInquiry } from '../../libs/dto/notice/notice.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { NoticeUpdate } from '../../libs/dto/notice/notice.update';
import { shapeIntoMogoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';
import { AllBoardArticlesInquiry } from '../../libs/dto/board-article/board-article.input';

@Resolver()
export class NoticeResolver {
	constructor(private readonly noticeService: NoticeService) {}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Notice)
	public async createNotice(@Args('input') input: NoticeInput, @AuthMember('_id') memberId: ObjectId): Promise<Notice> {
		console.log('Mutation: createNotice');
		input.memberId = memberId;
		return await this.noticeService.createNotice(input);
	}

	@UseGuards(WithoutGuard)
	@Query((returns) => Notices)
	public async getNotices(
		@Args('input') input: NoticesInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notices> {
		console.log('Query: getNotices');
		return await this.noticeService.getNotices(memberId, input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query((returns) => Notices)
	public async getAllNoticesByAdmin(
		@Args('input') input: AllNoticesInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notices> {
		console.log('Query: getAllNoticesByAdminn');
		return await this.noticeService.getAllNoticesByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Notice)
	public async updateNotice(@Args('input') input: NoticeUpdate): Promise<Notice> {
		console.log('Mutataion: updateNotice');
		input._id = shapeIntoMogoObjectId(input._id);
		return await this.noticeService.updateNotice(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Notice)
	public async removeNotice(@Args('noticeId') input: string): Promise<Notice> {
		console.log('Mutattion: removeBoardArticleByAdmin');
		const articleId = shapeIntoMogoObjectId(input);
		return await this.noticeService.removeNotice(articleId);
	}
}
