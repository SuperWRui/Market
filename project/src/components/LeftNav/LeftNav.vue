<template>
    <div class="left-nav">
          <!-- 导航组件 -->
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            active-text-color="rgb(52, 142, 226)"
            unique-opened
            router
            >
             <!-- 导航-->
            <el-submenu :index="(index+1)+''" v-for="(menu,index) in menus" :key="index">
                <!-- 图标和标题 -->
                <template slot="title">
                    <i :class="menu.iconClass"></i>
                    <span>{{menu.title}}</span>
                </template>
                <!-- 二级导航 -->
                <el-menu-item 
                :index="subMenu.path"
                 v-for="(subMenu,index) in menu.children" 
                 :key="index"
                 >
                {{subMenu.subTitle}}
                 </el-menu-item>
            </el-submenu>

           

        </el-menu>
    </div>
</template>
<script>
export default {
    data(){
        return{
            "menus":[
                {
                iconClass:'el-icon-document',
                title:'系统管理',
                children:[
                    {path:'/home/systeminfo',subTitle:"系统信息"}
                ]
               },
                {
                iconClass:'el-icon-news',
                title:'账号管理',
                children:[
                            {path:'/home/accountmanage',subTitle:"账号管理"},
                            {path:'/home/accountadd',subTitle:"添加账号"},
                            {path:'/home/passwordmodify',subTitle:"密码修改"}
                    ]
               }, {
                iconClass:'el-icon-goods',
                title:'商品管理',
                children:[
                    {path:'/home/goodsmanage',subTitle:"商品管理"},
                     {path:'/home/goodsadd',subTitle:"添加商品"}
                ]
               }, {
                iconClass:'el-icon-edit-outline',
                title:'统计管理',
                children:[
                     {path:'/home/salestotal',subTitle:"销售统计"},
                    {path:'/home/stocktotal',subTitle:"进货统计"}
                ]
               },
        ]
        }
        
    }
}
</script>
<style lang="less">
@import './leftnav.less';
</style>


