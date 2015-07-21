let pageinfo;

// catch sendMessage from background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  sendResponse(pageinfo);
});

//------------------------------------------------------------------------------

// catch postMessage from web_accessible_resource.js
window.addEventListener('message', function(event) {
  // return if message from unknown
  if (event.origin !== location.origin || event.data.method !== 'got') {
    return;
  }

  // save page info
  pageinfo = null;
  pageinfo = event.data.pageinfo;

  // send message to index.js
  chrome.runtime.sendMessage({ method: 'saved' });
}, false);

//------------------------------------------------------------------------------

// inject web_accessible_resource.js to website
let script = document.createElement('script');

script.addEventListener('load', function(event) {
  window.addEventListener('load', function(event) {
    // get page info
    postMessage({ method: 'get' }, location.href);
  });
}, false);
script.src = chrome.extension.getURL('/web_accessible_resource.js');

// background not has appendChild
if (!!document.body && !!document.body.appendChild) {
  document.body.appendChild(script);
}
