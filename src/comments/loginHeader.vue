<template>
  <div class="header">
    <div class="header-left">
      <img src="@/assets/images/login/logo.png" class="header-logo" @click="$router.push('/home')" alt="" srcset="">
      <!-- 小付商城 -->
    </div>
    <div class="header-right">
      <div class="to-login" v-if="$route.fullPath === '/sign' || $route.fullPath === '/businessSign' || $route.fullPath === '/businessSign/enterprise'">已有账号，<span @click="$router.push('/login')">立即登录</span> </div>

      <!--      <img class="right-img" v-else src="@/assets/images/image_login.png" alt="">-->
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      select: 'main',
    }
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.$route.fullPath)
    var str = this.$route.fullPath
    var main = RegExp(/\/base\/main/)
    var classification = RegExp(/\/base\/classification/)
    var shopCart = RegExp(/\/base\/shopCart/)
    var person = RegExp(/\/base\/person/)
    if (main.exec(str)) {
      this.select = 'main'
    }
    if (classification.exec(str)) {
      this.select = 'classification'
    }
    if (shopCart.exec(str)) {
      this.select = 'shopCart'
    }
    if (person.exec(str)) {
      this.select = 'person'
    }
  },
  methods: {
    navToMain() {
      this.select = 'main'
      this.$router.push({
        path: '/home',
      })
    },
    navToClass() {
      this.select = 'classification'
      this.$router.push({
        path: '/base/classification',
      })
    },
    navToShopCart() {
      this.select = 'shopCart'

      this.$router.push({
        path: '/base/shopCart',
      })
    },
    navToPersion() {
      this.select = 'person'

      this.$router.push({
        path: '/login',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  height: 83px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 82px 0 126px;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
  .header-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #979797;
    font-family: PingFangSC-Regular;
    font-size: 19.93px;
    color: #d8c199;
    letter-spacing: 0;
    .header-logo {
      //width: 147px;
      //height: 60px;
      width: 147px;
      height: 57px;
    }
  }
  .header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #8b8b8b;
    letter-spacing: 0;
    .right-img {
      height: 24px;
      width: 396px;
    }
    .to-login {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #adadad;
      line-height: 22px;
      span {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #a9936b;
        font-weight: 600;
        cursor: pointer;
      }
      span:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
