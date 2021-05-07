<template>
  <div class="phone">
    <safe-header title="重置密码"></safe-header>
    <div class="content">
      <safe-step type="phone" :step="step" v-if="step !== 3"></safe-step>

      <div v-if="step === 1" class="form">
        <div class="has-tip">
          <div>已绑定的手机：{{ userInfo.userInfo.nickName }}</div>
          <p>若该手机号已无法使用请联系客服</p>
        </div>
        <div class="form-item">
          <div class="form-label">验证码：</div>
          <div class="form-input">
            <a-input placeholder="输入短信验证码" v-model="oldPhone.msgCode" />
          </div>
          <div @click="sendCode" v-show="show" class="send-code">发送验证码</div>
          <div class="send-code" v-show="!show">{{ count }}秒后重发</div>
        </div>
        <div class="form-btn">
          <a-button type="primary" block @click="codeSubmit">
            下一步
          </a-button>
        </div>
      </div>

      <div v-if="step === 2" class="form">
        <div class="form-item">
          <div class="form-label">手机号码：</div>
          <div class="form-input">
            <a-input v-model="setPhone.newMobile" placeholder="输入手机号码" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">验证码：</div>
          <div class="form-input">
            <a-input v-model="setPhone.newMobileCode" placeholder="输入短信验证码" />
          </div>
          <div @click="sendCodeNew" v-show="showNew" class="send-code">发送验证码</div>
          <div class="send-code" v-show="!showNew">{{ countNew }}秒后重发</div>
        </div>
        <div class="form-btn">
          <a-button type="primary" block @click="passwordSubmit">
            下一步
          </a-button>
        </div>
      </div>

      <div v-if="step === 3" class="form">
        <div class="success">
          <img src="@/assets/images/coupon_check.png">
          <h5>手机号码更换成功</h5>
          <p>您可以在下次使用新号码进行登录</p>
          <a-button @click="goHome">
            返回
          </a-button>
        </div>
      </div>

      <dl class="tip">
        <dt>安全服务提示</dt>
        <dl>• 为保障您的帐号安全，变更重要信息需要身份验证</dl>
        <dl>• 若有疑问请联系在线客服或拨打400-0000-000（周一至周日 8:00-18:00）</dl>
      </dl>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SafeHeader from '@/comments/safeHeader'
import SafeStep from '@/comments/safeStep'
import { resetMobile, verifyOldPhone, authRegCaptcha } from '@/api/index' // resetPW,

export default {
  data() {
    return {
      step: 1,
      show: true,
      showNew: true,
      setPhone: {
        newMobile: '', // 新手机号
        newMobileCode: '', // 验证码
        oldPhoneSecretKey: '', // 验证老手机号秘钥
        uuid: '', // 请求验证返回
      },
      oldPhone: {
        phone: '', // 原来手机号
        msgCode: '', // 验证码
        uuid: '', // 发送验证码的时候返回的uuid
      },
      count: '',
      timer: null,
      countNew: '',
      timerNew: null,
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
    // 发送验证码
    sendCode() {
      if (this.show) {
        var params = {
          mobile: this.userInfo.userInfo.nickName, // 手机号
        }
        authRegCaptcha(params)
          .then((res) => {
            console.log(res)
            this.oldPhone.uuid = res.data.uuid
            this.$notify({
              title: '成功',
              message: '验证码已发送',
              type: 'success',
            })
          })
          .catch((e) => {
            console.log(e)
          })
      }
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    sendCodeNew() {
      if (this.showNew) {
        var params = {
          mobile: this.setPhone.newMobile, // 手机号
        }
        authRegCaptcha(params)
          .then((res) => {
            console.log(res)
            if (res.return_code !== 0) {
              this.$notify({
                title: '提示',
                message: res.return_message,
                type: 'info',
              })
              return
            }
            this.setPhone.uuid = res.data.uuid
            this.$notify({
              title: '成功',
              message: '验证码已发送',
              type: 'success',
            })
          })
          .catch((e) => {
            console.log(e)
          })
      }
      const TIME_COUNT = 60
      if (!this.timerNew) {
        this.countNew = TIME_COUNT
        this.showNew = false
        this.timerNew = setInterval(() => {
          if (this.countNew > 0 && this.countNew <= TIME_COUNT) {
            this.countNew--
          } else {
            this.showNew = true
            clearInterval(this.timerNew)
            this.timerNew = null
          }
        }, 1000)
      }
    },

    codeSubmit() {
      if (this.oldPhone.msgCode === '') {
        this.$notify({
          title: '提示',
          message: '验证码为空',
          type: 'success',
        })
        return
      }
      this.oldPhone.phone = this.userInfo.userInfo.nickName
      verifyOldPhone(this.oldPhone).then((res) => {
        this.step = 2
        this.setPhone.oldPhoneSecretKey = res.data
      })
    },
    passwordSubmit() {
      if (this.setPhone.newMobile === '') {
        this.$notify({
          title: '错误',
          message: '新手机号不能为空',
          type: 'error',
        })
        return
      }
      if (this.setPhone.newMobileCode === '') {
        this.$notify({
          title: '错误',
          message: '新手机号验证码不能为空',
          type: 'error',
        })
        return
      }
      if (this.setPhone.msgCode === '') {
        this.$notify({
          title: '提示',
          message: '验证码为空',
          type: 'error',
        })
        return
      }
      const newPhone = {
        phone: this.setPhone.mobile, // 原来手机号
        msgCode: this.setPhone.msgCode, // 验证码
        uuid: this.setPhone.uuid, // 发送验证码的时候返回的uuid
      }
      verifyOldPhone(newPhone).then((res) => {
        resetMobile(this.setPhone).then((res) => {
          this.step = 3
        })
      })
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
.phone {
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

      .phone-tip {
        position: absolute;
        font-size: 14px;
        color: #8b8b8b;
        line-height: 20px;
        right: -155px;
        top: 13px;

        img {
          width: 20px;
          height: 20px;
          vertical-align: bottom;
          margin-right: 6px;
        }
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
        background: #8b8b8b;
        border-color: #8b8b8b;
        border-radius: 4px;
        height: 42px;
      }
    }
  }

  .has-tip {
    text-align: center;
    margin-bottom: 50px;

    div {
      font-size: 20px;
      color: #424242;
      line-height: 20px;
    }

    p {
      font-size: 13px;
      color: #8b8b8b;
      line-height: 13px;
      margin-bottom: 0;
      margin-top: 13px;
    }
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

  .tip {
    padding-top: 180px;

    dt {
      font-size: 16px;
      color: #424242;
      margin-bottom: 6px;
    }

    dl {
      margin-bottom: 0;
      font-size: 13px;
      color: #8b8b8b;
      line-height: 20px;
    }
  }
}
</style>