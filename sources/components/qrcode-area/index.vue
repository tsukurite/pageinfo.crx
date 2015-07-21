<template>
  <section class="qrcode-area">
    <area-header title="QR code" background="#ebb765"></area-header>
    <div class="qrcode-frame">
      <img src="{{qrcode}}" width="123" height="123" alt="">
    </div>
  </section>
</template>

<style>
  .qrcode-area .qrcode-frame {
    background-color: #f5f5ef;
    padding: 10px;
  }

  .qrcode-area .qrcode-frame img {
    display: block;
    margin: 0 auto;
  }
</style>

<script lang="babel">
  import QRcode from 'qrcode-js';

  import areaHeader from '../area-header';

  export default {
    computed: {
      qrcode() {
        return this.qrcode = QRcode.toDataURL(this.url, 6);
      },
    },
    props: [
      'url'
    ],
    components: {
      'area-header': areaHeader,
    },
  }
</script>
