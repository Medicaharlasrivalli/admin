import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
function Edit() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        stock: '',
        image: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const [file, setFile] = useState();
    useEffect(() => {
        axios.get('http://localhost:8081/products/' + id).then(result => {
            setProduct(result.data[0])
        }).catch(err => console.log(err))
    }, [id])
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if(file!==undefined)
            formData.append('image', file);
        Object.keys(product).forEach((key) => {
            formData.append(key, product[key]);
        });
        console.log(file);
        axios.put('http://localhost:8081/products/edit/' + id, formData).then(result => {
            if (result.data.Status === 'success')
                navigate('/')
        }).catch(err => console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form>
                    <h2>Update Product</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} type="text" placeholder='Enter name' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Price</label>
                        <input value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} type="number" placeholder='Enter price' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Description</label>
                        <input value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} type="textarea" placeholder='Enter description' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Stock</label>
                        <input value={product.stock} onChange={e => setProduct({ ...product, stock: e.target.value })} type="number" placeholder='Enter stock' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label>Current Image</label>
                        <br /><img src={`http://localhost:8081/images/` + product.image} style={{ height: "25%", width: "25%" }} alt='' />
                    </div>
                    <div className='mb-2'>
                        <label>Update Image</label>
                        <input onChange={handleFile} type="file" className='form-control' />
                    </div>
                    <Link to='/' className='btn btn-primary me-2'>Back</Link>
                    <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Edit