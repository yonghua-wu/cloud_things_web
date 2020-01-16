<template>
  <div>
    <el-container class="container">
      <el-main class="main">
        <el-row type="flex" justify="center" class="row">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
            <el-card class="card" shadow="hover">
              <div slot="header">
                <slot name="header"></slot>
              </div>
              <slot name="main"></slot>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "../globel";
.container {
  height: 100vh;
  width: 100vw;
  .main {
    background-color: $color-main;
    .row {
      height: 100%;
      align-items: center;
    }
  }
}
</style>