<template>
  <div class="body" ref="qwcontent" id="ccc">
    <p class="header">
      <span v-if="type===1">首页>新品首发</span>
      <span v-if="type===2">首页>热门推荐</span>
    </p>
    <div class="group" style="width:100%">
      <div class="content">
        <div class="content-top">
          <p class="content-title" v-if="type===1">[ 新品首发 ]</p>
          <p class="content-title" v-if="type===2">[ 热门推荐 ]</p>
          <p class="content-desc" v-if="type === 1">每周准时上新</p>
          <p class="content-desc" v-if="type === 2">人气好物推荐，它们最受欢迎</p>
        </div>
        <div class="content-body">
          <div class="infinite-list-wrapper" style="overflow:auto">
            <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
              <!-- <li v-for="i in count" class="list-item">{{ i }}</li> -->
              <a-row>
                <a-col span="5" v-for="pItem in typeList" :key="pItem.id" @click="$router.push({ path: '/base/classification/detail', query: { id: pItem.id } })">
                  <productItem :good="pItem" :type="type === 1 ? 'newPublish' : 'hotRecomment'"></productItem>
                </a-col>
              </a-row>
            </div>
            <p class="info-center" v-if="loading">加载中...</p>
            <p class="info-center" v-if="noMore">没有更多了</p>
          </div>

          <!-- <el-pagination
            background
            :current-page.sync="page"
            layout="prev, pager, next"
            @prev-click="lastPage"
            @next-click="nextPage"
            @current-change="getData"
            :total="count">
          </el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productItem from '@/comments/productItem'
import { getTypeList } from '@/api/index'

export default {
  data() {
    return {
      type: '',
      typeList: [],
      page: 1,
      size: 20,
      count: 0,
      loading: false,
    }
  },
  components: { productItem },
  computed: {
    noMore() {
      return this.typeList.length >= this.count
    },
    disabled() {
      return this.loading || this.noMore
    },
  },
  created() {
    // this.$route.type="新品首发"
    this.$nextTick(() => {
      var timer = setInterval(function () {
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-osTop / 2)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        this.isTop = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 30)
    })
    this.type = parseInt(this.$route.query.type)
  },
  mounted() {
    this.getData()
  },
  // watch: {
  //   $route: function () {
  //     this.type = this.$route.query.type
  //   },
  // },
  methods: {
    load() {
      this.loading = true
      this.page += 1
      setTimeout(() => {
        this.getData()
      }, 1000)
    },
    getData() {
      const params = {
        page: this.page,
        size: this.size,
        order: 'asc',
        sort: 'add_time',
        categoryId: 0,
      }
      if (this.type === 1) {
        params.isNew = true
      } else {
        params.isHot = true
      }
      getTypeList(params).then((res) => {
        this.typeList = [...this.typeList, ...res.data.goodsList]
        this.loading = false
        this.count = res.data.count
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.info-center {
  text-align: center;
}
.body {
  min-height: 100vh;
  .header {
    width: 100%;
    height: 40px;
    background: #fafafa;
    margin: 0;

    span {
      display: flex;
      width: 1170px;
      line-height: 40px;
      margin: 0 auto;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #8b8b8b;
    }
  }

  .group {
    background-image: url('../../assets/images/listLogo.png');
    background-size: cover;
    padding-top: 24px;
    // opacity: 0.6;
    .content {
      width: 1170px;
      margin: 0 auto;

      .content-top {
        text-align: center;

        .content-title {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #2e2e2e;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
          margin-bottom: 6px;
        }

        .content-desc {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #a9936b;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
        }
      }
    }

    .content-body {
      width: 1170px;
    }
  }
}

::v-deep .ant-col-5 {
  width: 20%;
}
</style>
