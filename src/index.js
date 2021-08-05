// import * as THREE from 'three';
import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

export class Cube {
  constructor(game, props) {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    game.scene.add(cube)
    this.cube = cube
    this.game = game
  }

  update() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
  }
}

export class Line {
  constructor(game, { color = 0xff00ff, from = [-1, 0, 0], to = [1, 1, 0] }) {
    const material = new THREE.LineBasicMaterial({ color })
    const a = new THREE.Vector3(...from)
    const b = new THREE.Vector3(...to)
    const geometry = new THREE.BufferGeometry().setFromPoints([a, b])
    const line = new THREE.Line(geometry, material)

    game.scene.add(line)
    this.game = game
    this.line = line

    this.color = color
    this.from = from
    this.to = to
  }

  update() {}
}

export class Grid {
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

  addChild(Class) {
    this.children.push(new Class(this, {}))
  }

  start() {
    this.addChild(Cube)
    // this.addChild(Line)
    this.addChild(Grid)
    this.camera.position.z = 5

    this.update()
  }

  update() {
    requestAnimationFrame(() => this.update())
    for (const child of this.children) child.update()
    this.renderer.render(this.scene, this.camera)
  }
}

const game = new Game()
game.start()
