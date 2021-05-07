<template>
  <a-card hoverable class="product-item" v-if="good">
    <img class="product-img" slot="cover" alt="example" :src="good.picUrl" />

    <div class="product-name">{{ good.title||good.name }} <br />{{ good.subtitle }}</div>
    <div class="product-text">￥{{ good.price||good.retailPrice }}</div>
  </a-card>
</template>

<script>
export default {
  components: {},
  props: {
    good: {
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
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.product-item {
  background-image: linear-gradient(180deg, #f8f8f8 0%, #f7f7f8 100%);
  border-radius: 6px;
  height: 460px;
  width: 370px;
  box-sizing: border-box;
  border: 0;
  overflow: hidden;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 30px;
  .product-img {
    height: 280px;
    width: auto;
    margin: 0 auto;
  }
  .product-name {
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #2e2e2e;
    letter-spacing: 0;
    text-align: center;
    line-height: 28px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    width: 100%;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 56px;
  }
  .product-text {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2e2e2e;
    text-align: center;
    letter-spacing: 0;
    line-height: 40px;
    margin-top: 24px;
  }
}
</style>
