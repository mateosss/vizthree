import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

export default class Cube {
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
