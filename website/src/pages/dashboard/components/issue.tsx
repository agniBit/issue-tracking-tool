import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";


function Comments(props: { commentData: any }) {
  return (
    <div className='comment_row'>
        {props.commentData.id}
    </div>
  )
}

export default function ShowIssue(props: any) {
  var accessToken = localStorage.getItem('accessToken')
  const [commentData, setCommentData] = useState(Array);
  const [issueData, setIssueData] = useState(Object);
  const location = useLocation();
  const issueId = new URLSearchParams(location.search).get('issueId');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);


  useEffect(() => {
    if (accessToken) {
      const fetchCommentData = async (accessToken: any) => {
        const config:AxiosRequestConfig = {
          method: 'get',
          url: `http://localhost:8765/api/data/getCommentsById?issueId=${issueId}&skip=${skip}&limit=${limit}`,
          headers: { 
            'auth-token': accessToken
          }
        };
        axios(config)
        .then(function (response: { data: any; }) {
          console.log(response.data.comments);
          if (response.data) setCommentData(response.data.comments);
          else setCommentData([]);
        })
        .catch(function (error: any) {
          console.log(error);
        });
      }
    
      const fetchIssueData = async (accessToken: any) => {
        var config:AxiosRequestConfig = {
          method: 'get',
          url: `http://localhost:8765/api/data/getissueById?issueId=${issueId}`,
          headers: { 
            'auth-token': accessToken
          }
        };
        axios(config)
        .then(function (response: { data: any; }) {
          console.log(response.data);
          if (response.data) setIssueData(response.data);
          else setIssueData({});
        })
        .catch(function (error: any) {
          console.log(error);
        });
      }
      fetchCommentData(accessToken);
      fetchIssueData(accessToken);
    }
  },[accessToken, issueId, limit, skip])

  return (
    <div className='dashboard'>
      <div className='issueId'>{issueData.issueId}</div>
      <div className='title'>{issueData.title}</div>
      <div className='description'>{issueData.description}</div>
      <div className='actions'>
        {
          (commentData) ?
            commentData.map((data: any, i: number) => {
            return (<Comments commentData={data} key={i} />)
            }) :
            <div>loading</div>
        }
      </div>
      bigbeurbdvc
    </div>
  )
}

function commentData(commentData: any): string {
  throw new Error("Function not implemented.");
}
