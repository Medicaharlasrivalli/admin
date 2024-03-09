const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "Ecommerce",
  password: "Saibaba@123",
});
const authLogin=(req,res)=>{
    const auth=req.body
    console.log(auth);
    const sql="SELECT * FROM admin where username=? and password=?";
    db.query(sql,[auth.username,auth.password],(err,result)=>{
        if(err) return res.json({Message:"Error in the server"})
        else {
            if(result.length===0)
                return res.json({Status:"false",Message:"Not an authenticated user"})
            else
                return res.json({Status:"success"})
        }
    })
}
module.exports={authLogin}