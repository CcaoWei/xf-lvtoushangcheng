<template>
  <div class="footer" :class="cashier ? 'footer-person':''">
    <!--    Copyright © 2018. The is not responsible for the content of external sites. Read about our approach to external linking.-->
    <div class="top">
      <!--      <div class="text">关于我们</div>-->
      <!--      <div class="icon">｜</div>-->
      <!--      <div class="text">帮助中心</div>-->
      <!--      <div class="icon">｜</div>-->
      <!--      <div class="text">售后服务</div>-->
      <!--      <div class="icon">｜</div>-->
      <!--      <div class="text">配送与验收</div>-->
      <!--      <div class="icon">｜</div>-->
      <!--      <div class="text">商务合作</div>-->
      <!--      <div class="icon">｜</div>-->
      <!--      <div class="text">企业采购</div>-->
      <!--      <div class="icon">｜</div>-->
      <!--      <div class="text">开放平台</div>-->
      <!--      <div class="icon">｜</div>-->
      <!--      <div class="text">搜素推荐</div>-->
      <!--      <div class="icon">｜</div>-->
      <!--      <div class="text">友情链接</div>-->
    </div>
    <div class="down">
      <div class="text">公网安备110000020000088</div>
      <div class="icon">｜</div>
      <div class="text">ICP证070359号</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cashier: false
    }
  },
  computed: {},
  created() {
    if (this.$route.path === '/base/person') {
      this.cashier = true
    } else {
      this.cashier = false
    }
  },
  mounted() {
  },
  methods: {},
  watch: {
    $route(to, from) {
      if (this.$route.path === '/base/person') {
        this.cashier = true
      } else {
        this.cashier = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  height: 108px;

  width: 100%;
  min-width: 1170px;

  background: #f7f7f8;
  // position: fixed;
  // bottom: 0;
  text-align: center;
  font-size: 12px;
  color: #8b8b8b;
  letter-spacing: 0;
  padding-top: 20px;
}

.footer-person {
  background: #fff;
}

.top{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 17px;
  margin-bottom: 18px;
  .text{
    font-size: 12px;
    color: #8B8B8B;
    letter-spacing: 0;
  }
  .icon{
    font-size: 11px;
    color: #CACACA;
    letter-spacing: 0;
    margin-left: 5px;
    margin-right: 5px;
  }
}
.down{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #CACACA;
  letter-spacing: 0;
  height: 17px;
  .text{}
  .icon{
    margin-left: 4px;
    margin-right: 4px;
  }
}
</style>
