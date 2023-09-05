
import { useState } from "react";


import FormInput   from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth,  } from "../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
};

const SigUpnForm=()=>{
    const[formFields, setFormFields]= useState(defaultFormFields);
    const{displayName,email,password,confirmPassword}= formFields;
    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    };
   
    const handleSubmit=  async (event)=>{
        event.preventDefault();
        if(password!== confirmPassword){
          alert('Password do not match');
          return;
        };
        try{
            const { user }=await createAuthUserWithEmailAndPassword(
                email,
                password
            );
           
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();

        } catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert('Cannot create account, email already in use');
            }
            else{
                console.log('user creation encountered error', error);

            }
           
               

        };
            
    };



    const handleChange=(event)=>{
        const { name, value }=event.target;
        setFormFields({ ...formFields, [name]:value}); 
    };
    return(
        <div className="sign-up-container">
          <h2>Didn't have an Account?</h2>
          <span>Sign In Fwith your Email and Password</span>
          <form onSubmit={handleSubmit}>
           
           <FormInput 
                 type='text'
                 label='Display Name'
                 required
                 onChange={handleChange}
                 name='displayName'
                 value={displayName}

             />
            
            <FormInput 
                  type='email'
                  label='Email'
                   required
                   onChange={handleChange}
                   name='email'
                   value={email}
                   />
            
            <FormInput 
                  type='password'
                  label='Password'
                   required
                   onChange={handleChange}
                   name='password'
                   value={password}
                   />
           
            <FormInput 
                  type='password'
                  label='Confirm Password'
                   required
                   onChange={handleChange}
                   name='confirmPassword'
                   value={confirmPassword}
                   />
            <Button type='submit'>Sign Up</Button>
           
          </form>
        </div>
    );
};

export default SigUpnForm;