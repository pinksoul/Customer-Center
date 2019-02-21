<template>
    <div class="wraper">
        <div class="nav">
            <div v-on:click="backClick"style="color:blue;float:left;margin:5% 0 0 3%;font-size:18px">关闭</div>
        </div>
        <div class="top" >
            <div class="topup">
                <h1>分享有礼  轻松获利</h1>
            </div>
            <div class="topdown">
                加入魔镜合伙人
            </div>
        </div>
        <div class="mid">
            <div class="midtop">
                <div style="margin-top:5%;padding-top:10%;">三步轻松获利</div>
            </div>

            <div class="midcon">
                <div class="midcontop">

                        <div style="border:0px solid blue;float:left;width:13%;margin-top:18px"><img style="width:30px;height:30px"src="../../imgs/1.png" alt=""></div>
                        <div style="border:0px solid blue;float:left;text-align:left;width:130px;margin-top:25px;font-size:14px;">注册成为魔镜合伙人</div>
                        <div style="border:0px solid blue;float:left;width:110px;margin-top:29px;font-size:10px;color:gray;">(会员，商家，代理商)</div>
                </div>
                <div class="midcondown"style="border:0px solid blue;height:35%; background-size: cover;float:right;margin-right:8%;">
                        <img style="width:40px;height:40px"src="../../imgs/people.png" alt="">
                </div>
            </div>

            <div class="midcon">
                <div class="midcontop">
                    <div style="border:0px solid blue;float:left;width:13%;margin-top:15px;"><img style="width:30px;height:30px"src="../../imgs/1.png" alt=""></div>
                    <div style="border:0px solid blue;float:left;font-size:14px;width:248px;margin-top:22px;text-align:left;">到商城找到商品，点击“分享赚佣金”</div>
                </div>
                <div class="midcondown"style="border:0px solid blue;height:30px; background-size: cover;float:right;margin-right:8%;">
                    <img style="width:40px;height:40px" src="../../imgs/pic2.png" alt="">
                </div>
            </div>

            <div class="midcon">
                <div class="midcontop">
                        <div style="border:0px solid blue;float:left;width:13%;margin-top:15px;"><img style="width:30px;height:30px"src="../../imgs/1.png" alt=""></div>
                        <div style="border:0px solid blue;float:left;margin-top:22px;font-size:14px;">好友购买后，即可获利</div>
                </div>
                <div class="midcondown"style="border:0px solid blue;height:30px; background-size: cover;float:right;margin-right:8%;">
                    <img style="width:40px;height:40px" src="../../imgs/pic3.png" alt="">
                </div>
            </div>

        </div>
        <div class="down">
            <input type="button" class="btn" value="去商城" v-on:click="">
        </div>

    </div>
</template>

<script>
    export default {
        name: "Ques",
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
        overflow-y:scroll;
    }
    .nav {
        height: 6%;
    }
    .top{
        border:0px solid red;
        height:10%;
        margin-top:5%;
    }
    .topup{
        border:0px solid red;
        height:50%;
        font-size:23px;
        font-weight:bold;
    }
    .topdown{
        border:0px solid red;
        height:45%;
        font-size:18px;
    }
    .mid{
        border:0px dotted gray;
        border-radius:12px;
        background-color:white;
        margin:2% 4% 0 4%;
        height:70%;

    }
    .down{
        border:0px solid red;
        border-radius:12px;
        margin:2% 4% 0 4%;
        height:10%;

    }
    .btn{
        border:0px solid lightgray;
        background-color:white;
        border-radius:30px;
        width:50%;
        height:65%;
        font-size:25px;
        margin:5% auto;
    }
    .midtop{
        border:0px solid red;
        height:20%;
        font-size:22px;
    }
    .midcon{
        border:0px solid red;
        height:26%;

    }
    .midcontop{
        border:0px solid red;
        height:50%;
    }
</style>
