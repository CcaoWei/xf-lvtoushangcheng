<template>
  <div class="body">
    <p class="header">
      <span>首页 > 领券中心</span>
    </p>
    <div class="group" style="width:100%">
      <div class="content">
        <div class="content-top">
          <p class="content-title">[ 领券中心 ]</p>
          <p class="content-desc">发现更多超值优惠券</p>
        </div>
        <div class="content-body">

          <div class="infinite-list-wrapper" style="overflow:auto">
            <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
              <!-- <li v-for="i in count" class="list-item">{{ i }}</li> -->
              <a-row type="flex" justify="start">
                <a-col :span="4" v-for="item in couponLists" :key="item.id">
                  <div class="coupon">
                    <div class="body" v-if="item.goodsType !== 2">
                      <div class="left" :style="{ background: item.goodsType == 1 ? 'rgba(255, 137, 0, 0.2)' : 'rgba(145, 211, 251, 0.2)' }">
                        <div :class="item.goodsType == 1 ? 'designated' : 'currency'">
                          <span class="icon">￥</span>
                          <span class="money">{{ item.discount }}</span>
                        </div>
                        <div class="desc" v-if="item.min>0" :style="{ color: item.goodsType == 1 ? ' #fe5845' : '#3dabe7' }">
                          满{{ item.min }}元可用
                        </div>
                        <div v-else class="desc" :style="{ color: item.goodsType == 1 ? ' #fe5845' : '#3dabe7' }">
                          无门槛使用
                        </div>
                      </div>
                      <div class="center">
                        <span :class="item.goodsType == 1 ? 's1': 's2'">{{ item.name }}</span>
                        <p v-if="item.goodsType == 1" class="name">限{{ item.typeName }}分类商品使用</p>
                        <p v-if="item.goodsType == 0" class="name">全场通用券</p>
                        <div v-if="item.endTime" class="effective">
                          <p>有效期至:</p>
                          <p>{{ item.endTime }}</p>
                        </div>
                        <div v-else class="effective">
                          <p>有效期:{{ item.days }}天</p>
                        </div>
                      </div>
                    </div>
                    <div class="body" v-else>
                      <div class="left">
                        <img :src="item.goodsPic" width="100%" height="100%" alt="" />
                      </div>
                      <div class="center">
                        <div class="goods-right">
                          <span>￥</span>
                          <span class="price">{{ item.discount }}</span>
                          <span class="desc" v-if="item.min>0">满{{ item.min }}元可用</span>
                          <span class="desc" v-else>无门槛使用</span>
                        </div>
                        <p class="name1">限{{ item.typeName }}商品使用</p>
                        <div v-if="item.endTime" class="effective">
                          <p>有效期至:</p>
                          <p>{{ item.endTime }}</p>
                        </div>
                        <div v-else class="effective">
                          <p>有效期:{{ item.days }}天</p>
                        </div>
                      </div>
                    </div>

                    <div class="get-right" @click="handleReceive(item.id)">立即领取</div>
                  </div>
                </a-col>
              </a-row>
            </div>
            <p class="info-center" v-if="loading">加载中...</p>
            <p class="info-center" v-if="noMore && couponLists.length >0">没有更多了</p>
          </div>
          <!-- <div v-for="item in 4" :key="item"> -->

          <!-- </div> -->
        </div>
        <div v-show="total==0" class="lack">
          <img src="@/assets/images/coupon_lack.png" alt="">
          <p class="desc">还没有优惠券哦～</p>
          <el-button @click="handleNext">看看其他商品</el-button>
        </div>
      </div>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[9,12,15]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
