import { useHistory } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import { Formik,useFormik } from 'formik';
import * as yup from 'yup';

const validateForm =yup.object({ 
    name:yup.string().required().min(4) , 
    picturelink:yup.string().url().required(), 
    ingredients:yup.string().required(),
     receipe :yup.string().required(), 
     videolink :yup.string().url().required(),
         notes:yup.string().required(),
          preptime:yup.string(),
           cooktime:yup.string(), 
           soakingtime:yup.string(),
            fermentationtime:yup.string(), 
         totaltime:yup.string(),
          course:yup.string().required(),
           cuisine:yup.string().required(), 
           servings:yup.string().required(),
            calories:yup.number(),
         carbohydrates:yup.number(),
          protein:yup.number(), 
          fat:yup.number(), 
          sodium:yup.number(),
           potassium:yup.number(),
            fiber:yup.number(),
          sugar:yup.number(),
           calcium:yup.number(), 
           iron:yup.number(),
            vitamina:yup.number(), 
            vitaminc:yup.number()
        }
  )
  

export function AddReceipe() {

  const buttonstyle = { background: "black", color: "white", border: "2px solid white" };
  const history = useHistory();

  const addmovie =(values) =>{
    console.log("add");
    fetch(`https://61cc589f198df60017aebff0.mockapi.io/receipes`,{
      method:"POST",
      body: JSON.stringify(values),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then((data)=>data.json())
    .then(()=>history.push("/Receipes"))
  }

  const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
    initialValues:{ name:"", picturelink:"", ingredients:"", receipe:"", 
        videolink:"", notes:"", preptime:"", cooktime:"", soakingtime:"", fermentationtime:"", totaltime:"",
         course:"", cuisine:"", servings:"", calories:"",carbohydrates:"", protein:"", fat:"", sodium:"", 
         potassium:"", fiber:"", sugar:"", calcium:"", iron:"", vitamina:"", vitaminc:""},
    validationSchema:validateForm,
    onSubmit:(values) =>{
      values.name=values.name.toString().trim().toUpperCase();
      values.ingredients =  values.ingredients.toString().split(",") 
      values.receipe =  values.receipe.toString().split(".") 
      values.notes =   values.notes.toString().split(".") 
    console.log("On submit value",values)
      addmovie(values);
    }
})
 


  //Form to get data of receipes
  return (
    <form onSubmit={handleSubmit}>
        <div className='form'>
      <div>
        <TextField id="filled-basic" className="textbox" label="Dish Name" variant="filled" required
           id='name'
           name='name'
           value={values.name}
           onChange={handleChange}
           onBlur={handleBlur}
           error={touched.name && errors.name} //textfield becomes red in coor if validation failes
           helperText={touched.name && errors.name ? errors.name :""} //it display small message below
        />
      </div>
      <br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Dish picture link" variant="filled"
          required  id='picturelink'
          name='picturelink'
          value={values.picturelink}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.picturelink && errors.picturelink} 
          helperText={touched.picturelink && errors.picturelink ? errors.picturelink :""} />
      </div>
      <br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Ingredients (separated by comma)" variant="filled"
          required  id='ingredients'
          name='ingredients'
          value={values.ingredients}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.ingredients && errors.ingredients} 
          helperText={touched.ingredients && errors.ingredients ? errors.ingredients :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Instructions / steps to do (separated by full stop)" variant="filled"
          required id='receipe'
          name='receipe'
          value={values.receipe}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.receipe && errors.receipe} 
          helperText={touched.receipe && errors.receipe ? errors.receipe :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" required className="textbox" label="Notes / points to remember (separated by full stop)" variant="filled"
         id='notes'
         name='notes'
         value={values.notes}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.notes && errors.notes} 
         helperText={touched.notes && errors.notes ? errors.notes :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Video link" variant="filled"
          required id='videolink'
          name='videolink'
          value={values.videolink}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.videolink && errors.videolink} 
          helperText={touched.videolink && errors.videolink ? errors.videolink :""} />
      </div>
      <br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Prep time (Eg: 10mins)" variant="filled"
          id='preptime'
          name='preptime'
          value={values.preptime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.preptime && errors.preptime} 
          helperText={touched.preptime && errors.preptime ? errors.preptime :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="cooking time needed (Eg: 50mins)" variant="filled"
          id='cooktime'
          name='cooktime'
          value={values.cooktime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.cooktime && errors.cooktime} 
          helperText={touched.cooktime && errors.cooktime ? errors.cooktime :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="soaking time needed (Eg: 20mins)" variant="filled"
          id='soakingtime'
          name='soakingtime'
          value={values.soakingtime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.soakingtime && errors.soakingtime} 
          helperText={touched.soakingtime && errors.soakingtime ? errors.soakingtime :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="fermentation time needed (Eg: 8hrs)" variant="filled"
          id='fermentationtime'
          name='fermentationtime'
          value={values.fermentationtime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fermentationtime && errors.fermentationtime} 
          helperText={touched.fermentationtime && errors.fermentationtime ? errors.fermentationtime :""}/>
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Total time needed (Eg: 2hrs)" variant="filled"
          id='totaltime'
          name='totaltime'
          value={values.totaltime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.totaltime && errors.totaltime} 
          helperText={touched.totaltime && errors.totaltime ? errors.totaltime :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="course type" variant="filled"
          required id='course'
          name='course'
          value={values.course}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.course && errors.course} 
          helperText={touched.course && errors.course ? errors.course :""} />
      </div>
      <br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Cuisine" variant="filled"
          required id='cuisine'
          name='cuisine'
          value={values.cuisine}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.cuisine && errors.cuisine} 
          helperText={touched.cuisine && errors.cuisine ? errors.cuisine :""} />
      </div>
      <br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="servings (Eg: 4 servings)" variant="filled"
          required id='servings'
          name='servings'
          value={values.servings}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.servings && errors.servings} 
          helperText={touched.servings && errors.servings ? errors.servings :""} />
      </div>
      <br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Calories in KCal (Kilo Calories)" variant="filled"
          id='calories'
          name='calories'
          value={values.calories}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.calories && errors.calories} 
          helperText={touched.calories && errors.calories ? errors.calories :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Carbohydrates in g (grams)" variant="filled"
          id='carbohydrates'
          name='carbohydrates'
          value={values.carbohydrates}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.carbohydrates && errors.carbohydrates} 
          helperText={touched.carbohydrates && errors.carbohydrates ? errors.carbohydrates :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Protein in g (grams)" variant="filled"
          id='protein'
          name='protein'
          value={values.protein}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.protein && errors.protein} 
          helperText={touched.protein && errors.protein ? errors.protein :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Fat in g (grams)" variant="filled"
         id='fat'
         name='fat'
         value={values.fat}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.fat && errors.fat} 
         helperText={touched.fat && errors.fat ? errors.fat :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Sodium in mg (milli grams)" variant="filled"
          id='sodium'
          name='sodium'
          value={values.sodium}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.sodium && errors.sodium} 
          helperText={touched.sodium && errors.sodium ? errors.sodium :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Potassium in mg (milli grams)" variant="filled"
         id='potassium'
         name='potassium'
         value={values.potassium}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.potassium && errors.potassium} 
         helperText={touched.potassium && errors.potassium ? errors.potassium :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Fiber in mg (milli grams)" variant="filled"
         id='fiber'
         name='fiber'
         value={values.fiber}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.fiber && errors.fiber} 
         helperText={touched.fiber && errors.fiber ? errors.fiber :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Sugar in mg (milli grams)" variant="filled"
          id='sugar'
          name='sugar'
          value={values.sugar}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.sugar && errors.sugar} 
          helperText={touched.sugar && errors.sugar ? errors.sugar :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Calcium in mg (milli grams)" variant="filled"
          id='calcium'
          name='calcium'
          value={values.calcium}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.calcium && errors.calcium} 
          helperText={touched.calcium && errors.calcium ? errors.calcium :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Iron in mg (milli grams)" variant="filled"
          id='iron'
          name='iron'
          value={values.iron}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.iron && errors.iron} 
          helperText={touched.iron && errors.iron ? errors.iron :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Vitamin A in IU (International Unit)" variant="filled"
         id='vitamina'
         name='vitamina'
         value={values.vitamina}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.vitamina && errors.vitamina} 
         helperText={touched.vitamina && errors.vitamina ? errors.vitamina :""} />
      </div>
      <br></br><br></br>
      <div>
        <TextField id="filled-basic" className="textbox" label="Vitamin C in mg (milli grams)" variant="filled"
         id='vitaminc'
         name='vitaminc'
         value={values.vitaminc}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.vitaminc && errors.vitaminc} 
         helperText={touched.vitaminc && errors.vitaminc ? errors.vitaminc :""} />
      </div>
      <br></br>
      <br></br>
      <Button style={buttonstyle} variant='contained' className='textbox' type="submit"  >
        ADD NEW RECEIPE
      </Button>
      <br></br>
    </div>
    </form>

  );
}
