import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"
import Node from "./Node.js"

export default class Plane extends Node {
  constructor(game, { dynamic = false, extent = [1, 1], origin = [0, 0, 0] }) {
    console.assert(dynamic === false)
    const props = { dynamic, extent }
    super(game, props)

    const material = new THREE.MeshBasicMaterial({
      color: 0x005599,
      side: THREE.DoubleSide,
    })
    const geometry = new THREE.PlaneGeometry(...extent)
    const plane = new THREE.Mesh(geometry, material)
    plane.position.fromArray(origin)

    this.game.scene.add(plane)
    this.plane = plane
  }
}
