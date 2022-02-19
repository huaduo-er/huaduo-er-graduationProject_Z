<template>
    <div>
        <div v-show="!list">
            <div>
                <el-row>
                    <el-col :span="4">
                        <el-button>私信列表</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="dialogVisible = true">私信屏蔽列表</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="container">
                <div class="avatar"></div>
                <div>
                    <P>nickName</P>
                    <div class="massage">最后一条消息</div>
                </div>
                <div>
                    <el-button @click="list = true">私信详情</el-button>
                </div>
            </div>
        </div>
        <div class="massageDetail" v-show="list">
            <div class="top">
                <div class="icon">
                    <i class="el-icon-arrow-left" @click="list = false"></i>
                </div>
                <div class="nickName"> nickName</div>
                <div class="btn-container">
                    <el-button type="danger" size="mini">屏蔽</el-button>
                </div>
            </div>
            <div class="content">
                <div class="dialog-left">
                    <div class="chatAvatar"></div>
                    <div class="frame-left">
                        <div class="triangle"></div>
                        <span class="rotationtiao">这是一段聊天内容</span>
                    </div>
                </div>
                <div class="dialog-right">
                    <div class="frame-right">
                        <div class="triangle"></div>
                        <span class="rotationtiao">这是一段聊天内容</span>
                    </div>
                    <div class="chatAvatar"></div>
                </div>
                <div class="dialog-left">
                    <div class="chatAvatar"></div>
                    <div class="frame-left">
                        <div class="triangle"></div>
                        <span class="rotationtiao">这是一段聊天内容</span>
                    </div>
                </div>
                <div class="dialog-right">
                    <div class="frame-right">
                        <div class="triangle"></div>
                        <span class="rotationtiao">这是一段聊天内容</span>
                    </div>
                    <div class="chatAvatar"></div>
                </div>
                <div class="dialog-right">
                    <div class="frame-right">
                        <div class="triangle"></div>
                        <span class="rotationtiao">这是一段聊天内容</span>
                    </div>
                    <div class="chatAvatar"></div>
                </div>
            </div>
            <div class="bottom">
                <div class="inp-container">
                    <el-input class="inp"></el-input>
                    <el-button>发送</el-button>
                </div>
            </div>
        </div>
        <div>
            <el-dialog
                    title="屏蔽列表"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div class="blockList ">
                    <el-row align="middle" type="flex">
                        <el-col :span="6" class="avatar"></el-col>
                        <el-col :span="6">nickName</el-col>
                        <el-col :span="6">
                            <el-button @click="unblock">取消屏蔽</el-button>
                        </el-col>
                    </el-row>
                    <el-row align="middle" type="flex">
                        <el-col :span="6" class="avatar"></el-col>
                        <el-col :span="6">nickName</el-col>
                        <el-col :span="6">
                            <el-button @click="unblock">取消屏蔽</el-button>
                        </el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "PersonalCommunication",
    data() {
        return {
            dialogVisible: false,
            list: false,
            user: [{
                avatarUrl: '',
                nickName: '',
            }]
        }
    },
    methods: {
        blockList() {
            this.$confirm('确认关闭？')
        },
        unblock() {
            this.$confirm('是否取消屏蔽?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '取消屏蔽成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
    }
}

</script>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    background: #EBEDEE;
    border-radius: 10px;
    margin: 20px;
    text-align: left;

    .avatar {
        background: url("../img/avator.jpg");
        background-size: cover;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        margin: 10px 20px 10px 40px;
    }

    .massage {
        width: 300px;
    }


}

.blockList {
    .avatar {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        background: url("../img/avator.jpg");
        background-size: cover;
    }

}

.massageDetail {
    margin: 0 25px;

    .top {
        background: #EBEDEE;
        height: 40px;

        .icon {
            font-size: 25px;
            float: left;
            margin-top: 7px;
        }

        .nickName {
            line-height: 40px;
            display: inline-block;
        }

        .btn-container {
            float: right;
            display: inline-block;
            line-height: 40px;
            margin-right: 10px;
        }
    }

    .content {
        overflow: hidden;

        .dialog-left {
            display: flex;

            .chatAvatar {
                background: url("../img/avator.jpg");
                background-size: cover;
                height: 60px;
                width: 60px;
                border-radius: 50%;
                margin-top: 10px;
            }

            .frame-left {
                float: left;
                position: relative;
                padding: 0 0 0 5px;
                margin: 20px 0 0 10px;

                .triangle {
                    width: 0;
                    height: 0;
                    border-top: 5px solid transparent;
                    border-bottom: 5px solid transparent;
                    border-right: 5px solid #98E165;
                    position: absolute;
                    left: 0;
                    top: 6px;
                }

                .rotationtiao {
                    float: left;
                    padding: 5px 10px;
                    background-color: #98E165;
                    font-size: 16px;
                    border-radius: 2px;
                    height: 25px;
                }
            }
        }

        .dialog-right {
            display: flex;
            justify-content: right;

            .chatAvatar {
                background: url("../img/avator.jpg");
                background-size: cover;
                height: 60px;
                width: 60px;
                border-radius: 50%;
                margin-top: 10px;
            }

            .frame-right {
                float: right;
                position: relative;
                padding: 0 5px 0 0;
                margin: 20px 0 0 10px;

                .triangle {
                    width: 0;
                    height: 0;
                    border-top: 5px solid transparent;
                    border-bottom: 5px solid transparent;
                    border-left: 5px solid #98E165;
                    position: absolute;
                    right: 0;
                    top: 6px;
                }

                .rotationtiao {
                    float: right;
                    padding: 5px 10px;
                    background-color: #98E165;
                    font-size: 16px;
                    border-radius: 2px;
                    height: 25px;
                }
            }
        }
    }

    .bottom {
        position: absolute;
        bottom: 10px;

        .inp-container {
            display: flex;

            .inp {
                width: 900px;
            }
        }
    }

}
</style>
