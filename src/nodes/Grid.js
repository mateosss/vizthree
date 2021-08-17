import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

import Node from "./Node.js"
import Line from "./Line.js"

export default class Grid extends Node {
  constructor(
    game,
    {
      dynamic = false,
      color = 0xffffff,
      origin = [-1, -1, 0],
      extent = [2, 2],
      spacing = 0.25,
    }
  ) {
    const props = { dynamic, color, origin, extent, spacing }
    super(game, props)

    // Make the grid lines
    const [w, h] = extent
    const [rows, cols] = [h / spacing, w / spacing]
    const add2 = ([x, y, z], [a, b]) => [x + a, y + b, z]
    const makeLine = (from, to) =>
      this.children.push(new Line(game, { color, from, to }))

    let pointer = origin
    makeLine(pointer, add2(pointer, [w, 0]))
    for (let j = 0; j < rows; j++) {
      pointer = add2(pointer, [0, spacing])
      makeLine(pointer, add2(pointer, [w, 0]))
    }

    pointer = origin
    makeLine(pointer, add2(pointer, [0, h]))
    for (let i = 0; i < cols; i++) {
      pointer = add2(pointer, [spacing, 0])
      makeLine(pointer, add2(pointer, [0, h]))
    }
  }
}
