import { registerEnumType } from '@nestjs/graphql';

export enum PropertyType {
	PARKS = 'PARKS',
	LAKE = 'LAKE',
	COUNTRYSIDE = 'COUNTRYSIDE',
	GARDENS = 'GARDENS',
	AMAZING_POOLS = 'AMAZING_POOLS',
	CAMPING = 'CAMPING',
	PLAY = 'PLAY',
	FARMS = 'FARMS',
	SKIING = 'SKIING',
	LUXE = 'LUXE',
}
registerEnumType(PropertyType, {
	name: 'PropertyType',
});

export enum PropertyStatus {
	ACTIVE = 'ACTIVE',
	RESERVED = 'RESERVED',
	DELETE = 'DELETE',
}
registerEnumType(PropertyStatus, {
	name: 'PropertyStatus',
});

// export enum PropertyLocation {
// 	NEW_YORK_CITY = 'NEW YORK CITY',
// 	LOS_ANGELES = 'LOS ANGELES',
// 	CHICAGO = 'CHICAGO',
// 	HOUSTON = 'HOUSTON',
// 	SAN_DIEGO = 'SAN DIEGO',
// 	SAN_ANTONIO = 'SAN ANTONIO',
// 	AUSTIN = 'AUSTIN',
// 	LAS_VEGAS = 'LAS VEGAS',
// 	WASHINGTON = 'WASHINGTON',
// 	EL_PASO = 'EL PASO',
// 	BOSTON = 'BOSTON',
// 	NASHVILLE = 'NASHVILLE',
// }
// registerEnumType(PropertyLocation, {
// 	name: 'PropertyLocation',
// });

export enum PropertyLocation {
	NEW_YORK_CITY = 'NEW YORK CITY',
	LOS_ANGELES = 'LOS ANGELES',
	CHICAGO = 'CHICAGO',
	HOUSTON = 'HOUSTON',
	SAN_DIEGO = 'SAN DIEGO',
	SAN_ANTONIO = 'SAN ANTONIO',
	AUSTIN = 'AUSTIN',
	LAS_VEGAS = 'LAS VEGAS',
	WASHINGTON = 'WASHINGTON',
	EL_PASO = 'EL PASO',
	BOSTON = 'BOSTON',
	NASHVILLE = 'NASHVILLE',
}
 registerEnumType(PropertyLocation, {
 	name: 'PropertyLocation',
 });