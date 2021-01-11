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
                label="标题"
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
                prop="goodsDetail"
                label="详情"
                width="300">
            </el-table-column>
            <el-table-column
                prop="goodsPrice"
                label="原价"
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
                    详情
                </el-button>
                <el-button 
                    @click.native.prevent="createSeckillRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    创建秒杀
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
                "http://localhost/goods/getGoodsPage/1/2"
            ).then((res)=>{
                if (res.data.ret) {
                    this.tableData = res.data.obj.records;
                    this.total = res.data.obj.total;
                } else {
                    this.alertError(res.data.msg);
                }
            }).catch((res) => {
                this.alertError("网络出现故障，请稍后再尝试！");
            });
        },
    methods: {
        searchRow(index, rows) {
            if (rows[index].seckillPrice == null) {
                this.alertError("该商品没有秒杀信息")
                return;
            }
            this.$router.push({
                path: "/goodsDetail",
                query: {
                    goodsId: rows[index].id
                }
            });
        },
        createSeckillRow(index, rows) {
            this.$router.push({
                path: "/createSeckillGoods",
                query: {
                    goodsId: rows[index].id,
                }
            });
        },
        page(currentPage) {
            this.$http.get(
                "http://localhost/goods/getGoodsPage/" + currentPage + "/2"
            ).then((res)=>{
                if (res.data.ret) {
                    this.tableData = res.data.obj.records;
                    this.total = res.data.obj.total;
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
    },
    data() {
      return {
        total: null,  
        tableData: null,
      }
    }
  }
</script>