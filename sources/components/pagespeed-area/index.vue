<template>
  <section class="pagespeed-area">
    <a href="https://developers.google.com/speed/pagespeed/insights/?url={{url}}" target="_blank">Google PageSpeed Insights</a>
  </section>
</template>

<style>
  .pagespeed-area {
  	background-color: #e6e6e6;
  	padding: 1em 0;
  	text-align: center;
  }
  
  .pagespeed-area a {
  	background-color: #5b88a9;
  	border-radius: 30px;
  	color: #ffffff;
  	padding: 0.2em 0.8em;
  	text-decoration: none;
  }
  
  .pagespeed-area a::before {
  	content: "";
  	border: 5px solid transparent;
  	border-left: 5px solid #f5f4b4;
  	display: inline-block;
  	height: 0;
  	width: 0;
  }
</style>

<script lang="babel">
  export default {
    props: [
      'url'
    ],
  }
</script>
