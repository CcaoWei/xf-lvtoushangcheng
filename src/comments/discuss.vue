<template>
  <div class="discuss-item">
    <div class="discuss-conent">
      <a-avatar class="discuss-img" :src="comment.avatar" />
      <div class="discuss-name">{{ comment.nickname }}</div>
    </div>
    <!-- || comment.userInfo != undefined ? comment.userInfo.avatarUrl:'' -->
    <!-- || comment.userInfo?comment.userInfo.nickName:''  -->
    <div class="discuss-conent content-flex">
      <div class="discuss-text">{{ comment.content }}</div>
      <div class="discuss-imgs">
        <img v-for="(item,index) in comment.picList" :key="index" :src="item" alt="" srcset="" width="100" height="100">
      </div>
    </div>
    <div class="discuss-tiem">{{ comment.addTime }}</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    comment: {
      default: function () {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.comment)
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.discuss-item {
  border-bottom: 1px solid #cacaca;
  display: flex;
  justify-content: space-between;
  padding: 55px 0 50px;
  .discuss-conent {
    .discuss-name {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #424242;
      line-height: 20px;
      display: inline-block;
      margin-left: 11.5px;
    }
    .discuss-text {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #424242;
      line-height: 20px;
      margin-bottom: 20px;
    }
    .discuss-imgs {
      img {
        width: 100px;
        height: 100px;
        margin-right: 11.7px;
      }
    }
  }
  .content-flex {
    flex: 1;
    margin-left: 98px;
  }
  .discuss-tiem {
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #cacaca;
    text-align: right;
    line-height: 30px;
    width: 130px;
  }
}
</style>
