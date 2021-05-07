<template>
  <div class="content">
    <div v-if="list.cartList.length > 0">
      <div class="title">购物车-全部商品</div>
      <div class="line">
        <div class="middle-line"></div>
        <div class="long-line"></div>
      </div>
      <div class="goods-box">
        <div class="goods-item" v-for="(item,index) in list.cartList" :key="index">
          <div class="check-area">
            <a-checkbox :checked="item.checked" @change="selectChange(item)" class="check-input"></a-checkbox>
            <!--          <input type="checkbox" class="check-box check-input">-->
          </div>
          <img :src="item.picUrl" width="150" height="150" style="cursor: pointer" @click="goDetail(item)">
          <div class="goods-info">
            <div class="goods-title" @click="goDetail(item)">{{ item.goodsName }}</div>
            <div class="goods-attrs">
              <div class="attr-item  m-l-12" v-for="attr in item.specifications" :key="attr">{{ attr }}</div>
            </div>
          </div>
          <div class="stepper-area">
            <el-input-number @change="onChange(item)" class="stepper" v-model="item.number" :min="1" :max="9999"></el-input-number>
          </div>
          <div class="goods-price">
            <div class="price-text">¥{{ item.price }}</div>
          </div>
          <div class="btn-area" @click="delectItem(item)">
            <div class="btn-delete">删除</div>
          </div>
        </div>
      </div>

      <div class="line m-t-50">
        <div class="long-line"></div>
      </div>
      <div class="sub-area">
        <div class="left-area">
          <!--        <input type="checkbox" class="check-box">-->
          <a-checkbox class="m-l-20" :checked="selectedAll" @click="isSelect"></a-checkbox>
          <div class="wide-text cursor">全选</div>
          <div class="common-text cursor" @click="onDeleted">删除</div>
        </div>
        <div class="right-area">
          <div class="common-text">合计：</div>
          <div class="sub-price">¥{{ totleNum | getTotleNum }}</div>
          <div class="sub-btn cursor" @click="onSubmit">去结算</div>
        </div>
      </div>
    </div>
    <div class="no-data-cart" v-else>
      <i class="el-icon-shopping-cart-full"></i>

      <div>
        <div class="no-cart-text">您的购物车暂时没有商品，快去逛一逛吧</div>
        <div class="now-go-index" @click="$router.push({
          path: '/home',
        })">逛一逛></div>
      </div>
    </div>

    <div class="title m-t-130" v-if="goodsRelatedList.length>0">猜你喜欢</div>
    <div class="line" v-if="goodsRelatedList.length>0">
      <div class="short-line"></div>
      <div class="long-line"></div>
    </div>
    <a-row class="goods-box">
      <a-col span="5" v-for="(itemInfo,index) in goodsRelatedList" :key="index" @click="$router.push({path:'/base/classification/detail',query:{id:itemInfo.id}})" :itemInfo="itemInfo">
        <productItem :good="itemInfo"></productItem>
      </a-col>
    </a-row>
  </div>

  <!-- <a-empty description="暂无数据" class="no-data" v-else /> -->
</template>

<script>
import productItem from '@/comments/productItem'
import { cartList, cartChecked, cartDelete, cartUpdate, goodsRelated, cartGoodscount } from '@/api/index' //  获取购物车列表

