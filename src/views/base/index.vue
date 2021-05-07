<template>
  <div class="main">
    <Header v-if="!cashier"></Header>
    <cashierHeader v-if="cashier"></cashierHeader>
    <div :style="{'min-height':cardAreaH}" class="contents">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import cashierHeader from '@/comments/cashierHeader'
import Header from '@/comments/header'
import Footer from '@/comments/footer'

export default {
  components: { Header, Footer, cashierHeader },
  data() {
    return {
      cashier: false,
      cardAreaH: '',
    }
  },
  watch: {
    $route(to, from) {
      if (
        this.$route.path === '/base/classification/order' ||
        this.$route.path === '/base/classification/waitPay' ||
        this.$route.path === '/base/classification/payResult'
      ) {
        this.cashier = true
      } else {
        this.cashier = false
      }
    },
  },
  created() {},
  mounted() {
    var h = document.documentElement.clientHeight || document.body.clientHeight
    this.cardAreaH = h - 108 - 173 + 'px'
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
/deep/ .cursor {
  cursor: pointer;
}
.main {
  overflow: hidden;
  box-sizing: border-box;

  .contents {
    height: 100%;
    // padding-bottom: 130px;
    box-sizing: border-box;
  }
}

::v-deep .ant-tabs-nav-scroll {
  display: flex;
  justify-content: flex-start;
  padding-left: 15px;
}

::v-deep .ant-tabs-bar {
  border-bottom: none;
  margin-bottom: 50px;
}

::v-deep .ant-tabs-nav .ant-tabs-tab {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8b8b8b;
  letter-spacing: 0;
  line-height: 24px;
}

::v-deep .ant-tabs-nav .ant-tabs-tab-active {
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #424242;
  letter-spacing: 0;
  line-height: 24px;
}

::v-deep .ant-tabs-ink-bar {
  background-color: #424242;
  height: 3px;
}

// 复选框样式
/deep/ .ant-checkbox-inner {
  width: 24px;
  height: 24px;
}

/deep/ .ant-checkbox-checked .ant-checkbox-inner::after {
  position: absolute;
  display: table;
  border: 1.5px solid #fff;
  border-top: 0;
  border-left: 0;
  -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
  transform: rotate(45deg) scale(1.5) translate(-50%, -50%);
  opacity: 1;
  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  content: ' ';
  top: 53%;
  left: 32%;
}

/deep/ .ant-checkbox-checked::after {
  border: 1px solid #d6be93;
}

/deep/ .ant-checkbox-input {
  width: 24px;
  height: 24px;
}

/deep/ .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner {
  border: 1px solid #d6be93;
  width: 24px;
  height: 24px;
}

/deep/ .ant-checkbox-checked .ant-checkbox-inner {
  border-color: #d6be93;
  background: #d6be93;
}

::v-deep .ant-tabs-ink-bar {
  background-color: #424242;
  height: 3px;
}

// 复选框样式
/deep/ .ant-checkbox-inner {
  width: 24px;
  height: 24px;
}

/deep/ .ant-checkbox-checked .ant-checkbox-inner::after {
  position: absolute;
  display: table;
  border: 1.5px solid #fff;
  border-top: 0;
  border-left: 0;
  -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
  transform: rotate(45deg) scale(1.5) translate(-50%, -50%);
  opacity: 1;
  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  content: ' ';
  top: 53%;
  left: 32%;
}

/deep/ .ant-checkbox-checked::after {
  border: 1px solid #d6be93;
}

/deep/ .ant-checkbox-input {
  width: 24px;
  height: 24px;
}

/deep/ .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner {
  border: 1px solid #d6be93;
  width: 24px;
  height: 24px;
}

/deep/ .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner {
  border-color: #d6be93;
}

::v-deep .ant-tabs-nav-scroll {
  display: flex;
  justify-content: flex-start;
  padding-left: 15px;
}

::v-deep .ant-tabs-bar {
  border-bottom: none;
  margin-bottom: 50px;
}

::v-deep .ant-tabs-nav .ant-tabs-tab {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8b8b8b;
  letter-spacing: 0;
  line-height: 24px;
}

::v-deep .ant-tabs-nav .ant-tabs-tab-active {
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #424242;
  letter-spacing: 0;
  line-height: 24px;
}

::v-deep .ant-tabs-ink-bar {
  background-color: #424242;
  height: 3px;
}
// 复选框样式
/deep/ .ant-checkbox-inner {
  width: 24px;
  height: 24px;
}
/deep/ .ant-checkbox-checked .ant-checkbox-inner::after {
  position: absolute;
  display: table;
  border: 1.5px solid #fff;
  border-top: 0;
  border-left: 0;
  -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
  transform: rotate(45deg) scale(1.5) translate(-50%, -50%);
  opacity: 1;
  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  content: ' ';
  top: 53%;
  left: 32%;
}
/deep/ .ant-checkbox-checked::after {
  border: 1px solid #d6be93;
}
/deep/ .ant-checkbox-input {
  width: 24px;
  height: 24px;
}
/deep/ .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner {
  border: 1px solid #d6be93;
  width: 24px;
  height: 24px;
}

/deep/ .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner {
  border-color: #d6be93;
}
</style>
