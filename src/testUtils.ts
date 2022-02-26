// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Automock = any

/**
 * A mock that uses proxies to create properties as they are accessed. Supports
 * function calls and toPrimitive.
 *
 * @param specifics Allows specifying specific values for properties. If a prop
 *  exists on `specifics`, then that value will be used when the property is
 * accessed on automock.
 * @returns
 */
const getAutomock = <T extends Record<string | symbol, unknown>>(
  specifics?: T
): Automock => {
  const autmockSeed = jest.fn()
  const handler = {
    get(target: Automock, prop: string | symbol) {
      if (prop === Symbol.toPrimitive) {
        return () => `Automock: ${JSON.stringify(specifics)}`
      }
      if (specifics && Reflect.has(specifics, prop)) {
        const value = Reflect.get(specifics, prop)
        return value
      }
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
