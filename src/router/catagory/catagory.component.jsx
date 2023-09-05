import { useContext,useState,useEffect,Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductsCard from '../../products-card/products-card.component';
import { CatagoriesContext } from '../../contexts/catagories.context';

import './catagory.styles.scss';



const Catagory=()=>{
    const {catagory} = useParams();
    const {catagoriesMap} = useContext(CatagoriesContext);
    const [products, setProducts]= useState(catagoriesMap[catagory]);
    useEffect(()=>{
        setProducts(catagoriesMap[catagory])
    },[catagory, catagoriesMap]);
    return(
        <Fragment>
            <h2 className='catagory-title'>{catagory.toLocaleUpperCase()}</h2>
       <div className='catagory-container'>
       
            {products && 
               products.map((product)=> (
                    <ProductsCard key={product.id} product={product}/>
                ))}
        </div>
        </Fragment>
        
    );
  
};

export default Catagory;