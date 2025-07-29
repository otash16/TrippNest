import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId, Schema } from 'mongoose';
import { shapeIntoMogoObjectId } from '../../libs/config';
import { Notifications, Notification } from '../../libs/dto/notification/notification';

import { NotificationsInquiry } from '../../libs/dto/notification/notification.input';

@Resolver()
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}

	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	public async updateNotification(
		@Args('input') input: NotificationUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notification> {
		console.log('Mutation: notificationUpdate ');
		input._id = shapeIntoMogoObjectId(input._id);
		return await this.notificationService.updateNotification(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Query(() => Notifications)
	public async getUserNotifications(
		@Args('input') input: NotificationsInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notifications> {
		console.log('Query: getUserNotifications');
		return await this.notificationService.getUserNotifications(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	public async removeNotification(@Args('notificationId') input: string): Promise<Notification> {
		console.log('Mutation: removeNotification');
		const productId = shapeIntoMogoObjectId(input);
		return await this.notificationService.removeNotification(productId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Boolean)
	public async markAllNotificationsAsRead(@AuthMember('_id') memberId: ObjectId): Promise<boolean> {
		console.log('Mutation: Mark all notifications as READ');
		const updatedCount = await this.notificationService.markAllNotificationsAsRead(memberId);
		return updatedCount > 0; // Return true if any notifications were marked as READ
	}
}
