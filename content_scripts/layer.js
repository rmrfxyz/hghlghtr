const Layer = {
  layerUI: null,

  activate(sourceFrameId, registryEntry) {
    const options = Object.assign({}, registryEntry.options);
    this.open(sourceFrameId, options);
  },

  async init() {
    if (!this.layerUI) {
      this.layerUI = new UIComponent(
        "pages/layer.html",
        "layerFrame",
        function () {}
      );
    }
  },

  open(sourceFrameId, options) {
    this.init();
    this.layerUI.activate(
      Object.assign(options, { name: "activate", sourceFrameId, focus: true })
    );
  },
};

window.Layer = Layer;
