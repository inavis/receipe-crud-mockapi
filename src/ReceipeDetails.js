import { useParams ,useHistory} from "react-router-dom";
import * as React from 'react';
import Chip from '@mui/material/Chip';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Receipedisplay, Ingredients } from './App';
import { useState,useEffect} from 'react';

import { API } from './global';

import Cookies from 'js-cookie'

// //smiley rating

const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };
  
  export function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other} id={customIcons[value]}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

//to display all details of a receipe when learn more is clicked
export function ReceipeDetails({ mode }) {

  const history = useHistory();
  
    const [receipelist,setreceipelist] = useState(null)
  const { id } = useParams();
  //console.log(id);

  //If not signed in cannot see receipe details
  const token = Cookies.get('fortheloveoffood-logintoken');

  if(token===undefined){
    history.push("/Login")
  }


  let getreceipe =() => {
    //console.log("use Effect");
    fetch(`${API}/receipe/${id}`,{
      method:"GET",
      headers:{
        "x-auth-token":token
      }
    })
    .then((data)=>data.json())
    .then((receipe)=>{

        setreceipelist(receipe)
     
    })
  }


  useEffect(getreceipe,[]);

  //console.log(receipelist);

  return(
        <div>
            {
                receipelist?<AfterLoad receipelist={receipelist} mode={mode}/>:<h1 className='heading'>Loading...</h1>
            }
        </div>
  );
 

}

