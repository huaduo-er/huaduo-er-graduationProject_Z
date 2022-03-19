<template>
    <div>
        <h1>XX二手交易平台</h1>
        <div class="container">
            <!--            登录-->
            <el-card v-show="form.model===''||form.model==='login'">
                <el-form ref="form" :model="loginForm" label-width="60px">
                    <el-form-item label="账户">
                        <el-input v-model="loginForm.userPhone" placeholder="请输入手机账户"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="loginForm.userPassword" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-radio-group v-model="form.model" @change="modelChange">
                            <el-radio label="login">登录</el-radio>
                            <el-radio label="register">注册</el-radio>
                            <el-radio label="forgotPassword">忘记密码</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button @click="loginBtn">登录</el-button>
                </el-form>
            </el-card>
            <!--            注册-->
            <el-card v-show="form.model==='register'">
                <el-form ref="form" :model="form" label-width="60px">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form-item label="账户">
                                <el-input v-model="form.account" placeholder="请输入账户"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-button class="btn">获取验证码</el-button>
                        </el-col>
                    </el-row>
                    <el-form-item label="验证码">
                        <el-input v-model="form.verificationCode" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-radio-group v-model="form.model" @change="modelChange">
                            <el-radio label="login">登录</el-radio>
                            <el-radio label="register">注册</el-radio>
                            <el-radio label="forgotPassword">忘记密码</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button>注册</el-button>
                </el-form>
            </el-card>
            <!--            忘记密码-->
            <el-card v-show="form.model==='forgotPassword'">
                <el-form ref="form" :model="form" label-width="60px">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form-item label="账户">
                                <el-input v-model="form.account" placeholder="请输入账户"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-button class="btn">获取验证码</el-button>
                        </el-col>
                    </el-row>
                    <el-form-item label="验证码">
                        <el-input v-model="form.verificationCode" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-radio-group v-model="form.model" @change="modelChange">
                            <el-radio label="login">登录</el-radio>
                            <el-radio label="register">注册</el-radio>
                            <el-radio label="forgotPassword">忘记密码</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button>找回密码</el-button>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    // name: "login",
    data() {
        return {
            form: {
                account: '',
                password: '',
                model: '',
                verificationCode: ''
            },
            loginForm: {
                userPhone: '',
                userPassword: ''
            }
        }
    },
    methods: {
        modelChange() {
            this.form.account = '';
            this.form.password = '';
            this.form.verificationCode = '';
        },
        // 登录接口
        loginBtn() {
            this.$http.post("sys/sysLogin", {
                userPhone: this.loginForm.userPhone,
                userPassword: this.loginForm.userPassword
            }).then((res) => {
                if (res.data.code == 200) {
                    window.sessionStorage.setItem("token", res.data.data2);
                    window.sessionStorage.setItem("userPic", res.data.data.userPic);
                    window.sessionStorage.setItem("userId", res.data.data.userId);
                    window.sessionStorage.setItem("userPhone", res.data.data.userPhone);
                    window.sessionStorage.setItem("userName", res.data.data.userName);
                    //通过编程式导航跳转到后台主页，路由地址是home
                    this.$router.push({path: "/home"});
                }
            });
        }
    }
}
</script>


<style scoped lang="scss">
.container {
    width: 400px;
    margin: 40px auto 0;

    .btn {
        margin-left: -7px;
    }
}

</style>
