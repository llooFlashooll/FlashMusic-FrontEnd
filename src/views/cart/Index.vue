<template>
    <div class="cart-container">
    <el-table
    :data="cart"
    :cell-style="{ color: 'black', fontFamily: 'Helvetica', fontSize:'15px'}"
    :header-cell-style="{ background:'#f0f9eb', fontFamily:'Helvetica', fontSize:'16px'}"
    stripe
    class="cart-table">
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
                <span>¥ {{ scope.row.price }}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="个数">
            <template slot-scope="scope">
                <span>{{ scope.row.num }}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="管理">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="updateCart(scope.row.name)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteCart(scope.row.name)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="cart-info">
        <span class="cart-num"><strong>购物车数量：</strong>{{ cartnum }}</span>
        <span class="total-price"><strong>总价：</strong>¥ {{ totalprice }}</span>
        <el-button round class="pay-range" icon="el-icon-goods" @click="payCart()">支付购物车</el-button>
        <el-button round class="pay-order" icon="el-icon-message" @click="overtimeOrder()">超时订单</el-button>
    </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            cart: [],
            cartnum: 0,
            totalprice: 0
        }
    },
    methods: {
        getCart() {
            var token = "Bearer" + " " + window.localStorage.getItem("token")
            this.$axios.get("http://47.103.56.113:5000/cart", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((res) => {
                var response  = res.data;
                this.cartnum = response.cartnum
                this.totalprice = response.totalprice
                this.cart = response.data
            })
            .catch((err) => {
                console.log(err);
            })
        },
        update(name, num, token) {
            this.$axios.post("http://47.103.56.113:5000/cart/cartupdate", {
                name: name,
                num: num
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((res) => {
                var response = res.data
                if(response.code == 200) {
                    this.$message({
                        type: 'success',
                        message: response.msg
                    });
                    this.getCart();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        updateCart(name) {
            this.$prompt(
                '请输入个数', 
                '更新购物车', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
            .then(({ value }) => {
                var token = "Bearer" + " " + window.localStorage.getItem("token")
                this.update(name, value, token);
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        delete(name, token) {
            this.$axios.post("http://47.103.56.113:5000/cart/cartdel", {
                name: name
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((res) => {
                var response = res.data
                if(response.code == 200) {
                    this.$message({
                        type: 'success',
                        message: response.msg
                    });
                    this.getCart();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        deleteCart(name) {
            this.$confirm('确定将该商品移除出购物车？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                var token = "Bearer" + " " + window.localStorage.getItem("token")
                this.delete(name, token)
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        pay(token) {
            this.$axios.post("http://47.103.56.113:5000/cart/cartpayrange", {

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((res) => {
                var response = res.data
                if(response.code == 200) {
                    this.$message({
                        type: 'success',
                        message: response.msg
                    });
                    this.getCart();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        payCart() {
            this.$confirm('确定支付购物车？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                var token = "Bearer" + " " + window.localStorage.getItem("token")
                this.pay(token)
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消支付'
                });          
            });
        },
        order(token)
        {
            this.$axios.post("http://47.103.56.113:5000/cart/order", {

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((res) => {
                var response = res.data
                if(response.code == 200) {
                    this.$message({
                        type: 'success',
                        message: response.msg
                    });
                    this.getCart();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        overtimeOrder()
        {
            this.$confirm('测试超时订单', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                var token = "Bearer" + " " + window.localStorage.getItem("token")
                this.order(token)
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消测试'
                });          
            }); 
        }
    },
    created() {
        this.getCart();
    },
    mounted() {
        this.getCart();
    }
}
</script>

<style lang="stylus" scoped>
.cart-container
{
    position: relative;
    padding-left: 15%;
    padding-right: 14%;
    margin-bottom: 20px;
}

.cart-info
{
    margin-top: 20px;
}

.cart-num
{
    margin-left: 20px;
    font-size: 16px;
}

.total-price
{
    margin-left: 20px;
    font-size: 16px;
}


.pay-order
{
    float: right;
    margin-right: 20px;
}

.pay-range
{
    float: right;
}

</style>