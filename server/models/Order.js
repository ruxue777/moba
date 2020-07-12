const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    
    //创建者
    user:{ type:String},  
    //下单时间
    starttime:{ type:String}, 
    //核销员
    receive:{type:String},
    //订单完成时间
    endtime:{ type:String},
    //内容
    commodity:[{ type:mongoose.SchemaTypes.ObjectId,ref:'Commodity'}]
    
})



module.exports = mongoose.model('Order',schema); 