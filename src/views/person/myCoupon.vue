<template>
  <div style="position:relative;width:100%">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="table-box">
      <el-tab-pane label="未使用" name="unUse" class="used-item">
        <coupon-item :youhuiList="couponListUi" couponType="unUse" :backgroundImage="useYouhuiquanPng" v-if="couponListUi.length > 0"></coupon-item>
        <a-empty class="emptyBox" description="暂无数据" v-else />
      </el-tab-pane>
      <el-tab-pane label="已使用" name="used" class="used-item">
        <coupon-item :youhuiList="couponListUi" couponType="used" :backgroundImage="unUseYouhuiPng" v-if="couponListUi.length > 0" :hasUsedPng="hasUsedPng"></coupon-item>
        <a-empty class="emptyBox" description="暂无数据" v-else />
      </el-tab-pane>
      <el-tab-pane label="已过期" name="expired" class="used-item">
        <coupon-item :youhuiList="couponListUi" couponType="expired" :backgroundImage="unUseYouhuiPng" v-if="couponListUi.length > 0" :hasUsedPng="ExpiredPng"></coupon-item>
        <a-empty class="emptyBox" description="暂无数据" v-else />
      </el-tab-pane>
    </el-tabs>

    <div class="exchange" @click="exchangeCoupon">兑换优惠券</div>
    <el-pagination v-show="total>0" class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="coupondataInfo.page" :page-sizes="[10,20,30,40]" :page-size="coupondataInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- <a-pagination :default-current="1" :total="Math.ceil(count/10)*10" hideOnSinglePage class="pagination" /> -->
  </div>
</template>

<script>
import useYouhuiquanPng from '@/assets/images/appointCoupon.png'
import unUseYouhuiPng from '@/assets/images/guoqiCoupon.png'
import hasUsedPng from '@/assets/images/hasUsed(2).png'
import ExpiredPng from '@/assets/images/expired(2).png'
import CouponItem from '../../comments/couponItem'
import { couponExchange, couponMylist } from '@/api/index'

const youhuiList = [
  {
    price: 50,
    desc: '满100减50',
    need: '满100可用',
    expired: '1天',
  },
]
export default {
  data() {
    return {
      count: 0,
      activeName: 'unUse',
      youhuiList,
      useYouhuiquanPng,
      unUseYouhuiPng,
      hasUsedPng,
      ExpiredPng,
      page: 1,
      total: 0,
      emptyimage: 'https://img.yzcdn.cn/vant/coupon-empty.png',
      showcountNumber: false,
      showclosebutton: false,
      showList: true,
      chosenCoupon: -1,
      couponListUi: [],
      coupondataInfo: {
        status: 0,
        page: 1,
        size: 10,
      },
      code: '',
      loading: false,
      finished: false,
    }
  },
  components: {
    CouponItem,
  },
  mounted() {
    this.getcouponList(this.coupondataInfo)
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        const nextPaging = {
          status: this.coupondataInfo.status,
          page: this.coupondataInfo.page + 1,
          size: 10,
        }
        this.coupondataInfo = nextPaging
        this.getcouponList(this.coupondataInfo)
      }, 500)
    },
    getcouponList(data) {
      couponMylist(data).then((res) => {
        this.total = res.data.count
        // this.couponListUi = res.data.data
        const couponListArr = []
        res.data.data.forEach((element, index) => {
          // const startStr = element.startTime.replace(/-/g, '/')
          // var startDate = new Date(startStr)
          // const endStr = element.endTime.replace(/-/g, '/')
          // var endDate = new Date(endStr)
          // const dataM = '1970-01-01 00:00:00'.replace(/-/g, '/')
          // var dataMidel = new Date(dataM)
          // var startNum = (startDate - dataMidel) / 1000
          // var endNum = (endDate - dataMidel) / 1000
          const couponItem = {
            id: element.id,
            available: index,
            min: parseInt(Number(element.min).toFixed(2)),
            couponType: element.couponType,
            desc: element.desc,
            // reason: '时间过期',
            // value: index,
            name: element.name,
            typeName: element.typeName,
            // startAt: element.startTime,
            // endAt: element.endTime,
            // valueDesc: Number(element.discount).toFixed(2),
            discount: parseInt(Number(element.discount).toFixed(2)),
            unitDesc: '元',
            goodsPic: element.goodsPic,
            description: element.desc,
            endTime: element.endTime,
            startTime: element.startTime,
            tag: element.tag,
            goodsId: element.goodsId,
            addType: element.type, // 1 新到 2 将过期
            cType: element.cType, // 0 通用券，用户领取；1， 注册赠券；2，优惠券码兑换
          }
          couponListArr.push(couponItem)
        })
        this.couponListUi = couponListArr
        this.loading = false
        this.count = res.data.count
        // // // 数据全部加载完成
        if (this.couponListUi.length === res.data.count) {
          this.finished = true
        }
      })
    },

    handleClick(tab, event) {
      this.couponListUi = []
      this.coupondataInfo.status = tab.index
      this.getcouponList(this.coupondataInfo)
    },
    // 兑换优惠券
    exchangeCoupon() {
      this.$prompt('兑换优惠券', {
        confirmButtonText: '确认兑换',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          // this.$message({
          //   type: 'success',
          //   message: '你输入的优惠券码是: ' + value
          // })

          const data = {
            code: value,
          }
          couponExchange(data).then((res) => {
            this.couponListUi = []
            this.coupondataInfo = {
              status: 0,
              page: 1,
              size: 10,
            }
            this.activeName = 'unUse'
            this.getcouponList(this.coupondataInfo)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          })
        })
    },
    handleSizeChange(val) {
      this.coupondataInfo.size = val
      this.getcouponList(this.coupondataInfo)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.coupondataInfo.page = val
      this.getcouponList(this.coupondataInfo)
    },
  },
}
</script>

<style lang="scss" scoped>
.table-box {
  width: 100%;
}
.used-item {
  width: 100%;
  margin: 0 auto;
}
.youhui {
  width: 100%;
  height: 106px;
  margin-bottom: 16px;
  margin-right: 36px;
  position: relative;
}
.exchange {
  width: 120px;
  height: 32px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  top: 18px;
  right: 30px;
  border: 1px solid #cacaca;
  border-radius: 6px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #424242;
  cursor: pointer;
}
.emptyBox {
  margin-top: calc(25%);
}
.pagination {
  width: 100%;
  text-align: center;
  margin-bottom: 33px;
  margin-top: 20px;
}
/deep/ .el-tabs__item {
  font-size: 16px !important;
}
/deep/ .el-tabs__nav-scroll {
  background: #fafafa;
}
/deep/.el-tabs__item.is-active {
  border-top-color: #d6be93;
  font-size: 16px !important;
  color: #d6be93;
  border-bottom: none;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  background-color: #f9fafc;
}
/deep/ .el-message-box__btns {
  padding: 5px 15px 0;
  text-align: center;
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border-top: 5px solid #d6be93;
}

.el-message-box .el-message-box__btns .el-button--primary {
  color: #fff;
  background-color: #d6be93;
  border-color: #d6be93;
}
/deep/ .el-tabs__nav {
  height: 60px;
  overflow: hidden;
}
</style>
