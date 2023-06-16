import React from 'react';
import Jumbotron from "../Components/Cards/Jumbotron";
import ProductCard2 from '../Components/Cards/ProductCard2';
import { useSearch } from '../Context/Search';


function Search() {
    const [values, setValues] = useSearch()

  return (
    <>
        <Jumbotron title="Search Result" subTitle={
            values?.results?.length < 1 ? "No Products Found": `Found ${values?.results?.length} Products`
        }></Jumbotron>

        <div className="container mt-5">
        <div className="row">
              {
                values?.results?.map((p)=> (
                    <div key={p._id} className="col-md-4 mb-5">
                        <ProductCard2 p={p}></ProductCard2>
                    </div>
                ))
              }
            </div>
        </div>
    
    
    </>
  )
}

export default Search