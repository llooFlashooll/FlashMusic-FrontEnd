<template>
    <div class="mall-container">
        <ul class="tag-product">
        <li>
            <el-button class="product-category" @click="refreshProduct(1)">
                <img src="../../assets/images/hot_product.jpg">
                <a>热销爆品</a>
            </el-button>
        </li>
        <li>
            <el-button class="product-category" @click="refreshProduct(2)">
                <img src="../../assets/images/ip_perimeters.jpg">
                <a>IP周边</a>
            </el-button>
        </li>
        <li>
            <el-button class="product-category" @click="refreshProduct(3)">
                <img src="../../assets/images/digital_product.jpg">
                <a>数码影音</a>
            </el-button>
        </li>
        </ul>
        
        <ul class="product-list">
            <li class="product-item" v-for="(item, index) in product" :key="index">
                <img :src="item.picUrl" class="image">
                <div class="product-desc"> {{ item.name }} </div>
                <div class="product-price">
                    <span class="price">¥ {{ item.price }}</span>
                    <el-button icon="el-icon-goods" circle class="add-cart" @click="openAddCart(item.name)"></el-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    data() {
        return {
            product: [],
            CategoryId: 1
        }
    },
    methods: {
        refreshProduct(type) {
            this.CategoryId = type;
            this.getProduct(this.CategoryId);
        },
        getProduct(id) {
            this.$axios.get("http://47.103.56.113:5000/product/category", {
                params: { CategoryId: id}
            })
            .then(res => {
                // console.log(res.data);
                this.product = res.data;
            })
            .catch(err => {
                console.log(err);
            })
        },
        addCart(name, num, token) {
            this.$axios.post("http://47.103.56.113:5000/cart/cartadd", {
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
                this.$message({
                    type: 'success',
                    message: response.msg
                });
            })
            .catch((err) => {
                console.log(err);
            })
        },
        openAddCart(name) {
            this.$prompt(
                '请输入个数', 
                '加入购物车', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
            .then(({ value }) => {
                var token = "Bearer" + " " + window.localStorage.getItem("token")
                this.addCart(name, value, token);
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        }
    },
    created() {
        this.getProduct(1);
    },
    mounted() {
        this.getProduct(this.CategoryId);
    }

    
}
</script>

<style lang="stylus" scoped>
.mall-container
{
    position: relative;
    padding-left: 15%;
    margin-bottom: 20px;
}

.tag-product
{
    margin-left: 8%
}

li
{
    display: inline;
    padding-right: 30px;
}

.product-category
{
    width: 300px;
}

a
{
    font-weight: bold;
    font-size: 16px;
    padding: 20px;
}

.product-list
{
    margin-top: 5%;
    margin-right: 15%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}


.product-desc
{
    margin-top: 5px;
    font-size: 14px;
    text-align : center;
}

.product-price
{
    margin-top : 5px;
    font-weight : bold;
    font-size: 16px;
    color : red;
}

.price
{
    margin-left : 40%;
}

.add-cart
{
    margin-left : 25%;
}

</style>