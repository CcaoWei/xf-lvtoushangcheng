<template>
  <a-row v-if="favourateList.length > 0" style="padding-top:20px">
    <a-col span="8" v-for="(item,i) in favourateList" :key="i">
      <productItem :good="item" @navToDetailEvent="ccc"></productItem>
    </a-col>
  </a-row>
  <a-empty class="emptyBox" description="暂无数据" v-else />
</template>
<script>
import productItem from '@/comments/productItem'
import { collectList } from '@/api/index'

export default {
  components: {
    productItem,
  },
  data() {
    return {
      // good: {
      //   picUrl: '//hdfile.cafewallet.cn/b4n7bn86y21ue3amat8d.png',
      //   title: '纯棉加大加厚成人家用浴巾',
      //   name: '',
      //   subtitle: '',
      //   price: 999.9
      // },
      dataInfo: {
        type: 0,
        page: 1,
        size: 10,
      },
      favourateList: [],
    }
  },
  mounted() {
    this.dataInfo = {
      type: 0,
      page: 1,
      size: 10,
    }
    this.getList()
  },
  methods: {
    ccc(id) {
      this.$router.push({ path: '/base/classification/detail', query: { id: id } })
    },
    getList() {
      collectList(this.dataInfo).then((res) => {
        console.log(res)
        if (res.errno === 0) {
          const newOfRes = res.data
          this.favourateList = this.favourateList.concat(newOfRes.collectList)
          this.loading = false
          // 数据全部加载完成
          if ((this.dataInfo.page = newOfRes.totalPages)) {
            this.finished = true
          }
        } else {
          // Dialog.alert({
          //   title: '提示',
          //   message: res.data.errmsg
          // })
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.emptyBox{
  margin-top: calc(25%);
}
</style>