export default {
  components: {
    productItem,
  },
  data() {
    return {
      cardAreaH: '',

      checked: true,
      num: 1,
      isLogin: false,
      selectedAll: false,
      totleNum: 0,
      isCheckedData: {
        productIds: [], //  productid.销售id ,全选时传多个销售id,逗号隔开
        isChecked: 0, //  是否选中.0:取消 1.选中
      },
      numberData: {
        goodsId: '', // 商品id
        id: '', // 购物车商品id
        number: '', // 商品变更后数量
        productId: '', // 销售id
      },
      list: {
        cartList: [],
      },
      goodsRelatedList: [],
    }
  },
  computed: {},
  created() {
    this.getCartList()
    if (this.$store.state.user.Token != null && localStorage.getItem('token') != null) {
      this.isLogin = true
    }
  },
  mounted() {
    var h = document.documentElement.clientHeight || document.body.clientHeight
    this.cardAreaH = h - 108 - 173 + 'px'
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        path: '/base/classification/detail',
        query: { id: item.goodsId },
      })
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
    onChange(cellItem) {
      this.numberData.number = cellItem.number
      this.numberData.id = cellItem.id
      this.numberData.goodsId = cellItem.goodsId
      this.numberData.productId = cellItem.productId
      cartUpdate(this.numberData).then((res) => {
        this.getCartList()
        this.getStepInfo()
        this.getCartCount()
      })
    },
    selectChange(cellItem) {
      this.isCheckedData.productIds.push(cellItem.productId)
      cellItem.checked = !cellItem.checked
      cellItem.checked ? (this.isCheckedData.isChecked = 1) : (this.isCheckedData.isChecked = 0)
      cartChecked(this.isCheckedData).then((res) => {
        this.isCheckedData = {
          productIds: [], //  productid.销售id ,全选时传多个销售id,逗号隔开
          isChecked: 0, //  是否选中.0:取消 1.选中
        }
        this.getCartList()
        this.getStepInfo()
      })
    },
    delectItem(item) {
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
    onDeleted() {
      const data = {
        productIds: [],
      }
      this.list.cartList.forEach((element) => {
        if (element.checked) {
          data.productIds.push(element.productId)
        }
      })
      if (data.productIds.length === 0) {
        //  Dialog.alert({
        //    title: '提示',
        //    message: '请先选择要删除的商品'
        //  })
        this.$alert('请先选择要删除的商品', '提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            return true
          },
        })
        return
      }
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          cartDelete(data).then((res) => {
            this.getCartCount()
            this.getCartList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    getCartList() {
      cartList().then((res) => {
        if (res.errno === 0) {
          this.list = res.data
          if (res.data.cartList.length <= 0) {
            this.getTotle()
          } else {
            goodsRelated(res.data.cartList[0].goodsId).then((res) => {
              if (res.errno === 0) {
                this.goodsRelatedList = res.data.goodsList
              } else {
                //    Dialog.alert({
                //      title: '提示',
                //      message: res.data.errmsg
                //    })
              }
            })
          }
          this.getStepInfo()
          this.getTotle()
          if (this.setSelectAll(res.data)) {
            this.selectedAll = true
          }
        }
      })
    },
    setSelectAll(list) {
      if (list.cartList) {
        for (let index = 0; index < list.cartList.length; index++) {
          const element = list.cartList[index]
          if (!element.checked) {
            return false
          }
        }
        return true
      } else {
        return true
      }
    },
    onSubmit() {
      if (this.noChecked()) {
        this.$message({
          message: '您还没有选择宝贝哦',
          type: 'warning',
        })
        return false
      }
      sessionStorage.removeItem('couponId')
      sessionStorage.setItem('cartId', 0)
      this.$router.push({
        path: '/base/classification/order',
      })
    },
    navToIndex() {
      this.$router.push({
        path: '/index',
      })
    },
    noChecked() {
      //  未选择商品
      for (const key of this.list.cartList) {
        if (key.checked) {
          return false
        }
      }
      return true
    },
    isNoChecked() {
      //  是否有未选中的
      for (const key of this.list.cartList) {
        if (!key.checked) {
          return false
        }
      }
      return true
    },
    isSelect() {
      console.log(this.selectedAll)
      this.selectedAll = !this.selectedAll
      console.log(this.selectedAll)
      if (this.list.cartList.length === 0) return

      this.isCheckedData.productIds = []
      this.list.cartList.forEach((element) => {
        //  element.isChecked = !this.selectedAll;
        this.isCheckedData.productIds.push(element.productId)
        this.isCheckedData.isChecked = this.selectedAll
      })
      cartChecked(this.isCheckedData).then((res) => {
        if (res.errno === 0) {
          this.getCartList()
          this.isCheckedData.productIds = []
        } else {
          this.$alert(res.errmsg, '提示', {
            confirmButtonText: '确定',
            callback: (action) => {},
          })
        }
      })
    },
    getTotle() {
      this.totleNum = 0
      this.list.cartList.forEach((element) => {
        if (element.checked) {
          this.totleNum += element.number * parseFloat(element.price)
        }
      })
    },
    getStepInfo(deleted) {
      if (this.isNoChecked()) {
        this.selectedAll = true
      } else {
        this.selectedAll = false
      }

      this.getTotle()
      if (deleted === 'deleted') {
        this.getCartList()
      }
    },
    navToLogin() {
      this.$router.push('/login')
    },
  },
  filters: {
    getTotleNum(value) {
      const val = value.toFixed(2)
      return val
    },
  },
}
</script>
<style lang="scss" scoped>
.content {
  width: 1200px;
  margin: 130px auto 0;
  box-sizing: border-box;
  min-height: 100vh;

  .m-t-130 {
    margin-top: 130px;
  }

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

  .m-t-50 {
    margin-top: 50px;
  }

  .line {
    margin-left: 15px;
    margin-right: 15px;

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

  .m-l-20 {
    margin-left: 20px;
  }

  .check-box {
    width: 24px;
    height: 24px;
    border-radius: 3px;
    position: relative;
  }

  .goods-box {
    margin-top: 50px;

    .goods-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 15px 30px;
      background: rgba(237, 212, 162, 0.1);
      border: 1px solid #d6be93;
      border-radius: 6px;
      position: relative;

      .check-area {
        height: 220px;
        margin-right: 36px;

        .check-input {
          margin-left: 36px;
          margin-top: 36px;
        }
      }

      .goods-info {
        width: 350px;
        margin-left: 34px;

        .goods-title {
          font-size: 20px;
          color: #424242;
          letter-spacing: 0;
          cursor: pointer;
        }

        .goods-attrs {
          margin-top: 42px;
          display: flex;
          flex-direction: row;
          align-items: center;

          .attr-item {
            width: 80px;
            height: 36px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            background: #ffffff;
            border: 1px solid #cacaca;
            border-radius: 6px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #cacaca;
            text-align: center;
            line-height: 20px;
          }

          .m-l-12 {
            margin-left: 12px;
          }
        }
      }

      .stepper-area {
        height: 220px;

        .stepper {
          margin-top: 40px;
          margin-left: 80px;
          width: 154px;
        }
      }

      .goods-price {
        height: 220px;
        margin-left: 57px;

        .price-text {
          font-family: PingFangSC-Semibold;
          font-size: 20px;
          color: #fe5845;
          letter-spacing: 0;
          line-height: 20px;
          margin-top: 48px;
        }
      }

      .btn-area {
        height: 220px;
        position: absolute;
        right: 20px;

        .btn-delete {
          margin-top: 48px;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #337af9;
          letter-spacing: 0;
          line-height: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .no-data {
    margin: 200px;
  }

  .sub-area {
    margin: 50px 15px 0;
    height: 60px;
    background-image: linear-gradient(180deg, #f8f8f8 0%, #f7f7f8 100%);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .common-text {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #424242;
      letter-spacing: 0;
      line-height: 20px;
    }

    .left-area {
      display: flex;
      flex-direction: row;
      align-items: center;

      .wide-text {
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        color: #424242;
        letter-spacing: 0;
        line-height: 20px;
        margin-left: 10px;
        margin-right: 30px;
      }
    }

    .right-area {
      display: flex;
      flex-direction: row;
      align-items: center;

      .sub-price {
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        color: #fe5845;
        letter-spacing: 0;
        line-height: 24px;
        margin-left: 10px;
        margin-right: 64px;
      }

      .sub-btn {
        width: 140px;
        height: 60px;
        background: #424242;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #ffffff;
        text-align: center;
        line-height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
  /v-deep/ .ant-row {
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
}
.no-data-cart {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon-shopping-cart-full {
    color: #d6be93;
    font-size: 80px;
    margin-right: 10px;
  }
  .no-cart-text {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #424242;
    letter-spacing: 0;
    line-height: 20px;
    margin-bottom: 14px;
  }
  .now-go-index {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #409eff;
    line-height: 16px;
    cursor: pointer;
  }
}
</style>
