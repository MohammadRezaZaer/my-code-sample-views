module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '2100px',
      },
      zIndex: {
        '-1': '-1',
        '1':'1'
      },
      fontFamily: {
        body: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary:"#9D64ED",
        secondary:"#FFEA7E",
        accent:"#FFEA7E",
        'button-click':"#7C31E5",
        black2:"#262626",
        black3:"#101010",

        background:"#0D1220",
        navColor:"#090D17",

        shiri:"#F9f9f9",
        Error:"#C70B0B",
        black:"#0D1220",
        grey1:"#A0A1A1",
        grey2:"#737373",
        grey3:"#CDCBCB",
        green1:"#00dfd8"
      },
      social: {
        facebook: '#3b5998',
        'facebook-hover': '#35508a',
        twitter: '#1da1f2',
        instagram: '#e1306c',
        youtube: '#ff0000',
        google: '#4285f4',
        'google-hover': '#3574de',
      },
      textColor: {
        //body: withOpacity('--text-base'),
        //'body-dark': withOpacity('--text-base-dark'),
        // muted: withOpacity('--text-muted'),
        // 'muted-light': withOpacity('--text-muted-light'),
        // heading: withOpacity('--text-heading'),
        // 'sub-heading': withOpacity('--text-sub-heading'),
        // bolder: withOpacity('--text-text-bolder'),
      },
    },
  },
  plugins: [],
}
