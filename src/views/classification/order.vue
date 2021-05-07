<template>
  <div class="detail" v-if="orderInfo">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="填写订单信息">
      </a-tab-pane>
    </a-tabs>
    <div slot="content" class="contentBox">
      <p class="desc">收货地址</p>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in list" :key="index">
          <address-card style="cursor: pointer" @editAddress="editAddress" @selectedAdress="selectedAdress"
                        v-if="index < showIndex" :selectId="submitInfo.addressId" @delectAddress="onDelete(item.id)"
                        :address="item"></address-card>
        </el-col>
      </el-row>
    </div>
    <div class="flex-between">
      <el-button size="small" @click="showAll" v-if="list.length >4 && showIndex !=list.length">显示全部</el-button>
      <div v-else></div>
      <el-button class="add-address" size="small" type="text" plain @click="addAdress">+新增地址</el-button>
    </div>
    <p class="desc">备注信息</p>
    <el-input type="textarea" class="input-bottom" :rows="4" placeholder="请输入内容"
              v-model="submitInfo.message"></el-input>
    <p class="desc">商品信息</p>
    <div class="checked-list">
      <setOrderItem style="cursor: pointer" v-for="(item, index) in orderInfo.checkedGoodsList" :key="index"
                    @goDetails="goDetails(item)" :order="item"></setOrderItem>
    </div>
    <p class="desc">优惠券</p>
    <el-row :gutter="20" v-if="couponListUi.length > 0" class="input-bottom">
      <el-col :span="6" v-for="(item,index) in couponListUi" :key="index">
        <coupon :my="false" :couponId="submitInfo.couponId" :coupinItem="item"
                @changeCouponId="changeCouponId"></coupon>
      </el-col>
    </el-row>
    <a-empty description="暂无数据" class="no-data" v-else></a-empty>
    <p class="desc">金额明细</p>
    <div style="height: 1px;background: #424242;"></div>
    <div class="money-item">
      <div class="name">商品件数：</div>
      <span class="val-style">{{ orderInfo.orderCount }}件</span>
    </div>
    <div class="money-item">
      <div class="name"> 商品总价：</div>
      <span class="val-style">¥{{ orderInfo.goodsTotalPrice }}</span>
    </div>
    <div class="money-item">
      <div class="name">优惠券抵扣：</div>
      <span class="val-style">-¥{{ orderInfo.couponPrice }}</span>
    </div>
    <div class="money-item">
      <div class="name"> 运费：</div>
      <span class="val-style">¥{{ orderInfo.freightPrice }}</span>
    </div>
    <div class="money-item">
      <div class="name">应付总额：</div>
      <span class=" val-style red-color">¥{{ totalPrice }}</span>
    </div>
    <div class="submit-btn">
      <el-button class="button" type="warning" @click="onSubmit">提交订单</el-button>
    </div>
    <el-dialog :title="addressInfo.id === 0 ? '新增收货地址':'修改收货地址'" :visible.sync="dialogVisible" width="61%"
               :before-close="handleClose">
      <!-- <info-card subtitle="新增收货地址"> -->
      <div class="contentBox">
        <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="收货人">
            <a-input placeholder="请输入" v-model="addressInfo.name"
                     v-decorator="['user', { rules: [{ required: true, message: '请输入收货人' }] }]"/>
          </a-form-item>
          <a-form-item label="手机号">
            <a-input placeholder="请输入" type="number" max-length="11" v-model="addressInfo.mobile"
                     v-decorator="['phone', { rules: [{ required: true, message: '请输入手机号' }] }]"/>
          </a-form-item>
          <a-form-item label="所在区域">
            <!-- <a-select placeholder="省/市" v-decorator="['province', { rules: [{ required: true, message: '请选择省份/直辖市' }] }]" style="width: 120px;margin-right:15px" @change="onChange1">
              <a-select-option v-for="(item,index) in areaList.province_list" :key="index" :value="value1">
                {{ item }}
              </a-select-option>
            </a-select> -->
            <el-select v-model="value1" class="addresss-inpit" size="small" placeholder="请选择省/直辖市" @change="onChange1">
              <el-option v-for="item in areaList.province_list" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value2" class="addresss-inpit" size="small" placeholder="请选择市/区" @change="onChange2">
              <el-option v-for="item in areaList.city_list" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value3" class="addresss-inpit" size="small" placeholder="请选择县/街道" @change="onChange3">
              <el-option v-for="item in areaList.county_list" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </a-form-item>
          <a-form-item label="详细地址">
            <a-input placeholder="请输入" v-model="addressInfo.address"
                     v-decorator="['fullAddress', { rules: [{ required: true, message: '请输入详细地址' }] }]"/>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 8, offset: 3 }">
            <a-checkbox v-model="addressInfo.isDefault" v-decorator="['agreement', { valuePropName: 'checked' }]">
              设为默认地址
            </a-checkbox>
          </a-form-item>
        </a-form>
      </div>
      <!-- </info-card> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import coupon from '@/comments/coupon'
