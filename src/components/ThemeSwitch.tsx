import { useState, useEffect, useCallback } from "react";

import { FaRegMoon } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";

import "../ThemeSwitch.css";

/* DARK MODE:
  color: #FAF9F6;
  background-color: #242424;
  border-color: #FAF9F6;
*/



/* LIGHT MODE
  color: #213547;
  background-color: #acd9ee;
  border-color: #213547;
*/


function ThemeSwitch() {

  const [darkMode, setDarkMode] = useState<boolean>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [hovering, setHovering] = useState<boolean>(false);

  const changeTheme = useCallback(() => {
    const root = document.querySelector(':root') as HTMLElement;
    if (!darkMode && root) {
      root.style.setProperty("color-scheme", "light");
    } else {
      root.style.setProperty("color-scheme", "dark");
    }
  }, [darkMode]);

  useEffect(() => {
    changeTheme();
  }, [changeTheme])

  function handleClick() {
    setDarkMode(prevMode => !prevMode);
    changeTheme();
  }

  return (
    <div className="theme-switch-div">
      <div
        className="icon-wrapper"
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {
          darkMode ? (
            <>
              <FaRegMoon className={`icon ${hovering ? 'hide' : 'show'}`} />
              <FaRegLightbulb className={`icon ${hovering ? 'show' : 'hide'}`} />
            </>
          ) : (
            <>
                <FaRegLightbulb className={`icon ${hovering ? 'hide' : 'show'}`} />
                <FaRegMoon className={`icon ${hovering ? 'show' : 'hide'}`} />
            </>
          )
        }
      </div>
    </div>
  )
}

export default ThemeSwitch