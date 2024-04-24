import Layout from '@/components/Layout'
import Spinner from '@/components/Spinner';
import axios from 'axios'
import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2';

function SettingsPage({swal}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [featuredProduct, setFeaturedProduct] = useState("");
    const [shippingPrice, setShippingPrice] = useState('');

    useEffect(() => {
        FetchAll();
    }, [])

    async function FetchAll() {
        setLoading(true)
        axios.get('/api/products').then(res => {
            setProducts(res.data)
        });
        axios.get('/api/settings?name=featuredProductId').then(res => {
            setFeaturedProduct(res?.data?.value)
        })
        axios.get('/api/settings?name=shippingFee').then(res => {
            setShippingPrice(res?.data?.value)
        })
        setLoading(false)
    }

    async function saveSettings() {
        setLoading(true);
        await axios.put('/api/settings', {
          name: 'featuredProductId',
          value: featuredProduct,
        });
        await axios.put('/api/settings', {
          name: 'shippingFee',
          value: shippingPrice,
        });
        setLoading(false);
        await swal.fire({
          title: 'Settings saved!',
          icon: 'success',
        });
      }


  return (
    <Layout>
        <h1>

        Your E-commerce Store Settings
        </h1>
        {loading && <Spinner/>}
        {!loading && (
            <>
        <label>Featured Product</label>
        <select value={featuredProduct || ""} onChange={ev => setFeaturedProduct(ev?.target?.value)}>
            {
                products.length > 0 && products.map(product => (
                    <option key={product._id} value={product._id}>{product.title}</option>
                ))
            }
        </select>
            
        <label>Shipping price (in usd)</label>
        <input value={shippingPrice || ""} onChange={ev => setShippingPrice(ev.target.value)} type='number' placeholder='Shipping Price'/>
            
        <div>
            <button onClick={saveSettings} className='btn-primary'>Save Settings</button>
        </div>
            </>

        )}
        
    </Layout>
  )
}

export default withSwal(({swal}) => (
    <SettingsPage swal={swal}/>
))