// import infoCard from '@/comments/infoCard'

import addressCard from '@/comments/addressCard'
import setOrderItem from '@/comments/setOrderItem'

import {
  cartCheckout,
  orderSubmit,
  addressList,
  couponSelectlist,
  regionList,
  addressSave,
  addressDelete
} from '@/api/index'

export default {
  components: {
    addressCard,
    setOrderItem,
    coupon
    // infoCard,
  },
  data() {
    return {
      areaListData: {
        province_list: [],
        city_list: [],
        county_list: []
      },
      addressInfo: {
        id: this.$route.query.id || 0, // 地址id,新建时传0,编辑时传收货地址id
        name: '', // 收货人
        mobile: null, // 电话
        provinceId: '', // 省份id
        cityId: '', // 城市id
        areaId: '', // 区域id
        address: '', // 详细地址
        isDefault: true
      },
      areaList: {
        province_list: [],
        city_list: [],
        county_list: []
      },
      value1: '',
      value2: '',
      value3: '',
      dialogVisible: false,
      couponListUi: [],
      coupondataInfo: {
        status: 0,
        page: 1,
        size: 100
      },
      showIndex: 4,
      list: [],
      hasAddress: false,
      value: '',
      orderInfo: null,
      submitInfo: {
        cartId: this.$route.query.cartId || 0,
        addressId: 0,
        couponId: 0,
        message: '',
        grouponRulesId: 0,
        grouponLinkId: 0
      },
      cartCheckoutData: {
        cartId: this.$route.query.cartId || 0, // 购物车id	是	[string]	0	查看
        addressId: sessionStorage.getItem('addressId') || 0, //	地址id	是	[string]	0	查看
        couponId: sessionStorage.getItem('couponId') || 0, //	优惠id	是	[string]	0	查看
        grouponRulesId: 0 //	优惠规则id
      },
      totalPrice: 0
    }
  },
  created() {
    this.getAreaList(0)

    this.getAddressList()
    if (sessionStorage.getItem('cartId') !== undefined) {
      this.cartCheckoutData.cartId = sessionStorage.getItem('cartId')
    } else if (sessionStorage.getItem('couponId') !== undefined) {
      this.cartCheckoutData.couponId = sessionStorage.getItem('couponId')
    }
    this.getcouponList({
      cartId: this.cartCheckoutData.cartId,
      grouponRulesId: 0
    })
    cartCheckout(this.cartCheckoutData).then((res) => {
      if (res.errno !== 0) {
        return
      }
      this.orderInfo = res.data
      if (this.orderInfo.addressId !== 0) {
        this.hasAddress = true
      }
      this.totalPrice = this.orderInfo.orderTotalPrice.toFixed(2)
      this.submitInfo.cartId = this.cartCheckoutData.cartId
      this.submitInfo.couponId = res.data.couponId
      this.submitInfo.grouponRulesId = res.data.grouponRulesId
    })
  },
  methods: {
    addAdress() {
      this.dialogVisible = true
      this.addressInfo = {
        id: this.$route.query.id || 0, // 地址id,新建时传0,编辑时传收货地址id
        name: '', // 收货人
        mobile: '', // 电话
        provinceId: '', // 省份id
        cityId: '', // 城市id
        areaId: '', // 区域id
        address: '', // 详细地址
        isDefault: true
      }
    },
    changeCouponId(couponId) {
      this.submitInfo.couponId = couponId
      if (couponId === 0) {
        this.orderInfo.couponPrice = 0
        this.totalPrice = this.orderInfo.orderTotalPrice.toFixed(2)
      } else {
        this.couponListUi.forEach(item => {
          if (item.id === couponId) {
            this.orderInfo.couponPrice = item.valueDesc
            this.totalPrice = (this.orderInfo.orderTotalPrice - this.orderInfo.couponPrice).toFixed(2)
          }
        })
      }
    },
    editAddress(val) {
      console.log(val)
      this.value1 = val.province
      this.value2 = val.city
      this.value3 = val.area
      this.dialogVisible = true
      this.addressInfo = {
        id: val.id, // 地址id,新建时传0,编辑时传收货地址id
        name: val.name, // 收货人
        mobile: val.tel, // 电话
        provinceId: val.provinceId, // 省份id
        cityId: val.cityId, // 城市id
        areaId: val.areaId, // 区域id
        address: val.address, // 详细地址
        isDefault: val.isDefault
      }
    },
    selectedAdress(val) {
      this.cartCheckoutData.addressId = val
      this.orderInfo.addressId = val
      this.submitInfo.addressId = val
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {
        })
    },
    /**
     * 保存收货人地址
     * @param content
     */
    onSave() {
      //  this.addressInfo = {
      //    id: 0, // 地址id,新建时传0,编辑时传收货地址id
      //    name: content.name, // 收货人
      //    mobile: content.tel, // 电话
      //    provinceId: areaProvince, // 省份id
      //    cityId: areaCity, // 城市id
      //    areaId: areaCode, // 区域id
      //    address: content.addressDetail, // 详细地址
      //    isDefault: content.isDefault ? true : 0 // 是否默认
      //  };
      if (this.addressInfo.name === '') {
        this.$message({
          type: 'error',
          message: '请填写收货人'
        })
        return
      }
      if (this.addressInfo.mobile === '') {
        this.$message({
          type: 'error',
          message: '请填写手机号码'
        })
        return
      }
      if (!this.addressInfo.mobile.match(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(16[6])|(17[0,1,3,5-8])|(18[0-9])|(19[8,9]))\d{8}$/)) {
        this.$message({
          type: 'error',
          message: '请正确填写手机号码'
        })
        return
      }
      if (this.addressInfo.provinceId === '' || this.addressInfo.cityId === '' || this.addressInfo.areaId === '') {
        this.$message({
          type: 'error',
          message: '请选择所在区域'
        })
        return
      }
      if (this.addressInfo.address === '') {
        this.$message({
          type: 'error',
          message: '请填写详细地址'
        })
        return
      }
      let astr = '确认新增地址？'
      if (this.addressInfo.id !== 0) {
        astr = '确认修改地址？'
      } else {
        if (this.list.length >= 10) {
          this.$message({
            type: 'error',
            message: '最多创建10个收货地址'
          })
          return
        }
      }
      this.$confirm(astr, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.addressInfo.isDefault ? (this.addressInfo.isDefault = true) : (this.addressInfo.isDefault = 0)
          addressSave(this.addressInfo).then((res) => {
            if (res.errno === 0) {
              this.dialogVisible = false
              this.addressInfo = {
                id: this.$route.query.id || 0, // 地址id,新建时传0,编辑时传收货地址id
                name: '', // 收货人
                mobile: '', // 电话
                provinceId: '', // 省份id
                cityId: '', // 城市id
                areaId: '', // 区域id
                address: '', // 详细地址
                isDefault: true
              }
              this.value1 = ''
              this.value2 = ''
              this.value3 = ''
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.getAddressList()
              this.getAreaList(0)
            } else {
              this.$message({
                type: 'error',
                message: res.errmsg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除'
          })
        })
    },
    onChange1(index) {
      this.addressInfo.provinceId = this.getProid(index)
      this.areaList.county_list = []
      this.areaListData.county_list = []
      this.areaList.city_list = []
      this.areaListData.city_list = []
      this.value2 = ''
      this.value3 = ''
      this.getCityList(this.getProid(index))
    },
    getProid(code) {
      return this.areaListData.province_list[code].id
    },
    getCityid(code) {
      return this.areaListData.city_list[code].id
    },

    onChange2(index) {
      // this.value2 = val
      this.value3 = ''
      this.addressInfo.cityId = this.getCityid(index)
      this.areaList.county_list = []
      this.areaListData.county_list = []
      if (this.addressInfo.cityId === undefined) {
        return
      }
      this.getCountList(this.addressInfo.cityId)
    },
    getCountyid(code) {
      return this.areaListData.county_list[code].id
    },
    onChange3(index) {
      this.addressInfo.areaId = this.getCountyid(index)
      // this.value3 = val
    },

    getAreaList(pid) {
      // 获取省
      regionList(pid).then((res) => {
        res.data.forEach((element, index) => {
          const provinceItem = {
            value: index,
            label: element.name
          }
          if (element.type === 1) {
            this.areaList.province_list.push(provinceItem)

            this.areaListData.province_list.push(element)
          }
        })
      })
    },

    getCityList(pid) {
      // 获取市
      regionList(pid).then((res) => {
        this.areaList.city_list = []
        this.areaListData.city_list = []
        if (res.errno === 0) {
          res.data.forEach((element, index) => {
            const cityItem = {
              value: index,
              label: element.name
            }
            if (element.type === 2) {
              this.areaList.city_list.push(cityItem)
              this.areaListData.city_list.push(element)
            }
          })
        }
      })
    },
    getCountList(pid) {
      // 获取区
      regionList(pid).then((res) => {
        this.areaList.county_list = []
        this.areaListData.county_list = []
        if (res.errno === 0) {
          res.data.forEach((element, index) => {
            const countyItem = {
              value: index,
              label: element.name
            }
            if (element.type === 3) {
              this.areaList.county_list.push(countyItem)
              this.areaListData.county_list.push(element)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.errmsg
          })
        }
      })
    },
    showAll() {
      this.showIndex = this.list.length
    },
    getCoupon(item) {
      // 使用优惠券
      console.log(item)
    },
    getcouponList(data) {
      couponSelectlist(data).then((res) => {
        if (res.errno !== 0) {
          this.$message.error('订单已提交，请查看或继续付款')
          const data = ['myOrders', 0]
          this.$store.commit('SET_PERSON_DATA', data)
          this.$router.push({
            path: '/base/person'
          })
          return
        }
        const couponListArr = []
        res.data.forEach((element, index) => {
          const startStr = element.startTime.replace(/-/g, '/')
          var startDate = new Date(startStr)
          const endStr = element.endTime.replace(/-/g, '/')
          var endDate = new Date(endStr)
          const dataM = '1970-01-01 00:00:00'.replace(/-/g, '/')
          var dataMidel = new Date(dataM)
          var startNum = (startDate - dataMidel) / 1000
          var endNum = (endDate - dataMidel) / 1000
          const couponItem = {
            id: element.id,
            available: index,
            condition: `满${element.min}可用`,
            reason: '时间过期',
            value: index,
            name: element.name,
            startAt: startNum,
            endAt: endNum,
            valueDesc: element.discount,
            unitDesc: '元',
            description: element.desc,
            startStr: element.startTime,
            endStr: element.endTime
          }
          couponListArr.push(couponItem)
        })
        this.couponListUi = couponListArr
      })
    },
    goDetails(value) {
      console.log(value)
      this.$router.push({
        path: '/base/classification/detail',
        query: { id: value.goodsId }
      })
    },
    getAddressList() {
      addressList().then((res) => {
        if (res.errno === 0) {
          this.list = res.data
          this.list.forEach((element, index) => {
            if (index === 0) {
              this.submitInfo.addressId = element.id
            }
            element.address = element.detailedAddress
            element.tel = element.mobile
          })
        } else {
          this.$message({
            type: 'error',
            message: res.errmsg
          })
        }
      })
    },
    handleScrollIndex() {
      this.$route.meta.scrollTop = this.$el.scrollTop
    },
    navToMyCoupon() {
      this.$router.push({
        path: '/selectCoupon',
        query: {
          cartCheckoutData: JSON.stringify(this.cartCheckoutData)
        }
      })
    },
    onSubmit() {
      console.log(this.submitInfo)
      if (this.submitInfo.addressId === 0) {
        this.$alert('请选择收货地址', '提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            return false
          }
        })
        return
      }
      sessionStorage.removeItem('addressId')
      sessionStorage.removeItem('couponId')
      if (this.$route.query.cartId) {
        this.submitInfo.cartId = this.$route.query.cartId
      }
      orderSubmit(this.submitInfo).then((res) => {
        this.$store.commit('SET_CARTCOUNT', 0)
        this.$router.push({
          path: '/base/classification/waitPay',
          query: {
            orderId: res.data.orderId,
            price: this.orderInfo.orderTotalPrice
          }
        })
      })

      // },
    },
    navToaddressManagement() {
      this.$router.push({
        path: '/selectAddress',
        query: {
          cartId: this.$route.query.cartId
        }
      })
    },
    onClickButton() {
      this.$router.push({
        path: '/result'
      })
    },
    onDelete(id) {
      this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          addressDelete(id).then((res) => {
            if (res.errno === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAddressList()
              this.getAreaList(0)
            } else {
              this.$message({
                type: 'error',
                message: res.errmsg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 50px 136px 0;
  box-sizing: border-box;
  width: 1440px;
  margin: 0 auto 0;
  padding-bottom: 159px;

  .input-bottom {
    margin-bottom: 100px;
  }

  .checked-list {
    margin-bottom: 123px;
  }

  .desc {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #424242;
    letter-spacing: 0;
    line-height: 24px;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 100px;

    .add-address {
      color: #66b1ff !important;
      border-color: transparent !important;
      background-color: transparent !important;
    }

    .use-account {
      height: 60px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid #dadada;
      width: 120px;
      border-radius: 6px;
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: #686868;
      letter-spacing: 0;
      line-height: 60px;
      text-align: center;
    }

    .text {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #424242;
      letter-spacing: 0;
      line-height: 50px;
    }

    .num {
      font-family: PingFangSC-Regular;
      font-size: 50px;
      color: #d6be93;
      letter-spacing: 0;
      line-height: 50px;
    }

    .unit {
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: #8b8b8b;
      letter-spacing: 0;
      line-height: 50px;
    }
  }

  .money-item {
    text-align: right;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #424242;
    text-align: right;
    line-height: 20px;
    margin: 10px 0;

    .name {
      display: inline-block;
      width: 200px;
      text-align: right;
      padding-right: 30px;
      box-sizing: border-box;
    }

    .val-style {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #a6a6a6;
      text-align: right;
      line-height: 20px;
      display: inline-block;
      width: 80px;
    }

    .red-color {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #fe5845;
      text-align: right;
      line-height: 20px;
    }
  }

  .submit-btn {
    background-image: linear-gradient(180deg, #f8f8f8 0%, #f7f7f8 100%);
    width: 100%;
    text-align: right;
    margin-top: 100px;
    height: 60px;

    .button {
      height: 60px;
      width: 164px;
      background: #d6be93;
      font-size: 24px;
      color: #ffffff;
      text-align: center;
      line-height: 20px;
      border-radius: 0;
      border-color: #f7f7f8;
    }
  }
}

// ::v-deep .ant-card-bordered {
//   margin-right: 15px;
//   margin-left: 15px;
//   margin-bottom: 30px;
// }
/deep/ .ant-tabs-nav-scroll {
  margin-left: 0;
  padding-left: 0;
}

/deep/ .address-card {
  width: 98%;
}

/deep/ .ant-tabs-bar {
  border-bottom: 1px solid #424242;

  .ant-tabs-nav {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #8b8b8b;
    letter-spacing: 0;
    line-height: 24px;
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #424242;
    letter-spacing: 0;
    line-height: 24px;
  }

  .ant-tabs-ink-bar-animated {
    background-color: #424242;
  }
}
</style>
