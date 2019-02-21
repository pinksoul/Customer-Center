<template>
    <div class="wraper">
        <div class="nav">
            <div  style="float: left;margin-left: 15px">
                <img style="float: left;margin-top: 14px" v-on:click="backClick"  height="17px" src="../../images/back.png"/>
                <div style="float: left;margin-left: 5px">返回</div>
            </div>
        </div>
        <div style="width: 100%;">
            <div style="padding-top: 44px;font-size: 28px;color: #2c2c2c;margin-left: 15px;font-weight: bold">
                设备续费
            </div>
        </div>
        <div class="login-wraper">
            <div class="acount-wraper">
                <div v-for="item in equimentArr"  v-on:click="payFeeClick(item)" class="account">
                    <div style="font-size: 18px;color: #2c2c2c;font-weight: bold">
                        铜省级上止境上海
                    </div>
                    <div class="account-manager">
                        <div style="font-size: 12px;color: #4a4a4a;">
                            皮肤检测仪(序列号尾号{{item.SerialNoCut}})
                        </div>
                        <div style="font-size: 16px;color: #000000;">
                           租赁截止步{{item.ExpiryTime}}
                        </div>
                    </div>
                    <div class="arrow-rigth">
                        续费
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import  '../../util/tip/aTips'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil'
    export default {
        name: "PayFeeList",
        data() {
            return{
              equimentArr:[{"SerialNoCut":"ASSDF","ExpiryTime":"1989.01.03"},{"SerialNoCut":"ASGG","ExpiryTime":"1989.01.03"},
                  {"SerialNoCut":"ASSD","ExpiryTime":"1989.01.03"}]
            }
        },
        mounted: function () {
            this.$nextTick(function () {
              this.getDeviceList()
            })
        },
        methods:{
            payFeeClick:function (item) {
                setStore("PayItem",item)
                this.$router.push({name: 'PayFee',params:{cid:"2",oid:'2'}});
            },
            backClick:function () {
                this.$router.back(-1);
            },
            getDeviceListResponse(response) {
                Tips.loadHide();
                var data = response.data
                if (data.Status === 0) {
                   this.equimentArr = data.Data;
                }else {

                }
            },
            getDeviceList:function(){
                Tips.loadShow('数据加载中...'); //1 显示加载框
                axios.get('/Mob/GetDeviceList',{
               // axios.get('/PC/GetDeviceList',{
                    params:{
                        Unid:  getStore("Unid"),
                        // Unid:"12345",
                    }
                }).then(
                    this.getDeviceListResponse);
            },
        }
    }
</script>
<style scoped>
    html,body {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        overflow-x: hidden;
    }
    .wraper {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color:#f0f0f0;
        font-size: 14px;
        color: #2c2c2c;
    }
    .nav {
        position: relative;
        width: 100%;
        height: 44px;
        text-align: center;
        line-height: 44px;
    }
    .login-wraper {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        background-color: white;
        border-radius: 10px;
    }

    .acount-wraper {
        margin-top: 20px;
        margin-left: 20px;
    }
    .account {
        position: relative;
        height: 60px;
        width: 100%;
        border-bottom: solid #d9d9d9 1px;
        padding-top: 20px;
        padding-bottom: 32px;
    }

    .account-manager {
        display: inline-block;
        height: 23px;
        line-height: 23px;
        float: left;
        margin-top: 12px;
        font-size: 16px;
    }
    .arrow-rigth {
        text-align: center;
        width: 50px;
        height: 25px;
        float: right;
        font-size: 14px;
        background-color: #f0f0f0;
        margin-top: 15px;
        line-height: 25px;
        border-radius: 8px;
        color: #6200ff;
        margin-right: 10px;
    }

</style>
