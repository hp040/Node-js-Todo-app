var express=require('express');
var bodyParser=require('body-parser');

var app=express();
var port=process.env.PORT||1337;
var mongoose=require('mongoose');
//db-connect
mongoose.connect('mongodb://root:hp040%40898@ds059682.mlab.com:59682/to_do', {useNewUrlParser: true});
//create schema
var todoSchema = new mongoose.Schema({
    task:String
});

var Todo = mongoose.model('Todo', todoSchema);

app.set("view engine",'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/assets/',express.static('./assets/'));

app.get('/',function(re,rs,ne){
    var hp = mongoose.model('Todo').find(function(err,data){
        //console.log(data);
        rs.render('todo',{todos:data });
    });
    
    
});

app.post('/create',function(re,rs){
    
   var hp= Todo(re.body).save(function(err,data){
        if (err) throw err;
        //console.log('saved');
        rs.json(data);
        
    });
    
    
    
    
});

app.delete('/del/:ts',function(re,rs){
    var del=decodeURIComponent(decodeURI(re.params.ts));
    Todo.find({task:del}).deleteOne(function(err,data){
        if(err) throw err;
        rs.json(data);
    });
    
    
});

app.listen(port);