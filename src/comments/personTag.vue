<template>
  <div class="tags-box">
    <a-tag>全部订单</a-tag>
    <a-tag>待付款</a-tag>
    <a-tag>待发货</a-tag>
    <a-tag>待收货</a-tag>
    <a-tag>我的评价</a-tag>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.tags-box {
  display: flex;
  //   padding: 0 120px;
  margin-bottom: 50px;
  /deep/ .ant-tag {
    padding: 0 44px;
    height: 60px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #424242;
    text-align: center;
    line-height: 60px;
    margin: 0;
    border-radius: 0;
  }
}
</style>