import { couponList, couponReceive } from '@/api/index'
const couponLists = []
export default {
  data() {
    return {
      couponLists,
      total: 0,
      query: {
        page: 1,
        size: 20,
      },
      loading: false,
    }
  },
  computed: {
    noMore() {
      return this.couponLists.length >= this.total
    },
    disabled() {
      return this.loading || this.noMore
    },
  },
  methods: {
    load() {
      this.loading = true
      this.query.page += 1
      setTimeout(() => {
        this.getCouponList()
      }, 1000)
    },
    getCouponList() {
      couponList(this.query).then((res) => {
        this.total = res.data.count
        this.couponLists = [...this.couponLists, ...res.data.data]
        this.loading = false
      })
    },
    // handleSizeChange(val) {
    //   this.query.size = val
    //   this.getCouponList()
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`)
    //   this.query.page = val
    //   this.getCouponList()
    // },
    // 领取优惠券
    handleReceive(couponId) {
      // const params = {
      //   couponId: couponId,
      // }
      couponReceive(couponId).then((res) => {
        if (res.errno === 0) {
          this.$message({
            message: '优惠券领取成功',
            type: 'success',
          })
          this.query.page = 1
          this.getCouponList()
          this.couponLists = []
        } else {
          this.$message.error(res.errmsg)
        }
      })
    },
    handleNext() {
      this.$router.push({
        name: 'classification',
      })
    },
  },
  mounted() {
    this.getCouponList()
    this.$nextTick(() => {
      var timer = setInterval(function () {
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-osTop / 2)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        this.isTop = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 30)
    })
  },
}
</script>

<style lang="scss" scoped>
.info-center {
  text-align: center;
}
.body {
  .header {
    width: 100%;
    height: 40px;
    background: #fafafa;
    margin: 0;
    span {
      display: flex;
      width: 1170px;
      line-height: 40px;
      margin: 0 auto;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #8b8b8b;
    }
  }
  .group {
    background-image: url('../../assets/images/listLogo.png');
    background-size: cover;
    padding-top: 24px;
    min-height: 859px;
    .content {
      width: 1170px;
      margin: 0 auto;
      .content-top {
        text-align: center;
        .content-title {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #2e2e2e;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
          margin-bottom: 6px;
        }
        .content-desc {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #a9936b;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
        }
      }
      .content-body {
        width: 1170px;
        display: flex;
        justify-content: space-between;
        .coupon-bg {
          width: 376px;
          height: 146px;
          background: #ffffff;
          border: 1px solid rgba(139, 139, 139, 0.2);
        }
        .coupon {
          width: 376px;
          height: 146px;
          background-image: url('../../assets/images/appointCoupon.png');
          background-size: cover;
          position: relative;
          margin-bottom: 24px;
          .body {
            display: flex;
            width: 80%;
            justify-content: flex-start;
          }
          .left {
            width: 106px;
            height: 106px;
            margin: 20px;
            .designated {
              font-family: PingFangSC-Regular;
              color: #fe5845;
              letter-spacing: 0;
              text-align: center;
              .icon {
                font-size: 14px;
              }
              .money {
                font-size: 50px;
              }
            }
            .currency {
              font-family: PingFangSC-Regular;
              color: #3dabe7;
              letter-spacing: 0;
              text-align: center;
              .icon {
                font-size: 14px;
              }
              .money {
                font-size: 50px;
              }
            }

            .desc {
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #fe5845;
              letter-spacing: 0;
              text-align: center;
            }
          }
          .center {
            height: 106px;
            margin-top: 22px;
            .s1 {
              background: rgba(#ff8900, 0.05);
              color: #ff8900;
              padding: 0 5px;
              display: inline-block;
              max-width: 160px;
              letter-spacing: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .s2 {
              background: rgba(#91d3fb, 0.1);
              color: #91d3fb;
              padding: 0 5px;
              display: inline-block;
              max-width: 160px;
              letter-spacing: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .effective {
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #cacaca;
              letter-spacing: 0;
              p {
                margin: 0;
              }
            }
            .name {
              margin: 15px 0;
              width: 160px;
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #424242;
              letter-spacing: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .get-right {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #8b572a;
          cursor: pointer;
          letter-spacing: 0;
          line-height: 22px;
          width: 15px;
          position: absolute;
          top: 29px;
          right: 20px;
        }
        .goods-right {
          font-size: 14px;
          color: #f84165;
          .price {
            font-size: 30px;
          }
          .desc {
            background: rgba(#f84165, 0.05);
            color: #f84165;
            padding: 0 10px;
          }
        }
        .name1 {
          width: 160px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #424242;
          letter-spacing: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .lack {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #606266;
        position: relative;
        top: 100px;
        .desc {
          margin: 20px 0;
          letter-spacing: 0;
          line-height: 16px;
        }
      }
    }
  }
}
::v-deep .ant-col-4 {
  width: 376px !important;
  margin-right: 20px;
}
::v-deep .ant-col-4:nth-child(3n) {
  margin-right: 0;
}
::v-deep .ant-row-flex {
  width: 100%;
}
::v-deep .el-pagination {
  white-space: nowrap;
  /* padding: 10px 5px; */
  color: #303133;
  font-weight: 700;
  text-align: center;
}
</style>
