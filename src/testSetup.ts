import { getMockContext } from "./testUtils"

HTMLCanvasElement.prototype.getContext = getMockContext
