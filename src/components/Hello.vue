<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Ucenter Project</h2>
  </div>
</template>
<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Qmore'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1, h2 {
    font-weight: normal;
  }

  .hello {
    margin-top: 200px;
    text-align: center;

  h2 {
    margin-top: 1rem;
  }

  }
</style>
