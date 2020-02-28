<template>
  <div class="operation">
    <h3>对云端设备数据的操作方法</h3>
    <h4>验证</h4>
    <ul>
      <li>Client ID: <span>{{device.id}}</span></li>
      <li>username: <span>{{device.name}}</span></li>
      <li>password: <span>{{device.key}}</span></li>
    </ul>
    <h4>主题</h4>
    <ul>
      <li>设备向该主题发布消息，可更新数据：<span>$ct/iot/device/{{device.userId}}/{{device.name}}/put</span></li>
      <li>设备订阅该主题，可以获取下发的数据：<span>$ct/iot/device/{{device.userId}}/{{device.name}}/get</span></li>
    </ul>
    <h4>载荷</h4>
    <div>更新数据：</div>
    <span>
      {
        <div v-for="(item, index) in model.attributes" :key="index">
          <span>"{{item.name}}": {{item.value_type}}</span>
        </div>
      }
    </span>
  </div>
</template>

<script>
export default {
  props: {
    device: Object,
    model: Object
  }
}
</script>

<style lang="scss">
@import "@/globel";
.operation {
  span {
    display: inline-block;
    background-color: $color-main + 160;
    // color: #fff;
    padding: 3px 6px;
    margin: 2px;
    border-radius: 3px;
  }
}
</style>
