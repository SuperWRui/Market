
<template>
    <div class="top">
       <el-row :gutter="20">
        <el-col :span="20">
           <h2 class="title">
                    <i class="el-icon-menu"></i>
                    华联超市管理系统
           </h2>

        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col :span="8">
                  <!-- 头像 -->
                  <div class="avatar">
                    <img width="100%" height="100%"  :src="imgUrl" alt="">
                  </div>
            </el-col>
            <el-col :span="16">
                 <!-- 登录账号名 -->
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ account }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                                <el-dropdown-item command="b">退出系统</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
            </el-col>
            </el-row>

        </el-col>
</el-row>
    </div>
</template>

<script>
// 引入local
import local from '@/utils/local'

export default {
   data(){
       return{
           account:'',
           imgUrl: ''
       }
   },
   methods:{
    handleCommand(command){
    if(command==='a'){
       this.$router.push('/home/personal')
        
    }else if(command==='b'){
        local.remove('rrrrr--r666');
        //推出提示
        this.$message({
            type:'success',
            message:"退出成功，欢迎下次来，小东西~"
        })
        setTimeout(()=>{
        //跳到登录页面
        this.$router.push('/login')
        },1000)
    }
    },
   
  // 获取当前登录账号
        getUserInfo() {
            this.request.get('/account/accountinfo')
                .then(res => {
                    // 接收后端响应的数据
                    let {account, img_url} = res[0];
                    // 赋值给对应的变量
                    this.account = account;
                    this.imgUrl = `http://127.0.0.1:3300/${img_url}`;
                })
                .catch(err => {
                    console.log(err)
                })
        }
    
   },
   created(){
       //调用函数 
         this.getUserInfo();
   }
}
</script>

<style lang="less">
 @import './top.less';
</style>
