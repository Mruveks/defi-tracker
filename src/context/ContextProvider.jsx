import React, { createContext, useContext, useState } from 'react';

const ContextProvider = ({ children }) => {

  const StateContext = createContext();

  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);

    setThemeSettings(false);
  }
  
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]:true});
  }

  return (
    <StateContext.Provider
      value={{

        isClicked,
        setIsClicked,
        handleClick,

        currentColor, setCurrentColor,

        setMode, setColor
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export default ContextProvider

export const useStateContext = () => useContext(StateContext);