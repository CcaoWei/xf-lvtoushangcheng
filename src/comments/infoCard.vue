<template>
  <div class="info-card">
    <div class="subtitle">
      {{ subtitle }}
    </div>
    <slot name="content" class="contentBox">
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    subtitle: {
      default() {
        return ''
      },
      type: String,
    },
  },
}
</script>
<style lang="scss" scoped>
.info-card {
  border: 1px solid #cacaca;
  border-radius: 6px;
  margin-bottom: 30px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  .subtitle {
    height: 40px;
    background-color: #f7f7f8;
    font-family: PingFangSC-Regular;
    color: #424242;
    letter-spacing: 0;
    line-height: 40px;
    padding-left: 30px;
    border-bottom: 1px solid #cacaca;
  }
  .contentBox {
    padding: 40px 30px;
  }
}
</style>