import React, { useState }  from 'react'
import classes from './Header.module.css'

const header = (props) => {

  return (
    <header className={classes.header}>
        <h1>Where in the world?</h1>
        <div className={classes.mood}>
        <i className="fa-solid fa-moon"></i>
          <p>Dark Mode</p>
        </div>
    </header>
  )
}

export default header