> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Controllers/ServiceController"](../modules/_controllers_servicecontroller_.md) / [ServiceController](_controllers_servicecontroller_.servicecontroller.md) /

# Class: ServiceController

A class to handle basic service operations

## Hierarchy

* [Controller](_server_controller_.controller.md)

  * **ServiceController**

## Index

### Constructors

* [constructor](_controllers_servicecontroller_.servicecontroller.md#protected-constructor)

### Properties

* [activeUser](_controllers_servicecontroller_.servicecontroller.md#protected-activeuser)
* [body](_controllers_servicecontroller_.servicecontroller.md#protected-body)
* [params](_controllers_servicecontroller_.servicecontroller.md#protected-params)
* [queryParams](_controllers_servicecontroller_.servicecontroller.md#protected-queryparams)
* [req](_controllers_servicecontroller_.servicecontroller.md#protected-req)
* [res](_controllers_servicecontroller_.servicecontroller.md#protected-res)
* [responseCode](_controllers_servicecontroller_.servicecontroller.md#protected-responsecode)
* [urlParams](_controllers_servicecontroller_.servicecontroller.md#protected-urlparams)

### Methods

* [canExecute](_controllers_servicecontroller_.servicecontroller.md#protected-canexecute)
* [doInit](_controllers_servicecontroller_.servicecontroller.md#protected-doinit)
* [executeMethod](_controllers_servicecontroller_.servicecontroller.md#protected-executemethod)
* [fail](_controllers_servicecontroller_.servicecontroller.md#protected-fail)
* [optionalMethods](_controllers_servicecontroller_.servicecontroller.md#protected-optionalmethods)
* [pathNotFound](_controllers_servicecontroller_.servicecontroller.md#pathnotfound)
* [send](_controllers_servicecontroller_.servicecontroller.md#protected-send)
* [serviceInfo](_controllers_servicecontroller_.servicecontroller.md#serviceinfo)
* [success](_controllers_servicecontroller_.servicecontroller.md#protected-success)
* [addRequired](_controllers_servicecontroller_.servicecontroller.md#static-addrequired)
* [addTimeout](_controllers_servicecontroller_.servicecontroller.md#static-addtimeout)
* [getParams](_controllers_servicecontroller_.servicecontroller.md#static-protected-getparams)

## Constructors

### `Protected` constructor

\+ **new ServiceController**(`request`: `Request`, `response`: `Response`, `method?`: undefined | string): *[ServiceController](_controllers_servicecontroller_.servicecontroller.md)*

*Inherited from [Controller](_server_controller_.controller.md).[constructor](_server_controller_.controller.md#protected-constructor)*

*Defined in [Server/Controller.ts:31](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L31)*

Class constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` | - |
`response` | `Response` | - |
`method?` | undefined \| string | The method to activate when ready  |

**Returns:** *[ServiceController](_controllers_servicecontroller_.servicecontroller.md)*

## Properties

### `Protected` activeUser

• **activeUser**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[activeUser](_server_controller_.controller.md#protected-activeuser)*

*Defined in [Server/Controller.ts:31](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L31)*

___

### `Protected` body

• **body**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[body](_server_controller_.controller.md#protected-body)*

*Defined in [Server/Controller.ts:23](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L23)*

___

### `Protected` params

• **params**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[params](_server_controller_.controller.md#protected-params)*

*Defined in [Server/Controller.ts:21](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L21)*

___

### `Protected` queryParams

• **queryParams**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[queryParams](_server_controller_.controller.md#protected-queryparams)*

*Defined in [Server/Controller.ts:27](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L27)*

___

### `Protected` req

• **req**: *`Request`*

*Inherited from [Controller](_server_controller_.controller.md).[req](_server_controller_.controller.md#protected-req)*

*Defined in [Server/Controller.ts:19](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L19)*

___

### `Protected` res

• **res**: *`Response`*

*Inherited from [Controller](_server_controller_.controller.md).[res](_server_controller_.controller.md#protected-res)*

*Defined in [Server/Controller.ts:17](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L17)*

___

### `Protected` responseCode

• **responseCode**: *number*

*Inherited from [Controller](_server_controller_.controller.md).[responseCode](_server_controller_.controller.md#protected-responsecode)*

*Defined in [Server/Controller.ts:29](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L29)*

___

### `Protected` urlParams

• **urlParams**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[urlParams](_server_controller_.controller.md#protected-urlparams)*

*Defined in [Server/Controller.ts:25](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L25)*

## Methods

### `Protected` canExecute

▸ **canExecute**(`fullName`: string): *void*

*Inherited from [Controller](_server_controller_.controller.md).[canExecute](_server_controller_.controller.md#protected-canexecute)*

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

*Inherited from [Controller](_server_controller_.controller.md).[doInit](_server_controller_.controller.md#protected-doinit)*

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

*Inherited from [Controller](_server_controller_.controller.md).[executeMethod](_server_controller_.controller.md#protected-executemethod)*

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

*Inherited from [Controller](_server_controller_.controller.md).[fail](_server_controller_.controller.md#protected-fail)*

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

*Inherited from [Controller](_server_controller_.controller.md).[optionalMethods](_server_controller_.controller.md#protected-optionalmethods)*

*Defined in [Server/Controller.ts:63](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L63)*

Call the optional methods

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method?` | undefined \| string |   |

**Returns:** *`Promise<void>`*

___

###  pathNotFound

▸ **pathNotFound**(): *`Promise<void>`*

*Defined in [Controllers/ServiceController.ts:30](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Controllers/ServiceController.ts#L30)*

Inform the user of an unknown path

**Returns:** *`Promise<void>`*

___

### `Protected` send

▸ **send**(`data`: any): *void*

*Inherited from [Controller](_server_controller_.controller.md).[send](_server_controller_.controller.md#protected-send)*

*Defined in [Server/Controller.ts:218](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L218)*

Send something back to the requester

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | any |   |

**Returns:** *void*

___

###  serviceInfo

▸ **serviceInfo**(): *`Promise<void>`*

*Defined in [Controllers/ServiceController.ts:18](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Controllers/ServiceController.ts#L18)*

Display the service information to the user

**Returns:** *`Promise<void>`*

___

### `Protected` success

▸ **success**(`data?`: any, `code`: number): *void*

*Inherited from [Controller](_server_controller_.controller.md).[success](_server_controller_.controller.md#protected-success)*

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

*Inherited from [Controller](_server_controller_.controller.md).[addRequired](_server_controller_.controller.md#static-addrequired)*

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

*Inherited from [Controller](_server_controller_.controller.md).[addTimeout](_server_controller_.controller.md#static-addtimeout)*

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

*Inherited from [Controller](_server_controller_.controller.md).[getParams](_server_controller_.controller.md#static-protected-getparams)*

*Defined in [Server/Controller.ts:125](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/Controller.ts#L125)*

Get the parameters from a request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` |   |

**Returns:** *any*