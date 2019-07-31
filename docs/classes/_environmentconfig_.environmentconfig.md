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

* [env_to_use](_environmentconfig_.environmentconfig.md#static-env_to_use)

### Methods

* [addValues](_environmentconfig_.environmentconfig.md#static-addvalues)

## Constructors

###  constructor

\+ **new EnvironmentConfig**(`merge?`: any): *[EnvironmentConfig](_environmentconfig_.environmentconfig.md)*

*Defined in [EnvironmentConfig.ts:16](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/EnvironmentConfig.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`merge?` | any |

**Returns:** *[EnvironmentConfig](_environmentconfig_.environmentconfig.md)*

## Properties

### `Static` env_to_use

▪ **env_to_use**: *any* =  Environment

*Defined in [EnvironmentConfig.ts:8](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/EnvironmentConfig.ts#L8)*

## Methods

### `Static` addValues

▸ **addValues**(`values`: `Record<string, any>`): *void*

*Defined in [EnvironmentConfig.ts:14](https://github.com/lukebellamy053/express-microservice/blob/3c4f8e9/src/EnvironmentConfig.ts#L14)*

Add values to the environment

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`values` | `Record<string, any>` |   |

**Returns:** *void*