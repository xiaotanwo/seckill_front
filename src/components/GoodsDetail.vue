<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                fixed
                prop="id"
                label="编号"
                width="80">
            </el-table-column>
            <el-table-column
                prop="goodsName"
                label="名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goodsTitle"
                label="原价"
                width="200">
            </el-table-column>
            <el-table-column
                prop="goodsImg"
                label="图片"
                width="200">
                <template slot-scope="scope">
            　　　　<img :src="scope.row.goodsImg" width="200" height="200" class="head_pic"/>
            　　</template>
            </el-table-column>
            <el-table-column
                prop="goodsPrice"
                label="价格"
                width="120">
            </el-table-column>
            <el-table-column
                prop="seckillPrice"
                label="秒杀价"
                width="120">
            </el-table-column>
            <el-table-column
                prop="seckillStock"
                label="数量"
                width="120">
            </el-table-column>
            <el-table-column
                prop="startDate"
                label="开始时间"
                width="120">
            </el-table-column>
            <el-table-column
                prop="endDate"
                label="结束时间"
                width="120">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
            <template slot-scope="scope">
                <el-button
                    @click.native.prevent="seckillRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    秒杀
                </el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
      created() {
            this.goodsId = this.$route.query.goodsId;
            this.$http.get(
                "http://localhost/goods/getGoods/" + this.goodsId
            ).then((res)=>{
                if (res.data.ret) {
                    this.tableData = res.data.obj;
                    this.seckillGoodsId = res.data.obj[0].seckillId;
                } else {
                    this.alertError(res.data.msg);
                }
            }).catch((res) => {
                this.alertError("未知错误！");
            });
        },
    methods: {
        seckillRow(index, rows) {
            this.$http.get(
                "http://localhost/order/createOrder/" + this.seckillGoodsId
            ).then((res)=>{
                console.log(res);
                if (res.data.ret) {
                    this.alertSuccess(res.data.msg);
                    // this.$router.push("/order");
                } else {
                    this.alertError(res.data.msg);
                }
            }).catch((res) => {
                this.alertError("网络出现故障，请稍后再尝试！");
            });
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
    data() {
      return {
          goodsId: null,
          tableData: null,
          seckillGoodsId: null,
      }
    }
  }
</script>