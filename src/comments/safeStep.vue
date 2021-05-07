<template>
  <div>
    <div class="safe-step">
      <div v-for="item in 3" :key="item.toString()" class="step-box">
        <div v-if="item === 1 && step ===2" class="num-img">
          <img src="@/assets/images/icon_done.png">
        </div>
        <div class="num" :class="{'active':item === step}" v-text="item">
        </div>
      </div>
      <div class="line"></div>
      <div class="color-line" :style="{'width':step === 1?'25%':'70%'}"></div>
    </div>
    <div class="step-tip" v-if="type==='password'">
      <div v-for="item in 3" :key="item.toString()">
        <p v-if="item === 1" :class="{'active':item <= step}" style="margin-left:-6px">验证身份</p>
        <p v-if="item === 2" class="tip-center" :class="{'active':item <= step}">设置新密码</p>
        <p v-if="item === 3">完成</p>
      </div>
    </div>
    <div class="step-tip" v-if="type==='phone'">
      <div v-for="item in 3" :key="item.toString()">
        <p v-if="item === 1" :class="{'active':item <= step}" style="margin-left:-6px">验证身份</p>
        <p v-if="item === 2" class="tip-center phone" :class="{'active':item <= step}">修改手机号码</p>
        <p v-if="item === 3">完成更换</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      step: {
        type: Number,
        default: 1
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .step-tip {
    // width: 480px;
    margin-top: 12px;

    &>div,
    & p {
      display: inline-block;
      margin-bottom: 0;
      font-size: 16px;
      color: #CACACA;

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

  .safe-step {
    position: relative;
    display: flex;
    width: 480px;
    justify-content: space-between;
    align-items: center;

    .step-box {
      text-align: center;
      width: 50px;
    }

    .num-img {
      width: 50px;
      position: absolute;
      z-index: 4;
    }

    .num {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      background: #FFFFFF;
      border: 2px solid #EFEFEF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #CACACA;
      text-align: center;
      line-height: 22px;
      position: relative;
      z-index: 3;

      &.active {
        background: #1CD44E;
        border: 2px solid #1CD44E;
        color: #fff;
      }
    }

    .line {
      background: #EFEFEF;
      height: 2px;
      position: absolute;
      left: 25px;
      right: 25px;
      top: 24px;
    }

    .color-line {
      background: #1CD44E;
      height: 2px;
      position: absolute;
      left: 12px;
      top: 24px;
      z-index: 2;
    }
  }
</style>