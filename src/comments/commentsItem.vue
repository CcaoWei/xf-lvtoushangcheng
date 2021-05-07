<template>
  <div class="commentsItem" v-if="order.comment">
    <div class="c-top">
      <div class="user">
        <img style="border-radius: 100%;margin-right: 12px" :src="order.comment.avatar" alt="" width="50" height="50">
        <span>{{ order.comment.nickname }}</span>
      </div>
      <el-rate style="margin-left: 12px" v-model="order.comment.star" disabled text-color="#ff9900"></el-rate>
    </div>
    <div class="text">
      {{ order.comment.content }}
    </div>
    <div class="images">
      <img style="margin-right: 12.2px" v-for="(item,index) in order.comment.picUrls" :key="index" :src="item" alt="" srcset="" width="100" height="100">
    </div>
    <div class="goods">
      <img :src="order.picUrl" alt="" width="100" height="100">
      <div class="goods-info">
        <span class="goods-title">{{ order.goodsName }}</span>
        <div class="specs">
          <div class="specs-item" v-for="(item,index) in order.specifications" :key="index">{{ item }}</div>
        </div>
      </div>
      <span class="num">x{{ order.number }}</span>
      <span>¥{{ order.price }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      default() {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {
    //   手机号*号加密
    // setTel() {
    //   var dh = this.tel.substr(0, 3) + '****' + this.tel.substr(7)
    //   return dh
    // }
  }
}
</script>
<style lang="scss" scoped>
.commentsItem {
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #424242;
  padding: 20px 0;
  border-bottom: 1px solid #424242;
  .c-top {
    display: flex;
    flex-direction: column;
    /deep/ .el-rate {
      height: 26px;
      margin-top: -5px;
      padding-left: 40px;
      .el-rate__icon {
        font-size: 26px;
        margin-right: 6px;
        color: #c0c4cc;
        -webkit-transition: 0.3s;
        transition: 0.3s;
      }
    }
  }
  .text {
    margin: 12px 0;
  }
  .commentImg {
    border-radius: 6px;
    margin-right: 12px;
  }
  .goods {
    margin: 20px 0;
    padding: 20px 30px;
    background-image: linear-gradient(180deg, #f8f8f8 0%, #f7f7f8 100%);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-info {
      width: 30%;
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

      .num {
        color: #8b8b8b;
      }
    }
    .num {
      color: #8b8b8b;
    }
  }
}
</style>