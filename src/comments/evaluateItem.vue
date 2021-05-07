<template>
  <div class="order-item" @click="goPush">
    <div class="order-title">
      <div class="order-num">{{  order.orderStatusText === '等待评价'? '' : order.orderSn }}</div>
      <div class="order-text">等待评价</div>
    </div>
    <div class="goods-box">
      <div class="goods-item">
        <img :src="order.picUrl" width="150" height="150">
        <div class="goods-info">
          <div class="goods-title">{{ order.goodsName }}</div>
        </div>
        <div class="stepper-area">
          <div class="stepper">x{{ order.number }}</div>
        </div>
        <div class="goods-price">
          <div class="price-text">¥{{ order.price }}</div>
          <div class="btn-box">
            <div class="btn-item" @click="navToPostComments">发表评价</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productItem from '@/comments/productItem'

export default {
  components: {
    productItem,
  },
  props: {
    order: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      checked: true,
      num: 1,
    }
  },
  computed: {},
  created() {},
  mounted() {
    // console.log(this.order)
    this.$nextTick(() => {
      const key = this.order.orderStatusText
      this.order.uiOrderStatusText = ''
      switch (key) {
        case '已取消(系统)':
          this.order.uiOrderStatusText = '已取消'
          break
        case '未付款':
          this.order.uiOrderStatusText = '等待付款'

          break
        case '已付款':
          this.order.uiOrderStatusText = '等待发货'

          break
        case '已发货':
          this.order.uiOrderStatusText = '等待收货'

          break
        case '已收货':
          this.order.uiOrderStatusText = '等待评价'

          break
        case '交易完成':
          this.order.uiOrderStatusText = '交易完成'

          break
        case '订单取消，退款中':
          this.order.uiOrderStatusText = '等待退款'

          break
        case '已退款':
          this.order.uiOrderStatusText = '交易关闭'
          break
        default:
          this.order.uiOrderStatusText = key
          break
      }
    })
  },
  methods: {
    goPush() {
      this.$emit('goDetails', this.order.id)
    },
    navToPostComments() {
      this.$router.push({
        path: '/base/postComments',
        query: {
          id: this.order.id,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.order-item {
  //   width: 900px;
  //   margin: 130px auto 0;
  border: 1px solid #cacaca;
  border-radius: 6px;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 30px;
  .order-title {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f7f7f8;
    padding: 0 30px;
    box-sizing: border-box;

    .order-num {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #424242;
      letter-spacing: 0;
    }
    .order-text {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #8b8b8b;
      letter-spacing: 0;
      text-align: right;
    }
  }

  .goods-box {
    .goods-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px 0 20px;
      .goods-info {
        width: 240px;
        // margin-left: 34px;

        .goods-title {
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #424242;
          letter-spacing: 0;
        }
      }

      .stepper-area {
        display: flex;
        align-items: flex-start;
        margin: 0 30px 0 70px;

        .stepper {
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #8b8b8b;
          letter-spacing: 0;
          line-height: 40px;
        }
      }

      .goods-price {
        display: flex;
        align-items: flex-end;
        flex-direction: column;

        .price-text {
          font-family: PingFangSC-Semibold;
          font-size: 20px;
          color: #424242;
          letter-spacing: 0;
          line-height: 20px;
        }
        .btn-box {
          display: flex;
          justify-content: flex-end;
          margin-top: 36px;
          .btn-item {
            background: #ffffff;
            border: 1px solid #d6be93;
            border-radius: 6px;
            margin-left: 24px;
            padding: 8px 28px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #d6be93;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
