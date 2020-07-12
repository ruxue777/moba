const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    //产品名称
    goodsname:{ type:String},
    //所属店铺名称
    shopname:{type:String},
    //所属店铺id
    shopname:{type:mongoose.SchemaTypes.ObjectId},
    //产品图片
    icon:{ type:String},
    //产品主标题
    maintitle:{ type:String},
    //产品副标题、详情
    subtitle:{ type:String},
    //产品库存
    inventory:{type:Number}, 
    //展示价格
    displayprice:{type:Number},
    //原价
    price:{type:Number},
    //卡片抵用价
    membercard:{type:Number},
    //商品类别
    cat_id:{type:Number},
    //是否为积分商品
    is_integral:{type:Boolean},
    //积分产品
    integral:{
        //积分数量
        amount:{type:Number}
    },
    //是否有赠品
    is_giveaway:{type:Boolean},
    //赠品产品
    giveaway:[{ type:mongoose.SchemaTypes.ObjectId,ref:'Commodity'}],
    //是否为周期产品,
    is_cycle:{type:Boolean},
    //周期产品
    cycle:{
        //当前时间
        thistime:{type:Number},
        //间隔时间
        Intervals:{type:Number}

    },
    //产品是否搜索显示
    display:{type:Boolean}
})

module.exports = mongoose.model('Commodity',schema); 