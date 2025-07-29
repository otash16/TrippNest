import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import { PropertyService } from '../property/property.service';
import { BoardArticleService } from '../board-article/board-article.service';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';
import { Comment, Comments } from '../../libs/dto/comment/comment';
import { T } from '../../libs/types/common';
import { lookupMember } from '../../libs/config';
import { NotificationService } from '../notification/notification.service';
import { NotificationGroup, NotificationType } from '../../libs/enums/notification.enum';
import { NotificationInput } from '../../libs/dto/notification/notification.input';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel('Comment') private readonly commentModel: Model<Comment>,
		private readonly memberService: MemberService,
		private readonly propertyService: PropertyService,
		private readonly boardArticleService: BoardArticleService,
		private readonly notificationService: NotificationService,
	) {}

	public async createComment(memberId: ObjectId, input: CommentInput): Promise<Comment> {
		input.memberId = memberId;
		let result = null;
		try {
			result = await this.commentModel.create(input);
		} catch (err) {
			console.log('Error on createComment', err.message);
			throw new BadRequestException(Message.CREATED_FAILED);
		}
		switch (input.commentGroup) {
			case CommentGroup.PROPERTY:
				const productReceiverId = await this.propertyService.getMemberId(input.commentRefId);
				const property = await this.propertyService.getProperty(null, input.commentRefId);
				const pCommentWriter = await this.memberService.getMember(null, memberId);
				if (memberId.toString() !== productReceiverId.toString()) {
					const productNotification: NotificationInput = {
						notificationType: NotificationType.COMMENT,
						notificationGroup: NotificationGroup.PROPERTY,
						notificationTitle: `${pCommentWriter.memberNick} commented on your product "${property.propertyTitle}"`,
						authorId: memberId,
						receiverId: productReceiverId,
						productId: input.commentRefId,
						articleId: null,
					};
					await this.notificationService.createNotification(productNotification);
				}

				await this.propertyService.propertyStatsEditor({
					_id: input.commentRefId,
					targetKey: 'productComments',
					modifier: 1,
				});
				break;
				break;
			case CommentGroup.ARTICLE:
				const articleComReciverId = await this.boardArticleService.getMemberId(input.commentRefId);
				const article = await this.boardArticleService.getBoardArticle(null, input.commentRefId);
				const aCommentWriter = await this.memberService.getMember(null, memberId);
				if (memberId.toString() !== articleComReciverId.toString()) {
					const articleNotification: NotificationInput = {
						notificationType: NotificationType.COMMENT,
						notificationGroup: NotificationGroup.ARTICLE,
						notificationTitle: `${aCommentWriter.memberNick} commented on your artincle "${article.articleTitle}"`,
						authorId: memberId,
						receiverId: articleComReciverId,
						productId: null,
						articleId: input.commentRefId,
					};
					await this.notificationService.createNotification(articleNotification);
				}

				await this.boardArticleService.boardArticleStatsEditor({
					_id: input.commentRefId,
					targetKey: 'articleComments',
					modifier: 1,
				});
				break;
				break;
			case CommentGroup.MEMBER:
				const CommentWriter = await this.memberService.getMember(null, memberId);
				if (memberId.toString() !== input.commentRefId.toString()) {
					const memberNotification: NotificationInput = {
						notificationType: NotificationType.COMMENT,
						notificationGroup: NotificationGroup.MEMBER,
						notificationTitle: `${CommentWriter.memberNick} left comment on you`,
						authorId: memberId,
						receiverId: input.commentRefId,
						productId: null,
						articleId: null,
					};
					await this.notificationService.createNotification(memberNotification);
				}
				await this.memberService.memberStatsEditor({
					_id: input.commentRefId,
					targetKey: 'memberComments',
					modifier: 1,
				});
				break;
		}
		if (!result) throw new InternalServerErrorException(Message.CREATED_FAILED);
		return result;
	}

	public async updateComment(memberId: ObjectId, input: CommentUpdate): Promise<Comment> {
		const { _id } = input;
		const result = await this.commentModel.findOneAndUpdate(
			{
				_id: _id,
				memberId: memberId,
				commentStatus: CommentStatus.ACTIVE,
			},
			input,
			{ new: true },
		);
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}

	public async getComments(memberId: ObjectId, input: CommentsInquiry): Promise<Comments> {
		const { commentRefId } = input.search;
		const match: T = { commentRefId: commentRefId, commentStatus: CommentStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
		const result: Comments[] = await this.commentModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result[0];
	}

	public async removeCommentByAdmin(input: ObjectId): Promise<Comment> {
		const result = await this.commentModel.findByIdAndDelete(input);
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}
}
