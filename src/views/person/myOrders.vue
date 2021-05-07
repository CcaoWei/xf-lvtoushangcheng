<template>
  <div style="width:100%">
    <el-tabs class="tabs-balance" v-model="active" type="border-card" @tab-click="tabChange" v-if="$route.path == '/base/person'">
      <el-tab-pane name="0" label="全部订单">
        <orderItem v-for="(item, index) in list" :key="index" @goDetails="goDetails" :order="item" @getOrderList="getOrderList"></orderItem>
        <a-empty description="暂无数据" class="no-data" v-if="list.length == 0"></a-empty>
      </el-tab-pane>
      <el-tab-pane name="1" label="待付款">
        <orderItem v-for="(item, index) in list" :key="index" @goDetails="goDetails" :order="item" @getOrderList="getOrderList"></orderItem>
        <a-empty description="暂无数据" class="no-data" v-if="list.length == 0"></a-empty>
      </el-tab-pane>
      <el-tab-pane name="2" label="待发货">
        <orderItem v-for="(item, index) in list" :key="index" @goDetails="goDetails" :order="item" @getOrderList="getOrderList"></orderItem>
        <a-empty description="暂无数据" class="no-data" v-if="list.length == 0"></a-empty>
      </el-tab-pane>
      <el-tab-pane name="3" label="待收货">
        <orderItem v-for="(item, index) in list" :key="index" @goDetails="goDetails" :order="item" @getOrderList="getOrderList"></orderItem>
        <a-empty description="暂无数据" class="no-data" v-if="list.length == 0"></a-empty>
      </el-tab-pane>
      <el-tab-pane name="4" label="我的评价">
        <div>
          <a-tabs default-active-key="0" v-model="activeKey" @change="commentChange">
            <a-tab-pane key="0" :tab="'待评价(' + daipingjia + ')'">
              <evaluateItem v-for="(item, index) in myCommentsListUi" :key="index" :order="item" @getOrderList="getOrderList"></evaluateItem>
            </a-tab-pane>
            <a-tab-pane key="1" :tab="'已评价(' + yipingjia + ')'">
              <div class="commentsList">
                <commentsItem v-for="(item, index) in myCommentsListUi" :key="index" :order="item"></commentsItem>
              </div>
            </a-tab-pane>
          </a-tabs>
          <a-pagination style="margin-top: 10px" v-model="coupondataInfo.page" :total="coupondataInfo.showType === '0' ? daipingjia : yipingjia" hideOnSinglePage />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- <a-tabs type="card" :default-active-key="active" v-if="$route.path == '/base/person'" @change="tabChange">
    <a-tab-pane key="0" tab="全部订单">
      <orderItem v-for="(item, index) in list" :key="index" @goDetails="goDetails" :order="item" @getOrderList="getOrderList"></orderItem>
      <a-empty description="暂无数据"  class="no-data" v-if="list.length == 0"></a-empty>
    </a-tab-pane>
    <a-tab-pane key="1" tab="待付款">
      <orderItem v-for="(item, index) in list" :key="index" @goDetails="goDetails" :order="item" @getOrderList="getOrderList"></orderItem>
      <a-empty description="暂无数据"  class="no-data" v-if="list.length == 0"></a-empty>
    </a-tab-pane>
    <a-tab-pane key="2" tab="待发货">
      <orderItem v-for="(item, index) in list" :key="index" @goDetails="goDetails" :order="item" @getOrderList="getOrderList"></orderItem>
      <a-empty description="暂无数据"  class="no-data" v-if="list.length == 0"></a-empty>
    </a-tab-pane>
    <a-tab-pane key="3" tab="待收货">
      <orderItem v-for="(item, index) in list" :key="index" @goDetails="goDetails" :order="item" @getOrderList="getOrderList"></orderItem>
      <a-empty description="暂无数据"  class="no-data" v-if="list.length == 0"></a-empty>
    </a-tab-pane>
    <a-tab-pane key="4" tab="我的评价">
      <div>
        <a-tabs default-active-key="0" @change="commentChange">
          <a-tab-pane key="0" :tab="'待评价(' + daipingjia + ')'">
            <evaluateItem v-for="(item, index) in myCommentsListUi" :key="index" :order="item" @getOrderList="getOrderList"></evaluateItem>
          </a-tab-pane>
          <a-tab-pane key="1" :tab="'已评价(' + yipingjia + ')'">
            <div class="commentsList">
              <commentsItem v-for="(item, index) in myCommentsListUi" :key="index" :order="item"></commentsItem>
            </div>
          </a-tab-pane>
        </a-tabs>
        <a-pagination style="margin-top: 10px" v-model="coupondataInfo.page" :total="coupondataInfo.showType === '0' ? daipingjia : yipingjia" hideOnSinglePage />
      </div>
    </a-tab-pane>
  </a-tabs> -->
    <router-view v-else></router-view>
  </div>

