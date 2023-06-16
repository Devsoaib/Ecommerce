import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useProducts() {
    const [products, setProducts] = useState([])
    useEffect(()=> {
        loadProducts()
    }, [])
    const loadProducts = async() => {
        try {
             const {data}= await axios.get("/allproducts")
             setProducts(data)
        } catch (error) {
            console.log(error);
        }
    }
  return products;
}

export default useProducts