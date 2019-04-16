<template>
  <div class="goods-manage">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!-- 查询 -->
        <div>
          <el-form  size="mini" :inline="true" :model="searchForm" class="demo-form-inline">
            <!-- 分类 -->
            <el-form-item label="选择分类" prop="cateName">
                <el-select v-model="searchForm.cateName" placeholder="请选择分类">
                <el-option label="全部" value="全部"></el-option>
                <el-option label="电子类" value="电子类"></el-option>
                <el-option label="烟酒类" value="烟酒类"></el-option>
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="服装类" value="服装类"></el-option>
                <el-option label="蔬菜类" value="蔬菜类"></el-option>
                </el-select>
            </el-form-item>
            <!-- 关键字 -->
            <el-form-item label="关键字">
              <el-input v-model="searchForm.keyword" placeholder="商品名称或条形码"></el-input>
            </el-form-item>
            <!-- 查询按钮 -->
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-table @selection-change="handleSelectionChange" ref="goodsTableData" :data="goodsTableData" tooltip-effect="dark" style="width: 100%">
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 商品条形码 -->
          <el-table-column prop="barCode" label="商品条形码"></el-table-column>

          <!-- 商品名称 -->
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>

          <!-- 所属分类 -->
          <el-table-column prop="cateName" label="所属分类"></el-table-column>

          <!-- 售价 -->
          <el-table-column prop="salePrice" label="售价"></el-table-column>

          <!-- 是否促销 -->
          <el-table-column prop="promotion" label="是否促销"></el-table-column>

          <!-- 库存 -->
          <el-table-column prop="goodsNum" label="库存"></el-table-column>
          
          <!-- 账号创建日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>


        </el-table>

        <!-- 修改模态框 -->
        <el-dialog width="400px" title="修改账号" :visible.sync="dialogFormVisible">
          <!-- 修改表单 -->
          <el-form :model="editForm" :rules="rules" ref="editForm">

            <!-- 账号 -->
            <el-form-item prop="account" style="width: 320px;" label="账号" label-width="100px">
              <el-input v-model="editForm.account" auto-complete="off"></el-input>
            </el-form-item>

            <!-- 用户组 -->
            <el-form-item prop="userGroup" label="用户组" label-width="100px">
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
        <!-- 分页组件 -->
        <div style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>`
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
// 引入moment
import moment from 'moment';

export default {
  data() {
    return {
        searchForm: { // 搜索表格数据
          cateName: '',
          keyword: ''
        },
        goodsTableData: [ // 表格数据
        ],
        dialogFormVisible: false, // 模态框显示隐藏
        editForm: {}, // 修改
        rules: {}, // 验证规则
        currentPage: 1, // 当前页码
        pageSize: 3, // 每页条数
        total: 0 ,// 总条数
        selectedId: [] // 批量删除选中id数组
    }
  },
  methods: {
    // 请求所有商品数据 
    // getGoodsList() {
    //   this.request.get('/goods/goodslist')
    //     .then(res => {
    //       console.log(res)
    //       this.goodsTableData = res;
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // 商品分页函数
    getGoodsListByPage() {
      // 收集参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        cateName: this.searchForm.cateName,
        keyword: this.searchForm.keyword
      }
      this.request.get('/goods/goodslistbypage', params)
        .then(res => {
          // 接收后端响应的数据
          let {total, data} = res;
          // 赋值给对应的变量
          this.goodsTableData = data;
          this.total = total;
          // 分页bug处理
          if (this.currentPage !== 1 && !data.length) {
            this.currentPage -= 1;
            this.getGoodsListByPage()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 查询
    search() {

      // 调用分页函数
      this.getGoodsListByPage();

     
    },
   /*  handleEdit() {
    },
    handleDelete() {
    }, 
    saveEdit() {
    },*/
    // 每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoodsListByPage()
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoodsListByPage()
    },
     // 批量删除
    batchDel() {
      // 如果没有选中 给出错误提示 结束函数
      if (!this.selectedId.length) {
        // 弹错误提示
        this.$message.error('请选择以后再操作，你是不是傻！');
        return
      }

       // 优化删除体验
      this.$confirm('你确定要批量删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => { // 确定
        // 收集被选中的数据的id
        let params = {
          idArr: this.selectedId
        }
        // 发送请求给后端 把被选中的id一起发送给后端
        this.request.get('/goods/batchdel', params)
          .then(res => {
            // 接收数据
            let {code, reason} = res;
            if (code === 0) {
              // 弹成功提示
              this.$message({
                type: 'success',
                message: reason
              })
              // 刷新列表
              this.getGoodsListByPage();
  
            } else if (code === 1) {
              // 弹失败提示
              this.$message.error(reason)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => { // 取消
        this.$message({
            type: 'info',
            message: '已取消删除'
        })
      })


    },
    cancelSelect() {
        this.$refs.goodsTableData.clearSelection() // 选中整个表格 调用函数取消选择

    },
     // 当选中选择框的状态发生变化，就会触发这个函数，而且传入被选中的数据 val是一个数组
    handleSelectionChange(val) {
      // 获取被选中的id 放入一个数组
      this.selectedId = val.map(v => v.id);
    },
  },
  created() {
    // 调用请求所有商品数据的函数
    this.getGoodsListByPage();
  },
  filters: {
    filterCtime(val) {
      return moment(val).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="less">
    @import "./goodsmanage.less";
</style>

