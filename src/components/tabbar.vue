<template>
  <div class="tabbar">
    <div v-for="(v,i) in userTabs" :key="i" :class="$route.meta.name===v.name?'on':''"><span @click="handleto(v)">{{v.name}}</span><i :class="index===i?'show':''" @mouseleave="handlemove" class="el-icon-error" @mouseenter="hover(i)" @click="hanleRemove(i)"></i></div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      meauBar: [],
      index: ''
    }
  },
  computed: {
    ...mapState(['userTabs'])
  },
  methods: {
    handlemove () {
      this.index = ''
    },
    hover (i) {
      this.index = i
    },
    hanleRemove (i) {
      const arr = this.userTabs
      this.$emit('removeRoute', arr[i])
      arr.splice(i, 1)
      // 发送事件给父元素
      this.$store.commit('useraddTabs', arr)
    },
    handleto (v) {
      this.$router.push(v.path)
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.tabbar{
  height: 30px;
  background: #fff;
  padding: 0 10px;
display: flex;
    justify-content: flex-start;
    align-items: center;
  div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 13%;
    position: relative;
    margin-right: 10px;
      background: gray;
      cursor: pointer;
    span{
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  }
  .show{
    color: skyblue;
  }

  .on{
    background: red;
  }
}
</style>
