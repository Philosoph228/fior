var _chat = null;

(function() {
  var script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  document.head.appendChild(script);

  document.addEventListener("botdata", function (e) {
    _chat = e.chat;
    console.log('received', _chat);
  });
})();

(() => {
  let box = document.createElement("div");
  box.id = "bot_popup";
  box.style.left = 0;
  box.style.top = 0;

  let popupControlBox = document.createElement("div");
  popupControlBox.classList.add("bot-ns", "control-group"); 

  let hideBtn = document.createElement("div");
  hideBtn.classList.add("bot-ns", "control-btn");
  hideBtn.innerText = "\u25bc\ufe0e";

  hideBtn.addEventListener('click', (e) => {
    let box = e.target.closest("#bot_popup");
    let content = box.querySelector(".content");
    console.log(content);
    content.style.display = content.style.display == "none" ? null : "none";
  });

  popupControlBox.appendChild(hideBtn);

  let closeBtn = document.createElement("div");
  closeBtn.classList.add("bot-ns", "control-btn");
  closeBtn.innerText = "\u274c\ufe0e";

  closeBtn.addEventListener('click', (e) => {
    e.target.closest("#bot_popup").remove();
  });

  popupControlBox.appendChild(closeBtn);

  let caption = document.createElement("div");
  caption.classList.add("bot-ns", "caption", "clearfix");
  caption.innerText = "Bot settings";

  caption.appendChild(popupControlBox);
  
  document.body.addEventListener('mousemove', (e) => {
    if (this.dragged)
    {
      box.style.left = (e.clientX - this.dragPointX) + "px";
      box.style.top = (e.clientY - this.dragPointY) + "px";
    }
  });

  caption.addEventListener('mousedown', (e) => {
    this.dragged = true;
    this.dragPointX = e.offsetX;
    this.dragPointY = e.offsetY;
  });

  document.body.addEventListener('mouseup', () => {
    this.dragged = false;
  });

  let regexInputSpan = document.createElement("span");
  regexInputSpan.innerText = "RegEx pattern:";

  let regexInput = document.createElement("input");

  let replyInputSpan = document.createElement("span");
  replyInputSpan.innerText = "Reply:";

  let replyInput = document.createElement("input");

  let content = document.createElement("div");
  content.classList.add("bot-ns", "content");

  content.appendChild(regexInputSpan);
  content.appendChild(regexInput);
  content.appendChild(replyInputSpan);
  content.appendChild(replyInput);

  let actionBtn = document.createElement("button");

  actionBtn.classList.add("bot-ns");
  actionBtn.innerText = "Do stuff";
  actionBtn.addEventListener('click', (evt) => {
    try {
      _chat.sendMessage("Hello!");
    }
    catch (ex) {
      let box = evt.target.closest("#bot_popup"); 
      let log = box.querySelector("textarea");
      log.innerText = ex;
    }
  });

  let logArea = document.createElement("textarea");

  content.appendChild(actionBtn);
  content.appendChild(logArea);

  box.appendChild(caption);
  box.appendChild(content);

  document.body.appendChild(box);
})();

