// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Automock = any
/**
 * Proxy black magic.
 *
 * This might be a terrible idea.
 */
const getAutomock = (
  specifics: Record<string | symbol, unknown> = {}
): Automock => {
  const autmockSeed = jest.fn()
  const handler = {
    get(target: Record<string | symbol, Automock>, prop: string | symbol) {
      if (prop === Symbol.toPrimitive) {
        return () => `Automock: ${JSON.stringify(specifics)}`
      }
      if (Reflect.has(specifics, prop)) return Reflect.get(specifics, prop)
      if (!Reflect.has(target, prop)) {
        Reflect.set(target, prop, getAutomock())
      }
      return Reflect.get(target, prop)
    },
    apply() {
      return getAutomock()
    },
  }
  return new Proxy(autmockSeed, handler)
}

export const getMockContext = () => {
  const mockContext = getAutomock({
    getParameter: jest.fn((name) => {
      if (name === mockContext.VERSION) return "Fake version!"
      return getAutomock()
    }),
  })
  return mockContext
}
