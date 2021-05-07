<template>
  <div class="person">
    <!--    <div class="person-info">-->
    <!--      <div class="title">个人中心</div>-->
    <!--      <div class="infoBox">-->
    <!--        <img class="person-img" :src="userInfo.avatarUrl" alt="" />-->
    <!--        <span class="user-name">{{ userInfo.nickName }}</span>-->
    <!--      </div>-->
    <!--      <a-button class="logoutBtn" @click="logOut">退出登录</a-button>-->
    <!--    </div>-->
    <div class="main-block" style="overflow: hidden">
      <!-- 2020年7月20日09:59:05 by 轩如梦 ui图修改 -->
      <!-- <div class="title">个人中心</div>
      <div class="line">
        <div class="shot-line"></div>
        <div class="long-line"></div>
      </div> -->

      <a-row class="person-content">

        <a-col :span="5">
          <div class="person-bt">个人中心</div>
          <div class="check-box" v-for="item in leftMenu" :key="item.key" @click="checkChange(item.key)" :class="item.key == rightContent ? 'checkbox-text-checked' : 'checkbox-text'">
            <span :class="item.class"></span>
            <span class="left-title">{{ item.title }}</span>
          </div>
          <!-- <div class="check-box">
            <span class="iconfont icon-shoucang"></span>
            <span class="checkbox-text">我的收藏</span>
          </div>
          <div class="check-box">
            <span class="iconfont icon-dizhi"></span>
            <span class="checkbox-text">地址管理</span>
          </div>
          <div class="check-box">
            <span class="iconfont icon-yijian"></span>
            <span class="checkbox-text">意见反馈</span>
          </div>
          <div class="check-box">
            <span class="iconfont icon-guanyuwomen"></span>
            <span class="checkbox-text">关于我们</span>
          </div> -->
        </a-col>
        <!-- <a-col :span="19">
          <personTag></personTag>
          <orderItem></orderItem>
        </a-col> -->
        <a-col :span="19">
          <order-content v-if="rightContent == 'myOrders'"></order-content>
          <collection-content v-else-if="rightContent == 'myCollection'"></collection-content>
          <address-content v-else-if="rightContent == 'address'"></address-content>
          <feedback-content v-else-if="rightContent == 'feedback'"></feedback-content>
          <about-us v-else-if="rightContent == 'aboutUs'"></about-us>
          <my-balance v-else-if="rightContent == 'myBalance'"></my-balance>
          <my-coupon v-else-if="rightContent == 'myCoupon'"></my-coupon>
          <safe-setting v-else-if="rightContent == 'safeSetting'"></safe-setting>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import orderItem from '@/comments/orderItem'
import personTag from '@/comments/personTag'
import orderContent from './myOrders'
import collectionContent from './myCollection'
import addressContent from './address'
import feedbackContent from './feedback'
import aboutUs from './aboutUs'
import myBalance from './myBalance'
import myCoupon from './myCoupon'
import safeSetting from './safeSetting'
import { mapGetters } from 'vuex'

