<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                fixed
                prop="id"
                label="订单编号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="userId"
                label="用户ID"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goodsName"
                label="商品名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goodsCount"
                label="购买数量"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goodsPrice"
                label="价格"
                width="120">
            </el-table-column>
            <el-table-column
                label="支付情况"
                width="120"
                :key="isPayTips">
                <p>{{isPayTips}}</p>
            </el-table-column>
            <el-table-column
                prop="createDate"
                label="创建时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="payDate"
                label="支付时间"
                width="200"
                :key="payDate">
                <p>{{payDate}}</p>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
            <template slot-scope="scope">
                <el-button
                    @click.native.prevent="payRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    支付
                </el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        created() {
            this.orderId = this.$route.query.orderId;
            this.$http.get(
                "http://localhost/order/getOrder/" + this.orderId
            ).then((res)=>{
                if (res.data.ret) {
                    this.tableData = res.data.obj;
                    if (res.data.obj[0].status == 1) {
                        this.isPayTips = '已支付'
                    } else {
                        this.isPayTips = '未支付'
                    }
                    // 需要更新的值
                    this.seckillGoodsId = res.data.obj[0].seckillGoodsId;
                    this.payDate = res.data.obj[0].payDate;
                } else {
                    this.alertError(res.data.msg);
                }
            }).catch((res) => {
                this.alertError("网络出现故障，请稍后再尝试！");
            });
        },
        data() {
            return {
                orderId: null,
                seckillGoodsId: null,
                isPayTips: null,
                tableData: null,
                payDate: null,
            }
        },
        methods: {
            payRow(index, rows) {
                if (this.isPayTips == "已支付") {
                    this.alertSuccess("您已支付！");
                } else {
                    this.$http.get(
                        "http://localhost/order/payOrder/" + this.orderId + "/" + this.seckillGoodsId
                    ).then((res)=>{
                        if (res.data.ret) {
                            this.alertSuccess("您已支付成功！")
                            // 需要更新的值
                            this.isPayTips = '已支付'
                            this.payDate = res.data.obj
                        } else {
                            this.alertError(res.data.msg);
                        }
                    }).catch((res) => {
                        this.alertError("网络出现故障，请稍后再尝试！");
                    });
                }
            },
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
        },
    }
</script>