<template>
    <div>
        <h1> 订单ID：{{orderId}} </h1>
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
                    console.log(res.data);
                    // this.tableData = res.data.obj;
                } else {
                    this.alertError(res.data.msg);
                }
            }).catch((res) => {
                this.alertError("网络出现故障，请稍后再尝试！");
            });
        },
        data() {
            return {
                orderId: '',
            }
        },
        methods: {

        },
    }
</script>

<style scoped>

</style>