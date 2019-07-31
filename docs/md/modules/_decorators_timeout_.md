> **[node-express-microservice](../README.md)**

[Globals](../globals.md) / ["Decorators/Timeout"](_decorators_timeout_.md) /

# External module: "Decorators/Timeout"

## Index

### Functions

* [Timeout](_decorators_timeout_.md#timeout)
* [timeout](_decorators_timeout_.md#timeout)

## Functions

###  Timeout

▸ **Timeout**(`limit`: number): *`(Anonymous function)`*

*Defined in [Decorators/Timeout.ts:16](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Decorators/Timeout.ts#L16)*

Add a timeout limit to a method, default is 10 seconds

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`limit` | number |  10 * 1000 |   |

**Returns:** *`(Anonymous function)`*

___

###  timeout

▸ **timeout**(`limit`: number): *`(Anonymous function)`*

*Defined in [Decorators/Timeout.ts:8](https://github.com/lukebellamy053/express-microservice/blob/afd2c9a/src/Decorators/Timeout.ts#L8)*

Add a timeout limit to a method, default is 10 seconds

**`deprecated`** use Timeout instead

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`limit` | number |  10 * 1000 |

**Returns:** *`(Anonymous function)`*