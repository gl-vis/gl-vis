module.exports = function initGLVis (regl) {
  const GLVis = {}

  Object.assign(GLVis, {
    Scene: require('./lib/scene')(regl, GLVis),
    Viewport: require('./lib/viewport')(regl, GLVis),
    Plot2D: require('./lib/plot2d')(regl, GLVis),
    Axes2D: require('./lib/axes2d')(regl, GLVis)
  })

  return GLVis
}
