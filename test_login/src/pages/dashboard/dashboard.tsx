import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import AddIssue from "./addIssue";
import './css/dashboard.scss'

// [object Null]
// [object Array]
// [object Object]
// typeof String
// typeof Number

export default function Dashboard(props:any) {
  const [fetchData, fetchDataSet] = useState(Array);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  useEffect(() => {
    if (accessToken) {
      console.log(fetchData);
      var data = JSON.stringify({
        "skip": 100,
        "limit": 20
      });
      var config: AxiosRequestConfig = {
        method: 'get',
        url: 'http://localhost:8765/api/data/getissues',
        headers: {
          'auth-token': accessToken,
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios(config)
        .then(function (response: any) {
          console.log(response.data);
          fetchDataSet(response.data);
        })
        .catch(function (error: any) {
          console.log(error);
        });
    } else {
      fetchDataSet(['login to continue'])
    }
  }, []);
  

  return (
    <div className='dashboard'>
      <div>
        <AddIssue />
      </div>
      <div className='data_row_wrapper'>
        {
          accessToken ?
            fetchData.map((data, i) => {
              var row_type:string = (i % 2 === 0) ? 'even_row' : 'odd_row';
              let d = JSON.parse(JSON.stringify(data));
              return (
                <div key={i} className={`data_row ${row_type}`}>
                  <div className='title'>{d.title}</div>
                  {/* <div className='decrpition'>{d.decrpition}</div> */}
                  <div className='raisedBy'>{d.raisedBy}</div>
                  <div className='category'>{d.category}</div>
                  {/* <div className='subcategory'>{d.subcategory}</div> */}
                  <div className='piority'>{d.piority}</div>
                  <div className='assignee'>{d.assignee}</div>
                  <div className='status'>{d.status}</div>
                  {/* <div>{JSON.stringify(d.waID)}</div>
                  <div>{(Object.prototype.toString.call(d.msg) + JSON.stringify(d.msg))}</div>
                  <div>{JSON.stringify(d.msg.user_id)}</div>
                  <div>{(Object.prototype.toString.call(d.msg.buttons) + JSON.stringify(d.msg.buttons))}</div>
                  <div>{JSON.stringify(d.msg.botMessage)}</div> */}
                </div>);
            }) : <button onClick={() => { props.history.replace('/login'); }}>Login</button>
        }
      </div>
    </div>
  );
}