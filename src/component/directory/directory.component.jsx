import DirectoryItem from '../directory-item/directory-item.component';
import './directory.styles.scss';
const Directory=( {catagories})=>{
    return(
        <div className='categories-container'>
    { catagories.map((catagory) =>(

      <DirectoryItem key={catagory.id} catagory={catagory}/>
  

    ) )}
    
   
  </div>
    )

}

export default Directory;