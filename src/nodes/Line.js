import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"
import Node from "./Node.js"

const V = ([x, y, z]) => new THREE.Vector3(x, y, z)

export default class Line extends Node {
  constructor(
    game,
    {
      dynamic = false,
      color = 0xff00ff,
      linewidth = 1,
      from = [-1, 0, 0],
      to = [1, 1, 0],
    }
  ) {
    const props = { dynamic, color, linewidth, from, to }
    super(game, props)

    const material = new THREE.LineBasicMaterial({ color, linewidth })
    const geometry = new THREE.BufferGeometry().setFromPoints([V(from), V(to)])
    const line = new THREE.Line(geometry, material)

    this.game.scene.add(line)
    this.line = line
  }

  updateProps({ dynamic, color, linewidth, from, to }) {
    super.updateProps({ dynamic, color, linewidth, from, to }) // TODO: This interface is clunky
    this.line.geometry.setFromPoints([V(from), V(to)])
    if (color) this.line.material.color.set(color)
  }
}
