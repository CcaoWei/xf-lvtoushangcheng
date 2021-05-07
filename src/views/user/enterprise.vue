<template>
  <div class="enterprise-container">
    <div v-show="!nextShow">
      <el-form ref="enterpriseForm" :model="enterpriseForm" :rules="enterpriseRules" class="enterprise-form" auto-complete="off" label-width="172px">
        <div class="enterprise-box" style="margin-bottom:30px">
          <div style="max-width: 555px;margin-bottom:90px">
            <h5 class="enterprise-title" style="margin-bottom:10px">企业资料填写</h5>
            <p style="line-height:47px;color:#A6A6A6;font-size:14px;margin-bottom:40px">
              尊敬的企业用户，欢迎您注册吉好选商城，请填写您的注册信息。
            </p>
            <el-form-item prop="gsmc" label="公司名称：">
              <div class="enterprise-item">
                <el-input v-model="enterpriseForm.gsmc" name="gsmc" type="text" auto-complete="off" placeholder="请输入公司名称" autocomplete="off" />
              </div>
            </el-form-item>

            <el-form-item prop="tyshxydm" label="统一社会信用代码：">
              <div class="enterprise-item">
                <el-input v-model="enterpriseForm.tyshxydm" name="tyshxydm" type="text" auto-complete="off" placeholder="请输入统一社会信用代码" autocomplete="off" />
              </div>
            </el-form-item>

            <!-- <el-form-item prop="fddbr" label="法定代表人：">
              <div class="enterprise-item">
                <el-input v-model="enterpriseForm.fddbr" name="fddbr" type="text" auto-complete="off" placeholder="请输入法定代表人" autocomplete="off" />
              </div>
            </el-form-item> -->
            <el-form-item prop="scyyzz" label="上传营业执照：">
              <div class="enterprise-item">
                <el-upload class="upload-demo" action="/api/mall_api/wx/storage/upload" :on-preview="handlePreview" :before-upload="handleBefore" :on-remove="handleRemove3" :before-remove="beforeRemove" :multiple="false" :limit="1" :on-exceed="handleExceed" :file-list="enterpriseForm.scyyzz" list-type="picture" :on-success="handleSuccess3" :headers="header">
                  <el-button size="small" class="enterprise-upload">本地上传</el-button>
                </el-upload>
                <div slot="tip" class="el-upload__tip" style="color:#A6A6A6">
                  上传jpg、png格式的图片，文件大小在1.5M内，需看清名称等信息，可参考右图示例图</div>
                <img src="@/assets/images/businessSign/q1.png" style="position:absolute;right:-440px;top:-40px">
              </div>
            </el-form-item>
            <!-- <el-form-item prop="fddbrsfz" label="法定代表人身份证：">
              <div class="enterprise-item">
                <el-upload class="upload-demo" action="/api/mall_api/wx/storage/upload" :on-preview="handlePreview" :before-upload="handleBefore" :on-remove="handleRemove1" :before-remove="beforeRemove" :multiple="false" :limit="1" :on-exceed="handleExceed" :file-list="enterpriseForm.fddbrsfz1" list-type="picture" :on-success="handleSuccess1" :headers="header">
                  <el-button size="small" class="enterprise-upload">本地上传</el-button>
                </el-upload>
                <img src="@/assets/images/businessSign/idCard_z.png" style="position:absolute;right:-320px;top:-20px">
              </div>
              <div class="enterprise-item" style="margin-top:30px;">

                <el-upload class="upload-demo" action="/api/mall_api/wx/storage/upload" :on-preview="handlePreview" :before-upload="handleBefore" :on-remove="handleRemove2" :before-remove="beforeRemove" :multiple="false" :limit="1" :on-exceed="handleExceed" :file-list="enterpriseForm.fddbrsfz2" list-type="picture" :on-success="handleSuccess2" :headers="header">
                  <el-button size="small" class="enterprise-upload">本地上传</el-button>
                  <div slot="tip" class="el-upload__tip" style="color:#A6A6A6">
                    上传jpg、png格式的图片，文件大小在1.5M内，需看清名称等信息，可参考右图示例图</div>
                </el-upload>
                <img src="@/assets/images/businessSign/idCard_f.png" style="position:absolute;right:-320px;top:30px">
              </div>
            </el-form-item> -->
          </div>
          <div style="text-align: center;">
            <el-button :loading="loading" type="primary" class="enterprise-submit" @click.native.prevent="handleNext">
              提交</el-button>
          </div>
        </div>

        <!-- <div class="enterprise-box">
          <div style="max-width: 555px">
            <h5 class="enterprise-title" style="margin-bottom:10px">上传营业执照</h5>
            <p style="line-height:24px;color:#A6A6A6;font-size:12px;margin-bottom:40px">
              证件请上传彩色电子文件，且为正本，文件格式支持jpg、gif、png格式，且不能大于3M
            </p>
            <el-form-item prop="scyyzz" style="margin-left:-172px">
              <div class="enterprise-item">

                <el-upload class="upload-demo" action="/api/mall_api/wx/storage/upload" :on-preview="handlePreview" :before-upload="handleBefore" :on-remove="handleRemove3" :before-remove="beforeRemove" :multiple="false" :limit="1" :on-exceed="handleExceed" :file-list="enterpriseForm.scyyzz" list-type="picture" :on-success="handleSuccess3" :headers="header">
                  <el-button size="small" class="enterprise-upload">本地上传</el-button>
                  <div slot="tip" class="el-upload__tip" style="color:#A6A6A6">
                    上传jpg、png格式的图片，文件大小在1.5M内，需看清名称等信息，可参考右图示例图</div>
                </el-upload>
                <img src="@/assets/images/businessSign/q1.png" style="position:absolute;right:-440px;top:-20px">
              </div>
            </el-form-item>

            <el-form-item prop="szqy" label="所在区域：" style="margin-left:-86px">
              <div class="enterprise-item" style="display: flex;justify-content: space-between;">
                <el-select :popper-append-to-body="false" v-model="select1" placeholder="请选择省份" style="width:31%">
                  <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select :popper-append-to-body="false" v-model="select2" placeholder="请选择城市" style="width:31%">
                  <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select :popper-append-to-body="false" v-model="select3" placeholder="请选择区/县" style="width:31%">
                  <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>

            <el-form-item prop="xxdz" label="详细地址：" style="margin-left:-86px">
              <div class="enterprise-item">
                <el-input v-model="enterpriseForm.xxdz" name="xxdz" type="text" auto-complete="off" placeholder="请输入详细地址" autocomplete="off" />
              </div>
            </el-form-item>

            <el-form-item prop="lxr" label="联系人：" style="margin-left:-86px">
              <div class="enterprise-item">
                <el-input v-model="enterpriseForm.lxr" name="xxdz" type="text" auto-complete="off" placeholder="请输入联系人" autocomplete="off" />
              </div>
            </el-form-item>

            <el-form-item prop="lxdh" label="联系电话：" style="margin-left:-86px">
              <div class="enterprise-item">
                <el-input v-model="enterpriseForm.lxdh" name="xxdz" type="text" auto-complete="off" placeholder="请输入联系电话" autocomplete="off" />
              </div>
            </el-form-item>

          </div>
        </div> -->
        <!-- <div style="text-align: center;">
          <el-button :loading="loading" type="primary" class="enterprise-submit" @click.native.prevent="handleNext">
            提交</el-button>
        </div> -->
      </el-form>
    </div>
    <div v-show="nextShow">
      <div class="success">
        <img src="@/assets/images/coupon_check.png" />
        <h5>您的资料已提交成功，请耐心等待审核</h5>
        <p>如有疑问可咨询客服热线：4006008899</p>
        <el-button type="primary" class="enterprise-submit" @click="goBack">确定</el-button>
      </div>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="热门推荐">
          <a-row>
            <a-col span="5" v-for="(itemInfo, index) in hotGoodsList" :key="index" @click="$router.push({ path: '/base/classification/detail', query: { id: itemInfo.id } })">
              <productItem type="hotRecomment" :good="itemInfo"></productItem>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { regionList, submitData, brandGoodsList } from '@/api/index'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import productItem from '@/comments/productItem'
