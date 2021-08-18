import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"
import { DragControls } from "https://cdn.skypack.dev/three@v0.131.1/examples/jsm/controls/DragControls.js"

import {
  Cube,
  Line,
  Grid,
  OrbitControls,
  Plane,
  Vector,
} from "./nodes/Nodes.js"

export default class Game {
  constructor() {
    this.scene = new THREE.Scene()
    const aspectRatio = window.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
    this.children = []

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
  }

  addChild(Class, props = {}) {
    const child = new Class(this, props)
    this.children.push(child)
    return child
  }

  start() {
    // this.addChild(OrbitControls)
    // this.cube = this.addChild(Cube)
    this.addChild(Grid)
    const lineProps = { dynamic: true, color: 0x00ffff, linewidth: 8 }
    // this.line = this.addChild(Line, lineProps)
    this.vector1 = this.addChild(Vector, lineProps)
    lineProps.color = 0xffff00
    lineProps.to = [2, -1, 0]
    this.vector2 = this.addChild(Vector, lineProps)

    this.camera.position.z = 5

    this.update()
  }

  setLineToX(x) {
    this.line.props.to[0] = x
  }

  setLineToY(y) {
    this.line.props.to[1] = y
  }

  update() {
    requestAnimationFrame(() => this.update())
    for (const child of this.children) child.update()
    this.renderer.render(this.scene, this.camera)
  }
}
