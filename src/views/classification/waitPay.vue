<template>
  <div class="base-area">
    <div class="title">支付订单</div>
    <div class="line">
      <div class="shot-line"></div>
      <div class="long-line"></div>
    </div>
    <div class="top-box">
      <img class="h-icon" src="../../assets/images/wait-pay.png" alt=""/>
      <div class="h-center">
        <p class="tips-title">订单提交成功！请尽快完成支付。</p>
        <p>
          请在<span style="color:red">{{ time }}分钟</span>内完成支付，超时后将取消订单
        </p>
      </div>
      <div class="h-right">
        应付总额：<span>￥{{ orderInfo.actualPrice }}</span>
      </div>
    </div>
    <div class="bottom-box">
      <div class="balance-card">
        <div class="title balance-title">余额支付</div>
        <div class="box-line"></div>
        <div class="row balance-row">
          <input :disabled="!balanceRadio" class="pay-radio balance-radio" type="radio" name="payMethod" v-model="payment" value="0">
          <img class="balance-img" src="@/assets/images/waitPay/balance.png">
          <div class="radio-text balance-text">余额支付</div>
        </div>
        <div class="payment-box">
          <div class="payment-title">请输入支付密码</div>
          <div class="password-area">
            <div class="password-item password-first">
            </div>
            <el-input placeholder="请输入支付密码" class="password-input" maxlength="6" v-model="password"
                      type="password"></el-input>
            <div class="btn-forget" @click="goPayPwd">忘记支付密码？</div>
          </div>
        </div>
        <el-button :class="payment !== '0'?'payment-btn-disabled':'payment-btn'" @click="balancePay"
                   :disabled="payment !== '0'">
          <div class="text">确认支付</div>
        </el-button>
      </div>
      <div class="b-bottom">
        <div class="title">选择其他支付方式付款</div>
        <div class="box-line"></div>
        <div class="other-title">支付平台</div>
        <div class="pay-area">
          <div class="pay-row">
            <input class="pay-radio" type="radio" name="payMethod" v-model="payment" value="1">
            <img src="@/assets/images/waitPay/wechat_pay.png" class="wechart">
          </div>
          <div class="pay-row">
            <input class="pay-radio" style="margin-left: 40px;" type="radio" name="payMethod" v-model="payment"
                   value="2">
            <img src="@/assets/images/waitPay/ali_pay.png" class="ali">
          </div>
        </div>
        <div>
          <!--          <div class="row" style="margin-bottom: 60px" v-show="payment!=='0'">-->
          <!--            <div class="radio-text">支付</div>-->
          <!--            <div class="radio-red">{{ orderInfo.actualPrice }}</div>-->
          <!--            <div class="radio-text">元</div>-->
          <!--          </div>-->
          <div class="pane-content" v-show="payment==='1'">
            <div>
              <a-spin class="qrcode" size="large" :spinning="loading">
                <img :src="payUrls.wxImg" alt="altText" class="qrcode"/>
              </a-spin>
              <div class="desc">请使用微信扫描二维码进行支付</div>
            </div>
            <img :src="payUrls.wxTel" alt="altText" class="telImg"/>
          </div>
          <div class="pane-content" v-show="payment==='2'">
            <div>
              <a-spin class="qrcode" size="large" :spinning="loading">
                <img :src="payUrls.aliImg" alt="altText" class="qrcode"/>
              </a-spin>
              <div class="desc">请使用支付宝扫描二维码进行支付</div>
            </div>
            <img :src="payUrls.zfbTel" alt="altText" class="telImg"/>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <div class="dialog-row m-t-24">
        <div class="dialog-msg">
          <img class="dialog-img" src="@/assets/images/waitPay/warning.png">
          <div class="dialog-right">
            <div class="dialog-red">您还未设置过支付密码哦！</div>
            <div class="dialog-gray">请进入“我的-设置-设置支付密码”</div>
          </div>
        </div>
      </div>
      <div class="dialog-row m-t-29 p-b-30">
        <div class="dialog-btn">
          <el-button class="dialog-cancel" @click="otherPayment">
            <div>其他方式支付</div>
          </el-button>
          <el-button class="dialog-confirm" @click="goSet">
            <div>去设置</div>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  orderDetail,
  aliPayQRCode,
  wxPayQRCode,
  findWxOrderStatus,
  findAliOrderStatus,
  checkPassWord
} from '@/api/index'

