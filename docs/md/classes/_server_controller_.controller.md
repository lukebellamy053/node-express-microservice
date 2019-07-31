> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Server/Controller"](../modules/_server_controller_.md) / [Controller](_server_controller_.controller.md) /

# Class: Controller

The base controller
Gets the active user from a request

## Hierarchy

* **Controller**

  * [ServiceController](_controllers_servicecontroller_.servicecontroller.md)

  * [HealthController](_controllers_healthcontroller_.healthcontroller.md)

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

* [canExecute](_server_controller_.controller.md#protected-canexecute)
* [doInit](_server_controller_.controller.md#protected-doinit)
* [executeMethod](_server_controller_.controller.md#protected-executemethod)
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

*Defined in [Server/Controller.ts:31](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L31)*

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

*Defined in [Server/Controller.ts:31](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L31)*

___

### `Protected` body

• **body**: *any*

*Defined in [Server/Controller.ts:23](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L23)*

___

### `Protected` params

• **params**: *any*

*Defined in [Server/Controller.ts:21](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L21)*

___

### `Protected` queryParams

• **queryParams**: *any*

*Defined in [Server/Controller.ts:27](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L27)*

___

### `Protected` req

• **req**: *`Request`*

*Defined in [Server/Controller.ts:19](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L19)*

___

### `Protected` res

• **res**: *`Response`*

*Defined in [Server/Controller.ts:17](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L17)*

___

### `Protected` responseCode

• **responseCode**: *number*

*Defined in [Server/Controller.ts:29](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L29)*

___

### `Protected` urlParams

• **urlParams**: *any*

*Defined in [Server/Controller.ts:25](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L25)*

___

### `Static` `Private` methodTimeouts

▪ **methodTimeouts**: *`Map<string, number>`*

*Defined in [Server/Controller.ts:15](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L15)*

___

### `Static` `Private` requiredParams

▪ **requiredParams**: *`Map<string, string[]>`*

*Defined in [Server/Controller.ts:13](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L13)*

## Methods

### `Protected` canExecute

▸ **canExecute**(`fullName`: string): *void*

*Defined in [Server/Controller.ts:162](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L162)*

Check if the method can be executed or not

**`throws`** ErrorResponses.MissingParameters

**Parameters:**

Name | Type |
------ | ------ |
`fullName` | string |

**Returns:** *void*

___

### `Protected` doInit

▸ **doInit**(`request`: `Request`, `response`: `Response`): *void*

*Defined in [Server/Controller.ts:89](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L89)*

Parse the request and send it to the correct controller

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` | - |
`response` | `Response` |   |

**Returns:** *void*

___

### `Protected` executeMethod

▸ **executeMethod**(`name`: string): *`Promise<unknown>`*

*Defined in [Server/Controller.ts:184](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L184)*

Execute the method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string |   |

**Returns:** *`Promise<unknown>`*

___

### `Protected` fail

▸ **fail**(`reason`: any, `code`: number): *void*

*Defined in [Server/Controller.ts:105](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L105)*

Fail the request

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`reason` | any | - | - |
`code` | number | 500 | The HTTP response code  |

**Returns:** *void*

___

### `Protected` optionalMethods

▸ **optionalMethods**(`method?`: undefined | string): *`Promise<void>`*

*Defined in [Server/Controller.ts:63](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L63)*

Call the optional methods

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method?` | undefined \| string |   |

**Returns:** *`Promise<void>`*

___

### `Protected` send

▸ **send**(`data`: any): *void*

*Defined in [Server/Controller.ts:218](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L218)*

Send something back to the requester

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | any |   |

**Returns:** *void*

___

### `Protected` success

▸ **success**(`data?`: any, `code`: number): *void*

*Defined in [Server/Controller.ts:231](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L231)*

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

*Defined in [Server/Controller.ts:134](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L134)*

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

*Defined in [Server/Controller.ts:149](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L149)*

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

*Defined in [Server/Controller.ts:125](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L125)*

Get the parameters from a request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` |   |

**Returns:** *any*