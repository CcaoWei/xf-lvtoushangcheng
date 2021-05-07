<template>
  <div class="order-item" @click="goPush">
    <div class="order-title">
      <div class="order-num">{{  order.orderStatusText === '等待评价'? '' : order.orderSn }}</div>
      <div class="order-text">{{ order.orderStatusText }}</div>
    </div>
    <div class="goods-box">
      <div class="goods-item" v-for="(item, index) in order.goodsList" :key="item.id">
        <img :src="item.picUrl" width="150" height="150" />
        <div class="item-right">
          <div class="info-top">
            <div class="goods-info">
              <div class="goods-title">{{ item.goodsName }}</div>
            </div>
            <div class="stepper-area">
              <div class="stepper">x{{ item.number }}</div>
            </div>
            <div class="goods-price">
              <div class="price-text">¥{{ item.price }}</div>
            </div>
          </div>
          <div class="info-top">
            <div class="size">{{ item.specifications.toString() }}</div>
            <div class="btn-box" v-if="index === order.goodsList.length - 1">
              <!-- <div class="btn-item">删除订单</div>
            <div class="btn-item">评价商品</div> -->
              <div v-if="order.handleOption.cancel" @click.stop="cancelOrder(order.id)" class="btn-item">取消订单</div>
              <div v-if="order.handleOption.pay" @click.stop="payOrder" class="btn-item">立即付款</div>
              <div v-if="order.handleOption.delete" @click.stop="deleteOrder" class="btn-item">删除订单</div>

              <div v-if="order.handleOption.confirm" @click.stop="confirmOrder(order.id)" class="btn-item">确认收货</div>
              <div v-if="order.handleOption.comment" @click.stop="navToOrderGoods" class="btn-item">评价商品</div>
              <div v-if="order.handleOption.refund" @click.stop="refundOrder(order.id)" class="btn-item">申请退款</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productItem from '@/comments/productItem'
import { orderDelete, orderCancel, orderRefund, orderConfirm } from '@/api/index'

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
      specifications: '',
      goodsList: [],
    }
  },
  computed: {},
  created() {},
  mounted() {
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
      this.order.goodsList.forEach((element) => {
        element.priceui = element.price.toFixed(2)
      })
      // console.log(this.goodsList)
    })
  },
  methods: {
    goPush() {
      this.$emit('goDetails', this.order.id)
    },
    // 删除订单
    deleteOrder() {
      this.$confirm('你确定要删除该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          orderDelete({ orderId: this.order.id })
            .then((res) => {
              this.$message({
                type: 'success',
                message: '订单删除成功!',
              })
              this.$emit('getOrderList')
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
        })
        .catch(() => {})
    },
    // 取消订单
    cancelOrder(orderId) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          orderCancel({ orderId }).then((res) => {
            this.$message.success('订单取消成功')
            this.$emit('getOrderList')
          })
        })
        .catch(() => {})
    },
    // 确认收货
    confirmOrder(orderId) {
      this.$confirm('你确定要确认收货吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const params = {
          orderId,
        }
        orderConfirm(params).then((res) => {
          this.$message.success('确认收货成功')
          this.$emit('getOrderList')
        })
      })
    },
    // 评价商品
    navToOrderGoods() {
      // console.log(this.order.id, '+++++=======')
      // this.$router.push({ path: '/base/person/postComments', query: { id: this.order.id } })
      this.$emit('goDetails', this.order.id)
    },
    // 申请退款
    refundOrder(orderId) {
      this.$confirm('你确定要申请退款吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        orderRefund({ orderId }).then((res) => {
          this.$message.success('退款申请成功，请等待审核')
          this.$emit('getOrderList')
        })
      })
    },
    // 立即付款
    payOrder() {
      this.$emit('goDetails', this.order.id)
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
      padding: 0 30px 20px 20px;
      .item-right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        flex: 1;
        padding-left: 30px;
        .info-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin: 10px 0;
          .size {
            background: #f8f8f8;
            border-radius: 6px;
            padding: 8px 24px;
            margin-right: 12px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #c2c2c2;
            text-align: center;
            line-height: 20px;
          }
          .btn-box {
            display: flex;
            justify-content: flex-end;
            // margin-top: 36px;
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
            }
            .btn-item:hover {
              cursor: pointer;
            }
          }
        }
      }
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
      }
    }
  }
}
</style>
