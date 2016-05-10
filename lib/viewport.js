module.exports = (regl) => {
  function Viewport () {
    // viewbox
    this.box = [0, 0, 1, 1]
    this.pixelRatio = 1

    // background color
    this.background = [1, 1, 1, 1]

    // borders
    this.borderWidth = [1, 1, 1, 1]
    this.borderColor = [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1]
    ]
    this.borderEnable = [false, false, false, false]
  }

  Object.assign(Viewport.prototype, {
    update: function (opts) {
      this.box = opts.box
      this.pixelRatio = opts.pixelRatio

      this.background = opts.background

      this.borderWidth = opts.borderWidth
      this.borderColor = opts.borderColor
      this.borderEnable = opts.borderEnable
    },

    render: function (body) {
      this._setup(() => {
        regl.clear({
          color: this.background,
          depth: 1,
          stencil: 0
        })
        body()
        this._renderBorders()
      })
    },

    destroy: function () {
    },

    _setup: regl({
      uniforms: {
        pixelSize: function () {
          return [
            this.pixelRatio / (this.box[2] - this.box[0]),
            this.pixelRatio / (this.box[3] - this.box[1])
          ]
        },

        pixelToViewport: function () {
          return [
            this.pixelRatio / (this.box[2] - this.box[0]), 0, 0,
            0, this.pixelRatio / (this.box[3] - this.box[1]), 0,
            -1, -1, 1
          ]
        }
      },

      scissor: {
        enable: true,
        box: function () {
          return this.box
        }
      },

      viewport: function () {
        return this.box
      }
    }),

    _renderBorders: regl({
      frag: `
      precision lowp float;
      uniform vec4 color[4];
      varying vec4 side;
      void main () {
        gl_FragColor =
          side.x * color[0] +
          side.y * color[1] +
          side.z * color[2] +
          side.w * color[3];
      }`,

      vert: `
      precision mediump float;

      attribute vec2 position;
      attribute vec4 offset, boundary;

      uniform vec2 pixelSize;
      uniform vec4 borderWidth, borderEnable;

      varying vec4 side;

      void main () {
        vec4 s = borderWidth * borderEnable * offset;
        vec2 viewOffset = pixelSize * vec2(s.z + s.x, s.w + s.y);
        side = boundary;
        gl_Position = vec4(position + viewOffset, 0, 1);
      }`,

      attributes: {
        position: regl.buffer([
          [-1, -1], [-1, -1], [-1, 1],
          [-1, 1], [-1, -1], [-1, 1],

          [-1, -1], [-1, -1], [1, -1],
          [1, -1], [-1, -1], [1, -1],

          [1, -1], [1, -1], [1, 1],
          [1, 1], [1, -1], [1, 1],

          [-1, 1], [-1, 1], [1, 1],
          [1, 1], [-1, 1], [1, 1]

        ]),
        offset: regl.buffer([
          [-1, -1, 0, 0],
          [1, -1, 0, 0],
          [-1, 0, 0, 1],
          [-1, 0, 0, 1],
          [1, -1, 0, 0],
          [1, 0, 0, 1],

          [-1, -1, 0, 0],
          [-1, 1, 0, 0],
          [0, -1, 1, 0],
          [0, -1, 1, 0],
          [-1, 1, 0, 0],
          [0, 1, 1, 0],

          [0, -1, -1, 0],
          [0, -1, 1, 0],
          [0, 0, -1, 1],
          [0, 0, -1, 1],
          [0, -1, 1, 0],
          [0, 0, 1, 1],

          [-1, 0, 0, -1],
          [-1, 0, 0, 1],
          [0, 0, 1, -1],
          [0, 0, 1, -1],
          [-1, 0, 0, 1],
          [0, 0, 1, 1]
        ]),
        boundary: regl.buffer([
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],

          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],

          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],

          [0, 0, 0, 1],
          [0, 0, 0, 1],
          [0, 0, 0, 1],
          [0, 0, 0, 1],
          [0, 0, 0, 1],
          [0, 0, 0, 1]
        ])
      },

      uniforms: {
        box: function () {
          return this.box
        },

        borderWidth: function () {
          return this.borderWidth
        },

        borderEnable: function () {
          return this.borderEnable
        },

        'color[0]': function () {
          return this.borderColor[0]
        },

        'color[1]': function () {
          return this.borderColor[1]
        },

        'color[2]': function () {
          return this.borderColor[2]
        },

        'color[3]': function () {
          return this.borderColor[3]
        }
      },

      scissor: { enable: false },

      primitive: 'triangles',

      count: function () {
        return this.borderEnable[0] ||
               this.borderEnable[1] ||
               this.borderEnable[2] ||
               this.borderEnable[3] ? 24 : 0
      }
    })
  })
  return Viewport
}
