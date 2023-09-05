
import { useContext, Fragment } from "react";


import { CatagoriesContext } from "../../contexts/catagories.context";
import CatagoryPreview from "../../component/catagory-preview/catagory-preview.component";

const CatagoriesPreview=()=>{
    const{catagoriesMap}=useContext(CatagoriesContext);
    return(
        <Fragment>
         {Object.keys(catagoriesMap).map((title)  =>{
                const products = catagoriesMap[title];
                return(
                    <CatagoryPreview key={title} title={title} products={products}/>
                ) ;
                
                })
                
            }
        </Fragment>
   
    );
};
export default CatagoriesPreview;