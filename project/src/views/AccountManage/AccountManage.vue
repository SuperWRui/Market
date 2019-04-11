<template>
<div class="account-manage">
    <!-- 面板 -->
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>账号管理</span>
  </div>
  <div class="text item">
     <el-table
     ref="mulitipleTable"
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
          @click="handleEdit(scope.$index, scope.row)"
          >修改
          </el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button>
          </template>
    </el-table-column>
    </el-table>
    <!-- 分页 -->
     <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
  <!-- 批量删除&取消选择 -->
   <div style="margin-top: 20px">
            <el-button type="danger">批量删除</el-button>
            <el-button type="success">取消选择</el-button>
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
      total:11
     };
   },
   methods:{
     //修改
     handleEdit(){
       console.log('修改吗？');
     },
     //删除
      handleDelete() {
        console.log('删除吗？')
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
   },
     // 生命周期钩子函数 vue实例对象创建完成 dom还没有生成
   created(){
     this.request.get('/account/accountlist')
     .then(res=>{
       console.log(res);
       //把后端请求到的数据  直接赋值给accountTableDat
       this.accountTableData=res;
     })
     .catch(err=>{
       console.log(err);
       
     })
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
