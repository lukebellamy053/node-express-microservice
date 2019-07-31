> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Server/Controller"](../modules/_server_controller_.md) / [Controller](_server_controller_.controller.md) /

# Class: Controller

The base controller
Gets the active user from a request

## Hierarchy

* **Controller**

  * [HealthController](_controllers_healthcontroller_.healthcontroller.md)

  * [ServiceController](_controllers_servicecontroller_.servicecontroller.md)

## Index

### Constructors

* [constructor](_server_controller_.controller.md#protected-constructor)

### Properties

* [activeUser](_server_controller_.controller.md#protected-activeuser)
* [body](_server_controller_.controller.md#protected-body)
* [params](_server_controller_.controller.md#protected-params)
* [queryParams](_server_controller_.controller.md#protected-queryparams)
* [req](_server_controller_.controller.md#protected-req)
* [res](_server_controller_.controller.md#protected-res)
* [responseCode](_server_controller_.controller.md#protected-responsecode)
* [urlParams](_server_controller_.controller.md#protected-urlparams)
* [methodTimeouts](_server_controller_.controller.md#static-private-methodtimeouts)
* [requiredParams](_server_controller_.controller.md#static-private-requiredparams)

### Methods

* [doInit](_server_controller_.controller.md#protected-doinit)
* [executeMethod](_server_controller_.controller.md#private-executemethod)
* [fail](_server_controller_.controller.md#protected-fail)
* [optionalMethods](_server_controller_.controller.md#protected-optionalmethods)
* [send](_server_controller_.controller.md#protected-send)
* [success](_server_controller_.controller.md#protected-success)
* [addRequired](_server_controller_.controller.md#static-addrequired)
* [addTimeout](_server_controller_.controller.md#static-addtimeout)
* [getParams](_server_controller_.controller.md#static-protected-getparams)

## Constructors

### `Protected` constructor

\+ **new Controller**(`request`: `Request`, `response`: `Response`, `method?`: undefined | string): *[Controller](_server_controller_.controller.md)*

*Defined in [Server/Controller.ts:30](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L30)*

Class constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` | - |
`response` | `Response` | - |
`method?` | undefined \| string | The method to activate when ready  |

**Returns:** *[Controller](_server_controller_.controller.md)*

## Properties

### `Protected` activeUser

• **activeUser**: *any*

*Defined in [Server/Controller.ts:30](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L30)*

___

### `Protected` body

• **body**: *any*

*Defined in [Server/Controller.ts:22](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L22)*

___

### `Protected` params

• **params**: *any*

*Defined in [Server/Controller.ts:20](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L20)*

___

### `Protected` queryParams

• **queryParams**: *any*

*Defined in [Server/Controller.ts:26](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L26)*

___

### `Protected` req

• **req**: *`Request`*

*Defined in [Server/Controller.ts:18](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L18)*

___

### `Protected` res

• **res**: *`Response`*

*Defined in [Server/Controller.ts:16](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L16)*

___

### `Protected` responseCode

• **responseCode**: *number*

*Defined in [Server/Controller.ts:28](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L28)*

___

### `Protected` urlParams

• **urlParams**: *any*

*Defined in [Server/Controller.ts:24](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L24)*

___

### `Static` `Private` methodTimeouts

▪ **methodTimeouts**: *`Map<string, number>`*

*Defined in [Server/Controller.ts:14](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L14)*

___

### `Static` `Private` requiredParams

▪ **requiredParams**: *`Map<string, string[]>`*

*Defined in [Server/Controller.ts:12](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L12)*

## Methods

### `Protected` doInit

▸ **doInit**(`request`: `Request`, `response`: `Response`): *void*

*Defined in [Server/Controller.ts:88](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L88)*

Parse the request and send it to the correct controller

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` | - |
`response` | `Response` |   |

**Returns:** *void*

___

### `Private` executeMethod

▸ **executeMethod**(`name`: string): *`Promise<unknown>`*

*Defined in [Server/Controller.ts:153](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L153)*

Execute the method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string |   |

**Returns:** *`Promise<unknown>`*

___

### `Protected` fail

▸ **fail**(`reason`: string, `code`: number): *void*

*Defined in [Server/Controller.ts:104](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L104)*

Fail the request

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`reason` | string | - | - |
`code` | number | 500 | The HTTP response code  |

**Returns:** *void*

___

### `Protected` optionalMethods

▸ **optionalMethods**(`method?`: undefined | string): *`Promise<void>`*

*Defined in [Server/Controller.ts:62](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L62)*

Call the optional methods

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method?` | undefined \| string |   |

**Returns:** *`Promise<void>`*

___

### `Protected` send

▸ **send**(`data`: any): *void*

*Defined in [Server/Controller.ts:201](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L201)*

Send something back to the requester

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | any |   |

**Returns:** *void*

___

### `Protected` success

▸ **success**(`data?`: any, `code`: number): *void*

*Defined in [Server/Controller.ts:214](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L214)*

Send a success response

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`data?` | any | - | The data to send back to the user |
`code` | number |  this.responseCode || 200 | The HTTP Response code  |

**Returns:** *void*

___

### `Static` addRequired

▸ **addRequired**(`methodName`: string, `required`: string[]): *void*

*Defined in [Server/Controller.ts:126](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L126)*

Add a set of required variables to a method name

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`methodName` | string | controller_name@methodName |
`required` | string[] |   |

**Returns:** *void*

___

### `Static` addTimeout

▸ **addTimeout**(`method`: string, `timeout`: number): *void*

*Defined in [Server/Controller.ts:141](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L141)*

Add a timeout to a method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method` | string | - |
`timeout` | number |   |

**Returns:** *void*

___

### `Static` `Protected` getParams

▸ **getParams**(`request`: `Request`): *any*

*Defined in [Server/Controller.ts:117](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L117)*

Get the parameters from a request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` |   |

**Returns:** *any*