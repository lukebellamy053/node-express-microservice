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
* [mDatabaseHealthModels](_server_expressserver_.expressserver.md#static-protected-mdatabasehealthmodels)
* [mEvents](_server_expressserver_.expressserver.md#static-protected-mevents)
* [mServer](_server_expressserver_.expressserver.md#static-protected-mserver)

### Accessors

* [app](_server_expressserver_.expressserver.md#protected-app)
* [events](_server_expressserver_.expressserver.md#static-events)
* [server](_server_expressserver_.expressserver.md#static-server)
* [serverApp](_server_expressserver_.expressserver.md#static-serverapp)

### Methods

* [databaseHealthCheck](_server_expressserver_.expressserver.md#protected-databasehealthcheck)
* [errorHandler](_server_expressserver_.expressserver.md#protected-errorhandler)
* [init](_server_expressserver_.expressserver.md#protected-init)
* [listen](_server_expressserver_.expressserver.md#protected-listen)
* [middleware](_server_expressserver_.expressserver.md#protected-middleware)
* [paths](_server_expressserver_.expressserver.md#protected-paths)
* [shutDown](_server_expressserver_.expressserver.md#static-shutdown)

## Constructors

###  constructor

\+ **new ExpressServer**(`envConfig`: [EnvironmentInterface](../interfaces/_interfaces_environmentinterface_.environmentinterface.md)): *[ExpressServer](_server_expressserver_.expressserver.md)*

*Defined in [Server/ExpressServer.ts:27](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L27)*

Class constructor
Create the new env settings

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`envConfig` | [EnvironmentInterface](../interfaces/_interfaces_environmentinterface_.environmentinterface.md) |   |

**Returns:** *[ExpressServer](_server_expressserver_.expressserver.md)*

## Properties

### `Static` `Private` mApp

▪ **mApp**: *`Express`*

*Defined in [Server/ExpressServer.ts:27](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L27)*

___

### `Static` `Protected` mDatabaseHealthModels

▪ **mDatabaseHealthModels**: *`Model<any>`[]* =  []

*Defined in [Server/ExpressServer.ts:22](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L22)*

___

### `Static` `Protected` mEvents

▪ **mEvents**: *`EventEmitter`* =  new EventEmitter()

*Defined in [Server/ExpressServer.ts:25](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L25)*

___

### `Static` `Protected` mServer

▪ **mServer**: *`Server`*

*Defined in [Server/ExpressServer.ts:20](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L20)*

## Accessors

### `Protected` app

• **get app**(): *`Express`*

*Defined in [Server/ExpressServer.ts:84](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L84)*

Set the express app

**Returns:** *`Express`*

• **set app**(`_app`: `Express`): *void*

*Defined in [Server/ExpressServer.ts:77](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L77)*

Set the express app

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_app` | `Express` |   |

**Returns:** *void*

___

### `Static` events

• **get events**(): *`EventEmitter`*

*Defined in [Server/ExpressServer.ts:55](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L55)*

Get the event emitter

**Returns:** *`EventEmitter`*

___

### `Static` server

• **get server**(): *`Server`*

*Defined in [Server/ExpressServer.ts:69](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L69)*

Get the server object

**Returns:** *`Server`*

___

### `Static` serverApp

• **get serverApp**(): *`Express`*

*Defined in [Server/ExpressServer.ts:62](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L62)*

Get the express app

**Returns:** *`Express`*

## Methods

### `Protected` databaseHealthCheck

▸ **databaseHealthCheck**(): *`Promise<object>`*

*Defined in [Server/ExpressServer.ts:106](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L106)*

Check the connection to the database

**Returns:** *`Promise<object>`*

___

### `Protected` errorHandler

▸ **errorHandler**(): *void*

*Defined in [Server/ExpressServer.ts:161](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L161)*

Handle any uncaught errors

**Returns:** *void*

___

### `Protected` init

▸ **init**(): *void*

*Defined in [Server/ExpressServer.ts:126](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L126)*

Init the server

**Returns:** *void*

___

### `Protected` listen

▸ **listen**(): *void*

*Defined in [Server/ExpressServer.ts:185](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L185)*

Start the server and listen to the required port

**Returns:** *void*

___

### `Protected` middleware

▸ **middleware**(): *void*

*Defined in [Server/ExpressServer.ts:145](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L145)*

Register any middleware

**Returns:** *void*

___

### `Protected` paths

▸ **paths**(): *void*

*Defined in [Server/ExpressServer.ts:153](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L153)*

Register any relevant paths here

**Returns:** *void*

___

### `Static` shutDown

▸ **shutDown**(): *`Promise<void>`*

*Defined in [Server/ExpressServer.ts:91](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Server/ExpressServer.ts#L91)*

Shutdown the server

**Returns:** *`Promise<void>`*