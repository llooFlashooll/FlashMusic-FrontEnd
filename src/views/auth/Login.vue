<template>

  <div class="login-container">

    <div>
      <h1 class="welcome">欢迎使用 FlashMusic</h1>
    </div>

    <h2 class="title">登录</h2>

    <el-form class="login-form">
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

        <el-form-item class="login">
            <el-button type="primary" class="form-button" v-on:click="login" round id="login">登录</el-button>
        </el-form-item>
        <el-form-item class="register">
            <el-button type="primary" class="form-button" v-on:click="toRegister" round id="register">去注册</el-button>
            <el-button type="primary" class="form-button" v-on:click="toHome" round id="forget">游客登录</el-button>
        </el-form-item>
    </el-form>


    
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "Login",
  data(){
    return {
      username:'',
      password:''
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods:{
    login: function() {
      this.loginAsync();

    },
    loginAsync: function() {
      this.$axios.post("http://47.103.56.113:5000/login",
        {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          if(res.status == 200) {
            var response = res.data
            if(response.code == -1) {
              alert(response.msg);
            }
            else {
              this.getUserDetail("545406676")
              window.localStorage.setItem('token', response.token)
              window.localStorage.setItem('loginStatu', true)
              this.setLoginStatu(true)
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.toHome();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
      
    },

    toRegister:function() {
      this.$router.replace({
        name: 'register'
      })
    },

    toHome:function () {
      this.$router.replace({
        name: 'home'
      });
    },

    // 获取个人信息
    async getUserDetail(uid) {
      try {
        let res = await this.$api.getUserDetail(uid)
        if (res.code === 200) {
          let userInfo = res.profile
          userInfo.level = res.level
          userInfo.listenSongs = res.listenSongs
          userInfo.createTime = res.createTime
          userInfo.createDays = res.createDays
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.setUserInfo(res.profile)

          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        }
      } catch (error) {
        console.log(error)
      }
    },
    ...mapMutations({
      setUserInfo: 'SET_USERINFO',
      setLoginStatu: 'SET_LOGINSTATU'
    })
  }
}
</script>

<style scoped>

.login-container {
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

.login-form {
    width: 30%;
    margin-top: 30px;
    margin-left: 35%;
}

.form-input {
  width: 80%;
}

.el-icon-user {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-s-goods {
  font-size: 25px;
  margin: 0 20px;
}

.login {
  text-align: center;
}

.register {
  text-align: center;
}
</style>