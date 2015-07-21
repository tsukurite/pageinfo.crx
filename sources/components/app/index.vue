<template>
  <main role="main">
    <throbber-image display="{{throbber.display}}"></throbber-image>
    <library-area libraries="{{libraries}}" v-cloak></library-area>
    <id-area items="{{idAreaItems}}" v-cloak></id-area>
    <meta-area items="{{metaAreaItems}}" v-cloak></meta-area>
    <qrcode-area url="{{qrcode.url}}" v-cloak></qrcode-area>
    <pagespeed-area url="{{pagespeed.url}}" v-cloak></pagespeed-area>
  </main>
</template>

<style>
  [v-cloak] {
    visibility: hidden;
  }

  .clearfix::after {
    content: "";
    clear: both;
    display: block;
  }

  main {
    font-family:
      Arial, Helvetica,
      'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN',
      'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro',
      'ヒラギノ丸ゴ Std', 'Hiragino Maru Gothic Std',
      'ヒラギノ丸ゴ Pro', 'Hiragino Maru Gothic Pro',
      'メイリオ', Meiryo,
      '游ゴシック', 'Yu Gothic', YuGothic,
      sans-serif;
    font-weight: lighter;
    height: 480px;
    width: 320px;
  }
</style>

<script lang="babel">
  import merge from 'lodash.merge';

  import libraryArea from '../library-area';
  import idArea from '../id-area';
  import metaArea from '../meta-area';
  import qrcodeArea from '../qrcode-area';
  import pagespeedArea from '../pagespeed-area';
  import throbberImage from '../throbber-image';

  export default {
    replace: true,
    events: {
      'hook:ready'() {
        // get sendMessage from content_script.js
        chrome.runtime.onMessage.addListener(
          (message, sender, sendResponse) => {
            // return if message from unknown
            if (message.method !== 'saved') {
              return;
            }
          
            this.render();
          }
        );

        this.render();
      },
    },
    data() {
      return {
        throbber: {
          display: 'none',
        },
        libraries: [
          { library: { version: 'none', }, },  // jQuery
          { library: { version: 'none', }, },  // three.js
          { library: { version: 'none', }, },  // D3.js
        ],
        idAreaItems: [],
        metaAreaItems: [],
        qrcode: {
          url: '',
        },
        pagespeed: {
          url: '',
        },
      };
    },
    methods: {
      /**
       * render data
       *
       * @return {Promise}
       */
      render() {
        return Promise
          .resolve()
          .then(
            () => new Promise(function(resolve, reject) {
              let query = {
                active: true,
                currentWindow: true,
              };

              // get current tab id
              chrome.tabs.query(query, function(tabs) {
                resolve(tabs[0].id);
              });
            })
          )
          .then(
            (id) => new Promise(function(resolve, reject) {
              let background = chrome.extension.getBackgroundPage();

              // get pageinfo from background.js
              background.pageinfo.get(id, function(result) {
                resolve(result);
              });
            })
          )
          .then(
            (pageinfo) => {
              log('Promise in render()');

              log('pageinfo: ', pageinfo);
              log('this.$data: ', this.$data);

              // in chrome://extensions, etc.
              if (typeof pageinfo === 'undefined') {
                return;
              }

              //----------------------------------------------------------------

              let { jQuery, three, D3 } = pageinfo.versions;

              merge(this.$data, {
                libraries: [
                  { library: { version: jQuery || 'none' } },
                  { library: { version: three  || 'none' } },
                  { library: { version: D3     || 'none' } },
                ],
              });

              //----------------------------------------------------------------

              // initialize
              this.idAreaItems.splice(0, this.idAreaItems.length);

              if (!!pageinfo.google.analytics) {
                this.idAreaItems.push({
                  template: 'text',
                  label: 'Google Analytics (analytics.js)',
                  value: pageinfo.google.analytics,
                });
              }

              if (!!pageinfo.google.ga) {
                this.idAreaItems.push({
                  template: 'text',
                  label: 'Google Analytics (ga.js)',
                  value: pageinfo.google.ga,
                });
              }

              if (!!pageinfo.facebook.appId) {
                this.idAreaItems.push({
                  template: 'text',
                  label: 'Facebook AppId',
                  value: [
                    pageinfo.facebook.appId,
                  ],
                });
              }

              if (!!pageinfo.mixi.checkButton) {
                this.idAreaItems.push({
                  template: 'text',
                  label: 'mixiチェックキー （チェックボタン）',
                  value: pageinfo.mixi.checkButton,
                });
              }

              if (!!pageinfo.mixi.favoriteButton) {
                this.idAreaItems.push({
                  template: 'text',
                  label: 'mixiチェックキー （イイネ！ボタン）',
                  value: pageinfo.mixi.checkButton,
                });
              }

              //----------------------------------------------------------------

              // initialize
              this.metaAreaItems.splice(0, this.metaAreaItems.length);

              if (!!pageinfo.basic.title) {
                this.metaAreaItems.push({
                  template: 'text',
                  label: 'title',
                  value: [
                    pageinfo.basic.title,
                  ],
                });
              }

              Object.keys(pageinfo.basic.meta).forEach(
                (key) => this.metaAreaItems.push({
                  template: 'text',
                  label: key,
                  value: [
                    pageinfo.basic.meta[key],
                  ],
                })
              );

              // for parse URI
              let a = document.createElement('a');

              try {
                Object.keys(pageinfo.facebook.ogp).forEach(
                  (key) => {
                    let template = 'text';

                    a.href = pageinfo.facebook.ogp[key];

                    if (/^og:image$/i.test(key)) {
                      template = 'image';
                    } else if (/\.(?:gif|jpe?g|png|svg|webp)$/i.test(a.pathname)) {
                      template = 'image';
                    } else if (/^https?:$/i.test(a.protocol)) {
                      template = 'link';
                    }

                    this.metaAreaItems.push({
                      template,
                      label: key,
                      value: [
                        pageinfo.facebook.ogp[key],
                      ],
                    });
                  }
                );
              } finally {
                a = null;
              }

              //----------------------------------------------------------------

              this.qrcode.url = pageinfo.basic.url;

              //----------------------------------------------------------------

              this.pagespeed.url = encodeURIComponent(pageinfo.basic.url);

              //----------------------------------------------------------------

              // hide throbber
              this.throbber.display = 'none';

              // rendered flag
              this.rendered = true;
            }
          )
          .catch(
            (err) => console.error(err)
          );
      },
    },
    components: {
      'library-area': libraryArea,
      'id-area': idArea,
      'meta-area': metaArea,
      'qrcode-area': qrcodeArea,
      'pagespeed-area': pagespeedArea,
      'throbber-image': throbberImage,
    },
  }
</script>
