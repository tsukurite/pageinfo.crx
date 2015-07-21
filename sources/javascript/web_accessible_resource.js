let pageinfo = {

  /**
   * get data from website
   */
  get() {
    return {
      basic: {
        title: this.basic.title(),
        meta: this.basic.meta(),
        url: this.basic.url(),
      },
      versions: {
        jQuery: this.versions.jQuery(),
        three: this.versions.three(),
        D3: this.versions.D3(),
      },
      google: {
        analytics: this.google.analytics(),
        ga: this.google.ga(),
      },
      facebook: {
        appId: this.facebook.appId(),
        ogp: this.facebook.ogp(),
      },
      mixi: {
        checkButton: this.mixi.checkButton(),
        favoriteButton: this.mixi.favoriteButton(),
      },
    };
  },

  //----------------------------------------------------------------------------

  basic: {

    /**
     * get page title
     */
    title() {
      let tag = document.querySelector('title');

      return (tag !== null) ? tag.textContent : null;
    },

    /**
     * get meta data
     */
    meta() {
      let map = {},
          tags = document.querySelectorAll(
            'meta[name="keywords"], meta[name="description"]');

      Array.prototype.forEach.call(tags,
        (tag) => map[tag.getAttribute('name')] = tag.getAttribute('content')
      );

      return map;
    },

    /**
     * get url
     */
    url() {
      return location.href;
    },

  },

  //----------------------------------------------------------------------------

  versions: {

    /**
     * get jQuery version
     */
    jQuery() {
      return (
        typeof jQuery === 'function' &&
        typeof jQuery.fn === 'object'
      ) ? jQuery.fn.jquery : null;
    },

    /**
     * get three.js version
     */
    three() {
      return (typeof THREE === 'object') ? THREE.REVISION : null;
    },

    /**
     * get D3.js version
     */
    D3() {
      return (typeof d3 === 'object') ? d3.version : null;
    },

  },

  //----------------------------------------------------------------------------

  google: {

    /**
     * get analytics.js tracking ids
     */
    analytics() {
      return (
        typeof ga === 'function' &&
        typeof ga.getAll === 'function' &&
        Array.isArray(ga.getAll())
      ) ? ga.getAll().map(
        (tracker) => tracker.get('trackingId')
      ) : null;
    },

    /**
     * get ga.js tracking ids
     */
    ga() {
      return (
        typeof _gat === 'object' &&
        typeof _gat._getTrackers === 'function' &&
        Array.isArray(_gat._getTrackers())
      ) ? _gat._getTrackers().map(
        (tracker) => tracker._getAccount()
      ): null;
    },

  },

  //----------------------------------------------------------------------------

  facebook: {

    /**
     * get facebook appId
     */
    appId() {
      let re = /appId=(\d*)/,
          tag = document.getElementById('facebook-jssdk');

      return (tag !== null && re.test(tag.src)) ? re.exec(tag.src)[1] : null;
    },

    /**
     * get OGP data
     */
    ogp() {
      let map = {},
          tags = document.querySelectorAll('meta[property^="og:"');

      Array.prototype.forEach.call(tags, 
        (ogp) => map[ogp.getAttribute('property')] = ogp.content
      );

      return map;
    },

  },

  //----------------------------------------------------------------------------

  mixi: {

    /**
     * get check button data
     */
    checkButton() {
      let iframes = document.querySelectorAll('iframe[id^="mixi-check-iframe"]');

      if (iframes.length <= 0) {
        return null;
      }

      return Array.prototype.slice.call(iframes, (iframe) => {
        let re = /k=(\w+)/;

        return (re.test(iframe.src)) ? re.exec(iframe.src)[1] : null;
      });
    },

    /**
     * get favorite button data
     */
    favoriteButton() {
      let iframes = document.querySelectorAll(
        'iframe[id^="mixi"]:not([id^="mixi-check-iframe"])');

      if (iframes.length <= 0) {
        return null;
      }

      return Array.prototype.slice.call(iframes, (iframe) => {
        let re = /service_key=(\w+)/;

        return (re.test(iframe.src)) ? re.exec(iframe.src)[1] : null;
      });
    },

  },

};

// catch postMessage from content_script.js
window.addEventListener('message', function(event) {
  // return if message from unknown
  if (event.origin !== location.origin) {
    return;
  }

  switch (event.data.method) {
    case 'get':
      // send data to content_script.js
      postMessage({
        method: 'got',
        pageinfo: pageinfo.get(),
      }, location.href);
      break;
  }
}, false);
