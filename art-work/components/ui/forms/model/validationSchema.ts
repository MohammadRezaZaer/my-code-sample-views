import * as Yup from 'yup'
import mainFormModel from './mainFormModel'

const {
  formField: {
    Name,
    Email,
Portfolio
  }
} = mainFormModel


export default [


  Yup.object().shape({
    [Name.name]: Yup.string().required(`${Name.requiredErrorMsg}`),

    [Email.name]: Yup.string().email('please check your email format.').required(`${Email.requiredErrorMsg}`),

    [Portfolio.name]: Yup.string().url('please check your url format.').required(`${Portfolio.requiredErrorMsg}`),

  })
]
