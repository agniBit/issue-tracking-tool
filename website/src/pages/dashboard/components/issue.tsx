import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import '../css/issue.scss';

function Comments(props: { commentData: any }) {
  return (
    <div className='comment_row'>
      <div className='user_image'>
        <img src='/assets/user.png' alt='user' />
      </div>
      <div className='comment_box'>
        <div className='comment_header'>
          <div className='commented_by'>
            <h5>{props.commentData.commentedBy.username}</h5>
          </div>
          <div className='user_role'>
            <h5>sr. developer</h5>
          </div>
        </div>
        <div className='comment_text'>
          <p>{props.commentData.comment}</p>
        </div>
        <div className='comment_footer'>
          <p>16th aug, 2021</p>
        </div>
      </div>
    </div>
  );
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
    <div className='issueSection'>
      <div className='issueId'>
        <p>{`IssueId -> ${issueData.issueId}`}</p>
        <div className='copyClipboardlogo'>
          <img src='/assets/copytoclipboard.png' alt='copy' />
          <div className='info_box'>
            <h5>Copy to clipboard</h5>
          </div>
        </div>
      </div>
      <div className='title'><h3>{issueData.title}</h3></div>
      <div className='description'><p>{issueData.decrpition}</p></div>
      <div className='actions'>
        <h4>Actions</h4>
        <div className='actions_wrapper'>
          {
            (commentData) ?
              commentData.map((data: any, i: number) => {
              return (<Comments commentData={data} key={i} />)
              }) :
              <div>loading</div>
          }
        </div>
      </div>
    </div>
  )
}
