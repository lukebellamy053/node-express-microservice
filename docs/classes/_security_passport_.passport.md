> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Security/Passport"](../modules/_security_passport_.md) / [Passport](_security_passport_.passport.md) /

# Class: Passport

A class that handles the authentication of users

## Hierarchy

* **Passport**

## Index

### Properties

* [mCustomPassport](_security_passport_.passport.md#static-private-mcustompassport)
* [mRouteAuthenticators](_security_passport_.passport.md#static-private-mrouteauthenticators)

### Accessors

* [passport](_security_passport_.passport.md#static-passport)

### Methods

* [getToken](_security_passport_.passport.md#gettoken)
* [verifyJWTToken](_security_passport_.passport.md#verifyjwttoken)
* [verifyRequest](_security_passport_.passport.md#verifyrequest)
* [addGatedMethod](_security_passport_.passport.md#static-addgatedmethod)
* [getGateForMethod](_security_passport_.passport.md#static-getgateformethod)

## Properties

### `Static` `Private` mCustomPassport

▪ **mCustomPassport**: *[Passport](_security_passport_.passport.md)*

*Defined in [Security/Passport.ts:15](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L15)*

___

### `Static` `Private` mRouteAuthenticators

▪ **mRouteAuthenticators**: *object*

*Defined in [Security/Passport.ts:13](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L13)*

#### Type declaration:

● \[▪ **x**: *string*\]: function

▸ (`_`: any): *`Promise<boolean>`*

**Parameters:**

Name | Type |
------ | ------ |
`_` | any |

## Accessors

### `Static` passport

• **get passport**(): *[Passport](_security_passport_.passport.md)*

*Defined in [Security/Passport.ts:28](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L28)*

Get the active passport instance

**Returns:** *[Passport](_security_passport_.passport.md)*

• **set passport**(`_passport`: [Passport](_security_passport_.passport.md)): *void*

*Defined in [Security/Passport.ts:21](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L21)*

Set the passport instance to use

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_passport` | [Passport](_security_passport_.passport.md) |   |

**Returns:** *void*

## Methods

###  getToken

▸ **getToken**(`req`: any): *string | null*

*Defined in [Security/Passport.ts:78](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L78)*

Get the token from the request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | any |   |

**Returns:** *string | null*

___

###  verifyJWTToken

▸ **verifyJWTToken**(`token`: string): *`Promise<unknown>`*

*Defined in [Security/Passport.ts:97](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L97)*

Verify the JWT Token is correct

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | string |   |

**Returns:** *`Promise<unknown>`*

___

###  verifyRequest

▸ **verifyRequest**(`request`: `Request` & object): *`Promise<any>`*

*Defined in [Security/Passport.ts:58](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L58)*

Verify that a user is valid
This is not static so that it can be overridden easier

**`throws`** ErrorResponses.Invalid_Token

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` & object |   |

**Returns:** *`Promise<any>`*

___

### `Static` addGatedMethod

▸ **addGatedMethod**(`methodName`: string, `handler`: function): *void*

*Defined in [Security/Passport.ts:40](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L40)*

Add a new gate for a method

**Parameters:**

▪ **methodName**: *string*

▪ **handler**: *function*

▸ (`_`: any): *`Promise<boolean>`*

**Parameters:**

Name | Type |
------ | ------ |
`_` | any |

**Returns:** *void*

___

### `Static` getGateForMethod

▸ **getGateForMethod**(`methodName`: string): *function | undefined*

*Defined in [Security/Passport.ts:48](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Security/Passport.ts#L48)*

Get the gate for a method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`methodName` | string |   |

**Returns:** *function | undefined*