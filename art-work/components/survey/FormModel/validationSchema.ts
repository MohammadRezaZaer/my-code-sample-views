import * as Yup from 'yup'
import consultFormModel from './consultFormModel'



export default [


  Yup.object().shape({
    ["activityCat"]: Yup.string()

  }),



]
