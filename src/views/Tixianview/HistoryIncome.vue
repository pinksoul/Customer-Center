<template>
    <div class="wraper">
        <div class="nav" v-on:click="backClick">
            <div  style="float: left;margin-left: 15px">
                <img style="float: left;margin-top: 14px"   height="17px" src="../../images/back.png"/>
                <div style="float: left;margin-left: 5px;margin-top:1px;">返回</div>
            </div>
        </div>
        <div style="width: 100%;">
            <div style="padding-top: 10px;text-align:center;font-size: 28px;color: #2c2c2c;font-weight: bold">
                提现记录
            </div>
        </div>
        <div class="login-wraper">
            <div class="store-wraper">
                <div  class="store-list">
                    <div  v-for="(item,index) in historyList" class="store">
                        <div class="store-detail-wraper">
                            <div style="float: left;margin-top: 5px; color: #2c2c2c;font-size: 18px;">
                                状态：
                                <span v-if="item.status=== 0">审核中</span>
                                <span v-if="item.status=== 1">审核未通过</span>
                                <span v-if="item.status=== 2">审核通过</span>
                            </div>
                        </div>
                        <div style="width:100%;font-size: 14px;float: left;;margin-top: 15px">
                            <div class="titile-common" style="float: left;">
                                提现申请金额：<span>￥{{item.Price}}</span>
                            </div>
                        </div>
                        <div style="width:100%;font-size: 14px;float: left;;margin-top: 15px">
                            <div class="titile-common" style="float: left;">
                                提现申请时间：<span>{{item.CreatedTime}}</span>
                            </div>
                        </div>
                        <div style="width:100%;font-size: 14px;float: left;margin-top: 15px">
                            <div class="titile-common" style="float: left;">
                                提现单号：<span>{{item.OrderNo}}</span>
                            </div>
                        </div>
                        <div style="width:100%;font-size: 14px;float: left;margin-top: 15px">
                            <div class="titile-common" style="float: left;">
                                到账时间：<span>{{item.EstimatedTime}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 40px;width: 100%"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import  '../../util/tip/aTips'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil'
    export default {
        name: "HistoryIncome",
        data() {
            return{
                message:"",
                price:"",
                estimatedtime:"",
                createdtime:"",
                type:1,
                historyList:[],
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getApplyPresentRecord()
            })
        },
        methods:{
            backClick:function () {
                this.$router.back(-1);
            },
            getApplyPresentRecord:function () {
                Tips.loadShow('数据加载中...'); //1 显示加载框
                axios.get('/PC/GetApplyPresentRecord', {
                    params: {
                        Unid: getStore("Unid"),
                        // Unid:"12345",

                    }
                }).then(
                    this.getApplyPresentRecordResponse);
            },
            getApplyPresentRecordResponse(response) {
                Tips.loadHide();
                var that = this
                var data = response.data;
                if (data.Status === 0){
                    that.historyList = data.Data;
                }
            }

        }
    }
</script>
<style scoped>
    html,body {
        width: 100%;
        height: 100%;
    }
    .wraper {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color:#f0f0f0;
        font-size: 16px;
        overflow: auto;
        color: #000000;
    }
    .nav {
        position: relative;
        width: 100%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        font-size: 16px;
    }
    .login-wraper {
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 10px;
    }
    .store-wraper {
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 12px;
    }
    .store-list {
        width: 100%;
        position: relative;
    }
    .store {
        float: left;
        width: 100%;
        margin-bottom: 20px;
        background-color: white;
        padding-bottom: 30px;
        border-radius: 10px;
    }

    .titile-common {
        color: #4a4a4a;
        font-size: 12px;
        margin-left: 20px;
    }
    .store-detail {
        float: right;
        margin-right: 30px;
        width: 80px;
        height: 30px;
        font-size: 14px;
        color: #6200ff;
        background-color: #f0f0f0;
        line-height: 30px;
        text-align: center;
        border-radius: 10px;
        margin-bottom: 15px;

    }
    .store-detail-wraper {
        width:100%;
        font-size: 14px;
        float: left;
        margin-top: 20px;
        margin-bottom: 15px;
        height: 40px;
        border-bottom: solid #d9d9d9 1px;
        margin-left: 20px;
    }

    .right-content {
        margin-left: 15px;
        float: right;
        width:60%;
        font-size: 16px;
        color: #000000;
    }
</style>
