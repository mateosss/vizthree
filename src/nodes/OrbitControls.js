import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.1-ABR1EJL0AQkCASkHoEad/mode=imports,min/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.131.1/examples/jsm/controls/OrbitControls.js"

export default class OrbitControlsNode {
  constructor(game, props) {
    this.controls = new OrbitControls(game.camera, game.renderer.domElement)
    this.game = game
  }

  update() {
    this.controls.update()
  }
}
