<template>
  <div class="nav-header">
    <el-link class="back" :underline="false" @click="$router.go(-1)" title="返回"><i class="el-icon-arrow-left"></i></el-link>
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scpoed lang="scss">
@import "@/globel";
.nav-header {
  height: 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid #EBEEF5;
  margin-bottom: 20px;
  @include flex-row;
  align-items: center;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 20px;
  }
  .back {
    font-size: 22px;
  }
}
</style>
