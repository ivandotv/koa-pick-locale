koa-pick-locale

# koa-pick-locale

## Table of contents

### Type Aliases

- [Options](README.md#options)

### Functions

- [pickLocale](README.md#picklocale)

## Type Aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cookies?` | `string`[] |
| `default?` | `string` |
| `headers?` | `string`[] |
| `order?` | ``"cookiesFirst"`` \| ``"headersFirst"`` |
| `pick` | `string`[] |

#### Defined in

[koa-pick-locale.ts:7](https://github.com/ivandotv/koa-pick-locale/blob/b778183/src/koa-pick-locale.ts#L7)

## Functions

### pickLocale

▸ **pickLocale**(`options?`): (`ctx`: `ParameterizedContext`<`DefaultState`, `DefaultContext`, `unknown`\>, `next`: `Next`) => `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`Options`](README.md#options) |

#### Returns

`fn`

▸ (`ctx`, `next`): `Promise`<`any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `ParameterizedContext`<`DefaultState`, `DefaultContext`, `unknown`\> |
| `next` | `Next` |

##### Returns

`Promise`<`any`\>

#### Defined in

[koa-pick-locale.ts:15](https://github.com/ivandotv/koa-pick-locale/blob/b778183/src/koa-pick-locale.ts#L15)
