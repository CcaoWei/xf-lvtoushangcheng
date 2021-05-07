<template>
  <div class="classification" v-if="$route.path == '/base/classification'">
    <div class="main-block" v-if="sidebarList">
      <a-tabs v-model="sidebar" @change="callback">
        <!-- <a-tabs @change="callback"> -->
        <a-tab-pane :key="item.id" v-for="item in sidebarList.categoryList" :tab="item.name">
          <div class="class-box">
            <div class="classs-item cursor" :key="index" v-for="(cItem, index) in goryList" @click="changeCitem(cItem.id)">
              <img class="class-icon" :src="cItem.iconUrl" alt="" srcset="" />
              <div class="class-name" :class="data.categoryId === cItem.id ? 'select-class-name' :''" v-html="cItem.name"></div>
            </div>

          </div>

          <a-row>
            <a-col span="5" v-for="pItem in typeList" :key="pItem.id" @click="$router.push({ path: '/base/classification/detail', query: { id: pItem.id } })">
              <productItem :good="pItem"></productItem>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

    </div>
  </div>

  <div v-else class="other-box">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive" />
  </div>
</template>

<script>
import productItem from '@/comments/productItem'
import { getType, getGory, getTypeList, searchInfo } from '@/api/index'

export default {
  components: { productItem },
  data() {
    return {
      sidebarList: null,
      goryList: null,
      currentCategory: null,
      RouterState: true,
      parentCategory: null,
      searchShow: null,
      historyList: null,
      placeholderUi: [],
      typeList: [],
      data: {
        categoryId: '',
        page: 0,
        size: 10,
      },
      sidebar: null,
    }
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.$route.path)
    if (this.$route.path === '/base/classification') {
      this.getUiType()
      this.getSearchInfo()
    }
  },
  watch: {
    $route: function () {
      this.goryList = null
      this.typeList = []
      if (this.$route.path === '/base/classification') {
        console.log('监听路由.....')
        this.getUiType()
        this.getSearchInfo()
      }
    },
  },
  methods: {
    handleClick(event) {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation()
    },
    getSearchInfo() {
      searchInfo().then((res) => {
        this.searchShow = {}
        this.searchShow = res.data
        if (res.data.historyKeywordList.length === 0) {
          this.historyList = null
        } else {
          this.historyList = res.data.historyKeywordList
          if (this.historyList.length > 10) {
            this.historyList.length = 10
          }
          // this.placeholderUi = res.data.defaultKeyword.keyword
        }
      })
    },
    callback(key) {
      this.getUiGory(key)
    },
    changeCitem(id) {
      this.data = {
        categoryId: id,
        page: 1,
        size: 10,
      }
      this.typeList = []
      this.getUiTypeList(this.data)
    },
    getUiTypeList(data) {
      getTypeList(data).then((res) => {
        // if (res.errno === 0) {
        const newOfRes = res.data
        this.typeList = this.typeList.concat(newOfRes.goodsList)
        this.loading = false
        // // 数据全部加载完成
        if (this.typeList.length === newOfRes.count) {
          this.finished = true
        }
        // }
      })
    },
    getUiType() {
      getType().then((res) => {
        console.log(res)
        this.sidebarList = { ...res.data }
        if (this.sidebarList.categoryList && this.sidebarList.categoryList.length) {
          if (this.$route.query.id) {
            this.sidebar = parseInt(this.$route.query.id)
            this.getUiGory(this.$route.query.id)
          } else {
            this.sidebar = this.sidebarList.categoryList[0].id
            this.getUiGory(this.sidebarList.categoryList[0].id)
          }
        }
        this.currentCategory = { ...res.data.currentCategory }
        this.currentCategoryName = res.data.currentCategory.name
        // this.goryList = [...res.data.currentSubCategory] // 首次进入分类自动渲染第一个分类bug
      })
    },
    getUiGory(id) {
      getGory(id).then((res) => {
        this.goryList = [...res.data.brotherCategory]
        this.currentCategoryName = res.data.parentCategory.name
        this.currentCategory = { ...res.data.currentCategory }
        this.parentCategory = { ...res.data.parentCategory }
        if (res.data.brotherCategory.length === 0) {
          return
        }
        this.data = {
          categoryId: res.data.brotherCategory[0].id,
          page: 1,
          size: 10,
        }
        this.typeList = []
        this.getUiTypeList(this.data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .ant-tabs-nav-wrap {
  display: none;
}
.classification {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding: 10px 360px 0;
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

  // ::v-deep .ant-col-5 {
  //   display: block;
  //   -webkit-box-sizing: border-box;
  //   box-sizing: border-box;
  //   width: 20%;
  // }
  // .main-content {
  //   background: #fff;
  // }

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
  ::v-deep .ant-row {
    position: relative;
    height: auto;
    margin-right: 0;
    margin-left: 0;
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

  // .default-result {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: flex-start;
  //   align-items: center;
  //   height: 30px;
  //   width: 1070px;
  //   margin: 14px auto 30px;

  //   .result-item {
  //     // margin-right: 25px;
  //     margin-right: 13px;
  //     font-family: PingFangSC-Regular;
  //     font-size: 18px;
  //     color: #424242;
  //     letter-spacing: 0.41px;
  //     // padding-right: 25px;
  //     padding-right: 13px;
  //     border-right: 1px solid #424242;
  //     height: 18px;
  //     line-height: 18px;
  //   }
  //   .result-item:hover {
  //     cursor: pointer;
  //   }

  //   .result-item:last-child {
  //     border-right: none;
  //   }
  // }

  .main-block {
    min-height: 1000px;
    box-sizing: border-box;
    width: 1170px;
    margin: 0 auto 0;
    background-color: #fff;
    padding: 0 16px;
    .class-box {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
      overflow: hidden;
      // padd
      // margin-left: 15px;
      .classs-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 30px;
        margin-right: 54px;
        float: left;
        // color: salmon;
        .class-icon {
          height: 24px;
          width: 24px;
        }

        .class-name {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          letter-spacing: 0.27px;
          // font-family: PingFangSC-Regular;
          // font-size: 18px;
          color: #424242;
          // letter-spacing: 0.41px;
          // width: 74px;
        }
        .select-class-name {
          color: #d6be93;
        }
      }
      .classs-item:nth-child(11n) {
        margin-right: 0;
      }
    }
  }
}
</style>
