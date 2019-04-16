<template>
<div class="stock-total">
    <el-card class="box-card">
     <div slot="header" class="clearfix">
    <span>进货统计</span>
  </div> 


   <!-- 内容 -->
            <div class="text item">
                <!-- 1 准备一个容器 -->
                <div id="box" style="height: 400px;"></div>
            </div>

    </el-card>
</div>
    
</template>
<script>
export default {
     // 生命周期钩子函数 适合操作dom
   mounted() {
      // 2019-04-10 2019-04-15
      // 这是后端响应的数据   
      var res = {
          categoryName: ['2019-04-10', '2019-04-11', '2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16'],
          value: [1200.00, 1500.00, 3520.00, 72.00, 125.00, 560.00, 800.00]
      }

      let {categoryName, value} = res;

      this.drawSalesChart(categoryName, value); // 调用函数 生成报表
   },
   methods: {
    // 生成销售报表
    drawSalesChart(categoryData=[], value=[]) {
        // 选中dom容器 初始化
        let myChart = this.echarts.init( document.getElementById('box') )
        // 准备配置
        let option = {
            tooltip: {
                show: true
            },
            legend: {
                data:['销量']
            },
            xAxis : [
                {
                    type : 'category',
                    data : categoryData
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    "name":"销量",
                    "type":"line",
                    "data":value,
                   itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:"#348ee2"

                                    }  
                                }  
                            },  
                }
            ]
        }
        // 使用配置生成报表
        myChart.setOption( option )
    }
   }
}
</script>

<style lang="less">
@import './stocktotal.less';
</style>