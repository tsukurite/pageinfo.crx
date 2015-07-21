<template>
  <section class="throbber-image">
    <img src="{{throbber.src}}" width="38" height="38" style="display: {{display}}">
  </section>
</template>

<style>
  .throbber-image img {
    animation: rotate-throbber 1.1s step-start 0s infinite;
    left: 50%;
    margin-left: -19px;
    margin-top: -19px;
    position: absolute;
    top: 50%;
  }

  @keyframes rotate-throbber {
  	12.5% { transform: rotate( 45deg); }
  	25%   { transform: rotate( 90deg); }
  	37.5% { transform: rotate(135deg); }
  	50%   { transform: rotate(180deg); }
  	62.5% { transform: rotate(225deg); }
  	75%   { transform: rotate(270deg); }
  	87.5% { transform: rotate(315deg); }
  	100%  { transform: rotate(360deg); }
  }
</style>

<script lang="babel">
  export default {
    data() {
      return {
        throbber: {
          src: require('./throbber.png'),
        },
      };
    },
    props: [
      'display',
    ],
  }
</script>
