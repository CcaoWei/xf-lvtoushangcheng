<template>

  <div class="main-block main-line">
    <div class="title">领券中心</div>
    <div class="line">
      <div class="shot-line"></div>
      <div class="long-line"></div>
    </div>
    <div class="tabs-item">
      首页/ <span>领券中心</span>
    </div>
    <el-row :gutter="20" class="input-bottom">
      <ul class="infinite-list" v-infinite-scroll="onLoad" style="overflow:auto">
        <!-- <li v-for="i in count" class="infinite-list-item">{{ i }}</li> -->
        <el-col :span="8" v-for="(item,index) in couponListUi" :key="index">
          <main-copon @getReceive="receive" :coupinItem="item"></main-copon>
        </el-col>
      </ul>

    </el-row>
  </div>
</template>

<script>
import mainCopon from '@/comments/mainCopon'
// import { couponExchange, couponMylist, couponReceive } from '@/api/index'
import { couponList, couponReceive } from '@/api/index'

export default {
  components: { mainCopon },
  data() {
    return {
      couponListUi: [],
      finished: false,
      data: {
        page: 0,
        size: 10,
      },
    }
  },
  mounted() {},
  methods: {
    receive(id) {
      couponReceive(id).then((res) => {
        this.getUiIndex()
      })
    },
    onLoad() {
      // 异步更新数据
      if (this.finished === true) {
        return false
      }
      const nextPaging = {
        page: this.data.page + 1,
        size: 10,
      }
      this.data = nextPaging
      this.getcouponList(this.data)
    },
    getCoupon(info) {
      console.log(info)
      couponReceive(info.id).then((res) => {
        console.log('领取成功')
      })
    },
    getcouponList(data) {
      couponList(data).then((res) => {
        console.log(res)
        const newOfRes = JSON.parse(JSON.stringify(res.data))
        this.couponListUi = this.couponListUi.concat(newOfRes.data)
        console.log(this.couponListUi.length)
        // 数据全部加载完成
        if (this.couponListUi.length === newOfRes.count) {
          this.finished = true
        }
      })
    },
    navToDetail(id) {
      console.log(id)
      this.$router.push({
        path: '/type/detail',
        name: '商品详情',
        query: {
          id: id,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
// .content {
//   height: 100%;
//   width: 100%;

//   ::v-deep .ant-carousel .slick-slide {
//     height: 480px;
//     overflow: hidden;
//     // min-width: 1170px;
//   }

//   /deep/ .ant-carousel {
//     min-width: 1170px;
//   }

//   ::v-deep .ant-carousel .custom-slick-arrow {
//     width: 25px;
//     height: 25px;
//     font-size: 25px;
//     color: #fff;
//     background-color: rgba(31, 45, 61, 0.11);
//     opacity: 0.3;
//   }

//   ::v-deep .ant-carousel .custom-slick-arrow:before {
//     display: none;
//   }

//   ::v-deep .ant-carousel .custom-slick-arrow:hover {
//     opacity: 0.5;
//   }

//   ::v-deep .ant-carousel .slick-slide h3 {
//     color: #fff;
//   }

.main-block {
  // padding: 0 40px;
  box-sizing: border-box;
  width: 1440px;
  margin: 130px auto 0;
  .title {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #424242;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 20px;
    margin-left: 15px;
  }

  .line {
    margin-bottom: 20px;
    margin-left: 15px;

    .shot-line {
      height: 3px;
      width: 91px;
      background: #424242;
    }

    .long-line {
      height: 1px;
      width: 100%;
      background: #424242;
    }
  }
}
.main-line {
  width: 1170px;
  margin: 50px auto 0;
  position: relative;
  .more {
    position: absolute;
  }
}
.tabs-item {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #a6a6a6;
  letter-spacing: 0;
  line-height: 24px;
  margin-bottom: 50px;
  margin-left: 15px;
  span {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #000;
    letter-spacing: 0;
    line-height: 24px;
  }
}
/deep/ .infinite-list {
  padding: 0;
  margin-left: 15px;
}
//   ::v-deep .ant-col-8 {
//     display: flex;
//     justify-content: center;
//     // margin: 0 15px 30px;
//   }

//   ::v-deep .ant-card-bordered {
//     margin-right: 15px;
//     margin-left: 15px;
//     margin-bottom: 30px;
//   }

//   ::v-deep .ant-tabs-nav-scroll {
//     display: flex;
//     justify-content: center;
//   }

//   ::v-deep .ant-tabs-bar {
//     border-bottom: none;
//     margin-bottom: 50px;
//   }

//   ::v-deep .ant-tabs-nav .ant-tabs-tab {
//     font-family: PingFangSC-Regular;
//     font-size: 24px;
//     color: #8b8b8b;
//     letter-spacing: 0;
//     line-height: 24px;
//   }

//   ::v-deep .ant-tabs-nav .ant-tabs-tab-active {
//     font-family: PingFangSC-Semibold;
//     font-size: 24px;
//     color: #424242;
//     letter-spacing: 0;
//     line-height: 24px;
//   }

//   ::v-deep .ant-tabs-ink-bar {
//     background-color: #424242;
//     height: 3px;
//   }

//   ::v-deep .ant-row {
//     padding: 0 102px;
//   }
// }
</style>
