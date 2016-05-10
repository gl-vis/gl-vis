module.exports = function (regl, GLVis) {
  function Text () {
    this.string = ''
    this.buffer = regl.buffer()
    this.count = 0
  }

  Object.assign(Text, {
    update: function (opts) {
    },

    render2D: regl({
      frag: `
      `,

      vert: `
      `,

      attributes: {
      },

      uniforms: {
      },

      count: function () {
        return this.count
      }
    }),

    render3D: regl({
      frag: `
      `,

      vert: `
      `,

      attributes: {
      },

      uniforms: {
      },

      count: function () {
        return this.count
      }
    }),

    destroy: function () {
      this.buffer.destroy()
    }
  })

  return Text
}
