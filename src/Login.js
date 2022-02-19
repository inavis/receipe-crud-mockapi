import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { API } from './global';

import Cookies from 'js-cookie'

const validateForm =yup.object({ 
    number:yup.string().required().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
        }
  )

export function Login({mode}){

    const buttonstyle =(mode==="dark")?{ background: "black", color: "white" }:{ background: "gray", color: "black" }
    const textboxstyle = (mode==="dark")?{ background: "black", color: "white",borderRadius:"5px"}:{ background: "white", color: "black",borderRadius:"5px" }
    const history = useHistory();
    const [message,setmessage]= React.useState("");
    const [display,setdisplay]= React.useState(false);
    const displaystyle = (display)?{display:"block"}:{display:"none"}

    const sendotp = (number) =>{
        //console.log("send otp")
              //sending OTP to confirm user
        fetch(`${API}/user/sendotp/${number}`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
         // console.log(res);
          if(res.message==="Success"){
            history.push(`/ConfirmLogin/${number}`)
          }
          else{
            setmessage(res.message)
            setdisplay(true)
          }
        })
      }
  
      const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{number:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        //console.log("On submit value",values)
          sendotp(values.number)
        }
    })

    //Check if cookie already exists then can route to application directly
    //cookie is set to expire after 1 day
    if(Cookies.get('fortheloveoffood-logintoken')){
        history.push("/Welcome")
      }

    return(
        <form onSubmit={handleSubmit}>
          <h1 className='heading'>LOGIN</h1>
        <h3 className='error heading' style={displaystyle}>
                {
                    message
                }
        </h3>
      <div className='form  background-image1'>
    
    <div>
      <TextField  className="textbox" style={textboxstyle} label="Phone Number" variant="filled" required
         color="success"
         id='number'
         name='number'
         value={values.number}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.number && errors.number} //textfield becomes red in coor if validation failes
         helperText={touched.number && errors.number ? errors.number :""} //it display small message below
      />
    </div>
    <br></br>
  
 
    <br></br>
    <br></br>
    <Button style={buttonstyle} variant='contained' className='textbox' type="submit"  >
      GET OTP
    </Button>
    <br></br>
    <div>
      <h3  className='link' onClick={()=>history.push("/Signup")}>
        Don't have an account? Signup
      </h3>
    </div>
  </div>

  </form>
    )
}