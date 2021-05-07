<template>
  <div class="safe">
    <h3>您当前的帐号 {{ userInfo.userInfo.nickName }}</h3>
    <!-- 登录密码 -->
    <div class="item">
      <div class="item-img">
        <img src="@/assets/images/safe_password.png">
      </div>
      <div class="item-info">
        <h5>登录密码</h5>
        <p>建议您定期更换密码，设置安全性高的密码可以使帐号更安全</p>
      </div>
      <div class="item-btnbox">
        <a-button @click="goChange(0)">修改</a-button>
      </div>
    </div>

    <!-- 安全手机  -->
    <div class="item">
      <div class="item-img">
        <img src="@/assets/images/safe_phone.png">
      </div>
      <div class="item-info">
        <h5>安全手机 {{ userInfo.userInfo.nickName }}</h5>
        <p>安全手机可以用于登录帐号，重置密码或其他安全验证</p>
      </div>
      <div class="item-btnbox">
        <a-button @click="goChange(1)">更换</a-button>
      </div>
    </div>

    <!-- 支付密码 -->
    <div class="item">
      <div class="item-img">
        <img src="@/assets/images/safe_password.png">
      </div>
      <div class="item-info">
        <h5>支付密码</h5>
        <p>建议您定期更换密码，设置安全性高的密码可以使帐号更安全</p>
      </div>
      <div class="item-btnbox">
        <a-button @click="goChange(2)">修改</a-button>
      </div>
    </div>

    <dl class="tip">
      <dt>安全服务提示</dt>
      <dl>• 注意防范进入钓鱼网站，不要轻信各种即时通讯工具发送的商品或支付链接，谨防网购诈骗</dl>
      <dl>• 建议您安装杀毒软件，并定期更新操作系统等软件补丁，确保帐号及交易安全</dl>
    </dl>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo']),
  },
  // created() {
  //   console.log(this.userInfo)
  // },
  methods: {
    goChange(type) {
      if (localStorage.getItem('Access-Token')) {
        if (type === 0) {
          this.$router.push({
            path: '/safe/loginPassword',
          })
        } else if (type === 1) {
          this.$router.push({
            path: '/safe/phone',
          })
        } else if (type === 2) {
          console.log(type)
          this.$router.push({
            path: '/safe/payPassword',
          })
        }
      } else {
        this.$router.push({
          path: '/login',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.safe {
  padding: 30px;
  h3 {
    font-size: 20px;
    color: #424242;
    line-height: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid #424242;
    margin-bottom: 30px;
  }

  .item {
    display: flex;
    margin-bottom: 24px;
    background-color: #fff;
    border-radius: 6px;
    height: 112px;
    align-items: center;

    .item-img {
      width: 112px;
      text-align: center;
    }

    .item-info {
      width: 100%;

      h5 {
        font-size: 20px;
        color: #424242;
        line-height: 20px;
        margin-bottom: 13px;
      }

      p {
        font-size: 13px;
        color: #8b8b8b;
        line-height: 13px;
      }
    }

    .item-btnbox {
      width: 210px;
      text-align: center;

      /deep/ .ant-btn {
        width: 120px;
        height: 36px;
        font-size: 16px;
        color: rgba(66, 66, 66, 0.8);
        border: 1px solid rgba(66, 66, 66, 0.2);
        border-radius: 6px;

        &:hover {
          color: #d6be93;
          border-color: #d6be93;
        }
      }
    }
  }

  .tip {
    padding-top: 113px;
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