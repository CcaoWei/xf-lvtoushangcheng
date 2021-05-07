<template>
  <div class="base-box">
    <img class="h-icon" src="../../assets/images/wait-pay.png" alt="" />
    <div class="title">订单支付成功</div>
    <div class="message">我们将尽快为您发货，收货期间请保持手机畅通</div>
    <div class="info">
      <div class="text">支付方式：</div>
      <div class="value" v-if="orderInfo.payType === 'wx'">微信支付</div>
      <div class="value" v-else-if="orderInfo.payType === 'zfb'">支付宝支付</div>
      <div class="value" v-else>余额支付</div>
    </div>
    <div class="info">
      <div class="text">支付金额：</div>
      <div class="value">¥{{ orderInfo.actualPrice }}</div>
    </div>
    <div class="button">
      <el-button class="home-btn" @click="goHome">
        <div class="text" @click="goHome">进入首页</div>
      </el-button>
      <el-button class="detail-btn" @click="detail">
        <div class="text" @click="detail">查看订单</div>
      </el-button>
    </div>
    <div class="tips">
      <div class="tips-title">温馨提示</div>
      <div class="tips-msg">吉好选不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作。</div>
    </div>
    <!--    <div class="header">-->
    <!--      <div style="display:flex;align-items: center;">-->
    <!--        <div class="h-center">-->
    <!--          <p style="font-size:16px;color:#333">{{ payResult.success ? '订单支付成功' : '订单支付失败' }}</p>-->
    <!--          <p class="h-right" v-if="payResult.success">-->
    <!--            支付金额<span style="color:red">{{ payResult.totalMoney }}</span>-->
    <!--          </p>-->
    <!--          <p class="h-right" v-else>-->
    <!--            请在<span style="color:red">{{ payResult.limitTime }}</span-->
    <!--            >内完成支付，超时后将取消订单-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="btn">-->
    <!--      <a-button style="margin-right:20px" @click="lookOrder">查看订单</a-button>-->
    <!--      <a-button v-if="payResult.success" @click="goBuy">继续购买</a-button>-->
    <!--      <a-button v-else @click="rePay">重新付款</a-button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { orderDetail } from '@/api/index'

export default {
  data() {
    return {
      orderInfo: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      orderDetail(this.$route.query.orderId).then((res) => {
        this.orderInfo = res.data.orderInfo
      })
    },
    //   查看订单
    detail() {
      const data = ['myOrders', 0]
      this.$store.commit('SET_PERSON_DATA', data)
      this.$router.push({
        path: '/base/person',
      })
    },
    // 返回首页
    goHome() {
      this.$router.push('/home')
    },
  },
}
</script>

<style lang="scss" scoped>
.base-box {
  width: 1170px;
  margin: 30px auto;
  min-height: 100vh;

  .h-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    display: block;
  }

  .title {
    margin-top: 16px;
    text-align: center;
    font-size: 24px;
    color: #2e2e2e;
    letter-spacing: 0;
    line-height: 24px;
  }

  .message {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    color: #a6a6a6;
    letter-spacing: 0;
    line-height: 14px;
    margin-bottom: 30px;
  }

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    margin: 0 auto 16px;

    .text {
      font-size: 20px;
      color: #424242;
      text-align: right;
      line-height: 20px;
    }

    .value {
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: #fe5845;
      line-height: 20px;
    }
  }

  .button {
    width: 392px;
    margin: 38px auto 116px;

    .home-btn {
      width: 181px;
      height: 42px;
      background: #d6be93;
      border-radius: 4px;

      .text {
        opacity: 0.8;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1px;
        text-align: center;
      }
    }

    .detail-btn {
      width: 181px;
      height: 42px;
      opacity: 0.2;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #424242;
      border-radius: 4px;

      .text {
        opacity: 0.8;
        font-size: 14px;
        color: #424242;
        letter-spacing: 1px;
        text-align: center;
      }
    }
  }
  .tips {
    margin: 0 auto;
    width: 455px;
    .tips-title {
      font-size: 16px;
      color: #424242;
      letter-spacing: 0;
    }
    .tips-msg {
      font-size: 13px;
      color: #8b8b8b;
      line-height: 20px;
    }
  }
}
</style>
