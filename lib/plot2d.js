module.exports = function (regl, GLVis) {
  function Plot2D () {
    this.viewport = new GLVis.Viewport()
    this.axes = new GLVis.Axes2D()
    this.traces = []
    this.overlays = []
  }

  Object.assign(Plot2D.prototype, {
    update: function () {
    },

    render: function () {
    },

    destroy: function () {
    }
  })

  return Plot2D
}
