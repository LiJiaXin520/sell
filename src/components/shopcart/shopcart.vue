<template>
  <div>
    <div class="shop-wrapper">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'changebg':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'changebg':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price">¥{{totalPrice}}</div>
          <div class="deliveryPrice">另需配送费{{seller.deliveryPrice}}¥元</div>
        </div>
        <div class="content-right">
          <span class="pay" :class="{'changebg':totalPrice>=seller.minPrice}">{{payDesc}}</span>
        </div>
      </div>
    </div>
    <div class="shopcart-list" v-show="fold&&totalPrice"><!--当手动控制fold为真并且价格也为真的时候显示购物车列表-->
      <div class="list-header">
        <span class="text1">购物车</span>
        <span class="text2" @click="empty">清空</span>
      </div>
      <div class="list-content" >
        <ul ref="menuList">
          <li class="food" v-for="food in selectFoods">
            <span class="food-name">{{food.name}}</span>
            <cartcontrol class="cartcontrol" :food="food"></cartcontrol>
            <span class="food-price">¥{{food.price}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  export default{
    props:{/*props中的属性如果是一个数组或者对象，需要用default方法来返回*/
        selectFoods:{
            type:Array,
            default(){
                return [
                  {
                      price:0,
                      count:0
                  }
                ];
            }
        }
    },
      data(){
        return{
            seller:{},
            fold:false
        }
      },
      methods:{
        toggleList(){
            if (!this.totalPrice){
                this.fold=false
            }else {
            this.fold=!this.fold;
             if (this.fold) {
              this.$nextTick(() => {

              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.menuList, {
                  click: true
                });
                console.log(this.$refs.menuList.clientHeight)
              } else {

                this.scroll.refresh();
              }
            });
          }
            }
        },
        /*清空所有商品*/
        empty(){
          this.selectFoods.forEach((food) => {
            food.count = 0;
          })

        },

      },
      computed:{
          totalPrice(){/*计算价格*/
              let total=0;
              this.selectFoods.forEach((food)=>{
                  total+=food.price * food.count
              });
              return total;
          },
          totalCount(){/*计算个数*/
            let count = 0;
            this.selectFoods.forEach((food) => {
              count += food.count
            });
            return count
          },
          payDesc(){/*还差多少元起送*/
          if(this.totalPrice === 0){
              return `还差¥${this.seller.minPrice}起送`
          }else if (this.totalPrice<this.seller.minPrice){
              let diff=this.seller.minPrice-this.totalPrice
              return `还差¥${diff}起送`
          }else {
              return '去结算'
          }
          }
      },
    created(){
      this.$http.get('api/seller').then((res)=>{/*请求seller数据*/
        res=res.body;
        if(res.error===0){
          this.seller= res.data;
        }
      })
    },
    components:{
      cartcontrol
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .shop-wrapper
      position: fixed
      left 0
      bottom 0
      z-index 50
      width 100%
      height 48px
      font-size 0
      .content
        display flex
        background #141d27
        height 100%
        .content-left
          flex 1
          .price,.deliveryPrice
            vertical-align top
            margin-top 12px
            line-height 24px
            display inline-block
            font-size 16px
            color: rgba(255,255,255,.4)
            font-weight 700
            padding-right 12px
            margin-right 12px
            border-right 1px solid rgba(255,255,255,.1)
          .deliveryPrice
            font-size 10px
            font-weight 200
            border:none
          .logo-wrapper
            display inline-block
            position: relative
            top -10px
            margin 0 18px
            width 58px
            height 58px
            background-color: #141d27
            border-radius 50%
            .num
              position: absolute
              right 0
              top 0
              font-size 9px
              font-weight 700
              color rgb(255,255,255)
              line-height 16px
              background-color: rgb(240,20,20)
              box-shadow 0px 4px 8px rgba(0,0,0,.4)
              border-radius 12px
              height 16px
              width 24px
              text-align center
            .logo
              width 44px
              height 44px
              border-radius 50px
              background-color: #2b343c
              margin 6px auto
              &.changebg
                background-color: rgb(0,160,220)

              .icon-shopping_cart
                display inline-block
                width 44px
                font-size 24px
                color rgba(255,255,255,.4)
                text-align center
                line-height 44px
                &.changebg
                  color rgb(255,255,255)
        .content-right
          flex 0 0 105px
          .pay
            display inline-block
            width 105px
            height 100%
            background-color:#2b333b
            font-size 12px
            line-height 48px
            text-align center
            font-weight 700
            color rgba(255,255,255,.4)
            &.changebg
              background: #00b43c
              color: #fff

    .shopcart-list
      position: fixed
      left 0
      bottom 48px
      z-index 49
      width 100%
      max-height: 316px
      overflow hidden
      .list-header
        position: relative
        height 40px
        background-color: #f3f5f7
        width 100%
        border-bottom 1px solid rgba(7,17,17,.1)
        .text1,.text2
          font-size 14px
          font-weight 200
          color: rgb(7,17,27)
          line-height 40px
          padding-left 18px
        .text2
          display inline-block
          color rgb(0,160,220)
          padding 0 18px
          position: absolute
          right 0
          top 0
          text-align center
      .list-content
        max-height: 276px
        background-color: #fff
        .food
          width auto
          margin 0 18px
          height 48px
          border-bottom 1px solid rgba(7,17,27,0.1)
          padding-top 20px

          .food-name
            font-size 14px
            color rgb(7,17,27)
            line-height 24px
            vertical-align top
          .food-price
            font-size 10px/14px
            font-weight normal/700
            color rgb(240,20,200)
            float right
            line-height 24px
            padding-right: 12px;
          .cartcontrol
            display inline-block
            float right
            z-index 100
</style>
