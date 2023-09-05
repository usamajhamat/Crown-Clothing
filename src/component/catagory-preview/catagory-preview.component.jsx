import { Link } from 'react-router-dom';

import ProductsCard from '../../products-card/products-card.component';
import './catagory-preview.styles.scss';
const CatagoryPreview=({title, products})=>{
    return(
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className='preview'>
                {products 
                    .filter ((_, idx )=> idx < 4)
                    .map((product)=>(
                        <ProductsCard key={product.id} product={product}/>
                    ))
                    }
            </div>
        </div>
    );
};
export default CatagoryPreview;