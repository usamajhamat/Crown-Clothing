import { Fragment,useContext } from "react";
import { Outlet,Link } from "react-router-dom";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdow.component";
import {ReactComponent as CrownLogo} from '../asset/083 crown.svg'
import {NavigationContainer, NavLinks,NavLink,LogoContainer} from'./navigation.styles'
import { SignOutUser } from "../utils/firebase/firebase.utils";
import { UserContext } from "../contexts/user.context";
import { CartContext } from "../contexts/cart.context";

const Navigation=()=>{
  const{currentUser,}=useContext(UserContext);
  const{isCartOpen}=useContext(CartContext);
 return(
      <Fragment>
        <NavigationContainer>
         <LogoContainer to='/'>
           <CrownLogo/>
         </LogoContainer>
          
          <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {currentUser? (
              <NavLink as='span' onClick={SignOutUser}>
              {''}
              SIGN OUT{''}
              </NavLink>
            ):(
              <NavLink to='/auth'>
                SIGN IN
            </NavLink>

            )}
            <CartIcon/>

            </NavLinks>
           {isCartOpen && <CartDropdown/>} 
        </NavigationContainer>
      <Outlet/>
     </Fragment>
    );
};
  
export default Navigation;