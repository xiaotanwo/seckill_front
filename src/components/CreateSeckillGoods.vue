<template>
    <div>
        <!-- 扩展上边界 -->
        <el-row :gutter="20">
            <el-col :span="8" :offset="8">
                <div class="grid-content">
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8" :offset="8">
                <div class="grid-content" style="background-color: rgb(179, 216, 255)">
                    <!-- 扩展上边界 -->
                    <el-row :gutter="20">
                        <el-col :span="8" :offset="8">
                        <div class="grid-content">
                        </div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="20" :offset="2">
                        <div class="grid-content">
                            <h1 style="color:#409EFF">
                            秒杀商品创建页面
                            </h1>
                        </div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="20" :offset="2">
                            <div>
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="商品编号" prop="goodsId">
                                        <el-col>
                                            <el-input v-model="ruleForm.goodsId" :disabled="true"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="秒杀价格" prop="seckillPrice">
                                        <el-col>
                                            <el-input v-model.number="ruleForm.seckillPrice" clearable></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="秒杀库存" prop="seckillStock">
                                        <el-col>
                                            <el-input v-model.number="ruleForm.seckillStock" clearable></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="开始时间" required>
                                        <el-col>
                                        <el-form-item prop="startDate">
                                            <el-date-picker type="datetime" placeholder="选择日期" 
                                                            v-model="ruleForm.startDate" style="width: 100%;"
                                                            value-format="yyyy-MM-dd HH:mm" >
                                            </el-date-picker>
                                        </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="结束时间" required>
                                        <el-col>
                                        <el-form-item prop="endDate">
                                            <el-date-picker type="datetime" placeholder="选择日期"
                                                            v-model="ruleForm.endDate" style="width: 100%;"
                                                            value-format="yyyy-MM-dd HH:mm" >
                                            </el-date-picker>
                                        </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-col :span="11">
                                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>

                    <!-- 扩展下边界 -->
                    <el-row :gutter="20">
                        <el-col :span="8" :offset="8">
                        <div class="grid-content">
                        </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        created() {
            this.ruleForm.goodsId = this.$route.query.goodsId;
        },
        methods: {
            alertError(msg) {
                this.$message.error(
                    {
                        message: msg,
                        center: true,
                    }
                );
            },
            alertSuccess(msg) {
                this.$message.success(
                    {
                        message: msg,
                        center: true,
                    }
                );
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(
                            "http://localhost/goods/insertSeckillGoods",
                            {
                                goodsId: this.ruleForm.goodsId,
                                seckillPrice: this.ruleForm.seckillPrice,
                                seckillStock: this.ruleForm.seckillStock,
                                startDate: this.$moment(this.ruleForm.startDate).format('YYYY-MM-DD HH:mm'),
                                endDate:  this.$moment(this.ruleForm.endDate).format('YYYY-MM-DD HH:mm'),
                            }
                        ).then((res)=>{
                            if (res.data.ret) {
                                this.alertSuccess("创建秒杀商品成功！正在返回商品展示页面！")
                                this.$router.push("/goods")
                            } else {
                                this.alertError(res.data.msg);
                            }
                        }).catch((res) => {
                            this.alertError("未知错误！");
                        });
                    } else {
                        this.alertError('提交的数据有误!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        data() {
            return {
                ruleForm: {
                    goodsId: '',
                    seckillPrice: '',
                    seckillStock: '',
                    startDate: '',
                    endDate: '',
                },
                rules: {
                seckillPrice: [
                    { type: 'number', required: true, message: '秒杀价格必须为数字值', trigger: 'change'}
                ],
                seckillStock: [
                    { type: 'number', required: true, message: '秒杀库存必须为数字值', trigger: 'change'}
                ],
                startDate: [
                    { required: true, message: '请选择开始日期', trigger: 'change' }
                ],
                endDate: [
                    { required: true, message: '请选择结束时间', trigger: 'change' }
                ],
                },
            }
        },
    }
</script>

<style>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>