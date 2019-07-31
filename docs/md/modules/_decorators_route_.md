> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Decorators/Route"](_decorators_route_.md) /

# External module: "Decorators/Route"

## Index

### Functions

* [All](_decorators_route_.md#all)
* [Delete](_decorators_route_.md#delete)
* [Get](_decorators_route_.md#get)
* [Post](_decorators_route_.md#post)
* [Put](_decorators_route_.md#put)
* [Route](_decorators_route_.md#route)
* [makeRoute](_decorators_route_.md#makeroute)
* [route](_decorators_route_.md#route)

## Functions

###  All

▸ **All**(`data`: [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) | string): *`(Anonymous function)`*

*Defined in [Decorators/Route.ts:71](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Decorators/Route.ts#L71)*

Create a new route

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) \| string |

**Returns:** *`(Anonymous function)`*

___

###  Delete

▸ **Delete**(`data`: [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) | string): *`(Anonymous function)`*

*Defined in [Decorators/Route.ts:62](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Decorators/Route.ts#L62)*

Create a new DELETE route

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) \| string |

**Returns:** *`(Anonymous function)`*

___

###  Get

▸ **Get**(`data`: [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) | string): *`(Anonymous function)`*

*Defined in [Decorators/Route.ts:35](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Decorators/Route.ts#L35)*

Create a new GET route

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) \| string |

**Returns:** *`(Anonymous function)`*

___

###  Post

▸ **Post**(`data`: [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) | string): *`(Anonymous function)`*

*Defined in [Decorators/Route.ts:44](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Decorators/Route.ts#L44)*

Create a new POST route

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) \| string |

**Returns:** *`(Anonymous function)`*

___

###  Put

▸ **Put**(`data`: [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) | string): *`(Anonymous function)`*

*Defined in [Decorators/Route.ts:53](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Decorators/Route.ts#L53)*

Create a new PUT route

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) \| string |

**Returns:** *`(Anonymous function)`*

___

###  Route

▸ **Route**(`data`: [RouteInterface](../interfaces/_interfaces_routeinterface_.routeinterface.md)): *`(Anonymous function)`*

*Defined in [Decorators/Route.ts:21](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Decorators/Route.ts#L21)*

Create a new route

**Parameters:**

Name | Type |
------ | ------ |
`data` | [RouteInterface](../interfaces/_interfaces_routeinterface_.routeinterface.md) |

**Returns:** *`(Anonymous function)`*

___

###  makeRoute

▸ **makeRoute**(`data`: [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) | string, `method`: [Method](../enums/_enums_method_.method.md)): *`(Anonymous function)`*

*Defined in [Decorators/Route.ts:80](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Decorators/Route.ts#L80)*

A common function for the GET, POST, PUT, DELETE decorators

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | [MethodInterface](../interfaces/_interfaces_methodinterface_.methodinterface.md) \| string | - |
`method` | [Method](../enums/_enums_method_.method.md) |   |

**Returns:** *`(Anonymous function)`*

___

###  route

▸ **route**(`data`: [RouteInterface](../interfaces/_interfaces_routeinterface_.routeinterface.md)): *`(Anonymous function)`*

*Defined in [Decorators/Route.ts:12](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Decorators/Route.ts#L12)*

Create a new route

**`deprecated`** use Route instead

**Parameters:**

Name | Type |
------ | ------ |
`data` | [RouteInterface](../interfaces/_interfaces_routeinterface_.routeinterface.md) |

**Returns:** *`(Anonymous function)`*