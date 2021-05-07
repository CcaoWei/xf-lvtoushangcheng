<template>
  <div class="pay-password">
    <safe-header title="修改支付密码"></safe-header>
    <div class="content">

      <div v-if="step === 1" class="form">
        <div class="form-item">
          <div class="form-label">旧支付密码：</div>
          <div class="form-input">
            <a-input-password placeholder="设置6至12位登录密码" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">新支付密码：</div>
          <div class="form-input">
            <a-input-password placeholder="设置6至12位登录密码" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">确认支付密码：</div>
          <div class="form-input">
            <a-input-password placeholder="请再次输入登录密码" />
          </div>
        </div>
        <div class="forget">忘记旧支付密码？<span @click="orther">使用短信验证码更改</span></div>
        <div class="form-btn">
          <a-button type="primary" block @click="submit">
            修改支付密码
          </a-button>
        </div>
      </div>

      <div v-if="step === 2" class="form">
        <div class="form-item">
          <div class="form-label">短信验证码：</div>
          <div class="form-input">
            <a-input placeholder="输入短信验证码" />
          </div>
          <div class="send-code">重新获取</div>
        </div>
        <div class="send">短信验证码已发送至手机188****8888</div>
        <div class="form-item">
          <div class="form-label">新支付密码：</div>
          <div class="form-input">
            <a-input-password placeholder="设置6至12位登录密码" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">确认支付密码：</div>
          <div class="form-input">
            <a-input-password placeholder="请再次输入登录密码" />
          </div>
        </div>
        <div class="forget">记得旧支付密码？<span @click="orther">使用旧支付密码更改</span></div>
        <div class="form-btn">
          <a-button type="primary" block @click="submit">
            修改支付密码
          </a-button>
        </div>
      </div>

      <div v-if="step === 3" class="form">
        <div class="success">
          <img src="@/assets/images/coupon_check.png">
          <h5>支付密码重置成功</h5>
          <p>下次请使用新密码进行支付</p>
          <a-button @click="goHome">
            进入首页
          </a-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SafeHeader from '@/comments/safeHeader'
import SafeStep from '@/comments/safeStep'
export default {
  data() {
    return {
      step: 1,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/base/waitPay') {
      next((vm) => {
        vm.step = 2
      })
    } else {
      next()
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  components: {
    SafeHeader,
    SafeStep,
  },
  methods: {
    orther() {
      if (this.step === 1) {
        this.step = 2
      } else if (this.step === 2) {
        this.step = 1
      }
    },
    submit() {
      this.step = 3
    },
    goHome() {
      this.$router.push({
        path: '/home',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.pay-password {
  .content {
    padding-top: 100px;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .form {
    padding-top: 70px;
    width: 480px;

    .form-item {
      align-items: center;
      position: relative;
      margin-bottom: 16px;
      padding-left: 20px;

      .form-label {
        width: 104px;
        padding-right: 4px;
        font-size: 14px;
        color: #424242;
        text-align: right;
        line-height: 42px;
        float: left;
      }

      .form-input {
        margin-left: 104px;
        width: 270px;

        /deep/ input {
          height: 42px;
          // border: 1px solid #EFEFEF;
          border-radius: 4px;
        }
      }

      .send-code {
        position: absolute;
        top: 13px;
        right: 104px;
        font-size: 14px;
        color: #fe5845;
        letter-spacing: -0.06px;
        line-height: 20px;
        cursor: pointer;
      }
    }

    .forget {
      margin-left: 124px;
      font-size: 14px;
      color: #cacaca;
      margin-bottom: 10px;

      span {
        cursor: pointer;
        color: red;
      }
    }

    .form-btn {
      padding-top: 14px;
      // padding-left: 116px;
      margin-left: 124px;
      // padding-right: 93px;
      width: 270px;

      .ant-btn-primary {
        opacity: 0.9;
        background: #d6be93;
        border-color: #d6be93;
        border-radius: 4px;
        height: 42px;
      }
    }
  }

  .send {
    font-size: 14px;
    color: #cacaca;
    margin-left: 124px;
    margin-bottom: 16px;
  }

  .success {
    text-align: center;

    img {
      width: 80px;
      height: 80px;
    }

    h5 {
      font-size: 24px;
      color: #2e2e2e;
      text-align: center;
      line-height: 24px;
      margin-top: 16px;
    }

    p {
      margin-top: 10px;
      margin-bottom: 50px;
      font-size: 14px;
      color: #a6a6a6;
      text-align: center;
      line-height: 14px;
    }

    button {
      width: 180px;
      height: 42px;
      font-size: 14px;
      color: rgba(66, 66, 66, 0.8);
    }
  }
}
</style>