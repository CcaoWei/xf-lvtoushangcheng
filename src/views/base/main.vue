<template>
  <div class="content">
    <a-carousel autoplay arrows>
      <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
        <a-icon type="right-circle" />
      </div>
      <img :src="item.url" v-for="(item,index) in indexData.banner" :key="index" alt="" srcset="">
    </a-carousel>
    <div class="main-block">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="品牌制造商">
          <a-row>
            <a-col span="8" v-for="(item,index) in indexData.brandList" :key="index">
              <a-card hoverable style="width: 100%" @click="$router.push('/base/main/directSupply')">
                <img slot="cover" alt="example" :src="item.picUrl" width="370" height="237" />
              </a-card>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="新品首发" force-render>
          <tag :page="page" :size="size" :count="count" typeKey="isNew" :filterCategoryList="filterCategoryList" @getTypeList="getTypeList"></tag>
          <a-row>
            <a-col span="6" v-for="(item,index) in indexData.newGoodsList" :key="index" @click="$router.push({path:'/base/classification/detail',query:{id:item.id}})">
              <productItem :good="item"></productItem>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="3" tab="人气推荐">
          <tag :page="page" :size="size" :count="count" typeKey="isHot" :filterCategoryList="filterCategoryList" @getTypeList="getTypeList"></tag>
          <a-row>
            <a-col span="6" v-for="(item,index) in indexData.hotGoodsList" :key="index" @click="$router.push({path:'/base/classification/detail',query:{id:item.id}})">
              <productItem :good="item"></productItem>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="4" tab="专题精选">
          <specialList :listData="indexData.topicList"></specialList>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="main-block main-line" v-if="indexData.couponList && indexData.couponList.length > 0">
      <div class="title">领券中心</div>
      <div class="line">
        <div class="shot-line"></div>
        <div class="long-line"></div>
      </div>
      <div class="more cursor" @click="$router.push('/base/main/couponList')">更多> </div>

      <el-row :gutter="20" class="input-bottom  ">
        <el-col :span="8" v-for="(item,index) in indexData.couponList" :key="index">
          <main-copon @getReceive="receive" :coupinItem="item"></main-copon>
        </el-col>

      </el-row>
    </div>
    <div class="main-block">
      <a-tabs default-active-key="1" @change="checkChannel">
        <a-tab-pane v-for="(item,index) in indexData.channel" :key="index" :tab="item.name">
          <a-row>
            <a-col span="8" v-for="(good,i) in channelChecked===0?indexData.floorGoodsList[0].goodsList:indexData.floorGoodsList[channelChecked].goodsList" :key="i" @click="$router.push({path:'/base/classification/detail',query:{id:good.id}})">
              <productItemLarge :good="good"></productItemLarge>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script>
import productItem from '@/comments/productItem'
import productItemLarge from '@/comments/productItemLarge'
import mainCopon from '@/comments/mainCopon'
import tag from '@/comments/tag'
import specialList from '@/comments/specialList'
import { getIndex, getTypeList, couponReceive } from '@/api/index'

export default {
  components: { productItem, tag, productItemLarge, specialList, mainCopon },
  data() {
    return {
      imgs: [],
      indexData: {},
      page: 1,
      size: 10,
      count: 0,
      filterCategoryList: [],
      fistTabChecked: 1,
      channelChecked: 0,
    }
  },

  created() {},
  mounted() {
    this.getUiIndex()
  },
  methods: {
    receive(id) {
      couponReceive(id).then((res) => {
        this.getUiIndex()
      })
    },

    getUiIndex() {
      getIndex().then((res) => {
        this.indexData = res.data
        this.indexData.topicList = [...this.indexData.topicList]
      })
    },
    getTypeList(searchData) {
      getTypeList(searchData).then((res) => {
        if (this.fistTabChecked === '2') {
          this.indexData.newGoodsList = [...res.data.goodsList]
        } else if (this.fistTabChecked === '3') {
          this.indexData.hotGoodsList = [...res.data.goodsList]
        }

        this.count = res.data.count
        this.filterCategoryList = [...res.data.filterCategoryList]
      })
    },
    callback(key) {
      this.page = 1
      this.fistTabChecked = key
      const searchData = {
        page: this.page,
        size: this.size,
        order: 'asc',
        sort: 'add_time',
        categoryId: 0,
      }
      if (key === '2') {
        searchData.isNew = true
        this.getTypeList(searchData)
      } else if (key === '3') {
        searchData.isHot = true
        this.getTypeList(searchData)
      }
    },
    checkChannel(key) {
      this.channelChecked = key
    },
  },
}
</script>
<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;

  ::v-deep .ant-carousel .slick-slide {
    height: 480px;
    overflow: hidden;
    // min-width: 1170px;
  }

  /deep/ .ant-carousel {
    min-width: 1170px;
  }

  ::v-deep .ant-carousel .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }

  ::v-deep .ant-carousel .custom-slick-arrow:before {
    display: none;
  }

  ::v-deep .ant-carousel .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  ::v-deep .ant-carousel .slick-slide h3 {
    color: #fff;
  }

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
    margin: 130px auto 0;
    position: relative;
    .more {
      position: absolute;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #8b8b8b;
      letter-spacing: 0;
      line-height: 24px;
      right: 0;
      top: 0;
    }
  }
  ::v-deep .ant-col-8 {
    display: flex;
    justify-content: center;
    // margin: 0 15px 30px;
  }

  ::v-deep .ant-card-bordered {
    margin-right: 15px;
    margin-left: 15px;
    margin-bottom: 30px;
  }

  .product-item {
    background-image: linear-gradient(180deg, #f8f8f8 0%, #f7f7f8 100%);
    border-radius: 6px;

    .product-img {
      height: 310px;
      width: auto;
      margin: 0 auto;
    }

    .product-name {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #2e2e2e;
      letter-spacing: 0;
      text-align: center;
      line-height: 28px;
    }

    .product-text {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2e2e2e;
      text-align: center;
      letter-spacing: 0;
      line-height: 40px;
      margin-top: 24px;
    }
  }

  ::v-deep .ant-tabs-nav-scroll {
    display: flex;
    justify-content: center;
  }

  ::v-deep .ant-tabs-bar {
    border-bottom: none;
    margin-bottom: 50px;
  }

  ::v-deep .ant-tabs-nav .ant-tabs-tab {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #8b8b8b;
    letter-spacing: 0;
    line-height: 24px;
  }

  ::v-deep .ant-tabs-nav .ant-tabs-tab-active {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #424242;
    letter-spacing: 0;
    line-height: 24px;
  }

  ::v-deep .ant-tabs-ink-bar {
    background-color: #424242;
    height: 3px;
  }

  ::v-deep .ant-row {
    padding: 0 102px;
  }
}
</style>
