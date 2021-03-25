(function() {
  var script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  document.head.appendChild(script);
})();

