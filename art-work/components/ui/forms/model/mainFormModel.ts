export default {
  formId: 'portfolioForm',
  formField: {
    Name: {
      id:0,
      name: 'name',
      label: 'Full name*',
      requiredErrorMsg: 'Name is required',
      placeholder:'Enter your full name',
      title: 'Cool, can we get your name?',
      percent: 0,
      end:'your name is'
    },
    Email: {
      id:1,
      name: 'email',
      label: 'Email*',
      requiredErrorMsg: 'Email is required',
      placeholder:'name@example.com',
      title: 'Great. Now what\'s your email?',
      percent: 25,
      end:'your email'
    },
    Portfolio: {
      id:2,
      name: 'portfolio',
      label: 'Portfolio Link*',
      requiredErrorMsg: 'Portfolio url is required',
      placeholder:'Enter Portfolio URL',
      title: 'Your portfolio includes a link to one of your work profiles to review your portfolio (Instagram or website, etc.)',
      percent: 0,
      end:'your portfolio is'
    },



  }
};
