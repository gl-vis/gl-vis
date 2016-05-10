const regl = require('regl')()
const GLVis = require('../glvis')(regl)

const scene = new GLVis.Scene()

scene.viewport.update({
  box: [0, 0, regl.stats.width, regl.stats.height],
  pixelRatio: regl.stats.pixelRatio,
  background: [0, 1, 0, 1],
  borderWidth: [20, 3, 5, 40],
  borderColor: [
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [1, 0, 1, 1],
    [0, 0, 0, 1]
  ],
  borderEnable: [true, true, true, true]
})

regl.frame(() => {
  scene.render()
})
