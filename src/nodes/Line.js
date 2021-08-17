import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

const V = ([x, y, z]) => new THREE.Vector3(x, y, z)

export default class Line {
  constructor(
    game,
    { mutableProps = null, color = 0xff00ff, from = [-1, 0, 0], to = [1, 1, 0] }
  ) {
    const material = new THREE.LineBasicMaterial({ color })
    const geometry = new THREE.BufferGeometry().setFromPoints([V(from), V(to)])
    const line = new THREE.Line(geometry, material)

    game.scene.add(line)
    this.game = game
    this.line = line

    if (mutableProps) {
      // Fill mutableProps with default props
      this.props = mutableProps
      this.props.mutableProps = mutableProps
      this.props.color = color
      this.props.from = from
      this.props.to = to
    } else {
      this.props = { mutableProps, color, from, to }
    }
  }

  updateProps({ mutableProps, color, from, to }) {
    this.props = { mutableProps, color, from, to }
    this.line.geometry.setFromPoints([V(from), V(to)])
    // if (color) this.line.material.color = color
  }

  update() {
    if (this.props.mutableProps) this.updateProps(this.props.mutableProps)
  }
}
