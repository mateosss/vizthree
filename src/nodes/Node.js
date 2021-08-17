import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"

export default class Node {
  constructor(game, props) {
    console.assert(game !== undefined)
    console.assert(props.dynamic !== undefined)
    this.game = game
    this.children = []
    this.dynamicChildren = []
    this.props = { ...props }
  }

  updateProps(props) {
    // TODO: Compare with previous props and only act on things that changed
    this.props = { ...props }
  }

  update() {
    if (this.props.dynamic) this.updateProps(this.props)
    for (const child of this.dynamicChildren) child.update()
  }
}
