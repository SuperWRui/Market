<template>
<div class="system-info">
    <el-card class="box-card">
     <div slot="header" class="clearfix">
       <span>系统信息</span>
   </div> 
    <el-alert
    title="商品总数：5。已经销售的总金额：890.00。库存商品总价：1235.82"
     type="info"
     show-icon>
    </el-alert><br>
    <el-alert
    title="导入数据"
    type="info"
     show-icon>
   </el-alert>

    <br><br>

   <el-row :gutter="40">
      <el-col :span="12">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
           <span>销售排行</span>
        </div>
        <div class="text item">
           <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="商品名称"
              width="280">
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量"
              width="180">
          </el-table-column>
            
          </el-table>
        </div>
      </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
           <span>缺货的商品</span>
        </div>
        <div class="text item">
           <el-table
            :data="tableData2"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name2"
              label="商品名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="num2"
              label="库存"
              width="80">
          </el-table-column>
             <el-table-column
              prop="caozuo"
              label="操作"
              width="80">
          </el-table-column>
          </el-table>
        </div>
         </el-card>
      </el-col>
   </el-row>
    </el-card>
</div>
    
</template>
<script>
export default {
  data(){
    return{
      tableData:[{
         name:'茅台酒',
         num:2000
      },
      {
         name:'刷子',
         num:5
      },
      {
         name:'洗发液',
         num:50
      }
      ],
      tableData2:[{
         name2:'妹纸酒',
         num2:200,
         caozuo:'入库'
      },
      {
         name2:'梳子',
         num2:5,
          caozuo:'入库'
      },
      {
         name2:'洗发液',
         num2:50,
          caozuo:'入库'
      }
      ]

    }
  }
};
</script>

<style lang="less">
@import "./systeminfo.less";
</style>