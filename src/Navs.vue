<template>
  <div >
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <router-view ></router-view>
  </div>
</template>

<script>
  export default{

  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common/stylus/mixin.styl"
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    background: white
    border-1px(rgba(7,17,27,.1))
    .tab-item
      flex 1
      text-align center
      &.router-link-active
        color rgb(240,20,20)

</style>
