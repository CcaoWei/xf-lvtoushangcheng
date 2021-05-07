<template>
  <div class="address-card" :class="selected ? '':'no-selected'" @click="selectedAdress(address)" :style="{backgroundImage: 'url(' + bg_img + ')'}">
    <div class="top">
      <span>{{ address.name }} {{ address.mobile }}</span>
      <div class="moren" v-if="address.isDefault">默认</div>
    </div>
    <div class="middle">{{ address.detailedAddress }}</div>
    <div class="footer">
      <a-button class="f-btn" @click="onDelect" style="margin-right:23px">删除</a-button>
      <a-button class="f-btn" @click="editAddress">修改</a-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      default() {
        return {}
      },
      type: Object,
    },
    selectId: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  data() {
    return {
      bg_img: require('../assets/images/yx_address.png'),
    }
  },
  mounted() {},
  computed: {
    selected: {
      get: function () {
        if (this.selectId === this.address.id || this.selectId === 0) {
          return true
        } else {
          return false
        }
      },
      set: function (val) {
        return val
      },
    },
  },
  methods: {
    editAddress() {
      this.$emit('editAddress', this.address)
    },
    selectedAdress(item) {
      const addressId = item.id
      if (item.id === this.address.id) {
        this.selected = true
      }
      sessionStorage.setItem('addressId', addressId)
      this.$emit('selectedAdress', this.address.id)
    },
    onDelect() {
      this.$emit('delectAddress', this.address.id)
    },
  },
}
</script>
<style lang="scss" scoped>
.address-card {
  margin: 10px 0;
  width: 100%;
  height: 167px;
  border: 1px solid #efefef;
  font-size: 14px;
  color: #424242;
  .top {
    padding: 10px 20px;
    border-bottom: 1px dotted #efefef;
    display: flex;
    position: relative;
    justify-content: space-between;
    .moren {
      // padding: 5px 12px;
      width: 50px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      background-image: linear-gradient(90deg, #fde58b 0%, #f8d268 100%);
      border-radius: 2px;
      color: #78470c;
    }
  }

  .middle {
    padding: 10px 20px;
    height: 53px;
    width: 100%;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .footer {
    padding: 10px 20px;
    display: flex;
    justify-content: flex-end;
    .f-btn {
      border: 1px solid #efefef;
      border-radius: 6px;
    }
  }
}
.no-selected {
  opacity: 0.5;
}
</style>