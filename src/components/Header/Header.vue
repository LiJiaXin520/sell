<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img  width='64'height="64" :src="seller.avatar" alt="">
      </div>
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}} / {{seller.deliveryTime}}分钟送达
      </div>
      <div v-if="seller.supports" class="support"><!--因为因为刚传进来的时候seller是一个空的如果在空的上面取第一个就会报错，如果只是操作属性不会报错，为了不报错所以这里要加上一个判断，就是seller这个对象不是空对象的时候才显示class为support这一项这样就避免报错了-->
        <span class="icon" :class="classMap[seller.supports[0].type]"></span><!--:class 可以直接动态操作Dom属性，方便-->
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="DetailShow=!DetailShow">
        {{seller.supports.length}}个
        <i class="icon-keyboard_arrow_right"></i>
      </div><!--v-if 等号后面的为真，显示此标签，为假不显示，用途是为了避免报错不能阅读undefined.length-->
    </div>
    <div class="bulletin-wrapper" v-if="seller.bulletin" @click="DetailShow=!DetailShow">
      <span class="gonggao"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <img class="background" :src="seller.avatar" alt="">
    <div class="Detail" v-if="DetailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="supports-item" v-for="(item,index) in seller.supports" >
              <i class="icon" :class="classMap[seller.supports[index].type]"></i>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="detail-close" @click="DetailShow=!DetailShow">
        <i class="icon-close"></i>
      </div>

    </div>
  </div>
</template>
<script>
  import star from '../star/star.vue'
    export default {
        props:{/*接收父组件传来的参数*/
            seller:{
                type:Object/*规定父组件歘来参数的类型为对象类型*/
            }
        },
      data(){
            return{
              DetailShow:false
            }

      },
      components:{
        star
      },

      created(){
            this.classMap=['decrease','discount','guarantee','invoice','special']
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped >
  @import "../../common/stylus/mixin.styl"
  .header
    color: #fff
    background-color: rgba(0,0,0,0.5)
    position: relative
    overflow hidden
    .background
      position: absolute
      top 0
      left 0
      z-index -1
      width 100%
      height 100%
      background-size:cover
      filter blur(10px)
    .content-wrapper
      padding 24px 12px 18px 24px
      display inline-block
      .avatar img
        display inline-block
        border-radius 2px

    .content
      display inline-block
      position: relative
      vertical-align top
      padding-top 24px
      .title
        margin 2px 0 8px 0
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('./img/brand')
          background-size 30px 18px
        .name
          font-size 16px
          font-weight bold
          line-height 18px
          display inline-block
          height 18px
          margin-left 3px

      .description
        font-size 12px
        color rgb(255,255,255)
        font-weight 200
        line-height 12px
        margin-bottom 10px
      .support
        .icon
          vertical-align top
          display inline-block
          width 12px
          height 12px
          background-size 12px 12px
          &.decrease
            bg-image('./img/decrease_1')
          &.discount
             bg-image('./img/discount_1')
          &.guarantee
             bg-image('./img/guarantee_1')
          &.invoice
             bg-image('./img/invoice_1')
          &.special
             bg-image('./img/special_1')
        .text
          line-height 12px
          vertical-align top
          font-size 12px
          color rgb(255,255,255)
      .supports-count
        position: absolute
        right -66px
        bottom 0
        padding 0 8px
        height 24px
        border-radius 14px
        background-color: rgba(0,0,0,.2)
        font-size 10px
        color rgb(255,255,255)
        font-weight 200
        line-height 24px
        .icon-keyboard_arrow_right
          font-size 10px
          content ''
          line-height 24px
    .bulletin-wrapper
      position: relative
      line-height 28px
      height 28px
      padding 0 12px
      background-color: rgba(7,17,27,.2px)
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      .bulletin-text
        font-size 10px
        color rbg(255,255,255)
        font-weight 200px

      .gonggao
        vertical-align middle
        display inline-block
        width 22px
        height 12px
        bg-image('./img/bulletin')
        background-size 22px 12px
      .icon-keyboard_arrow_right
        position: absolute
        vertical-align middle
        top 0
        right 12px
        font-size 12px
        content ''
        line-height 24px
        margin-top 4px

    .Detail
      position: fixed
      left 0
      top 0
      width 100%
      height 100%
      background-color: rgba(7,17,27,0.8)
      z-index 100
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          font-size 16px
          font-weight:700
          color :rgb(255,255,255)
          line-height 16px
          text-align center
        .star-wrapper
          margin-top 16px
          margin-bottom 28px
          text-align center
        .title
          display flex
          width 80%
          margin 0 auto
          /*使用了flex不用担心兼容性问题，因为在vue-loader中的postcss还会帮助我们将浏览器不兼容的属性自动添加兼容*/
          .line
            flex 1
            position: relative
            top -6px
            border-bottom 1px solid rgba(255,255,255 0.2)
          .text
            font-size 14px
            font-weight 700
            color rbg(255,255,255)
            padding 0 12px
        .supports
          width 80%
          margin 24px auto 28px auto
          padding 0 12px
          box-sizing border-box
          .supports-item
            font-size 12px
            font-weight 200
            color rgb(255,255,255)
            height 16px
            .text
              line-height 16px
              padding-left 6px
            .icon
              vertical-align top
              width 16px
              height 16px
              display inline-block
              background-size 16px 16px
              &.decrease
                bg-image('./img/decrease_2')
              &.discount
                bg-image('./img/discount_2')
              &.guarantee
                bg-image('./img/guarantee_2')
              &.invoice
                bg-image('./img/invoice_2')
              &.special
                bg-image('./img/special_2')
          .supports-item+.supports-item
            margin-top 12px


        .bulletin
          width 75%
          font-size 12px
          font-weight 200
          color rgb(255,255,255)
          line-height 24px
          margin 24px 12.5% 0

    .detail-close
      position: relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      font-size 32px



</style>
