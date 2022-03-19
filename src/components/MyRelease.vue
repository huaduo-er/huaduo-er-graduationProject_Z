<template>
    <div>
        <div class="big-container">
            <div class="container" v-for="(item, index) in myReleaseDes" :key="index">
                <div>
                    <div class="title">
                        <img :src=item.picName class="img"></div>
                    <div>
                        <div class="row">
                            <div>{{ item.goodsTitle }}</div>
                            <div>{{ item.goodsType }}</div>
                        </div>
                        <div>
                            <span>{{ item.createTime.substring(0, 10) }}</span>&nbsp;
                            <span>{{ item.createTime.substring(11, 19) }}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div>{{ item.goodsInfo }}</div>
                    <div>
                        <el-button size="small">修改</el-button>
                        <el-button size="small">删除</el-button>
                    </div>
                </div>
            </div>
            <div>
                <div class="message">
                    <div class="avatar"></div>
                    <div class="desc">
                        <div>
                            <span>王花朵</span>
                            <span class="fix">2022-02-09</span>
                        </div>
                        <div>想要</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyRelease",
    data() {
        return {
            myReleaseDes: [],
            userId: ''
        }
    },
    mounted() {
        this.userId = window.sessionStorage.getItem("userId")
        console.log(this.userId)
        this.myRelease();
    },
    methods: {
        myRelease() {
            this.$http.post("index/getMyGoodsList", {
                userId: 1,
            }).then(res => {
                        if (res.data.code === 200) {
                            this.myReleaseDes = res.data.data
                            console.log('发布物品', res)
                        }
                    }
            )
        }
    }
}
</script>

<style scoped lang="scss">
.big-container {
    display: flex;
    flex-wrap: wrap;

    .container {
        background: #EBEDEE;
        height: 250px;
        width: 45%;
        border-radius: 10px;
        margin: 10px 20px;
        display: flex;
        align-items: flex-start;
        text-align: left;

        .title {
            display: flex;
            align-items: center;

            .img {
                height: 120px;
                width: 120px;
                margin: 20px 20px;
            }
        }

        .row {
            display: flex;
            justify-content: space-around;
        }

        .message {
            display: flex;
            margin-left: 50px;
            margin-top: 20px;
            align-items: center;

            .avatar {
                height: 50px;
                width: 50px;
                border-radius: 50%;
                border: solid 2px blueviolet;
            }

            .desc {
                .fix {
                    margin-left: 10px;
                }
            }
        }
    }

}
</style>
