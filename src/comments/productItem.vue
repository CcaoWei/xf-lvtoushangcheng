<template>
  <a-card hoverable class="product-item" v-if="good" @click="navToDetail(good.valueId)">
    <div class="product-img" slot="cover">
      <img alt="example" :src="good.picUrl" />
    </div>
    <div class="left-icon" v-if="type == 'newPublish'">
      <img src="@/assets/images/product-new.png" alt="" />
      <span>新品</span>
    </div>
    <div class="left-icon" v-else-if="type == 'hotRecomment'">
      <img src="@/assets/images/product-more.png" alt="" />
      <span>爆品</span>
    </div>
    <div class="product-name">{{ good.title||good.name }} <br />{{ good.subtitle }}</div>
    <div class="product-text"><span style="font-size:12px">￥</span>{{ good.price||good.retailPrice }}</div>
  </a-card>
</template>

<script>
export default {
  components: {},
  props: {
    good: {
      default: function() {
        return {}
      },
      type: Object
    },
    type: {
      default: '',
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    navToDetail(id) {
      this.$emit('navToDetailEvent', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.product-item {
  box-sizing: border-box;
  border: 0;
  overflow: hidden;
  height: 324px;
  // width: 230px;
  margin-bottom: 30px;
  position: relative;
  &:hover {
    border: 1px solid #efefef;
    transition: transform 1s;
    box-sizing: border-box;
    img {
      transform: scale(1.2);
    }
  }

  .product-img {
    height: 196px;
    width: calc(100% - 32px);
    overflow: hidden;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      transition: transform 0.3s;
    }
    // margin: 16px 18px;
  }
  .left-icon {
    width: 48px;
    img {
      width: 48px;
      height: 31px;
      position: absolute;
      top: 16px;
      left: 0;
    }
    span {
      position: absolute;
      top: 18px;
      left: 10px;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
    }
  }

  .product-name {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #2e2e2e;
    letter-spacing: 0;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    line-clamp: 2;
    line-height: 1.5rem;
    height: 3rem;
  }

  .product-text {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #fe5845;
    letter-spacing: 0;
    // line-height: 40px;
    // margin-top: 24px;
  }
  /deep/ .ant-card-cover {
    // text-align: center;
    padding: 16px 0;
    display: flex;
    justify-content: space-around;
  }
  /deep/ .ant-card-body {
    padding: 20px;
    padding-top: 0px;
    zoom: 1;
  }
}
</style>
