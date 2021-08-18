import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"
import { DragControls } from "https://cdn.skypack.dev/three@v0.131.1/examples/jsm/controls/DragControls.js"

import Node from "./Node.js"
import Line from "./Line.js"
import Plane from "./Plane.js"

export default class Vector extends Node {
  constructor(game, props) {
    props.dynamic ??= false
    props.from ??= [0, 0, 0]
    props.to ??= [1, 1, 0]
    super(game, props)

    this.line = new Line(game, props)
    this.dynamicChildren.push(this.line)

    const planeProps = {
      ...props,
      dynamic: false,
      extent: [0.25, 0.25],
      origin: props.to,
    }
    this.plane = new Plane(game, planeProps)
    this.children.push(this.plane)

    this.controls = new DragControls(
      [this.plane.plane],
      this.game.camera,
      this.game.renderer.domElement
    )
    this.controls.addEventListener("dragstart", (event) => {})
    this.controls.addEventListener("dragend", (event) => {})
  }

  update() {
    super.update()
    this.line.props.to = this.plane.plane.position.toArray()
  }
}
