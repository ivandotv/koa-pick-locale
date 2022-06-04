import parser from 'accept-language-parser'
import * as Koa from 'koa'

//TODO - setup debug module
export function pickLocale(options?: {
  headers?: string[]
  default?: string
  pick: string[]
}) {
  const opts = {
    default: options?.default || 'en',
    headers: [...(options?.headers || []), 'accept-language'],
    pick: options?.pick
  }

  return async (
    ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
    next: Koa.Next
  ) => {
    const header = opts.headers.find((header) => ctx.headers[header]) || ''

    if (!opts.pick || opts.pick.length === 0) {
      throw new Error(
        'Koa pick locale: please provide options "pick" array to pick from'
      )
    }

    const locale =
      parser.pick(opts.pick, ctx.headers[header] as string) || opts.default

    ctx.locale = locale

    return next()
  }
}
