
import './App.css';
import { useState,useEffect} from 'react';

import { Switch, Route, useHistory} from "react-router-dom";

import * as React from 'react';

import Button from '@mui/material/Button';


import Paper from '@mui/material/Paper';

import Fab from '@mui/material/Fab';


import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { API } from './global';


import { ShowReceipe } from './ShowReceipe';
import { ReceipeDetails } from './ReceipeDetails';
import {AddReceipe} from './AddReceipe';
import {EditReceipe} from './EditReceipe';
import { Signup } from './Signup';
import { ConfirmAccount } from './ConfirmAccount';
import { Login } from './Login';
import { ConfirmLogin } from './ConfirmLogin';
import Tooltip from '@mui/material/Tooltip';

import Cookies from 'js-cookie'


function App() {


const history = useHistory("");

//theme for whole webpage
const [mode, setMode] = React.useState('dark');
const theme = React.useMemo(
  () =>
    createTheme({
      palette: {
        mode,
      },
    }),
  [mode],
);
//Based on token find out if user needs to Sign in or Sign out
const token = Cookies.get('fortheloveoffood-logintoken');
const [isSignedin,setisSignedin] = useState((token)?true:false);
//console.log(token,isSignedin)

const sign_in_or_out = (isSignedin)?
<Button color="inherit" onClick={()=>{
  Cookies.remove('fortheloveoffood-logintoken');
  Cookies.remove('fortheloveoffood-username');
  Cookies.remove('fortheloveoffood-phonenumber');
  setisSignedin(false)
  history.push("/Welcome");
}}>Sign Out</Button>
:
<Button color="inherit" onClick={()=>{
  history.push("/Login")
}}>Sign In</Button>

//display user name if logged in
const user = (isSignedin)?<Button style={{color:"white"}}><AccountCircleIcon/>{Cookies.get('fortheloveoffood-username')}</Button>:""




const appbarstyle = mode==="dark"?{background:"#202020"}:{background:"#425669"}
const paperstyle = mode==="dark"?{background:"#383838"}:{background:"#F8F8F8"}

  return (
    <div className="App">
    
    <ThemeProvider theme={theme}>
      <Paper sx={{minHeight:"400vh" , borderRadius:"0px"}} elevation={3} style={paperstyle} >
        <div>
        {/* Creating a appbar  */}
       <AppBar position="static" style={appbarstyle}>
            <Toolbar>
               {/* when button clicked theme should change */}
               <Button style={{color:"white"}} onClick={()=>{
                //console.log(theme.palette.mode)
               setMode(mode==="dark"?"light":"dark")
              }}>{mode==="dark"?<Brightness7Icon/>:<Brightness4Icon/>}mode</Button>

              <Button color="inherit" onClick={()=>{history.push("/Welcome")}}>Welcome</Button>
              <Button color="inherit" onClick={()=>{history.push("/Receipes")}}>All receipes</Button>
              <Button color="inherit" onClick={()=>{history.push("/AddReceipes")}}>Add receipes</Button>
              
              {
                sign_in_or_out
              }
             {
               user
             }
              
            </Toolbar>
        </AppBar>
       </div>

       <Switch>
         {/* Each route is case */}
         <Route path="/Welcome">
           <LoadWelcomeData/>
         </Route>

         <Route path="/Signup">
            <Signup mode={mode}/>
         </Route>

         <Route path="/Login">
            <Login mode={mode}/>
         </Route>

         <Route path="/ConfirmAccount/:number">
            <ConfirmAccount mode={mode}/>
         </Route>

         <Route path="/ConfirmLogin/:number">
            <ConfirmLogin mode={mode} setisSignedin={setisSignedin}/>
         </Route>

         <Route path="/Receipes">
            <ShowReceipe mode={mode}/>
         </Route>

         <Route path="/AddReceipes">
              <AddReceipe/>
         </Route>

         <Route  path="/editreceipe/:id">
         <EditReceipe  />
         </Route>

         <Route path="/receipe/:id">
           <ReceipeDetails  mode={mode}/>
         </Route>
        
         <Route exact path="/">    
            {/* <ShowReceipe  mode={mode} /> */}
            <LoadWelcomeData/>
            {/* <Login mode={mode}/> */}
         </Route>
         
         {/* For broken or links that does not exist */}
         <Route path="**">
           <NotExist/>
         </Route>
       </Switch>
  
        </Paper>
    </ThemeProvider>
   
    </div>
  );
}

