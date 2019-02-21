<template>
    <div class="wraper">
        <div class="nav">
            <img v-on:click="backClick"  style="float: left;margin-top: 10px;margin-left: 15px" height="20px" src="../../imgs/back.png"/>
        </div>
        <div class="top">
            <div class="zhuangtai">
                <div style="text-align:left;margin-left:2%;">状态： 审核中</div>
            </div>
            <div class="time">
                <div class="time1">提现申请金额：￥1200.00</div>
                <div class="time1">提现申请时间：2018.11.01 13:24</div>
                <div class="time1">提现单号：12343458</div>
            </div>

        </div>
        <div class="middle">
            <div class="zhuangtai">
                <div style="text-align:left;margin-left:2%;">状态： 审核通过</div>
            </div>
            <div class="time">
                <div class="time1">提现申请金额：￥1200.00</div>
                <div class="time1">提现申请时间：2018.11.01 13:24</div>
                <div class="time1">提现单号：12343458</div>
                <div class="time1">到账时间：2018.11.01 14：34</div>
            </div>
        </div>
        <div class="bottom">
            <div class="zhuangtai">
                <div style="text-align:left;margin-left:2%;">状态： 审核未通过</div>
            </div>
            <div class="time">
                <div class="time1">提现申请金额：￥1200.00</div>
                <div class="time1">提现申请时间：2018.11.01 13:24</div>
                <div class="time1">提现单号：12343458</div>
                <div class="time1">到账时间：2018.11.01 14：34</div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Record",
        data() {
            return{

            }
        },
        methods: {
            backClick: function () {
                this.$router.back(-1);
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
        font-size: 14px;
        font-family:微软雅黑 ;
    }
    .nav{
        height:6%;
        border-bottom:1px dotted #c0c0c0;
    }
    .top{
        border:1px solid #f2f2f3;
        height:20%;
        margin:5% 5% 0 5%;
        background-color:white;
        border-radius:12px;
    }
    .zhuangtai{
        border-bottom:1px dotted #c0c0c0;
        height:14%;
        margin-top:6%;
    }
    .time{
        border:0px solid red;
        height:40%;
        margin-top:6%;

    }
    .time1{
        float:left;
        clear:left;
        margin-top:2%;
        font-size:0.8em;
        color:darkgray;
        margin-left:2%;
    }
    .middle{
        border:1px solid #f2f2f3;
        height:23%;
        margin:5% 5% 0 5%;
        background-color:white;
        border-radius:12px;
    }
    .bottom{
        border:1px solid #f2f2f3;
        height:23%;
        margin:5% 5% 0 5%;
        background-color:white;
        border-radius:12px;
    }
</style>