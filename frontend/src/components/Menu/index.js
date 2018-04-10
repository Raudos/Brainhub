import React from "react";
import { Link } from 'react-router-dom';

export const NavButton = props => {
  return (
    <div className={`menu-nav ${props.route === props.location.pathname ? "active" : ""}`}>
      <Link to={props.route}>
        <i className={props.iconClass}/>
        {props.text}
      </Link>
    </div>
  )
}

export default props => (
  <div className="menu">
    <NavButton
      {...props}
      text="Events List"
      route="/events"
      iconClass="fas fa-list"
    />

    <NavButton
      {...props}
      text="Event Creator"
      route="/eventCreator"
      iconClass="far fa-plus-square"
    />
  </div>
);
