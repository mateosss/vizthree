import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

import { Cube, Line, Grid, OrbitControls } from "./nodes/Nodes.js"

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
    this.children.push(new Class(this, props))
  }

  start() {
    this.addChild(Cube)
    this.addChild(OrbitControls)
    this.addChild(Grid)
    this.lineProps = {}
    this.addChild(Line, { mutableProps: this.lineProps, color: 0x00ffff })
    this.camera.position.z = 5

    this.update()
  }

  setLineToX(x) {
    this.lineProps.to[0] = x
  }

  setLineToY(y) {
    this.lineProps.to[1] = y
  }

  update() {
    requestAnimationFrame(() => this.update())
    for (const child of this.children) child.update()
    this.renderer.render(this.scene, this.camera)
  }
}
