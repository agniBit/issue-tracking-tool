import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export default function Dashboard() {
  const [fetchData, fetchDataSet] = useState(Array);
  useEffect(() => {
    var localData = localStorage.getItem('userData');
    if (localData) {
      var userData = JSON.parse(JSON.stringify(localData));
      var data = JSON.stringify({
        "skip": 100,
        "limit": 20
      });
      console.log(userData.accessToken);

      var config: AxiosRequestConfig = {
        method: 'post',
        url: 'http://localhost:8765/api/data/getissues',
        headers: {
          'auth-token': userData.accessToken,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response: { data: string }) {
          fetchDataSet(JSON.parse(response.data));
        })
        .catch(function (error: any) {
          console.log(error);
        });
    } else {
      fetchDataSet(['login to continue'])
    }
  },[fetchDataSet]);

  return (
    <div className='dashboard'>
      {fetchData}
    </div>
  );
}