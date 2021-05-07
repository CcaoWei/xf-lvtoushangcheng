<template>
  <div class="address-box">
    <info-card subtitle="已保存地址">
      <div slot="content" class="contentBox">
        <p class="desc">您已创建 <span>{{ list.length }}</span> 个收货地址，做多可创建 <span>10</span> 个</p>
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item,index) in list" :key="index">
            <address-card @editAddress="editAddress" @delectAddress="onDelect(item.id)" :address="item"></address-card>
          </el-col>

        </el-row>
        <!-- <div class="card-list">
          <address-card @delectAddress="onDelect(item.id)" :address="item" v-for="(item,index) in list" :key="index"></address-card>
        </div> -->
      </div>
    </info-card>
    <info-card :subtitle="addressInfo.id === 0 ? '新增收货地址':'修改收货地址'">
      <div slot="content" class="contentBox">
        <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="收货人">
            <a-input placeholder="请输入" v-model="addressInfo.name" v-decorator="['user', { rules: [{ required: true, message: '请输入收货人' }] }]" />
          </a-form-item>
          <a-form-item label="手机号">
            <a-input placeholder="请输入" max-length="11" v-model="addressInfo.mobile" v-decorator="['phone', { rules: [{ required: true, message: '请输入手机号' }] }]" />
          </a-form-item>
          <a-form-item label="所在区域">
            <!-- <a-select placeholder="省/市" v-decorator="['province', { rules: [{ required: true, message: '请选择省份/直辖市' }] }]" style="width: 120px;margin-right:15px" @change="onChange1">
              <a-select-option v-for="(item,index) in areaList.province_list" :key="index" :value="value1">
                {{ item }}
              </a-select-option>
            </a-select> -->
            <el-select v-model="value1" class="addresss-inpit" size="small" placeholder="请选择省/直辖市" @change="onChange1">
              <el-option v-for="item in areaList.province_list" :key="item.value" :label="item.label" :value="item.value">
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
            <!-- <a-select placeholder="市/区" v-decorator="['city', { rules: [{ required: true, message: '请选择市/区' }] }]" style="width: 120px;margin-right:15px" @change="onChange2">
              <a-select-option v-for="(item,index) in areaList.city_list" :key="index" :value="value2">
                {{ item }}
              </a-select-option>
            </a-select> -->
            <!-- <a-select placeholder="县城" v-decorator="['county', { rules: [{ required: true, message: '请选择县/街道' }] }]" style="width: 120px;margin-right:15px" @change="onChange3">
              <a-select-option v-for="(item,index)  in areaList.county_list" :key="index" :value="value3">
                {{ item }}
              </a-select-option>
            </a-select> -->
          </a-form-item>
          <a-form-item label="详细地址">
            <a-input placeholder="请输入" v-model="addressInfo.address" v-decorator="['fullAddress', { rules: [{ required: true, message: '请输入详细地址' }] }]" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 8, offset: 3 }">
            <a-checkbox v-model="addressInfo.isDefault" v-decorator="['agreement', { valuePropName: 'checked' }]">
              设为默认地址
            </a-checkbox>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button class="sub-btn" html-type="submit" @click="onSave">
              保存
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </info-card>
  </div>
