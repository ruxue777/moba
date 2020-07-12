<template>
    <div class="about">
        <h1>{{ id ? '编辑':'新建'}}广告位</h1>
        <el-form label-width="120px" @submit.native.prevent="Save()">
            
            <el-form-item label="名称">
                <el-input v-model="model.name">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button  @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
                <el-row type="flex" style="">
                    <el-col :md="12" v-for="(item,i) in model.items" :key="i">
                        <el-form-item label="跳转连接(URL)">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="图片">
                            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false" :on-success="res => $set(item,'image',res.url) " >
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                            
                    </el-col>
                </el-row>
            </el-form-item>

           

            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>    
            </el-form-item>        
        </el-form>
    </div>    
</template>

<script> 
export default {
    props:{
        id:{}
    },
    data(){ 
        return{
            model:{
                items:[]
            }
        }
    },
    methods:{
        async Save()
        {   
            if(this.model.name == undefined || this.model.name == null ||this.model.name == ''){
                alert('名称不能为空')
            }else{
                let res 

                if(this.id){
                    res = await this.$http.put(`rest/ads/${this.id}`,this.model)
                }
                else
                {
                    res = await this.$http.post('rest/ads',this.model)
                }

                this.$router.push('/ads/list');
                this.$message({
                    type:'success',
                    message:"保存成功"
                })
                console.log(res.data);
            }
            
        },
        async fetch(){

            let res = await this.$http.get(`rest/ads/${this.id}`);
            this.model = Object.assign({},this.model,res.data);

        }
    },
    created()
    {   
        //有值且执行
        this.id && this.fetch();
    }
} 
</script>