<template>
    <div>
        <div class="big-container">
            <div class="container">
                <div>
                    <div class="title">
                        <div class="img"></div>
                        <div>
                            <p>发布时间</p>
                            <p>类别</p>
                        </div>
                    </div>
                    <p>标题</p>
                    <div>说明</div>
                    <div>
                        <span>修改</span>
                        <span>删除</span>
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
            <div class="container">
                <div>
                    <div class="title">
                        <div class="img"></div>
                        <div>
                            <p>发布时间</p>
                            <p>类别</p>
                        </div>
                    </div>
                    <p>标题</p>
                    <div>说明</div>
                    <div>
                        <span>修改</span>
                        <span>删除</span>
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
    </div>
</template>

<script>
export default {
    name: "MyRelease"
}
</script>

<style scoped lang="scss">
.big-container {
    display: flex;

    .container {
        background: #EBEDEE;
        height: 250px;
        width: 45%;
        border-radius: 10px;
        margin: 10px 20px;
        display: flex;
        align-items: flex-start;

        .title {
            display: flex;
            align-items: center;

            .img {
                height: 100px;
                width: 100px;
                border: #2c3e50 2px solid;
                margin: 20px 20px;
            }
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
