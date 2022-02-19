<template>
    <div class="container">
        <el-row>
            <el-col :span="2">
                <p>图片(最多上传3张，每张不超过10Mb)：</p>
            </el-col>
            <el-col :span="6">
                <div class="upload-container">
                    <el-upload
                            action="http://localhost:8099/sys/uploadPics"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :before-upload="beforeAvatarUpload"
                            ref="upload"
                            limit="3"
                            name="multipartFile"
                            :on-success="uploaded"
                            :auto-upload="false"
                            >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                  <div>
                      <input type="button" value="上传" @click="submit">
                  </div>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    
                </div>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="2">
                标题：
            </el-col>
            <el-col :span="6">
                <el-input v-model="goodsTitle" placeholder="请输入标题"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                <p>类别：</p>
            </el-col>
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
        </el-row>
        <el-row>
            <el-col :span="2">
                说明：
            </el-col>
            <el-col :span="6">
                <textarea v-model="goodsInfo" class="text"></textarea>
            </el-col>
        </el-row>
        <el-button class="btn" @click="releaseDialog">发布</el-button>
    </div>
</template>

<script>
export default {
    name: "Release",
    data() {
        return {
            goodsTitle: '',
            goodsType: [],
            typeId: '',
            goodsInfo: '',
            userId: '',
            picName: [],
        };
    },
    //页面打开
    created() {
        this.getType()
        this.getUserId()
    },
    methods: {
        releaseDialog() {//发布接口
        if(this.picName.length < 1) {
            this.$message.error("请先上传图片")
            return;
        }
        if(this.goodsTitle == '' ||  this.goodsTitle.split(" ").join("").length == 0) {
            this.$message.error("标题不能为空")
            return;
        }
        if(this.typeId == '') {
            this.$message.error("请选择类型")
            return;
        }
            this.$confirm('确认发布该物品吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post("index/addGoods",{
                    goodsTitle: this.goodsTitle,
                    typeId : this.typeId,
                    goodsInfo: this.goodsInfo,
                    userId: this.userId,
                    pics : this.picName
                }).then((res) =>{
                    if(res.data.code==200){
                        this.$message.success("发布成功")
                        location.reload()
                    }
                });
            })
        },

        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isLt2M;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        uploaded(res) {
            if(res.code == 200) {
                this.$message.success('图片上传成功')
                alert(res.data[0])
                this.picName.push(res.data[0])
               console.log(this.picName)
            }
        },
        submit(res){
            this.$refs.upload.submit();
        },

        getType() {//获取类型
            this.$http.get("index/getGoodsTypes",{}).then((res) =>{
               if(res.data.code==200){
                 this.goodsType = res.data.data
               } 
            });
        },
        getUserId() {
            this.userId = window.sessionStorage.getItem("userId")
        }

    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    margin: 10px;
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
}

</style>
<style scoped lang="scss">
.container {
    width: 600px;
    margin-left: 270px;
    text-align: left;

    .upload-container {
        display: flex;
    }

    .text {
        height: 60px;
        width: 200px;
    }

    .btn {
        margin-top: 20px;
        margin-left: 230px;
        height: 60px;
        width: 100px;
    }

}

</style>
