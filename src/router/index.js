import ratings from  '../components/ratings/ratings.vue';
import seller from '../components/seller/seller.vue';
import goods from '../components/goods/goods.vue';

export default {
  routes:[
    {
      path:'/goods',component:goods
    },

    {
      path:'/ratings',component:ratings
    },

    {
      path:'/seller',component:seller
    },
    {
      path:'/',component:goods
    },
    {
      path:'*',component:goods
    },

  ]
}

