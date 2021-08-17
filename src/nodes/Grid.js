import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

import Line from "./Line.js"

export default class Grid {
  constructor(
    game,
    { color = 0xffffff, origin = [-1, -1, 0], extent = [2, 2], spacing = 0.25 }
  ) {
    this.children = []
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

    this.game = game

    this.color = color
    this.origin = origin
    this.extent = extent
    this.spacing = spacing
  }

  update() {
    for (const child of this.children) child.update()
  }
}
