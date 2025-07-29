import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { MemberAuthType, MemberType } from '../../enums/member.enum';
import { ViewGroup } from '../../enums/view.enum';
import { ObjectId } from 'mongoose';
import { ViewModule } from 'apps/ease-up-api/src/components/view/view.module';

@InputType()
export class ViewInput {
	@IsNotEmpty()
	@Field(() => String)
	viewRefId: ObjectId;
	@IsNotEmpty()
	@Field(() => String)
	memberId: ObjectId;
	@IsNotEmpty()
	@Field(() => ViewGroup)
	viewGroup: ViewModule;
}
