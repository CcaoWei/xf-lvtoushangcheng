<template>
  <div class="content-body">
    <a-row type="flex" justify="start" style="width:100%">
      <a-col :span="4" v-for="item in youhuiList" :key="item.id">
        <div
          class="coupon"
          :id="couponType === 'unUse' ? '' : 'grayscale'"
          :style="{ backgroundImage: 'url(' + `${backgroundImage}` + ')' }"
        >
          <img class="tip" v-show="hasUsedPng" :src="hasUsedPng" alt="" />
          <img
            class="tip"
            v-show="item.addType"
            :src="
              item.addType == 1 ? require('../assets/images/c_news.png') : require('../assets/images/c_expired.png')
            "
            alt=""
          />
          <div class="body" v-if="item.couponType !== 2">
            <div
              class="left"
              :style="{
                background:
                  item.couponType == 1
                    ? 'rgba(255, 137, 0, 0.1)'
                    : item.cType == 1
                    ? 'rgba(248, 65, 101,0.1)'
                    : 'rgba(145, 211, 251, 0.1)'
              }"
            >
              <div :class="item.couponType == 1 ? 'designated' : item.cType == 1 ? 'news' : 'currency'">
                <span class="icon">￥</span>
                <span class="money">{{ item.discount }}</span>
              </div>
              <div
                class="desc"
                v-if="item.min > 0"
                :style="{ color: item.couponType == 1 ? ' #fe5845' : item.cType == 1 ? '#F84165' : '#3dabe7' }"
              >
                满{{ item.min }}元可用
              </div>
              <div
                class="desc"
                v-else
                :style="{ color: item.couponType == 1 ? ' #fe5845' : item.cType == 1 ? '#F84165' : '#3dabe7' }"
              >
                无门槛使用
              </div>
            </div>
            <div class="center">
              <span :class="item.couponType == 1 ? 's1' : item.cType == 1 ? 's3' : 's2'">{{ item.name }}</span>
              <p v-if="item.couponType == 1" class="name">限{{ item.typeName }}分类商品使用</p>
              <p v-if="item.couponType == 0" class="name">全场通用券</p>
              <div class="effective">
                <p>有效期至:</p>
                <p>{{ item.endTime }}</p>
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
                <span class="desc" v-if="item.min > 0">满{{ item.min }}元可用</span>
                <span class="desc" v-else>无门槛使用</span>
              </div>
              <p class="name1">限{{ item.typeName }}商品使用</p>
              <div class="effective">
                <p>有效期至:</p>
                <p>{{ item.endTime }}</p>
              </div>
            </div>
          </div>
          <div class="get-right" :style="{ cursor: btnText !== '去使用' ? '' : 'pointer' }" @click="goBuy(item)">
            {{ btnText }}
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import { couponList } from '@/api/index'
// const couponLists = [{ id: 0 }, { id: 1 }, { id: 2 }]
export default {
  props: {
    youhuiList: {
      type: Array,
      default: function() {
        return []
      }
    },
    backgroundImage: {
      type: String,
      default: function() {
        return ''
      }
    },
    hasUsedPng: {
      type: String,
      default: function() {
        return ''
      }
    },
    couponType: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      // couponLists,
      query: {
        page: 2,
        size: 10
      }
    }
  },
  computed: {
    btnText() {
      let text = ''
      switch (this.couponType) {
        case 'unUse':
          text = '去使用'
          break
        case 'used':
          text = '已使用'
          break
        case 'expired':
          text = '已过期'
      }
      return text
    }
  },
  methods: {
    goBuy(item) {
      console.log(item)
      if (this.btnText === '去使用') {
        switch (item.couponType) {
          case 0:
            this.$router.push({ path: '/home' })
            break
          case 1:
            this.$router.push({ path: '/home' })
            break
          case 2:
            this.$router.push({
              path: '/base/classification/detail',
              query: {
                id: item.goodsId
              }
            })
            break
          default:
            break
        }
      }
    }
    // getCouponList() {
    //   couponList(this.query).then(res => {
    //     this.couponLists = res.data.data
    //   })
    // }
  },
  mounted() {
    console.log(this.youhuiList)
    // this.getCouponList()
  }
}
</script>

<style lang="scss" scoped>
.content-body {
  width: 1170px;
  width: 100%;
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
    // background-image: url('../assets/images/appointCoupon.png');
    background-size: cover;
    // position: relative;
    margin-bottom: 24px;
    margin-right: 40px;
    .tip {
      position: absolute;
      top: 0;
      left: 0;
    }
    .body {
      justify-content: flex-start;
      display: flex;
      width: 85%;
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
      .news {
        font-family: PingFangSC-Regular;
        color: #f84165;
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
        display: inline-block;
        padding: 0 5px;
        max-width: 160px;
        letter-spacing: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .s3 {
        background: rgba(#f84165, 0.05);
        color: #f84165;
        max-width: 160px;
        display: inline-block;
        padding: 0 5px;
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
      .goods-right {
        font-size: 14px;
        color: #FE5845;
        .price {
          font-size: 30px;
        }
      }
      .desc {
        background: rgba(#FE5845, 0.05);
        color: #FE5845;
        padding: 0 10px;
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
  }
  // 页面置灰
  #grayscale {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
  }
  .get-right {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #8b572a;
    letter-spacing: 0;
    line-height: 22px;
    width: 15px;
    position: absolute;
    top: 40px;
    right: 20px;
  }
}
::v-deep .ant-col-4 {
  width: 376px !important;
  margin-right: 30px;
}
::v-deep .ant-col-4:nth-child(2n) {
  margin-right: 0;
}
::v-deep .ant-row-flex {
  width: 100%;
}
</style>
