const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "Ecommerce",
  password: "Saibaba@123",
});
const allProducts = (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error in the server" });
    else {
        console.log(result);
        return res.json(result);
    }
  });
};
const addProduct = (req, res) => {
  const product = req.body;
  const file=req.file.filename;
  console.log(product);
  console.log(file);
  const sql =
    "INSERT INTO products (name,price,description,image,stock) VALUES(?,?,?,?,?)";
  db.query(
    sql,
    [
      product.name,
      product.price,
      product.description,
        file,
      product.stock,
    ],
    (err, result) => {
      if (err){ 
        console.log("Sent")
        console.log(err)
        return res.json({ Message: "Error in the server" });
    }
      else {
        console.log("Sent")
        console.log("The result is"+result)
        return res.json({ Status: "success" });

    }
    }
  );
};
const viewProduct = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error in the server" });
    else return res.json(result);
  });
};
const editProduct = (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const file=req.file;
  let image;
  if(file===undefined)
    image=product.image;
else
     image=file.filename;
  console.log(id)
  console.log(product)
  const sql =
    "UPDATE products SET name=?,price=?,description=?,image=?,stock=? WHERE id=?";
  db.query(
    sql,
    [
      product.name,
      product.price,
      product.description,
      image,
      product.stock,
      id,
    ],
    (err, result) => {
      if (err) return res.json({ Message: "Error in the server" });
      else return res.json({ Status: "success" });
    }
  );
};
const deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err){
      console.log(err)
      return res.json({ Message: "Error in the server" })
    }
    else {
      console.log("deleted")
      return res.json({ Status: "success" })};
  });
};
module.exports = {
  allProducts,
  addProduct,
  viewProduct,
  editProduct,
  deleteProduct,
};
