import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyCenter   from './views/MyCenter/MyCenter.vue'
import Mingxi   from './views/Mingxi/Mingxi.vue'
import Tixianview  from './views/Tixianview/Tixianview.vue'
import WithdrawSuccess  from './views/Tixianview/WithdrawSuccess.vue'
import HistoryIncome from './views/Tixianview/HistoryIncome.vue'
import Ques   from './views/Ques/Ques.vue'
import History  from './views/History/History.vue'
import Member  from './views/Member/Member.vue'
import Record  from './views/Record/Record.vue'
import MyOrder  from './views/MyOrder/MyOrder.vue'
import OrderDetail from './views/MyOrder/OrderDetail.vue'
import FeedBack  from './views/FeedBack/FeedBack.vue'
import PayFee from './views/Payfee/PayFee.vue'
import PayPadFee from './views/Payfee/PayPadFee.vue'
import PayFeeList from './views/Payfee/PayFeeList.vue'
// import Shiyong from './views/Shiyong/Shiyong.vue'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'MyCenter',
      component: MyCenter
    },

    {
        path: '/Mingxi',
        name: 'Mingxi',
        component: Mingxi
    },
      {
          path: '/Tixianview',
          name: 'Tixianview',
          component: Tixianview
      },
      {
          path: '/HistoryIncome',
          name: 'HistoryIncome',
          component: HistoryIncome
      },
      {
          path: '/WithdrawSuccess',
          name: 'WithdrawSuccess',
          component: WithdrawSuccess
      },
      {
          path: '/Record',
          name: 'Record',
          component: Record
      },
      {
          path: '/Ques',
          name: 'Ques',
          component: Ques
      },
      {
          path: '/Member',
          name: 'Member',
          component: Member
      },
      {
          path: '/History',
          name: 'History',
          component: History
      },
      {
          path: '/MyOrder',
          name: 'MyOrder',
          component: MyOrder
      },
      {
          path: '/OrderDetail',
          name: 'OrderDetail',
          component: OrderDetail
      },
      {
          path: '/FeedBack',
          name: 'FeedBack',
          component: FeedBack
      },
      {
          path: '/PayFee',
          name: 'PayFee',
          component: PayFee
      },
      {
          path: '/PayPadFee',
          name: 'PayPadFee',
          component: PayPadFee
      },
      {
          path: '/PayFee',
          name: 'PayFeeList',
          component: PayFeeList
      },
      // {
      //     path: '/Shiyong',
      //     name: 'Shiyong',
      //     component: Shiyong
      // },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
