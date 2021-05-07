<template>
  <div class="order-goods" @click="goDetail">
    <a-row type="flex">
      <a-col :span="12">
        <div class="goods-item">
          <img :src="imgSrc" width="150" height="150" />
          <div class="goods-info">
            <div class="goods-title">{{ goodsTitle }}</div>
            <div class="goods-attrs">
              {{ goodsAttrs.toString() }}
              <!-- <div class="attr-item m-l-12">{{ goodsAttrs[1] }}</div> -->
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="12" style="height:100px">
        <span>¥{{ price }}</span>
        <!-- <span>¥{{ discount }}</span> -->
        <span>{{ num }}</span>
        <span>¥{{ amount }}</span>
      </a-col>
      <div class="amountBtn" style="margin-right: -19%;" v-if="handleOption.delete && handleOption.rebuy">
        <a-button @click="goCommit" class="right-btn">发布评价</a-button>
      </div>
    </a-row>
    <!-- (已收货)交易完成 √-(handleOption.comment && handleOption.rebuy) || (handleOption.delete && handleOption.rebuy)-->
    <!-- <div class="amountBtn" style="margin-right: -19%;" v-if="handleOption.delete && handleOption.rebuy">
      <a-button @click="goCommit" class="right-btn">发布评价</a-button>
    </div> -->
    <dotted-line></dotted-line>
  </div>
</template>
<script>
import dottedLine from '@/comments/dottedLine'
export default {
  components: {
    dottedLine,
  },
  props: {
    imgSrc: {
      default() {
        return ''
      },
      type: String,
    },
    id: {
      default() {
        return 0
      },
      type: Number,
    },
    goodsTitle: {
      default() {
        return ''
      },
      type: String,
    },
    goodsAttrs: {
      default() {
        return []
      },
      type: Array,
    },
    price: {
      default() {
        return ''
      },
      type: String,
    },
    discount: {
      default() {
        return ''
      },
      type: String,
    },
    num: {
      default() {
        return ''
      },
      type: String,
    },
    amount: {
      default() {
        return ''
      },
      type: String,
    },
    handleOption: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  mounted() {
    console.log(this.id)
  },
  methods: {
    // 发布评价
    goCommit() {
      this.$router.push({ path: '/base/postComments', query: { id: this.id } })
    },
    goDetail() {
      this.$router.push({ path: '/base/classification/detail', query: { id: this.id } })
    },
  },
}
</script>
<style lang="scss" scoped>
.order-goods {
  position: relative;
  & :hover{
    cursor: pointer;
  }
  .ant-col-12 {
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 50%;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #cacaca;
    letter-spacing: 0;
    // line-height: 14px;
    .goods-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 15px;
      border-radius: 6px;

      .goods-info {
        width: 40%;
        margin-left: 21.8px;
        .goods-title {
          font-family: PingFangSC-Regular;
          color: #424242;
          letter-spacing: 0;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .goods-attrs {
          margin-top: 42px;
          background: #f8f8f8;
          border-radius: 6px;
          padding: 8px;
          margin-right: 12px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #c2c2c2;
          text-align: center;
          line-height: 20px;

          .m-l-12 {
            margin-left: 12px;
          }
        }
      }
    }
  }
  .ant-col-12:nth-child(2) {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    color: #424242;
    span {
      flex: 1;
      text-align: center;
    }
  }
}
.amountBtn {
  width: 35%;
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  position: absolute;
  bottom: 10%;
  left: 80%;
  .left-btn {
    width: 45%;
    height: 36px;
    border-radius: 6px;
  }
  .right-btn {
    width: 45%;
    height: 36px;
    border: none;
    color: #fff;
    border-radius: 6px;
    background: #d6be93;
  }
}
</style>
