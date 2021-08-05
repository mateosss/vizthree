// import * as THREE from 'three';
import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

export class Cube {
  constructor(game) {
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
  constructor(game) {
    const material = new THREE.LineBasicMaterial({ color: 0xff00ff })
    const from = new THREE.Vector3(-1, 0, 0)
    const to = new THREE.Vector3(1, 1, 0)
    const geometry = new THREE.BufferGeometry().setFromPoints([from, to])
    const line = new THREE.Line(geometry, material)

    game.scene.add(line)
    this.line = line
    this.game = game
    this.from = from
    this.to = to
  }

  update() {}
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
    this.children.push(new Class(this))
  }

  start() {
    this.addChild(Cube)
    this.addChild(Line)
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
