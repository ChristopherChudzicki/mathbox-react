import { AreaEmitter } from "mathbox"
import * as math from "mathjs"
import memoizeOne from "memoize-one"

export const isEvaluateableFunc = (argSymbols: string[], dimsOut: number) => {
  if (dimsOut !== 1) throw new Error("Not implemented.")

  return (text: string) => {
    try {
      const funcText = `f(${argSymbols}) = ${text}`
      const f = math.evaluate(funcText)
      const args = argSymbols.map(() => 0)
      const out = f(...args)
      return typeof out === "number"
    } catch (err) {
      return false
    }
  }
}

const compile = memoizeOne(
  (text: string): math.EvalFunction => math.compile(text)
)

export const textToAreaEmitter = (
  text: string,
  scope: Record<string, number>
): AreaEmitter => {
  const funcText = `f(x,y,t) = ${text}`
  const compiled = compile(funcText)
  const f = compiled.evaluate(scope)
  return (emit, x, y, i, j, t) => {
    emit(x, f(x, y, t), y)
  }
}
