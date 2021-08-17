import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

const V = ([x, y, z]) => new THREE.Vector3(x, y, z)

export default class Line {
  constructor(
    game,
    { dynamic = false, color = 0xff00ff, from = [-1, 0, 0], to = [1, 1, 0] }
  ) {
    const material = new THREE.LineBasicMaterial({ color })
    const geometry = new THREE.BufferGeometry().setFromPoints([V(from), V(to)])
    const line = new THREE.Line(geometry, material)

    game.scene.add(line)
    this.game = game
    this.line = line

    this.props = { dynamic, color, from, to }
  }

  updateProps({ dynamic, color, from, to }) {
    // TODO: Compare with previous props and only act on things that changed
    this.props = { dynamic, color, from, to }
    this.line.geometry.setFromPoints([V(from), V(to)])
    // if (color) this.line.material.color = color
  }

  update() {
    if (this.props.dynamic) this.updateProps(this.props)
  }
}
