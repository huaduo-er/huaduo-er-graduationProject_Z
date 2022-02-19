<template>
    <div class="big-container">
        <el-container class="container">
            <el-header class="header" style="height: 80px">
                <div class="avatar-container">
                        <img :src="userPic" class="avatar" />
                    <p>{{ userName }}</p>
                </div>
                <h1>欢迎使用XX校园二手交易系统</h1>
                <div>
                    <el-button >修改密码</el-button>
                    <el-button type="warning" round>退出</el-button>
                </div>
            </el-header>
            <el-container class="wrapper">
                <el-aside class="aside" style="width: 180px">
                    <el-col>
                        <el-menu
                                :default-active="this.$route.path"
                                class="el-menu-demo"
                                router
                                @select="handleSelect">
                            <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
                                <template slot="title">
                                    <i class="el-icon-s-platform"></i>
                                    <span> {{ item.navItem }}</span>
                                </template>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            userName: '',
            userPic: '',
            components: {},
            navList: [
                {name: "/front", navItem: "首页"},
                {name: "/myRelease", navItem: "我的发布"},
                {name: "/release", navItem: "发布物品"},
                {name: "/management", navItem: "用户管理"},
                {name: "/personalCommunication", navItem: "我的私信"},
                {name: "/message", navItem: "我的留言"},
            ]
        }
    },
    created() {
        this.$router.path = '/front',
        this.getUser()
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
         getUser() {
            this.userName = window.sessionStorage.getItem("userName"),
            this.userPic = window.sessionStorage.getItem("userPic")
        }
    }
}
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}

.big-container {

    .container {
        position: absolute;
        height: 100%;
        width: 100%;

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: rgb(127, 225, 255);

            .avatar-container {
                display: flex;
                align-items: center;

                .avatar {
                    height: 65px;
                    width: 65px;
                    border-radius: 50%;
                }

                p {
                    margin-left: 10px;
                }
            }


        }

        .aside {
            
        }

        .main {
        }


    }
}


</style>

