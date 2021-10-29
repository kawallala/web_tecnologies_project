import React from 'react'
import './Header.css'
//import b from './background.jpg'

class Header extends React.Component{
    render(){
        return(
            <div className = 'header_container' 
            //style = {{ backgroundImage: `url(${b})` }}
            >
                <h2 className = 'header_text'>
                    This is Marlena's personal Header!
                </h2>
            </div>
        )
    }
}

export default Header