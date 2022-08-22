import mainFormModel from "@components/ui/forms/model/mainFormModel";

const {
  formField: {
    Name,
    Email,
    Company,
    PhoneNumber
  }
} = mainFormModel

export default {
  [Name.name]: '',
  [Email.name]: '',
  [Company.name]: '',
  [PhoneNumber.name]: ''

}
