import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import AddIssue from "./addIssue";
import './css/dashboardIssueSection.scss'

export default function DashboardIssueSection(props:any) {
  const [fetchData, fetchDataSet] = useState(Array);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [showAddIssueForm, setShowAddIssueForm] = useState(false);

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
  }, [accessToken]);

  return (
    <div className='dashboard'>
      <div className='data_row_wrapper'>
        {
          accessToken ?
            fetchData.map((data, i) => {
              var row_type:string = (i % 2 === 0) ? 'even_row' : 'odd_row';
              let d = JSON.parse(JSON.stringify(data));
              return (
                <div key={i} className={`data_row ${row_type}`}>
                  <div className='title'>{d.title}</div>
                  <div className='raisedBy'>{d.raisedBy}</div>
                  <div className='category'>{d.category}</div>
                  <div className='piority'>{d.piority}</div>
                  <div className='assignee'>{d.assignee}</div>
                  <div className='status'>{d.status}</div>
                </div>);
            }) : <button onClick={() => { props.history.replace('/login'); }}>Login</button>
        }
      </div>
    </div>
  );
}