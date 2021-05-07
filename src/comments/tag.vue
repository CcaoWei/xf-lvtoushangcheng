<template>
  <div class="tags-box">
    <a-tag :class="{'checked':zonghe}" class="btn-select" @click="checkZonghe">综合</a-tag>
    <a-tag :class="{'checked':order}" class="btn-select" @click="checkJiage">
      <div>价格</div>
      <img class="select-icon" :src="require('@/assets/images/'+selectImg)" />
    </a-tag>
    <a-tag class="btn-select" :class="{'checked':fenlei}" @click="checkFenlei">分类查看</a-tag>
    <a-tag class="last-tag">
      <a-radio-group v-model="categoryId" @change="radioChange">
        <a-radio v-show="fenlei" v-for="(item,index) in filterCategoryList" :key="index" :value="item.id">{{ item.name
        }}
        </a-radio>
      </a-radio-group>
      <span class="pagination">
        <span class="pagination-num" v-if="count">{{ page }}/{{ Math.ceil(count/size) }}</span>
        <a-pagination v-model="page" :total="count" hideOnSinglePage />
      </span>
    </a-tag>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    typeKey: {
      default: function () {
        return ''
      },
      type: String,
    },
    page: {
      default: function () {
        return 1
      },
      type: Number,
    },
    size: {
      default: function () {
        return 10
      },
      type: Number,
    },
    count: {
      default: function () {
        return 10
      },
      type: Number,
    },
    filterCategoryList: {
      default: function () {
        return []
      },
      type: Array,
    },
  },
  data() {
    return {
      selectImg: 'select_bottom.png',
      sort: 'add_time', // add_time综合   retail_price价格
      order: null,
      zonghe: true,
      fenlei: false,
      categoryId: 0,
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    checkZonghe() {
      this.zonghe = true
      this.sort = 'add_time'
      this.order = null
      this.fenlei = false
      const searchData = {
        page: this.page,
        size: this.size,
        order: 'asc',
        sort: this.sort,
        categoryId: 0,
      }
      if (this.typeKey) {
        searchData[this.typeKey] = true
      }
      this.$emit('getTypeList', searchData)
    },
    checkJiage() {
      this.zonghe = false
      this.sort = 'retail_price'
      this.fenlei = false
      if (this.order === null) {
        this.order = 'desc'
        this.selectImg = 'select_bottom.png'
      } else if (this.order === 'asc') {
        this.order = 'desc'
        this.selectImg = 'select_bottom.png'
      } else if (this.order === 'desc') {
        this.order = 'asc'
        this.selectImg = 'select_top.png'
      }
      const searchData = {
        page: this.page,
        size: this.size,
        order: this.order,
        sort: this.sort,
        categoryId: 0,
      }
      if (this.typeKey) {
        searchData[this.typeKey] = true
      }
      this.$emit('getTypeList', searchData)
    },
    checkFenlei() {
      this.zonghe = false
      this.sort = 'retail_price'
      this.order = null
      this.fenlei = true
      this.categoryId = 0
      this.$emit('getTypeList', null)
    },
    radioChange() {
      const searchData = {
        page: this.page,
        size: this.size,
        order: 'asc',
        sort: 'retail_price',
        categoryId: this.categoryId,
      }
      if (this.typeKey) {
        searchData[this.typeKey] = true
      }
      this.$emit('getTypeList', searchData)
    },
  },
}
</script>
<style lang="scss" scoped>
.tags-box {
  display: flex;
  padding: 0 120px;
  margin-bottom: 50px;

  /deep/ .ant-tag {
    padding: 0 44px;
    height: 60px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #424242;
    text-align: center;
    line-height: 60px;
    margin: 0;
    border-radius: 0;
  }

  .checked {
    background: #ffffff;
    border: 2px solid #d6be93;
    color: #d6be93;
  }

  .btn-select {
    cursor: pointer;
    padding: 0 20px;
    width: 120px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .select-icon {
      width: 10px;
      height: 20px;
    }
  }

  .last-tag {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .pagination-num {
        margin-right: 10px;
      }
    }
  }

  /deep/ .ant-pagination {
    display: inline-block;
  }

  ::v-deep .ant-pagination {
    .ant-pagination-item,
    .ant-pagination-jump-next {
      display: none;
    }

    li {
      background: #ffffff;
      border: 1px solid #c3c3c3;
      border-radius: 2.62px;
    }
  }
}
</style>
