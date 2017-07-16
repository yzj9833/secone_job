/**
 * Created by Administrator on 2017/7/4.
 */
    //加载模块
const mysql = require("mysql");
const http = require("http");
const express=require("express");
const qs=require("querystring");
//创建连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"wzry"
});

//创建web服务器
var app=express();
var server = http.createServer(app);
server.listen(8080);
app.use(express.static("public"));
app.get("/item",(req,res)=>{
    //数据库连接
    pool.getConnection((err,conn)=>{
        var sql="SELECT * FROM item";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
});
app.get("/hero",(req,res)=>{
    //数据库连接
    pool.getConnection((err,conn)=>{
        var sql="SELECT * FROM hero";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
});
app.get("/summoner",(req,res)=>{
    //数据库连接
    pool.getConnection((err,conn)=>{
        var sql="SELECT * FROM spell";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
});
app.post("/search",(req,res)=>{
    req.on("data",(data)=>{
        var obj=qs.parse(data.toString());
        var search=obj.search;
        pool.getConnection((err,conn)=>{
            var sql="select did from item where name like '%"+search+"%'";
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                res.json(result);
                conn.release();
            });
        })
    })
});
app.post("/heroSearch",(req,res)=>{
    req.on("data",(data)=>{
        var obj=qs.parse(data.toString());
        var search=obj.search;
        pool.getConnection((err,conn)=>{
            var sql="select id from hero where hname like '%"+search+"%'";
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                res.json(result);
                conn.release();
            });
        })
    })
});