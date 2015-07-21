<template>
  <section class="meta-area">
    <area-header title="meta" background="#8781c7"></area-header>
    <info-list label-background="#ecebf3" items="{{items}}"></info-list>
  </section>
</template>

<style>
</style>

<script lang="babel">
  import areaHeader from '../area-header';
  import infoList from '../info-list';

  export default {
    props: [
      'items',
    ],
    components: {
      'area-header': areaHeader,
      'info-list': infoList,
    },
  }
</script>
