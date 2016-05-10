module.exports = (regl, GLVis) => {
  function Scene () {
    this.viewport = new GLVis.Viewport()
    this.overlays = []
    this.plots = []
  }

  Object.assign(Scene.prototype, {
    update: function (opts) {
      // update overlays
      // update plots
    },

    render: function () {
      this.viewport.render(() => {
        for (let plot of this.plots) {
          plot.render()
        }
        for (let overlay of this.overlays) {
          overlay.render()
        }
      })
    },

    destroy: function () {
    }
  })

  return Scene
}
