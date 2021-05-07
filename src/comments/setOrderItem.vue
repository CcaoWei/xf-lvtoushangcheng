<template>
  <div class="order-item" @click="goPush">
    <div class="order-title">
      <div class="order-num">{{ order.goodsSn }}</div>
    </div>
    <div class="goods-box">
      <div class="goods-item">
        <img :src="order.picUrl" width="150" height="150" />
        <div class="item-right">
          <div class="info-top">
            <div class="goods-info">
              <div class="goods-title">{{ order.goodsName }}</div>
            </div>
            <div class="stepper-area">
              <div class="stepper">x{{ order.number }}</div>
            </div>
            <div class="goods-price">
              <div class="price-text">¥{{ order.price }}</div>
            </div>
          </div>
          <div class="info-spec">
            <div class="size" v-for="item in order.specifications" :key="item">{{ item }}</div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productItem from '@/comments/productItem'
import { orderDelete, orderCancel, orderRefund } from '@/api/index'

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
              this.$emit('getOrderList', this.order.id)
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
            this.$emit('getOrderList', orderId)
          })
        })
        .catch(() => {})
    },
    // 确认收货
    confirmOrder() {},
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
          this.$emit('getOrderList', orderId)
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
        .info-spec {
          display: flex;
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
