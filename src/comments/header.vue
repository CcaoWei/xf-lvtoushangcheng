<template>
  <div class="header-box">
    <div class="header-top">
      <div class="header-width">
        <div @click="navToMain" style="cursor:pointer">
          <img class="header-icon" src="@/assets/icons/home-top.png" alt="" />
          <span class="web-name">吉好选首页</span>
        </div>
        <div class="web-btn" v-if="!userInfo">
          <div class="cursor" @click="$router.push({ path: '/login' })">请先登录</div>
          <div class="line">|</div>
          <div class="cursor" @click="$router.push({ path: '/sign' })">免费注册</div>
          <div class="line">|</div>
          <div class="cursor" @click="navToPersionOrder(0)">我的订单</div>
        </div>
        <div class="web-btn" v-if="userInfo">
          <a-dropdown class="username" placement="bottomCenter" :getPopupContainer="
            triggerNode => {
              return triggerNode.parentNode || document.body;
            }
          ">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ userInfo.userInfo.nickName }}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="navTo('myOrders')">
                个人中心
              </a-menu-item>
              <a-menu-item @click="navToPersionOrder(4)">
                评价晒单
              </a-menu-item>
              <a-menu-item @click="navTo('myCollection')">
                收藏商品
              </a-menu-item>
              <a-menu-item @click="navTo('safeSetting')">
                安全设置
              </a-menu-item>
              <a-menu-item @click="logOut">
                退出登录
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div class="line">|</div>
          <div class="cursor" @click="navToPersionOrder(0)">我的订单</div>
          <div class="line" v-if="userInfo.userInfo.userType === 2">|</div>
          <div class="cursor" v-if="userInfo.userInfo.userType === 2" @click="goSupplier">供应商供货</div>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="header">
        <div class="header-left cursor">
          <img src="@/assets/images/login/logo.png" class="header-logo" @click="navToMain" alt="" srcset="" />
        </div>
        <div style="width:550px;height: 140px;margin-top: 24px;position:relative" @mouseleave="mouseLeave">
          <a-input-search class="serach-input" :placeholder="inputKeyword ? inputKeyword : '输入你想要的东西'" size="large" v-model="inputKeyword" @search="onSearch" @change="input">
            <a-button slot="enterButton">
              搜索
            </a-button>
          </a-input-search>
          <!-- ------------------------------ v-if="inputing && inputKeyword" 根据关键字提醒弹框-->
          <!-- <div v-if="true" class="result-content">  v-if="keywordResult.length != 0"  -->
          <div v-if="inputing && inputKeyword && keywordResult.length !== 0">
            <div class="result-content">
              <div class="result" v-for="(item, index) in keywordResult" :key="index" @click="searchKeyword(item.keyword)" @mouseover="mouseover(item)">
                <span>{{ item.keyword }}</span>
                <span @click.stop="deleteKeyword(item.keyword)">删除</span>
              </div>
              <p class="delete" @click="deleteAll">全部删除</p>
            </div>
          </div>

          <!-- ----------------------------- -->
          <div class="history">
            <div v-if="historyList" class="default-resulut">
              <div class="result-item" :style="{ color: itemChecked == his.keyword ? '#D6BE93' : '' }" v-for="his in historyList" @click="searchHistory(his.keyword)" :key="his.keyword">
                {{ his.keyword }}
              </div>
            </div>
          </div>

          <div class="header-center">
            <div @click="navToMain" class="header-main header-item" :class="select == 'main' ? 'header-select' : ''">
              首页
            </div>

            <div v-for="item in categoryList" :key="item.id">
              <span @click="toCatagoryContent(item.id)" class="header-main header-item" :class="select !== 'classification' ? '' : itemId == item.id ? 'header-select' : ''">{{ item.name }}</span>
              <a-row>
                <a-col span="6" v-for="pItem in typeList" :key="pItem.id" @click="$router.push({ path: '/base/classification/detail', query: { id: pItem.id } })">
                  <productItem :good="pItem"></productItem>
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
        <div v-if="$route.path === '/base/shopCart'"></div>
        <a-popover placement="bottom" v-else>
          <template slot="content">
            <div class="cart-info" v-if="isLogin && list">
              <div class=" product-item" v-for="(item, index) in list.cartList" :key="index">
                <img :src="item.picUrl" alt="" srcset="" />
                <div class="product-info">
                  <div class="product-name">{{ item.goodsName }}</div>
                  <div class="product-size">
                    <span v-for="i in item.specifications" :key="i">{{ i }}</span> x{{ item.number }}
                  </div>
                </div>
                <div class="product-price">¥ {{ item.price }}</div>
                <div class="product-close" @click="deleteItem(item)">X</div>
              </div>
              <div class="count-text">
                <span class="content-style content-size"> {{ list.cartTotal.checkedGoodsCount }} </span>件商品，共计：<span class="content-style">¥{{ list.cartTotal.goodsAmount }} </span>
              </div>
              <el-button class="sub-btn" @click="navToShopCart" type="primary">去购物车结算</el-button>
            </div>
            <div class="cart-info" v-if="!isLogin">
              <div class="no-login-text">您还没有登录，请先登录，登录后可查看购物车</div>
              <el-button class="sub-btn" @click="$router.push({ path: '/login' })" type="primary">请登录</el-button>
            </div>
          </template>

          <!-- v-if="$route.path !== '/base/shopCart'" -->
          <div class="header-right cursor" @click="navToShopCart" @mouseenter="mouseenterEv">
            <!--            <a-badge :count="cartCount">-->
            <!--              <img src="@/assets/icons/shop-cart.png" width="16" height="16"/>-->
            <!--            </a-badge>-->
            <img src="@/assets/icons/shop-cart.png" width="16" height="16" />
            <div style="font-family: PingFangSC-Regular;font-size: 12px;color: #424242;">我的购物车</div>
            <a-badge :count="cartCount"> </a-badge>
          </div>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { cartGoodscount, cartList, cartDelete, searchInfo, getType } from '@/api/index' //  获取购物车列表
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      allEmpty: false,
      inputing: false,
      showDel: false,
      inputKeyword: '',
      keywordResult: [],
      keyWords: [],
      itemChecked: '',
      select: 'main',
      info: false,
      list: null,
      isLogin: false,
      historyList: [],
      searchShow: null,
      categoryList: null,
      typeList: [],
      data: {
        categoryId: '',
        page: 0,
        size: 10,
      },
      itemId: 0,
      a: {
        value: [],
      },
    }
  },
  computed: {
    ...mapGetters(['cartCount', 'userInfo']),
  },
  created() {},
  mounted() {
    this.getSearchInfo()
    this.getUiType()
    console.log(this.userInfo)
    if (localStorage.getItem('Access-Token')) {
      cartGoodscount().then((res) => {
        localStorage.setItem('cartCount', res.data)
        this.$store.commit('SET_CARTCOUNT', res.data)
      })
    }

    // console.log(this.$route.fullPath)
    var str = this.$route.fullPath
    var main = RegExp(/\/base\/main/)
    var classification = RegExp(/\/base\/classification/)
    var shopCart = RegExp(/\/base\/shopCart/)
    var person = RegExp(/\/base\/person/)
    if (main.exec(str)) {
      this.select = 'main'
    }
    if (classification.exec(str)) {
      this.select = 'classification'
    }
    if (shopCart.exec(str)) {
      this.select = 'shopCart'
    }
    if (person.exec(str)) {
      this.select = 'person'
    }
  },

  methods: {
    mouseover(item) {
      item.selected = true
    },
    input() {
      this.inputing = true
      if (JSON.parse(localStorage.getItem('keywordArr'))) {
        const arr = JSON.parse(localStorage.getItem('keywordArr'))
        console.log('arr=', arr)
        if (arr.value.length > 10) {
          arr.value = arr.value.slice(0, 10)
          this.keywordResult = arr.value
        } else if (arr.value.length <= 10) {
          this.keywordResult = arr.value
        }
      }
    },
    deleteKeyword(keyword) {
      for (let i = 0; i < this.keywordResult.length; i++) {
        if (this.keywordResult[i].keyword === keyword) {
          this.keywordResult.splice(i, 1)
        }
      }
    },
    // 全部删除
    deleteAll() {
      console.log('全部删除')
      window.localStorage.removeItem('keywordArr')
      this.keywordResult = []
    },
    mouseLeave() {
      this.inputing = false
    },
    // 点击弹出框中item搜索
    searchKeyword(value) {
      this.itemChecked = value
      if (value === '') {
        this.$message({
          message: '请输入要搜索的内容',
          type: 'warning',
        })
        return
      }
      this.$router.push({
        path: '/base/classification/result',
        query: { searchValue: value },
      })
      this.inputKeyword = ''
    },
    // 点击分类
    toCatagoryContent(id) {
      this.itemId = id
      console.log('id=', id)
      this.select = 'classification'
      this.$router.push({ path: '/base/classification', query: { id } })
    },
    getUiType() {
      getType().then((res) => {
        console.log('获取分类=', res)
        console.log(this.itemId)
        // this.itemId = res.currentCategory.id
        this.categoryList = res.data.categoryList
        if (!this.$route.query.id) {
          this.itemId = this.categoryList[0].id
        } else {
          this.itemId = this.$route.query.id
        }
      })
    },

    callback(key) {
      // this.getUiGory(key)

      this.$router.push('/base/classification')
    },

    goSupplier() {
      window.open('http://jclt.cafewallet.cn/')
    },
    getCartCount() {
      if (localStorage.getItem('Access-Token')) {
        this.userInfo = this.$store.state.user.info.userInfo
        cartGoodscount().then((res) => {
          this.$store.commit('SET_CARTCOUNT', res.data)
          localStorage.setItem('cartCount', res.data)
        })
      }
    },
    deleteItem(item) {
      const data = {
        productIds: [item.productId],
      }
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          cartDelete(data).then((res) => {
            this.getCartList()
            this.getCartCount()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    logOut() {
      this.$store.dispatch('Logout')
    },
    navTo(id) {
      const data = [id, 0]
      this.navToPersion()
      this.$store.commit('SET_PERSON_DATA', data)
    },

    navToPersionOrder(id) {
      const data = ['myOrders', id]
      this.navToPersion()
      this.$store.commit('SET_PERSON_DATA', data)
    },
    getCartList() {
      cartList().then((res) => {
        if (res.errno === 0) {
          this.list = res.data
        }
      })
    },
    mouseenterEv() {
      console.log(this.userInfo)
      if (!this.userInfo || !this.userInfo.token) {
        this.isLogin = false
        return
      }
      this.isLogin = true

      this.getCartList()
    },
    navToMain() {
      this.select = 'main'
      this.$router.push({
        path: '/home',
      })
    },
    navToClass() {
      this.select = 'classification'
      this.$router.push({
        path: '/base/classification',
      })
    },
    navToShopCart() {
      this.select = 'shopCart'

      this.$router.push({
        path: '/base/shopCart',
      })
    },
    navToPersion() {
      this.select = 'person'
      if (localStorage.getItem('Access-Token')) {
        this.$router.push({
          path: '/base/person',
        })
      } else {
        this.$router.push({
          path: '/login',
        })
      }
    },
    getSearchInfo() {
      searchInfo().then((res) => {
        this.searchShow = {}
        this.searchShow = res.data
        if (res.data.hotKeywordList.length === 0) {
          this.historyList = null
        } else {
          for (let i = 0; i < res.data.hotKeywordList.length; i++) {
            if (i < 6) {
              this.historyList.push(res.data.hotKeywordList[i])
            }
          }
        }
      })
    },
    searchHistory(value) {
      this.itemChecked = value
      if (value === '') {
        this.$message({
          message: '请输入要搜索的内容',
          type: 'warning',
        })
        return
      }
      this.$router.push({
        path: '/base/classification/result',
        query: { searchValue: value },
      })
    },
    onSearch(value) {
      this.inputing = false
      console.log('value=', value)

      if (value === '') {
        this.$message({
          message: '请输入要搜索的内容',
          type: 'warning',
        })
        return
      } else {
        console.log(this.a.value.length, 'this.a.value.length+++++++++++++++==')
        const item = {
          keyword: value,
        }
        this.a.value.push(item)
        localStorage.setItem('keywordArr', JSON.stringify(this.a))
        this.itemChecked = value
        this.$router.push({
          path: '/base/classification/result',
          query: { searchValue: value },
        })
      }
      // this.getSearchInfo()
      // 搜索后清空输入框中的关键字
      this.inputKeyword = ''
    },
  },
}
</script>
<style lang="scss" scoped>
.header-box {
  .header-top {
    height: 32px;
    background: #e3e4e5;

    .header-width {
      margin: 0 auto;
      width: 1170px;
      height: 32px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-icon {
        width: 20px;
        height: 20px;
        margin-top: -4px;
        margin-right: 2px;
      }

      .web-name {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #8b8b8b;
        letter-spacing: 0;
      }

      .web-btn {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        x div {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #8b8b8b;
          letter-spacing: 0;
        }

        .line {
          margin: 0 11px;
        }

        .username {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #8b8b8b;
          letter-spacing: 0;
        }
        /deep/ .ant-dropdown-menu-item {
          text-align: center;
        }
        /deep/ .ant-dropdown {
          left: 0 !important;
        }
      }
    }
  }

  .header-bottom {
    width: 100%;
    //border-bottom: 1px solid #f0f0f0;

    border-bottom: 1px solid #d6be93;
    .header {
      height: 140px;
      width: 1170px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      // align-items: center;

      box-sizing: border-box;
      margin: 0 auto;

      .header-logo-tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-right {
        width: 150px;
        height: 36px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #424242;
        letter-spacing: 0;
        margin-top: 23px;
        border: 1px solid #efefef;
        align-items: center;
        position: relative;

        .header-item {
          cursor: pointer;
          font-weight: 600;
        }

        .header-select {
          font-family: PingFangSC-Regular;
          color: #d6be93;
          font-weight: 600;
          letter-spacing: 0;
        }

        .header-person {
          margin-left: 38px;
        }

        .person-logo {
          height: 30px;
          width: 30px;
          border-radius: 100%;
        }
      }
    }
  }
}

.cursor {
  cursor: pointer;
}

.cart-info {
  text-align: center;
  // background: #ffffff;
  // box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  // width: 324px;
  // height: 385px;
  .no-login-text {
    margin: 40px auto 20px;
    text-align: center;
    width: 70%;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #424242;
    letter-spacing: 0;
    line-height: 28px;
  }

  .product-item {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;

    img {
      height: 76px;
      width: 76px;
    }

    .product-info {
      width: 127px;

      .product-name {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #424242;
        letter-spacing: 0;
        width: 100%;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .product-size {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #424242;
        line-height: 20px;
      }
    }

    .product-price {
      font-family: PingFangSC-Semibold;
      font-size: 13px;
      color: #424242;
      text-align: right;
      line-height: 20px;
    }

    .product-close {
      font-size: 14px;
      color: #8b8b8b;
      cursor: pointer;
    }
  }

  .count-text {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #000000;
    letter-spacing: 0;
    line-height: 20px;
    margin-bottom: 11px;
    text-align: right;

    .content-style {
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #fe5845;
      letter-spacing: 0;
      line-height: 20px;
    }

    .content-size {
      font-size: 13px;
    }
  }

  .sub-btn {
    background: #d6be93;
    border-radius: 4px;
    width: 300px;
    height: 42px;
    border: 0;
    margin: 0 auto;
  }
}

.default-resulut {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 24px;
  width: 1070px;
  margin: 6px auto 0;

  .result-item {
    margin-right: 13px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #a6a6a6;
    letter-spacing: 0.41px;
    padding-right: 13px;
    height: 18px;
    line-height: 18px;
  }

  .result-item:hover {
    cursor: pointer;
  }

  .result-item:last-child {
    border-right: none;
  }
}

::v-deep .ant-input-group .ant-input {
  border: 2px solid #d6be93;
  height: 36px;
}

::v-deep .ant-input-group-addon {
  background: #d6be93;
  //height: 36px;

  button {
    height: 36px;
  }

  button {
    background: #d6be93;
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: -0.11px;
    text-align: center;
    // width: 60px;
    box-sizing: border-box;
  }
}

::v-deep .ant-input-group-wrapper {
  width: 1070px;
  margin: 0 auto;
  display: block;
  height: 60px;
  box-sizing: border-box;

  .ant-input-group {
    height: 100%;
  }
}

.serach-input {
  width: 550px;
  height: 36px;
  display: flex;
}

.header-left {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-family: PingFangSC-Regular;
  font-size: 19.93px;
  letter-spacing: 0;

  .header-logo {
    width: 147px;
    height: 57px;
    margin-right: 10px;
  }
}
.history {
  height: 24px;
  margin: 6px auto 0;
}
.header-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  margin-top: 18px;

  .header-item {
    cursor: pointer;
    font-weight: 600;
  }

  .header-select {
    font-family: PingFangSC-Regular;
    color: #d6be93;
    letter-spacing: 0;
    font-weight: 600;
  }
}

.result-content {
  width: 482px;
  position: absolute;
  z-index: 10;
  top: 36px;
  background: #ffffff;
  border: 1px solid #cacaca;

  .result {
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #005aa0;
    padding-left: 12px;
    padding-right: 12px;
    height: 25px;
    line-height: 25px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .delete {
    padding-left: 12px;
    padding-right: 12px;
    text-align: right;
    border-top: 1px solid #ddd;
    margin-bottom: 2px;
    cursor: pointer;
  }
}

::v-deep .ant-scroll-number {
  width: 25px;
  height: 14px;
  line-height: 14px;
  background: #fe5845;
  border-radius: 8.29px;
  font-size: 12px;
  color: #fdfdfd;
  letter-spacing: 0;
  text-align: center;
  padding: 0;
}

::v-deep .ant-badge-multiple-words {
  padding: 0;
}
</style>
