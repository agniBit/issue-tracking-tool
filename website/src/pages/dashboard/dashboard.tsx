import React, { useState } from "react";
import NavbarDashboard from "../../navbar/navbar";
import DashboardIssueSection from "./dashboardIssueSection";
import './css/dashboard.scss';
import AddIssue from "./addIssue";
import { Route, Router, Switch } from "react-router";
import ShowIssue from "./issue";

export default function Dashboard(props: { history: any; }) {
  const [showAddIssueForm, setShowAddIssueForm] = useState(false);
  return (
    <div className='dashboard_container'>
      <NavbarDashboard />
      <div className='IssueSectionContainer'>
        <div className='addIssue_btn_container'>
          <button className='addIssue_btn' onClick={() => setShowAddIssueForm(!showAddIssueForm)}>
            <div className='addIssue_Btn_content'>
              <div className='addIssue_image'></div>
              <span>Add New Issue</span>
            </div>
          </button>
        </div>
          <Switch>
            <Route path='/dashboard' exact component={DashboardIssueSection} />
            <Route path='/dashboard/issue' exact component={ShowIssue} />
          </Switch>
        {/* </Router> */}
      </div>
      <AddIssue isVisible={showAddIssueForm} />
    </div>
  )
}