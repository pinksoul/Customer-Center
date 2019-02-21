<template>
    <div class="wraper">
        <div class="nav" >
            <img v-on:click="backClick"  style="float: left;margin-top: 10px;margin-left: 15px" height="20px" src="../../imgs/back.png"/>
            <div> <button v-on:click="actionmalluser" style="background-color:#f2f2f3;color:dodgerblue;float:right;font-size:18px;margin-right:5%;margin-top:11px;">保存</button> </div>
        </div>
        <div class="mem" style="border:0px solid red;height:12%;font-size:20px;">
            <div style="margin:8% 0 0 3%;text-align:left; ">会员资料</div>
        </div>

        <div class="middle">
            <div style="border:1px solid white;margin:0 5% 0 5%;">
            <div class="md1">
                <div class="md2">姓名</div>
                <div class="md3">
                    <input v-model="name" placeholder="请输入您的姓名" style="width: 90%;color:#c4c4c4" />
                </div>
                <div class="xuxian"></div>
            </div>

            <div class="md1">
                <div class="md2">性别</div>
                <!--<div class="md3">-->
                    <!--<input v-model="sex" placeholder="请输入您的性别" style="width: 90%;color:#c4c4c4" />-->
                <!--</div>-->
                <div style="font-size:20px;weight:bold;text-align:left;margin-left:20px;">
                    <input type="radio" v-model="sex" value="1"/><label>男</label>
                    <input type="radio" v-model="sex" value="2"/><label>女</label>
                    <!--<p>已选：{{sex}}</p>-->
                </div>
                <!--<div class="xuxian"></div>-->
            </div>

            <div class="md1">
                <div class="md2">生日</div>
                <vue-datepicker-local  v-model="birthday" format="YYYY-MM-DD"></vue-datepicker-local>
            </div>

            <div class="md1">
                <div class="md2">电话</div>
                <div class="md3">
                    <!--<input   v-model="phone" id="phone" placeholder="请输入11位手机号码" style="width: 90%;color:#c4c4c4" />-->
                    <input v-model="phone" id="phone" style="width: 90%;color:#c4c4c4"  placeholder="请输入11位手机号码"  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                </div>
                <div class="xuxian"></div>
            </div>
                <div style="width:100%;height:40px;"></div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil'
    import VueDatepickerLocal from 'vue-datepicker-local'

    export default {
        components: {
            VueDatepickerLocal
        },
        name: "Member",
        data() {
            return{
                UserInfo:{},
                name:"",
                sex:"",
                phone:"",
                birthday: new Date(),

            }
        },
        mounted: function () {
            this.$nextTick(function () {

                this.UserInfo = JSON.parse(getStore("UserInfo"));
                this.name=this.UserInfo.RealName;
                this.sex=this.UserInfo.Sex;
                this.birthday=this.UserInfo.Birthday;
                this.phone=this.UserInfo.Phone;

            })
        },
        methods: {
            showTip:function(messsage){
                Tips.open({
                    content: messsage,
                    time: 2
                });
            },

            backClick: function () {
                this.$router.back(-1);
            },
            actionmalluser:function () {
                var sex = this.sex;
                if(this.sex === 1){
                    sex=1;
                }
                else if(this.sex === 2){
                    sex=2;
                }
                if(this.name.length === null){
                    this.showTip("请输入姓名");
                    return;
                }

                if (this.phone.length !== 11 ){
                    this.showTip("手机号码输入有误!");
                        return;
                }
                    // if(isNaN(this.phone))
                    // {
                    //     this.showTip('请输入数字哦!');
                    //     return;
                    // }

                var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if(!myreg.test(this.phone)){
                    this.showTip("手机号码有误，请重填");
                    return;
                }

                this.showTip("保存成功");


                axios.post('/PC/ActionMallUser',{
                        "Unid":getStore("Unid"),
                        // "Unid":"12345",
                        "Oid":getStore("openId"),
                        "Name":this.name,
                        "TelePhone":this.phone,
                        "Sex":sex,
                        "Birthday":this.birthday.toLocaleDateString()
                    //toLocaleDateString() 方法可根据本地时间把 Date 对象的日期部分转换为字符串，并返回结果。
                }).then(this.actionmalluserResponse);

            },
            actionmalluserResponse(response) {
                var data = response.data
                if (data.Status === 0) {
                    this.showTip("保存成功!");
                    var UserInfo = data.Data;
                    // this.realname=userInfo.RealName;
                    this.name = UserInfo.RealName;
                    this.phone = UserInfo.phone;
                    this.sex = UserInfo.sex;
                    this.birthday = UserInfo.birthday;


                } else {

                    this.showTip(data.Message);
                }
            },
        }
    }
</script>

<style scoped>
    html,body{
        height:100%;
        background-color:red;
    }
    .wraper {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color:#f2f2f3;
        font-family:微软雅黑 ;
    }

    .nav{
        border:0px solid red;
        height:6%;
        /*font-size:20px;*/
    }
    .xuxian{
        border:0.4px dashed #87eddd;
    }
    .middle{
        border:0px solid red;
        background-color:white;
        border-radius:5%;
        margin:-10% 2%;
    }
    .md1{
        border:0px solid white;
        border-radius:20%;
        height:20%;
        margin:0;
        padding:0;
    }
    .md2{
        border:0px solid red;
        height:30%;
        width:15%;
        margin:8% 0 5% 0%;
        font-size:15px;
        color:dimgray;
        text-align:left;
    }
    .md3{
        border:0px solid red;
        height:20px;
        width:100%;
        text-align:left;
        margin:8% 0 3% 0%;
        font-size:18px;
    }
    .datepicker:before{
        margin-top:12px;
    }
    .datepicker{
        float:left;
        /*margin-left:-20%;*/
        margin-top:-13%;
    }



</style>
