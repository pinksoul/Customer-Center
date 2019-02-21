<template>
    <div id="wraper" class="">
        <div class="nav" v-on:click="backClick">
            <div  style="float: left;margin-left: 15px">
                <img style="float: left;margin-top: 14px"   height="17px" src="../../images/back.png"/>
                <div style="float: left;margin-left: 5px;margin-top:3px;">返回</div>
            </div>
        </div>

        <section class="menu-wraper">
            <div style="border:0px solid red;position: relative;">
                <div style="border:0px solid red;float:left;margin-left:-45px;line-height:60px;font-size:14px;">
                    共<span style="color: red">5</span>笔订单记录
                </div>
                <div style="float: right;width: 120px;margin-top: 10px;fon-siz:：12px;">
                    <el-select v-model="value" placeholder="全部订单">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                    </el-select>

                        <!--<el-select v-model="value" placeholder="全部订单" style="font-size:12px;">-->
                        <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
                        <!--</el-option>-->
                        <!--</el-select>-->

                </div>
            </div>
        </section>
        <section>
            <div class="product-info-wraper">
                <div class="product-order-info">
                    <div class="produt-state-info">
                        状态：
                        <span style="color: #6200ff">
                        {{status}}
                     </span>
                    </div>
                    <div>
                        <span>订单号：</span>
                        <span>{{orderid}}</span>
                    </div>
                    <div style="padding-bottom: 20px;margin-top: 10px">
                        <span>订单时间：</span>
                        <span>{{createdtime}}</span>
                    </div>
                </div>
                <ul class="product-info" >
                    <li style="width: 100%;height:60px">
                        <img  style="float: left" class="product-pic" :src="imgurl" >
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px">
                            {{productname}}
                        </div>
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px;margin-top: 6px">
                            <span style="color: red">￥{{price}}</span>
                            <span style="color: red;float: right">X{{num}}</span>
                        </div>
                    </li>
                </ul>
                <div style="margin-left: 15px;padding-bottom: 50px;">
                    共<span style="color: red">2</span>,合计￥{{totalamount}}(含运费￥6)
                </div>
                <div v-on:click="lookLogisticsClick" class="cancel-order">
                    取消订单
                </div>
                <div v-on:click="lookLogisticsClick" class="accept-product">
                    支付
                </div>
            </div>
            <div class="product-info-wraper">
                <div class="product-order-info">
                    <div class="produt-state-info">
                        状态：
                        <span style="color: #6200ff">
                        已发货
                     </span>
                    </div>
                    <div>
                        <span>订单号：</span>
                        <span>{{orderid}}</span>
                    </div>
                    <div style="padding-bottom: 20px;margin-top: 10px">
                        <span>订单时间：</span>
                        <span>{{createdtime}}</span>
                    </div>
                </div>
                <ul class="product-info" >
                    <li style="width: 100%;height:60px">
                        <img  style="float: left" class="product-pic" :src="imgurl">
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px">
                            {{productname}}
                        </div>
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px;margin-top: 6px">
                            <span style="color: red">￥{{price}}</span>
                            <span style="color: red;float: right">X{{num}}</span>
                        </div>
                    </li>
                </ul>
                <div style="margin-left: 15px;padding-bottom: 50px;">
                    共<span style="color: red">2</span>,合计￥{{totalamount}}(含运费￥6)
                </div>
                <div v-on:click="lookLogisticsClick" class="accept-product">
                    查看物流
                </div>
            </div>
            <div class="product-info-wraper">
                <div class="product-order-info">
                    <div class="produt-state-info">
                        状态：
                        <span style="color: #6200ff">
                        已发贷
                     </span>
                    </div>
                    <div>
                        <span>订单号：</span>
                        <span>{{orderid}}</span>
                    </div>
                    <div style="padding-bottom: 20px;margin-top: 10px">
                        <span>订单时间：</span>
                        <span>{{createdtime}}</span>
                    </div>
                </div>
                <ul class="product-info" >
                    <li style="width: 100%;height:60px">
                        <img  style="float: left" class="product-pic" :src="imgurl">
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px">
                            {{productname}}
                        </div>
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px;margin-top: 6px">
                            <span style="color: red">￥{{price}}</span>
                            <span style="color: red;float: right">X{{num}}</span>
                        </div>
                    </li>
                </ul>
                <div style="margin-left: 15px;padding-bottom: 50px;">
                    共<span style="color: red">2</span>,合计￥{{totalamount}}(含运费￥6)
                </div>
                <div v-on:click="lookLogisticsClick" class="accept-product">
                    查看物流
                </div>
            </div>
            <div class="product-info-wraper">
                <div class="product-order-info">
                    <div class="produt-state-info">
                        状态：
                        <span style="color: #6200ff">
                        已发货
                     </span>
                    </div>
                    <div>
                        <span>订单号：</span>
                        <span>{{orderid}}</span>
                    </div>
                    <div style="padding-bottom: 20px;margin-top: 10px">
                        <span>订单时间：</span>
                        <span>{{createdtime}}</span>
                    </div>
                </div>
                <ul class="product-info" >
                    <li style="width: 100%;height:60px">
                        <img  style="float: left" class="product-pic" :src="imgurl">
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px">
                            {{productname}}
                        </div>
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px;margin-top: 6px">
                            <span style="color: red">￥{{price}}</span>
                            <span style="color: red;float: right">X{{num}}</span>
                        </div>
                    </li>
                </ul>
                <div style="margin-left: 15px;padding-bottom: 50px;">
                    共<span style="color: red">2</span>,合计￥{{totalamount}}(含运费￥6)
                </div>
                <div v-on:click="lookLogisticsClick" class="accept-product">
                    查看物流
                </div>
            </div>
            <div class="product-info-wraper">
                <div class="product-order-info">
                    <div class="produt-state-info">
                        状态：
                        <span style="color: #6200ff">
                        已发货
                     </span>
                    </div>
                    <div>
                        <span>订单号：</span>
                        <span>{{orderid}}</span>
                    </div>
                    <div style="padding-bottom: 20px;margin-top: 10px">
                        <span>订单时间：</span>
                        <span>{{createdtime}}</span>
                    </div>
                </div>
                <ul class="product-info" >
                    <li style="width: 100%;height:60px">
                        <img  style="float: left" class="product-pic" :src="imgurl">
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px">
                            {{productname}}
                        </div>
                        <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px;margin-top: 6px">
                            <span style="color: red">￥{{price}}</span>
                            <span style="color: red;float: right">X{{num}}</span>
                        </div>
                    </li>
                </ul>
                <div style="margin-left: 15px;padding-bottom: 50px;">
                    共<span style="color: red">2</span>,合计￥{{totalamount}}(含运费￥6)
                </div>
                <div v-on:click="lookLogisticsClick" class="accept-product">
                    查看物流
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "MyOrder",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '全部订单'
                }, {
                    value: '选项2',
                    label: '侍付款'
                }, {
                    value: '选项3',
                    label: '侍发货'
                }, {
                    value: '选项4',
                    label: '侍收货'
                }, {
                    value: '选项5',
                    label: '退款'
                }, {
                    value: '选项6',
                    label: '已完成'
                }],
                value: '',
                orderid:"",
                num:"",
                price:"",
                totalamount:"",
                productname:"",
                imgurl:"",
                createdtime:"",
                message:"",
            }
        },

        mounted: function () {
            this.$nextTick(function () {
                this.getorder()
            })
        },

        methods:{
            backClick:function () {
                this.$router.back(-1);
            },
            lookLogisticsClick:function () {
                this.$router.push({name: 'OrderDetail',params:{oid:'2'}});
            },
            getorder:function () {
                axios.get('/Order/GetOrderRecord',{
                    params:{
                        "Unid":getStore("Unid"),
                        // "Unid":"12345",
                        "status":"0",
                    }
                }).then(this.getorderResponse);
            },
            getorderResponse(response) {
                var data = response.Data
                if (data.Status === 0) {
                    var userInfo = data.Data;
                    // setStore("UserInfo",userInfo)
                    this.orderid = userInfo.OrderId;
                    this.num = userInfo.Num;
                    this.price=userInfo.Price;
                    this.totalamount=userInfo.TotalAmount;
                    this. productname=userInfo.productName;
                    this.imgurl=userInfo.ImgUrl;
                    this.createdtime=userInfo.CreatedTime;
                } else {

                }
            },
        }
    }
