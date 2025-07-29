import { registerEnumType } from '@nestjs/graphql';

export enum FaqCategory {
	PROPERTY = 'PROPERTY',
	PAYMENT = 'PAYMENT',
	BUYER = 'BUYER',
	AGENTS = 'AGENTS',
	MEMBERSHIP = 'MEMBERSHIP',
	COMMUNITY = 'COMMUNITY',
	OTHER = 'OTHER',
}
registerEnumType(FaqCategory, {
	name: 'FaqCategory',
});

export enum FaqStatus {
	BLOCKED = 'BLOCKED',
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(FaqStatus, {
	name: 'FaqStatus',
});
