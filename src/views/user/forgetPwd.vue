<template>
  <div class="phone">
    <safe-header title="忘记密码"></safe-header>
    <div class="content">
      <safe-step type="password" :step="step"></safe-step>
      <div v-if="step === 1" class="form" style="margin-left: 190px;">
        <div style="display:flex">
          <div class="form-item">
            <div class="form-label">手机号码：</div>
            <div class="form-input">
              <a-input placeholder="输入手机号码" v-model="telephone" />
            </div>
          </div>
          <div class="right-tips">
            <img src="../../assets/icons/warning.png" class="warning" alt="altText" />
            <span class="tips">若该手机号已无法使用请联系客服</span>
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">手机验证码：</div>
          <div class="form-input">
            <a-input placeholder="输入短信验证码" v-model="valiCode" />
          </div>
          <div class="send-code" style="cursor: pointer;" @click="sendValiCode" v-if="success">发送验证码</div>
          <div class="send-code" v-else>{{ count }}秒后重发</div>
        </div>
        <div class="form-btn">
          <a-button type="primary" block @click="codeSubmit">
            下一步
          </a-button>
        </div>
      </div>

      <div v-if="step === 2" class="form" style="margin-left:-40px">
        <div class="form-item">
          <div class="form-label">新的密码：</div>
          <div class="form-input">
            <!-- <a-input placeholder="设置6-12位登录密码" v-model="password"  message: '请输入6-12位登录密码'/> -->
            <a-input-password size="large" placeholder="设置6-12位登录密码" v-model="password"> </a-input-password>
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">重复密码：</div>
          <div class="form-input">
            <!-- <a-input placeholder="请再次输入登录密码" v-model="rePassword"  message: '请再次输入登录密码'/> -->
            <a-input-password
              v-model="rePassword"
              size="large"
              placeholder="请再次输入登录密码"
              v-decorator="['rePassword', { rules: [{ required: true }], validateTrigger: 'blur' }]"
            >
            </a-input-password>
          </div>
        </div>
        <div class="form-btn">
          <a-button type="primary" block @click="passwordSubmit">
            下一步
          </a-button>
        </div>
      </div>

      <div v-if="step === 3" class="form">
        <div class="success">
          <img src="@/assets/images/coupon_check.png" />
          <h5>密码重置成功</h5>
          <p>下次请使用新密码进行登录</p>
          <a-button @click="goHome" class="go-home">
            进入首页
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SafeStep from '@/comments/safeStep'
import SafeHeader from '@/comments/safeHeader'
import { authRegCaptcha, authVerifyOldPhone, userResetPW, validateTel } from '@/api/index'
export default {
  data() {
    return {
      step: 1,
      telephone: '',
      valiCode: '',
      password: '',
      rePassword: '',
      uuid: '',
      count: '',
      success: true,
      timer: null
    }
  },
  components: {
    SafeStep,
    SafeHeader
  },
  methods: {
    // 第一步 手机号  验证码
    codeSubmit() {
      if (!this.telephone) {
        this.$notify.error({
          title: '失败',
          message: '请输入手机号'
        })
      } else if (!this.valiCode) {
        this.$notify.error({
          title: '失败',
          message: '请输入验证码'
        })
      } else {
        const params = {
          phone: this.telephone,
          msgCode: this.valiCode,
          uuid: this.uuid
        }
        // 校验验证码
        authVerifyOldPhone(params).then(res => {
          console.log('第一个下一步=', res)
          if (res.errno === 0) {
            this.step = 2
          }
        })
      }
    },
    // 第二步 重置密码
    passwordSubmit() {
      if (!this.password) {
        this.$notify.warning({
          title: '失败',
          message: '请输入新的密码'
        })
      } else if (!this.rePassword) {
        this.$notify.warning({
          title: '失败',
          message: '请输入正确的重复密码'
        })
      } else if (this.password.length > 12 || this.password.length < 6) {
        this.$notify.warning({
          title: '失败',
          message: '请输入6-12位的密码'
        })
      } else {
        const params = {
          mobile: this.telephone,
          uuid: this.uuid,
          msgCode: this.valiCode,
          pw: this.password,
          repw: this.rePassword
        }
        userResetPW(params).then(res => {
          this.step = 3
        })
      }
    },
    goHome() {
      this.$router.push({
        path: '/home'
      })
    },
    // 发送验证码
    sendValiCode() {
      if (this.telephone) {
        validateTel({ mobile: this.telephone })
          .then(res => {
            if (res.errno === 0) {
              authRegCaptcha({ mobile: this.telephone }).then(res => {
                if (res.success === false) {
                  this.$notify.success({
                    title: '失败',
                    message: res.return_message
                  })
                } else {
                  this.$notify.success({
                    title: '成功',
                    message: '验证码已发送'
                  })
                  this.uuid = res.data.uuid
                  const TIME_COUNT = 60
                  if (!this.timer) {
                    this.count = TIME_COUNT
                    this.success = false
                    this.timer = setInterval(() => {
                      if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--
                      } else {
                        this.success = true
                        clearInterval(this.timer)
                        this.timer = null
                      }
                    }, 1000)
                  }
                }
              })
            }
          })
      } else {
        this.$notify.error({
          title: '失败',
          message: '请输入手机号码'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.step-tip {
  margin-top: 12px;

  & > div,
  & p {
    display: inline-block;
    margin-bottom: 0;
    font-size: 16px;
    color: #cacaca;

    &.active {
      color: #424242;
    }
  }

  .tip-center {
    margin-left: 143px;
    margin-right: 159px;

    &.phone {
      margin-left: 135px;
      margin-right: 135px;
    }
  }
}
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
    // width: 480px;
    // min-width: 480px;

    .form-item {
      align-items: center;
      position: relative;
      margin-bottom: 16px;
      // padding-left: 20px;

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
        width: 400px;

        /deep/ input {
          height: 52px;
          // border: 1px solid #EFEFEF;
          border-radius: 4px;
        }
      }

      .form-input-tel {
        display: flex;
        margin-left: 104px;
        /deep/ input {
          height: 52px;
          // border: 1px solid #EFEFEF;
          border-radius: 4px;
        }
      }

      .send-code {
        position: absolute;
        top: 16px;
        right: 265px;
        font-size: 14px;
        color: #fe5845;
        letter-spacing: -0.06px;
        line-height: 20px;
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
    .right-tips {
      height: 42px;
      line-height: 42px;
      .warning {
        width: 20px;
        height: 20px;
        margin-left: 12px;
        margin-right: 6px;
        margin-top: -4px;
      }
      .tips {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #8b8b8b;
        letter-spacing: 0;
      }
    }

    .form-btn {
      width: 400px;
      margin-left: 104px;
      padding-top: 14px;
      // padding-left: 116px;
      // margin-left: 124px;
      // margin-left: 54px;
      // padding-right: 93px;
      box-sizing: border-box;

      .ant-btn-primary {
        opacity: 0.9;
        background: #d6be93;
        // border-color: #8b8b8b;
        // border-radius: 4px;
        height: 56px;
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
    .go-home {
      opacity: 0.8;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #424242;
      letter-spacing: 1px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
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
::v-deep .ant-btn-primary {
  border-color: transparent;
}
</style>
