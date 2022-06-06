# Koa pick locale

[![Test](https://github.com/ivandotv/koa-pick-locale/actions/workflows/CI.yml/badge.svg)](https://github.com/ivandotv/koa-pick-locale/actions/workflows/CI.yml)
[![Codecov](https://img.shields.io/codecov/c/gh/ivandotv/koa-pick-locale)](https://app.codecov.io/gh/ivandotv/koa-pick-locale)
[![GitHub license](https://img.shields.io/github/license/ivandotv/koa-pick-locale)](https://github.com/ivandotv/koa-pick-locale/blob/main/LICENSE)

Koa middleware to pick locale from an array of supported locales.

<!-- toc -->

- [Getting Started](#getting-started)
  - [Custom headers](#custom-headers)
  - [Cookies](#cookies)
- [Debugging](#debugging)
- [License](#license)

<!-- tocstop -->

## Getting Started

Install:

```sh
npm i koa-pick-locale
```

When using this middleware, you need to provide an array of locales to pick from. Later in the middleware stack, you can retrieve the chosen locale
via `ctx.locale`

The middleware will by default look at the `accept-language` header to see if it can satisfy the `pick` array, if not it will fall back to the `default` locale. If you do not provide the `default` locale, the default will be `en`.

```
import {pickLocale} from 'koa-pick-locale'

const app = new Koa()

app.use(pickLocale({default:'fr',pick:['sr','de','en`]}))


// later in the middleware stack
ctx.locale = 'sr'
```

### Custom headers

You can provide an array of custom headers to search through.

```ts
app.use(pickLocale({default:'fr',pick:['sr','de','en`],
  headers:['x-custom-locale','accept-language','x-custom-lang']
}))
```

middleware will look through all the headers and the first one that satisfies the `pick` value, that value will be returned, otherwise, the `default` value will be returned.

### Cookies

Middleware can also look through the cookies to pick the locale. The process is the same as for the headers array.

```ts
app.use(pickLocale({default:'fr',pick:['sr','de','en`],
  cookies:['my-cookie','locale-cookie']
}))
```

You can also use both `cookies` and `headers` thogether. By default, the `headers` array will be searched first, but this can be changed.

```ts
app.use(pickLocale({default:'fr',pick:['sr','de','en`],
  cookies:['my-cookie','locale-cookie'],
  headers:['x-custom-locale','accept-language','x-custom-lang'],
  order:'headersFirst'  // default order: headers first
}))
```

If you want cookies to be searched first, use: `order:'cookiesFirst`.

## Debugging

You can switch on debugging by providing the environment variable: `DEBUG=koa-pick-locale`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
