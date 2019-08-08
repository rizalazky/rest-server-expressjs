var mysql=require('mysql');

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'rest_api'
});

con.connect((err)=>{
    if (err) throw err;
    console.log('Berhasil Konek');
});

module.exports=con;