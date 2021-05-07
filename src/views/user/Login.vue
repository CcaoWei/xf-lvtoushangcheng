<template>
  <div v-if="$route.path == '/login'">
    <loginHeader></loginHeader>
    <div class="main">
      <img v-if="tab === 0" src="@/assets/images/login/gr_login_bg.jpg" alt="" srcset="" />
      <img v-else src="@/assets/images/login/cgs_login_bg.jpg" alt="" srcset="" />
      <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
        <div class="form-header" :id="tab===0 ? 'header1':'header2'">
          <img src="@/assets/images/login/icon.png" />
          <div>吉好选不会以任何理由要求您转账汇款，谨防诈骗。</div>
        </div>
        <div class="welcome">
          <div class="first" :style="tab === 0 ? 'color: #a9936b;' : ''" @click="tab = 0">个人登录</div>
          <div class="second">｜</div>
          <div class="third" :style="tab === 1 ? 'color: #424242;' : ''" @click="tab = 1">采购商登录</div>
        </div>
        <!--        <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"-->
        <!--                 message="账户或密码错误（admin/ant.design )"/>-->
        <div class="base-form">
          <a-form-item>
            <a-input size="large" type="text" placeholder="账户" v-decorator="[
              'mobile',
              {
                rules: [{ required: true, message: '请输入帐户' }, { validator: handleUsernameOrEmail }],
                validateTrigger: 'change'
              }
            ]">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password size="large" placeholder="密码" v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
            ]">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>

          <a-form-item style="margin-top:36px">
            <a-button size="large" type="primary" htmlType="submit" :style="tab===0 ? 'background: #D6BE93;' : 'background: #337AF9;'" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn">登录
            </a-button>
          </a-form-item>

          <a-form-item>
            <router-link :to="{ name: 'forgetPwd' }" class="forge-password" style="float: left;">忘记密码？
            </router-link>

            <router-link v-if="tab === 0" :to="{ name: 'sign' }" class="u-sign">新用户注册
            </router-link>
            <router-link v-else :to="{ name: 'businessSign' }" class="b-sign" style="float: right;font-size: 14px;color: #337AF9;">采购商注册
            </router-link>
          </a-form-item>
        </div>
        <div v-show="tab===1" class="form-foot">
          <div>同时成为供应商，<a href="http://jclt.cafewallet.cn" target="_blank">我要供货 > </a></div>
        </div>
      </a-form>
    </div>
    <Footer></Footer>
  </div>
  <div v-else>
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive" />
  </div>
</template>

<script>
import loginHeader from '@/comments/loginHeader'
import Footer from '@/comments/footer'
import { mapActions } from 'vuex'
// import { login } from '@/api/index'
// import { timeFix } from '@/utils/util'

// import md5 from 'md5'

