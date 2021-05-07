<template>
  <div class="safe-header">
    <div class="head">
      <div class="head-left">
        <div class="head-logo" @click="$router.push({ path: '/home' })">
          <!-- <img src="@/assets/images/logo.png" alt=""> -->
          <img src="@/assets/images/login/logo.png"/>
        </div>
        <h3 class="title" v-text="title"></h3>
      </div>
      <div class="head-right" v-if="title !== '忘记密码'">
        <span class="name">{{ userInfo.userInfo.nickName }}</span>
        <span class="login-out" @click="loginOut">退出</span>
        <span> | </span>
        <span class="my-order" @click="goMyOrder">我的订单</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    loginOut() {
      this.$store.dispatch('Logout')
    },
    goMyOrder() {
      if (localStorage.getItem('Access-Token')) {
        this.$router.push({
          path: '/base/person'
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.safe-header {
  .head {
    height: 120px;
    background: #ffffff;
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.1);
    padding: 0 133px 0 119px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .head-logo {
      width: 147px;
      margin-right: 50px;
      display: inline-block;
      cursor: pointer;

      img {
        width: 100%;
        height: auto;
      }
    }

    .title {
      display: inline;
      font-size: 24px;
      color: #424242;
    }

    .head-right {
      font-size: 14px;

      .name {
        color: #337af9;
      }

      .login-out {
        cursor: pointer;
        margin-left: 12px;
        margin-right: 5px;
        color: #8b8b8b;
      }

      .my-order {
        cursor: pointer;
        margin-left: 5px;
        color: #8b8b8b;
      }
    }
  }
}
</style>
