<template>
    <div class="wraper">

        <!--顶部返回导航栏-->
        <div class="nav">
            <img v-on:click="backClick"  style="float: left;margin-top: 10px;margin-left: 15px" height="20px" src="../../imgs/back.png"/>
            <div style="padding-top:12px;font-size:18px;">检测历史</div>
        </div>
        <!--功能选项栏-->
        <div class="top">
                <!--<div style="border:1px solid blue;">-->
                        <button class="btn" style="border-right:none;background-color:rgb(106,13,223);color:white;" >皮肤检测</button>
                        <button class="btn" style="border-right:none;">魔法梳</button>
                        <button class="btn" >智能文胸</button>

        </div>
        <!--下拉选项栏-->
        <div class="module">
                <div class="left">
            <el-select   placeholder="全部"  v-model="type" @change="typeChange">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
                </div>

            <div class="right">
            <el-select   placeholder="全部" v-model="checkType" @change="handlerChange">
                <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            </div>
        </div>

        <!--检验历史数据栏-->
                <!--年、月-->
        <div v-if="details != null">
        <div class="tim" v-for="year in details">
            <div class="year">{{year.Year}}年</div>
            <div v-for="month in year.Months">
                <div class="month">{{month.Month}}月</div>
                <div v-for="item in month.Data">
                    <div>
                        <!--病症检测-->
                        <div class="grade1" v-if="checkType!==1" v-show="item.Type ==1">
                            <div class="gleft" >
                                <!--上部具体时间-->
                                <div class="shijian">
                                    <a class="clock">{{item.CreatedTime}}</a>
                                </div>
                                <!--下部检测机构和内容-->
                                <div class="address">
                                    <span style="font-size:16px;color:#2c2c2c;font-family:FingFang-SC-Bold;margin-right:4px;">病症检测</span><a style="color:blue;">|</a>&nbsp;<span style="margin-left:4px;font-size:12px;color:#4a4a4a;font-family:PingFang-SC-Light;">{{item.Name}}</span>
                                </div>
                            </div>
                            <div class="gright">
                                <span style="font-size:28px;font-family:San-Francisco-Display-Bold;color:#f5115c;"></span><span style="font-size:24px;font-family:PingFang-SC-Bold;color:#f5115c;"></span>
                            </div>
                        </div>
                        <!--皮肤检测-->
                        <div class="grade" v-if="checkType!==2" v-show="item.Type ==0">
                            <div class="gleft">
                                <!--上部具体时间-->
                                <div class="shijian">
                                    <!--<span  class="data" >23日</span>--><a class="clock">{{item.CreatedTime}}</a>
                                </div>
                                <!--下部检测机构和内容-->
                                <div class="address">
                                    <span style="font-size:16px;color:#2c2c2c;font-family:FingFang-SC-Bold;margin-right:4px;">皮肤检测</span><a style="color:blue;">|</a>&nbsp;<span style="margin-left:4px;font-size:12px;color:#4a4a4a;font-family:PingFang-SC-Light;">{{item.Name}}</span>
                                </div>
                            </div>
                            <!--右部检测分数-->
                            <div class="gright">
                                <span style="font-size:28px;font-family:San-Francisco-Display-Bold;color:#f5115c;">{{item.Score}}</span><span style="font-size:24px;font-family:PingFang-SC-Bold;color:#f5115c;">分</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div  class="wu" v-if="details == null">
            暂无数据
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil'
    export default {
        name: "History",
        data() {
            return{
                options:[
                    {
                        id: '0',
                        name: '全部'
                    },
                    {
                        id: '1',
                        name: '机构'
                    },
                    {
                        id: '2',
                        name: '自测'
                    }
                ],

                options1:[
                    {
                        id: '0',
                        name: '全部'
                    },
                    {
                        id: '1',
                        name: '皮肤'
                    },
                    {
                        id: '2',
                        name: '病症'
                    }
                ],
                checkType: 0,
                type:0,
                cid:"",
                details: [],
                years:[],

            }
        },

        created(){
            //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
            this.type = this.options[0].id;
            this.checkType = this.options1[0].id;
        },
        mounted: function () {
            this.$nextTick(function () {
                this.history()
            })
            //this.checkType = 0;
        },

        methods: {
            backClick: function () {
                this.$router.back(-1);
            },
            history:function (){
                axios.get('/PC/GetCheckHistoryRecord',{
                    params:{
                        "Unid":getStore("Unid"),
                        // Unid:"12345",
                        "Type":this.type,
                        "CheckType":this.checkType,
                    }
                }).then(this.historyResponse);
            },
            historyResponse(response) {
                var data = response.data
                if (data.Status === 0) {
                    if(data.Data.length === 0 || data.Data[0].Year === 0){
                        this.details = null
                    }
                    else{
                        this.details = data.Data;
                    }

                } else {

                }
            },
            handlerChange(e) {
                this.checkType = e;
                this.history();
            },
            typeChange(e) {
                this.type = e;
                this.history();
            }
        }
    }
