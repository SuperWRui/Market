<template>
<div class="account-add">
    <!-- 面板组件 -->
  <el-card class="box-card">
      <!-- 头部 -->
    <div slot="header" class="clearfix">
    <span>添加管理员账号</span>
   
    </div>
     <!-- 列表内容 -->
     <div class="text item">
     <el-form 
                    style="width: 400px;"
                    size="small" 
                    :model="accountAddForm"
                    status-icon
                    :rules="rules"
                    ref="accountAddForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    >
                    <!-- 账号 -->
                    <el-form-item label="账号" prop="account">
                        <el-input type="text" v-model="accountAddForm.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="accountAddForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="text" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 选择用户组 -->
                    <el-form-item label="选择用户组" prop="userGroup">
                        <el-select v-model="accountAddForm.userGroup" placeholder="请选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">添加</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
     </div>
</el-card>
</div>
    
</template>
<script>
import { passwordReg } from '@/utils/validator';
import qs from 'qs';
export default {
    data(){
         //确定密码自定义验证函数

    // rules: 验证规则对象 value：用户输入的值 callback: 回调函数

    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.accountAddForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback(); //成功
      }
    }

    // 密码的自定义验证函数
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        // 非空验证
        callback(new Error("密码不能为空")); // 错误提示
      } else if (!passwordReg(value)) {
        callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        ) // 错误提示
      } else {
        if (this.accountAddForm.checkPass !== "") {
          // 如果确认密码不为空
          // 触发一致性验证
          this.$refs.accountAddForm.validateField("checkPass");
        }
        callback(); // 成功回调
      }
    }
    return{
        accountAddForm:{
             account:'',
             password:'',
             checkPass:'',
             userGroup:''
        },
        rules:{
            //账号
            account:[
                {required:true,message:'请输入账号',trigger:'blur'},
                {min:3,max:6,message:'账号长度3-6位',trigger:'blur'}
            ] ,
            //密码
            password:[
                {required:true,validator:checkPassword,trigger:'blur'},
            ],
            //确认密码
            checkPass:[
                {required:true,validator:confirmPassword,trigger:'blur'},
            ],
            //用户组
            userGroop:[
                {required:true,message:'请选择用户组',trigger:'blur'}
            ]
        }
     }
    }  ,
    methods:{
        //添加账号
        submitForm(){
          this.$refs.accountAddForm.validate(valid=>{
              if(valid){
                  let params={
                      account:this.accountAddForm.account,
                      password:this.accountAddForm.password,
                      userGroup:this.accountAddForm.userGroup
                  }

                  console.log(this.request);
                       this.request.post('/account/accountadd', params)
                        .then(res => {
                            console.log(res);
                            
                            // 获取后端响应回来的数据
                            let {code, reason} = res;    
                            // 判断
                            if (code === 0) {  // 成功
                                // 弹成功提示
                                this.$message({
                                    type: 'success',
                                    message: reason
                                })
                                // 跳转账号列表
                                this.$router.push('/home/accountmanage')

                            } else if (code === 1) { // 失败
                                // 弹失败提示
                                this.$message.error(reason)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    console.log('前端验证不通过，不允许提交！')
                    return
                }
            })
        },
        //重置
        resetForm(){
      this.$refs.accountAddForm.resetFields()
        }
    }
 
           
        
    
}
</script>

<style lang="less">
@import './accountadd.less';
</style>
