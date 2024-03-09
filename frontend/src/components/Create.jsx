import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Create() {
const [product,setProduct]=useState({
    id:'',
    name:'',
    price:'',
    description:'',
    image:'',
    stock:''
});
const navigate=useNavigate();
const [file, setFile] = useState();
const handleFile = (e) => {
    setFile(e.target.files[0]);
}
const handleSubmit=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });
    axios.post('http://localhost:8081/products/add',formData,{ headers: {'Content-Type': 'multipart/form-data'}}).then(result=>{
        if(result.data.Status==="success")
            navigate('/')
    }).catch(err=>console.log(err))
}
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form>
                    <h2>Add Product</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input onChange={e => setProduct({ ...product, name: e.target.value })} type="text" placeholder='Enter name' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Price</label>
                        <input onChange={e => setProduct({ ...product, price: e.target.value })} type="number" placeholder='Enter price' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Description</label>
                        <input onChange={e => setProduct({ ...product, description: e.target.value })} type="textarea" placeholder='Enter description' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Stock</label>
                        <input onChange={e => setProduct({ ...product, stock: e.target.value })} type="number" placeholder='Enter stock' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Image</label>
                        <input onChange={handleFile} type="file" className='form-control' />
                    </div>
                    <Link to='/' className='btn btn-primary me-2'>Back</Link>
                    <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
  )
}

export default Create