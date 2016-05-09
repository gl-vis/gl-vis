const initREGL = require('regl')
const createEngine = require('./lib/engine')

module.exports = function initGLVis (gl) {
  const regl = initREGL(gl)
  const engine = createEngine(regl)
  return engine
}
