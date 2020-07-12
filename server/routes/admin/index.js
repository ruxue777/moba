const express = require('express');
//上传依赖
const multer = require('multer');
const upload = multer({dest: __dirname + '/../../uploads'})
const jwt = require('jsonwebtoken')
//数据模型
const AdminUser = require('../../models/AdminUser')
const assert = require('http-assert');

module.exports = app =>{
    const express = require('express');
    const router = express.Router({
        mergeParams:true
    });
    //登录校验中间件
    const authMiddlewaer = require('../../middleware/auth')

    //添加
    router.post('/', async(req,res)=>{
        const model = await req.Model.create(req.body);
        res.send(model);
    });
    //获得10条数据
    router.get('/',async(req,res,next)=>{

        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token,401,"请先登录")
        
        const {id} = jwt.verify(token,app.get('secret'))
        assert(token,401,"请先登录")
        
        req.user = await AdminUser.findById(id)
        assert(req.user,401,"请先登录")
       
        await next();
    
    } ,async(req,res)=>{
        let queryOptions = {}
        if(req.Model.modelname === 'Category'){
            queryOptions = 'parent';
        }

        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    })
    //资源详情
    router.get('/:id', async(req,res)=>{
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })
    //修改
    router.put('/:id', async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model);
    })
    //删除
    router.delete('/:id', async(req,res)=>{
        const model = await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({success:'操作成功'});
    })

    //资源中间件
    const resourceMiddlewaer = require('../../middleware/resource')

    //类似过滤器
    app.use('/admin/api/rest/:resource',authMiddlewaer(),resourceMiddlewaer(),router)

    //admin上传文件
    app.post('/admin/api/upload',authMiddlewaer(),upload.single('file'),async(req,res)=>{
        let file = req.file
        file.url = `http://localhost:8088/uploads/${file.filename}`
        res.send(file);
    })

    //登录接口
    app.post('/admin/api/login',async(req,res)=>{
        //结构赋值直接获得req.body中的值
        const {username,password} = req.body;
        //1.根据用户名找用户
        const user = await AdminUser.findOne({
            username:username
        }).select('+password')
        
        assert(user,422,"用户不存在")
        
        const isValid = require('bcryptjs').compareSync(password,user.password)
        assert(isValid,422,"密码错误")
        
        //生成token返回前端
        const token = jwt.sign({id:user._id},app.get('secret'));
        res.send({token})
        
    })

    //错误处理函数
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
        
    })
}