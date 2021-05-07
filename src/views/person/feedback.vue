<template>
  <div class="feedback">
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="意见反馈">
        <a-select placeholder="请选择" v-decorator="['feedbackType', { rules: [{ required: true, message: '请选择反馈类型' }] }]" style="width: 180px;" @change="handleSelectChange">
          <a-select-option value="商品相关">
            商品相关
          </a-select-option>
          <a-select-option value="功能异常">
            功能异常
          </a-select-option>
          <a-select-option value="优化建议">
            优化建议
          </a-select-option>
          <a-select-option value="其他">
            其他
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="联系电话">
        <a-input placeholder="方便我们与您取得联系" style="width: 180px;" v-decorator="[
            'connectTel',
            {
              rules: [
                {
                  required: true,
                  validator:validatePhone,
                  message: '请输入正确的手机号'
                }
              ]
            }
          ]" />
      </a-form-item>
      <!-- message: '请输入正确的手机号' -->
      <a-form-item label="反馈内容">
        <a-textarea :auto-size="{ minRows: 3, maxRows: 5 }" placeholder="请输入" v-decorator="['feedbackContent', { rules: [{ required: true, message: '请输入反馈信息' }] }]" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card" :file-list="fileList" @preview="handlePreview" @change="handleChange">
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
        <a-button class="sub-btn" html-type="submit" @click="handleSubmit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { batchUpload, feedbackSubmit } from '@/api/index'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  data() {
    // 电话号验证
    const validatePhone = (rule, value, callback) => {
      // console.log(value);
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      previewVisible: false,
      previewImage: '',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        // }
      ],
      picUrls: [],
      feedbackType: '',
      connectTel: '',
      feedbackContent: '',
      hasPicture: false,
      validatePhone
    }
  },
  methods: {
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
    handleChange({ fileList }) {
      this.fileList = fileList
      console.log(fileList)
      this.upLoadImgs()
    },
    // 本地上传图片处理 --------------- end
    upLoadImgs() {
      var param = new FormData() // FormData 对象
      this.fileList.forEach((item) => {
        param.append('files', item.originFileObj) // 文件对象
      })
      batchUpload(param).then((res) => {
        if (res.errno === 0) {
          this.picUrls = res.data
        }
        // if (res.data.errno === 413) {
        //   Dialog.alert({
        //     title: '提示',
        //     message: '图片过大，请重新选择上传'
        //   })
        // }
      })
    },

    // 下拉框选择改变
    handleSelectChange(e) {
      this.feedbackType = e
    },
    // 提交反馈
    handleSubmit(e) {
      e.preventDefault()
      if (this.fileList) {
        this.hasPicture = true
        console.log('this.picUrls->', this.picUrls)
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            mobile: values.connectTel,
            feedType: values.feedbackType,
            content: values.feedbackContent,
            hasPicture: this.hasPicture,
            picUrls: this.picUrls,
          }
          feedbackSubmit(params)
            .then((res) => {
              if (res.errno === 0) {
                console.log('提交成功...')
                this.$message.success(res.errmsg)
                setTimeout(() => {
                  // this.form.resetFields()
                  // this.picUrls = []
                  this.$router.go(0)
                }, 500)
              }
            })
            .catch((err) => {
              this.$message.error(err.errmsg)
            })
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.feedback {
  padding: 20px;
  width: 100%;
  .sub-btn {
    background: #d6be93;
    border-radius: 6px;
    width: 120px;
    height: 36px;
    color: #fff;
    line-height: 36px;
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
</style>
