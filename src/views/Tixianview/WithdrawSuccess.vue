<template>
    <div  class="wraper">
        <div class="withdraw-succese-wraper">
            <div class="withdraw-tip">
              提现申请成功！
            </div>
            <div class="withdraw-tip">
              将在1~2工作日到账
            </div>
            <div v-on:click="backClick" style="margin-top: 50px" class="back">
                 好的
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: "WithdrawSuccess",
        methods: {
            backClick:function () {
               this.$router.go(-1)
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
        background-color:#f0f0f0;;
        font-size: 14px;
        overflow-y: auto;
        overflow-x: hidden;
        color: #2c2c2c;
    }
    .withdraw-succese-wraper {
        position: absolute;
        width: 80%;
        height: 180px;
        left: 50%;
        margin-left: -40%;
        top: 50%;
        margin-top: -90px;
        background-color: white;
        border-radius: 10px;
    }
    .withdraw-tip {
        width: 100%;
        text-align: center;
        margin-top: 20px;
    }
    .back {
        width: 30px;
        margin: 0 auto;
        color: #6200ff;
    }
</style>
