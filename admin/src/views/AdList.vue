<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="items">
   
        <el-table-column prop="_id" label="ID" width="220px"></el-table-column>
        <el-table-column prop="parent.name" label="上级分类"></el-table-column>
        <el-table-column prop="name" label="分类名称" ></el-table-column>
        
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
                <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    
    </el-table>
  </div>
</template>

<script>
export default {
    data()
    {
        return{
            items:[]
        }
    },
    methods:{
        async fetch(){
            let res = await this.$http.get('rest/ads');
            this.items = res.data
        },
        async remove(row){
        //console.log(row);
            
        this.$confirm(`是否确定删除分类?${row.name}`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async() => {
                
                const res = await this.$http.delete(`rest/ads/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetch(res)
            })
        }
    },
    created(){
        this.fetch()
    }
}
</script>
