> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Classes/RouteItem"](../modules/_classes_routeitem_.md) / [RouteItem](_classes_routeitem_.routeitem.md) /

# Class: RouteItem

A class to hold route information

## Hierarchy

* **RouteItem**

## Index

### Constructors

* [constructor](_classes_routeitem_.routeitem.md#constructor)

### Properties

* [mAuthHandler](_classes_routeitem_.routeitem.md#private-mauthhandler)
* [mHandler](_classes_routeitem_.routeitem.md#private-mhandler)
* [mMethod](_classes_routeitem_.routeitem.md#private-mmethod)
* [mPath](_classes_routeitem_.routeitem.md#private-mpath)
* [mPriority](_classes_routeitem_.routeitem.md#private-mpriority)
* [mProtected](_classes_routeitem_.routeitem.md#private-mprotected)

### Accessors

* [authHandler](_classes_routeitem_.routeitem.md#authhandler)
* [handler](_classes_routeitem_.routeitem.md#handler)
* [handlerClass](_classes_routeitem_.routeitem.md#handlerclass)
* [handlerMethod](_classes_routeitem_.routeitem.md#handlermethod)
* [method](_classes_routeitem_.routeitem.md#method)
* [path](_classes_routeitem_.routeitem.md#path)
* [priority](_classes_routeitem_.routeitem.md#priority)
* [protected](_classes_routeitem_.routeitem.md#protected)

## Constructors

###  constructor

\+ **new RouteItem**(`_path`: string, `_handler`: string, `_method?`: [Method](../enums/_enums_method_.method.md), `_isProtected`: boolean, `authHandler?`: undefined | function, `_priority`: number): *[RouteItem](_classes_routeitem_.routeitem.md)*

*Defined in [Classes/RouteItem.ts:81](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L81)*

Class constructor

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`_path` | string | - | - |
`_handler` | string | - | - |
`_method?` | [Method](../enums/_enums_method_.method.md) | - | - |
`_isProtected` | boolean | false | - |
`authHandler?` | undefined \| function | - | - |
`_priority` | number | 0 |   |

**Returns:** *[RouteItem](_classes_routeitem_.routeitem.md)*

## Properties

### `Private` mAuthHandler

• **mAuthHandler**: *function*

*Defined in [Classes/RouteItem.ts:16](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L16)*

#### Type declaration:

▸ (`_`: any): *`Promise<boolean>`*

**Parameters:**

Name | Type |
------ | ------ |
`_` | any |

___

### `Private` mHandler

• **mHandler**: *string*

*Defined in [Classes/RouteItem.ts:10](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L10)*

___

### `Private` mMethod

• **mMethod**: *[Method](../enums/_enums_method_.method.md)*

*Defined in [Classes/RouteItem.ts:12](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L12)*

___

### `Private` mPath

• **mPath**: *string*

*Defined in [Classes/RouteItem.ts:8](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L8)*

___

### `Private` mPriority

• **mPriority**: *number*

*Defined in [Classes/RouteItem.ts:18](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L18)*

___

### `Private` mProtected

• **mProtected**: *boolean*

*Defined in [Classes/RouteItem.ts:14](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L14)*

## Accessors

###  authHandler

• **get authHandler**(): *function*

*Defined in [Classes/RouteItem.ts:56](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L56)*

Is the route admin only?

**Returns:** *function*

▸ (`_`: any): *`Promise<boolean>`*

**Parameters:**

Name | Type |
------ | ------ |
`_` | any |

___

###  handler

• **get handler**(): *string*

*Defined in [Classes/RouteItem.ts:32](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L32)*

Get the full string handler

**Returns:** *string*

___

###  handlerClass

• **get handlerClass**(): *string*

*Defined in [Classes/RouteItem.ts:64](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L64)*

Get the class to handle the route

**Returns:** *string*

___

###  handlerMethod

• **get handlerMethod**(): *string*

*Defined in [Classes/RouteItem.ts:72](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L72)*

Get the method to handle the route

**Returns:** *string*

___

###  method

• **get method**(): *[Method](../enums/_enums_method_.method.md)*

*Defined in [Classes/RouteItem.ts:40](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L40)*

What is the HTTP method?

**Returns:** *[Method](../enums/_enums_method_.method.md)*

___

###  path

• **get path**(): *string*

*Defined in [Classes/RouteItem.ts:24](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L24)*

The http path for the route

**Returns:** *string*

___

###  priority

• **get priority**(): *number*

*Defined in [Classes/RouteItem.ts:79](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L79)*

Get the route priority

**Returns:** *number*

___

###  protected

• **get protected**(): *boolean*

*Defined in [Classes/RouteItem.ts:48](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Classes/RouteItem.ts#L48)*

Is the route logged in users only?

**Returns:** *boolean*