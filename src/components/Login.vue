<template>
  <div>
    <!-- 扩展上边界 -->
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <div class="grid-content">
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <div class="grid-content" style="background-color: rgb(179, 216, 255)">
          <!-- 扩展上边界 -->
          <el-row :gutter="20">
            <el-col :span="8" :offset="8">
              <div class="grid-content">
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="20" :offset="2">
              <div class="grid-content">
                <h1 style="color:#409EFF">
                  秒杀系统登录页面
                </h1>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="14" :offset="5">
              <div>
                <el-input placeholder="请输入手机号" v-model="input_iphone" clearable
                @keydown.enter.native="toLogin">
                </el-input>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="14" :offset="5">
              <div>
                <el-input placeholder="请输入密码" v-model="input_password" show-password
                @keydown.enter.native="toLogin">
                </el-input>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" :offset="8">
              <div class="grid-content">
                <el-button type="primary" round @click="toLogin">
                  登录 / 注册
                </el-button>
              </div>
            </el-col>
          </el-row>

          <!-- 扩展下边界 -->
          <el-row :gutter="20">
            <el-col :span="8" :offset="8">
              <div class="grid-content">
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  // 引入md5加密算法
  import md5 from 'js-md5';

  export default {
    data() {
      return {
        input_iphone: '',
        input_password: '',
        slat: '1a2b3c4d',
      }
    },
    methods: {
        toLogin() {

          if(!this.isPhoneNo(this.input_iphone)) {
            this.alertError("手机号不正确")
            return;
          }
          if(!this.truePassword(this.input_password)) {
            this.alertError("密码长度只允许6至18位!");
            return;
          }
          this.$http.post(
            // "http://localhost/user/login",
            "http://localhost:5000/login",
            {
              id: this.input_iphone,
              password: md5(this.slat[0] + this.slat[2] + this.input_password + this.slat[5] + this.slat[4]),
            }
          ).then((res)=>{
            if (res.data.ret) {
              this.$router.push("/goods")
            } else {
              this.alertError(res.data.msg);
            }
          }).catch((res) => {
              this.alertError("未知错误！");
          });
        },
        isPhoneNo(phone) {  
          var pattern = /^1[34578]\d{9}$/;  
          return pattern.test(phone);
        },
        truePassword(password) {
          return password.length >= 6 && password.length <= 18;
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
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>