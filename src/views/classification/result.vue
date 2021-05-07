<template>
  <div class="classification">
    <div class="main-block">
      <!-- <div class="title">{{ val }}</div>
      <div class="line">
        <div class="shot-line"></div>
        <div class="long-line"></div>
      </div> -->
      <div class="search-grade">
        <span class="grade-text">搜索结果 > </span><span class="grade-point">{{ val }}</span>
      </div>
      <div class="search-sort">
        <a-tag :class="{'checked':zonghe}" class="btn-select" @click="checkZonghe">综合</a-tag>
        <a-tag :class="{'checked':order}" class="btn-select" @click="checkJiage">
          <div>价格</div>
          <img class="select-icon" :src="require('@/assets/images/'+selectImg)" />
        </a-tag>
      </div>
      <a-row v-if="goodsList && goodsList.length !== 0">

        <a-col span="5" v-for="item in goodsList" :key="item.id" @click="$router.push({ path: '/base/classification/detail', query: { id: item.id } })">
          <productItem :good="item"></productItem>
        </a-col>
      </a-row>
      <!-- <a-empty description="暂无数据" v-else /> -->
      <div v-else class="tishi">
        <img src="../../assets/icons/warning.png" class="warning" alt="altText" />
        <div>
          <p>
            抱歉，没有找到与
            <span>"{{ val }}"</span>
            相关的商品
          </p>
          <p class="serach-other">请尝试其他关键词</p>
          <el-button @click="$router.push({path:'/home'})" size="mini">查看其他商品</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productItem from '@/comments/productItem'
import { getTypeList, searchInfo } from '@/api/index'
export default {
  components: { productItem },
  data() {
    return {
      selectImg: 'select_bottom.png',

      val: '',
      searchShow: null,
      searchResult: null,
      tabClickTime: 0,
      filterCategoryList: null,
      goodsList: null,
      historyList: [],
      order: null,
      zonghe: true,
      data: {
        keyword: '',
        page: 1,
        size: 10,
        sort: 'name',
        order: 'asc',
        categoryId: 0,
      },
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.val = this.$route.query.searchValue
    this.getSearchResult()
    this.getSearchInfo()
  },
  watch: {
    $route: function () {
      if (this.$route.query.searchValue) {
        this.val = this.$route.query.searchValue
        this.getSearchResult()
        this.getSearchInfo()
      }
    },
  },
  methods: {
    checkZonghe() {
      this.zonghe = true
      this.data.sort = 'add_time'
      this.data.order = null
      this.fenlei = false
      const searchData = {
        page: this.data.page,
        size: this.data.size,
        order: 'asc',
        sort: this.data.sort,
        categoryId: 0,
      }
      if (this.typeKey) {
        searchData[this.typeKey] = true
      }
      this.data = searchData
      this.getSearchResult()
    },
    checkJiage() {
      this.zonghe = false
      console.log(this.data.order)
      this.data.sort = 'retail_price'
      this.fenlei = false
      if (this.data.order === null) {
        this.data.order = 'desc'
        this.selectImg = 'select_bottom.png'
      } else if (this.data.order === 'asc') {
        this.data.order = 'desc'
        this.selectImg = 'select_bottom.png'
      } else if (this.data.order === 'desc') {
        this.data.order = 'asc'
        this.selectImg = 'select_top.png'
      }
      const searchData = {
        page: this.data.page,
        size: this.data.size,
        order: this.data.order,
        sort: this.data.sort,
        categoryId: 0,
      }
      if (this.typeKey) {
        searchData[this.typeKey] = true
      }
      this.data = searchData
      this.getSearchResult()
    },

    getSearchInfo() {
      searchInfo().then((res) => {
        this.searchShow = null
        if (res.errno === 0) {
          this.searchShow = res.data
          this.historyList = res.data.historyKeywordList

          this.placeholderUi = res.data.defaultKeyword.keyword
        }
      })
    },
    onSearch(value) {
      // console.log(value)
      this.val = value
      this.getSearchResult()
      this.getSearchInfo()
    },
    getSearchResult() {
      this.isShowResult = true
      this.searchShow = null
      this.searchResult = null
      this.data.keyword = this.val
      getTypeList(this.data).then((res) => {
        this.filterCategoryList = res.data.filterCategoryList
        this.goodsList = res.data.goodsList
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.classification {
  width: 100%;
  background: #fff;
  padding: 0px 106px 0;
  box-sizing: border-box;
  min-height: 100vh;

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

  .main-block {
    box-sizing: border-box;
    width: 1200px;
    // margin: 130px auto 0;
    margin: 0 auto;

    .title {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #424242;
      letter-spacing: 0;
      line-height: 24px;
      margin-bottom: 20px;
      margin-left: 15px;
      margin-right: 15px;
    }

    .line {
      margin-bottom: 20px;
      margin-left: 15px;
      margin-right: 15px;

      .shot-line {
        height: 3px;
        width: 48px;
        background: #424242;
      }

      .long-line {
        height: 1px;
        width: 100%;
        background: #424242;
      }
    }

    .search-grade {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #8b8b8b;
      letter-spacing: 0;
      line-height: 40px;

      .grade-text {
        color: #8b8b8b;
      }

      .grade-point {
        color: #8b8b8b;
      }
    }
    .search-sort {
      background: #fafafa;
      border: 1px solid rgba(202, 202, 202, 0.3);
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      box-sizing: border-box;
      .btn-select {
        cursor: pointer;
        padding: 0 20px;
        width: 54px;
        height: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-right: 0;

        .select-icon {
          width: 8px;
          height: 12px;
          margin-left: 4px;
        }
      }
    }

    .tishi {
      width: 1170px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin-top: 100px;
      margin-bottom: 100px;
      .warning {
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }
      p {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #fe5845;
        letter-spacing: 0;
        margin: 0;
      }
      .serach-other {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #a6a6a6;
        margin-bottom: 22px;
      }
      span {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
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
  ::v-deep .ant-row {
    position: relative;
    height: auto;
    margin-right: 0;
    margin-left: -15px;
    zoom: 1;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
  }
  ::v-deep .ant-col-5 {
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: calc(20% - 2px);
    height: 352px;
  }
}
</style>
