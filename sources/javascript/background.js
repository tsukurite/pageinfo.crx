window.pageinfo = {

  /**
   * callback pass to website.
   *
   * @param {Number} id
   * @param {Function} callback
   */
  get(id, callback) {
    // send message to content_scripts.js
    chrome.tabs.sendMessage(id, {}, callback);
  },

};