</script>

<style scoped>
    html,body{
        height:100%;
        background-color:#f2f2f3;
    }
    .wraper {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color:#f2f2f3;
        font-size: 14px;
        font-family:微软雅黑 ;
        overflow-y: auto;
    }
    .nav{
        border-bottom:0px dotted #c0c0c0;
        height:24px;
    }
   .left{
       border:0px solid red;
       width:120px;
       float:left;
       margin-left:20px;

   }
    .right{
        width:120px;
        border:0px solid blue;
        margin-left:160px;
    }
    .top{
        margin:30px 3% 0 3%;
    }
    .btn{
        border:1px solid rgb(106,13,223);
        width:33%;
        height:24px;
        float:left;
        margin-bottom:24px;
        font-size:13px;
        color:rgb(106,13,223);
        background-color:white;
    }
    /*button.btn:focus*/
    /*{*/
        /*background-color:rgb(98,0,255);*/
        /*color:white;*/
    /*}*/
    .module{
        height:24px;
        width:40%;
        float:left;

    }

    .tim{
        border:0px solid blue;
        height:120px;
        float:left;
        width:100%;
        text-align:left;
        margin-top:24px;
    }
    .year{
        font-family:PingFang-SC-Bold;
        font-size:15px;
        color:#2c2c2c;
        margin:0 3% 0 3%;
    }
    .month{
        border:0px solid red;
       font-family:PingFang-SC-Bold;
        font-size:18px;
        color:#2c2c2c;
        margin:0% 3% 0 3%;
        margin-top:6px;
    }
    .grade{
        border:0px solid red;
        height:70px;
        border-radius:12px;
        float:left;
        background-color:white;
        margin:0% 3% 0 3%;
    }
    .grade1{
        border:0px solid red;
        height:70px;
        border-radius:12px;
        float:left;
        background-color:white;
        margin:0% 3% 0 3%;
    }
    .gleft{
        border:0px solid yellow;
        width:70%;
        height:100%;
        float:left;

    }
    .gright{
        border:0px solid blue;
        width:80px;
        height:60%;
        float:left;
        font-size:1.5em;
        margin-top:7%;
        color:red;
    }
    .shijian{
        border:0px solid pink;
        float:left;
        width:190px;
        text-align:left;
        margin-top:14px;
        margin-left:16px;
    }

    .clock{
        color:#6c6c6c;
        font-family:PingFang-SC-Light;
        font-size:12px;
        margin-left:2px;
    }
    .address{
        border:0px solid red;
        float:left;
        margin-top:5%;
        margin-left:16px;
    }
    .wu{
        border:0px solid red;
        margin-top:50%;
        width:30%;
        height:15%;
        font-size:20px;
        margin:50% 35% 0% 35%;
    }

</style>