export default {
  components: { loginHeader, Footer },
  data() {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 mobile, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 mobile, 2 telephone
        loginType: 0,
        smsSendBtn: false,
      },
      tab: 0,
    }
  },
  created() {},
  methods: {
    ...mapActions(['Login']),
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login,
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['mobile', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          // console.log('login form', values)
          // console.log(Login)
          values.loginType = Number(this.tab) + 1
          if (values.loginType === 1) {
            Login(values).then((res) => {
              console.log(res)
              this.loginSuccess(res)
            })
          } else {
            console.log('采购商.......')
            Login(values).then((res) => {
              console.log('采购商.......', res)
              var that = this
              switch (res.auditStatus) {
                // 未提交资料
                case 0:
                  this.$confirm('该账户未进行采购商资料提交，提交资料后，可立即成为采购商', '提交资料提示', {
                    confirmButtonText: '提交资料',
                    cancelButtonText: '取消',
                    type: 'warning',
                  })
                    .then(() => {
                      that.$router.push({
                        name: 'enterprise',
                        params: {
                          userId: res.userId,
                        },
                      })
                    })
                    .catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消',
                      })
                    })
                  break
                // 资料待审核
                case 1:
                  this.$message({
                    message: '资料审核中,请耐心等待',
                    type: 'warning',
                  })
                  break
                // 审核通过
                case 2:
                  this.loginSuccess(res)
                  break
                // 审核驳回
                case 3:
                  const h = this.$createElement
                  this.$msgbox({
                    title: '审核提示',
                    message: h('p', null, [h('span', null, '不通过原因：' + res.message)]),
                    showCancelButton: false,
                    confirmButtonText: '再次提交',
                    cancelButtonText: '取消',
                  }).then((action) => {
                    that.$router.push({
                      name: 'enterprise',
                      params: {
                        userId: res.userId,
                      },
                    })
                  })
                  break
                default:
                  break
              }
            })
          }
          state.loginBtn = false
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    // getCaptcha (e) {
    //   e.preventDefault()
    //   const { form: { validateFields }, state } = this

    //   validateFields(['mobile'], { force: true }, (err, values) => {
    //     if (!err) {
    //       state.smsSendBtn = true

    //       const interval = window.setInterval(() => {
    //         if (state.time-- <= 0) {
    //           state.time = 60
    //           state.smsSendBtn = false
    //           window.clearInterval(interval)
    //         }
    //       }, 1000)

    //       const hide = this.$message.loading('验证码发送中..', 0)
    //       getSmsCaptcha({ mobile: values.mobile }).then(res => {
    //         setTimeout(hide, 2500)
    //         this.$notification['success']({
    //           message: '提示',
    //           description: '验证码获取成功，您的验证码为：' + res.result.captcha,
    //           duration: 8
    //         })
    //       }).catch(err => {
    //         setTimeout(hide, 1)
    //         clearInterval(interval)
    //         state.time = 60
    //         state.smsSendBtn = false
    //         this.requestFailed(err)
    //       })
    //     }
    //   })
    // },
    // stepCaptchaSuccess () {
    //   this.loginSuccess()
    // },
    // stepCaptchaCancel () {
    //   this.Logout().then(() => {
    //     this.loginBtn = false
    //     this.stepCaptchaVisible = false
    //   })
    // },
    loginSuccess(res) {
      // console.log(res)
      // console.log('??????????2222')
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete

      // this.$router.push({ name: 'main' }, () => {
      //   console.log('onComplete')
      //   this.$notification.success({
      //     message: '欢迎',
      //     description: `${timeFix()}，欢迎回来`
      //   })
      // })
      // this.$router.push('/base/main')
      // 新登录
      this.$router.push('/home')
      // 延迟 1 秒显示欢迎信息
      // setTimeout(() => {
      //   this.$notification.success({
      //     message: '欢迎',
      //     description: `${timeFix()}，欢迎回来`
      //   })
      // }, 1000)
      this.isLoginError = false
    },
    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4,
      })
    }
  },
}
</script>

<style lang="less" scoped>
.main {
  min-width: 1170px;

  img {
    width: 100%;
  }

  position: relative;

  .user-layout-login {
    background-color: rgba(#fff, 0.9);
    // height: 394px;
    width: 370px;
    position: absolute;
    z-index: 2;
    top: 231px;
    right: 373px;
    box-sizing: border-box;
    #header1 {
      background: rgba(237, 212, 162, 0.3);
    }
    #header2 {
      background: rgba(51, 122, 249, 0.1);
    }
    .form-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #8b8b8b;
      letter-spacing: -0.06px;
      text-align: center;

      img {
        height: 15.8px;
        width: 15.8px;
        margin-left: 25.1px;
        margin-right: 7.1px;
      }
    }
    .form-foot {
      height: 62px;
      background-color: #fff;
      font-family: PingFangSC-Light;
      font-size: 16px;
      color: #a6a6a6;
      letter-spacing: 0;
      line-height: 62px;
      text-align: center;
      a {
        color: #d0021b;
      }
    }

    .welcome {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 30px 0;
      color: #8b8b8b;

      .first {
        font-size: 20px;
        letter-spacing: 0;
        margin-left: 48px;
        margin-right: 40px;
        cursor: pointer;
      }

      .second {
        font-size: 16px;
        letter-spacing: 0;
      }

      .third {
        font-size: 20px;
        letter-spacing: 0;
        margin-right: 46px;
        margin-left: 40px;
        cursor: pointer;
      }
      .active {
        color: #a9936b;
      }
    }

    .base-form {
      padding: 0 36px;
      .login-button {
        opacity: 0.9;
        background: #d6be93;
        border-radius: 4px;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
      }
    }

    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #424242;
      letter-spacing: 0;
      text-align: center;
    }
    .u-sign {
      font-family: PingFangSC-Semibold;
      font-size: 15px;
      color: #d6be93;
      letter-spacing: 0;
      text-align: center;
      float: right;
    }
    .b-sign {
      font-family: PingFangSC-Semibold;
      font-size: 15px;
      color: #337af9;
      letter-spacing: 0;
      text-align: right;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
      background: #545454;
      border: 0;
      border-radius: 4px;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
}
</style>
