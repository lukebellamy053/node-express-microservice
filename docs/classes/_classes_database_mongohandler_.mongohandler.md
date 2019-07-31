> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Classes/Database/MongoHandler"](../modules/_classes_database_mongohandler_.md) / [MongoHandler](_classes_database_mongohandler_.mongohandler.md) /

# Class: MongoHandler

A class to handle MongoDB connections

## Hierarchy

* [DBHandler](_classes_database_dbhandler_.dbhandler.md)

  * **MongoHandler**

## Index

### Constructors

* [constructor](_classes_database_mongohandler_.mongohandler.md#constructor)

### Properties

* [mConnectedEvent](_classes_database_mongohandler_.mongohandler.md#protected-mconnectedevent)
* [mActiveMongoose](_classes_database_mongohandler_.mongohandler.md#static-private-mactivemongoose)

### Accessors

* [onConnected](_classes_database_mongohandler_.mongohandler.md#onconnected)
* [mongoose](_classes_database_mongohandler_.mongohandler.md#static-mongoose)

### Methods

* [connectWithDSN](_classes_database_mongohandler_.mongohandler.md#protected-connectwithdsn)
* [connectWithDetails](_classes_database_mongohandler_.mongohandler.md#protected-connectwithdetails)
* [init](_classes_database_mongohandler_.mongohandler.md#protected-init)

## Constructors

###  constructor

\+ **new MongoHandler**(): *[MongoHandler](_classes_database_mongohandler_.mongohandler.md)*

*Overrides [DBHandler](_classes_database_dbhandler_.dbhandler.md).[constructor](_classes_database_dbhandler_.dbhandler.md#constructor)*

*Defined in [Classes/Database/MongoHandler.ts:33](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/MongoHandler.ts#L33)*

Create a connection to MongoDB

**Returns:** *[MongoHandler](_classes_database_mongohandler_.mongohandler.md)*

## Properties

### `Protected` mConnectedEvent

• **mConnectedEvent**: *`EventEmitter`* =  new EventEmitter()

*Inherited from [DBHandler](_classes_database_dbhandler_.dbhandler.md).[mConnectedEvent](_classes_database_dbhandler_.dbhandler.md#protected-mconnectedevent)*

*Defined in [Classes/Database/DBHandler.ts:8](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/DBHandler.ts#L8)*

___

### `Static` `Private` mActiveMongoose

▪ **mActiveMongoose**: *any*

*Defined in [Classes/Database/MongoHandler.ts:11](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/MongoHandler.ts#L11)*

## Accessors

###  onConnected

• **get onConnected**(): *`EventEmitter`*

*Overrides [DBHandler](_classes_database_dbhandler_.dbhandler.md).[onConnected](_classes_database_dbhandler_.dbhandler.md#onconnected)*

*Defined in [Classes/Database/MongoHandler.ts:31](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/MongoHandler.ts#L31)*

Get the DB Connected event emitter

**Returns:** *`EventEmitter`*

___

### `Static` mongoose

• **get mongoose**(): *`mongoose.Mongoose`*

*Defined in [Classes/Database/MongoHandler.ts:16](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/MongoHandler.ts#L16)*

Get the active mongoose connection

**Returns:** *`mongoose.Mongoose`*

• **set mongoose**(`connection`: `mongoose.Mongoose`): *void*

*Defined in [Classes/Database/MongoHandler.ts:24](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/MongoHandler.ts#L24)*

Set the active mongoose connection

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`connection` | `mongoose.Mongoose` |   |

**Returns:** *void*

## Methods

### `Protected` connectWithDSN

▸ **connectWithDSN**(): *`Promise<void>`*

*Defined in [Classes/Database/MongoHandler.ts:69](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/MongoHandler.ts#L69)*

Connect to MongoDB with a DSN connection

**Returns:** *`Promise<void>`*

___

### `Protected` connectWithDetails

▸ **connectWithDetails**(): *`Promise<void>`*

*Defined in [Classes/Database/MongoHandler.ts:87](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/MongoHandler.ts#L87)*

Connect to MongoDB with authentication details

**Returns:** *`Promise<void>`*

___

### `Protected` init

▸ **init**(): *`Promise<void>`*

*Defined in [Classes/Database/MongoHandler.ts:47](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/MongoHandler.ts#L47)*

**Returns:** *`Promise<void>`*