> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Controllers/HealthController"](../modules/_controllers_healthcontroller_.md) / [HealthController](_controllers_healthcontroller_.healthcontroller.md) /

# Class: HealthController

A class to handle the health checks for the service

## Hierarchy

* [Controller](_server_controller_.controller.md)

  * **HealthController**

## Index

### Constructors

* [constructor](_controllers_healthcontroller_.healthcontroller.md#protected-constructor)

### Properties

* [activeUser](_controllers_healthcontroller_.healthcontroller.md#protected-activeuser)
* [body](_controllers_healthcontroller_.healthcontroller.md#protected-body)
* [params](_controllers_healthcontroller_.healthcontroller.md#protected-params)
* [queryParams](_controllers_healthcontroller_.healthcontroller.md#protected-queryparams)
* [req](_controllers_healthcontroller_.healthcontroller.md#protected-req)
* [res](_controllers_healthcontroller_.healthcontroller.md#protected-res)
* [responseCode](_controllers_healthcontroller_.healthcontroller.md#protected-responsecode)
* [urlParams](_controllers_healthcontroller_.healthcontroller.md#protected-urlparams)
* [mHealthCheckMethods](_controllers_healthcontroller_.healthcontroller.md#static-protected-mhealthcheckmethods)

### Methods

* [doInit](_controllers_healthcontroller_.healthcontroller.md#protected-doinit)
* [fail](_controllers_healthcontroller_.healthcontroller.md#protected-fail)
* [optionalMethods](_controllers_healthcontroller_.healthcontroller.md#protected-optionalmethods)
* [send](_controllers_healthcontroller_.healthcontroller.md#protected-send)
* [serviceHealthCheck](_controllers_healthcontroller_.healthcontroller.md#servicehealthcheck)
* [success](_controllers_healthcontroller_.healthcontroller.md#protected-success)
* [addHealthMethod](_controllers_healthcontroller_.healthcontroller.md#static-addhealthmethod)
* [addRequired](_controllers_healthcontroller_.healthcontroller.md#static-addrequired)
* [addTimeout](_controllers_healthcontroller_.healthcontroller.md#static-addtimeout)
* [getParams](_controllers_healthcontroller_.healthcontroller.md#static-protected-getparams)

## Constructors

### `Protected` constructor

\+ **new HealthController**(`request`: `Request`, `response`: `Response`, `method?`: undefined | string): *[HealthController](_controllers_healthcontroller_.healthcontroller.md)*

*Inherited from [Controller](_server_controller_.controller.md).[constructor](_server_controller_.controller.md#protected-constructor)*

*Defined in [Server/Controller.ts:30](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L30)*

Class constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` | - |
`response` | `Response` | - |
`method?` | undefined \| string | The method to activate when ready  |

**Returns:** *[HealthController](_controllers_healthcontroller_.healthcontroller.md)*

## Properties

### `Protected` activeUser

• **activeUser**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[activeUser](_server_controller_.controller.md#protected-activeuser)*

*Defined in [Server/Controller.ts:30](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L30)*

___

### `Protected` body

• **body**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[body](_server_controller_.controller.md#protected-body)*

*Defined in [Server/Controller.ts:22](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L22)*

___

### `Protected` params

• **params**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[params](_server_controller_.controller.md#protected-params)*

*Defined in [Server/Controller.ts:20](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L20)*

___

### `Protected` queryParams

• **queryParams**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[queryParams](_server_controller_.controller.md#protected-queryparams)*

*Defined in [Server/Controller.ts:26](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L26)*

___

### `Protected` req

• **req**: *`Request`*

*Inherited from [Controller](_server_controller_.controller.md).[req](_server_controller_.controller.md#protected-req)*

*Defined in [Server/Controller.ts:18](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L18)*

___

### `Protected` res

• **res**: *`Response`*

*Inherited from [Controller](_server_controller_.controller.md).[res](_server_controller_.controller.md#protected-res)*

*Defined in [Server/Controller.ts:16](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L16)*

___

### `Protected` responseCode

• **responseCode**: *number*

*Inherited from [Controller](_server_controller_.controller.md).[responseCode](_server_controller_.controller.md#protected-responsecode)*

*Defined in [Server/Controller.ts:28](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L28)*

___

### `Protected` urlParams

• **urlParams**: *any*

*Inherited from [Controller](_server_controller_.controller.md).[urlParams](_server_controller_.controller.md#protected-urlparams)*

*Defined in [Server/Controller.ts:24](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L24)*

___

### `Static` `Protected` mHealthCheckMethods

▪ **mHealthCheckMethods**: *function[]* =  []

*Defined in [Controllers/HealthController.ts:10](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Controllers/HealthController.ts#L10)*

## Methods

### `Protected` doInit

▸ **doInit**(`request`: `Request`, `response`: `Response`): *void*

*Inherited from [Controller](_server_controller_.controller.md).[doInit](_server_controller_.controller.md#protected-doinit)*

*Defined in [Server/Controller.ts:88](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L88)*

Parse the request and send it to the correct controller

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` | - |
`response` | `Response` |   |

**Returns:** *void*

___

### `Protected` fail

▸ **fail**(`reason`: string, `code`: number): *void*

*Inherited from [Controller](_server_controller_.controller.md).[fail](_server_controller_.controller.md#protected-fail)*

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

*Inherited from [Controller](_server_controller_.controller.md).[optionalMethods](_server_controller_.controller.md#protected-optionalmethods)*

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

*Inherited from [Controller](_server_controller_.controller.md).[send](_server_controller_.controller.md#protected-send)*

*Defined in [Server/Controller.ts:201](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L201)*

Send something back to the requester

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | any |   |

**Returns:** *void*

___

###  serviceHealthCheck

▸ **serviceHealthCheck**(): *`Promise<object>`*

*Defined in [Controllers/HealthController.ts:29](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Controllers/HealthController.ts#L29)*

Perform a health check

**Returns:** *`Promise<object>`*

___

### `Protected` success

▸ **success**(`data?`: any, `code`: number): *void*

*Inherited from [Controller](_server_controller_.controller.md).[success](_server_controller_.controller.md#protected-success)*

*Defined in [Server/Controller.ts:214](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L214)*

Send a success response

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`data?` | any | - | The data to send back to the user |
`code` | number |  this.responseCode || 200 | The HTTP Response code  |

**Returns:** *void*

___

### `Static` addHealthMethod

▸ **addHealthMethod**(`method`: function): *void*

*Defined in [Controllers/HealthController.ts:16](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Controllers/HealthController.ts#L16)*

A method to add a new health check method

**Parameters:**

▪ **method**: *function*

▸ (): *`Promise<any>`*

**Returns:** *void*

___

### `Static` addRequired

▸ **addRequired**(`methodName`: string, `required`: string[]): *void*

*Inherited from [Controller](_server_controller_.controller.md).[addRequired](_server_controller_.controller.md#static-addrequired)*

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

*Inherited from [Controller](_server_controller_.controller.md).[addTimeout](_server_controller_.controller.md#static-addtimeout)*

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

*Inherited from [Controller](_server_controller_.controller.md).[getParams](_server_controller_.controller.md#static-protected-getparams)*

*Defined in [Server/Controller.ts:117](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/Controller.ts#L117)*

Get the parameters from a request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | `Request` |   |

**Returns:** *any*