<template>
    <div class="login">
     <div class="login-wrap">
           <!-- 标题 -->
           <div class="title">
                <span class="el-icon-menu"></span>
                华联超市管理系统
           </div>
           <!-- 登录表单 -->
           <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <!-- 账号 -->
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="text" v-model="loginForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>

            </el-form>
       </div>
  </div>
</template>
<script>
/*  import {passwordReg} from '@/utils/validator'; */
import { passwordReg } from "@/utils/validator";
// 引入 local 文件
import local from '@/utils/local'
export default {
  data() {



    //确定密码自定义验证函数

    // rules: 验证规则对象 value：用户输入的值 callback: 回调函数

    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback(); //成功
      }
    };

    // 密码的自定义验证函数
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        // 非空验证
        callback(new Error("密码不能为空")); // 错误提示
      } else if (!passwordReg(value)) {
        callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        ); // 错误提示
      } else {
        if (this.loginForm.checkPass !== "") {
          // 如果确认密码不为空
          // 触发一致性验证
          this.$refs.loginForm.validateField("checkPass");
        }
        callback(); // 成功回调
      }
    }
    return {
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      rules: {
        //账号
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }, //非空
          { min: 3, max: 6, message: "账号长度3-6位", trigger: "blur" } //长度验证
        ],
        //密码
        password: [
          { required: true, validator: checkPassword, trigger: "blur" } //自定义验证
        ],
        //确认密码
        checkPass: [
          { required: true, validator: confirmPassword, trigger: "blur" } //自定义验证
        ]
      },
      
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //提交数据给后台
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };
           this.request.post('/login/checklogin',params)
            .then(res => {
                            // 接收参数
                            let {code, reason, token} = res;
                            // 判断
                            if (code === 0) { // 成功
                                // 把token存入浏览器
                                local.save('rrrrr--r666', token)

                                // 弹成功提示
                                this.$message({
                                    type: 'success',
                                    message: reason
                                })
                                // 跳后端首页
                                this.$router.push('/home')

                            } else if (code === 1) { // 失败
                                this.$message.error(reason)
                            }
                        })
           .catch(err=>{
             console.log(err);
             
           })
        } else {
          console.log("前端验证未通过！");
          return;
        }
      });
    },
    //重置
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="less">
@import "./login.less";
</style>