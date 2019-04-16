<template>
<div class="password-modify">
     <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>密码修改组件</span>
     </div>

     <div class="text item">
      <el-form 
              :model="passwordMidifyForm" 
              status-icon 
              :rules="rules" 
              ref="passwordMidifyForm" 
              label-width="100px" 
              class="demo-ruleForm"
              >
              <el-form-item label="原密码" prop="oldPassword">
                <el-input type="text" v-model="passwordMidifyForm.oldPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="passwordMidifyForm.newPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkNewPassword">
                <el-input type="password" v-model="passwordMidifyForm.checkNewPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()">修改</el-button>
              </el-form-item>
      </el-form>
     </div>
  
 
</el-card>
</div>
    
</template>
<script>
import { passwordReg } from '@/utils/validator';
import local from '@/utils/local'
export default {
    data(){

    //验证旧密码
    const validatorOldPassword=(rule,value,callback)=>{
           this.request.post('/account/passwordmodify',{oldPassword:value})
           .then(res=>{
             let {code, reason}=res;
          if(code===0){
            callback()
          }else if(code===1){
            callback(new Error(reason))
          }
           })
           .catch(err=>{
             console.log(err);
             
           })
       }


     

    // 验证新密码
    const validatorNewPassword = (rule, value, callback) => {
      if (value === '') {
        // 非空验证
        callback(new Error("新密码不能为空")); // 错误提示
      } else if (!passwordReg(value)) {
        callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        ) // 错误提示
      } else {
        if (this.passwordMidifyForm.checkNewPassword !== '') {
          // 如果确认密码不为空
          // 触发一致性验证
          this.$refs.passwordMidifyForm.validateField('checkNewPassword')
        }
        callback(); // 成功回调
      }
    }

    // 验证确认新密码
        const validatorCheckNewPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认新密码'))
            } else if (value !== this.passwordMidifyForm.newPassword) {
                callback(new Error('两次密码不一致'))
            } else {
                callback()
            }
        }
      return{
       passwordMidifyForm:{
        oldPassword:'',
        newPassword:'',
        checkNewPassword:''
      },
       rules:{
                oldPassword: [
                    {required:true, validator: validatorOldPassword, trigger: 'blur'}
                ],
                newPassword: [
                    {required: true, validator: validatorNewPassword, trigger: 'blur'}
                ],
                checkNewPassword: [
                    {required: true, validator: validatorCheckNewPassword, trigger: 'blur'}
                ]
            }
      }
    },
    methods:{
       submitForm(){
         this.$refs.passwordMidifyForm.validate(valid=>{
           if(valid){
             //收集新密码
             let params={
               newPassword:this.passwordMidifyForm.newPassword
             }
             //发送请求给后端
             this.request.post('/account/savenewpassword',params)
             .then(res=>{
               //接收数据
               let {code , reason}=res;
               //判断
               if(code===0){
                 this.$message({
                   type:'success',
                   message:reason
                 })
                 //删除token
                 local.remove('rrrrr--r666')
                 //跳转到登录页面
                 this.$router.push('/login')
               }

             })
             .catch(err=>{
               console.log(err);
               
             })
           }
         })
       }
    }
}
</script>

<style lang="less">
@import './passwordmodify.less';
</style>