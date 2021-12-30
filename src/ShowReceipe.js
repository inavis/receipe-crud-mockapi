import * as React from 'react';
import { Receipe } from './App';
import { useState,useEffect} from 'react';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import RemoveIcon from '@mui/icons-material/Remove';

export function ShowReceipe({  mode }) {
 
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
            receipelist.map(({id, name, picturelink, ingredients, receipe, videolink, notes, preptime, cooktime, soakingtime, fermentationtime, totaltime, course, cuisine, servings, calories, carbohydrates, protein, fat, sodium, potassium, fiber, sugar, calcium, iron, vitamina, vitaminc}) => (
    
    
    
              <Receipe
              key={id}
                 id={id}
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
                     const deleteindex = id;
                     console.log(deleteindex);

                     fetch(`https://61cc589f198df60017aebff0.mockapi.io/receipes/${deleteindex}`,{
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
    
 