<template>
  <div style="width:100%">
    <el-tabs class="tabs-balance" type="border-card">
      <!-- <el-tab-pane label="我的余额"> -->
      <div class="my-balance">我的余额</div>
      <div class="balance-box">
        <div class="balance-first">
          <div class="balance-text">当前余额（元）</div>
          <div class="balance-num">2,000.00</div>
        </div>
        <div class="balance-other">
          <div class="balance-text">累计支出（元）</div>
          <div class="balance-num">800.00</div>
        </div>
        <div class="balance-other">
          <div class="balance-text">支付订单数（笔）</div>
          <div class="balance-num">80</div>

        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- <el-tab-pane label="近期收支明细" name="first">
          <el-table :data="list" size="small" :show-header="true" fit highlight-current-row header-cell-class-name="table-header" cell-class-name="table-cell">
            <el-table-column align="center" min-width="300" label="时间" prop="purchaseSn" />
            <el-table-column align="center" min-width="140" label="类型" prop="categoryName" />
            <el-table-column align="center" min-width="140" label="金额" prop="purchaseCount" />

          </el-table>
        </el-tab-pane> -->
        <el-tab-pane label="余额明细" name="second">
          <el-table :data="list" size="small" :show-header="true" fit highlight-current-row header-cell-class-name="table-header" cell-class-name="table-cell">
            <el-table-column align="center" min-width="300" label="时间" prop="purchaseSn" />
            <el-table-column align="center" min-width="140" label="类型" prop="categoryName" />
            <el-table-column align="center" min-width="140" label="金额" prop="purchaseCount" />

          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="balance-detail-bt">近期明细</div>
      <div class="balance-detail-content" v-for="i in 10" :key="i">
        <div class="balance-detail-content-text">
          <div class="balance-content-text">充值</div>
          <div class="balance-content-time">2020-09-01 15:00</div>
        </div>
        <div class="balance-content-num">+999.90</div>
      </div> -->
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane label="余额明细">
        <div class="balance-detail-bt">
          <div>2020年9月</div>
          <div class="detail">收入：5,000.00 支出：300.00 </div>
        </div>
        <div class="balance-detail-content" v-for="i in 10" :key="i">
          <div class="balance-detail-content-text">
            <div class="balance-content-text">充值</div>
            <div class="balance-content-time">2020-09-01 15:00</div>
          </div>
          <div class="balance-content-num" v-if="i%2">+999.90</div>
          <div class="balance-content-num-oll" v-else>-999.90</div>
        </div>
        <el-pagination class="page" background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { balanceStatistics } from '@/api/index'

export default {
  data() {
    return {
      balabceInfo: null,
      activeName: 'first',
      list: [{ purchaseSn: 10, categoryName: 0, purchaseCount: 0 }],
    }
  },
  mounted() {
    // this.getBalance()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getBalance() {
      balanceStatistics().then((res) => {
        console.log(res)
        this.balabceInfo = res.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.my-balance {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #424242;
  letter-spacing: 0;
  line-height: 3px;
  border-bottom: 1px solid #f0f0f0;
  height: 24px;
}
.balance-box {
  height: 148px;
  display: flex;
  align-items: center;

  .balance-first {
    margin-right: 25px;
    width: 330px;
    height: 68px;
    // border-right: 1px solid #efefef;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 49px;
    .balance-text {
      margin-bottom: 12px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #424242;
      letter-spacing: 0;
      line-height: 20px;
    }
    .balance-num {
      font-family: PingFangSC-Semibold;
      font-size: 50px;
      color: #d6be93;
      letter-spacing: 0;
      line-height: 50px;
    }
  }
  .balance-other {
    width: 150px;
    text-align: center;
    .balance-text {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #8a8a8a;
      letter-spacing: 0;
      line-height: 14px;
      margin-bottom: 12px;
    }
    .balance-num {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #424242;
      letter-spacing: 0;
      line-height: 36px;
    }
  }
}
.balance-detail-bt {
  display: flex;
  justify-content: space-between;
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #424242;
  letter-spacing: 0;
  line-height: 63px;
  height: 63px;
  border-bottom: 1px solid #cacaca;
  .balance-detail-text {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #424242;
    text-align: right;
    line-height: 16px;
  }
}
.balance-detail-content {
  height: 92px;
  border-bottom: 1px solid #efefef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .balance-content-text {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #424242;
    letter-spacing: 0;
    line-height: 20px;
  }
  .balance-content-time {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #cacaca;
    line-height: 16px;
  }
  .balance-content-num {
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #fe5845;
    text-align: right;
    line-height: 20px;
  }
  .balance-content-num-oll {
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #424242;
    text-align: right;
    line-height: 20px;
  }
}
.page {
  margin: 50px auto 36px;
  text-align: center;
}
/deep/ .el-tabs__nav-wrap {
  margin-bottom: -8px;
}
/deep/ .el-tabs__item {
  height: 60px;
  line-height: 60px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;

  // .el-tabs__nav-wrap {
  //   height: 100%;
  // }
}

/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 30px;
}
// /deep/ .el-tabs--border-card > .el-tabs__header {
//   background: #fafafa;
//   height: 60px;
//   box-sizing: border-box;
// }

// /deep/ .el-tabs__item {
//   padding: 0 20px;
//   height: 40px;
//   box-sizing: border-box;
//   display: inline-block;
//   list-style: none;
//   font-weight: 500;
//   position: relative;
//   font-family: PingFangSC-Regular;
//   font-size: 16px;
//   color: #8b8b8b;
//   letter-spacing: 0;
//   line-height: 24px;
// }

/deep/ .el-tabs__content {
  min-height: 200px;
  padding: 10px;
}
/deep/ .el-table tr {
  .cell {
    font-size: 14px;
    color: #616164;
  }

  td {
    padding: 13px 0;
    text-align: left;
  }
}

/deep/ .el-table th {
  background-color: #f1f2f5;
  padding: 14px 0;
  text-align: left;

  /deep/ .cell {
    font-size: 16px;
    color: #252525;
  }
}

/deep/ .el-table .cell {
  color: #424242;
}

/deep/ .table-header {
  font-size: 14px;
  color: #252525;
  background: #f1f2f5;
}

/deep/ .table-cell {
  font-size: 14px;
  color: #606226;
}
/deep/ .el-tabs__item {
  border-top: 0 !important;
}
/deep/.el-tabs__content {
  min-height: 200px;
  padding: 50px 10px 10px;
}
</style>
