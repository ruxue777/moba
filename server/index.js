const express = require('express');

const app = express();
app.use(require('cors')())
app.use(express.json())
app.set('secret','#777(ruxue-moba)777#')
//静态资源托管
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app);
require('./routes/admin')(app);

app.listen(8088,()=>{
    console.log('http://localhost:8088');
    
})