class Bot {
  constructor() {
    this.desiredAnswer = 993;
    this.delayMutex = false;

    chat.addEventListener(chat.Event.CONNECTED, this.resetState.bind(this));
    chat.addEventListener(chat.Event.DISCONNECTED, this.resetState.bind(this));
    chat.addEventListener(chat.Event.MESSAGE_RECEIVED, this.onMessageReceived.bind(this));
  }

  resetState() {
    this.delayMutex = false;
    this.desiredAnswer = 993;

    clearTimeout(this.writingTimeout);

    this.writingTimeout = null;
  }

  onMessageReceived(type, content) {
    if (type != chat.MessageType.TEXT) {
      return;
    }

    let answer = parseInt(content.replace(/\D/g, ""));
    let valid = answer == this.desiredAnswer;

    if (!valid && this.delayMutex) {
      return;
    }

    this.delayMutex = true;

    if (valid) {
      this.desiredAnswer -= 7;
    }
    else if (!isNaN(answer)) {
      this.desiredAnswer = 993;
    }

    clearTimeout(this.writingTimeout);

    this.writingTimeout = setTimeout(() => {
      chat.setStartedTyping();

      this.writingTimeout = setTimeout(() => {
        chat.setFinishedTyping();    
        chat.sendMessage((this.desiredAnswer + 7) + "-7?");

        this.delayMutex = false;
      }, 3000 + Math.random() * 3000);
    }, 3000 + Math.random() * 3000);
  }
}

var bot = new Bot(); 

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


  // Begin table
  let editableNow = null;
  
  function cellEdit(evt) {
    if (editableNow)
    {
      editableNow.contentEditable = false;
      editableNow.classList.remove('editable');
    }
  
    let el = evt.target;
    el.contentEditable = true;
    el.classList.add('editable');
    el.focus();
  
    editableNow = el;
    
    el.addEventListener("keydown", ({key}) => {
      if (key === "Enter" || key === "Escape") {
        if (editableNow)
        {
          editableNow.contentEditable = false;
          editableNow.classList.remove('editable');
        }
      }
    })
    
    document.body.addEventListener('mousedown', (e) => {
      if (editableNow && e.target != editableNow) {
        editableNow.contentEditable = false;
        editableNow.classList.remove('editable');
      }
      
      document.removeEventListener('mousedown', this, true);
    });
  }
  
  let template = document.createElement('template');
  template.innerHTML = '<tr><td></td><td></td><td></td></tr>';
  
  let tableTemplate = document.createElement('template');
  tableTemplate.innerHTML = `
    <table id="data_table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
    <tbody>
    </tbody>
  </table>
  `;
  
  function rowRemover(evt) {
    evt.target.closest('tr').remove();
  }
  
  let tableNode = tableTemplate.content.cloneNode(true);
  let headerData = tableNode.querySelectorAll('th');
  headerData[0].innerText = 'Match Pattern';
  headerData[1].innerText = 'Replacement'

  let content = document.createElement("div");
  content.classList.add("bot-ns", "content");

  content.appendChild(regexInputSpan);
  content.appendChild(regexInput);
  content.appendChild(replyInputSpan);
  content.appendChild(replyInput);
  content.appendChild(tableNode);

  let actionBtn = document.createElement("button");

  actionBtn.classList.add("bot-ns");
  actionBtn.innerText = "Do stuff";
  actionBtn.addEventListener('click', (evt) => {
    try {
      chat.sendMessage(messageFormer());
      state -= 7;
    }
    catch (ex) {
      let box = evt.target.closest("#bot_popup"); 
      let log = box.querySelector("textarea");
      log.innerText = ex;
    }
  });
  
  // End table

  let logArea = document.createElement("textarea");

  content.appendChild(actionBtn);
  content.appendChild(logArea);

  box.appendChild(caption);
  box.appendChild(content);

  document.body.appendChild(box);
  
  for (let i = 0; i < 10; ++i)
  {
    let node = template.content.cloneNode(true);
    let rowData = node.querySelectorAll('td');
    rowData[0].innerText = 'All';
    rowData[1].innerText = 'Hello ' + i;
    
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&#x1F5D1;';
    deleteBtn.addEventListener('click', rowRemover, true);
    
    rowData[0].addEventListener('dblclick', cellEdit);
    rowData[1].addEventListener('dblclick', cellEdit);
    rowData[2].appendChild(deleteBtn);
    
    document.body.querySelector('#data_table tbody').appendChild(node);
  }
})();


