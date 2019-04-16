<template>
<div class="account-manage">
    <!-- 面板 -->
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>账号管理</span>
  </div>
  <div class="text item">
    
     <el-table
      @selection-change="handleSelectionChange" 
      ref="accountTableData"
      :data="accountTableData"
      style="width: 100%">
      <!-- 选择框 -->
       <el-table-column 
       type="selection" 
       width="55">
       </el-table-column>
       <!-- 账号 -->
       <el-table-column
        prop="account"
        label="账号">
      </el-table-column>
       <!-- 用户组 -->
      <el-table-column
        prop="user_group"
        label="用户组">
      </el-table-column>

       <!-- 账号创建日期 -->
      <el-table-column label="日期">
        <template slot-scope="scope">{{scope.row.create_date | filterDate}}</template>
       </el-table-column>
       <!-- 操作 -->
         <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row.id)"
          >修改
          </el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)"
          >删除
          </el-button>
          </template>
    </el-table-column>
    </el-table>

    <!-- 修改模态框 -->
        <el-dialog width="400px" title="修改账号" :visible.sync="dialogFormVisible">
          <!-- 修改表单 -->
          <el-form :model="editForm" :rules="rules" ref="editForm">

            <!-- 账号 -->
            <el-form-item prop="account" style="width: 320px;" label="账号" :label-width="formLabelWidth">
              <el-input v-model="editForm.account" auto-complete="off"></el-input>
            </el-form-item>

            <!-- 用户组 -->
            <el-form-item prop="userGroup" label="用户组" :label-width="formLabelWidth">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
    <!-- 分页 -->
     <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[1, 3, 5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!-- 批量删除&取消选择 -->
   <div style="margin-top: 20px">
            <el-button type="danger" @click="batchDel">批量删除</el-button>
            <el-button type="success" @click="cancelSelect">取消选择</el-button>
     </div>
  </div>
</el-card>

</div>
     
</template>
<script>
import moment from 'moment';
export default {
  data(){
    return{
      accountTableData:[],
      currentPage:1,
      pageSize:3,
       total: 0, // 数据总条数
       editForm: { // 修改模态框的数据对象
        account: '',
        userGroup: ''
      },
      editId:'',//要修改的数据id
      dialogFormVisible:false,
       formLabelWidth: '100px', // 修改表单标签的宽度
      rules:{
      account:[
              {required: true, message: '账号不能为空', trigger: 'blur'}, // 非空
             {min: 3, max: 6, message: '账号长度 3~6 位', trigger: 'blur'} // 非空
         ]
      },
      
      selectedId:[]//批量删除选择id数组
      
     };
   },
   methods:{
     /* getAccountList(){
       this.request.get('/account/accountlist')
     .then(res=>{
       console.log(res);
       //把后端请求到的数据  直接赋值给accountTableDat
       this.accountTableData=res;
     })
     .catch(err=>{
       console.log(err);
       
     })
    }, */
    getAccountListByPage(){
    let params={
      currentPage:this.currentPage,
      pageSize:this.pageSize
    }
    this.request.get('/account/accountlistbypage',params)
    .then(res=>{
      let {total,data}=res;
      this.total=total;
      this.accountTableData=data;
       // 如果这一页已经没有数据了
      if(!data.length && this.currentPage !==1){
        this.currentPage-=1;
        this.getAccountListByPage();
         }
       })
       .catch(err=>{
         
         console.log(err);
         
       })

     
     
    },
     
     //删除
     handleDelete(id) {
         this.$confirm('你确定要删除嘛？','温馨提示',{
           confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then(()=>{
           this.request.get('/account/delaccount',{id})
           .then(res=>{
             //接收后端 响应数据
             let {code,reason}=res;
             if(code===0){
               //提示成功
               this.$message({
                 type:'success',
                 message:reason
               })
               //刷新列表
               this.getAccountListByPage();
             }else if(code === 1){
              this.$message.error(reason)
             }
           })
           .catch(err=>{
             console.log(err);
             
           });
         }).catch(()=>{
           this.$message({
             type:'info',
             message:'已取消删除'
           })
         })
      },
     
     //修改
     handleEdit(id){
      //显示模态框
      this.dialogFormVisible=true;
      //把要修改的id保存起来
      this.editId=id;
      //发送请求 给后端
      this.request.get('/account/editaccount',{id})
      .then(res=>{
        this.editForm.account=res[0].account;
        this.editForm.userGroup=res[0].user_group;
      })
      .catch(err=>{
        console.log(err);
        
      })
     },
     //保存修改
     saveEdit(){
       this.$refs.editForm.validate(valid=>{
       if(valid){//前端验证
       //关闭状态框
       this.dialogFormVisible=false;
       //收集参数
       let params={
         account:this.editForm.account,
         userGroup:this.editForm.userGroup,
         editId:this.editId
       }
       //发送请求把新数据和原来的id一起发送给后端
       this.request.post('/account/saveeditaccount',params)
       .then(res=>{
         //接收后端响应的数据
         let {code,reason}=res;
         if(code===0){
           //弹提示
          this.$message({
            type:'success',
            message:reason
          })
          //刷新列表
          this.getAccountListByPage()
         }else if(code===1){
           this.$message.error(reason)
         }
       })
       .catch(err=>{
         console.log(err);
         
       })
       }else{
         //不合法
         return false;
       }
     })
     },
     //批量删除
     batchDel(){
       // 如果没有选中 给出错误提示 结束函数
        if(!this.selectedId.length){
          this.$message.error('请选择以后在操作傻逼！')
          return
        }
        //优化删除体验
        this.$confirm('你确定要删除吗','温馨提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          let params={
            idArr:this.selectedId
          }
          this.request.get('/account/batchdel',params)
          .then(res=>{
            let {code,reason}=res;
            if(code===0){
              this.$message({
                type:'success',
                message:reason

        })
        this.getAccountListByPage();
            }else if(code===1){
            this.$message.error(reason)
            }
          })
          .catch(err=>{
            console.log(err);
            
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
     },
     //取消选择
     cancelSelect(){
        this.$refs.accountTableData.clearSelection()
     },
      // 当选中选择框的状态发生变化，就会触发这个函数，而且传入被选中的数据 val是一个数组
     handleSelectionChange(val){
      //获取被选中的id放入一个数组
      this.selectedId=val.map(v=>v.id);
      console.log(this.selectedId);
      
     },
     
      //每页页数改变
    handleSizeChange(val){
       this.pageSize=val;
       this.getAccountListByPage();
    },
    //改变当前页码
    handleCurrentChange(val){
    this.currentPage=val;
    this.getAccountListByPage();
    }
   },
     // 生命周期钩子函数 vue实例对象创建完成 dom还没有生成
   created(){
     this.getAccountListByPage();
   },
   filters:{
     filterDate(time){
       return moment(time).format('YYYY-MM-DD hh:mm:ss')
     }
   }


};
</script>

<style lang="less">
@import './accountmanage.less';
</style>