</script>
<style scoped>
    html,body{
        height: 100%;
    }
    #wraper{
        height: 100%;
        /*position: fixed;*/
        font-size: 12px;
        background-color: rgb(240,240,241);
        overflow-y: auto;
        overflow-x: hidden;
        color: #6c6c6c;
    }
    .nav {
        position: relative;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }
    /*订单选择*/
    .menu-wraper {
        border:0px solid blue;
      margin-left: 15px;
      margin-right: 15px;
      background-color: white;
      border-radius: 10px;
      height:60px;
    }
    /*产品信息*/
    .product-info-wraper {
        background-color: white;
        padding-top: 20px;
        margin: 20px 15px 15px 20px;
        border-radius: 10px;
    }
    .product-order-info {
        margin-left: 15px;
        font-size: 14px;
        border-bottom: solid 1px #d9d9d9;
    }
    .produt-state-info {
        position: absolute;
        right: 25px;
    }
    .product-info {
        position: relative;
        width: 100%;
        margin-top: 20px;
        margin-left: 15px;
        padding-bottom: 20px;
    }
    .product-pic {
        display: inline-block;
        height: 60px;
        float: left;
    }
    .accept-product {
        width: 80px;
        height: 25px;
        position: absolute;
        right: 30px;
        color: #6200ff;
        line-height: 25px;
        background-color: #f0f0f0;
        margin-top: -40px;
        text-align: center;
        border-radius: 8px;
    }
    .cancel-order {
        width: 80px;
        height: 25px;
        position: absolute;
        right: 130px;
        color: #6200ff;
        line-height: 25px;
        background-color: #f0f0f0;
        margin-top: -40px;
        text-align: center;
        border-radius: 8px;
    }
</style>
