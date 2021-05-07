<template>
  <div class="header-box">
    <div class="header-top">
      <div class="header-width">
        <div class="web-name">吉好选</div>
        <div class="web-btn">
          <!-- <div>{{ userInfo.userInfo.nickName }}</div> -->
          <a-dropdown class="username">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ userInfo.userInfo.nickName }}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="navTo('myOrders') ">
                个人中心
              </a-menu-item>
              <a-menu-item @click="navToPersionOrder(4)">
                评价晒单

              </a-menu-item>
              <a-menu-item @click="navTo('myCollection')">
                收藏商品

              </a-menu-item>
              <a-menu-item @click="navTo('safeSetting')">
                安全设置

              </a-menu-item>
              <a-menu-item @click="logOut">
                退出登录

              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div class="line">|</div>
          <div class="cursor" @click="navToPersionOrder(0)">我的订单</div>
        </div>
      </div>

    </div>
    <div class="header-bottom">
      <div class="header">
        <div class="header-logo-tab">
          <div class="header-left cursor">
            <img src="@/assets/images/login/logo.png" class="header-logo" @click="navToMain" alt="" srcset="">
          </div>
          <div class="header-center">
            <div class="header-main header-item header-select">订单页</div>
          </div>
        </div>

        <div class="header-right">
          <!-- <a-badge :count="cartCount">
            <img src="@/assets/icons/shop-cart.png" width="22" height="22" @click="navToShopCart">
          </a-badge>
          <div style="margin-left:15px">我的购物车</div>  -->
          <el-steps style="width:600px;    margin-right: -65px;" :active="1" finish-status="success" align-center>
            <el-step title="确认订单信息"></el-step>
            <el-step title="成功提交订单"></el-step>
            <el-step title="确认收货"></el-step>
            <el-step title="评价"></el-step>
          </el-steps>

        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { cartGoodscount } from '@/api/index' //  获取购物车列表
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      select: 'main',
      active: 0,
    }
  },
  computed: {
    ...mapGetters(['cartCount', 'userInfo']),
  },
  created() {},
  mounted() {
    console.log(this.userInfo)
    if (localStorage.getItem('Access-Token')) {
      cartGoodscount().then((res) => {
        // console.log(res)
        // this.goodsCount = res.data
        // console.log(this.$store.state)

        this.$store.commit('SET_CARTCOUNT', res.data)
        localStorage.setItem('cartCount', res.data)
      })
    }

    // console.log(this.$route.fullPath)
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
    logOut() {
      this.$store.dispatch('Logout')
    },
    navTo(id) {
      const data = [id, 0]
      this.navToPersion()
      this.$store.commit('SET_PERSON_DATA', data)
    },

    navToPersionOrder(id) {
      const data = ['myOrders', id]
      this.navToPersion()
      this.$store.commit('SET_PERSON_DATA', data)
    },
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
      // console.log(localStorage.getItem('Access-Token'))
      if (localStorage.getItem('Access-Token')) {
        this.$router.push({
          path: '/base/person',
        })
      } else {
        // console.log(1)
        this.$router.push({
          path: '/login',
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.header-box {
  .header-top {
    height: 32px;
    background: #e3e4e5;

    .header-width {
      margin: 0 auto;
      width: 1170px;
      height: 32px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      .web-name {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #8b8b8b;
        letter-spacing: 0;
      }
      .web-btn {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        div {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #8b8b8b;
          letter-spacing: 0;
        }
        .line {
          margin: 0 11px;
        }
        .username {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #8b8b8b;
          letter-spacing: 0;
        }
      }
    }
  }
  .header-bottom {
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    .header {
      height: 120px;
      width: 100%;
      width: 1170px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      box-sizing: border-box;
      margin: 0 auto;
      .header-logo-tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header-left {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: 19.93px;
          color: #d8c199;
          letter-spacing: 0;
          margin-right: 16px;

          .header-logo {
            //width: 147px;
            //height: 60px;
            width: 147px;
            height: 57px;
            margin-right: 10px;
          }
        }

        .header-center {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #8b8b8b;
          letter-spacing: 0;

          .header-main {
            margin-right: 60px;
          }

          .header-item {
            cursor: pointer;
            font-weight: 600;
          }

          .header-select {
            //font-family: PingFangSC-Regular;
            //font-size: 18px;
            //color: #424242;
            //letter-spacing: 0;
            font-size: 20px;
            color: #424242;
            letter-spacing: 0;
          }
        }
      }

      .header-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #424242;
        letter-spacing: 0;

        .header-item {
          cursor: pointer;
          font-weight: 600;
        }

        .header-select {
          font-family: PingFangSC-Regular;
          color: #424242;
          font-size: 18px;
          letter-spacing: 0;
        }

        .header-person {
          margin-left: 38px;
        }
        .person-logo {
          height: 30px;
          width: 30px;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>
