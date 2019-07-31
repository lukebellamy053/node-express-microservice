> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["EnvironmentConfig"](../modules/_environmentconfig_.md) / [EnvironmentConfig](_environmentconfig_.environmentconfig.md) /

# Class: EnvironmentConfig

Holds the environment to use
Default to the default environment

## Hierarchy

* **EnvironmentConfig**

## Index

### Constructors

* [constructor](_environmentconfig_.environmentconfig.md#constructor)

### Properties

* [EnvToUse](_environmentconfig_.environmentconfig.md#static-protected-envtouse)

### Accessors

* [environment](_environmentconfig_.environmentconfig.md#static-environment)

### Methods

* [addValues](_environmentconfig_.environmentconfig.md#static-addvalues)

## Constructors

###  constructor

\+ **new EnvironmentConfig**(`merge?`: any): *[EnvironmentConfig](_environmentconfig_.environmentconfig.md)*

*Defined in [EnvironmentConfig.ts:23](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/EnvironmentConfig.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`merge?` | any |

**Returns:** *[EnvironmentConfig](_environmentconfig_.environmentconfig.md)*

## Properties

### `Static` `Protected` EnvToUse

▪ **EnvToUse**: *object* =  Environment

*Defined in [EnvironmentConfig.ts:8](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/EnvironmentConfig.ts#L8)*

#### Type declaration:

● \[▪ **x**: *string*\]: any

## Accessors

### `Static` environment

• **get environment**(): *object*

*Defined in [EnvironmentConfig.ts:13](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/EnvironmentConfig.ts#L13)*

Get the environment

**Returns:** *object*

● \[▪ **x**: *string*\]: any

## Methods

### `Static` addValues

▸ **addValues**(`values`: `Record<string, any>`): *void*

*Defined in [EnvironmentConfig.ts:21](https://github.com/lukebellamy053/express-microservice/blob/f7a5771/src/EnvironmentConfig.ts#L21)*

Add values to the environment

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`values` | `Record<string, any>` |   |

**Returns:** *void*