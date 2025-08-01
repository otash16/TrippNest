// import { Field, InputType, Int } from '@nestjs/graphql';
// import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
// import { PropertyLocation, PropertyStatus, PropertyType } from '../../enums/property.enum';
// import { ObjectId } from 'mongoose';
// import { availabeOptions, availablePropertySorts } from '../../config';
// import { Direction } from '../../enums/common.enum';

// @InputType()
// export class PropertyInput {
// 	@IsNotEmpty()
// 	@Field(() => PropertyType)
// 	propertyType: PropertyType;

// 	@IsNotEmpty()
// 	@Field(() => PropertyLocation)
// 	propertyLocation: PropertyLocation;

// 	@IsNotEmpty()
// 	@Field(() => String)
// 	propertyAddress: string;

// 	@IsNotEmpty()
// 	@Field(() => String)
// 	propertyTitle: string;

// 	@IsNotEmpty()
// 	@Field(() => Number)
// 	propertyPrice: number;

// 	// @IsNotEmpty()
// 	// @Field(() => Number)
// 	// propertySquare: number;

// 	@IsNotEmpty()
// 	@IsInt()
// 	@Min(1)
// 	@Field(() => Int)
// 	propertyBeds: number;

// 	@IsNotEmpty()
// 	@IsInt()
// 	@Min(1)
// 	@Field(() => Int)
// 	propertyBath: number;

// 	@IsNotEmpty()
// 	@IsInt()
// 	@Min(1)
// 	@Field(() => Int)
// 	propertyGuests: number;

// 	@IsNotEmpty()
// 	@Field(() => [String])
// 	propertyImages: string[];

// 	@IsOptional()
// 	@Field(() => String, { nullable: true })
// 	propertyDesc?: string;

// 	@IsOptional()
// 	@Field(() => Boolean, { nullable: true })
// 	propertyFamily?: boolean;

// 	@IsOptional()
// 	@Field(() => Boolean, { nullable: true })
// 	propertySeasonal?: boolean;

// 	memberId?: ObjectId;

// 	@IsOptional()
// 	@Field(() => Date, { nullable: true })
// 	constructedAt?: Date;
// }

// @InputType()
// export class PricesRange {
// 	@Field(() => Int)
// 	start: number;

// 	@Field(() => Int)
// 	end: number;
// }

// @InputType()
// export class GuestsRange {
// 	@Field(() => Int)
// 	start: number;

// 	@Field(() => Int)
// 	end: number;
// }

// @InputType()
// export class PeriodsRange {
// 	@Field(() => Date)
// 	start: Date;

// 	@Field(() => Date)
// 	end: Date;
// }

// @InputType()
// class PISearch {
// 	@IsOptional()
// 	@Field(() => String, { nullable: true })
// 	memberId?: ObjectId;

// 	@IsOptional()
// 	@Field(() => [PropertyLocation], { nullable: true })
// 	locationList?: PropertyLocation[];

// 	@IsOptional()
// 	@Field(() => [PropertyType], { nullable: true })
// 	typeList?: PropertyType[];

// 	@IsOptional()
// 	@Field(() => [Int], { nullable: true })
// 	bathList?: Number[];

// 	@IsOptional()
// 	@Field(() => [Int], { nullable: true })
// 	bedsList?: Number[];

// 	@IsOptional()
// 	@IsIn(availabeOptions, { each: true })
// 	@Field(() => [String], { nullable: true })
// 	options?: string[];

// 	@IsOptional()
// 	@Field(() => PricesRange, { nullable: true })
// 	pricesRange?: PricesRange;

// 	@IsOptional()
// 	@Field(() => PeriodsRange, { nullable: true })
// 	periodsRange?: PeriodsRange;

// 	@IsOptional()
// 	@Field(() => GuestsRange, { nullable: true })
// 	guestsRange?: GuestsRange;

// 	@IsOptional()
// 	@Field(() => String, { nullable: true })
// 	text?: string;
// }

// @InputType()
// export class PropertiesInquiry {
// 	@IsNotEmpty()
// 	@Min(1)
// 	@Field(() => Int)
// 	page: number;

// 	@IsNotEmpty()
// 	@Min(1)
// 	@Field(() => Int)
// 	limit: number;

// 	@IsOptional()
// 	@IsIn(availablePropertySorts)
// 	@Field(() => String, { nullable: true })
// 	sort?: string;

// 	@IsOptional()
// 	@Field(() => Direction, { nullable: true })
// 	direction?: Direction;

// 	@IsNotEmpty()
// 	@Field(() => PISearch)
// 	search: PISearch;
// }

// @InputType()
// class APISearch {
// 	@IsOptional()
// 	@Field(() => PropertyStatus, { nullable: true })
// 	propertyStatus?: PropertyStatus;
// }

