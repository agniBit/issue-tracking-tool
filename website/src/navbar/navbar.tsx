import React from "react";
import './navbar.scss';

function Navlink(props: any) {
  return (
    <a href={props.href}>
      <div className={`navlink ${props.class}`}>
        <h3>{props.text}</h3>
      </div>
    </a>
  );
}

export default function NavbarDashboard() {
  return (
    <div className='navbar_container'>
      <div className='navbar_top_section'>
        <div className='profile_container'>
          <img src='/assets/user.png' alt='user' />
          <h3>Abhishek Agnihotri</h3>
        </div>
        <hr></hr>
        <p>Shortcuts</p>
        <Navlink href='/activity' text='Activity' class='activity' />
        <Navlink href='/your_tasks' text='Your Tasks' class='your_tasks' />
        <Navlink href='/todos' text='Todos' class='todos' />
        <p>Channels</p>
        <Navlink href='/channel' text='CH1' class='' />
        <p>Your Tasks</p>
        <Navlink href='/inprogress' text='Inprogress' class='inprogress' />
        <Navlink href='/assigned' text='Assigned' class='assigned' />
        <Navlink href='/completed' text='Completed' class='completed' />
      </div>
      <div className='about_company'>
        <hr />
        <h3>IssueTracker</h3>
        <p>Terms</p>
      </div>
    </div>
  );
}