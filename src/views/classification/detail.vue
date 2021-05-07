<template>
  <div>
    <!-- <div class="detail-title"></div> -->
    <div class="detail" v-if="detailInfo">
      <!-- <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="商品详情">
      </a-tab-pane>
    </a-tabs> -->
      <!-- <div class="tabs-item">
      全部分类/商店用品/洗漱用品/ <span>两面针全新牙膏新品</span>
    </div> -->
      <div class="carousel-infomation">
        <div class="block">
          <a-carousel arrows dots-class="slick-dots slick-thumb">
            <a slot="customPaging" slot-scope="props">
              <img
                class="img-content"
                :src="getImgUrl(props.i)"
                :style="{ border: selectIndex === props.i ? '2px solid #D6BE93' : '' }"
                @click="selectImg(props.i)"
              />
            </a>
            <div v-for="(img, index) in detailInfo.info.gallery" :key="index">
              <img :src="img" />
            </div>
          </a-carousel>
        </div>

        <div class="block infomation" v-if="detailInfo">
          <div class="infomation-bt">{{ detailInfo.info.name }}</div>

          <div class="price-area">
            <div class="row" style="padding-top: 17px" v-if="userType === 2">
              <div class="title-flex">
                <div>现</div>
                <div>价</div>
              </div>
              <div class="infomation-price">¥{{ selectProductPrice }}</div>
              <div class="infomation-btprice" style="text-decoration:line-through">[¥{{ selectCounterPrice }}]</div>
            </div>
            <div class="row" style="padding-top: 17px" v-if="userType !== 2">
              <div class="title-flex">
                <div>原</div>
                <div>价</div>
              </div>
              <div class="infomation-btprice">¥{{ selectCounterPrice }}</div>
            </div>
            <div class="row" style="margin-top: 13px">
              <div class="title">京猫均价</div>
              <!--            <div class="infomation-price">¥{{ detailInfo.info.jmAvgPrice }}</div>-->
              <div class="infomation-price">¥{{ selectJmAvgPrice }}</div>
            </div>
            <div class="row" style="margin-top: 12px" v-if="userType === 2">
              <div class="title" style="margin-top: 8px;">集团现价</div>
              <span class="price-icon">¥</span>
              <div class="infomation-new-price">
                {{ selectGroupPrice }}
              </div>
            </div>
            <div class="row" style="margin-top: 12px" v-if="userType !== 2">
              <div class="title-flex" style="margin-top:6px">
                <div>现</div>
                <div>价</div>
              </div>
              <span class="price-icon">¥</span>
              <div class="infomation-new-price">
                {{ selectProductPrice }}
              </div>
            </div>
          </div>
          <!-- <div class="infomation-tags">
          <div class="tags-item" v-for="attr in detailInfo.attribute" :key="attr.id">{{ attr.value }}</div>
        </div> -->
          <div class="divide-line"></div>
          <div class="infomation-color">
            <div v-for="(item, x) in specificationList" :key="x">
              <div class="row">
                <div class="color-text">
                  {{ item.name }}
                </div>
                <span
                  class="color-item cursor"
                  :class="info.selected ? 'selected-item' : ''"
                  v-for="(info, idx) in item.valueList"
                  :key="idx"
                  @click="selectSpecifications(item, info)"
                >
                  {{ info.value }}
                </span>
              </div>
            </div>
          </div>
          <div class="infomation-num infomation-color" style="padding-left:8px">
            <div class="color-text">数量</div>
            <el-input-number
              size="small"
              v-if="userType !== 2"
              v-model="addData.number"
              @change="handleChange"
              :min="1"
              label="描述文字"
            ></el-input-number>
            <el-input-number
              size="small"
              v-if="userType === 2"
              v-model="addData.number"
              @change="handleChange"
              :min="100"
              label="描述文字"
            ></el-input-number>
          </div>
          <div class="infomation-btn">
            <a-button class="btn-color-red" size="large" @click="nowToBuy">立即购买</a-button>
            <a-button class="btn-color-gery" size="large" @click="setAddCart">加入购物车</a-button>
            <div class="collection-box " @click="collectionEvent">
              <i class="el-icon-star-on cursor" v-if="detailInfo.userHasCollect === 1"></i>
              <i class="el-icon-star-off cursor" v-if="detailInfo.userHasCollect === 0"></i>
              <div class="collection-text cursor">收藏商品</div>
            </div>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="产品参数" name="first">
          <div class="commodity-parameter">
            <!-- <div class="commodity-title">商品参数</div> -->
            <div class="size" v-for="item in detailInfo.attribute" :key="item.attribute">
              <div class="size-text">{{ item.attribute }}</div>
              <div class="size-value">{{ item.value }}</div>
            </div>
            <div class="com-info" v-html="detailInfo.info.detail"></div>
            <el-divider content-position="center">常见问题</el-divider>
            <div class="quest-box">
              <div v-for="(questionItem, m) in detailInfo.issue" :key="m">
                <div class="quest-bt" v-html="questionItem.question"></div>
                <div class="quest-text" v-html="questionItem.answer"></div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品评价" name="second">
          <div v-if="detailInfo.comment.count > 0">
            <discuss :comment="comment" v-for="comment in detailInfo.comment.data" :key="comment.id"></discuss>
            <a-pagination :default-current="1" :total="detailInfo.comment.count" />
          </div>
          <a-empty description="暂无数据" v-else />
        </el-tab-pane>
      </el-tabs>

      <!-- <a-tabs default-active-key="2">
        <a-tab-pane key="2" tab="产品参数">
          <div class="commodity-parameter">
            <div class="commodity-title">商品参数</div>
            <div class="size" v-for="item in detailInfo.attribute" :key="item.attribute">
              <div class="size-text">{{ item.attribute }}</div>
              <div class="size-value">{{ item.value }}</div>
            </div>
            <div class="com-info" v-html="detailInfo.info.detail"></div>
            <el-divider content-position="center">常见问题</el-divider>
            <div class="quest-box">
              <div v-for="(questionItem,m) in detailInfo.issue" :key="m">
                <div class="quest-bt" v-html="questionItem.question"></div>
                <div class="quest-text" v-html="questionItem.answer"></div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="1" tab="商品评价">
          <discuss :comment="comment" v-for="comment in detailInfo.comment.data" :key="comment.id"></discuss>
          <a-pagination :default-current="1" :total="detailInfo.comment.count" />
        </a-tab-pane>
      </a-tabs> -->
      <div class="desc m-t-130" v-if="goodsRelatedList.length>0">猜你喜欢</div>
      <div class="line" v-if="goodsRelatedList.length>0">
        <div class="short-line"></div>
        <div class="long-line"></div>
      </div>
      <a-row>
        <a-col span="5" v-for="(itemInfo, index) in goodsRelatedList" :key="index" @click="goLikeGood(itemInfo)">
          <productItem :good="itemInfo"></productItem>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import discuss from '@/comments/discuss'
