import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory,useParams } from 'react-router-dom/cjs/react-router-dom.min';

import Cookies from 'js-cookie'

import { API } from './global';

const validateForm =yup.object({ 
    OTP:yup.number().required()
        }
  )

export function ConfirmLogin({mode,setisSignedin}){

    const {number} = useParams();
    const [message,setmessage]= React.useState("");
    const [display,setdisplay]= React.useState(false);
    const displaystyle = (display)?{display:"block"}:{display:"none"}

    const buttonstyle =(mode==="dark")?{ background: "black", color: "white" }:{ background: "gray", color: "black" }
    const buttonstyle2 =(mode==="dark")?{ background: "#787878", color: "white" }:{ background: "#F0F0F0", color: "black" }
    const textboxstyle = (mode==="dark")?{ background: "black", color: "white",borderRadius:"5px"}:{ background: "white", color: "black",borderRadius:"5px" }
    const history = useHistory();

    const sendotp = (number) =>{
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
          //console.log(res);
          if(res.message==="Success"){
            setmessage("OTP sent again");
          }else{
            setmessage("Error occured in sending OTP. Try again")
          }
          setdisplay(true);
        })
      }
      
    

    const confirmuser =(values) =>{
        //console.log("add");
        fetch(`${API}/user/checkotp/${number}`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
            //console.log(res)
            if(res.message==="Success"){
                Cookies.set(`fortheloveoffood-logintoken`, res.token,{ expires: 1 });
                Cookies.set(`fortheloveoffood-username`, res.name,{ expires: 1 });
                Cookies.set(`fortheloveoffood-phonenumber`, res.number,{ expires: 1 });
                // console.log("cookies",Cookies.get(`fortheloveoffood-logintoken`))
                // console.log("cookies",Cookies.get(`fortheloveoffood-username`))
                // console.log("cookies",Cookies.get(`fortheloveoffood-phonenumber`))
                setisSignedin(true)
                history.push("/");
            }
            else{
                setmessage(res.message);
                setdisplay(true)
            }
        })
      }

      const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{OTP:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        //console.log("On submit value",values)
          confirmuser(values);
        }
    })
    return(
        <form onSubmit={handleSubmit}>
          <h1 className='heading'>LOGIN</h1>
            <h3 className='error heading' style={displaystyle}>
                {
                    message
                }
        </h3>
        
        <div className='form background-image4'>
      <div>
        <TextField  className="textbox" style={textboxstyle} label="Enter OTP" variant="filled" required
           color="success"
           id='OTP'
           name='OTP'
           value={values.OTP}
           onChange={handleChange}
           onBlur={handleBlur}
           error={touched.OTP && errors.OTP} //textfield becomes red in coor if validation failes
           helperText={touched.OTP && errors.OTP ? errors.OTP :""} //it display small message below
        />
      </div>
      <br></br>
      
      <br></br>
      <br></br>
      <Button style={buttonstyle} variant='contained' className='textbox' type="submit"  >
        LOGIN
      </Button>
      <br></br>
      <br></br>
      <br></br>

      <Button style={buttonstyle2} variant='contained' className='textbox' onClick={()=>sendotp(number)} >
        Resend OTP
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