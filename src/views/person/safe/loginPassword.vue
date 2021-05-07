<template>
  <div class="login-password">
    <safe-header title="重置密码"></safe-header>
    <div class="content">
      <safe-step type="password" :step="step" v-if="step !== 3"></safe-step>

      <div v-if="step === 1" class="form">
        <div class="form-item">
          <div class="form-label">手机号码：</div>
          <div class="form-input">
            <a-input placeholder="输入手机号码" v-model="userInfo.userInfo.nickName" disabled />
          </div>
          <div class="phone-tip"><img src="@/assets/images/icon_tip.png">若该手机号已无法使用请联系客服</div>
        </div>
        <div class="form-item">
          <div class="form-label">验证码：</div>
          <div class="form-input">
            <a-input v-model="setPwd.msgCode" placeholder="输入短信验证码" />
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
          <div class="form-label">新的密码：</div>
          <div class="form-input">
            <a-input-password v-model="setPwd.pw" placeholder="设置6至12位登录密码" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">重复密码：</div>
          <div class="form-input">
            <a-input-password v-model="setPwd.repw" placeholder="请再次输入登录密码" />
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
          <img src="@/assets/images/coupon_check.png">
          <h5>密码重置成功</h5>
          <p>下次请使用新密码进行登录</p>
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
import { resetPW, verifyOldPhone, authRegCaptcha } from '@/api/index' // resetPW,
import SafeStep from '@/comments/safeStep'
export default {
  data() {
    return {
      step: 1,
      show: true,
      setPwd: {
        mobile: '', // 账号
        uuid: '', // 验证接口返回uuid
        msgCode: '', // 验证码
        pw: '', // 新密码
        repw: '', // 新密码
      },
      oldPhone: {
        phone: '', // 原来手机号
        msgCode: '', // 验证码
        uuid: '', // 发送验证码的时候返回的uuid
      },
      count: '',
      timer: null,
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
            this.setPwd.mobile = this.userInfo.userInfo.nickName
            this.setPwd.uuid = res.data.uuid
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

    codeSubmit() {
      this.oldPhone.msgCode = this.setPwd.msgCode
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
      })
    },
    passwordSubmit() {
      if (this.setPwd.msgCode === '') {
        this.$notify({
          title: '错误',
          message: '验证码不能为空',
          type: 'error',
        })
        return
      }
      if (this.setPwd.pw !== this.setPwd.repw) {
        this.$notify({
          title: '错误',
          message: '新密码与重复密码不相同',
          type: 'error',
        })
        return
      }
      if (this.setPwd.pw.length < 6) {
        this.$notify({
          title: '错误',
          message: '请设置6至12位登录密码',
          type: 'error',
        })
        return
      }

      resetPW(this.setPwd).then((res) => {
        this.step = 3
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
.login-password {
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
        right: -162px;
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