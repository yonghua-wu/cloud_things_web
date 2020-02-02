<template>
  <div>user</div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    this.$http.sso.get('/user').then( res => {
      // eslint-disable-next-line no-console
      console.log(res)
    })
  }
}
</script>

<style>

</style>