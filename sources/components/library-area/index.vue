<template>
  <section class="library-area">
    <area-header title="Library" background="#7ac08e"></area-header>
    <ul class="libraries clearfix">
      <li class="library" v-repeat="libraries">
        <library-logo
          logo-href="{{logo.href}}"
          logo-src="{{logo.src}}"
          library-href="{{library.href}}"
          library-name="{{library.name}}"
          library-version="{{library.version}}">
        </library-logo>
      </li>
    </ul>
  </section>
</template>

<style>
  .library-area ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .library-area li {
    float: left;
    width: 33.3%;
  }
</style>

<script lang="babel">
  import merge from 'lodash.merge';

  import areaHeader from '../area-header';
  import libraryLogo from '../library-logo';

  export default {
    data() {
      return {
        libraries: merge(this.libraries, require('./libraries'), [
          {
            logo: {
              src: require('./jquery.png'),
            },
          },
          {
            logo: {
              src: require('./three.png'),
            },
          },
          {
            logo: {
              src: require('./d3.png'),
            },
          },
        ])
      };
    },
    props: [
      'libraries',
    ],
    components: {
      'area-header': areaHeader,
      'library-logo': libraryLogo,
    },
  }
</script>
