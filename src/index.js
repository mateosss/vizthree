// import * as THREE from 'three';
import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

export default class Game {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.renderer = new THREE.WebGLRenderer()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    this.addCube()
    this.addLine()
    this.camera.position.z = 5
  }

  addCube() {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    this.cube = cube
  }

  addLine() {
    const material = new THREE.LineBasicMaterial({ color: 0xff00ff })
    const points = []
    points.push(new THREE.Vector3(-1, 0, 0))
    points.push(new THREE.Vector3(1, 0, 0))
    points.push(new THREE.Vector3(1, 1, 0))
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    this.scene.add(line)
  }

  start() {
    this.update()
  }

  update() {
    requestAnimationFrame(() => this.update())
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.y += 0.01
    this.renderer.render(this.scene, this.camera)
  }
}

const game = new Game()
game.start()