</template>

<script>
import orderItem from '@/comments/orderItem'
import personTag from '@/comments/personTag'
import { orderList, getUserCommentList } from '@/api/index'
import commentsItem from '@/comments/commentsItem'
import evaluateItem from '@/comments/evaluateItem'
import { mapGetters } from 'vuex'

export default {
  components: {
    orderItem,
    personTag,
    evaluateItem,
    commentsItem,
  },
  data() {
    return {
      activeKey: '0',
      active: '0',
      tabs: [{ title: '全部' }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '已评价' }], // 顶部tablist
      selectedTagIndex: this.$route.params.activeTag, // 初始化被选中的tabs
      tabsNum: 5, // max tabs items
      isLoadingIcon: true,
      list: [], // 数据源
      isLoading: false,
      myCommentsListUi: [],
      loadingF: false,
      finishedF: false,
      coupondataInfo: {
        showType: '0',
        page: 1,
        size: 10,
      },
      daipingjia: 0,
      yipingjia: 0,
    }
  },
  computed: {
    ...mapGetters(['personData']),
  },
  created() {
    this.active = JSON.stringify(this.personData[1])
  },

  mounted() {
    this.getOrderList(this.personData[1])
  },
  watch: {
    'coupondataInfo.page'() {
      this.getUserCommentList()
    },
    personData(newV, oldV) {
      this.getOrderList(newV[1])
      this.active = JSON.stringify(newV[1])
    },
    $route(to, from) {
      if (from.path === '/base/person/orderDetails') {
        this.getOrderList(0)
      }
    },
  },
  methods: {
    tabChange(tab, event) {
      console.log(tab)
      console.log(event)
      this.activeKey = '0'
      this.active = tab.name
      this.getOrderList(tab.name)
    },
    commentChange(key) {
      this.coupondataInfo.showType = key
      this.coupondataInfo.page = 1
      this.getUserCommentList()
    },
    goDetails(value) {
      console.log(value)
      this.$router.push({
        path: '/base/person/orderDetails',
        query: { id: value },
      })
    },
    getUserCommentList() {
      getUserCommentList(this.coupondataInfo).then((res) => {
        if (res.data.list) {
          this.myCommentsListUi = [...res.data.list]
        }
      })
    },
    getOrderList() {
      if (this.active === '4') {
        getUserCommentList({
          showType: 0,
          page: 1,
          size: 10,
        }).then((res) => {
          this.myCommentsListUi = [...res.data.list]
          this.daipingjia = res.data.count
        })
        getUserCommentList({
          showType: 1,
          page: 1,
          size: 10,
        }).then((res) => {
          this.yipingjia = res.data.count
        })
      } else {
        orderList(this.active).then((res) => {
          this.list = res.data.data
          this.list.forEach((item) => {
            item.uiactualPrice = item.actualPrice.toFixed(2)
          })
          this.isLoadingIcon = false
        })
      }
    },
  },
}
</script>

<style lang="scss">
.ant-tabs.ant-tabs-card .ant-tabs-card-bar {
  .ant-tabs-tab-active {
    color: #d6be93;
    background: #fff;
    border-color: #d6be93;
    //  border-bottom: 1px solid #fff;
  }

  .ant-tabs-tab {
    margin: 0;
    font-size: 20px;
    margin-right: 0px;
    padding: 0 22px;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
.no-data {
  margin: 200px;
}
// /deep/ .el-tabs__item.is-active {
//   border-top: 5px solid #d6be93;
// }
</style>
