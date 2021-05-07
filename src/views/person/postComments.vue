<template>
  <div class="content">
    <div class="title">发布评论</div>
    <div class="line">
      <div class="middle-line"></div>
      <div class="long-line"></div>
    </div>
    <div class="tabs-item"><span class="nav" @click="navToPersionOrder(0)">个人中心/我的订单</span><span class="nav" @click="navToPersionOrder(4)">/我的评价/待评价/</span><span class="t1">发布评价</span></div>
    <div class="mainBox">
      <div class="goods" v-if="orederInfo">
        <img width="250" :src="orederInfo.picUrl" alt="" />
        <span class="goods-title">{{ orederInfo.goodsName }}</span>
        <div class="specs">
          <div class="specs-item" v-for="(item, index) in orederInfo.specifications" :key="index">{{ item }}</div>
        </div>
        <span class="goods-price">¥{{ orederInfo.price }}</span>
      </div>
      <div class="comments">
        <a-form :form="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="评分" :wrapper-col="{ span: 12, offset: 1 }">
            <el-rate allow-half v-model="submitData.star"></el-rate>
          </a-form-item>
          <a-form-item label="口碑" :wrapper-col="{ span: 12, offset: 1 }">
            <!-- <el-input type="textarea" placeholder="留言经过筛选后，对所有人可见" maxlength="300">
            </el-input> -->
            <a-textarea placeholder="" class="input-area" v-model="submitData.content" :auto-size="{ minRows: 2, maxRows: 6 }" />
          </a-form-item>
          <a-form-item label="晒图" :wrapper-col="{ span: 12, offset: 1 }" v-bind="tailFormItemLayout">
            <a-upload action="/api/mall_api/pc/wx/storage/batchUpload" :headers="loadHeaders" name="files" list-type="picture-card" :file-list="fileList" @preview="handlePreview" @change="handleChange">
              <div v-if="fileList.length < 9">
                <a-icon type="plus" />
                <div class="ant-upload-text">{{ fileList.length + 1 }}/9</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
            <a-button class="sub-btn" html-type="submit" @click="postComments">
              提交评价
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { orderGoods, orderComment } from '@/api/index'
import { mapGetters } from 'vuex'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  components: {},
  data() {
    return {
      loadHeaders: {},
      submitData: {
        orderGoodsId: 132, // 订单中商品id
        content: '', // 评论内容
        star: 0, // 星数
        hasPicture: false,
        picUrls: [], // 图片
      },
      previewVisible: false,
      orederInfo: null,
      previewImage: '',
      textarea: '',
      tailFormItemLayout: {},
      rates: '',
      comments: '',
      fileList: [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  computed: {
    ...mapGetters(['token']),
  },
  created() {
    this.loadHeaders = {
      'Blade-Auth': 'bearer ' + this.token,
    }
    console.log(this.loadHeaders)
  },
  mounted() {
    const data = {
      orderGoodsId: this.$route.query.id,
    }
    orderGoods(data).then((res) => {
      console.log(res.data)
      this.orederInfo = res.data
    })
  },
  methods: {
    postComments() {
      console.log('提交评价')
      if (this.submitData.star === 0) {
        // Toast('请对评价进行打分')
        this.$message.error('请对评价进行打分')
        return
      }
      // return false
      if (this.submitData.content === '' && this.submitData.content.length === 0) {
        // Toast('内容不能为空')
        this.$message.error('内容不能为空')

        return
      }

      this.submitData.orderGoodsId = this.orederInfo.id
      if (this.submitData.picUrls.length > 0) {
        this.submitData.hasPicture = true
      } else {
        this.submitData.hasPicture = false
      }
      orderComment(this.submitData).then((res) => {
        // Toast('评价成功')
        sessionStorage.setItem('hasEvaluate', true)
        this.$router.go(-1)
      })
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      console.log(file)
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ file, fileList }) {
      console.log(file)
      console.log(fileList)
      if (file.response) {
        // this.fileList.push(file.response.data[0])
        console.log(file.response.data[0])
        this.submitData.picUrls.push()
      }
      this.submitData.picUrls = []
      fileList.forEach((element) => {
        if (element.response) {
          this.submitData.picUrls.push(element.response.data[0])
        }
      })
      console.log(this.submitData)
      this.fileList = fileList
    },
    // postComments(e) {
    //   e.preventDefault()
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values)
    //     }
    //   })
    // },
    navToPersionOrder(id) {
      const data = ['myOrders', id]
      this.navToPersion()
      this.$store.commit('SET_PERSON_DATA', data)
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
.input-area {
  min-height: 125px !important;
}
/deep/ .ant-form-item-control {
  height: auto;
}
.content {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  width: 1170px;
  margin: 0 auto;
  .title {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #424242;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 20px;
  }
  .line {
    .middle-line {
      height: 3px;
      width: 97px;
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
  .tabs-item {
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #a6a6a6;
    letter-spacing: 0;
    line-height: 24px;
    margin: 20px 0 50px;
    .t1 {
      font-family: PingFangSC-Regular;
      color: #000;
      letter-spacing: 0;
      line-height: 24px;
    }
    .nav{
      cursor: pointer;
    }
  }
  .mainBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .goods {
      width: 30%;
      font-family: PingFangSC-Regular;
      .goods-title {
        font-size: 20px;
        color: #424242;
        letter-spacing: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin: 12px 0;
        width: 250px;
      }
      .specs {
        display: flex;
        flex-wrap: wrap;
        .specs-item {
          font-size: 16px;
          margin: 0 12px 10px 0;
          padding: 8px 24px;
          background: rgba($color: #424242, $alpha: 0.04);
          border-radius: 6px;
          color: rgba($color: #424242, $alpha: 0.5);
          text-align: center;
        }
      }
      .goods-price {
        font-size: 20px;
        color: #fe5845;
        letter-spacing: 0;
      }
    }
    .comments {
      width: 70%;
      /deep/ .ant-form label {
        font-size: 20px;
        font-family: PingFangSC-Regular;
        color: #424242;
      }
      /deep/ .el-rate {
        height: 20px;
        line-height: 2;
        .el-rate__icon {
          font-size: 28px;
          margin-right: 6px;
          color: #c0c4cc;
          -webkit-transition: 0.3s;
          transition: 0.3s;
        }
      }
      .sub-btn {
        font-size: 20px;
        background: #d6be93;
        border-radius: 6px;
        width: 164px;
        height: 60px;
        color: #fff;
        line-height: 60px;
        text-align: center;
      }
      .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
      }

      .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }
  }
}
/deep/ .info-card {
  margin-bottom: 0;
}
</style>
