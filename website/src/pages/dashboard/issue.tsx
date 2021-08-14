import React from "react";
import { useLocation } from "react-router-dom";

export default function ShowIssue(props: any) {
  const location = useLocation();
  var issueId = new URLSearchParams(location.search).get('issueId');
  console.log(issueId);
  return (
    <div className='dashboard'>
      {issueId}
    </div>
  );
}