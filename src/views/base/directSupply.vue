<template>
  <div class="direct-supply">

    <div class="main-block" style="overflow: hidden">
      <div class="title">品牌制造商直供</div>
      <div class="line">
        <div class="shot-line"></div>
        <div class="long-line"></div>
      </div>
      <div class="search-grade">
        <span class="grade-text">首页 /</span><span class="grade-point">品牌制造商直供</span>
      </div>
      <a-row>
        <a-col span="6" v-for="(item,index) in goodsList" :key="index" @click="$router.push({path:'/base/classification/detail',query:{id:item.id}})">
          <productItem :good="item"></productItem>
        </a-col>
      </a-row>
      <a-pagination v-model="page" :total="count" hideOnSinglePage/>
    </div>
  </div>
</template>

<script>
  import productItem from '@/comments/productItem'
  import { getTypeList } from '@/api/index'

  export default {
    components: { productItem },
    data() {
      return {
        goodsList: [],
        page: 1,
        size: 10,
        count: 0
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      this.getTypeList()
    },
    methods: {
      getTypeList() {
        const searchData = {
          brandId: this.$route.query.id,
          page: this.page,
          size: this.size,
        }
        getTypeList(searchData).then(res => {
          this.goodsList = [...res.data.goodsList]
          this.count = res.data.count
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .direct-supply {
    height: 100%;
    width: 100%;
    background: #fff;
    padding: 50px 106px 0;
    box-sizing: border-box;

    ::v-deep .ant-input-group-wrapper {
      width: 1070px;
      margin: 0 auto;
      display: block;
      height: 60px;

      .ant-input-group {
        height: 100%;
      }
    }

    ::v-deep .ant-input-group .ant-input {
      border: 2px solid #d6be93;
      height: 100%;
    }

    ::v-deep .ant-input-group-addon {
      background: #d6be93;

      button {
        background: #d6be93;
        border: none;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #ffffff;
        letter-spacing: -0.11px;
        text-align: center;
        width: 140px;
        box-sizing: border-box;
      }
    }

    .default-resulut {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 30px;
      width: 1070px;
      margin: 14px auto 30px;

      .result-item {
        // margin-right: 25px;
        margin-right: 13px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #424242;
        letter-spacing: 0.41px;
        // padding-right: 25px;
        padding-right: 13px;
        border-right: 1px solid #424242;
        height: 18px;
        line-height: 18px;
      }
      .result-item:hover{
        cursor: pointer;
      }

      .result-item:last-child {
        border-right: none;
      }
    }

    .main-block {
      // padding: 0 40px;
      box-sizing: border-box;
      width: 1170px;
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
          width: 168px;
          background: #424242;
        }

        .long-line {
          height: 1px;
          width: 100%;
          background: #424242;
        }
      }

      .search-grade {
        margin-left: 15px;
        padding-bottom: 50px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        letter-spacing: 0;
        line-height: 24px;

        .grade-text {
          color: #a6a6a6;
        }

        .grade-point {
          color: #424242;
        }
      }

      .class-box {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 15px;

        .classs-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 30px;

          .class-icon {
            height: 54px;
            width: 54px;
          }

          .class-name {
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #424242;
            letter-spacing: 0.41px;
          }
        }
      }
    }
  }
</style>