import productItem from '@/comments/productItem'
import { typeDetail, goodsRelated, collectAddordelete, addCart, cartFastadd, cartGoodscount } from '@/api/index'
import { mapGetters } from 'vuex'

export default {
  components: { discuss, productItem },
  data() {
    return {
      value: 2,
      detailInfo: null,
      collection: false,
      specificationList: null,
      selectProductPrice: null,
      selectJmAvgPrice: null,
      selectGroupPrice: null,
      selectCounterPrice: null,
      goodsRelatedList: null,
      goodsList: null,
      activeName: 'first',
      isLogin: false,
      addData: {
        goodsId: 1181066, // 商品id
        number: 1, // 商品数量
        productId: 522 // 商品销售id
      },
      userType: 1,
      selectIndex: 0,
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    console.log(this.$store)
    if (this.$store.state.user.token != null) {
      this.isLogin = true
    }

    if (this.userInfo) {
      this.userType = this.userInfo.userInfo.userType
    }
  },
  mounted() {
    this.getDetailInfo(this.$route.query.id)
  },
  methods: {
    selectImg(i) {
      this.selectIndex = i
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getCartCount() {
      if (localStorage.getItem('Access-Token')) {
        cartGoodscount().then(res => {
          console.log(res)
          this.$store.commit('SET_CARTCOUNT', res.data)
          localStorage.setItem('cartCount', res.data)
        })
      }
    },
    setAddCart() {
      // 加入购物车

      if (!this.isLogin) {
        this.$router.push('/login')

        return
      }
      if (this.isCheckedAllSpec()) {
        this.$alert('请选择完整规格', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            return false
          }
        })

        return
      }
      // 根据选中的规格，判断是否有对应的sku信息
      const checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey())
      console.log(checkedProductArray)
      if (!checkedProductArray || checkedProductArray.length <= 0) {
        //  找不到对应的product信息，提示没有库存

        this.$alert('没有库存', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            return false
          }
        })
      }

      const checkedProduct = checkedProductArray[0]
      console.log(checkedProductArray)
      if (checkedProduct.number <= 0) {
        this.$alert('没有库存', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
        return false
      }
      this.addData.goodsId = this.detailInfo.info.id
      this.addData.productId = checkedProduct.id

      addCart(this.addData).then(res => {
        this.getCartCount()
        this.$message({
          message: '成功加入购物车',
          type: 'success'
        })
        this.isFirst = false
      })
    },
    nowToBuy() {
      //  立即购买
      if (!this.isLogin) {
        this.$router.push('/login')
        return
      }
      console.log('立即购买操作  并且 show = false')
      if (this.isCheckedAllSpec()) {
        this.$alert('请选择完整规格', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
        return
      }
      //  根据选中的规格，判断是否有对应的sku信息
      const checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey())
      if (!checkedProductArray || checkedProductArray.length <= 0) {
        //  找不到对应的product信息，提示没有库存

        //  Dialog.alert({
        //    title: '提示',
        //    message: '没有库存'
        //  }).then(() => {
        //    return false
        //    //  on close
        //  })
        this.$alert('没有库存', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }

      const checkedProduct = checkedProductArray[0]
      if (checkedProduct.number <= 0) {
        //  Dialog.alert({
        //    title: '提示',
        //    message: '没有库存'
        //  }).then(() => {
        //    return false
        //    //  on close
        //  })
        this.$alert('没有库存', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            return false
          }
        })

        return false
      }
      sessionStorage.removeItem('couponId')
      this.addData.goodsId = this.detailInfo.info.id
      this.addData.productId = checkedProduct.id
      cartFastadd(this.addData).then(res => {
        this.$router.push({
          path: 'order',
          query: {
            cartId: res.data.data
          }
        })
        sessionStorage.setItem('cartId', res.data)
      })
    },
    collectionEvent() {
      const data = {
        type: 0, //  type为0
        valueId: this.detailInfo.info.id //  商品id
      }
      if (!this.isLogin) {
        this.$router.push('/login')

        return
      }
      console.log(this.detailInfo)

      collectAddordelete(data).then(res => {
        if (res.errno === 0) {
          if (res.data.type === 'add') {
            this.$message({
              message: '收藏成功',
              type: 'success'
            })
            this.detailInfo.userHasCollect = 1
          } else {
            this.detailInfo.userHasCollect = 0

            this.$message({
              message: '已取消收藏',
              type: 'success'
            })
          }
        } else {
          //   Dialog.alert({
          //     title: '提示',
          //     message: res.data.errmsg
          //   })
          this.$alert(res.data.errmsg, '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        }
      })
    },
    getDetailInfo(id) {
      typeDetail(id).then(res => {
        this.detailInfo = res.data
        res.data.userHasCollect === 1 ? (this.collection = true) : (this.collection = false)
        this.specificationList = res.data.specificationList
        console.log(res)

        this.specificationList.forEach(element => {
          element.selected = false

          element.valueList.forEach(item => {
            item.selected = false
          })
        })
        this.specificationList.forEach(item => {
          item.selected = true
          item.valueList[0].selected = true
        })
        this.selectProductPrice = res.data.productList[0].price
        this.selectJmAvgPrice = res.data.productList[0].jmAvgPrice
        this.selectGroupPrice = res.data.productList[0].groupPrice
        this.selectCounterPrice = res.data.productList[0].counterPrice

        console.log(this.specificationList)
      })
      goodsRelated(this.$route.query.id).then(res => {
        console.log(res)
        this.goodsRelatedList = res.data.goodsList
      })
    },
    isCheckedAllSpec() {
      // 判断规格是否选择完整
      console.log(this.specificationList)
      for (const iterator of this.specificationList) {
        if (!iterator.selected) {
          return true
        }
      }
      return false
    },
    getImgUrl(i) {
      return this.detailInfo.info.gallery[i]
    },
    selectSpecifications(far, child) {
      //   选择产品规格
      this.specificationList.forEach(item => {
        if (far.name === item.name) {
          item.selected = true

          item.valueList.forEach(value => {
            value.selected = false

            if (value.id === child.id) {
              value.selected = true
              //    value = Object.assign({}, value, { selected: !value.selected });
              //    this.$set(this.specificationList[i].valueList, idx, value);
            }
          })
        }
      })
      this.specificationList = JSON.parse(JSON.stringify(this.specificationList))
      //   根据选中的规格，判断是否有对应的sku信息
      const checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey())

      if (checkedProductArray.length !== 0) {
        this.selectProductPrice = checkedProductArray[0].price
        this.selectJmAvgPrice = checkedProductArray[0].jmAvgPrice
        this.selectGroupPrice = checkedProductArray[0].groupPrice
        this.selectCounterPrice = checkedProductArray[0].counterPrice
      }
    },
    //    获取选中的产品（根据规格）
    getCheckedProductItem(key) {
      return this.detailInfo.productList.filter(function(v) {
        if (v.specifications.toString() === key.toString()) {
          return true
        } else {
          return false
        }
      })
    },
    //   获取选中的规格信息
    getCheckedSpecValue() {
      const checkedValues = []
      const _specificationList = this.specificationList
      for (let i = 0; i < _specificationList.length; i++) {
        const _checkedObj = {
          name: _specificationList[i].name,
          valueId: 0,
          valueText: ''
        }
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].selected) {
            _checkedObj.valueId = _specificationList[i].valueList[j].id
            _checkedObj.valueText = _specificationList[i].valueList[j].value
          }
        }
        checkedValues.push(_checkedObj)
      }

      return checkedValues
    },

    getCheckedSpecKey() {
      const checkedValue = this.getCheckedSpecValue().map(function(v) {
        console.log(v)
        return v.valueText
      })
      console.log(checkedValue)
      return checkedValue
    },
    handleChange(value) {
      console.log(value)
    },
    goLikeGood(item) {
      this.getDetailInfo(item.id)
      var timer = setInterval(function() {
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        this.isTop = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 30)
    }
  }
}
</script>
<style lang="scss" scoped>
.desc{
  font-size: 24px;
  color: #424242;
  letter-spacing: 0;
  line-height: 24px;
  margin-bottom: 20px;
  margin-left: 15px;
  margin-right: 15px;
}
.line {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 2px;

  .middle-line {
    height: 3px;
    width: 183px;
    background: #424242;
  }

  .short-line {
    height: 3px;
    width: 96px;
    background: #424242;
  }

  .long-line {
    height: 1px;
    width: 100%;
    background: #424242;
  }
}
.detail-title {
  background: #fafafa;
  height: 40px;
  width: 100%;
}
.detail {
  height: 100%;
  background: #fff;
  // padding: 50px 136px 0;
  padding: 11px 136px 0;
  box-sizing: border-box;
  width: 1440px;
  margin: 0 auto 0;

  /deep/ .ant-tabs-bar {
    border-bottom: 1px solid #d2d2d2;

    .ant-tabs-nav {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #8b8b8b;
      letter-spacing: 0;
      line-height: 24px;
    }

    .ant-tabs-nav .ant-tabs-tab-active {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #d6be93;
      letter-spacing: 0;
      line-height: 24px;
    }

    .ant-tabs-ink-bar-animated {
      background-color: #424242;
    }
  }

  .tabs-item {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #a6a6a6;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 50px;

    span {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #000;
      letter-spacing: 0;
      line-height: 24px;
    }
  }

  .carousel-infomation {
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    margin-bottom: 50px;

    .block {
      width: 350px;
      float: left;

      /deep/ .ant-carousel .slick-slide img {
        margin: 0;
      }

      /deep/ .ant-carousel {
        .slick-thumb {
          position: inherit;
          height: 54px;

          li {
            height: 54px;
            width: 54px;
            border-radius: 3px;
            overflow: hidden;
            margin: 0 5px;
          }
        }
      }
    }

    .infomation {
      box-sizing: border-box;
      padding-left: 31px;
      width: 90%;
      padding-bottom: 40px;

      .infomation-bt {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #424242;
        letter-spacing: 0;
        line-height: 28px;
        font-weight: bold;
        width: 100%;
        height: 56px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: 9px;
      }
      .infomation-btprice {
        font-size: 12px;
        color: #8b8b8b;
        letter-spacing: 0;
        line-height: 12px;
        margin-right: 27px;
      }

      .price-area {
        background: rgba(237, 212, 162, 0.1);
        width: 100%;
        height: 120px;
        margin-top: 6px;

        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 8px;

          .title {
            font-size: 12px;
            color: #a6a6a6;
            letter-spacing: 0;
            text-align: center;
            line-height: 12px;
            margin-right: 13px;
            width: 51px;
          }

          .title-flex {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: #a6a6a6;
            letter-spacing: 0;
            text-align: center;
            line-height: 12px;
            margin-right: 13px;
            width: 51px;
          }

          .infomation-price {
            font-size: 12px;
            color: #8b8b8b;
            letter-spacing: 0;
            line-height: 12px;
            margin-right: 27px;
          }

          .infomation-bt {
            font-size: 12px;
            color: #cacaca;
            letter-spacing: 0;
            line-height: 20px;
            text-decoration: line-through;
          }

          .price-icon {
            font-size: 18px;
            color: #fe5845;
            margin-top: 3px;
            margin-right: 2px;
          }
          .infomation-new-price {
            font-size: 24px;
            color: #fe5845;
            letter-spacing: 0;
            line-height: 36px;
          }
        }
      }
      .divide-line {
        width: 100%;
        height: 1px;
        opacity: 0.5;
        border: 1px dashed #a6a6a6;
        margin-top: 12px;
      }

      .infomation-tags {
        display: flex;
        justify-content: flex-start;
        margin-top: 12.5px;

        .tags-item {
          //    opacity: 0.1;
          background: #f9f9f9;
          border-radius: 6px;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #5f5f5f;
          text-align: center;
          line-height: 20px;
          padding: 0 30px;
          line-height: 40px;
          margin-right: 12px;
        }
      }

      .infomation-color {
        margin-top: 16px;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #a6a6a6;
        letter-spacing: 0;
        line-height: 42px;
        padding-left: 8px;

        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 12px;
        }

        .color-text {
          width: 80px;
          font-size: 12px;
          color: #cacaca;
          text-align: center;
          line-height: 12px;
          // margin-right: 10px;
          // letter-spacing: 15px;
          text-align-last: justify;
          margin-right: 10px;
        }

        .color-item {
          float: left;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid #e3e3e3;
          height: 34px;
          padding: 0 25px;
          margin-right: 8px;
          font-size: 12px;
          color: #424242;
          text-align: center;
          line-height: 34px;
        }

        .selected-item {
          background: rgba(237, 212, 162, 0.1);
          border: 1px solid #d6be93;
          color: #d6be93;
        }
      }

      .infomation-size {
        display: flex;
        justify-content: flex-start;
        margin-top: 40px;
      }

      .infomation-num {
        display: flex;
        margin-top: 23px;
        justify-content: flex-start;
        align-items: center;
      }

      .infomation-btn {
        display: flex;
        margin-top: 70px;
        justify-content: flex-start;
        align-items: center;

        .btn-color-red {
          background: #d6be93;
          font-family: PingFangSC-Semibold;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 0;
          line-height: 46px;
          border: 0;
          width: 164px;
          height: 46px;
          margin-right: 12px;
        }

        .btn-color-gery {
          font-family: PingFangSC-Semibold;
          font-size: 20px;
          color: #424242;
          letter-spacing: 0;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid #dadada;
          line-height: 46px;
          width: 164px;
          height: 46px;
          margin-right: 12px;
        }
      }
    }

    /deep/ .ant-carousel .slick-dots {
      height: auto;
      display: flex !important;
    }

    /deep/ .ant-carousel .slick-slide img {
      border: 5px solid #fff;
      display: block;
      margin: 0 auto;
      height: 350px;
      width: 350px;
    }

    /deep/ .ant-carousel .slick-thumb {
      bottom: -18px;
    }

    /deep/ .ant-carousel .slick-thumb li {
      width: 60px;
      height: 45px;
    }

    /deep/ .ant-carousel .slick-thumb li img {
      width: 100%;
      height: 100%;
      /*filter: grayscale(100%);*/
    }

    /deep/ .ant-carousel .slick-thumb li .slick-active img {
      filter: grayscale(0%);
    }
  }

  .collection-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid #fe5845;
    width: 97px;
    height: 46px;
    align-items: center;

    .collection {
      width: 36px;
      height: 36px;
      margin-right: 12px;
    }

    .collection-text {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #fe5845;
      letter-spacing: 0;
      line-height: 46px;
    }
  }

  .commodity-parameter {
    padding-bottom: 10rem;
    // border-top: 10px solid #f4f4f4;
    padding-top: 10px;

    .commodity-title {
      text-align: left;
      padding-left: 10px;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .com-info {
      width: 100%;
      height: auto;

      /deep/ p {
        width: 100%;
        height: auto;

        img {
          width: 100%;
          height: auto;
        }
      }
    }

    .size {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin: 10px auto;
      background: #eee;
      height: 3rem;
      box-sizing: border-box;
      padding-left: 10px;

      .size-text {
        color: #998;
        font-size: 1.3rem;
        min-width: 6rem;
        text-align: left;
      }

      .size-value {
        color: #000;
        font-size: 1.7rem;
        margin-left: 5rem;
      }
    }
  }

  .el-icon-star-on {
    color: red;
    font-size: 21px;
    margin-right: 5px;
  }

  .el-icon-star-off {
    color: red;
    font-size: 21px;
    margin-right: 5px;
  }

  .quest-box {
    width: 100%;
    background: #f8f8f8;
    margin: 10px auto;
    padding: 10px 0;
  }

  .quest-text {
    text-align: left;
    font-size: 1.4rem;
    width: 90%;
    margin: 10px auto;
    line-height: 1.6rem;
    white-space: pre-wrap;
    color: #aaaaaa;
  }

  .quest-bt {
    text-align: center;
    font-size: 1.6rem;
  }

  /deep/ .ant-pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .ant-pagination-item-active {
      background: #d6be93;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 2.62px;

      a {
        font-family: PingFangSC-Regular;
        font-size: 18.38px;
        color: #ffffff;
        line-height: 28.88px;
      }
    }
  }

  /deep/ .ant-col-6 {
    display: flex;
    justify-content: center;
    //    margin: 0 15px 30px;
  }

  ::v-deep .ant-card-bordered {
    // margin-right: 15px;
    // margin-left: 15px;
    margin-bottom: 30px;
  }

  /deep/ .ant-tabs-nav-scroll {
    margin-left: 0;
    padding-left: 0;
  }
}
::v-deep .ant-row {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
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
.img-content {
  background-image: linear-gradient(180deg, #f8f8f8 0%, #f7f7f8 100%);
  border-radius: 6px;
}
::v-deep .el-tabs__item {
  padding: 0 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  position: relative;
}
::v-deep .el-tabs__item.is-active {
  color: #d6be93;
}
::v-deep .el-tabs__active-bar {
  background-color: #d6be93;
}
// /deep/ .el-tabs__item {
//   padding: 0 20px;
//   height: 40px;
//   box-sizing: border-box;
//   display: inline-block;
//   list-style: none;
//   font-weight: 500;
//   position: relative;
//   font-family: PingFangSC-Regular;
//   font-size: 16px;
//   color: #8b8b8b;
//   letter-spacing: 0;
//   line-height: 24px;
// }
// /deep/ .el-tabs__item.is-active {
//   color: #d6be93;
// }
// /deep/ .el-tabs__active-bar {
//   background-color: #d6be93;
// }
/deep/ .el-tabs__content {
  min-height: 200px;
  padding: 10px;
}
</style>
