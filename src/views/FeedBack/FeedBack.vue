<template>
    <div class="wraper">
        <div class="nav" v-on:click="backClick" >
            <img  style="float: left;margin-top: 13px;margin-left: 15px" height="17px" src="../../images/back.png"/>
            <div style="float: left;margin-left:2px">返回</div>
            <div style="margin-right:60px;font-size:18px;">问题反馈</div>
        </div>
        <div class="login-wraper">
            <textarea v-model="feedBackContent"  class="feed-back-textarea" placeholder="有什么能为你服务的吗？">
            </textarea>
        </div>
        <div v-on:click="submit" class="add-equitment">
            提交
        </div>
        <div style="height: 40px;width: 100%">
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import  '../../util/tip/aTips'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil'
    export default {
        name: "FeedBack",
        data(){
            return {
                feedBackContent:""
            }
        },
        methods:{
            showTip:function(messsage){
                Tips.open({
                    content: messsage,
                    time: 2
                });
            },

            backClick:function () {
                this.$router.go(-1)
            },

            submit:function () {
                this.submitFeedback()
            },

            submitFeedback:function () {
                if (this.feedBackContent.length === 0){
                    this.showTip("请填写反馈内容!")
                    return
                }else{
                    this.showTip("反馈成功！")
                    parent.window.location.href = "MyCenter"
                }




                axios.post('/PC/SubmitFeedback', {
                    Unid: getStore("Unid"),
                    // Unid:"12345",
                    Content:this.feedBackContent
                }).then(
                    this.submitFeedbackResponse);
            },
            submitFeedbackResponse(response) {
                var data = response.data
                if (data.status === 0) {
                    this.showTip(data.Message)
                } else {

                }
            },
        }
    }
</script>
<style scoped>
    html,body {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    .wraper {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color:#f0f0f0;
        font-size: 14px;
        overflow: auto;
        color: #2c2c2c;
    }
    .nav {
        position: relative;
        width: 100%;
        height: 44px;
        /*text-align: center;*/
        line-height: 44px;
    }
    .login-wraper {
        margin-top: 24px;
        margin-left: 20px;
        margin-right: 20px;
        background-color: white;
        border-radius: 10px;
    }
    .add-equitment {
        margin-left: 15px;
        margin-right: 15px;
        height: 44px;
        background-color: #6200ff;
        margin-top: 36px;
        line-height: 45px;
        text-align: center;
        border-radius: 8px;
        color: white;
    }

    .feed-back-textarea {
        margin-top: 15px;
        width: 90%;
        margin-left:5%;
        height: 250px;
    }
</style>
