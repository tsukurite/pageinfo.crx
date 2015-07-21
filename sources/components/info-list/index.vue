<template>
  <div class="info-list">
    <info-item label-background="{{labelBackground}}" v-repeat="items"></info-item>
  </div>
</template>

<style>
  .info-list {
    width: 100%;
  }
</style>

<script lang="babel">
  import infoItem from '../info-item';

  export default {
    props: [
      'labelBackground',
      'items',
    ],
    components: {
      'info-item': infoItem,
    },
  }
</script>
