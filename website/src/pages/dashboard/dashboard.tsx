import React, { useState } from "react";
import NavbarDashboard from "../../navbar/navbar";
import DashboardIssueSection from "./dashboardIssueSection";
import './css/dashboard.scss';
import AddIssue from "./addIssue";

export default function Dashboard() {
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
        <DashboardIssueSection />
      </div>
      <AddIssue isVisible={showAddIssueForm} />
    </div>
  )
}