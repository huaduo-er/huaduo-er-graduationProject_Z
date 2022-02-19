<template>
    <div>
        <div v-show="!massage && !openDes">
            <div><h1></h1></div>
            <!-- 搜索区 -->
            <div>
                <el-row>
                    <el-col :span="6">
                        <el-select v-model="typeId" placeholder="请选择类型" clearable="true">
                            <el-option
                                    v-for="item in goodsType"
                                    :key="item.typeId"
                                    :label="item.goodsType"
                                    :value="item.typeId">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" :offset="3">
                        <el-input v-model="input" placeholder="请输入搜索的内容" clearable="true"></el-input>
                    </el-col>
                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                </el-row>
            </div>
        <div><h1></h1></div>
            <!-- 展示区 -->
            <el-row :gutter="20">
                <el-col :span="22">
                    <div class="grid-content bg-purple">
                        <div class="container" v-for="(item, index) in des" :key="index">
                            <img :src=item.picName class="img" />
                            <div class="desc">
                                <div>{{ item.goodsTitle }}</div>
                                <div>
                                    <div>{{ item.goodsType }}</div>
                                    <div>{{ item.createTime }}</div>
                                    <div class="goodsInfo">{{ item.goodsInfo }}</div>
                                </div>
                                <div class="btn">
                                    <template>
                                        <el-button size="mini" class="fix" @click="msgs(item)">私信</el-button>
                                        <el-button size="mini" @click="desc(item.goodsId)">详情</el-button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- 分页 -->
            <el-pagination
                    background
                    layout="prev, pager, next"
                    page-size="3"
                    @current-change="page"
                    :total="1000">
            </el-pagination>
        </div>
        <!-- 私信 -->
        <div class="massageDetail" v-show="massage">
            <div class="top">
                <div class="icon">
                    <template>
                        <el-button size="mini" class="el-icon-arrow-left" @click="msgs2"></el-button>
                    </template>
                </div>
                <div class="nickName"> nickName</div>
                <div class="btn-container">
                    <el-button type="danger" size="mini">屏蔽</el-button>
                </div>
            </div>
            <div class="content chats">
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
            </div>
            <div class="bottom">
                <div class="inp-container">
                    <el-input v-model="chatInfo" placeholder="请输入发放内容"></el-input>
                    <el-button @click="senmsg">发送</el-button>
                </div>
            </div>
        </div>
        <!-- 详情 -->
        <div v-show="openDes">
            <div class="top">
                <div class="icon">
                    <template>
                        <el-button size="mini" class="el-icon-arrow-left" @click="chat2"></el-button>
                    </template>
                </div>
                <div class="nickName"> 详情</div>
            </div>
            <div class="content" style="overflow-y:scroll;overflow-x:hidden;height:100%">
                <div class="avatar-container">
                    <img :src=goodsInfos.userPic class="avatar" />
                    <span class="fix">{{goodsInfos.userName}}</span>
                    <span class="fix">{{goodsInfos.createTime}}</span>
                </div>
                <div class="flex">
                    <div>类别:</div>
                    <div>
                        {{goodsInfos.goodsType}}
                    </div>
                </div>
                <div class="flex fix">
                    <div>说明:</div>
                    <div>
                        {{goodsInfos.goodsInfo}}
                    </div>
                </div>
                <div class="img-bigContainer">
                    <span>图片:</span>
                    <div class="img-container" v-for="(item, index) in goodsInfos.pics" :key="index">
                        <div class="demo-image__preview">
                        <el-image 
                            style="width: 100px; height: 100px"
                            :src=item.picName
                            :preview-src-list="srcList">
                        </el-image>
                        </div>
                    </div>
                </div>
                <!--                留言板块-->
                <div class="flex fix">
                    <div>留言:</div>
                    <div class="massage-container" style="overflow-y:scroll;overflow-x:hidden;height:100%">
                        <div v-for="(item, index) in goodsInfos.msgs" :key="index">
                        <div class="massage">
                            <!-- <div class="avatar"></div> -->
                            <img :src=item.userPic class="avatar" />
                            <div>
                                <div>
                                    <span class="fix">{{item.userName}}</span>
                                    <span class="fix">{{item.createTime}}</span>
                                </div>
                                <div>{{item.msgInfo}}</div>
                            </div>
                            <div class="fix">
                                <el-button size="mini" @click="replyDialog">回复</el-button>
                                <el-button size="mini">详情</el-button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div>
                        <el-button @click="messageDialog">我要留言</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "frontPage",
    data() {
        return {
            goodsType: [],//类型下拉框
            typeId: '',//类型id
            pages: 1,//默认第一页
            limit: 3,//固定条数
            input: '',//搜索输入框
            des: [],
            userPhone: '',
            userPhone2: '',
            chat: [],//私信消息包
            chatInfo: '',
            goodsInfos: '',//详情
            massage: false,
            openDes: false,
        }
    },
    methods: {
        replyDialog() {
            this.$prompt('请输入回复内容', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
        },
        messageDialog() {
            this.$prompt('请输入留言内容', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
        },
        page(page) {//换页
            this.pages = page
            this.getGoods()
        },
        getType() {//获取类型
            this.userPhone = window.sessionStorage.getItem("userPhone")//当前登录电话
            this.$http.get("index/getGoodsTypes",{}).then((res) =>{
               if(res.data.code==200){
                 this.goodsType = res.data.data
               } 
            });
        },
        search() {//搜索
            this.page = 1
            this.$http.post("index/getGoodsList",{
                page : (this.pages - 1)*3,
                limit : this.limit,
                typeId : this.typeId,
                input : this.input
            }).then((res) =>{
               if(res.data.code==200){
                   this.$message.success('查询成功')
                   this.des = res.data.data
               }
            });
        },
        getGoods() {//获取物品
            this.$http.post("index/getGoodsList",{
                page : (this.pages -1)*3,
                limit : this.limit
            }).then((res) =>{
               if(res.data.code==200){
                   this.$message.success('查询成功')
                   this.des = res.data.data
               } 
            });
        },
        desc(goodsid) {//详情
            this.openDes = true
            this.$http.post("index/findOneGoods",{
                goodsId : goodsid,
            }).then((res) =>{
               if(res.data.code==200){
                   this.$message.success('详情查询成功')
                   this.goodsInfos = res.data.data
               } 
            });
        },
        chat2() {//详情返回
            this.openDes = false
        },
        msgs2() {//私信返回
            this.massage = false
        },
        msgs(item) {//私信
            this.massage = true
            if(item.userId == window.sessionStorage.getItem("userId")) {
                this.$message.error("私信错误")
                this.massage = false
                return
            }
            this.userPhone2 = item.userPhone
            this.creatSocket()
            
        },
        senmsg(){//私信消息发送
            // alert(this.chatInfo)
            this.$global.sendMsg(this.chatInfo)
        },
        creatSocket() {
            let that = this;
            if ("WebSocket" in window) {
                console.log("您的浏览器支持 WebSocket!");	
                //实例化websocket	 
                that.ws = new WebSocket("ws://localhost:8099/websocket/" + this.userPhone + "/" + this.userPhone2);
                        //保存设置全局websocket对象
                        that.$global.setWs(that.ws);
                        //监听websocket连接打开方法
                        that.ws.onopen = function() {
                            this.$message.success("已连接s")
                            //调用keepalive方法（不一定都需要调用此方法，可注释）
                            //that.keepAlive()
                        }
                        //监听websocket错误方法
                        that.ws.onerror = function(ev) {
                            this.$message.error("连接已出错...")
                            //延迟执行重连
                            setTimeout(() => {
                                that.creatSocket();
                            }, that.$global.delay);
                        };
                        //监听websocket关闭方法
                        that.ws.onclose = function(ev) {
                            // 关闭 websocket
                            this.$message.error("连接已关闭...")
                            //延迟执行重连
                            setTimeout(() => {
                                that.creatSocket();
                            }, that.$global.delay);
                        };
                        //监听websocket接收消息事件（接收来自服务器的实时消息）
                        that.ws.onmessage = function(res) {

                            console.log("App.vue收到服务器内容", res.data);
                            alert(res.data)
                        };
                    } else {
                        // 浏览器不支持 WebSocket
                        console.log("您的浏览器不支持 WebSocket!");
                    }
        },

    },
    //页面打开
    created() {
        this.getType()
        this.getGoods()
    }
}
</script>

<style scoped lang="scss">

    .goodsInfo {
        background-color: #80c092;
        width: 150px;
        height: 50px;
        overflow-y:scroll;
        
    }
    .chats {
        background-color: #80c092;
        width: auto;
        height: auto;
        overflow-y:scroll;
    }



    .bg-purple {
        background: #80c092;

        .container {
        display: flex;
        background: #EBEDEE;
        height: 160px;
        width: 90%;
        border-radius: 10px;
        margin: 10px 20px;
        align-items: center;

        .img {
            height: 100px;
            width: 100px;
            border: #42b983 2px solid;
            margin-left: 10px;
        }

        .desc {
            margin-left: 20px;
            width: 140px;

            .btn {
                text-align: right;

                .fix {
                    margin-right: 6px;
                }
            }
        }
    }
    }
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
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

.top {
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
    margin: 15px 20px 0;
    background-color: #d8cfcc;

    .avatar-container {
        display: flex;
        align-items: center;
        

        .avatar {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            border: solid 2px pink;
        }

        .fix {
            margin-left: 15px;
        }
    }

    .img-bigContainer {
        display: flex;
        margin-top: 15px;

        .img-container {
            display: flex;
            background-color: #98E165;
            .img {
                height: 100px;
                width: 100px;
            }
        }
    }

    .flex {
        display: flex;
        align-items: center;
        margin-left: 15px;
        // background-color: #8eb669;
        height: 120px;
        
        .fix {
            margin-left: 10px;
        }

        .massage-container {
            background: #EBEDEE;
            height: 200px !important;

            .massage {
                display: flex;
                align-items: center;
                margin-left: 15px;
                margin-top: 15px;

                .avatar {
                    height: 60px;
                    width: 60px;
                    border-radius: 50%;
                    border: 2px solid pink;
                }

                .nickName {

                }

                .fix {
                    margin-left: 10px;
                }
            }
        }

    }

    .fix {
        align-items: flex-start;
    }
}

</style>
