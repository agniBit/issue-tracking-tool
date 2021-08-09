import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import AddIssue from "./addIssue";

// [object Null]
// [object Array]
// [object Object]
// typeof String
// typeof Number

export default function Dashboard(props:any) {
  const [fetchData, fetchDataSet] = useState(Array);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [addIssueWindow, setAddIssueWindow] = useState(false);
  useEffect(() => {
    if (accessToken) {
      console.log(fetchData);
      var data = JSON.stringify({
        "skip": 100,
        "limit": 20
      });
      var config: AxiosRequestConfig = {
        method: 'post',
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
          fetchDataSet(response.data.data);
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
      <div>
        {
          accessToken ?
            fetchData.map((data, i) => {
              let d = JSON.parse(JSON.stringify(data));
              return (
                <div key={i}>
                  <div>{JSON.stringify(d.waID)}</div>
                  <div>{(Object.prototype.toString.call(d.msg) + JSON.stringify(d.msg))}</div>
                  <div>{JSON.stringify(d.msg.user_id)}</div>
                  <div>{(Object.prototype.toString.call(d.msg.buttons) + JSON.stringify(d.msg.buttons))}</div>
                  <div>{JSON.stringify(d.msg.botMessage)}</div>
                </div>);
            }) : <button onClick={() => { props.history.replace('/login'); }}>Login</button>
        }
      </div>
    </div>
  );
}