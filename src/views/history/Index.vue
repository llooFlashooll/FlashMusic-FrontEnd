<template>
    <div class="history-container">
        <el-table
        :data="history"
        :cell-style="{ color: 'black', fontFamily: 'Helvetica', fontSize:'15px'}"
        :header-cell-style="{ background:'#f0f9eb', fontFamily:'Helvetica', fontSize:'16px'}"
        stripe
        class="cart-table">
            <el-table-column
                label="订单支付时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.payTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="商品名">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.picUrl">
                </template>
            </el-table-column>
            <el-table-column
                label="价格">
                <template slot-scope="scope">
                    <span class="product-price">¥ {{ scope.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="个数">
                <template slot-scope="scope">
                    <span class="product-num">{{ scope.row.num }}</span>
                </template>
            </el-table-column>
        </el-table>   
    </div>
</template>

<script>

export default {
    data() {
        return {
            history: []
        }
    },
    methods: {
        getHistory()
        {
            var token = "Bearer" + " " + window.localStorage.getItem("token")
            this.$axios.get("http://47.103.56.113:5000/history", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((res) => {
                var response = res.data
                this.history = response.data
            })
            .catch((err) => {
                console.log(err);
            })
        }
    },
    created() {
        this.getHistory();
    },
    mounted() {
        this.getHistory();
    }
}
</script>

<style lang="stylus" scoped>

.history-container
{
    position: relative;
    padding-left: 15%;
    padding-right: 14%;
    margin-bottom: 20px;
}
</style>