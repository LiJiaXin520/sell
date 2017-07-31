<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectmenu(index,$event)"><!--3.将绑定的索引与currentIndex进行对比，如果相同，就给这个li添加current类名这样就实现了左右滚动，左侧对应项目高亮的效果-->
          <span><i  class="icon" v-show="item.type>0" :class="classMap[item.type]"></i>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" ref="foodList" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
            <div >
              <img width="57" height="57" :src="food.icon" class="icon">
            </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-show="food.description">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好频率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span  class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>

              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :selectFoods="selectFoods"></shopcart>
  </div>
  <!--<food :food="selectFood"></food>-->

</template>
<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  export default{

      data(){
        return {
            goods:[],
            listHeight:[],
            scrollY:0,
            selectedFood:{}
        }
      },
    components:{
      shopcart,
      cartcontrol,
//      food
    },
    computed:{/*2.将已经计算好高度的数组，与当前的scrollY进行比较，如果scrollY比当前这个height大并且比下一个li的高度小的话，返回当前li的索引，默认索引为0*/
      currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
              let height=this.listHeight[i];
              let height1=this.listHeight[i+1];
            if (!height1 || (this.scrollY >= height && this.scrollY < height1)) {
                //console.log(i)
              return i;
            }
          }
          return 0
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created(){
      this.classMap=['decrease','discount','guarantee','invoice','special'];
          this.$http.get('/api/goods').then((res)=>{
              res=res.body;
              if(res.error===0){
                  this.goods= res.data;
                  this.$nextTick(()=>{/*nextTick是DOM加载或更新完成的时候，计算Dom相关的属性和值得时候最安全的实在这个回调函数中操作*/
                      this._scroll();
                      this.calculateHeight();
                  })
              }
          })
    },
    methods:{
        _scroll(){
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                click:true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                probeType:3,
                click:true
              /*希望scroll在滚动的时候时时告诉我们滚动的位置，相当于一个探帧的效果*/
            })
            this.foodsScroll.on('scroll',(pos)=>{
                this.scrollY=Math.abs(Math.round(pos.y));
                //console.log(this.scrollY)/*可以拿到相对于goods来说的一个scrolltop*/
            })
        },
      /*1.获取每个li的高度，这个高度是相对于第一个li的高度，并放在数组listHeight中*/
      calculateHeight(){
            let foodlist=this.$refs.foodList;
            let height=0;
            this.listHeight.push(height);
            for(let i=0;i<foodlist.length;i++){
                let item =foodlist[i];
                 height+=item.clientHeight;
                this.listHeight.push(height)
            }
            //console.log(this.listHeight)
      },
      selectmenu(index,event){

        if(!event._constructed){
            return;
        }
        /*拿到右侧列表的所有项*/
          let foodlist=this.$refs.foodList;
          let el=foodlist[index]/*拿到当前被选中的一项*/
          this.foodsScroll.scrollToElement(el,300);/*使用foodsScroll的一个方法，arg1：要进行展示的项目，arg2:时间*/
      },

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 177px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      width 80px
      flex 0 0 80px
      background-color: #f3f5f7
      .menu-item
        display table
        width 100%
        padding 0 12px
        height 54px
        margin 0 auto
        box-sizing border-box
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          span
            border-none()
        span
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          .icon
            display inline-block
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            vertical-align top
            margin-right: 2px
            border-radius 2px solid
            &.decrease
              bg-image('./img/decrease_3')
            &.discount
              bg-image('./img/discount_3')
            &.guarantee
              bg-image('./img/guarantee_3')
            &.invoice
              bg-image('./img/invoice_3')
            &.special
              bg-image('./img/special_3')

    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height  26px
        border-left 2px solid #d9dde1
        line-height 26px
        font-size 12px
        color rgb(147,153,159)
        background-color: #f3f5f7
      .food-item
        display flex
        margin 0 18px
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .icon
          flex: 0 0 57px
        .content
          margin-left 10px
          .name
            font-size 14px
            color rgb(7,17,27);
            line-height 14px
            padding 2px 0 4px
          .desc,.extra
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            padding 4px 0
          .price
            font-size 10px/12px
            color rgb(240,20,20)
            font-weight normal/700
            line-height 24px
            .oldPrice
              color rgb(147,153,159)
              text-decoration line-through
          .cartcontrol-wrapper
            position: absolute
            right 0
            bottom 18px




</style>
