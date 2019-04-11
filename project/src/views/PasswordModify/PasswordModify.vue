<template>
<div class="password-modify">
     <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>密码修改组件</span>
     </div>

     <div class="text item">
      <el-form 
              :model="pwdmodifyForm" 
              status-icon 
              :rules="rules" 
              ref="pwdmodifyForm" 
              label-width="100px" 
              class="demo-ruleForm"
              >
              <el-form-item label="原密码" prop="password">
                <el-input type="text" v-model="pwdmodifyForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="checkPass">
                <el-input type="password" v-model="pwdmodifyForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass2">
                <el-input type="password" v-model="pwdmodifyForm.checkPass2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('')">修改</el-button>
              </el-form-item>
      </el-form>
     </div>
  
 
</el-card>
</div>
    
</template>
<script>
import { passwordReg } from '@/utils/validator';
export default {
    data(){
      const confirmPassword = (rule, value, callback) => {
        if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.pwdmodifyForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback(); //成功
      }
    }

    // 密码的自定义验证函数
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        // 非空验证
        callback(new Error("新密码不能为空")); // 错误提示
      } else if (!passwordReg(value)) {
        callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        ) // 错误提示
      } else {
        if (this.pwdmodifyForm.checkPass !== "") {
          // 如果确认密码不为空
          // 触发一致性验证
          this.$refs.pwdmodifyForm.validateField("checkPass");
        }
        callback(); // 成功回调
      }
    }
      return{
      pwdmodifyForm:{
        password:'',
        checkPass:'',
        checkPass2:''
      },
       rules:{

            //原密码
           /*  password:[
                {required:true,validator:password,trigger:'blur'},
            ], */
            //确认密码
            checkPass:[
                {required:true,validator:checkPassword,trigger:'blur'},
            ],
            //确认密码
            checkPass2:[
                {required:true,validator:confirmPassword,trigger:'blur'},
            ]
        }
      }
    }
}
</script>

<style lang="less">
@import './passwordmodify.less';
</style>