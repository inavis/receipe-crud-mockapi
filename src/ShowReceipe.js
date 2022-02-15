import * as React from 'react';
import { Receipe } from './App';
import { useState,useEffect} from 'react';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import RemoveIcon from '@mui/icons-material/Remove';
import { API } from './global';

export function ShowReceipe({  mode }) {
 
    const [receipelist,setreceipelist]=useState(null);
 
    let getreceipe =() => {
        //console.log("use Effect");
        fetch(`${API}/receipe`,{
          method:"GET"
        })
        .then((data)=>data.json())
        .then((receipe)=>{
            //console.log(receipe)
            setreceipelist(receipe)
         
        })
      }

    
      useEffect(getreceipe,[]);


      //only after getting data from API we can display the data
      return (
          <div>
                 {(receipelist)? <AfterLoad receipelist={receipelist} mode={mode} getreceipe={getreceipe}/>:""}
          </div>
      )

      
    }
 
 function AfterLoad({receipelist,mode,getreceipe}){
    
    return (
        <div className='content'>
    
    
          {
            //creating receipe card 
            receipelist.map(({_id, name, picturelink, ingredients, receipe, videolink, notes, preptime, cooktime, soakingtime, fermentationtime, totaltime, course, cuisine, servings, calories, carbohydrates, protein, fat, sodium, potassium, fiber, sugar, calcium, iron, vitamina, vitaminc}) => (
    
    
    
              <Receipe
              key={_id}
                 id={_id}
                name={name} 
                picturelink={picturelink} 
                ingredients={ingredients} 
                receipe={receipe} 
                videolink={videolink} 
                notes={notes} 
                preptime={preptime} 
                cooktime={cooktime} 
                soakingtime={soakingtime}
                fermentationtime={fermentationtime}
                totaltime={totaltime} 
                course={course} 
                cuisine={cuisine}
                servings={servings} 
                calories={calories} 
                carbohydrates={carbohydrates} 
                protein={protein} 
                fat={fat} 
                sodium={sodium} 
                potassium={potassium} 
                fiber={fiber} 
                sugar={sugar} 
                calcium={calcium} 
                iron={iron} 
                vitamina={vitamina} 
                vitaminc={vitaminc} 
    
                mode={mode}
                deletebutton={
                    <Tooltip title="delete the receipe">
                    <Fab  aria-label="delete receipe "  color="sec" size="medium"  className='Fab-button' onClick={()=>{
                     const deleteindex = _id;
                     //console.log(deleteindex);

                     fetch(`${API}/receipe/${deleteindex}`,{
                        method:"DELETE"
                        })
                      .then((data)=>data.json())
                      .then(()=>{
                       getreceipe();
                      })
                    
                     }} >
                         
                         <RemoveIcon/>
                     </Fab>
                    </Tooltip>
                }
                />
    
            ))}
        </div>
      );
    }
    
 