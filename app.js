var express=require('express');
var bodyParser=require('body-parser');
var data=[{task:"get up"}];
var app=express();
var port=process.env.PORT||1337;
app.set("view engine",'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/assets/',express.static('./assets/'));

app.get('/',function(re,rs,ne){
    rs.render('todo',{todos: data});
});

app.post('/create',function(re,rs){
    
    data.push(re.body);
    rs.json(data);
});

app.delete('/del/:ts',function(re,rs){
    data=data.filter(function(todo){
        
        return todo.task.replace(/ /g, '-') !==re.params.ts;
    });
    rs.json(data);
});

app.listen(port);