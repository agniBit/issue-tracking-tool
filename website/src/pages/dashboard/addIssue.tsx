import axios, { AxiosRequestConfig } from "axios";
import React, { useState, useEffect } from 'react';
import OutsideClick from "../../clickOutSide";
import './css/addIssue.scss'


interface addIssueFormData{
  title: string,
  decrpition: string,
  raisedBy: string | null,
  type: string,
  category: string,
  subcategory: string,
  piority: string,
  assignee: string,
  lable: string,
  status: string,
  attachment: object
}


function SelectButton(props: any) {
  return (
    <div className='select_button_conatiner'>
      <button className='select_button' name={props.name}>
        <img src={props.image} className='select_button_image' alt='img' />
        <text>{props.text}</text>
      </button>
    </div>
  );
}


function AddIssue(isVisible: any) {
  const { open, setOpen, ref } = OutsideClick();
  useEffect(
    () => {
      setOpen(isVisible);
    }, [isVisible, setOpen]);

  const [issuData, setIssueData] = useState<addIssueFormData>({
    title: "",
    decrpition: "",
    raisedBy: localStorage.getItem('username'),
    type: "",
    category: "Bug",
    subcategory: "",
    piority: "non",
    assignee: "-",
    lable: "bug",
    status: "todo",
    attachment: {}
  });

  const onInputChange = (e: { target: { name: string; value: string; }; }) => {
    setIssueData({
      ...issuData,
      [e.target.name]: e.target.value
    });
  }
  
  const submitForm = async (e:any) => {
    e.preventDefault();
    var req_data: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:8765/api/data/addissue',
      headers: {
        'auth-token': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      },
      data : issuData,
    };
    await axios(req_data).then(function (response: { data: any; }) {
      console.log('data pushed to DB');
    }).catch(function (error: any) {
      console.log(error);
    });
  }
  console.log('open?');
  console.log(open);

  return (
    (!open)?
      <span></span>:
      <div className='add_new_issue'>
        <div className='new_issue_container' ref={ref}>
          <form className='new_issue_form'>
            <div className='textarea_container'>
              <textarea className='form_input title' placeholder='Title' name='title' onChange={onInputChange} required />
              <textarea className='form_input description' placeholder='Issue Description' name='decrpition' onChange={onInputChange} required />
            </div>
            <div className='select_options'>
              <SelectButton name='assignee' image='./assets/taskAssign.jpeg' text='Assignee' />
              <SelectButton name='piority' image='./assets/priority2.png' text='Piority' />
              <SelectButton name='label' image='./assets/label.jpg' text='Label' />
              <SelectButton name='status' image='./assets/status.png' text='Status' />
              <SelectButton name='more' image='./assets/more.png' text='More' />
              {/* <select name="category" className='select_input' onChange={this.onInputChange} id="category">
                <option value="category_id">fetch category</option>
              </select>
              <select name="assignee" className='select_input' onChange={this.onInputChange} id="assignee">
                <option value="member_id">fetch team members</option>
              </select>
              <select name="piority" className='select_input' onChange={this.onInputChange} id="piority">
                <option value="non">No priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select name="label" className='select_input' onChange={this.onInputChange} id="label">
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="improvemnet">Improvemnet</option>
              </select>
              <select name="status" className='select_input' onChange={this.onInputChange} id="status">
                <option value="todo">Todo</option>
                <option value="done">Done</option>
                <option value="assigned">Assigned</option>
                <option value="canceled">Canceled</option>
              </select> */}
            </div>
            <div className='submit_button_container'>
              <button className='submit_form_btn' type='submit' onClick={submitForm}>Add Issue</button>
              <button className='cancel_form_btn'>Cancel</button>
            </div>
          </form>
        </div>
      </div>
  );
}
  
export default AddIssue;