/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing: {
        'm1%': '-1%',
        '1px': '1px',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
        '16px': '16px',
        '17px': '17px',
        '18px': '18px',
        '19px': '19px',
        '20px': '20px',
      },
      colors: {
        'basic-gray': '#929292',
        'ww': '#009f10'
      },
      fontSize: {
        upword: ['12px', { lineHeight: '150%' }],
        day: ['14px', { lineHeight: '143%' }],
        text: ['16px', { lineHeight: '150%' }],
      },
      borderWidth: {
        3: '3px',
        5: '5px',
        6: '6px',
        7: '7px',
      },
      borderRadius: {
        '1px': '1px',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
        '16px': '16px',
        '17px': '17px',
        '18px': '18px',
        '19px': '19px',
        '20px': '20px',
      }
    },
  }
}