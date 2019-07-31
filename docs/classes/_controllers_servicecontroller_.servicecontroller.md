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

* [doInit](_controllers_servicecontroller_.servicecontroller.md#protected-doinit)
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

*Defined in [Server/Controller.ts:30](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L30)*

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

*Defined in [Server/Controller.ts:30](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L30)*

___

### `Protected` body

• **body**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[body](_server_controller_.controller.md#protected-body)*

*Defined in [Server/Controller.ts:22](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L22)*

___

### `Protected` params

• **params**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[params](_server_controller_.controller.md#protected-params)*

*Defined in [Server/Controller.ts:20](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L20)*

___

### `Protected` queryParams

• **queryParams**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[queryParams](_server_controller_.controller.md#protected-queryparams)*

*Defined in [Server/Controller.ts:26](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L26)*

___

### `Protected` req

• **req**: *`Request`*

*Inherited from [Controller](_server_controller_.controller.md).[req](_server_controller_.controller.md#protected-req)*

*Defined in [Server/Controller.ts:18](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L18)*

___

### `Protected` res

• **res**: *`Response`*

*Inherited from [Controller](_server_controller_.controller.md).[res](_server_controller_.controller.md#protected-res)*

*Defined in [Server/Controller.ts:16](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L16)*

___

### `Protected` responseCode

• **responseCode**: *number*

*Inherited from [Controller](_server_controller_.controller.md).[responseCode](_server_controller_.controller.md#protected-responsecode)*

*Defined in [Server/Controller.ts:28](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L28)*

___

### `Protected` urlParams

• **urlParams**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[urlParams](_server_controller_.controller.md#protected-urlparams)*

*Defined in [Server/Controller.ts:24](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L24)*

## Methods

### `Protected` doInit

▸ **doInit**(`request`: `Request`, `response`: `Response`): *void*

*Inherited from [Controller](_server_controller_.controller.md).[doInit](_server_controller_.controller.md#protected-doinit)*

*Defined in [Server/Controller.ts:88](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L88)*

Parse the request and send it to the correct controller

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` | - |
`response` | `Response` |   |

**Returns:** *void*

___

### `Protected` fail

▸ **fail**(`reason`: any, `code`: number): *void*

*Overrides [Controller](_server_controller_.controller.md).[fail](_server_controller_.controller.md#protected-fail)*

*Defined in [Controllers/ServiceController.ts:47](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Controllers/ServiceController.ts#L47)*

Send a failed request response

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`reason` | any | - | - |
`code` | number |  this.responseCode || 500 |   |

**Returns:** *void*

___

### `Protected` optionalMethods

▸ **optionalMethods**(`method?`: undefined | string): *`Promise<void>`*

*Inherited from [Controller](_server_controller_.controller.md).[optionalMethods](_server_controller_.controller.md#protected-optionalmethods)*

*Defined in [Server/Controller.ts:62](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L62)*

Call the optional methods

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method?` | undefined \| string |   |

**Returns:** *`Promise<void>`*

___

###  pathNotFound

▸ **pathNotFound**(): *`Promise<void>`*

*Defined in [Controllers/ServiceController.ts:31](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Controllers/ServiceController.ts#L31)*

**Returns:** *`Promise<void>`*

___

### `Protected` send

▸ **send**(`data`: any): *void*

*Inherited from [Controller](_server_controller_.controller.md).[send](_server_controller_.controller.md#protected-send)*

*Defined in [Server/Controller.ts:201](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L201)*

Send something back to the requester

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | any |   |

**Returns:** *void*

___

###  serviceInfo

▸ **serviceInfo**(): *`Promise<void>`*

*Defined in [Controllers/ServiceController.ts:16](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Controllers/ServiceController.ts#L16)*

**Returns:** *`Promise<void>`*

___

### `Protected` success

▸ **success**(`data?`: any, `code`: number): *void*

*Overrides [Controller](_server_controller_.controller.md).[success](_server_controller_.controller.md#protected-success)*

*Defined in [Controllers/ServiceController.ts:59](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Controllers/ServiceController.ts#L59)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data?` | any | - |
`code` | number |  this.responseCode || 200 |

**Returns:** *void*

___

### `Static` addRequired

▸ **addRequired**(`methodName`: string, `required`: string[]): *void*

*Inherited from [Controller](_server_controller_.controller.md).[addRequired](_server_controller_.controller.md#static-addrequired)*

*Defined in [Server/Controller.ts:126](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L126)*

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

*Defined in [Server/Controller.ts:141](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L141)*

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

*Defined in [Server/Controller.ts:117](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Server/Controller.ts#L117)*

Get the parameters from a request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` |   |

**Returns:** *any*