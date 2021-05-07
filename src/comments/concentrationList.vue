<template>
  <div class="spicial-list">
    <!--    <div class="list-step-one">-->
    <!--      <img :src="topic.topic.picUrl" alt="" srcset="">-->
    <!--      <div class="info">-->
    <!--        <div class="spicial-item-name">{{ topic.topic.title }}</div>-->
    <!--        <div class="spicial-item-text">{{ topic.topic.subtitle }}</div>-->
    <!--        <div class="spicial-item-price">¥{{ topic.topic.price }}</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="list-step-one" v-html="topic.topic.content"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    topic: {
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
.spicial-list {
  margin-bottom: 133.5px;

  .list-step-one {
    background: #f7f7f8;
    // padding: 0 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 458px;
      width: auto;
    }
    .info {
      width: 50%;
      margin-left: 150px;
      .spicial-item-name {
        font-family: PingFangSC-Semibold;
        font-size: 44px;
        color: #424242;
        letter-spacing: 1px;
      }
      .spicial-item-text {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #424242;
        letter-spacing: 0.41px;
        line-height: 29.12px;
        width: 185px;
        margin: 2px 0 24px;
      }
      .spicial-item-price {
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #424242;
        letter-spacing: 0;
      }
      .spicial-item-btn {
        background: #d6be93;
        border-radius: 30px;
        width: 120px;
        height: 60px;
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 60px;
        margin-top: 12px;
        text-align: center;
      }
    }
  }
}
</style>
