import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { FaqCategory, FaqStatus } from '../../enums/faq.enum';
import { ObjectId } from 'mongoose';
import { availabeFaqSorts } from '../../config';
import { Direction } from '../../enums/common.enum';

@InputType()
export class FaqInput {
	@IsNotEmpty()
	@Field(() => FaqCategory)
	faqCategory: FaqCategory;

	@IsNotEmpty()
	@Length(3, 50)
	@Field(() => String)
	faqTitle: string;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	faqContent: string;

	memberId?: ObjectId;
}

@InputType()
export class FaqsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availabeFaqSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;
}

@InputType()
class AFISearch {
	@IsOptional()
	@Field(() => FaqStatus, { nullable: true })
	faqStatus?: FaqStatus;

	@IsOptional()
	@Field(() => FaqCategory, { nullable: true })
	faqCategory?: FaqCategory;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class AllFaqsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availabeFaqSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => AFISearch)
	search: AFISearch;
}