//Only after we get the respective data other thing should load to display
function AfterLoad({receipelist,mode}){
    
  const { name, picturelink, ingredients, receipe, videolink,
    notes, preptime, cooktime, soakingtime, fermentationtime, totaltime, course, 
    cuisine, servings, calories, carbohydrates, protein, fat, sodium, potassium, 
    fiber, sugar, calcium, iron, vitamina, vitaminc } = receipelist;


    const snippetstyle = mode === "dark" ?
    { border: "6px solid rgb(218, 206, 219)", background: "black", margin: "20px", padding: "5px", borderRadius: "10px" } :
    { border: "6px solid #708090", background: "#E5E4E2", margin: "20px", padding: "5px", borderRadius: "10px" };



 //display NA if a value is not there
 const preptimevalue = (preptime === "") ? "NA" : preptime;
 const cooktimevalue = (cooktime === "") ? "NA" : cooktime;
 const soakingtimevalue = (soakingtime === "") ? "NA" : soakingtime;
 const fermentationtimevalue = (fermentationtime === "") ? "NA" : fermentationtime;
 const totaltimevalue = (totaltime === "") ? "NA" : totaltime;

 const carbohydratesvalue = (carbohydrates === "") ? "NA" : carbohydrates + " g";
 const proteinvalue = (protein === "") ? "NA" : protein + " g";
 const fatvalue = (fat === "") ? "NA" : fat + " g";
 const sodiumvalue = (sodium === "") ? "NA" : sodium + " mg";
 const potassiumvalue = (potassium === "") ? "NA" : potassium + " mg";
 const fibervalue = (fiber === "") ? "NA" : fiber + " mg";
 const sugarvalue = (sugar === "") ? "NA" : sugar + " mg";
 const calciumvalue = (calcium === "") ? "NA" : calcium + " mg";
 const ironvalue = (iron === "") ? "NA" : iron + " mg";
 const vitaminavalue = vitamina === "" ? "NA" : vitamina + "IU";
 const vitamincvalue = vitaminc === "" ? "NA" : vitaminc + " mg";

 //display calroies only if we have a value for that
 const calorievalue = (calories === "") ? "" : <Tooltip title="calories"><Chip label={calories + " KCal"} icon={<LocalFireDepartmentIcon />} variant="outlined" /></Tooltip>;
 //display notes only if notes is there
 const notesvalue = (notes.length > 0) ? <div style={snippetstyle}>
   <div><h3>Notes</h3></div>
   <div>
     <ul>
       {<Receipedisplay receipe={notes} />}
     </ul>
   </div>
 </div> : "";


 //console.log(mode);


 return (
   <div>
     <div className='mainflex'>
       <div>

         <h1>{name}</h1>

       </div>
       <div className='flex-row'>
         <div>
           <Tooltip title="course">
             <Chip label={course} variant="outlined" />
           </Tooltip>
         </div>
         <div>
           <Tooltip title="cuisine">
             <Chip label={cuisine} variant="outlined" />
           </Tooltip>
         </div>
         <div>
           <Tooltip title="servings">
             <Chip label={servings} icon={<LocalDiningIcon />} variant="outlined" />
           </Tooltip>
         </div>
         <div>
           {calorievalue}
         </div>
       </div>
     </div>
     <br></br>

     {/* <div>Receipe Details {id}</div> */}
     <div style={{ textAlign: "center" }}>
       <iframe
         width="90%"
         height="500"
         src={videolink}
         title="YouTube video player" frameborder="1"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">

       </iframe>
     </div>


     <div style={snippetstyle}>
       <div><h3>Time Needed</h3></div>
       <TableContainer component={Paper} className='table'>
         <Table sx={{ minWidth: 100 }} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell> Time</TableCell>
               <TableCell>Value</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             <TableRow>
               <TableCell>Prep time</TableCell>
               <TableCell>{preptimevalue}</TableCell>
             </TableRow>
             <TableRow>
               <TableCell>Cook time</TableCell>
               <TableCell>{cooktimevalue}</TableCell>
             </TableRow>
             <TableRow>
               <TableCell>Soaking time</TableCell>
               <TableCell>{soakingtimevalue}</TableCell>
             </TableRow>
             <TableRow>
               <TableCell>Fermentation time</TableCell>
               <TableCell>{fermentationtimevalue}</TableCell>
             </TableRow>
             <TableRow>
               <TableCell>Total time</TableCell>
               <TableCell>{totaltimevalue}</TableCell>
             </TableRow>
           </TableBody>
         </Table>
       </TableContainer>
       <div></div>
     </div>
     <div style={snippetstyle}>
       <div><h3>Nutrients</h3></div>
       <div>
         <TableContainer component={Paper} className='table'>
           <Table sx={{ minWidth: 100 }} aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell> Nutrient</TableCell>
                 <TableCell>Value</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               <TableRow>
                 <TableCell>Carbohydrates</TableCell>
                 <TableCell>{carbohydratesvalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Protein</TableCell>
                 <TableCell>{proteinvalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Fat</TableCell>
                 <TableCell>{fatvalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Sodium</TableCell>
                 <TableCell>{sodiumvalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Potassium</TableCell>
                 <TableCell>{potassiumvalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Fiber</TableCell>
                 <TableCell>{fibervalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Sugar</TableCell>
                 <TableCell>{sugarvalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Calcium</TableCell>
                 <TableCell>{calciumvalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Iron</TableCell>
                 <TableCell>{ironvalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Vitamin A</TableCell>
                 <TableCell>{vitaminavalue}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell>Vitamin C</TableCell>
                 <TableCell>{vitamincvalue}</TableCell>
               </TableRow>
             </TableBody>
           </Table>
         </TableContainer>
       </div>
     </div>
     <div style={snippetstyle}>
       <div><h3>Ingredients</h3></div>
       <div>
         <ul>
           {<Ingredients ingredients={ingredients} />}
         </ul>
       </div>
     </div>
     <div style={snippetstyle}>
       <div><h3>Instructions</h3></div>
       <div>
         <ul>
           {<Receipedisplay receipe={receipe} />}
         </ul>
       </div>
     </div>
     {notesvalue}

     <div style={{ textAlign: "center" }}>
       <br></br>
       <div><h2>How much satisfactory was this receipe?</h2></div>
       <div className='rating'>
         <Rating
           name="highlight-selected-only"
           defaultValue={2}
           IconContainerComponent={IconContainer}
           highlightSelectedOnly
           size="large" onClick={(e)=>console.log(e.target.id)} />
       </div>
       <br></br>
     </div>
   </div>
 );
}
