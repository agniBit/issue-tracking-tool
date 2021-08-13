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


function ShowOptions(props: any) {
  return (
    <div className='options'>
      {props.options.map((optionData: { option: string, icon: string}, i: React.Key) => {
        return (
          <div className='option_row' key={i}>
            <img src={`./assets/${optionData.icon}`} alt='i' />
            <p>{optionData.option}</p>
          </div>
        );
      })}
    </div>
  );
}


function SelectButton(props: any) {
  const { open, setOpen, ref } = OutsideClick();
  return (
    <div className='select_button_conatiner'>
      <button className='select_button' name={props.name} onClick={()=>setOpen(!open)}>
      <img src={props.image} className='select_button_image' alt='img' />
      <p>{props.text}</p>
    </button>
    {(open) ?
      <div className='opetion_select_wrapper' ref={ref}>
        <ShowOptions options={props.list} />
      </div>
      : <span></span>
    }
    </div>
  )
}


function AddIssue(prop:any) {
  const { open, setOpen, ref } = OutsideClick();
  const [check, setCheck] = useState(false);

  useEffect(
    () => {
      if (check) { setOpen(true) };
      setCheck(true);
    }, [prop.isVisible]);

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

  const optionData = {
    assignee: [],
    piority: [{ option: 'High', icon:'high_.png' }, { option: 'Medium', icon:'mid_.png' }, { option: 'Low', icon:'low_.png' }],
    label: [{ option: 'Bug', icon:'bug.png' }, { option: 'Feature', icon:'feature.jpg' }, { option: 'Improvemnet', icon:'improvement.png' }],
    status: [{ option: 'Todo', icon:'pending.png' }, { option: 'Assigned', icon:'taskAssign.jpeg' }, { option: 'Done', icon:'done.jpg' }, { option: 'Canceled', icon:'cancel.jpg' }],
    more:[{ option: 'Add Another field', icon:'more.png' }]
  };
  
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
    (open)?
      <div className='add_new_issue'>
        <div className='new_issue_container' ref={ref}>
          <div className='new_issue_form'>
            <div className='textarea_container'>
              <textarea className='form_input title' placeholder='Title' name='title' onChange={onInputChange} required />
              <textarea className='form_input description' placeholder='Issue Description' name='decrpition' onChange={onInputChange} required />
            </div>
            <div className='select_options'>
              <SelectButton name='assignee' image='./assets/taskAssign.jpeg' text='Assignee' list={optionData.assignee}/>
              <SelectButton name='piority' image='./assets/priority2.png' text='Piority' list={optionData.piority}/>
              <SelectButton name='label' image='./assets/label.jpg' text='Label' list={optionData.label}/>
              <SelectButton name='status' image='./assets/status.png' text='Status' list={optionData.status}/>
              <SelectButton name='more' image='./assets/more.png' text='More' list={optionData.more}/>
            </div>
            <div className='submit_button_container'>
              <button className='submit_form_btn' type='submit' onClick={submitForm}>Add Issue</button>
              <button className='cancel_form_btn' onClick={()=>setOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      :<span></span>
  );
}
  
export default AddIssue;