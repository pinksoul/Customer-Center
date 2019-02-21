<template>
    <div  class="wraper">
        <div v-on:click="backClick" class="nav">
            <div  style="float: left;margin-left: 15px">
                <div style="float: left;margin-left: 5px">取消</div>
            </div>
        </div>
        <div style="width: 100%;margin-left: 20px">
            <div style="padding-top:44px;margin-left:-35px;font-size: 28px;color: #2c2c2c;font-weight: bold">
                申请提现
            </div>
            <div   style="margin-top: 12px;margin-left:-35px;">您可以提现了</div>
        </div>
        <div class="balance-wraper">
            <div class="current-balance-title">
                当前账户余额：
            </div>
            <div  class="current-balance-num">
                ￥{{balance/100}}
            </div>
            <div class="current-balance-title">
                提现金额：
            </div>
            <input v-model="mon" placeholder="0.00" class="with-draw-num" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">

            <div style="padding-bottom: 80px">
                <div v-on:click="withDrawBtnClick" style="margin-top: 30px" class="withdraw-btn">确认提现</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import  '../../util/tip/aTips'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil.js'
    export default {
        name: "Tixianview",
        data() {
            return{
                balance:"",
                mon:"",
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.UserInfo =  JSON.parse(getStore("UserInfo"))
                this.balance = this.UserInfo.Balance;

            })
        },
        methods:{
            showTip:function(messsage){
                Tips.open({
                    content: messsage,
                    time: 2
                });
            },

            backClick:function () {
                this.$router.back(-1);
            },
            withDrawBtnClick:function () {

                if(this.mon < 10){
                    this.showTip("请输入提现金额（不低于10元！）");
                    return;
                }


                if(this.balance<this.mon){
                    this.showTip("提现值大于账户余额,提现失败！")
                    return;
                }

                this.showTip("提现申请成功，请等待审核！");
                this.applyPresent();

            },


            applyPresent:function () {
                axios.post('/PC/ApplyPresent',{
                    Unid:getStore("Unid"),
                    // Unid:"12345",
                    Price:100,
                    Type:1,
                }).then(this.applyPresentResponse);
            },
            applyPresentResponse(response) {
                var data = response.data
                if (data.Status === 0) {
                    this.$router.push({name: 'WithdrawSuccess'});
                } else {
                    alert(data.Message)
                }
            },

        },
        watch: {
        },
        computed: {
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
        background-color:#f0f0f0;;
        font-size: 14px;
        overflow-y: auto;
        overflow-x: hidden;
        color: #2c2c2c;
    }
    .nav {
        position: relative;
        width: 100%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        color: #6200ff;
    }
    .balance-wraper {
        margin-top: 10%;
        margin-left: 20px;
        margin-right: 20px;
        background-color: white;
        border-radius: 10px;
    }
    .current-balance-title {
        padding-top: 20px;
        padding-left: 15px;
    }
    .current-balance-num {
        width: 100%;
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        color: #6200ff;
    }

    .with-draw-num {
        margin-top: 15px;
        height: 40px;
        margin-bottom: 20px;
        width: 100%;
        text-align: center;
        font-size: 16px;
        background-color: white;
    }
    .withdraw-btn {
        width: 80px;
        height: 30px;
        margin: 0 auto;
        color: #6200ff;
        background-color: #f0f0f0;
        line-height: 30px;
        text-align: center;
        border-radius: 6px;
    }
</style>
