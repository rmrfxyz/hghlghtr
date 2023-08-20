const Layer = {
  LayerUI: null,

  getUI() {
    return this.LayerUI;
  },

  activate(userOptions) {
    const options = {};
    Object.assign(options, userOptions);

    if (this.LayerUI == null) {
      this.LayerUI = new LayerUI();
    }
  },

  hide() {
    if (this.LayerUI) {
      this.LayerUI.hide();
    }
  },

  onHidden() {
    if (this.LayerUI) {
      this.LayerUI.onHidden();
    }
  },
};

class LayerUI {
  constructor() {
    this.onKeyEvent = this.onKeyEvent.bind(this);
    this.onHiddenCallback = null;
    this.initDom();
  }

  hide(onHiddenCallback = null) {
    this.onHiddenCallback = onHiddenCallback;
    UIComponentServer.postMessage("hide");
    this.reset();
  }

  onHidden() {
    if (typeof this.onHiddenCallback === "function") {
      this.onHiddenCallback();
    }
    this.onHiddenCallback = null;
    return this.reset();
  }

  initDom() {
    this.box = document.getElementById("layer0");

    this.box.addEventListener("click", (event) => {
      console.log("clicked the box");
      return event.stopImmediatePropagation();
    });
    // A click anywhere else hides the vomnibar.
    document.addEventListener("click", () => this.hide());
  }

  reset() {
    console.log("-- reset layer --");
  }

  onKeyEvent(event) {
    console.log(event)
  }
}

UIComponentServer.registerHandler(function (event) {
  switch (event.data.name != null ? event.data.name : event.data) {
    case "hide":
      Layer.hide();
      break;
    case "hidden":
      Layer.onHidden();
      break;
    case "activate":
      Layer.activate(event.data);
      break;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await Settings.onLoaded();
  DomUtils.injectUserCss(); // Manually inject custom user styles.
});

window.Layer = Layer;
