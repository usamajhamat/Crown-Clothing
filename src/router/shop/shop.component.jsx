import { Routes, Route } from 'react-router-dom';
import CatagoriesPreview from '../catagories-preview/catagories-proview.component';
import Catagory from '../catagory/catagory.component';

import './shop.styles.scss';

const Shop=()=>{
   
    return(
       <Routes>
            <Route index element = {<CatagoriesPreview/>}/>
            <Route path=':catagory' element={<Catagory/>}/>
       </Routes>
    ); 
};
export default Shop;