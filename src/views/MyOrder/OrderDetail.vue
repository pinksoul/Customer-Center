<template>
    <div id="wraper" class="">
        <div class="nav">
            <div  style="float: left;margin-left: 15px">
                <img style="float: left;margin-top: 14px" v-on:click="backClick"  height="17px" src="../../images/back.png"/>
                <div style="float: left;margin-left: 5px;margin-top:3px;">返回</div>
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
                    <span>233445555555</span>
                </div>
                <div style="padding-bottom: 20px;margin-top: 10px">
                    <span>订单时间：</span>
                    <span>2018.02.21</span>
                </div>
            </div>
            <ul class="product-info" >
                <li style="width: 100%;height:60px">
                    <img  style="float: left" class="product-pic" src="../../images/product.png"/>
                    <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px">
                        这是商品这是商品这是商品这是商品这是商
                    </div>
                    <div style="float: left;width: 60%;line-height: 18px;margin-left: 6px;margin-top: 6px">
                        <span style="color: red">￥9988</span>
                        <span style="color: red;float: right">X1</span>
                    </div>
                </li>
            </ul>
            <div style="margin-left: 15px;padding-bottom: 30px;">
                共<span style="color: red">2</span>,合计￥2000(含运费￥6)
            </div>
            <div class="accept-product">
                确认收货
            </div>
        </div>
        <div class="track-rcol">
            <div class="logistics-wraper">
                <img  class="location" src="../../images/administrator/location.png"/>
                <div>
                    <span>郑莉莉</span>
                    <span style="margin-left: 20px">158123456789</span>
                </div>
                <div style="margin-top:8px;width: 80%">
                    成都市天府大道誉国际M#问问魔镜
                </div>
            </div>
            <div class="order-info-wraper">
                <div style="font-size: 18px;font-weight: bold"> 订单跟踪</div>
                <div style="margin-top: 16px">
                    <span>物流公司：</span>
                    <span >顺丰快递</span>
                </div>
                <div style="margin-top: 10px">
                    <span>物流单号：</span>
                    <span>1234567890</span>
                </div>
            </div>
            <div class="track-list">
                <ul>
                    <li class="first">
                        <i class="node-icon"> </i>
                        <span class="txt" >
                            <span>感谢您在京东购物，欢迎您再次光临！</span>
                            <div style="padding-top: 6px">2018.07.06</div>
                        </span>
                    </li>
                    <li>
                        <i class="node-icon"> </i>
                        <span class="txt">
                            <span>感谢您在京东购物，欢迎您再次光临！</span>
                            <div style="padding-top: 6px">2018.07.06</div>
                        </span>
                    </li>
                    <li>
                        <i class="node-icon"></i>
                        <span class="txt">
                            <span>感谢您在京东购物，欢迎您再次光临！</span>
                            <div style="padding-top: 6px">2018.07.06</div>
                        </span>
                    </li>
                    <li>
                        <i class="node-icon"> </i>
                        <span class="txt">
                            <span>感谢您在京东购物，欢迎您再次光临！</span>
                            <div style="padding-top: 6px">2018.07.06</div>
                        </span>

                    </li>
                    <li>
                        <i class="node-icon"> </i>
                        <span class="txt">
                            <span>感谢您在京东购物，欢迎您再次光临！</span>
                            <div style="padding-top: 6px">2018.07.06</div>
                        </span>
                    </li>
                    <li>
                        <i class="node-icon"></i>
                        <span class="txt">
                            <span>感谢您在京东购物，欢迎您再次光临！</span>
                            <div style="padding-top: 6px">2018.07.06</div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div style="width: 100%;height: 60px;background-color: white">
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "OrderDetail",
        data() {
            return{
                message:"",
                orderid:"",
                num:"",
                price:"",
                totalamount:"",
                productname:"",
                imgurl:"",
                createdtime:"",

            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.detail()
            })
        },

        methods:{
            backClick:function () {
                this.$router.back(-1);
            },
            lookLogisticsClick:function () {
                this.$router.push({name: 'OrderDetail',params:{oid:'2'}});
            },
           detail:function () {
                axios.get('/PC/GetOrderDetails',{
                    params:{
                        "Unid":getStore("Unid"),
                        // "Unid":"12345",

                    }
                }).then(this.detailResponse);
            },
            detailResponse(response) {
                var data = response.data
                if (data.status === 0) {
                    var userInfo = data.data;
                    // setStore("UserInfo",userInfo)
                    this.totalamount=userInfo.TotalAmount;
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
        position: fixed;
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
    .product-name-wraper p {
        margin-left: 15px;
        font-size: 14px;
        color: #292929;
    }
    .product-name-wraper span {
        margin-top: 8px;
        margin-left: 15px;
        display: inline-block;
        font-size: 15px;
        color: rgb(190,68,91);
    }
    .default-address-wraper ul {
        width: 100%;
        float: left;
        background-color: white;
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .default-address-wraper ul li {
        float: left;
    }
    .buy-product-list li {
        position: relative;
        margin-left: 15px;
        margin-right: 15px;
    }

    .buy-other-wraper li {
        position: relative;
        width: 100%;
        height: 42px;
        border-bottom: solid 1px rgb(239,239,239);
    }

    .transport-dot-des ul{
        position: relative;
    }
    .transport-dot-des ul li{
        position: relative;
        float: left;
        width: 30%;
    }

    .transport-dot ul {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .transport-dot li {
        float: left;
        width: 33%;
        height: 100%;
    }

    /*物流详情*/
    .track-rcol{
        margin-left: 20px;
        margin-right: 20px;
        background-color: white;
        border-bottom: 1px solid white;
        border-radius: 10px;
    }
    .track-list{
        padding-left: 5px;
        position: relative;
        margin-top:30px;

    }
    .track-list li{
        position: relative;
        padding: 0px 0 0 0px;
        line-height: 18px;
        border-left: 1px solid #d9d9d9;
        color: #999;
        margin-bottom: 40px;
        margin-left: 20px;
    }
    .track-list li .node-icon{
        position: absolute;
        left: -25px;
        top: 50%;
        height: 11px;
    }
    .node-icon{
        position: absolute;
        left: 40px;
        top: 70%;
        height: 10px;
        width: 10px;
        border-radius: 5px;
        background-color: #6200ff;
        margin-top: 25px;
        margin-left: 20px;
    }

    .track-list li.first .node-icon
    {
        background-position:0 -30px;
    }
    .track-list li .time{
        margin-right: 20px;
        position: relative;
        top: 4px;
        display: inline-block;
        vertical-align: middle;
    }
    .track-list li .txt{
        position: relative;
        top: 30px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
    }
    .track-list li.first .time{
        margin-right: 20px;
    }
    .track-list li.first .txt{
    }

    .logistics-wraper {
        margin-left: 15px;
        margin-right: 15px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 14px;
        color: #6c6c6c;
        border-bottom: solid 1px #d9d9d9;
    }

    .location {
        position: absolute;
        width: 24px;
        height: 24px;
        right: 30px;

    }

    .order-info-wraper {
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 24px;
        font-size: 12px;
        color: #2c2c2c;
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
        margin-top: -30px;
        text-align: center;
        border-radius: 8px;
    }
</style>
