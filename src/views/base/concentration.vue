<template>
  <div v-if="$route.path == '/base/main/concentration'" class="direct-supply">
    <div class="main-block" style="overflow: hidden">
      <div class="title">专题精选</div>
      <div class="line">
        <div class="shot-line"></div>
        <div class="long-line"></div>
      </div>
      <div class="search-grade">
        <span class="grade-text">首页 / 专题精选 </span><span class="grade-point"></span>
      </div>
      <img style="width: 100%;height: 100%" :src="topic.topic.picUrl" alt="" srcset="">
      <div class="detail">
        Introduce
        <div class="detail-text">商品详情</div>
      </div>
      <concentrationList :topic="topic"></concentrationList>
      <div class="top">
        <div class="title">精选留言</div>
        <div class="right" @click="goReview">
          <img src="@/assets/icons/icon-review.png" alt="">
          <span>写评论</span>
        </div>
      </div>
      <div class="line">
        <div class="shot-line"></div>
        <div class="long-line"></div>
      </div>
      <discuss v-for="(item,index) in commentList" :key="index" :comment="item"></discuss>
      <a-pagination v-model="page" :total="count" hideOnSinglePage />
    </div>

  </div>
  <router-view v-else></router-view>
</template>

<script>
import discuss from '@/comments/discuss'
import concentrationList from '@/comments/concentrationList'
import { commentList, topicDetail } from '@/api/index'

export default {
  components: { discuss, concentrationList },
  data() {
    return {
      page: 1,
      size: 10,
      count: 0,
      topic: {
        topic: {},
      },
      commentList: [],
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      topicDetail(this.$route.query.id).then((res) => {
        console.log(res.data)
        this.topic = { ...res.data }
      })
      const params = {
        valueId: this.$route.query.id,
        type: 1, // 类型ID。 如果是0，则查询商品评论；如果是1，则查询专题评论。
        showType: 0, // 显示类型。如果是0，则查询全部；如果是1，则查询有图片的评论。
        page: this.page,
        size: this.size,
      }
      commentList(params).then((res) => {
        this.commentList = [...res.data.data]
        this.count = res.data.count
      })
    },
    goReview() {
      this.$router.push({
        path: '/base/main/concentration/review',
        query: {
          id: this.$route.query.id,
        },
      })
    },
  },
  watch: {
    $route(to, from) {
      this.loadData()
    },
  },
}
</script>
<style lang="scss" scoped>
.direct-supply {
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 50px 106px 0;
  box-sizing: border-box;

  .main-block {
    // padding: 0 40px;
    box-sizing: border-box;
    width: 1170px;
    margin: 130px auto 0;

    .title {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #424242;
      letter-spacing: 0;
      line-height: 24px;
      margin-bottom: 20px;
      margin-left: 15px;
    }
    .top {
      display: flex;
      justify-content: space-between;
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #424242;
      letter-spacing: 0;
      line-height: 24px;
      margin-bottom: 20px;
      .title {
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        color: #424242;
        letter-spacing: 0;
        line-height: 24px;
        margin-bottom: 20px;
        margin-left: 15px;
      }
      .right {
        span {
          margin-left: 15px;
          font-family: PingFangSC-Semibold;
          font-size: 24px;
          color: #424242;
          letter-spacing: 0;
          line-height: 24px;
        }
      }
    }

    .line {
      margin-bottom: 20px;
      margin-left: 15px;

      .shot-line {
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

    .search-grade {
      margin-left: 15px;
      padding-bottom: 50px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      letter-spacing: 0;
      line-height: 24px;

      .grade-text {
        color: #a6a6a6;
      }

      .grade-point {
        color: #424242;
      }
    }

    .concentration-img {
      width: 100%;
      margin-bottom: 130px;
    }

    .detail {
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 150px;
      color: #efefef;
      letter-spacing: 3.41px;
      text-align: center;
      line-height: 150px;
      position: relative;

      .detail-text {
        position: absolute;
        font-family: PingFangSC-Regular;
        font-size: 44px;
        color: #424242;
        letter-spacing: 1px;
        z-index: 0;
        left: 50%;
        width: 30%;
        margin-left: -15%;
        height: 150px;
        top: 50%;
        margin-top: -75px;
      }
    }
  }

  /deep/ .ant-pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .ant-pagination-item-active {
      background: #d6be93;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 2.62px;

      a {
        font-family: PingFangSC-Regular;
        font-size: 18.38px;
        color: #ffffff;
        line-height: 28.88px;
      }
    }
  }
}
</style>
