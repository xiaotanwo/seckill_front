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
                width="150">
            </el-table-column>
            <el-table-column
                prop="goodsName"
                label="名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goodsTitle"
                label="标题"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goodsImg"
                label="图片"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goodsDetail"
                label="详情"
                width="300">
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
                fixed="right"
                label="操作"
                width="120">
            <template slot-scope="scope">
                <el-button
                    @click.native.prevent="searchRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                   查看
                </el-button>
                <el-button 
                    @click.native.prevent="createSeckillRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    设置
                </el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="2"
            :total="total"
            @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
  export default {
      created() {
            this.$http.get(
                // "http://localhost/goods/getGoodsPage" + currentPage + "/2"
                "http://localhost:7000/getGoodsPage/1/2"
            ).then((res)=>{
                if (res.data.ret) {
                    this.tableData = res.data.obj.records;
                    this.total = res.data.obj.total;
                } else {
                    this.alertError(res.data.msg);
                }
            }).catch((res) => {
                this.alertError("未知错误！");
            });
        },
    methods: {
        searchRow(index, rows) {
            this.$router.push("/goodsDetail");
            // this.$http.get(
            //     // "http://localhost/goods/getGoods/" + rows[index].id
            //     "http://localhost:7000/getGoods/" + rows[index].id
            // ).then((res)=>{
            //     console.log(res);
            //     if (res.data.ret) {
            //         alert("nihao");
            //     } else {
            //         this.alertError(res.data.msg);
            //     }
            // }).catch((res) => {
            //     this.alertError("未知错误！");
            // });
        },
        createSeckillRow(index, rows) {
            this.$router.push("/createSeckillGoods");
        },
        page(currentPage) {
            this.$http.get(
                // "http://localhost/goods/getGoodsPage" + currentPage + "/2"
                "http://localhost:7000/getGoodsPage/" + currentPage + "/2"
            ).then((res)=>{
                if (res.data.ret) {
                    this.tableData = res.data.obj.records;
                    this.total = res.data.obj.total;
                } else {
                    this.alertError(res.data.msg);
                }
            }).catch((res) => {
                this.alertError("未知错误！");
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
    },
    data() {
      return {
        total: null,  
        tableData: null,
      }
    }
  }
</script>