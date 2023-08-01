const Layer = {
  layerUI: null,

  activate(sourceFrameId, registryEntry) {
    console.log("----------- Layers -----------", sourceFrameId, ' -- ', registryEntry);
    this.open(sourceFrameId)
  },

  async init() {
    if (!this.layerUI) {
      this.layerUI = new UIComponent(
        "pages/vomnibar.html",
        "layerFrame",
        function () {}
      );
    }
  },

  open(sourceFrameId) {
    this.init();
  },
};

window.Layer = Layer;
