> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Server/ExpressServer"](../modules/_server_expressserver_.md) / [ExpressServer](_server_expressserver_.expressserver.md) /

# Class: ExpressServer

The core server component
Creates the express application

## Hierarchy

* **ExpressServer**

## Index

### Constructors

* [constructor](_server_expressserver_.expressserver.md#constructor)

### Properties

* [mApp](_server_expressserver_.expressserver.md#static-private-mapp)
* [mEvents](_server_expressserver_.expressserver.md#static-protected-mevents)
* [mServer](_server_expressserver_.expressserver.md#static-protected-mserver)

### Accessors

* [app](_server_expressserver_.expressserver.md#protected-app)
* [server](_server_expressserver_.expressserver.md#protected-server)
* [events](_server_expressserver_.expressserver.md#static-events)
* [server](_server_expressserver_.expressserver.md#static-server)
* [serverApp](_server_expressserver_.expressserver.md#static-serverapp)

### Methods

* [errorHandler](_server_expressserver_.expressserver.md#protected-errorhandler)
* [init](_server_expressserver_.expressserver.md#protected-init)
* [listen](_server_expressserver_.expressserver.md#protected-listen)
* [middleware](_server_expressserver_.expressserver.md#protected-middleware)
* [paths](_server_expressserver_.expressserver.md#protected-paths)
* [shutDown](_server_expressserver_.expressserver.md#static-shutdown)

## Constructors

###  constructor

\+ **new ExpressServer**(`envConfig`: [EnvironmentInterface](../interfaces/_interfaces_environmentinterface_.environmentinterface.md)): *[ExpressServer](_server_expressserver_.expressserver.md)*

*Defined in [Server/ExpressServer.ts:23](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L23)*

Class constructor
Create the new env settings

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`envConfig` | [EnvironmentInterface](../interfaces/_interfaces_environmentinterface_.environmentinterface.md) |   |

**Returns:** *[ExpressServer](_server_expressserver_.expressserver.md)*

## Properties

### `Static` `Private` mApp

▪ **mApp**: *function*

*Defined in [Server/ExpressServer.ts:23](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L23)*

#### Type declaration:

▸ (): *`Express`*

___

### `Static` `Protected` mEvents

▪ **mEvents**: *`EventEmitter`* =  new EventEmitter()

*Defined in [Server/ExpressServer.ts:21](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L21)*

___

### `Static` `Protected` mServer

▪ **mServer**: *function*

*Defined in [Server/ExpressServer.ts:18](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L18)*

#### Type declaration:

▸ (): *`Server`*

## Accessors

### `Protected` app

• **get app**(): *`Express`*

*Defined in [Server/ExpressServer.ts:81](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L81)*

Set the express app

**Returns:** *`Express`*

• **set app**(`_app`: `Express`): *void*

*Defined in [Server/ExpressServer.ts:72](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L72)*

Set the express app

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_app` | `Express` |   |

**Returns:** *void*

___

### `Protected` server

• **get server**(): *`Server`*

*Defined in [Server/ExpressServer.ts:88](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L88)*

Get the server object

**Returns:** *`Server`*

• **set server**(`_server`: `Server`): *void*

*Defined in [Server/ExpressServer.ts:96](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L96)*

Set the server object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_server` | `Server` |   |

**Returns:** *void*

___

### `Static` events

• **get events**(): *`EventEmitter`*

*Defined in [Server/ExpressServer.ts:50](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L50)*

Get the event emitter

**Returns:** *`EventEmitter`*

___

### `Static` server

• **get server**(): *`Server` | undefined*

*Defined in [Server/ExpressServer.ts:64](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L64)*

Get the server object

**Returns:** *`Server` | undefined*

___

### `Static` serverApp

• **get serverApp**(): *`Express`*

*Defined in [Server/ExpressServer.ts:57](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L57)*

Get the express app

**Returns:** *`Express`*

## Methods

### `Protected` errorHandler

▸ **errorHandler**(): *void*

*Defined in [Server/ExpressServer.ts:142](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L142)*

Handle any uncaught errors

**Returns:** *void*

___

### `Protected` init

▸ **init**(): *void*

*Defined in [Server/ExpressServer.ts:115](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L115)*

Init the server

**Returns:** *void*

___

### `Protected` listen

▸ **listen**(): *void*

*Defined in [Server/ExpressServer.ts:166](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L166)*

Start the server and listen to the required port

**Returns:** *void*

___

### `Protected` middleware

▸ **middleware**(): *void*

*Defined in [Server/ExpressServer.ts:127](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L127)*

Register any middleware

**Returns:** *void*

___

### `Protected` paths

▸ **paths**(): *void*

*Defined in [Server/ExpressServer.ts:135](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L135)*

Register any relevant paths here

**Returns:** *void*

___

### `Static` shutDown

▸ **shutDown**(): *`Promise<void>`*

*Defined in [Server/ExpressServer.ts:105](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/Server/ExpressServer.ts#L105)*

Shutdown the server

**Returns:** *`Promise<void>`*