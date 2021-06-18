<template>

  <div class="register-container">

    <div>
      <h1 class="welcome">欢迎使用 FlashMusic</h1>
    </div>

    <h2 class="title">注册</h2>

    <el-form class="register-form">
        <el-form-item>
            <i class="el-icon-position"></i>
            <el-input class="form-input" v-model="email" placeholder="邮箱">
            </el-input>
        </el-form-item>
        <el-form-item>
            <i class="el-icon-user"></i>
            <el-input class="form-input" v-model="username" placeholder="用户名">
            </el-input>
        </el-form-item>
        <el-form-item>
            <i class="el-icon-s-goods"></i>
            <el-input class="form-input" v-model="password" placeholder="密码" show-password>
            </el-input>
        </el-form-item>
        <el-form-item>
            <i class="el-icon-s-goods"></i>
            <el-input class="form-input" v-model="confirmPassword" placeholder="确认密码" show-password>
            </el-input>
        </el-form-item>

        <el-form-item class="button-group">
            <el-button type="primary" class="form-button" v-on:click="register" round id="register">注册</el-button>
            <el-button type="primary" class="form-button" v-on:click="toLogin" round id="login">去登录</el-button>
        </el-form-item>

    </el-form>


    
  </div>
</template>

<script>

export default {
  name: "Register",
  data(){
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods:{
    register: function () {
      if(this.password != this.confirmPassword) {
        alert("填写密码不一致")
      }
      else {
        this.$axios.post("http://47.103.56.113:5000/register",
          {
            email: this.email,
            username: this.username,
            password: this.password
          })
          .then((res) => {
            // console.log(res);
            var response = res.data
            if(response.code == -1) {
              alert(response.msg);
            }
            else {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.toLogin();
            }
          })
          .catch((err) => {
            console.log(err);
          })

      }
    },

    toLogin: function() {
      this.$router.replace({
        name: 'login'
      })
    }

  }
}
</script>

<style scoped>

.register-container {
    width: 100%;
    height: 100%;
    background-color: aliceblue;
}

.welcome {
    padding-top: 5%;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}


.title {
    margin-top: 5%;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
}

.register-form {
    width: 30%;
    margin-top: 30px;
    margin-left: 35%;
}

.form-input {
  width: 80%;
}

.el-icon-position {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-user {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-s-goods {
  font-size: 25px;
  margin: 0 20px;
}

.button-group {
  text-align: center;
}

</style>