import logo from './logo.svg';
import './App.css';
import { useState,useEffect} from 'react';

import { Switch, Route, Link,Redirect, useHistory} from "react-router-dom";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Fab from '@mui/material/Fab';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { palette } from '@mui/system';


import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { ShowReceipe } from './ShowReceipe';
import { ReceipeDetails } from './ReceipeDetails';
import {AddReceipe} from './AddReceipe';
import {EditReceipe} from './EditReceipe';
import Tooltip from '@mui/material/Tooltip';
import Carousel from 'react-bootstrap/Carousel'

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


const [editindex,seteditindex] = useState("")

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
              <Button color="inherit" onClick={()=>{history.push("/Welcome")}}>Welcome</Button>
              <Button color="inherit" onClick={()=>{history.push("/Receipes")}}>All receipes</Button>
              <Button color="inherit" onClick={()=>{history.push("/AddReceipes")}}>Add receipes</Button>
              {/* when button clicked theme should change */}
              <Button style={{color:"white"}} onClick={()=>{
                console.log(theme.palette.mode)
               setMode(mode==="dark"?"light":"dark")
              }}>{mode==="dark"?<Brightness7Icon/>:<Brightness4Icon/>}mode</Button>
            </Toolbar>
        </AppBar>
       </div>

       <Switch>
         {/* Each route is case */}
         <Route path="/Welcome">
           <LoadWelcomeData/>
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
    console.log("use Effect");
    fetch("https://61cc589f198df60017aebff0.mockapi.io/receipes",{
      method:"GET"
    })
    .then((data)=>data.json())
    .then((receipe)=>{

        setreceipelist(receipe)
     
    })
  }
  useEffect(getreceipe,[]);

  return(
    receipelist?<Welcome receipelist={receipelist}/>:""
  )

}

//basic page
function Welcome({receipelist}){

  const [index,setindex]= useState(0);

      const length = receipelist.length
  
  
      //we will change the index alone and display images in a time interval
      setTimeout(() => {
          
        (index+1===length)?setindex(0):setindex(index+1)
          console.log(index)
      }, 2000);
  return(
    <div style={{textAlign:"center"}}>
      <div><h1>Welcome to Receipes corner</h1></div>
      <div>Go to <b>All Receipes tab</b> to know more</div>
      <br></br>
      <div >
        <img src={receipelist[index].picturelink} className='boardimg'/>
      </div>
    
    </div>

    
  );
}

//404 error page
function NotExist(){
  return(
    <div>
      {/* <img className='notfoundimage' src="https://jonmgomes.com/wp-content/uploads/2020/08/JMG-404-Crane-GIF.gif"/> */}
      <img className='notfoundimage' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2db0b280898527.5cee93b96b7f6.gif"/>
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
      const [receipelist,setreceipelist]=useState("");
    

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
                  <img src={picturelink}/>
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
        ingredients.map((ele)=> ele.trim()!=""?<Steps content={ele}/>:"")
      }
    </div>
  )
}
export function Receipedisplay({receipe}){
  return (
    <div>
      {
        receipe.map((ele)=>ele.trim()!=""?<Steps content={ele}/>:"")
      }
    </div>
  )
}

function Steps({content}) {
  return(
   <li>{content}</li>
  )
}

