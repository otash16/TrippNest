import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Faq, Faqs } from '../../libs/dto/faq/faq';
import { AllFaqsInquiry, FaqInput } from '../../libs/dto/faq/faq.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';
import { FaqStatus } from '../../libs/enums/faq.enum';
import { lookupMember } from '../../libs/config';
import { FaqUpdate } from '../../libs/dto/faq/faq.update';
import * as moment from 'moment';

@Injectable()
export class FaqService {
	constructor(@InjectModel('Faq') private readonly faqModel: Model<Faq>) {}

	public async createFaq(input: FaqInput): Promise<Faq> {
		try {
			const result = await this.faqModel.create(input);
			return result;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATED_FAILED);
		}
	}

	public async getAllFaqs(input: AllFaqsInquiry): Promise<Faqs> {
		const { faqStatus, faqCategory, text } = input.search;
		const match: T = {};
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
		if (faqStatus) match.faqStatus = faqStatus;
		if (faqCategory) match.faqCategory = faqCategory;
		if (text) match.faqTitle = { $regex: new RegExp(text, 'i') };
		const result = await this.faqModel
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

	public async updateFaq(input: FaqUpdate): Promise<Faq> {
		let { faqStatus, blockedAt, deletedAt } = input;
		const search: T = {
			_id: input._id,
			faqStatus: FaqStatus.ACTIVE,
		};

		if (faqStatus === FaqStatus.BLOCKED) blockedAt = moment().toDate();
		else if (faqStatus === FaqStatus.DELETE) deletedAt = moment().toDate();

		const result = await this.faqModel.findByIdAndUpdate(search, input, { new: true }).exec();

		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		return result;
	}

	public async removeFaq(faqId: ObjectId): Promise<Faq> {
		const search: T = { _id: faqId, faqStatus: FaqStatus.DELETE };
		console.log('search', search);
		const result = await this.faqModel.findByIdAndDelete(search).exec();
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}
}
