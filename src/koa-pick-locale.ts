import parser from 'accept-language-parser'
import * as Koa from 'koa'

//TODO - setup debug module
export function pickLocale(options?: {
  headers?: string[]
  default?: string
  pick: string[]
  cookies?: string[]
  order?: 'cookieFirst' | 'headerFirst'
}) {
  const opts = {
    default: options?.default || 'en',
    headers: [...(options?.headers || []), 'accept-language'],
    pick: options?.pick,
    order: options?.order || 'headerFirst',
    cookies: [...(options?.cookies || [])]
  }

  return async (
    ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
    next: Koa.Next
  ) => {
    if (!opts.pick || opts.pick.length === 0) {
      throw new Error(
        'Koa pick locale: please provide options "pick" array to pick from'
      )
    }

    let locale

    if (opts.order === 'headerFirst') {
      for (const header of opts.headers) {
        const headerHit = ctx.request.get(header)

        if (headerHit) {
          const localeHit = parser.pick(opts.pick, headerHit)
          if (localeHit) {
            locale = localeHit
            break
          }
        }
      }
    } else {
      for (const cookie of opts.cookies) {
        const cookieHit = ctx.cookies.get(cookie)

        if (cookieHit) {
          const localeHit = parser.pick(opts.pick, cookieHit)
          if (localeHit) {
            locale = localeHit
            break
          }
        }
      }
    }

    ctx.locale = locale || opts.default

    return next()
  }
}
