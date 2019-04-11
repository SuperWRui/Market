<template>
<div class="home">

   <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
                <!-- 导航 -->
                <LeftNav></LeftNav>
            </el-aside>

            <!-- 右侧 -->
            <el-container>
                <!-- 头 -->
                <el-header>

                <Top></Top>

                </el-header>
                <!-- 中 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view></router-view>
                </el-main>
                <!-- 尾 -->
                <el-footer>
                    
                     <Buttom></Buttom>
                </el-footer>
            </el-container>

  </el-container>   


</div>
</template>
<script>
//引入组件
import LeftNav from '@/components/LeftNav/LeftNav.vue'
import Top from '@/components/Top/Top.vue'
import Buttom from '@/components/Buttom/Buttom.vue'

export default {
    //注册组件
    components:{
        LeftNav,
        Top,
        Buttom
    }
};
</script>

<style lang="less">
@import './home.less';
</style>