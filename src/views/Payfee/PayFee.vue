<template>
    <div class="wraper">
        <div class="nav">
            <div  style="float: left;margin-left: 15px">
                <img style="float: left;margin-top: 14px" v-on:click="backClick"  height="17px" src="../../images/back.png"/>
                <div style="float: left;margin-left: 5px">返回</div>
            </div>
        </div>
        <div v-if="options.length != 0" class="login-wraper">
            <div style="width: 100%;text-align: center">
                <div style="padding-top: 24px;font-size: 28px;font-weight: bold">
                  距离到期还有
                </div>
                <div  v-if="payInfo.DeviceInfo!== null">
                    <img class="logo" width="100px" height="100px" src="../../images/circle.png">
                    <div class="days">
                        <div style="display: inline-block;font-size: 20px;font-weight: bold">
                            {{days}}
                        </div>
                        <div style="margin-left: 4px;display: inline-block;font-size: 6px;color: #000000">
                            天
                        </div>
                    </div>
                </div>
                <div  style="margin-top: 8px;margin-bottom: 64px;font-size: 10px;color: #000000">
                    序列号:{{payItem.SerialNo.slice(0,4)}}**********{{payItem.SerialNo.substr(payItem.SerialNo.length - 4,4)}}
                </div>
            </div>
            <div  v-for="(item, index) in options" v-on:click="paySelect(index)" class="pay-selected-wraper">
                <div v-if="payIndex === index" class="pay-selecte">
                   <img style="height: 18px;width: 18px;float: left;margin-top:11px;margin-left: 10px" src="../../images/meal-selected.png"/>
                    <div class="pay-money">
                        {{item.price / 100}} RMB
                    </div>
                    <div class="pay-time">
                        {{item.days}}天
                    </div>
                    <div v-if="options[0].discount !== 0" class="discount">
                        {{item.discount}}
                    </div>
                </div>
                <div  v-if="payIndex != index" class="pay-no-selected">
                    <img style="height: 9px;width: 9px;float: left;margin-top:15px;margin-left: 15px" src="../../images/meal-no-selected.png"/>
                    <div class="pay-money">
                        {{item.price /100}} RMB
                    </div>
                    <div class="pay-time">
                        {{item.days}}天
                    </div>
                    <div v-if="options[0].discount !== 0" class="discount">
                        可省￥{{item.discount}}
                    </div>
                </div>
            </div>
            <div v-on:click="payClick" class="login-btn">
                支付
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import  '../../util/tip/aTips'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil'
    import wx from 'weixin-js-sdk'
    export default {
        name: "PayFee",
        data() {
            return{
                payIndex: 0,
                payItem:{},
                payInfo:{},
                options:[],
                days:0,
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.payItem = JSON.parse(getStore("PayItem"));
                this.getScanPreRechargeCheck()
            })
        },
        methods:{
            payClick:function () {
              this.precharge()
            },
            paySelect:function (index) {
                this.payIndex = index;
            },
            backClick:function () {
                this.$router.back(-1);
            },
            getScanPreRechargeCheckResponse(response) {
                var data = response.data
                if (data.Status === 0) {
                    this.payInfo = data.Data
                    this.options = JSON.parse(data.Data.PayOptions.Options)
                    if (this.payInfo.DeviceInfo !== null) {
                        this.days = this.payInfo.DeviceInfo.ExpireDays;
                    }
                }else {

                }
            },
            //获取支付门店详情
            getScanPreRechargeCheck:function(){
                axios.get('/Mob/ScanPreRechargeCheck', {
                    params:{
                        "SerialNo":this.payItem.SerialNo,
                        "Sid":this.payItem.Sid
                    }
                }).then(
                    this.getScanPreRechargeCheckResponse);
            },
            precharge :function(){
                var payInfo = this.options[this.payIndex];
                axios.post('/Mob/Precharge', {
                    Unid:  getStore("Unid"),
                    // Unid:"12345",
                    Oid:  getStore("openId"),
                    SerialNo:this.payItem.SerialNo,
                    Days: payInfo.days,
                    Sid: this.payItem.Sid,//门店id
                    ActAmount:  payInfo.price - payInfo.discount,
                    TotalAmount: payInfo.price,
                    // Discount: payInfo.discount,
                }).then(
                    this.prechargeResponse);
            },
            prechargeResponse(response) {
                var that = this;
                var data = response.data
                if (data.Status === 0) {
                    that.wxPay(data.Data)
                }else  {
                    that.showTip(data.Message)
                }
            },
            wxPay:function (res) {
                var  that = this
                wx.chooseWXPay({
                    timestamp: res.TimeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: res.NonceStr, // 支付签名随机串，不长于 32 位
                    package: res.PackageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: res.SignType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: res.PaySign, // 支付签名
                    success: function (wResp) {
                        // 支付成功后的回调函数
                        if (wResp.errMsg == "chooseWXPay:ok") {
                            //支付成功
                            that.$router.push({name: 'Success',params:{navTitle:"支付成功",title:'支付成功',subTitle:"支付成功"}});
                        } else {

                        }

                    },
                    cancel:function(wResp){
                        //支付取消
                        // that.showTip(wResp)
                    }
                });
            },
            showTip:function(messsage){
                Tips.open({
                    content: messsage,
                    time: 3
                });
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
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }
    .login-wraper {
        margin-top: 10%;
        margin-left: 20px;
        margin-right: 20px;
        height: 80%;
        background-color: white;
        border-radius: 10px;
    }
    .logo {
        margin-top: 10px;
    }
    .days {
        position: absolute;
        width: 150px;
        left: 50%;
        margin-top: -55px;
        text-align: center;
        margin-left: -75px;
        color: #2c2c2c;
    }
    .pay-selected-wraper {
        margin-left: 20px;
        margin-right: 20px;
    }
    .pay-selecte {
        position: relative;
        width: 100%;
        height: 40px;
        background-color: #614fff;
        border-radius: 10px;
    }

    .pay-no-selected {
        position: relative;
        width: 100%;
        height: 40px;
        border-radius: 10px;
    }
    .pay-money {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 15px;
    }
    .pay-time {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 15px;
    }
    .discount {
        float: right;
        margin-right: 15px;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #c4c4c4;
    }

    .login-btn {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        height: 40px;
        background-color: #8235fd;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        border-radius: 10px;
    }
</style>
