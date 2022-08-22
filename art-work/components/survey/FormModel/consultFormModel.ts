import * as Yup from 'yup'

export default {
  formId: 'consultForm',
  formField: {


    activityCat: {
      id:0,
      name: 'activityCat',
      label: 'Type Other category And Activity:',
      text_placeholder:'Type your answer here or select from items',
      requiredErrorMsg: 'Your Answer for this item is required',
      title: 'What is your artistic category and activity?*',
      percent: 50,
      items : ['Painting', 'Photography', 'DRAWING', 'Sculpture','illustration', 'Other'],
      validationSchema:  Yup.object().shape({
        ['activityCat']: Yup.string()

      }),
      textInputKey:"OtherCategory"

    },
    Goal: {
      id:1,
      name: 'Goal',
      label: 'Type Other goal:',
      text_placeholder:'Type Other goal:',
      requiredErrorMsg: 'Your Answer for this item is required',
      title: 'What is your goal after joining Artwork?*',
      percent: 50,
      items : ['My goal is to be able to have my own online gallery and sell my work', 'My goal is to be able to share my online gallery link within our social networks', 'I want to have good marketing to be seen and sell my work','Other'],
      validationSchema:  Yup.object().shape({
        ['Goal']: Yup.string()

      }),
      textInputKey:"OtherGoal"

    },
    Year: {
      id:1,
      name: 'Year',
      label: 'Type Other goal:',
      text_placeholder:'Type Other goal:',
      requiredErrorMsg: 'Your Answer for this item is required',
      title: 'How many years you have experience in art work?*',
      percent: 50,
      items : ['Less than two years', 'Between two and five years', 'Between Five to ten years','Over ten years'],
      textInputKey:"OtherGoal"

    },
    Brief: {
      id:1,
      name: 'Brief',
      label: 'Write a brief',
      text_placeholder:'Write a brief',
      requiredErrorMsg: 'Your Answer for this item is required',
      title: 'Tell us a brief biography of yourself?*',
      percent: 50,
      textInputKey:"BriefText"

    },
  }
};
