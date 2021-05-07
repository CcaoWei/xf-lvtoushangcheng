<template>
  <div class="content">
    <div class="title">发布评论</div>
    <div class="line">
      <div class="middle-line"></div>
      <div class="long-line"></div>
    </div>
    <div class="tabs-item">
      首页/专题精选/电竞游戏耳机/ <span>发布评价</span>
    </div>
    <div class="mainBox">
      <div class="goods">
        <img :src="topic.picUrl" width="250" alt="">
        <span class="goods-title">{{ topic.title }}</span>
        <span class="goods-price">¥{{ topic.price }}</span>
      </div>
      <div class="comments">
        <a-form :form="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }" @submit="postComments">
          <a-form-item label="评分" :wrapper-col="{ span: 12, offset: 1 }">
            <el-rate v-model="stars" allow-half></el-rate>
          </a-form-item>
          <a-form-item label="口碑" :wrapper-col="{ span: 12, offset: 1 }">
            <el-input type="textarea" v-model="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="留言经过筛选后，对所有人可见" maxlength="300" show-word-limit>
            </el-input>
          </a-form-item>
          <a-form-item label="晒图" :wrapper-col="{ span: 12, offset: 1 }">
            <a-upload action="/api/mall_api/pc/wx/storage/batchUpload" :headers="loadHeaders" name="files" list-type="picture-card" :file-list="fileList" @preview="handlePreview" @change="handleChange">
              <div v-if="fileList.length < 9">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  {{ fileList.length+1 }}/9
                </div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
            <a-button class="sub-btn" html-type="submit">
              提交评价
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { topicDetail, commentPost } from '@/api/index'
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
      previewVisible: false,
      previewImage: '',
      textarea: '',
      stars: 0,
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        // }
      ],
      submitData: {
        orderGoodsId: 132, // 订单中商品id
        content: '', // 评论内容
        star: 0, // 星数
        hasPicture: false,
        picUrls: [], // 图片
      },
      form: this.$form.createForm(this, { name: 'coordinated' }),
      topic: {},
      picUrls: [],
    }
  },
  created() {
    this.loadHeaders = {
      'Blade-Auth': 'bearer ' + this.token,
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      topicDetail(this.$route.query.id).then((res) => {
        this.topic = res.data.topic
        console.log(this.topic)
      })
    },
    // 本地上传图片处理 --------------- start
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ file, fileList }) {
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
    // 本地上传图片处理 --------------- end
    postComments() {
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

      this.submitData.orderGoodsId = this.topic.id
      if (this.submitData.picUrls.length > 0) {
        this.submitData.hasPicture = true
      } else {
        this.submitData.hasPicture = false
      }
      commentPost(this.submitData).then((res) => {
        // Toast('评价成功')
        sessionStorage.setItem('hasEvaluate', true)
        this.$router.go(-1)
      })
    },
    // 成功提示
    pointSuccess() {
      // 延迟 1 秒显示成功信息
      setTimeout(() => {
        this.$notification.success({
          message: '成功',
          description: '留言发表成功',
        })
      }, 1000)
    },
    // 失败提示
    pointFailed() {
      this.$notification['error']({
        message: '失败',
        description: '留言发表失败',
        duration: 4,
      })
    },
    // 请求错误提示
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding: 50px 106px 0;
  box-sizing: border-box;
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
  .tabs-item {
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #a6a6a6;
    letter-spacing: 0;
    line-height: 24px;
    margin: 20px 0 50px;
    span {
      font-family: PingFangSC-Regular;
      color: #000;
      letter-spacing: 0;
      line-height: 24px;
    }
  }
  .mainBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .goods {
      width: 20%;
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
      }
      .specs {
        display: flex;
        margin-bottom: 24px;
        .specs-item {
          font-size: 16px;
          margin-right: 12px;
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
</style>