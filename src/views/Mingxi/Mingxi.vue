<template>
    <div  class="wraper">
        <div class="nav" v-on:click="backClick">
            <img   style="float: left;margin-top: 13px;margin-left: 15px" height="17px" src="../../images/back.png"/>
            <div style="float: left;margin-left: 5px;margin-top:2px;">返回</div>
        </div>

        <header class="header">
            <div class="history-income-wraper">
                <div>
                    <div class="income-title">
                        历史收入总额
                    </div>
                    <div class="income-num">
                        ￥{{totalamount/100}}
                    </div>
                </div>
                <div style="margin-top: 15px">
                    <div class="income-title">
                        账户余额
                    </div>
                    <div class="income-num">
                        ￥{{balance/100}}
                    </div>
                </div>
            </div>
            <div v-on:click="withdrawClick" style="margin-top: 15px;  background-color: #f0f0f0;
        border-radius: 10px;color: #2c2c2c" class="withdraw">
                我要提现
            </div>
            <div v-on:click="historyIncomeClick" style="margin-top: 10px" class="withdraw">
                提现记录
            </div>
        </header>
        <section>
            <div class="store-income-wraper clearfix">
                <div class="store-income-title">
                    返利明细
                </div>
                <div class="store-income-time">
                    共有<span style="color:#6200ff;font-size: 12px;font-family:PingFangSC-Bold;">{{totalNumber}}</span>次有效返利
                    <!--共有<span style="color:#6200ff;font-size: 12px">{{totalNumber}}</span>次有效返利-->
                </div>

                <div v-if="sid === 1" style="border:1px solid red;margin-left: 15px;width: 130px;">
                    <el-select style="margin-top: 20px" v-model="value" placeholder="所有门店">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </section>
        <section  class="income-wraper">

            <div v-for="item in details" class="income-list">
                <img style="height: 60px;margin-top: 15px;margin-bottom: 15px;margin-left:15px;float: left;border-radius: 24px"  src="../../images/user-photo.jpg"/>
                <div style="color:#6c6c6c ;font-size: 10px;float:left;margin-top: 20px;margin-left: 10px">
                    <div style="font-weight: bold;width:50px;font-size: 14px;color: #2c2c2c;text-align:left;">
                        {{item.NickName}}
                    </div>
                    <div style="margin-top: 6px;text-align:left;">
                        返利时间：
                    </div>
                    <div  style="margin-top: 6px">
                        {{item.RebateTime}}
                    </div>
                </div>
                <div style="color: #4a4a4a;font-size: 12px;float:left;margin-top: 25px;margin-left: 10px;float: right;margin-right: 10px">
                    <div>
                        消费金额： ￥{{item.ConsumePrice}}
                    </div>
                    <div style="margin-top: 15px">
                        返利金额：<span style="color: #6200ff">￥ {{item.RebatePrice}}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'
    import  '../../util/tip/aTips'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil.js'
    export default {
        name: "Mingxi",
        data(){
            return {
                // type:"",
                sid:"",
                totalamount:"",
                totalNumber:0,
                balance:"",
                details: [],
                incomeList:[],
                value:"",
                options: [{
                    value: '选项1',
                    label: '所有门店'
                }, {
                    value: '选项2',
                    label: '门店一'
                }, {
                    value: '选项3',
                    label: '门店二'
                }, {
                    value: '选项4',
                    label: '门店三'
                }
                ],
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.UserInfo =  JSON.parse(getStore("UserInfo"))
                this.nickname = this.UserInfo.NickName;
                this.headimgurl = this.UserInfo.HeadImgurl;
                this.totalamount = this.UserInfo.TotalAmount;
                this.balance = this.UserInfo.Balance;
                // this.totalnumber = this.data.totalNumber;
                this.getUserRebateList();
            })
        },
        methods:{
            backClick:function () {
                this.$router.back(-1);
            },
            // withdrawClick:function () {
            //     // var userBasicInfo =  JSON.parse(getStore("UserBasicInfo"))
            //     // this.$router.push({name: 'Tixianview', params: {Balance: UserInfo.Balance}});
            //     this.$touter.push({name:'Tixianview',})
            // },
            withdrawClick:function () {
                this.$router.push({name: 'Tixianview'});
            },
            historyIncomeClick:function () {
                this.$router.push("HistoryIncome");
            },
            getUserRebateList:function () {
                Tips.loadShow('数据加载中...'); //1 显示加载框
                axios.get('/PC/GetUserRebateList',{
                    params: {
                        Unid: getStore("Unid"),
                        // Unid:"12345",
                        Type:  0,
                        Sid:"",
                        PageIndex:1,
                        PageSize:100
                    }
                }).then(this.getUserRebateListRegResponse);
            },
            getUserRebateListRegResponse(response) {
                Tips.loadHide();
                var data = response.data;
                // alert(data);
                if (data.Status === 0){
                    this.totalNumber = data.TotalNumber;
                    this.details = data.Data.List;
                }
            }
        }
    }
</script>
<style scoped>
    .wraper {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color:#f0f0f0;;
        font-size: 14px;
        overflow-y: auto;
        color: #4a4a4a;
    }
    .nav {
        /*position: relative;*/
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }
    .store-income-wraper {
        width: 100%;
        position: relative;
        margin-top: 20px;

    }
    .store-income-title {
        float: left;
        margin-left: 20px;
        font-size: 28px;
        font-weight: bold;
        color:#2c2c2c;
        margin-top:15px;
    }
    .store-income-time {
        float: right;
        margin-right: 20px;
        font-size: 12px;
        font-weight: bold;
        margin-top: 26px;
    }
    .clearfix:after{
        content: "020";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .clearfix {
        zoom: 1;
    }
    .income-wraper {
        position: relative;
        margin-top: 30px;
        margin-left: 15px;
        margin-right: 15px;
    }
    .income-list {
        float: left;
        width: 100%;
        background-color: white;
        border-radius: 10px;
        margin-top: 5px;
    }
    .history-income-wraper {
        padding-top: 20px;
        margin-left: 5px;
        color: #ffffff;
    }
    .income-title {
        font-size: 12px;
    }
    .income-num {
        font-size: 16px;
        margin-top: 10px;

    }
    .withdraw {
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #6200ff;
        margin: 0 auto;
    }
    .header {
        margin-left: 5%;
        margin-right: 5%;
        height: 210px;
        background: url("../../images/administrator/income-bg.png") no-repeat 100% 100%;
        border-radius: 10px;
    }
</style>
