<template>
  <div class="library-logo">
    <div class="logo">
      <a href="{{logoHref}}" target="_blank">
        <img src="{{logoSrc}}" width="47" height="47" alt="logo">
      </a>
    </div>
    <div class="info">
      <a href="{{libraryHref}}" target="_blank">{{libraryName}}</a>
    </div>
    <div class="version">{{libraryVersion}}</div>
  </div>
</template>

<style>
  .library-logo {
    background-color: #f5f5ef;
  }

  .library-logo .logo {
    padding-top: 0.3rem;
  }

  .library-logo .info {
    padding: 0.2rem 0 0.4rem 0;
  }

  .library-logo .info a {
    color: #53a169;
  }

  .library-logo .info a:hover {
    text-decoration: none;
  }

  .library-logo .version {
    background-color: #e5ede4;
    font-weight: bold;
    padding: 0.3rem 0;
  }
</style>

<script lang="babel">
  export default {
    props: [
      'logoHref',
      'logoSrc',
      'libraryHref',
      'libraryName',
      'libraryVersion',
    ],
  }
</script>
