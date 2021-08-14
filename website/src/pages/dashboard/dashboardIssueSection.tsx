import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import './css/dashboardIssueSection.scss'

function CreateRow(row: {
  history: any,
  issueId: string;
  row_type: string;
  title: string | null | undefined;
  raisedBy: string | null | undefined;
  category: string | null | undefined;
  priority: string;
  assignee: string | null | undefined;
  status: string | null | undefined;
  label: string | null | undefined;
}) {
  console.log(row);
  const clickHandler = (e: any) => {
    console.log(row.history);
    row.history.push(`/dashboard/issue?issueId=${e}`);
  }

  var priority;
  var status;
  var category;

  switch (row.priority?.toLowerCase()) {
    case 'high': priority = '/assets/high_.png'; break;
    case 'medium': priority = '/assets/mid_.png'; break;
    case 'low': priority = '/assets/low_.png'; break;
    default: priority = '/assets/low_.png';
  }

  switch (row.status?.toLowerCase()) {
    case 'todo': status = '/assets/pending.png'; break;
    case 'assigned': status = '/assets/taskAssign.jpeg'; break;
    case 'done': status = '/assets/done.jpg'; break;
    case 'canceled': status = '/assets/cancel.jpg'; break;
    default: status = '/assets/pending.png';
  }

  switch (row.category?.toLowerCase()) {
    case 'bug': category = '/assets/bug.png'; break;
    case 'feature': category = '/assets/feature.jpg'; break;
    case 'improvemnet': category = '/assets/improvement.png'; break;
    default: category = '/assets/improvement.png';
  }

  return (
    <div className={`data_row ${row.row_type}`} onClick={() => clickHandler(row.issueId)}>
      <div className='icon priority'><img src={priority} alt='p' /></div>
      <div className='icon category'><img src={category} alt='p' /></div>
      <div className='title'>{row.title}</div>
      <div className='raisedBy'>{row.raisedBy}</div>
      <div className='icon status'><img src={status} alt='p' /></div>
    </div>
  );
}

export default function DashboardIssueSection(props:any) {
  const [fetchData, fetchDataSet] = useState(Array);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [showAddIssueForm, setShowAddIssueForm] = useState(false);

  useEffect(() => {
    if (accessToken) {
      console.log(fetchData);
      var skip = 0;
      var limit = 50;
      var config: AxiosRequestConfig = {
        method: 'get',
        url: `http://localhost:8765/api/data/getissues?skip=${skip}&limit=${limit}`,
        headers: {
          'auth-token': accessToken,
          'Content-Type': 'application/json'
        }
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
              var row_type: string = (i % 2 === 0) ? 'even_row' : 'odd_row';
              let d = JSON.parse(JSON.stringify(data));
              return (
                <CreateRow issueId={d.issueId} title={d.title} raisedBy={d.raisedBy} category={d.category} priority={d.priority} assignee={d.assignee} status={d.status} label={d.label} row_type={row_type} history={props.history}/>
              );
            })
          : <button onClick={() => { props.history.replace('/login'); }}>Login</button>
        }
      </div>
    </div>
  );
}