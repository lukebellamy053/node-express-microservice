> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Utils/PathHandler"](../modules/_utils_pathhandler_.md) / [PathHandler](_utils_pathhandler_.pathhandler.md) /

# Class: PathHandler

A class to handle the registration of routes

## Hierarchy

* **PathHandler**

## Index

### Properties

* [mApp](_utils_pathhandler_.pathhandler.md#protected-mapp)
* [mControllers](_utils_pathhandler_.pathhandler.md#protected-mcontrollers)
* [mControllerPaths](_utils_pathhandler_.pathhandler.md#static-protected-mcontrollerpaths)
* [mPathHandler](_utils_pathhandler_.pathhandler.md#static-protected-mpathhandler)
* [mPending](_utils_pathhandler_.pathhandler.md#static-protected-mpending)

### Accessors

* [app](_utils_pathhandler_.pathhandler.md#app)
* [pathHandler](_utils_pathhandler_.pathhandler.md#static-pathhandler)

### Methods

* [addController](_utils_pathhandler_.pathhandler.md#addcontroller)
* [callHandler](_utils_pathhandler_.pathhandler.md#protected-callhandler)
* [checkRouteHandlers](_utils_pathhandler_.pathhandler.md#protected-checkroutehandlers)
* [defaultHandler](_utils_pathhandler_.pathhandler.md#protected-defaulthandler)
* [preRegisterRoute](_utils_pathhandler_.pathhandler.md#protected-preregisterroute)
* [register](_utils_pathhandler_.pathhandler.md#register)
* [registerDefaults](_utils_pathhandler_.pathhandler.md#registerdefaults)
* [registerProxy](_utils_pathhandler_.pathhandler.md#registerproxy)
* [registerRouteArray](_utils_pathhandler_.pathhandler.md#registerroutearray)
* [addControllerPath](_utils_pathhandler_.pathhandler.md#static-addcontrollerpath)
* [addPendingRoute](_utils_pathhandler_.pathhandler.md#static-addpendingroute)
* [fail](_utils_pathhandler_.pathhandler.md#static-protected-fail)

## Properties

### `Protected` mApp

• **mApp**: *function*

*Defined in [Utils/PathHandler.ts:16](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L16)*

#### Type declaration:

▸ (): *`Express`*

___

### `Protected` mControllers

• **mControllers**: *object*

*Defined in [Utils/PathHandler.ts:14](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L14)*

#### Type declaration:

● \[▪ **x**: *string*\]: [Controller](_server_controller_.controller.md)

___

### `Static` `Protected` mControllerPaths

▪ **mControllerPaths**: *object*

*Defined in [Utils/PathHandler.ts:22](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L22)*

#### Type declaration:

● \[▪ **x**: *string*\]: [HTTPControllerInterface](../interfaces/_interfaces_httpcontrollerinterface_.httpcontrollerinterface.md)

___

### `Static` `Protected` mPathHandler

▪ **mPathHandler**: *[PathHandler](_utils_pathhandler_.pathhandler.md)*

*Defined in [Utils/PathHandler.ts:20](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L20)*

___

### `Static` `Protected` mPending

▪ **mPending**: *[RouteItem](_classes_routeitem_.routeitem.md)[]* =  []

*Defined in [Utils/PathHandler.ts:18](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L18)*

## Accessors

###  app

• **get app**(): *`Express`*

*Defined in [Utils/PathHandler.ts:52](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L52)*

Get the server app

**Returns:** *`Express`*

• **set app**(`_app`: `Express`): *void*

*Defined in [Utils/PathHandler.ts:60](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L60)*

Set the path handler app

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_app` | `Express` |   |

**Returns:** *void*

___

### `Static` pathHandler

• **get pathHandler**(): *[PathHandler](_utils_pathhandler_.pathhandler.md)*

*Defined in [Utils/PathHandler.ts:27](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L27)*

Get the active path handler instance

**Returns:** *[PathHandler](_utils_pathhandler_.pathhandler.md)*

• **set pathHandler**(`handler`: [PathHandler](_utils_pathhandler_.pathhandler.md)): *void*

*Defined in [Utils/PathHandler.ts:38](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L38)*

Set the active path handler instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handler` | [PathHandler](_utils_pathhandler_.pathhandler.md) |   |

**Returns:** *void*

## Methods

###  addController

▸ **addController**(`controllerItems`: any[] | object): *void*

*Defined in [Utils/PathHandler.ts:71](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L71)*

Add a new controller item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`controllerItems` | any[] \| object | Object or array of controllers  |

**Returns:** *void*

___

### `Protected` callHandler

▸ **callHandler**(`route`: [RouteItem](_classes_routeitem_.routeitem.md), `request`: `Request`, `response`: `Response`): *void*

*Defined in [Utils/PathHandler.ts:267](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L267)*

Call the handler for a route

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | [RouteItem](_classes_routeitem_.routeitem.md) | - |
`request` | `Request` | - |
`response` | `Response` |   |

**Returns:** *void*

___

### `Protected` checkRouteHandlers

▸ **checkRouteHandlers**(`route`: [RouteItem](_classes_routeitem_.routeitem.md), `prePath`: [HTTPControllerInterface](../interfaces/_interfaces_httpcontrollerinterface_.httpcontrollerinterface.md)): *[RouteItem](_classes_routeitem_.routeitem.md) | undefined*

*Defined in [Utils/PathHandler.ts:116](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L116)*

Combine the route auth handler to the class auth handler if required

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | [RouteItem](_classes_routeitem_.routeitem.md) | - |
`prePath` | [HTTPControllerInterface](../interfaces/_interfaces_httpcontrollerinterface_.httpcontrollerinterface.md) |   |

**Returns:** *[RouteItem](_classes_routeitem_.routeitem.md) | undefined*

___

### `Protected` defaultHandler

▸ **defaultHandler**(`route`: [RouteItem](_classes_routeitem_.routeitem.md)): *`(Anonymous function)`*

*Defined in [Utils/PathHandler.ts:201](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L201)*

The default request handler
Checks the request is valid before forwarding it to the correct controller

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | [RouteItem](_classes_routeitem_.routeitem.md) |   |

**Returns:** *`(Anonymous function)`*

___

### `Protected` preRegisterRoute

▸ **preRegisterRoute**(`route`: [RouteItem](_classes_routeitem_.routeitem.md)): *undefined*

*Defined in [Utils/PathHandler.ts:140](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L140)*

Perform some checks before registering the route

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | [RouteItem](_classes_routeitem_.routeitem.md) |   |

**Returns:** *undefined*

___

###  register

▸ **register**(`route`: [RouteItem](_classes_routeitem_.routeitem.md)): *void*

*Defined in [Utils/PathHandler.ts:229](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L229)*

Register a http route handler

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | [RouteItem](_classes_routeitem_.routeitem.md) |   |

**Returns:** *void*

___

###  registerDefaults

▸ **registerDefaults**(): *void*

*Defined in [Utils/PathHandler.ts:163](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L163)*

Register the default paths

**Returns:** *void*

___

###  registerProxy

▸ **registerProxy**(`path`: string, `proxy`: any, `removePath`: string, `isProtected?`: undefined | false | true, `authHandler?`: any, `jwtVerify`: boolean): *void*

*Defined in [Utils/PathHandler.ts:284](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L284)*

Register a route to use a proxy

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`path` | string | - | - |
`proxy` | any | - | - |
`removePath` | string | - | - |
`isProtected?` | undefined \| false \| true | - | - |
`authHandler?` | any | - | - |
`jwtVerify` | boolean | false |   |

**Returns:** *void*

___

###  registerRouteArray

▸ **registerRouteArray**(`routes`: [RouteInterface](../interfaces/_interfaces_routeinterface_.routeinterface.md)[]): *void*

*Defined in [Utils/PathHandler.ts:182](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L182)*

Register an array of routes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`routes` | [RouteInterface](../interfaces/_interfaces_routeinterface_.routeinterface.md)[] |   |

**Returns:** *void*

___

### `Static` addControllerPath

▸ **addControllerPath**(`controller`: [HTTPControllerInterface](../interfaces/_interfaces_httpcontrollerinterface_.httpcontrollerinterface.md), `controllerName`: string): *void*

*Defined in [Utils/PathHandler.ts:107](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L107)*

Registers a controller for a specific path
Routes inside this controller inherit the start path

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`controller` | [HTTPControllerInterface](../interfaces/_interfaces_httpcontrollerinterface_.httpcontrollerinterface.md) | - |
`controllerName` | string |   |

**Returns:** *void*

___

### `Static` addPendingRoute

▸ **addPendingRoute**(`route`: [RouteInterface](../interfaces/_interfaces_routeinterface_.routeinterface.md)): *void*

*Defined in [Utils/PathHandler.ts:88](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L88)*

Add a route to the pending list
These routes are added to express when the server is started

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | [RouteInterface](../interfaces/_interfaces_routeinterface_.routeinterface.md) | The route item to register  |

**Returns:** *void*

___

### `Static` `Protected` fail

▸ **fail**(`req`: `Response`, `reason`: string, `code`: number): *void*

*Defined in [Utils/PathHandler.ts:326](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Utils/PathHandler.ts#L326)*

Send a failed request message

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`req` | `Response` | - | - |
`reason` | string | - | - |
`code` | number | 200 |   |

**Returns:** *void*