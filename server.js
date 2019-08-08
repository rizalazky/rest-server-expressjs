var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var konek=require('./koneksi');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

app.get('/mahasiswa',(req,res,next)=>{
    var sql='SELECT * FROM tb_mahasiswa';
    var query=konek.query(sql,(err,results)=>{
        if(err) throw err;
        res.json({
            'status':200,
            'response':results
        });
        res.end();
    });  
});

app.get('/mahasiswa/:id',(req,res)=>{
    var id=req.params.id;
    var sql='SELECT * FROM tb_mahasiswa WHERE id='+id;
    var query=konek.query(sql,(err,results)=>{
        if(err) throw err;
        res.json({
            'status':200,
            'response':results
        });
        res.end();
    });
});

app.post('/mahasiswa',(req,res)=>{
    var data={
        nim:req.body.nim,
        nama:req.body.nama,
        email:req.body.email,
        jurusan:req.body.jurusan,
        alamat:req.body.alamat
    };
    var sql='INSERT INTO tb_mahasiswa SET ?';
    var query=konek.query(sql,data,(err,results)=>{
        if(err) throw err;
        res.json({
            'status':200,
            'message':'Berhasil Insert Data',
            'response':results
        });
        res.end();
    });
});

app.put('/mahasiswa',(req,res)=>{
    var data={
        nim:req.body.nim,
        nama:req.body.nama,
        email:req.body.email,
        jurusan:req.body.jurusan,
        alamat:req.body.alamat
    };
    var sql="UPDATE tb_mahasiswa SET ? WHERE id="+req.body.id;
    var query=konek.query(sql,data,(err,results)=>{
        if(err) throw err;
        res.json({
            'status':200,
            'message':'Berhasil Update Data',
            'response':results
        });
        res.end();
    });
});

app.delete('/mahasiswa/:id',(req,res)=>{
    
    var id=req.params.id;
    if(id===null){
        res.json({
            'message':'ID Kosong'
        });
    }else{
        const query='DELETE FROM tb_mahasiswa WHERE id='+id;
        konek.query(query,(err,result)=>{
            res.json({
                'id':id,
                'status':200,
                'message':'Berhasil Menghapus data',
                'response':result
            });
        })
    }
});

app.listen(1000,()=>{
    console.log('Run ON Port 1000');
});