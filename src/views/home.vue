<template>
  <div class="home">
    <!-- <Header></Header> -->
    <div class="head">
      <!-- <img src="@/assets/images/home_bg_text.png" class="head-text"> -->
      <div class="head-top">
        <img src="@/assets/images/home/logo.png" style="width:106px;height:40px;margin-top:25px" />
        <ul class="nav" v-if="categoryList">
          <li @click="handleScroll('a' + (index + 1))" v-for="(item, index) in nav" :key="item" v-text="item"></li>
        </ul>
        <div class="head-search">
          <div class="web-btn" v-if="!userInfo">
            <div class="cursor" @click="$router.push({ path: '/login' })">请先登录</div>
            <!--            <div class="line">|</div>-->
            <!--            <div class="cursor" @click="$router.push({ path: '/sign' })">免费注册</div>-->
            <div class="line">|</div>
            <div class="cursor" @click="navToPersionOrder(0)">我的订单</div>
          </div>
          <div class="web-btn" v-if="userInfo">
            <!-- <div>{{ userInfo.userInfo.nickName }}</div> -->
            <a-dropdown placement="bottomCenter" :getPopupContainer="
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
      <a-carousel autoplay :autoplaySpeed="10000">
        <div>
          <img src="https://ecdn.cafewallet.cn/banner/lbst01.jpg" style="width: 100%;" />
        </div>
        <div>
          <img src="https://ecdn.cafewallet.cn/banner/lbst02.jpg" style="width: 100%;" />
        </div>
        <div>
          <img src="https://ecdn.cafewallet.cn/banner/lbst03.jpg" style="width: 100%;" />
        </div>
        <div>
          <img src="https://ecdn.cafewallet.cn/banner/lbst04.jpg" style="width: 100%;" />
        </div>
        <!--        <div>-->
        <!--          <img src="@/assets/images/home_bg.png">-->
        <!--          <img src="@/assets/images/home_bg_text.png" class="head-text">-->
        <!--        </div>-->
      </a-carousel>
    </div>
    <div class="main">
      <div id="a1">
        <div class="main-box jiudian" v-if="categoryList && categoryList[0]">
          <img src="@/assets/images/home_jiudian.png" width="220" height="50" class="main-title" />
          <p class="main-text">吉彩，新集采</p>
          <div class="more" @click="$router.push('/base/classification')">
            查看全部
            <a-icon type="right" />
          </div>
          <a-tabs @change="callback0" v-if="brotherCategory0" :tab-bar-gutter="48">
            <a-tab-pane :key="index" :tab="item.name" v-for="(item, index) in brotherCategory0">
              <div class="jiudian-content">
                <div style="width:190px;height:260px;float:left;position: relative;">
                  <div class="jiudian-text">
                    <div class="jiudian-text-bt">吉彩酒店</div>
                    <div class="jiudian-text-content">酒店用品一站式购齐</div>
                  </div>
                  <img src="@/assets/images/home_a1.png" style="width:100%;height:100%" />
                </div>
                <div class="jiudian-box">
                  <div v-for="gItem in goodsList0" :key="gItem.id" class="jiudian-item" @click="goDetail(gItem.id)">
                    <div>
                      <img :src="gItem.picUrl" />
                    </div>
                    <h5 v-text="gItem.name"></h5>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div id="a2">
        <div class="main-box shicai" v-if="categoryList && categoryList[1]">
          <!-- <h3 v-text="categoryList[1].name"></h3> -->
          <img src="@/assets/images/home_shicai.png" class="main-title" />
          <p class="main-text">鲜美，不止表面</p>
          <div class="more" @click="$router.push({ path: '/base/classification', query: { id: categoryList[1].id } })">
            更多推荐
            <a-icon type="right" />
          </div>
          <a-tabs @change="callback1" v-if="brotherCategory1" :tab-bar-gutter="48">
            <a-tab-pane :key="index" :tab="item.name" v-for="(item, index) in brotherCategory1">
              <div class="shicai-content">
                <div style="width:390px;height:486px;float:left">
                  <img src="@/assets/images/home_a2.png" style="width:100%;height:100%" />
                </div>
                <div class="shicai-box" style="margin-left:390px">
                  <div v-for="gItem in goodsList1" :key="gItem.id" class="shicai-item" @click="goDetail(gItem.id)">
                    <div>
                      <img :src="gItem.picUrl" />
                    </div>
                    <h5 v-text="gItem.name"></h5>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="middle-box">
        <div class="base">
          <div class="new">
            <div class="title" @click="$router.push({path:'/base/newAndHot',query:{type:1}})">
              <div>新品首发</div>
              <img src="@/assets/images/home/more.png">
            </div>
            <el-carousel class="card" :interval="4000" type="card" height="130px" indicator-position="none" @change="newChange">
              <el-carousel-item v-for="(item,index) in newList" :key="index">
                <img :src="item.picUrl">
              </el-carousel-item>
            </el-carousel>
            <div class="bottom">
              <div class="bottom-title">{{ newItem.name }}…</div>
              <div class="msg" @click="$router.push({path:'/base/newAndHot',query:{type:1}})">发现更多新品</div>
              <div class="price">¥ {{ newItem.retailPrice }}</div>
            </div>
          </div>
          <div class="hot">
            <div class="title" @click="$router.push({path:'/base/newAndHot',query:{type:2}})">
              <div>热门推荐</div>
              <img src="@/assets/images/home/more.png">
            </div>
            <div class="info">
              <div class="row" v-for="(item,index) in hotList" :key="index">
                <img :src="item.picUrl">
                <div class="right-box">
                  <div class="right-title">{{ item.name }}</div>
                  <div class="right-price">￥{{ item.retailPrice }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="coupon" @click="$router.push('/base/couponCenter')"></div>
        </div>
      </div>
      <div id="a3">
        <div class="main-box youpin" v-if="categoryList && categoryList[2]" style="margin-bottom:58px">
          <!-- <h3 v-text="categoryList[2].name"></h3> -->
          <img src="@/assets/images/home_youpin.png" class="main-title" />
          <p class="main-text">严选，甄好物</p>
          <div class="more" style="top:58px" @click="$router.push({ path: '/base/classification', query: { id: categoryList[2].id } })">
            查看更多
            <a-icon type="right" />
          </div>
          <a-tabs @change="callback2" v-if="brotherCategory2" :tab-bar-gutter="54">
            <a-tab-pane :key="index" :tab="item.name" v-for="(item, index) in brotherCategory2">
              <div style="height:364px;margin-bottom:24px">
                <img :src="youpinImageList[index]" style="width:100%;height:100%" />
              </div>
              <div class="youpin-box">
                <div v-for="gItem in goodsList2" :key="gItem.id" class="youpin-item" @click="goDetail(gItem.id)">
                  <div>
                    <img :src="gItem.picUrl" />
                  </div>
                  <h5 v-text="gItem.name"></h5>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div id="a4">
        <div class="main-box lvxing" v-if="categoryList && categoryList[3]">
          <!-- <h3 v-text="categoryList[3].name"></h3> -->
          <img src="@/assets/images/home_lvxing.png" class="main-title" />
          <p class="main-text" style="color:#fff">越享，悦彩吉林</p>
          <div class="more" @click="$router.push({ path: '/base/classification', query: { id: categoryList[3].id } })" style="color:#C3C7CE;top:63px">
            查看更多
            <a-icon type="right" />
          </div>
          <a-tabs @change="callback3" v-if="brotherCategory3" :tab-bar-gutter="54">
            <a-tab-pane :key="index" :tab="item.name" v-for="(item, index) in brotherCategory3">
              <div class="lvxing-box">
                <div v-for="gItem in goodsList3" :key="gItem.id" class="lvxing-item" @click="goDetail(gItem.id)">
                  <div>
                    <img :src="gItem.picUrl" />
                  </div>
                  <h5 v-text="gItem.name"></h5>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <el-dialog class="first-dialog" center :show-close="false" :visible.sync="firstShow" :close-on-click-modal="false">
      <div class="first-box">
        <div class="first-big-title">{{ firstNumber }}张优惠券</div>
        <div class="first-row" v-for="(item,index) in firstCouponsList" :key="index">
          <div class="first-price">¥{{ item.discount }}</div>
          <div class="first-center">
            <div class="first-title">满{{ item.min }}元使用</div>
            <div class="first-msg" v-if="!item.typeName">全场通用券</div>
            <div class="first-msg" v-else-if="item.goodsType===1">限{{ item.typeName }}分类商品使用</div>
            <div class="first-msg" v-else-if="item.goodsType===2">限{{ item.typeName }}商品使用</div>
            <div class="first-date">有效期至：{{ item.dateStr }}</div>
          </div>
          <div>
            <el-button class="first-button" v-if="item.goodsType === 2" type="warning" @click="goDetail(item.goodsId)">去使用</el-button>
            <el-button class="first-button" v-else type="warning" @click="firstShow = false">去使用</el-button>
          </div>
        </div>
      </div>
      <div slot="footer">
        <img src="@/assets/images/home/first_close.png" @click="firstShow = false" class="first-close">
      </div>
    </el-dialog>
    <img v-if="!userInfo" @click="$router.push('/sign')" src="https://ecdn.cafewallet.cn/mallpic/new_user.png" class="new-user">
    <Footer></Footer>
  </div>
</template>

<script>
//   import Header from '@/comments/header'
import { getIndex, getType, getGory, getTypeList, firstCoupons } from '@/api/index'
import { mapGetters } from 'vuex'
import Footer from '@/comments/footer'

export default {
  data() {
    return {
      newList: [],
      hotList: [],
      newItem: {},
      nav: ['吉彩酒店', '吉彩食材', '吉彩优品', '吉彩旅行', '全部商品'],
      categoryList: [],
      brotherCategory0: [],
      brotherCategory1: [],
      brotherCategory2: [],
      brotherCategory3: [],
      goodsList0: [],
      goodsList1: [],
      goodsList2: [],
      goodsList3: [],
      firstCouponsList: [],
      firstNumber: 0,
      youpinImageList: [
        require('@/assets/images/home/yp_y3.jpg'),
        require('@/assets/images/home/yp_y2.jpg'),
        require('@/assets/images/home/yp_y4.jpg'),
        require('@/assets/images/home/yp_y1.jpg'),
        require('@/assets/images/home/yp_y5.jpg'),
      ],
      firstShow: false,
    }
  },
  components: {
    Footer,
  },
  computed: {
    ...mapGetters(['cartCount', 'userInfo']),
  },
  created() {
    this.getType()
    this.getData()
    if (this.userInfo.userInfo.first) {
      this.firstShow = true
      this.userInfo.userInfo.first = false
      this.$store.commit('SET_INFO', this.userInfo)
      firstCoupons().then((res) => {
        this.firstNumber = res.data.length
        this.firstCouponsList = res.data.splice(0, 3)
        this.firstCouponsList.forEach((item) => {
          console.log('#######')
          console.log(item)
          if (item.timeType === 0) {
            const today = new Date()
            const itemDate = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + item.days,
              today.getHours(),
              today.getMinutes(),
              today.getSeconds()
            )
            console.log(itemDate)
            item.dateStr = this.dateFormat('YYYY-mm-dd HH:MM', itemDate)
          } else {
            item.dateStr = item.endTime
          }
        })
      })
    }
  },
  mounted() {
    //   this.getUiIndex()
  },
  methods: {
    dateFormat(fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
        }
      }
      return fmt
    },
    getData() {
      getIndex().then((res) => {
        this.newList = res.data.newGoodsList.splice(0, 3)
        this.newItem = { ...this.newList[0] }
        this.hotList = res.data.hotGoodsList.splice(0, 3)
      })
    },
    newChange(index) {
      this.newItem = { ...this.newList[index] }
    },
    goDetail(id) {
      this.$router.push({
        path: '/base/classification/detail',
        query: {
          id: id,
        },
      })
    },
    handleScroll(id) {
      console.log(id)
      if (id === 'a5') {
        this.$router.push({
          path: '/base/classification',
        })
      } else {
        this.$nextTick(() => {
          const scrollIntoViewOptions = {
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth',
          }
          if (document.getElementById(id)) {
            document.getElementById(id).scrollIntoView(scrollIntoViewOptions)
          }
        })
      }
    },
    callback0(key) {
      console.log(key)
      this.goodsList0 = []
      this.getTypeList0(this.brotherCategory0[key].id)
    },
    callback1(key) {
      console.log(key)
      this.goodsList1 = []
      this.getTypeList1(this.brotherCategory1[key].id)
    },
    callback2(key) {
      console.log(key)
      this.goodsList2 = []
      this.getTypeList2(this.brotherCategory2[key].id)
    },
    callback3(key) {
      console.log(key)
      this.goodsList3 = []
      this.getTypeList3(this.brotherCategory3[key].id)
    },
    getType() {
      getType().then((res) => {
        this.categoryList = res.data.categoryList
        // console.log(this.categoryList)
        for (let i = 0; i < this.categoryList.length; i++) {
          const element = this.categoryList[i]
          if (i === 0) {
            getGory(element.id).then((res) => {
              if (res.data.brotherCategory.length > 6) {
                this.brotherCategory0 = res.data.brotherCategory.splice(0, 6)
              } else {
                this.brotherCategory0 = res.data.brotherCategory
              }
              console.log(res)
              console.log(res.data.currentCategory)
              this.getTypeList0(res.data.currentCategory.id)
            })
          }
          if (i === 1) {
            getGory(element.id).then((res) => {
              if (res.data.brotherCategory.length > 6) {
                this.brotherCategory1 = res.data.brotherCategory.splice(0, 6)
              } else {
                this.brotherCategory1 = res.data.brotherCategory
              }
              // console.log(this.brotherCategory1)
              this.getTypeList1(res.data.currentCategory.id)
            })
          }
          if (i === 2) {
            getGory(element.id).then((res) => {
              if (res.data.brotherCategory.length > 5) {
                this.brotherCategory2 = res.data.brotherCategory.splice(0, 5)
              } else {
                this.brotherCategory2 = res.data.brotherCategory
              }
              // console.log(this.brotherCategory2)
              this.getTypeList2(res.data.currentCategory.id)
            })
          }
          if (i === 3) {
            getGory(element.id).then((res) => {
              if (res.data.brotherCategory.length > 5) {
                this.brotherCategory3 = res.data.brotherCategory.splice(0, 5)
              } else {
                this.brotherCategory3 = res.data.brotherCategory
              }
              // console.log(this.brotherCategory3)
              this.getTypeList3(res.data.currentCategory.id)
            })
          }
        }
        //   this.sidebarList = {
        //     ...res.data
        //   }
        //   if (this.sidebarList.categoryList.length) {
        //     this.sidebar = this.sidebarList.categoryList[0].id
        //     this.getUiGory(this.sidebarList.categoryList[0].id)
        //   }
        //   this.currentCategory = {
        //     ...res.data.currentCategory
        //   }
        //   this.currentCategoryName = res.data.currentCategory.name
        //   this.goryList = [...res.data.currentSubCategory]
      })
    },
    getTypeList0(id) {
      this.data = {
        categoryId: id,
        page: 1,
        size: 5,
      }
      getTypeList(this.data).then((res) => {
        this.goodsList0 = res.data.goodsList
        console.log(res)
      })
    },
    getTypeList1(id) {
      this.data = {
        categoryId: id,
        page: 1,
        size: 8,
      }
      getTypeList(this.data).then((res) => {
        this.goodsList1 = res.data.goodsList
        console.log(res)
      })
    },
    getTypeList2(id) {
      this.data = {
        categoryId: id,
        page: 1,
        size: 4,
      }
      getTypeList(this.data).then((res) => {
        this.goodsList2 = res.data.goodsList
        console.log(res)
      })
    },
    getTypeList3(id) {
      this.data = {
        categoryId: id,
        page: 1,
        size: 3,
      }
      getTypeList(this.data).then((res) => {
        this.goodsList3 = res.data.goodsList
        console.log(res)
      })
    },
    goSupplier() {
      window.open('http://jclt.cafewallet.cn/')
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
    mouseenterEv() {
      console.log(this.userInfo)
      if (!this.userInfo || !this.userInfo.token) {
        this.isLogin = false
        return
      }
      this.isLogin = true

      // this.getCartList()
    },
    navToMain() {
      this.select = 'main'
      this.$router.push({
        path: '/base/main',
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
  },
}
</script>
<style lang="scss" scoped>
.home {
  .new-user {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 1200px;
    height: 288.2px;
    margin: 0 auto;
    cursor: pointer;
    z-index: 2;
  }

  .first-dialog {
    /deep/ .el-dialog {
      background: transparent;
    }

    .first-box {
      margin: 0 auto;
      width: 480px;
      height: 510px;
      background: url('../assets/images/home/first.png');
      background-size: 480px 510px;
      padding-top: 108px;
      padding-left: 80px;
      padding-right: 80px;

      .first-big-title {
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.2px;
        margin-bottom: 34px;
        text-align: center;
      }

      .first-row {
        margin-top: 0.5px;
        height: 99.5px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .first-price {
          margin-left: 10px;
          width: 85px;
          height: 36px;
          font-size: 29px;
          color: #fe5845;
          letter-spacing: 0;
          text-align: center;
          line-height: 36px;
        }

        .first-center {
          margin-left: 10px;
          width: 110px;

          .first-title {
            font-size: 14px;
            color: #424242;
            letter-spacing: 0;
            line-height: 14px;
          }

          .first-msg {
            margin-top: 6px;
            font-size: 12px;
            color: #424242;
            letter-spacing: 0;
            line-height: 12px;
          }

          .first-date {
            margin-top: 10px;
            opacity: 0.5;
            font-size: 10px;
            color: #424242;
            letter-spacing: 0;
            line-height: 14px;
          }
        }

        .first-button {
          margin-left: 15px;
          width: 66px;
          height: 30px;
          background-image: linear-gradient(90deg, #fde58b 0%, #f8d268 100%);
          border-radius: 8px;
          font-size: 14px;
          color: #78470c;
          letter-spacing: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }
      }
    }

    .first-close {
      width: 40px;
      height: 40px;
      margin: 0 auto;
      cursor: pointer;
    }
  }

  .head {
    position: relative;
    background-color: #f6f6f6;

    .head-search {
      height: 80px;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 14px;

      .cursor {
        cursor: pointer;
      }

      /deep/ .anticon-search {
        margin-right: 12px;
      }

      a {
        color: #fff;
      }

      .web-btn {
        display: flex;
        position: relative;

        /deep/ .ant-dropdown-menu-item {
          text-align: center;
        }

        /deep/ .ant-dropdown {
          left: 0 !important;
        }
      }

      .line {
        margin: 0 12px;
      }
    }

    //   background-image: url('../assets/images/home_bg.png');
    //   background-repeat: no-repeat;
    //   background-size: cover;
    /deep/ .ant-carousel .slick-initialized .slick-slide {
      position: relative;
    }

    .head-text {
      position: absolute;
      z-index: 3;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .head-top {
      position: absolute;
      left: 0;
      right: 0;
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      z-index: 3;
    }

    .nav {
      list-style-type: none;
      display: flex;
      justify-content: space-between;
      width: 666px;

      li {
        color: #fff;
        height: 80px;
        line-height: 80px;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }

  .main {
    //   width: 1200px;
    //   margin: 0 auto;
    .middle-box {
      height: 448px;
      background: #f7f7f7;
      box-sizing: border-box;

      .base {
        width: 1200px;
        margin: 0 auto;
        padding-top: 50px;
        height: 390px;
        display: flex;
        flex-direction: row;

        .title {
          cursor: pointer;
          width: 130px;
          margin-top: 16px;
          margin-left: 19.4px;
          display: flex;
          flex-direction: row;
          align-items: center;

          div {
            font-size: 26px;
            color: #424242;
            letter-spacing: 0;
            line-height: 26px;
            font-weight: bolder;
          }

          img {
            margin-left: 10px;
            width: 16px;
            height: 16px;
          }
        }

        .new {
          width: 289px;
          height: 100%;
          background: url('../assets/images/home/hot.png');
          background-color: #fff;
          background-size: 289px 100%;

          .card {
            margin-top: 28px;

            img {
              width: 130px;
              height: 130px;
              margin: 0 auto;
            }

            /deep/ .el-carousel__item {
              display: grid;
            }

            /deep/ .el-carousel__item h3 {
              color: #475669;
              font-size: 14px;
              opacity: 0.75;
              line-height: 200px;
              margin: 0;
            }

            /deep/ .el-carousel__item:nth-child(2n) {
              background-color: #fff;
            }

            /deep/ .el-carousel__item:nth-child(2n + 1) {
              background-color: #fff;
            }
          }

          .bottom {
            width: 200px;
            margin: 24px auto 0;

            .bottom-title {
              width: 200px;
              font-size: 16px;
              color: #424242;
              letter-spacing: 0;
              text-align: center;
              line-height: 16px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: bolder;
            }

            .msg {
              margin-top: 16px;
              font-size: 12px;
              color: #a6a6a6;
              letter-spacing: 0;
              text-align: center;
              line-height: 16px;
              cursor: pointer;
            }

            .price {
              margin-top: 26px;
              font-size: 16px;
              color: #fe5845;
              letter-spacing: 0;
              text-align: center;
              line-height: 17px;
            }
          }
        }

        .hot {
          width: 320px;
          height: 100%;
          background: #ffffff;
          margin-left: 10.4px;
          margin-right: 10px;

          .info {
            margin-top: 20px;

            .row {
              padding: 0 20px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              padding-bottom: 12px;

              img {
                width: 78px;
                height: 78px;
              }

              .right-box {
                width: 190px;

                .right-title {
                  font-size: 14px;
                  color: #424242;
                  letter-spacing: 0;
                  line-height: 16px;
                }

                .right-price {
                  margin-top: 22px;
                  font-size: 16px;
                  color: #fe5845;
                  letter-spacing: 0;
                  line-height: 22px;
                }
              }
            }
          }
        }

        .coupon {
          width: 570px;
          height: 100%;
          background: url('../assets/images/home/coupon.png');
          background-size: 570px 100%;
          cursor: pointer;
        }
      }
    }

    .main-title {
      position: absolute;
      left: 0;
      top: 50px;
    }

    .main-text {
      position: absolute;
      top: 79px;
      left: 238px;
      font-size: 16px;
      color: #8b8b8b;
    }

    .main-box {
      // height: 400px;
      // background-color: #fff;
      position: relative;
      width: 1200px;
      margin: 0 auto;
      // margin-bottom: 60px;

      // &:nth-child(2n+1) {
      //   background-color: #f7f7f7;
      // }
    }

    .more {
      position: absolute;
      right: 0;
      cursor: pointer;
      z-index: 2;
      font-size: 14px;
      color: #8b8b8b;
      top: 64px;
    }

    .jiudian {
      /deep/ .ant-tabs-ink-bar {
        background-color: #ffa233;
      }

      /deep/ .ant-tabs-nav-scroll {
        height: 55.46px;

        .ant-tabs-nav {
          height: 55.46px;
          width: 100%;

          & > div {
            position: absolute;
            left: 430px;
          }
        }
      }

      /deep/ .ant-tabs-nav .ant-tabs-tab {
        //   padding-left: 0;
        //   padding-right: 0;
        padding: 16px 0;
        font-size: 16px;
        color: #606266;
      }

      /deep/ .ant-tabs-bar {
        border: none;
        margin-bottom: 24px;
      }

      /deep/ .ant-tabs-nav .ant-tabs-tab-active,
      /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
        color: #ffa233;
        font-weight: normal;
      }

      // .shicai-content {
      //   display: flex;
      //   justify-content: space-between;
      // }

      .jiudian-box {
        width: 1000px;
        min-height: 260px;
        display: flex;

        .jiudian-item {
          width: 182px;
          padding: 16px 10px;
          height: 260px;
          text-align: center;
          cursor: pointer;
          background: #ffffff;
          border: 1px solid #efefef;
          margin-left: 20px;

          &:hover {
            img {
              transform: scale(1.2);
            }
          }

          & > div {
            height: 205px;
            margin-bottom: 12px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              transition: all 0.3s;
            }
          }

          h5 {
            width: 165px;
            font-size: 14px;
            color: #424242;
            letter-spacing: 0;
            text-align: center;
            line-height: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        //.jiudian-item:nth-child(n + 2) {
        //  border-left: none;
        //}
      }

      .jiudian-content {
        .jiudian-text {
          position: absolute;
          top: 24px;
          width: 100%;

          div {
            width: 100%;
            text-align: center;
          }

          .jiudian-text-bt {
            font-family: PingFangSC-Semibold;
            font-size: 22px;
            color: #ffffff;
            letter-spacing: 0;
            line-height: 22px;
          }

          .jiudian-text-content {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #ffffff;
            letter-spacing: 0;
            line-height: 16px;
            margin-top: 8px;
          }
        }
      }
    }

    .shicai {
      /deep/ .ant-tabs-nav-scroll {
        height: 55.46px;

        .ant-tabs-nav {
          height: 55.46px;
          width: 100%;

          & > div {
            position: absolute;
            left: 430px;
          }
        }
      }

      /deep/ .ant-tabs-nav .ant-tabs-tab {
        //   padding-left: 0;
        //   padding-right: 0;
        padding: 16px 0;
        font-size: 16px;
        color: #606266;
      }

      /deep/ .ant-tabs-bar {
        border: none;
        margin-bottom: 24px;
      }

      /deep/ .ant-tabs-nav .ant-tabs-tab-active,
      /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
        color: #337af9;
        font-weight: normal;
      }

      // .shicai-content {
      //   display: flex;
      //   justify-content: space-between;
      // }

      .shicai-box {
        min-height: 486px;
        display: flex;
        flex-wrap: wrap;

        .shicai-item {
          width: 202px;
          padding: 16px 10px 0 10px;
          height: 243px;
          background-color: #fff;
          text-align: center;
          cursor: pointer;

          &:hover {
            img {
              transform: scale(1.2);
            }
          }

          & > div {
            height: 188px;
            margin-bottom: 12px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              transition: all 0.3s;
            }
          }

          h5 {
            font-size: 14px;
            color: #424242;
            line-height: 16px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .youpin {
      /deep/ .ant-tabs-nav-scroll {
        height: 55.46px;

        .ant-tabs-nav {
          height: 55.46px;
          width: 100%;

          & > div {
            position: absolute;
            left: 430px;
          }
        }
      }

      // /deep/ .ant-tabs-top .ant-tabs-ink-bar-animated {
      //   display: none !important;
      // }
      /deep/ .ant-tabs-ink-bar {
        background-color: #fe5845;
      }

      /deep/ .ant-tabs-nav .ant-tabs-tab {
        //   padding-left: 0;
        //   padding-right: 0;
        padding: 16px 0;
        font-size: 16px;
        position: relative;
        color: #606266;

        //   &:after {
        //     content: '';
        //     position: absolute;
        //     height: 15px;
        //     width: 1px;
        //     background-color: #606266;
        //     top: 16px;
        //     right: -20px;
        //     transform: rotate(20deg);
        //   }

        //   &:last-child:after {
        //     display: none;
        //   }
      }

      /deep/ .ant-tabs-bar {
        border: none;
        margin-bottom: 24px;
      }

      /deep/ .ant-tabs-nav .ant-tabs-tab-active,
      /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
        color: #fe5845;
        font-weight: normal;
      }

      .youpin-box {
        min-height: 390px;
        display: flex;
        justify-content: space-between;

        .youpin-item {
          width: 290px;
          // padding: 16px 10px 0 10px;
          height: 390px;
          background-color: #fff;
          text-align: center;
          cursor: pointer;
          border: 1px solid #efefef;

          &:hover {
            img {
              transform: scale(1.2);
            }
          }

          & > div {
            height: 290px;
            margin-bottom: 40px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              transition: all 0.3s;
            }
          }

          h5 {
            font-size: 14px;
            color: #424242;
            line-height: 16px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .lvxing {
      /deep/ .ant-tabs-nav-scroll {
        height: 55.46px;

        .ant-tabs-nav {
          height: 55.46px;
          width: 100%;

          & > div {
            position: absolute;
            left: 430px;
          }
        }
      }

      // /deep/ .ant-tabs-top .ant-tabs-ink-bar-animated {
      //   display: none !important;
      // }

      /deep/ .ant-tabs-ink-bar {
        background-color: #00c75d;
      }

      /deep/ .ant-tabs-nav .ant-tabs-tab {
        //   padding-left: 0;
        //   padding-right: 0;
        padding: 16px 0;
        font-size: 16px;
        color: #fff;

        //   &:after {
        //     content: '';
        //     position: absolute;
        //     height: 15px;
        //     width: 1px;
        //     background-color: #606266;
        //     top: 16px;
        //     right: -20px;
        //     transform: rotate(20deg);
        //   }

        //   &:last-child:after {
        //     display: none;
        //   }
      }

      /deep/ .ant-tabs-bar {
        border: none;
        margin-bottom: 24px;
      }

      /deep/ .ant-tabs-nav .ant-tabs-tab-active,
      /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
        //   color: #28B2A5;
        color: #00c75d;
        font-weight: normal;
      }

      .lvxing-box {
        min-height: 390px;
        display: flex;
        justify-content: space-between;

        .lvxing-item {
          width: 386px;
          // padding: 16px 10px 0 10px;
          height: 390px;
          background-color: #fff;
          text-align: center;
          cursor: pointer;

          &:hover {
            img {
              transform: scale(1.2);
            }
          }

          & > div {
            height: 290px;
            margin-bottom: 40px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              transition: all 0.3s;
            }
          }

          h5 {
            font-size: 14px;
            color: #424242;
            line-height: 16px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .jiudian {
    padding-top: 44px;
    //   padding-bottom: 50px;
    padding-bottom: 113px;
  }

  #a2 {
    // background-image: url(/img/bg_shicai.31b33889.png);
    background-image: url('../assets/images/home/bg_shicai.jpg');
    background-repeat: no-repeat;
    // background-size: 1440px 598px;
    background-size: contain;
    background-position: center bottom;
    /* height: 602px; */
    background-color: #f0f0f8;
  }

  .shicai {
    padding-top: 44px;
    //   padding-bottom: 50px;
    padding-bottom: 113px;
  }

  .youpin {
    padding-top: 40px;
  }

  #a4 {
    background-image: url('../assets/images/bg_lvxing.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-color: #f6f6f6;
  }

  .lvxing {
    padding-top: 45px;
    padding-bottom: 48px;
  }
}
</style>
