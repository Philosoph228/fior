var evt = new CustomEvent("botdata", {
  detail: {
    chat : this.chat
  }
});

document.dispatchEvent(evt);