import storage from 'store'
export default {
  components: { productItem },
  inject: {
    theme: {
      // 函数式组件取值不一样
      default: () => ({}),
    },
  },
  data() {
    // 公司名称
    const validateGsmc = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入公司名称'))
      } else {
        callback()
      }
    }
    const validateTyshxydm = (rule, value, callback) => {
      // console.log(value);
      if (value === '') {
        callback(new Error('请输入统一社会信用代码'))
      } else {
        callback()
      }
    }
    // const validateFddbr = (rule, value, callback) => {
    //   // console.log(value);
    //   if (value === '') {
    //     callback(new Error('请输入法定代表人'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validateSzqy = (rule, value, callback) => {
    //   // console.log(value);
    //   if (value === []) {
    //     callback(new Error('请选择所在区域'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validateXxdz = (rule, value, callback) => {
    //   // console.log(value);
    //   if (value === '') {
    //     callback(new Error('请输入详细地址'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validateLxr = (rule, value, callback) => {
    //   // console.log(value);
    //   if (value === '') {
    //     callback(new Error('请输入联系人'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validateLxdh = (rule, value, callback) => {
    // console.log(value);
    //   if (value === '') {
    //     callback(new Error('请输入联系电话'))
    //   } else {
    //     callback()
    //   }
    // }
    const validateHkyh = (rule, value, callback) => {
      // console.log(value);
      if (value === '') {
        callback(new Error('请输入汇款银行'))
      } else {
        callback()
      }
    }
    const validateHkje = (rule, value, callback) => {
      // console.log(value);
      if (value === '') {
        callback(new Error('请输入汇款金额'))
      } else {
        callback()
      }
    }
    const validateJylsh = (rule, value, callback) => {
      // console.log(value);
      if (value === '') {
        callback(new Error('请输入交易流水号'))
      } else {
        callback()
      }
    }
    return {
      nextShow: false,
      enterpriseForm: {
        gsmc: '', // 公司名称
        tyshxydm: '', // 统一社会信用代码
        fddbr: '', // 法定代表人
        fddbrsfz: '',
        fddbrsfz1: [], // 法定代表人身份证
        fddbrsfz2: [], // 法定代表人身份证
        scyyzz: [], // 上传统一社会信用代码
        szqy: [], // 所在区域
        xxdz: '', // 详细地址,
        lxr: '', // 联系人
        lxdh: '', // 联系电话
      },
      nextForm: {
        hkyh: '', // 汇款银行
        hkje: '', // 汇款金额
        jylsh: '', // 交易流水号
        bz: '', // 备注
        sczzdzhd: [], // 上传转账电子回单
      },
      select1: '',
      options1: [],
      select2: '',
      options2: [],
      select3: '',
      options3: [],
      hotGoodsList: [],
      enterpriseRules: {
        gsmc: [
          {
            // required: true,
            trigger: 'blur',
            validator: validateGsmc,
          },
        ],
        tyshxydm: [
          {
            // required: true,
            trigger: 'blur',
            validator: validateTyshxydm,
          },
        ],
        // fddbr: [
        //   {
        //     // required: true,
        //     trigger: 'blur',
        //     validator: validateFddbr,
        //   },
        // ],
        // szqy: [
        //   {
        //     // required: true,
        //     trigger: 'blur',
        //     validator: validateSzqy,
        //   },
        // ],
        // xxdz: [
        //   {
        //     // required: true,
        //     trigger: 'blur',
        //     validator: validateXxdz,
        //   },
        // ],
        // lxr: [
        //   {
        //     // required: true,
        //     trigger: 'blur',
        //     validator: validateLxr,
        //   },
        // ],
        // lxdh: [
        //   {
        //     // required: true,
        //     trigger: 'blur',
        //     validator: validateLxdh,
        //   },
        // ],
      },
      nextFormRules: {
        hkyh: [
          {
            // required: true,
            trigger: 'blur',
            validator: validateHkyh,
          },
        ],
        hkje: [
          {
            // required: true,
            trigger: 'blur',
            validator: validateHkje,
          },
        ],
        jylsh: [
          {
            // required: true,
            trigger: 'blur',
            validator: validateJylsh,
          },
        ],
      },
      loading: false,
      pic1: '',
      pic2: '',
      pic3: '',
      pic4: '',
      payeeMsgs: {},
    }
  },
  computed: {
    header: function () {
      return {
        'X-Litemall-Token': storage.get(ACCESS_TOKEN),
      }
    },
  },
  watch: {
    select1: function (val, oldVal) {
      this.select2 = ''
      this.options2 = []
      this.select3 = ''
      this.options3 = []
      // console.log('new: %s, old: %s', val, oldVal);
      regionList(val)
        .then((res) => {
          this.options2 = res.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    select2: function (val, oldVal) {
      this.select3 = ''
      this.options3 = []
      // console.log('new: %s, old: %s', val, oldVal);
      regionList(val)
        .then((res) => {
          this.options3 = res.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
  created() {
    this.getGoodsList()
    // 获取省列表
    // regionList('0')
    //   .then((res) => {
    //     this.options1 = res.data
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
    if (this.$route.params.userId) {
      this.theme.active = 1
    } else {
      this.$router.push({ name: 'login' })
    }
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    handleBefore(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 1.5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1.5MB!')
      }
      return isJPG && isLt2M
    },
    handleSuccess1(response, file, fileList) {
      console.log(1111111111111)
      console.log(response)
      if (response.errno === 0) {
        this.pic1 = response.data.url
      } else {
        this.$notify.error({
          title: '错误',
          message: response.errmsg,
        })
      }
      console.log(this.pic1)
      // console.log(file);
      // console.log(fileList);
    },
    handleSuccess2(response, file, fileList) {
      console.log(22222222222222)
      console.log(response)
      if (response.errno === 0) {
        this.pic2 = response.data.url
      } else {
        this.$notify.error({
          title: '错误',
          message: response.errmsg,
        })
      }
      console.log(this.pic2)
      // console.log(file);
      // console.log(fileList);
    },
    handleSuccess3(response, file, fileList) {
      console.log(3333333333333)
      console.log(response)
      if (response.errno === 0) {
        this.pic3 = response.data.url
      } else {
        this.$notify.error({
          title: '错误',
          message: response.errmsg,
        })
      }
      console.log(this.pic3)
      // console.log(file)
      // console.log(fileList)
    },
    handleSuccess4(response, file, fileList) {
      console.log(response)
      if (response.errno === 0) {
        this.pic4 = response.data.url
      } else {
        this.$notify.error({
          title: '错误',
          message: response.errmsg,
        })
      }
      console.log(this.pic3)
      // console.log(file);
      // console.log(fileList);
    },
    handleChange(value) {
      console.log(value)
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList)
      this.pic1 = ''
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList)
      this.pic2 = ''
    },
    handleRemove3(file, fileList) {
      console.log(file, fileList)
      this.pic3 = ''
    },
    handleRemove4(file, fileList) {
      console.log(file, fileList)
      this.pic4 = ''
    },
    handlePreview(file) {
      console.log('aaaaaaa')
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleNext: function () {
      // this.theme.active = 3
      // this.nextShow = true
      this.$refs.enterpriseForm.validate((valid) => {
        if (valid) {
          // if (this.pic1 === '') {
          //   this.$notify.info({
          //     title: '提示',
          //     message: '请上传法定代表人身份证正面',
          //   })
          //   return
          // }
          // if (this.pic2 === '') {
          //   this.$notify.info({
          //     title: '提示',
          //     message: '请上传法定代表人身份证反面',
          //   })
          //   return
          // }
          if (this.pic3 === '') {
            this.$notify.info({
              title: '提示',
              message: '请上传营业执照',
            })
            return
          }
          // if (this.select3 === '') {
          //   this.$notify.info({
          //     title: '提示',
          //     message: '请选择所在区域',
          //   })
          //   return
          // }
          this.handleSubmit()
        }
      })
    },
    handleSubmit() {
      this.loading = true
      // 提交
      const params = {
        userId: this.$route.params.userId,
        companyName: this.enterpriseForm.gsmc, // 公司名称
        creditCode: this.enterpriseForm.tyshxydm, // 统一社会信用代码
        legalUser: this.enterpriseForm.fddbr, // 法定代表人
        identityCardUp: this.pic1, // 身份证正面
        identityCardDown: this.pic2, // 身份证反面
        businessLicense: this.pic3, // 营业执照
        address: this.enterpriseForm.xxdz, // 详细地址
        provinceId: this.select1,
        cityId: this.select2,
        areaId: this.select3,
        linkMan: this.enterpriseForm.lxr, // 联系人
        linkManPhone: this.enterpriseForm.lxdh, // 联系电话
      }
      submitData(params)
        .then((res) => {
          if (res.errno === 0) {
            this.$notify.success({
              title: '提示',
              message: '提交成功',
            })
            // 跳转下一页
            this.theme.active = 3
            this.nextShow = true
          }
        })
        .catch((response) => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    goBack() {
      this.$router.push('/login')
    },
    getGoodsList() {
      const params = {
        isNew: false,
        categoryId: 0,
      }
      brandGoodsList(params).then((res) => {
        this.hotGoodsList = res.data.goodsList
      })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.enterprise-container {
  .el-input__icon {
    line-height: 36px;
  }
  .el-cascader {
    width: 100%;

    .el-cascader__label {
      color: $light_gray;
      line-height: 32px;
    }
  }

  .enterprise-upload {
    background: #ececec;
    border: 1px solid #a6a6a6;
    border-radius: 4px;
  }
  .el-upload__tip {
    margin-top: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #a6a6a6;
    letter-spacing: 0;
    line-height: 24px;
  }

  .el-input {
    // display: inline-block;
    height: 32px;
    // width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0 5px 0 15px;
      color: #454545;
      height: 32px;
      vertical-align: top;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #454545 !important;
      }
    }
  }

  .el-form-item .enterprise-item {
    position: relative;
    // height: 32px;

    .el-input {
      // border: 1px solid rgba(255, 255, 255, 0.1);
      // background: rgba(0, 0, 0, 0.1);
      background: #ffffff;
      border: 1px solid #cacaca;
      border-radius: 4px;
      color: #454545;
    }
  }

  // .el-form-item__content {
  //     height: 32px;
  // }

  .el-form-item__label {
    line-height: 32px;
    color: #424242;
    font-size: 14px;
    // text-align: left;
    font-weight: normal;
    padding-left: 0px;
    padding-right: 16px;
  }

  .enterprise-submit {
    width: 400px;
    height: 56px;
    background: #337af9;
    margin-top: 30px;
    font-size: 20px;
    padding: 13px 20px;
  }

  .top-step {
    margin-bottom: 40px;

    // .el-breadcrumb__item:first-child {
    //     .el-breadcrumb__inner {
    //         color: #409EFF;
    //     }
    // }

    .el-breadcrumb__inner,
    i,
    .el-breadcrumb__inner:hover {
      font-size: 20px;
      color: #409eff;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.enterprise-container {
  height: 100%;
  width: 100%;
  background-color: #fff;
  overflow-y: auto;
  margin: 100px 0;
  .enterprise-box {
    background: #fafbfc;
    border: 1px solid #e3e4e5;
    padding-top: 56px;
    padding-left: 56px;
    padding-bottom: 70px;
    min-width: 1140px;

    //   &>div {
    //     max-width: 555px;
    //   }
  }

  .enterprise-title {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    text-align: justify;
    line-height: 18px;
  }

  .enterprise-tip {
    position: absolute;
    left: 96px;
    top: 196px;
    font-size: 16px;
    color: #424242;
    line-height: 31px;
  }

  .success {
    text-align: center;
    img {
      width: 80px;
      height: 80px;
    }
    h5 {
      font-size: 16px;
      color: #424242;
      letter-spacing: 0;
      text-align: center;
      line-height: 16px;
      margin-top: 16px;
    }
    p {
      margin-top: 10px;
      margin-bottom: 50px;
      font-size: 14px;
      color: #a6a6a6;
      text-align: center;
      line-height: 14px;
    }
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
</style>