</template>
<script>
import infoCard from '@/comments/infoCard'
import dottedLine from '@/comments/dottedLine'
import addressCard from '@/comments/addressCard'
import { addressList, addressSave, regionList, addressDelete } from '@/api/index'
// addressDetail
export default {
  components: {
    infoCard,
    dottedLine,
    addressCard,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      list: [],
      areaList: {
        province_list: [],
        city_list: [],
        county_list: [],
      },
      areaListData: {
        province_list: [],
        city_list: [],
        county_list: [],
      },
      searchResult: [],
      addressInfo: {
        id: this.$route.query.id || 0, // 地址id,新建时传0,编辑时传收货地址id
        name: '', // 收货人
        mobile: '', // 电话
        provinceId: '', // 省份id
        cityId: '', // 城市id
        areaId: '', // 区域id
        address: '', // 详细地址
        isDefault: true,
      },
      showType: false,
      value1: '',
      value2: '',
      value3: '',
      uiAddressInfo: '',
    }
  },
  mounted() {
    this.getAddressList()
    this.getAreaList(0)
  },
  methods: {
    editAddress(val) {
      console.log(val)
      this.value1 = val.province
      this.value2 = val.city
      this.value3 = val.area
      this.addressInfo = {
        id: val.id, // 地址id,新建时传0,编辑时传收货地址id
        name: val.name, // 收货人
        mobile: val.tel, // 电话
        provinceId: val.provinceId, // 省份id
        cityId: val.cityId, // 城市id
        areaId: val.areaId, // 区域id
        address: val.address, // 详细地址
        isDefault: val.isDefault,
      }
    },
    getAddressList() {
      addressList().then((res) => {
        if (res.errno === 0) {
          this.list = res.data
          this.list.forEach((element) => {
            element.address = element.detailedAddress
            element.tel = element.mobile
          })
        } else {
          this.$message({
            type: 'error',
            message: res.errmsg,
          })
        }
      })
    },
    onConfirm() {
      if (
        this.value1 === '' ||
        this.value2 === '' ||
        this.value3 === '' ||
        this.value1 === '' ||
        this.value2 === '' ||
        this.value3 === ''
      ) {
        this.$message({
          type: 'error',
          message: '请选择正确的地址',
        })
        return
      }

      this.uiAddressInfo = `${this.value1}/${this.value2}/${this.value3}`
      this.showType = false
    },
    getProid(code) {
      return this.areaListData.province_list[code].id
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
    getCityid(code) {
      console.log(code)
      return this.areaListData.city_list[code].id
    },

    onChange2(index) {
      // this.value2 = val
      console.log(index)
      this.value3 = ''
      this.addressInfo.cityId = this.getCityid(index)
      this.areaList.county_list = []
      this.areaListData.county_list = []
      if (this.addressInfo.cityId === undefined) {
        return
      }
      console.log(this.addressInfo.cityId)
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
            label: element.name,
          }
          if (element.type === 1) {
            this.areaList.province_list.push(provinceItem)

            this.areaListData.province_list.push(element)
          }
        })
      })
    },
    getCityList(pid) {
      console.log(pid)
      // 获取市
      regionList(pid).then((res) => {
        this.areaList.city_list = []
        this.areaListData.city_list = []
        if (res.errno === 0) {
          res.data.forEach((element, index) => {
            const cityItem = {
              value: index,
              label: element.name,
            }
            if (element.type === 2) {
              this.areaList.city_list.push(cityItem)
              this.areaListData.city_list.push(element)
            }
          })
        }
        console.log(this.areaList)
      })
    },
    getCountList(pid) {
      // 获取区
      console.log(pid)
      regionList(pid).then((res) => {
        this.areaList.county_list = []
        this.areaListData.county_list = []
        if (res.errno === 0) {
          res.data.forEach((element, index) => {
            const countyItem = {
              value: index,
              label: element.name,
            }
            if (element.type === 3) {
              this.areaList.county_list.push(countyItem)
              this.areaListData.county_list.push(element)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.errmsg,
          })
        }
      })
    },
    onDelect(id) {
      this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          addressDelete(id).then((res) => {
            if (res.errno === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.getAddressList()
              this.getAreaList(0)
            } else {
              this.$message({
                type: 'error',
                message: res.errmsg,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除',
          })
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

      console.log(this.addressInfo)
      if (this.addressInfo.name === '') {
        this.$message({
          type: 'error',
          message: '请填写收货人',
        })
        return
      }
      if (this.addressInfo.mobile === '') {
        this.$message({
          type: 'error',
          message: '请填写手机号码',
        })
        return
      }
      if (!this.addressInfo.mobile.match(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(16[6])|(17[0,1,3,5-8])|(18[0-9])|(19[8,9]))\d{8}$/)) {
        this.$message({
          type: 'error',
          message: '请正确填写手机号码',
        })
        return
      }
      if (this.addressInfo.provinceId === '' || this.addressInfo.cityId === '' || this.addressInfo.areaId === '') {
        this.$message({
          type: 'error',
          message: '请选择所在区域',
        })
        return
      }
      if (this.addressInfo.address === '') {
        this.$message({
          type: 'error',
          message: '请填写详细地址',
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
            message: '最多创建10个收货地址',
          })
          return
        }
      }
      this.$confirm(astr, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.addressInfo.isDefault ? (this.addressInfo.isDefault = true) : (this.addressInfo.isDefault = 0)
          addressSave(this.addressInfo).then((res) => {
            if (res.errno === 0) {
              this.addressInfo = {
                id: this.$route.query.id || 0, // 地址id,新建时传0,编辑时传收货地址id
                name: '', // 收货人
                mobile: '', // 电话
                provinceId: '', // 省份id
                cityId: '', // 城市id
                areaId: '', // 区域id
                address: '', // 详细地址
                isDefault: true,
              }
              this.value1 = ''
              this.value2 = ''
              this.value3 = ''
              this.$message({
                type: 'success',
                message: '保存成功',
              })
              this.getAddressList()
              this.getAreaList(0)
            } else {
              this.$message({
                type: 'error',
                message: res.errmsg,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除',
          })
        })
    },

    handleSelectChange(value) {
      console.log(value)
    },
  },
}
</script>
<style lang="scss" scoped>
.ant-btn:hover,
.ant-btn:focus {
  /* color: #40a9ff; */
  /* background-color: #fff; */
  border-color: #d6be93;
}
.address-box {
  .desc {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #8b8b8b;
    span {
      font-size: 20px;
      color: #fe5c4a;
    }
  }
  .card-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .sub-btn {
    background: #d6be93;
    width: 120px;
    height: 36px;
    color: #fff;
    line-height: 36px;
    text-align: center;
  }
  .addresss-inpit {
    width: 160px;
    margin-right: 5px;
  }
}
/deep/ .info-card:last-child {
  margin-bottom: 0;
}
</style>