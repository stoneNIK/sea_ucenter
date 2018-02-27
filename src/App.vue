<template>
  <div id="app">
    <div class="page-head" id="page-head">
      <seaHeader></seaHeader>
    </div>
    <div class="page-body" id="page-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import seaHeader from './components/Header/index.vue'

  export default {
    name: 'app',
    components: {
      seaHeader
    },
    mounted () {
      let pageBody = document.getElementById('page-body')
      let pageHead = document.getElementById('page-head')
      pageBody.style.height = document.body.clientHeight - pageHead.clientHeight + 'px'
    }
  }
</script>

<style lang="scss">
  @import "styles/reset.scss";
  @import "styles/common.scss";

  html {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 24px;
  }

  body {
    color: #fff;
    height: 100%;
    background: #000 url("./assets/bg.jpg") 50% 100% no-repeat;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .page-head {
      width: 100%;
      height: 60px;
    }
    .page-body {
      position: relative;
      height: 100%;
      overflow: auto;
    }
  }

  .wrapper {
    margin: 0 auto;
    width: 1340px;
  }

  .btn {
    display: inline-block;
    padding: .2rem .5rem;
    font-size: 16px;
    line-height: 1.5;
    color: #f1f1f1;
    background: $yellowColor;
    -webkit-border-radius: .2rem;
    border-radius: .2rem;
    border: 0;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: $yellowColor * .9;
      box-shadow: inset 1px 2px 5px rgba(0, 0, 0, .25);
    }
  }

  .btn.btn-lg {
    min-width: 130px;
  }

  .btn.btn-sm {
    line-height: 1.2;
  }
</style>
