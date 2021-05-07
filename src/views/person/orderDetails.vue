<template>
  <div class="details">
    <div class="title">
      订单详情
    </div>
    <order-info subtitle="订单概况">
      <div slot="content" class="contentBox">
        <div class="gaikuang">
          <div class="head">
            <div>
              订单编号：<span style="color: #8B8B8B;">{{ orderInfo.orderSn }}</span>
            </div>
            <div>
              状态：<span style="color:#FE5845">{{ orderInfo.orderStatusText }}</span>
            </div>
            <div>
              提交时间：<span style="color: #A6A6A6;"> {{ orderInfo.addTime || null }}</span>
            </div>
          </div>
          <!-- 提示框 -->
          <a-alert
            v-show="false"
            style="margin:10px 0 20px 0"
            message="您的订单尚未支付。提交订单后30分钟内仍未支付，订单将自动取消。"
            type="info"
            show-icon
          />
          <div class="amountItem">
            订单金额：<span style="color:#FE5845">￥{{ orderInfo.actualPrice }}</span
            >（含运费¥{{ orderInfo.freightPrice }}）
          </div>
          <div class="amountItem">
            收货信息：<span>{{ orderInfo.consignee }}，{{ orderInfo.mobile }}，{{ orderInfo.address }}</span>
          </div>
          <div class="amountItem">
            支付方式：<span>{{ orderInfo.payType === 'zfb' ? '支付宝' : orderInfo.payType === 'wx' ? '微信' : '无' }}</span>
          </div>
        </div>
      </div>
    </order-info>
    <order-info subtitle="订单跟踪">
      <div slot="content" class="contentBox">
        <div class="genzong">
          <div class="head" v-if="orderInfo.orderStatusText == '待收货' || orderInfo.orderStatusText == '交易完成'">
            <div>
              物流状态：<span>{{ logisticsInfo.newState }}</span>
            </div>
            <div>
              承运公司：<span>{{ logisticsInfo.newCode }}</span>
            </div>
            <div>
              运单编号：<span style="color: #A6A6A6;">{{ logisticsInfo.LogisticCode }}</span>
            </div>
            <div v-show="false">
              联系电话：<span style="color: #A6A6A6;">{{ logisticsInfo.tel }}</span>
            </div>
          </div>
          <div
            class="order-steps"
            v-if="
              orderInfo.orderStatusText == '已取消' ||
                orderInfo.orderStatusText == '等待退款' ||
                orderInfo.orderStatusText == '交易关闭'
            "
          >
            <el-steps :active="extActive" align-center finish-status="success">
              <el-step title="提交订单"></el-step>
              <el-step title="订单已取消"></el-step>
            </el-steps>
          </div>
          <div class="order-steps" v-else>
            <el-steps :active="active" finish-status="success">
              <el-step title="提交订单"></el-step>
              <el-step title="待支付"></el-step>
              <el-step title="待发货"></el-step>
              <el-step title="待收货"></el-step>
              <el-step title="交易完成"></el-step>
            </el-steps>
          </div>

          <dotted-line></dotted-line>
          <div class="wuliu" v-if="orderInfo.orderStatusText == '待收货' || orderInfo.orderStatusText == '交易完成'">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in logisticsInfo.Traces"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.AcceptTime"
              >
                {{ activity.AcceptStation }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </order-info>
    <order-info subtitle="商品信息">
      <div slot="content" class="contentBox">
        <div class="shangpin">
          <div class="head">
            <a-row type="flex">
              <a-col :span="12">
                商品
              </a-col>
              <a-col :span="12">
                <span>单价</span>
                <span v-if="false">优惠</span>
                <span>数量</span>
                <span>小计</span>
              </a-col>
            </a-row>
          </div>
          <dotted-line></dotted-line>
          <order-goods
            v-for="(item, index) in orderGoods"
            :key="index"
            :imgSrc="item.picUrl"
            :goodsTitle="item.goodsName"
            :goodsAttrs="item.specifications"
            :price="String(item.price)"
            :num="String(item.number)"
            :amount="String(item.price * item.number)"
            :handleOption="handleOption"
            :id="item.goodsId"
          ></order-goods>
          <div class="footerRight">
            <div class="amountItem">
              <span class="type">
                共<span style="color:#FE5845">{{ orderInfo.orderCount }}</span
                >件商品 合计金额:
              </span>
              <span class="value">￥{{ orderInfo.goodsPrice }}</span>
            </div>
            <div class="amountItem">
              <span class="type">
                运费:
              </span>
              <span class="value">￥{{ orderInfo.freightPrice }}</span>
            </div>
            <div class="amountItem">
              <span class="type">
                优惠券:
              </span>
              <span class="value">￥{{ orderInfo.couponPrice }}</span>
            </div>
            <div class="amountItem">
              <span class="type">
                订单金额:
              </span>
              <span class="value" style="color:#FE5845">￥{{ orderInfo.actualPrice }}</span>
            </div>
            <!-- 待支付 -->
            <div class="amountBtn" v-if="handleOption.pay && handleOption.cancel">
              <a-button class="left-btn" @click="cancelOrder(orderInfo.id)">取消订单</a-button>
              <a-button class="right-btn" @click="goPay(orderInfo.id, orderInfo.actualPrice)">立即付款</a-button>
            </div>
            <!-- (已付款)待发货 或 (已发货)待收货 √-->
            <div
              class="amountBtn"
              v-if="handleOption.confirm || handleOption.refund"
              style="justify-content: flex-end;"
            >
              <!-- <a-button class="left-btn">查看物流</a-button> -->
              <a-button class="right-btn" @click="confirmOrder(orderInfo.id)">确认收货</a-button>
            </div>

            <!-- 交易关闭(已取消) √-->
            <div
              class="amountBtn"
              style="margin-right:-164px"
              v-if="handleOption.delete && !handleOption.comment && !handleOption.rebuy"
            >
              <a-button class="left-btn" @click="deleteOrder(orderInfo.id)">删除订单</a-button>
              <a-button class="right-btn" v-show="false">重新购买</a-button>
            </div>
          </div>
        </div>
      </div>
    </order-info>
    <order-info subtitle="备注信息">
      <div slot="content" style="color: #8B8B8B;" class="contentBox">
        {{ orderInfo.message || '暂无备注信息' }}
      </div>
    </order-info>
  </div>
</template>
<script>
import orderInfo from '@/comments/orderInfo'
import dottedLine from '@/comments/dottedLine'
import orderGoods from '@/comments/orderGoods'
import { orderDetail, orderGetOrderShip, orderDelete, orderCancel, orderConfirm } from '@/api/index'

export default {
  components: {
    orderInfo,
    dottedLine,
    orderGoods
  },
  data() {
    return {
      orderInfo: {},
      active: 0,
      extActive: 0,
      orderGoods: [],
      logisticsInfo: {}, // 物流信息
      handleOption: {}
    }
  },
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    judgeOrderStatus(key) {
      switch (key) {
        case '已取消(系统)':
          this.extActive = 1
          break
        case '订单取消，退款中':
          this.extActive = 1
          break
        case '已取消':
          this.extActive = 1
          break
        case '已退款':
          this.extActive = 1
          break
        case '未付款':
          this.active = 1
          break
        case '已付款':
          this.active = 2
          break
        case '已发货':
          this.active = 3
          break
        case '已收货':
          this.active = 4
          break
        case '交易完成':
          this.active = 4
          break
      }
    },
    // 订单详情
    getDetail() {
      orderDetail(this.$route.query.id).then(res => {
        this.orderInfo = res.data.orderInfo
        this.orderGoods = res.data.orderGoods
        this.handleOption = this.orderInfo.handleOption
        this.orderInfo.mobile = this.orderInfo.mobile.slice(0, 3) + '****' + this.orderInfo.mobile.slice(7)
        const key = this.orderInfo.orderStatusText
        switch (key) {
          case '已取消(系统)':
            this.backgroundbg = 'transaction_close.png'
            this.orderInfo.orderStatusText = '已取消'
            break
          case '未付款':
            this.backgroundbg = 'waiting_pay.png'
            // this.orderInfo.orderStatusText = '等待付款'
            this.orderInfo.orderStatusText = '待支付'

            break
          case '已付款':
            this.backgroundbg = 'waiting_delivery.png'
            this.orderInfo.orderStatusText = '待发货'

            break
          case '已发货':
            this.backgroundbg = 'waiting_receipt.png'
            this.orderInfo.orderStatusText = '待收货'

            break
          case '已收货':
            this.backgroundbg = 'not_evaluated.png'
            // this.orderInfo.orderStatusText = '等待评价'
            this.orderInfo.orderStatusText = '交易完成'

            break
          // case '交易完成':
          //   this.backgroundbg = 'not_evaluated.png'
          //   this.orderInfo.orderStatusText = '已评价'

          //   break

          // none
          case '订单取消，退款中':
            this.backgroundbg = 'not_evaluated.png'
            this.orderInfo.orderStatusText = '等待退款'
            // this.orderInfo.orderStatusText = '已取消'

            break
          // none
          case '已退款':
            this.backgroundbg = 'not_evaluated.png'
            this.orderInfo.orderStatusText = '交易关闭'

            break
          default:
            this.backgroundbg = 'transaction_close.png'

            break
        }
        this.judgeOrderStatus(key)
        if (this.orderInfo.orderStatusText === '待收货' || this.orderInfo.orderStatusText === '交易完成') {
          this.getLogic()
        }
      })
    },
    // 物流信息
    getLogic() {
      // YT4501480653111
      orderGetOrderShip(this.$route.query.id).then(res => {
        // if (res.data.Reason) {
        //   this.$message.error(res.data.Reason)
        // }
        switch (res.data.State) {
          case '0':
            res.data.newState = '暂无轨迹信息'
            break
          case '1':
            res.data.newState = '已揽收'
            break
          case '2':
            res.data.newState = '在途中'
            break
          case '3':
            res.data.newState = '签收'
            break
          case '4':
            res.data.newState = '问题件'
            break
        }
        switch (res.data.ShipperCode) {
          case 'SF':
            res.data.newCode = '顺丰速运'
            break
          case 'YTO':
            res.data.newCode = '圆通速递'
            break
          case 'HTKY':
            res.data.newCode = '百世快递'
            break
          case 'ZTO':
            res.data.newCode = '中通快递'
            break
          case 'STO':
            res.data.newCode = '申通快递'
            break
          case 'YD':
            res.data.newCode = '韵达速递'
            break
          case 'YZPY':
            res.data.newCode = '邮政快递包裹'
            break
          case 'EMS':
            res.data.newCode = 'EMS'
            break
          case 'HHTT':
            res.data.newCode = '天天快递'
            break
          case 'UC':
            res.data.newCode = '优速快递'
            break
          case 'DBL':
            res.data.newCode = '德邦快递'
            break
          case 'ZJS':
            res.data.newCode = '宅急送'
            break
          default:
            break
        }
        this.logisticsInfo = res.data
      })
    },
    // 删除订单
    deleteOrder(orderId) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderDelete({ orderId })
          .then(res => {
            this.$message.success('删除成功')
            this.$router.push('/base/person')
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    },
    // 取消订单
    cancelOrder(orderId) {
      this.$confirm('你确定要取消该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderCancel({ orderId }).then(res => {
          this.$message.success(res.errmsg)
          this.$router.push('/base/person')
        })
      })
    },
    // 发布评价
    goCommit() {
      console.log('id=', this.$route.query.id)
      this.$router.push({ path: '/base/postComments', query: { id: this.$route.query.id } })
    },
    // 确认收货
    confirmOrder(orderId) {
      this.$confirm('你确定要确认收货吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          orderId
        }
        orderConfirm(params).then(res => {
          this.$message.success('确认收货成功')
          this.$emit('getOrderList', orderId)
          history.go(-1)
        })
      })
    },
    // 立即付款
    goPay(orderId, price) {
      this.$router.push({
        path: '/base/classification/waitPay',
        query: {
          orderId,
          price
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.details {
  border: 1px solid #dcdfe6;
  padding: 30px;

  .title {
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    text-align: center;
    width: 90px;
    padding-bottom: 12px;
    color: #424242;
    letter-spacing: 0;
    border-bottom: 2px solid #424242;
  }

  .shangpin {
    .ant-col-12 {
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 50%;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #cacaca;
      letter-spacing: 0;
      // line-height: 14px;
    }

    .ant-col-12:nth-child(2) {
      display: flex;
      // justify-content: space-between;
      align-items: center;

      span {
        flex: 1;
        text-align: center;
      }
    }

    .footerRight {
      // width: 100%;
      // text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .amountItem {
        width: 35%;
        display: flex;
        line-height: 2rem;
        justify-content: space-between;
        .type {
          width: 60%;
          text-align: right;
        }
        .value {
          text-align: right;
        }

        // span {
        //   flex: 1;
        //   text-align: right;
        // }
      }

      .amountBtn {
        width: 35%;
        display: flex;
        margin-top: 10px;
        justify-content: space-between;

        .left-btn {
          width: 45%;
          height: 36px;
          border-radius: 6px;
        }

        .right-btn {
          width: 45%;
          height: 36px;
          border: none;
          color: #fff;
          border-radius: 6px;
          background: #d6be93;
        }
      }
    }
  }

  .gaikuang {
    .head {
      display: flex;
      justify-content: space-between;
    }

    .amountItem {
      line-height: 2rem;

      span {
        color: #8b8b8b;
      }
    }
  }

  .genzong {
    .head {
      display: flex;
      justify-content: space-between;

      span {
        color: #8b8b8b;
      }
    }

    .order-steps {
      padding: 30px;
    }

    .wuliu {
      padding: 23px;
      background: rgba($color: #f7f7f8, $alpha: 0.5);
    }
  }
}
</style>
