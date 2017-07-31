<template>
  <div class="cartcontrol">
    <transition class="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCount">
        <i class="icon-remove_circle_outline inner"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCount"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
    export default{
      props:{
          food:{
              type:Object
          }
      },
      /*created(){
          console.log(this.food)/!*拿到所有商品*!/
      },*/
      methods:{
        addCount(event){
            if(!event._constructed){/*事件如果不是系统默认派发的阻止掉,避免了在pc端点击的时候事件被触发两次*/return
            }
            if(!this.food.count){
                Vue.set(this.food,'count',1)
            }else{
                this.food.count++;
            }
            console.log(this.food.count)

        },
        decreaseCount(){
          if(!event._constructed){/*事件如果不是系统默认派发的阻止掉,避免了在pc端点击的时候事件被触发两次*/return
          }
          if(this.food.count){
              this.food.count--;
          }
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    width 75px
    position: relative
    height 24px
    .cart-decrease
      transform translate3d(0,0,0)
      display inline-block
      opacity 1
      .inner
        display inline-block
        font-size 24px
        color rgb(0,160,220)
        line-height 24px
        transition all 0.4s linear
        transform rotate(0)
        opacity 1
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)

    .cart-count
      vertical-align top
      display inline-block
      font-size 10px
      color rgb(147,153,159)
      line-height 24px
      width 24px
      text-align center
    .cart-add
      position: absolute
      right 0
      display inline-block
      font-size 24px
      color rgb(0,160,220)
      line-height 24px


</style>
