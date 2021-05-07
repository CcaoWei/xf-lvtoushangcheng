<template>
  <div class="spicial-list">
    <div v-for="(item,index) in listData" :key="index" v-if="index < 2" class="list-step-one" @click="goDetail(item)">
      <img :src="item.picUrl" alt="" srcset="">
      <div class="info">
        <div class="spicial-item-name">{{ item.title }}</div>
        <div class="spicial-item-text">{{ item.subtitle }}</div>
        <div class="spicial-item-price">￥{{ item.price }}</div>
      </div>
    </div>
    <a-row>
      <a-col v-for="(item,index) in listData" :key="index" :span="12" v-if="index > 1">
        <div class="list-step-two" @click="goDetail(item)">
          <div class="info">
            <div class="spicial-item-name">{{ item.title }}</div>
            <div class="spicial-item-text">{{ item.subtitle }}</div>
            <div class="spicial-item-price">￥{{ item.price }}</div>
          </div>
          <img :src="item.picUrl" alt="" srcset="">
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    listData: {
      default: function () {
        return []
      },
      type: Array,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    goDetail(item) {
      this.$router.push({
        path: '/base/main/concentration',
        query: {
          id: item.id,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.spicial-list {
  padding: 0 135px;

  .list-step-one {
    background: #f7f7f8;
    margin-bottom: 30px;
    padding: 0 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      height: 500px;
      width: auto;
    }

    .info {
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

  /deep/ .ant-row {
    padding: 0 !important;

    .ant-col {
      width: calc((100% - 30px) / 2);
    }
  }

  .list-step-two {
    background: #f7f7f8;
    padding-top: 60px;
    padding-bottom: 21px;
    margin-bottom: 30px;

    img {
      height: 420px;
      width: 420px;
      margin: 38px auto 0;
      display: block;
    }

    .info {
      text-align: center;

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
        margin: 2px 0 24px;
      }

      .spicial-item-btn {
        font-family: PingFangSC-Regular;
        font-size: 25px;
        color: #d6be93;
        letter-spacing: 0;
      }
    }
  }

  .spicial-item-price {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #424242;
    letter-spacing: 0;
  }

  .ant-col:nth-child(odd) {
    margin-right: 30px;
  }
}
</style>
