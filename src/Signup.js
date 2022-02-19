import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { API } from './global';


const validateForm =yup.object({ 
    firstname:yup.string().required(),
    lastname:yup.string().required(),
    number:yup.string().required().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
        }
  )

export function Signup({mode}){

  const buttonstyle =(mode==="dark")?{ background: "black", color: "white"}:{ background: "gray", color: "black",  }
  const textboxstyle = (mode==="dark")?{ background: "black", color: "white",borderRadius:"5px"}:{ background: "white", color: "black",borderRadius:"5px" }
  const history = useHistory();
  const [message,setmessage]= React.useState("");
  const [display,setdisplay]= React.useState(false);
  const displaystyle = (display)?{display:"block"}:{display:"none"}

  //sendotp to confirm temp user
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
        history.push(`/ConfirmAccount/${number}`)
      }
      else{
        setmessage(res.message)
        setdisplay(true)
      }
    })
  }
  

  //adding temp user
  const adduser =(values) =>{
    //console.log("add");
          fetch(`${API}/user/signup`,{
            method:"POST",
            body: JSON.stringify(values),
            headers:{
              "Content-Type":"application/json"
            }
          })
          .then((data)=>data.json())
          .then((res)=>{
            if(res.message==="Success"){
              setdisplay(false)
              sendotp(values.number);
            }else{
              setmessage(res.message)
              setdisplay(true);
            }
          })
  }

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{firstname:"",lastname:"",number:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        //console.log("On submit value",values)
          adduser(values);
        }
    })
    return(
      <form onSubmit={handleSubmit}>
        <h1 className='heading'>CREATE ACCOUNT</h1>
        <h3 className='error heading' style={displaystyle}>
                {
                    message
                }
        </h3>
      <div className='form background-image2'>
    <div>
      <TextField  className="textbox" style={textboxstyle} label="First Name" variant="filled" required
         color="success"
         id='firstname'
         name='firstname'
         value={values.firstname}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.firstname && errors.firstname} //textfield becomes red in coor if validation failes
         helperText={touched.firstname && errors.firstname ? errors.firstname :""} //it display small message below
      />
    </div>
    <br></br>

    <div>
      <TextField  className="textbox" style={textboxstyle} label="Last Name" variant="filled" required
         color="success"
         id='lastname'
         name='lastname'
         value={values.lastname}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.lastname && errors.lastname} //textfield becomes red in coor if validation failes
         helperText={touched.lastname && errors.lastname ? errors.lastname :""} //it display small message below
      />
    </div>
    <br></br>

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
      Register Account
    </Button>
    <br></br>
    <div>
      <h3  className='link' onClick={()=>history.push("/Login")}>
        Already have an account? Login
      </h3>
    </div>
  </div>

  </form>
    )
}