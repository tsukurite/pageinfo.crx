<template>
  <section class="id-area">
    <area-header title="ID" background="#75b2d1"></area-header>
    <info-list label-background="#ebeff0" items="{{items}}"></info-list>
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