// @InputType()
// export class AgentPropertiesInquiry {
// 	@IsNotEmpty()
// 	@Min(1)
// 	@Field(() => Int)
// 	page: number;

// 	@IsNotEmpty()
// 	@Min(1)
// 	@Field(() => Int)
// 	limit: number;

// 	@IsOptional()
// 	@IsIn(availablePropertySorts)
// 	@Field(() => String, { nullable: true })
// 	sort?: string;

// 	@IsOptional()
// 	@Field(() => Direction, { nullable: true })
// 	direction: Direction;

// 	@IsNotEmpty()
// 	@Field(() => APISearch)
// 	search: APISearch;
// }

// @InputType()
// class ALPSearch {
// 	@IsOptional()
// 	@Field(() => PropertyStatus, { nullable: true })
// 	propertyStatus?: PropertyStatus;

// 	@IsOptional()
// 	@Field(() => [PropertyLocation], { nullable: true })
// 	propertyLocationList?: PropertyLocation[];
// }

// @InputType()
// export class AllPropertiesInquiry {
// 	@IsNotEmpty()
// 	@Min(1)
// 	@Field(() => Int)
// 	page: number;

// 	@IsNotEmpty()
// 	@Min(1)
// 	@Field(() => Int)
// 	limit: number;

// 	@IsOptional()
// 	@IsIn(availablePropertySorts)
// 	@Field(() => String, { nullable: true })
// 	sort?: string;

// 	@IsOptional()
// 	@Field(() => Direction, { nullable: true })
// 	direction?: Direction;

// 	@IsNotEmpty()
// 	@Field(() => APISearch)
// 	search: ALPSearch;
// }

// @InputType()
// export class OrdinaryInquiry {
// 	@IsNotEmpty()
// 	@Min(1)
// 	@Field(() => Int)
// 	page: number;

// 	@IsNotEmpty()
// 	@Min(1)
// 	@Field(() => Int)
// 	limit: number;
// }


import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { PropertyLocation, PropertyStatus, PropertyType } from '../../enums/property.enum';
import { ObjectId } from 'mongoose';
import { availabeOptions, availablePropertySorts } from '../../config';
import { Direction } from '../../enums/common.enum';

@InputType()
export class PropertyInput {
	@IsNotEmpty()
	@Field(() => PropertyType)
	propertyType: PropertyType;

	@IsNotEmpty()
	@Field(() => PropertyLocation)
	propertyLocation: PropertyLocation;

	@IsNotEmpty()
	@Field(() => String)
	propertyAddress: string;

	@IsNotEmpty()
	@Field(() => String)
	propertyTitle: string;

	@IsNotEmpty()
	@Field(() => Number)
	propertyPrice: number;

	// @IsNotEmpty()
	// @Field(() => Number)
	// propertySquare: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	propertyBeds: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	propertyBath: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	propertyGuests: number;

	@IsNotEmpty()
	@Field(() => [String])
	propertyImages: string[];

	@IsOptional()
	@Field(() => String, { nullable: true })
	propertyDesc?: string;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	propertyFamily?: boolean;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	propertySeasonal?: boolean;

	memberId?: ObjectId;

	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}

@InputType()
export class PricesRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class GuestsRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class PeriodsRange {
	@Field(() => Date)
	start: Date;

	@Field(() => Date)
	end: Date;
}

@InputType()
class PISearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [PropertyLocation], { nullable: true })
	locationList?: PropertyLocation[];

	@IsOptional()
	@Field(() => [PropertyType], { nullable: true })
	typeList?: PropertyType[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	bathList?: Number[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	bedsList?: Number[];

	@IsOptional()
	@IsIn(availabeOptions, { each: true })
	@Field(() => [String], { nullable: true })
	options?: string[];

	@IsOptional()
	@Field(() => PricesRange, { nullable: true })
	pricesRange?: PricesRange;

	@IsOptional()
	@Field(() => PeriodsRange, { nullable: true })
	periodsRange?: PeriodsRange;

	@IsOptional()
	@Field(() => GuestsRange, { nullable: true })
	guestsRange?: GuestsRange;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class PropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => PISearch)
	search: PISearch;
}

@InputType()
class APISearch {
	@IsOptional()
	@Field(() => PropertyStatus, { nullable: true })
	propertyStatus?: PropertyStatus;
}

@InputType()
export class AgentPropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction: Direction;

	@IsNotEmpty()
	@Field(() => APISearch)
	search: APISearch;
}

@InputType()
class ALPSearch {
	@IsOptional()
	@Field(() => PropertyStatus, { nullable: true })
	propertyStatus?: PropertyStatus;

	@IsOptional()
	@Field(() => [PropertyLocation], { nullable: true })
	propertyLocationList?: PropertyLocation[];
}

@InputType()
export class AllPropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => APISearch)
	search: ALPSearch;
}

@InputType()
export class OrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;
}