export default {
  components: {
    orderItem,
    personTag,
    orderContent,
    collectionContent,
    addressContent,
    feedbackContent,
    aboutUs,
    myBalance,
    myCoupon,
    safeSetting,
  },
  data() {
    return {
      check: true,
      userInfo: this.$store.state.user.info.userInfo,
      leftMenu: [
        {
          // class: 'iconfont icon-dingdan',
          title: '我的订单',
          key: 'myOrders',
        },
        {
          // class: 'iconfont icon-guanyuwomen',
          title: '我的钱包',
          key: 'myBalance',
        },
        {
          // class: 'iconfont icon-guanyuwomen',
          title: '我的优惠券',
          key: 'myCoupon',
        },
        {
          // class: 'iconfont icon-anquanshezhi',
          title: '安全设置',
          key: 'safeSetting',
        },

        {
          // class: 'iconfont icon-shoucang',
          title: '我的收藏',
          key: 'myCollection',
        },
        {
          // class: 'iconfont icon-dizhi',
          title: '地址管理',
          key: 'address',
        },
        {
          // class: 'iconfont icon-yijian',
          title: '意见反馈',
          key: 'feedback',
        },
        {
          // class: 'iconfont icon-guanyuwomen',
          title: '关于我们',
          template: aboutUs,
          key: 'aboutUs',
        },
      ],
      rightContent: 'myOrders',
    }
  },
  // watch: {
  //   personData(newV, oldV) {
  //     console.log(oldV)
  //     console.log(newV)
  //     switch (newV[0]) {
  //       case 'myOrders':
  //         this.rightContent = 'myOrders'

  //         break
  //       case 'myCollection':
  //         this.rightContent = 'myCollection'

  //         break
  //       case 'safeSetting':
  //         this.rightContent = 'safeSetting'

  //         break
  //       default:
  //         this.rightContent = newV[0]

  //         break
  //     }
  //   },
  // },

  computed: {
    ...mapGetters(['personData']),
  },

  created() {
    console.log(this.personData)
    this.rightContent = this.personData[0]
    // switch (this.personData[0]) {
    //   case 'myOrders':
    //     this.rightContent = 'myOrders'

    //     break
    //   case 'myCollection':
    //     this.rightContent = 'myCollection'

    //     break
    //   case 'safeSetting':
    //     this.rightContent = 'safeSetting'

    //     break
    //   default:
    //     this.rightContent = 'myBalance'

    //     break
    // }
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    checkChange(key) {
      console.log(key)
      this.rightContent = key
      const data = [key, 0]
      this.$store.commit('SET_PERSON_DATA', data)
      if (key === 'myOrders') {
        this.$router.push({
          path: '/base/person',
        })
      }
    },
    // logOut() {
    //   this.$store.dispatch('Logout')
    // },
  },
}
</script>
<style lang="scss" scoped>
.person {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding-bottom: 31px;
  box-sizing: border-box;
  .person-bt {
    font-family: PingFangSC-Semibold;
    font-size: 28px;
    color: #424242;
    letter-spacing: 0;
    margin: 0 0 37px;
  }
  .person-info {
    height: 67px;
    line-height: 67px;
    background: #d6be93;
    display: flex;
    color: #fff;
    padding: 0 135px;
    justify-content: space-between;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      letter-spacing: 0;
    }
    .infoBox {
      width: 50.2%;
      .person-img {
        border-radius: 100%;
        height: 42px;
        width: 42px;
      }
      .user-name {
        margin-left: 12.1px;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        letter-spacing: 0;
      }
    }
    .logoutBtn {
      margin-top: 16.5px;
      background: #ffffff;
      border-radius: 6px;
      width: 120px;
    }
  }
  .main-block {
    // padding: 0 40px;
    box-sizing: border-box;
    width: 1170px;
    // margin: 50px auto 0;
    margin: 0 auto;

    .title {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #424242;
      letter-spacing: 0;
      line-height: 24px;
      margin-bottom: 20px;
      margin-left: 15px;
    }

    .line {
      margin-bottom: 20px;
      margin-left: 15px;

      .shot-line {
        height: 3px;
        width: 96px;
        background: #424242;
      }

      .long-line {
        height: 1px;
        width: 100%;
        background: #424242;
      }
    }

    .person-content {
      margin-left: 15px;
      margin-top: 40px;
      .check-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 24px;
        .left-title {
          cursor: pointer;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #424242;
          letter-spacing: 0;
        }
        .left-title:hover {
          color: #d6be93;
        }
      }

      .checkbox-text {
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #424242;
        letter-spacing: 0;
      }

      .checkbox-text-checked {
        .left-title {
          font-family: PingFangSC-Semibold;
          font-size: 20px;
          color: #d6be93;
          letter-spacing: 0;
        }
      }

      .icon-shoucang {
        display: block;
        width: 30px;
        height: 30px;
        margin-right: 20px;
        font-size: 27px;
        text-align: center;
        line-height: 30px;
      }

      .icon-dizhi {
        font-size: 27px;
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 20px;
      }
      .icon-dingdan {
        font-size: 24px;
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 20px;
      }
      .icon-yijian {
        font-size: 22px;
        line-height: 30px;
        display: block;
        width: 30px;
        height: 30px;
        margin-right: 20px;
        text-align: center;
      }

      .icon-guanyuwomen {
        font-size: 17px;
        line-height: 30px;
        display: block;
        width: 30px;
        height: 30px;
        text-align: center;
        margin-right: 20px;
      }
    }
  }
}
/deep/ .ant-col-19 {
  background: #fff;
  min-height: 667px;
}
/deep/ .el-tabs__nav-wrap {
  margin-bottom: -8px;
}
/deep/ .el-tabs__item {
  height: 60px;
  line-height: 60px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;

  // .el-tabs__nav-wrap {
  //   height: 100%;
  // }
}
// /deep/ .el-tabs__item {
//   // border-top: 5px solid #f5f7fa !important;
// }
// /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
//   // border-top: 5px solid #d6be93 !important;
//   color: #d6be93;
//   height: 60px;
//   box-sizing: border-box;
//   overflow: hidden;
// }
/deep/ .el-tabs--border-card {
  border: 0;
}
/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 30px;
}
/deep/ .footer {
  background: #fff;
}
/deep/ .el-tabs--border-card {
  min-height: 667px;
}

/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #d6be93;
  height: 60px;
  overflow: hidden;
  border-top: 5px solid #d6be93;
}
</style>
