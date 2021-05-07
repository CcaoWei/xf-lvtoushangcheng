<template>
  <div class="coupon-box" v-if="coupinItem" @click="changeCouponId">
    <div class="coupon-top">
      <div class="valueDesc">{{ coupinItem.valueDesc }}</div>
      <div class="condition">{{ coupinItem.condition }}</div>
    </div>
    <div class="coupon-bottom">
      <div class="name">{{ coupinItem.name }}</div>
      <div class="date">有效期：{{ coupinItem.startStr }}-{{ coupinItem.endStr }}</div>
    </div>
    <img src="@/assets/images/coupon_check.png" class="check-img" v-show="coupinItem.id === couponId">
  </div>
</template>

<script>
export default {
  props: {
    coupinItem: {
      type: Object,
      default: function () {
        return {}
      },
    },
    couponId: {
      type: Number,
      default: function () {
        return 0
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    changeCouponId() {
      if (this.couponId !== this.coupinItem.id) {
        this.$emit('changeCouponId', this.coupinItem.id)
      } else {
        this.$emit('changeCouponId', 0)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.coupon-box {
  height: 265px;
  width: 272px;
  background: url('../assets/images/coupon_bg.png') left center no-repeat;
  background-size: 100% 100%;
  position: relative;
  cursor: pointer;
  margin-bottom: 30px;
  .coupon-top {
    height: 134px;
    width: 100%;

    .valueDesc {
      padding-top: 16px;
      font-size: 50px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
    }
    .condition {
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 12px;
      text-align: center;
    }
  }
  .coupon-bottom {
    height: 130px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #efefef;
    .name {
      padding: 16px 20px 0 20px;
      font-size: 13px;
      color: #424242;
      letter-spacing: 0;
      line-height: 1.3rem;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      width: 100%;
      line-clamp: 2;
      height: 3.6rem;
    }
    .date {
      // padding: 0px 24px 0px 24px;
      margin: 0 20px;
      opacity: 0.5;
      font-size: 16px;
      color: #424242;
      letter-spacing: 0;
      line-height: 24px;
    }
  }
  .check-img {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
}
</style>