export default App;


//we will get data from mock api and then call welcome(to avaoid race condition)) to have slideshow of images
function LoadWelcomeData(){
  const [receipelist,setreceipelist]=useState(null);
  let getreceipe =() => {
    //console.log("use Effect");
    fetch(`${API}/receipe`,{
      method:"GET"
    })
    .then((data)=>data.json())
    .then((receipe)=>{

        setreceipelist(receipe)
     
    })
  }
  useEffect(getreceipe,[]);

  return(
    receipelist?<Welcome receipelist={receipelist}/>:<h1 className='heading'>Loading...</h1>
  )

}

//basic page
function Welcome({receipelist}){

  const history = useHistory()

  const [index,setindex]= useState(0);

      const length = receipelist.length
  
  
      //we will change the index alone and display images in a time interval
      setTimeout(() => {
          
        (index+1===length)?setindex(0):setindex(index+1)
          //console.log(index)
      }, 1500);
  return(
    <div style={{textAlign:"center"}}>
      <div><h1>Welcome to For the Love of Food</h1></div>
      <div>Go to <b className='link'  onClick={()=>history.push("/Receipes")}>All Receipes tab</b> to explore and have fun</div>
      <br></br>
      <div >
        <img alt="recipe images" src={receipelist[index].picturelink} className='boardimg'/>
      </div>
    
    </div>

    
  );
}

//404 error page
function NotExist(){
  return(
    <div>
      {/* <img alt="link not found" className='notfoundimage' src="https://jonmgomes.com/wp-content/uploads/2020/08/JMG-404-Crane-GIF.gif"/> */}
      <img alt="link not found" className='notfoundimage' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2db0b280898527.5cee93b96b7f6.gif"/>
    </div>
  )
}



//create card for each receipe
export function Receipe({id, name, picturelink, ingredients, receipe, videolink, notes, preptime, cooktime, soakingtime, fermentationtime, totaltime, course, cuisine, servings, calories, carbohydrates, protein, fat, sodium, potassium, fiber, sugar, calcium, iron, vitamina, vitaminc ,mode,deletebutton}) {

      // console.log(name,picturelink,ingredients,receipe,videolink,notes,preptime,cooktime,soakingtime,
      //   fermentationtime,totaltime,course,cuisine,servings,calories,carbohydrates,protein,fat,sodium,potassium,
      //     fiber,sugar,calcium,iron,vitamina,vitaminc)
      // console.log(mode,id)


      //based on page theme(light/dark) receipe card style changes
     const borderstyle= (mode==="dark")?{border:"6px solid white",background:"black"}:{border:"7px solid #708090",background:"#E5E4E2"}
      const buttonstyle=(mode==="dark")?{border:"2px solid white",background:"#303030"}:{border:"2px solid #708090",background:"#C0C0C0"}

      
      const history= useHistory()
      // const [receipelist,setreceipelist]=useState("");
    

          return(
            <div className='card' style={borderstyle}>
              {/* delete button to delete the receipes and rceipe is removed based on index value*/}
            
             
             {deletebutton}


             <Tooltip title="Edit the receipe">
             <Fab  aria-label="edit receipe " color="sec" size="medium" style={{float:"right"}}  className='Fab-button' onClick={()=>{
                
                
                history.push(`/editreceipe/${id}`)
              }} >
                  <ModeEditOutlineOutlinedIcon/> 
              </Fab>
             </Tooltip>
             <br></br>
            
                <div>
                  <img alt="recipe visual" src={picturelink}/>
                </div>
                <br></br>

                <div className='heading'>
                  <h1>{name}</h1> 
                </div>
                
                <Button color="primary"  variant='outline' aria-label="show receipe details" style={buttonstyle} onClick={(e) => {
                       history.push(`/receipe/${id}`);
                        }}>
                                  Learn More 
                </Button>

              
                <br></br>

            </div>
          )

}
export function Ingredients({ingredients}){
  return (
    <div>
      {
        ingredients.map((ele)=> ele.trim()!==""?<Steps content={ele} />:"")
      }
    </div>
  )
}
export function Receipedisplay({receipe}){
  return (
    <div>
      {
        receipe.map((ele)=>ele.trim()!==""?<Steps content={ele} />:"")
      }
    </div>
  )
}

function Steps({content}) {
  return(
   <li>{content}</li>
  )
}

