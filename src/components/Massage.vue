<template>
    <div>
        <div class="container">
            <div class="avatar-container">
                <div class="avatar"></div>
                <p>nickName</p>
            </div>
            <div class="massage">
                <div>
                    <el-row>
                        <el-col :span="6">留言时间</el-col>
                        <el-col :span="6">留言信息</el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Massage"
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    height: auto;
    background-color: rgb(129, 134, 134);

    .avatar-container {
        margin: 20px;

        .avatar {
            height: 80px;
            width: 80px;
            border-radius: 50%;
            border: solid 2px pink;
        }
    }

    .massage {
        width: 500px;
        margin-top: 20px;
    }
}
</style>
