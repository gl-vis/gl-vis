# gl-vis take 2

*Repurposing this repo for the next iteration of gl-vis*

The goal of this project is to consolidate a bunch of fractured efforts in gl-vis into a single optimized chart rendering engine.

Some high level goals are:

* Support animations
* Stereo/VR rendering
* Reduce overhead when updating and uploading data
* Reduce bundle size
* Improve performance
* Improve maintainability
* Continuous integration and unit testing (via headless-gl)

Technology stack:

* glslify
* stack.gl geometry/math code
* regl
* babel/es6

# New architecture

Design concepts:

* Retained mode
* Low level interfaces, do as little parsing as possible
* Specialized, fast and simple interfaces over generic and easy
* Keep rendering pure (data down, events up)
* Use assertions everywhere
* Reuse data sources when possible
* Render only when screen changes

Scene hierarchy

* Root container
    * Text rendering
    * Plots
        * Viewport
        * Axes
            * Tick data source
        * Traces
            * Data source
        * Labels and overlays
