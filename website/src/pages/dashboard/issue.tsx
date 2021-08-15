import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";

export default function ShowIssue(props: any) {
  const [commentData, setCommentData] = useState('loading data');
  const location = useLocation();
  var issueId = new URLSearchParams(location.search).get('issueId');
  useEffect(() => {
    var skip = 0;
    var limit = 30;
    var accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      var config:AxiosRequestConfig = {
        method: 'get',
        url: `http://localhost:8765/api/data/getCommentsById?issueId=${issueId}&skip=${skip}&limit=${limit}`,
        headers: { 
          'auth-token': accessToken
        }
      };
      axios(config)
      .then(function (response: { data: any; }) {
        console.log(response.data);
        if (response.data) setCommentData(JSON.stringify(response.data));
        else setCommentData('data not found');
      })
      .catch(function (error: any) {
        console.log(error);
      });
    }
  })
  return (
    <div className='dashboard'>
      <div>{issueId}</div>
      <div>{commentData?commentData:'loading data'}</div>
    </div>
  );
}