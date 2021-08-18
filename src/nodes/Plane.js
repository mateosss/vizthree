import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"
import Node from "./Node.js"

export default class Plane extends Node {
  constructor(game, { dynamic = false, extent = [1, 1] }) {
    console.assert(dyname === false)
    const props = { dynamic, extent }
    super(game, props)

    const material = new THREE.MeshBasicMaterial({
      color: 0x005599,
      side: THREE.DoubleSide,
    })
    const geometry = new THREE.PlaneGeometry(...extent)
    const plane = new THREE.Mesh(geometry, material)

    this.game.scene.add(plane)
    this.plane = plane
  }
}
