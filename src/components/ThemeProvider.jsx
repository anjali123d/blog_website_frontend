// import React, { Children } from 'react'
// import { useSelector } from 'react-redux'

// const ThemeProvider = ({Children}) => {
//     const {theme} = useSelector(state=>state.theme)
//   return (
//     <div className={theme}>
//       <div className='bg-gray-200 text-gray-800 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'>
//         {Children}
//       </div>
//     </div>
//   )
// }

// export default ThemeProvider


import React from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  // Get theme from Redux
  const { theme } = useSelector((state) => state.theme);

  return (
    // Apply theme class to root div
    <div className={theme}>
      {/* Inner wrapper with dark/light background */}
      <div className="bg-gray-200 text-gray-800 dark:bg-[rgb(16,23,42)] dark:text-gray-200 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;