export default {
  data() {
    return {
      dialogVisible: false,
      balanceRadio: true,
      orderInfo: {},
      payUrls: {
        aliImg: '',
        wxImg: '',
        wxTel: require('../../assets/images/pay/wxTel.png'),
        zfbTel: require('../../assets/images/pay/zfbTel.png')
      },
      password: '',
      payment: '0',
      time: 15,
      wxInterval: null,
      aliInterval: null,
      loading: false
    }
  },
  mounted() {
    let count = 60
    let timer = setInterval(() => {
      if (this.time === 0) {
        clearInterval(timer)
        timer = null
      } else {
        if (count > 0) {
          count--
        } else {
          this.time--
          count = 60
        }
      }
    }, 1000)
    this.getData()
    checkPassWord().then(res => {
      if (!res.data) {
        this.dialogVisible = true
      }
    })
  },
  destroyed() {
    clearInterval(this.wxInterval)
    this.wxInterval = null
    clearInterval(this.aliInterval)
    this.aliInterval = null
  },
  watch: {
    payment(to, from) {
      clearInterval(this.wxInterval)
      this.wxInterval = null
      clearInterval(this.aliInterval)
      this.aliInterval = null
      if (this.payment === '1') {
        this.getWxImg()
        this.findWxOrderStatus()
      } else if (this.payment === '2') {
        this.getAliImg()
        this.findAliOrderStatus()
      }
    }
  },
  methods: {
    otherPayment() {
      this.dialogVisible = false
      this.balanceRadio = false
      this.payment = '1'
    },
    goSet() {
      this.$router.push({
        path: '/safe/setPayPassword',
      })
    },
    findWxOrderStatus() {
      this.wxInterval = setInterval(() => {
        findWxOrderStatus(this.$route.query.orderId).then(res => {
          if (res.data.code === '1') {
            clearInterval(this.wxInterval)
            this.wxInterval = null
            this.$router.push({
              path: '/base/classification/payResult',
              query: {
                orderId: this.$route.query.orderId
              }
            })
          }
        })
      }, 2000)
    },
    findAliOrderStatus() {
      this.aliInterval = setInterval(() => {
        findAliOrderStatus(this.$route.query.orderId).then(res => {
          if (res.data.code === '1') {
            clearInterval(this.aliInterval)
            this.aliInterval = null
            this.$router.push({
              path: '/base/classification/payResult',
              query: {
                orderId: this.$route.query.orderId
              }
            })
          }
        })
      }, 2000)
    },
    getWxImg() {
      this.loading = true
      wxPayQRCode({ orderId: Number(this.$route.query.orderId) }).then((res) => {
        this.payUrls.wxImg =
          'data:image/png;base64,' +
          btoa(
            new Uint8Array(res).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
        this.loading = false
      })
    },
    getAliImg() {
      this.loading = true
      aliPayQRCode({ orderId: Number(this.$route.query.orderId) }).then((res) => {
        this.payUrls.aliImg =
          'data:image/jpeg;base64,' +
          btoa(
            new Uint8Array(res).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
        this.loading = false
      })
    },
    getData() {
      orderDetail(this.$route.query.orderId).then((res) => {
        this.orderInfo = res.data.orderInfo
      })
    },
    tabChange(key) {
      // console.log(key)
    },
    balancePay() {
      this.$router.push({
        path: '/base/payResult'
      })
    },
    goPayPwd() {
      this.$router.push({
        path: '/safe/payPassword'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.base-area {
  width: 1170px;
  margin: 30px auto;
  min-height: 100vh;

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .pay-radio {
    width: 20px;
    height: 20px;
  }

  .title {
    font-size: 16px;
    color: #424242;
    letter-spacing: 0;
    line-height: 24px;
    margin-top: 16px;
    margin-left: 20px;
  }

  .line {
    margin-bottom: 1px;

    .shot-line {
      height: 3px;
      width: 64px;
      background: #424242;
    }

    .long-line {
      height: 1px;
      width: 100%;
      background: #424242;
    }
  }

  .box-line {
    opacity: 0.5;
    background: #A6A6A6;
    height: 1px;
    margin: 0 20px;
  }

  .top-box {
    background-image: linear-gradient(180deg, #F8F8F8 0%, #F7F7F8 100%);
    width: 100%;
    height: 82px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    position: relative;

    .tips-title {
      font-size: 14px;
      color: #424242;
      letter-spacing: 0;
      line-height: 14px;
      font-weight: bold;
      margin-top: 24px;
    }

    .h-icon {
      margin-top: 24px;
      margin-left: 20px;
      margin-bottom: 20px;
      width: 24px;
      height: 24px;
    }

    .h-center {
      height: 40px;
      margin-left: 15px;
      font-size: 12px;
      color: #424242;
      letter-spacing: 0;
      line-height: 12px;
    }

    .h-right {
      position: absolute;
      right: 20px;
      top: 46px;
      font-size: 12px;
      color: #424242;
      text-align: right;
      line-height: 12px;

      span {
        font-size: 18px;
        color: #FE5845;
        text-align: right;
        line-height: 18px;
      }
    }
  }

  .bottom-box {
    width: 100%;

    .balance-card {
      width: 100%;
      height: 306px;
      background: #FFFFFF;
      border: 1px solid rgba(202, 202, 202, 0.30);
      box-shadow: 0 2px 10px 0 rgba(66, 66, 66, 0.10);

      .balance-row {
        margin-top: 18px;
      }

      .balance-radio {
        margin-left: 20px;
      }

      .balance-img {
        width: 20px;
        height: 20px;
        margin-left: 20px;
      }

      .balance-text {
        margin-left: 6px;
        font-size: 16px;
        color: #424242;
        letter-spacing: 0;
        line-height: 20px;
      }
    }

    .b-header {
      height: 50px;
      padding-top: 20px;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 2px solid black;
      padding-bottom: 10px;
    }

    .divide-line {
      width: 100%;
      height: 1px;
      margin-top: 8px;
      color: rgb(228, 228, 228);
      border: 1px solid rgb(228, 228, 228);
    }

    .b-bottom {
      width: 100%;
      min-height: 214px;
      background: #FFFFFF;
      border: 1px solid rgba(202, 202, 202, 0.30);
      box-shadow: 0 2px 10px 0 rgba(66, 66, 66, 0.10);
      margin-top: 24px;

      .pane-content {
        display: flex;
        margin-left: 14px;

        .desc {
          width: 300px;
          height: 36px;
          background: #00B700;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
          line-height: 25px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }

        .qrcode {
          width: 300px;
          height: 300px;
        }

        .telImg {
          width: 349px;
          height: 349px;
        }
      }

      .other-title {
        margin-top: 16px;
        margin-left: 20px;
        font-size: 16px;
        color: #424242;
        letter-spacing: 0;
        line-height: 24px;
      }

      .pay-area {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 36px;
        margin-left: 20px;

        .pay-row {
          display: flex;
          flex-direction: row;
          align-items: center;

          .wechart {
            width: 81.6px;
            height: 24px;
            margin-left: 16px;
          }

          .ali {
            width: 80px;
            height: 24px;
            margin-left: 16px;
          }
        }
      }
    }

    .radio-text {
      font-size: 20px;
      color: #424242;
      letter-spacing: 0;
      line-height: 20px;
    }

    .radio-red {
      font-size: 20px;
      color: #fe5845;
      letter-spacing: 0;
      line-height: 20px;
    }

    .payment-box {
      margin-top: 38px;

      .payment-title {
        opacity: 0.8;
        font-size: 14px;
        color: #424242;
        letter-spacing: 0;
        line-height: 20px;
        margin-left: 20px;
      }

      .password-area {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
        margin-top: 7px;

        .password-input {
          width: 242px;
          height: 36px;
          margin-right: 24.2px;
        }

        .btn-forget {
          font-size: 12px;
          color: #337AF9;
          letter-spacing: -0.05px;
          text-align: right;
          line-height: 20px;
          cursor: pointer;
        }
      }
    }

    .payment-btn {
      width: 180px;
      height: 50px;
      margin-left: 20px;
      margin-top: 36px;
      background: #d6be93;

      .text {
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 20px;
      }
    }

    .payment-btn-disabled {
      width: 180px;
      height: 50px;
      margin-left: 20px;
      margin-top: 36px;
      background: #CACACA;

      .text {
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 20px;
      }
    }
  }

  /deep/ .el-dialog__body {
    padding: 0;
  }

  /deep/ .el-dialog{
    width: 400px !important;
  }

  .dialog-row {
    display: flex;
    flex-direction: row;

    .dialog-msg{
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      .dialog-img {
        width: 42px;
        height: 42px;
      }

      .dialog-right {
        margin-left: 16px;

        .dialog-red {
          font-size: 20px;
          color: #FE5845;
          letter-spacing: 0;
          line-height: 20px;
          font-weight: bolder;
        }

        .dialog-gray {
          margin-top: 7px;
          font-size: 13px;
          color: #A6A6A6;
          line-height: 13px;
        }
      }
    }

    .dialog-btn {
      /deep/ .el-button {
        padding: 0;
      }
      margin: 0 auto;

      .dialog-cancel {
        width: 94px;
        height: 26px;
        opacity: 0.2;
        background: #FFFFFF;
        border: 1px solid #424242;
        border-radius: 6px;

        div {
          opacity: 1;
          font-size: 12px;
          color: #424242;
          text-align: center;
          line-height: 12px;
        }
      }

      .dialog-confirm {
        margin-left: 10px;
        width: 94px;
        height: 26px;
        background: #D6BE93;
        border-radius: 6px;

        div {
          font-size: 12px;
          color: #FFFFFF;
          text-align: center;
          line-height: 12px;
        }
      }
    }
  }

  .m-t-24 {
    margin-top: 24px;
  }

  .m-t-29 {
    margin-top: 29px;
  }

  .p-b-30 {
    padding-bottom: 30px;
  }
}
</style>
