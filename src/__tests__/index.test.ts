import { createMockContext } from '@shopify/jest-koa-mocks'
import { pickLocale } from '../index'

describe('Koa pick locale', () => {
  describe('Pick from header', () => {
    test('default header is "accept-header"', async () => {
      const targetLang = 'sr'

      const ctx = createMockContext({
        headers: { 'accept-language': targetLang }
      })

      await pickLocale({ default: 'en', pick: ['sr', 'ru'] })(ctx, jest.fn())

      expect(ctx.locale).toBe(targetLang)
    })

    test('koa next function is called', async () => {
      const nextFn = jest.fn()

      const ctx = createMockContext()

      await pickLocale({ default: 'en', pick: ['sr'] })(ctx, nextFn)

      expect(nextFn).toHaveBeenCalledTimes(1)
    })

    test('pick from custom header', async () => {
      const targetLocale = 'sr'
      const customHeader = 'x-custom-header'
      const ctx = createMockContext({
        headers: { [customHeader]: targetLocale }
      })

      await pickLocale({
        default: 'en',
        headers: [customHeader],
        pick: [targetLocale]
      })(ctx, jest.fn())

      expect(ctx.locale).toBe(targetLocale)
    })

    test('use first header that is defined', async () => {
      const targetLocale = 'sr'
      const firstHeader = 'x-first'
      const secondHeader = 'x-second'

      const ctx = createMockContext({
        headers: {
          [secondHeader]: targetLocale
        }
      })

      await pickLocale({
        headers: [firstHeader, secondHeader],
        pick: [targetLocale]
      })(ctx, jest.fn())

      expect(ctx.locale).toBe(targetLocale)
    })

    test('default locale is "en"', async () => {
      const defaultLocale = 'en'
      const ctx = createMockContext({})

      await pickLocale({ pick: ['sr'] })(ctx, jest.fn())

      expect(ctx.locale).toBe(defaultLocale)
    })

    test('throw error if array to pick from is not present', async () => {
      const ctx = createMockContext({})

      await expect(pickLocale()(ctx, jest.fn())).rejects.toThrow()
    })

    test('throw error if array to pick from is empty', async () => {
      const ctx = createMockContext({})

      await expect(pickLocale({ pick: [] })(ctx, jest.fn())).rejects.toThrow()
    })
  })
})
