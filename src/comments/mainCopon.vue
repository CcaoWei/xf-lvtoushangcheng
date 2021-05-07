<template>
  <div class="coupon-box" v-if="coupinItem">

    <div class="left-content">
      <div class="discount">
        <div class="price-icon">￥</div>
        <div class="price-num">{{ coupinItem.discount }}</div>
        <div class="price-name">{{ coupinItem.name }}</div>
      </div>
      <div class="content">
        <!-- <div class="min" v-if="coupinItem.min">满{{ coupinItem.min }}元可用</div>
        <div class="min" v-else>{{ coupinItem.condition }}</div> -->
        <div class="coupon-time" v-if="coupinItem.endTime != undefined">有效期: {{ coupinItem.startTime.substr(0,10) }} ~ {{ coupinItem.endTime.substr(0,10) }}</div>
        <div class="coupon-time" v-if="coupinItem.available != undefined && coupinItem.available!=0">有效期: {{ coupinItem.available }}天</div>
        <div class="coupon-time" v-if="coupinItem.days != undefined && coupinItem.days!=0">有效期: {{ coupinItem.days }}天</div>
      </div>
    </div>

    <div @click="receive" v-if="isShowBtnRight" class="coupon-btn cursor">立即领取</div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isShowBtnRight: {
      type: Boolean,
      default: true,
    },
    my: {
      type: Boolean,
      default: true,
    },
    stateText: {
      type: Number,
      default: 0,
    },
    coupinItem: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      id: '',
      state: '去使用',
    }
  },

  methods: {
    receive() {
      this.$emit('getReceive', this.coupinItem.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.coupon-box {
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.05);
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  background: url('../assets/images/main_coupon_bg.png') left center no-repeat;
  background-size: 100% 100%;
  height: 166px;
  box-sizing: border-box;
  width: 370px;
  justify-content: space-between;
  margin-bottom: 20px;
  .left-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 302px;

    .discount {
      padding-left: 24px;
      width: 100%;
      display: flex;
      align-items: center;
      height: 56px;
      .price-icon {
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #d6be93;
        letter-spacing: 0;
        line-height: 33px;
      }
      .price-num {
        font-family: PingFangSC-Semibold;
        font-size: 50px;
        color: #d6be93;
        letter-spacing: 0;
        line-height: 50px;
        margin-right: 10px;
      }
      .price-name {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #d6be93;
        letter-spacing: 0;
        line-height: 18px;
      }
    }
    .content {
      width: 100%;
      padding-left: 34px;

      //   .coupon-name {
      //     font-family: PingFangSC-Semibold;
      //     font-size: 18px;
      //     color: #d6be93;
      //     letter-spacing: 0;
      //     line-height: 18px;
      //   }
      //   .min {
      //     font-family: PingFangSC-Regular;
      //     font-size: 1.2rem;
      //     color: #424242;
      //     letter-spacing: 0;
      //     line-height: 1.2rem;
      //     margin: 0.6rem 0 14px;
      //     text-align: left;
      //   }
      .coupon-time {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #cacaca;
        letter-spacing: 0;
        line-height: 24px;
      }
    }
  }

  .coupon-btn {
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 24px;
    width: 68px;
    padding: 0 23px;
    display: flex;
    align-items: center;
  }
}
</style>
