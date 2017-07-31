<template>
  <div>
    <v-header :seller="seller"></v-header>
    <navs ></navs>
  </div>

</template>

<script>

import header from './components/Header/Header.vue'
import navs from './Navs.vue'
  export default{
    data() {
      return {
          seller:{}
      }
    },
    created(){
      this.$http.get('api/seller').then((res)=>{/*请求seller数据*/
          res=res.body;
          if(res.error===0){
              this.seller= res.data;
              console.log(this.seller)
          }
      })
    },
      components:{
        navs,
        'v-header':header
      }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
