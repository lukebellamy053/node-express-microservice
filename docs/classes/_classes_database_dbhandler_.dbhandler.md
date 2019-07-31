> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Classes/Database/DBHandler"](../modules/_classes_database_dbhandler_.md) / [DBHandler](_classes_database_dbhandler_.dbhandler.md) /

# Class: DBHandler

A class to handle database connections

## Hierarchy

* **DBHandler**

  * [MongoHandler](_classes_database_mongohandler_.mongohandler.md)

## Index

### Constructors

* [constructor](_classes_database_dbhandler_.dbhandler.md#constructor)

### Properties

* [mConnectedEvent](_classes_database_dbhandler_.dbhandler.md#protected-mconnectedevent)

### Accessors

* [onConnected](_classes_database_dbhandler_.dbhandler.md#onconnected)

## Constructors

###  constructor

\+ **new DBHandler**(): *[DBHandler](_classes_database_dbhandler_.dbhandler.md)*

*Defined in [Classes/Database/DBHandler.ts:15](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/DBHandler.ts#L15)*

Class Constructor

**Returns:** *[DBHandler](_classes_database_dbhandler_.dbhandler.md)*

## Properties

### `Protected` mConnectedEvent

• **mConnectedEvent**: *`EventEmitter`* =  new EventEmitter()

*Defined in [Classes/Database/DBHandler.ts:8](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/DBHandler.ts#L8)*

## Accessors

###  onConnected

• **get onConnected**(): *`EventEmitter`*

*Defined in [Classes/Database/DBHandler.ts:13](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/Classes/Database/DBHandler.ts#L13)*

Get the DB Connected event emitter

**Returns:** *`EventEmitter`*