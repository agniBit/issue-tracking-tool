import axios, { AxiosRequestConfig } from "axios";
import React from "react";
  

class AddIssue extends React.Component {
  constructor (){
    super(AddIssue);
    this.state = {
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
    }
  }

  onInputChange = (e: { target: { name: string; value: string; }; }) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  submitForm = async (e:any) => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
    var req_data: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:8765/api/data/addissue',
      headers: {
        'auth-token': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      },
      data : this.state,
    };
    await axios(req_data).then(function (response: { data: any; }) {
      console.log('data pushed to DB');
    }).catch(function (error: any) {
      console.log(error);
    });
  }

  render() {
    return (<div className='addIssueForm'>
      <form>
        <input type='text' className='form_input' name='title' onChange={this.onInputChange} required />
        <input type='text' className='form_input' name='decrpition' onChange={this.onInputChange} required />
        <select name="category" onChange={this.onInputChange} id="category">
          <option value="category_id">fetch category</option>
        </select>
        <select name="assignee" onChange={this.onInputChange} id="assignee">
          <option value="member_id">fetch team members</option>
        </select>
        {/* <select name="type" onChange={this.onInputChange} id="type">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select> */}
        {/* <select name="subcategory" onChange={this.onInputChange} id="subcategory">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select> */}
        <select name="piority" onChange={this.onInputChange} id="piority">
          <option value="non">No priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select name="label" onChange={this.onInputChange} id="label">
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
          <option value="improvemnet">Improvemnet</option>
        </select>
        <select name="status" onChange={this.onInputChange} id="status">
          <option value="todo">Todo</option>
          <option value="done">Done</option>
          <option value="assigned">Assigned</option>
          <option value="canceled">Canceled</option>
        </select>
        <button type='submit' onClick={this.submitForm}>Add Issue</button>
      </form>
    </div>);
  }
}
  
export default AddIssue;