<template>
    <div>
        <div>
            <el-row>
                <el-row>
                    <el-col :span="6">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="请输入搜索内容"></el-input>
                    </el-col>
                </el-row>
            </el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="number"
                        label="手机号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="nickName"
                        label="昵称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="swith"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="handleClick(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    nickName: "Management",
    data() {
        return {
            options: [{
                value: '1',
                label: '禁用'
            }, {
                value: '2',
                label: '正常'
            },],
            value: '',
            tableData: [{
                number: '17815010969',
                nickName: '王花朵',
                status: '启用'
            }, {
                number: '17815010969',
                nickName: '王花朵',
                status: '启用'
            }, {
                number: '17815010969',
                nickName: '王花朵',
                status: '启用'
            }, {
                number: '17815010969',
                nickName: '王花朵',
                status: '启用'
            }],
            swith: true
        }
    }
}
</script>

<style scoped>

</style>
