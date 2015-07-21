<template>
  <header class="component-header">
    <h1 style="background: {{background}}">{{title}}</h1>
  </header>
</template>

<style>
  .component-header h1 {
    color: #ffffff;
    font-size: 120%;
    font-weight: lighter;
    margin: 0;
    padding: 0.6rem 0 0.4rem 0;
    text-align: center;
  }

  /* center arrow */
  .component-header h1::after {
    background-color: inherit;
    content: "";
    display: block;
    height: 10px;
    left: 50%;
    margin-left: -5px;
    position: absolute;
    transform: rotate(45deg);
    width: 10px;
  }
</style>

<script lang="babel">
  export default {
    props: [
      'background',
      'title',
    ],
  }
</script>
