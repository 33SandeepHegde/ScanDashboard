
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PreviewIcon from '@mui/icons-material/Preview';
import { Button, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DownloadData from '../constants/download.json';
import HomeTable from './HomeTable';
import './style.css';
import toast from 'react-hot-toast'

const Home = () => {
  let dowloadReport = async (token, ScanID) => {
    const headersReport = {
      'Content-Type': 'application/json',
      'token': `${token}`,
      'ScanID': `${ScanID}`
    };
    const reportsEndpoint = 'http://54.218.64.114:90/ecgapi/downloadreport';
    const result = await axios.get(reportsEndpoint, { headers: headersReport });
    // console.log("Download Report",result.data);
    return result.data;
  }
  const handleReportDownload = async (ScanID) => {
    const token = localStorage.getItem('token');
    let responseData = DownloadData;
    try {
      //api call

      const result = await dowloadReport(token, ScanID);

      const dataJson = JSON.parse(result.Response);
      // console.log("DownloadData", dataJson);
      const data = dataJson[0];
      console.log("DownloadData", data);
      let content = '';
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          content += `${key}: ${data[key]}\n\n`;
        }
      }
      const blob = new Blob([content], { type: 'application/msword' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'ScanConnect-report.doc');
      toast.success("Downloading...")

      document.body.appendChild(link);
      link.click();



      // Cleanup
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error creating Word document:', error);
      toast.error("Sorry,error occurred");
    }


  }

  const columns = [
    {
      field: "ScanId",
      headerName: "Scan Id",
      headerClassName: "table-header",
      width: 250,
      headerAlign: 'center',
      align: "center",

    },
    {
      field: "PatientName",
      headerName: "Patient Name",
      headerClassName: "table-header",
      width: 200,
      headerAlign: 'center',
      align: "center",
    },
    {
      field: "StudyDate",
      headerName: "Study Date",
      headerClassName: "table-header",
      width: 151,
      headerAlign: 'center',
      align: "center",
      renderCell: (params) => {
        let date = new Date(params.row.StudyDate);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let formattedDate = `${day}/${month}/${year}`;
        return (formattedDate)
      },
    },
    {
      field: "IsReported",
      headerName: "Reported",
      headerClassName: "table-header",
      width: 150,
      headerAlign: 'center',
      align: "center",
      renderCell: (params) => (
        params.row.IsReported ? (
          <Tooltip title={"Download Report"} placement="right">
            <Button onClick={() => (handleReportDownload(params.row.ScanId))} variant="text">
              <DoneIcon />
            </Button>
          </Tooltip>
        )
          : (<div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}><MoreHorizIcon /></div>)
      ),

    },
    {
      field: "InstitutionName",
      headerName: "Institution Name",
      headerClassName: "table-header",
      width: 200,
      headerAlign: 'center',
      align: "center",
    },
    // {
    //   field: "AssigneeId",
    //   headerName: "Assignee ID",
    //   headerClassName: "table-header",
    //   width: 100,
    //   headerAlign: 'center',
    //   align: "center",
    // },
    {
      field: "AssigneeName",
      headerName: "Assignee Name",
      headerClassName: "table-header",
      width: 200,
      headerAlign: 'center',
      align: "center",
      renderCell: (params) => (
        params.row.AssigneeName ? (

          params.row.AssigneeName.split(' / Consultant')[0]
        )
          : (params.row.InstitutionName)
      ),
    },
    {
      field: "UploadUserName",
      // headerName:"UploadUser Name",
      headerClassName: "table-header",
      width: 200,
      headerAlign: 'center',
      align: "center",
    },
    {
      field: "ImageUrl",
      headerName: "Scan Image",
      headerClassName: "table-header",
      width: 100,
      headerAlign: 'center',
      align: "center",
      renderCell: (params) => (
        <Tooltip title={"View Scan"} placement="left">
          <a style={{
            textDecoration: 'none',
            color: 'black',
            cursor: "pointer",
            display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'
          }} href={`${params.row.ImageUrl}`} target="_blank" rel="noopener noreferrer">
            <PreviewIcon />
          </a>
        </Tooltip>
      ),
    },

  ]

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [repotedScans, setnotRepotedScans] = React.useState();
  const [notRepotedScans, setnotNotRepotedScans] = React.useState();
  const [rows, setRows] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const header = {
    'Content-Type': 'application/json',
    // withCredentials: true
  }
  //Reported Scans:
  let getAllReportedScans = async (token) => {
    const headersReport = {
      'Content-Type': 'application/json',
      'token': `${token}`
    };
    const reportsEndpoint = 'http://54.218.64.114:90/ecgapi/getscans/?numberOfRows=1000&isReported=True&searchPatientName=&showAllRecords=True';
    const result = await axios.get(reportsEndpoint, { headers: headersReport })
    // console.log(result.data);
    return result.data;
  }
  // Not reported Scans :
  let getAllNotReportedScans = async (token) => {
    const headersReport = {
      'Content-Type': 'application/json',
      'token': `${token}`
    };
    const reportsEndpoint = 'http://54.218.64.114:90/ecgapi/getscans/?numberOfRows=1000&isReported=False&searchPatientName=&showAllRecords=True';
    const result = await axios.get(reportsEndpoint, { headers: headersReport })
    // console.log(result.data);
    return result.data;
  }
  let getSpecialists = async (token) => {

    const getSpecUrl = 'http://54.218.64.114:90/ecgapi/getspecialists';
    try {
      const headers1 = {
        'Content-Type': 'application/json',
        'token': `${token}`
      };
      const result = await axios.get(getSpecUrl, { headers: headers1 })
      // console.log(result.data);
      return result.data;

    } catch (error) {
      console.log('Error in getting specialists', error);
    }

  }
  const getCombinedReports = async (token) => {
    try {
      const result1 = await getAllReportedScans(token);
      const result = await getAllNotReportedScans(token);
      const specialist = await getSpecialists(token);
      const specialistParseed = JSON.parse(specialist.Response)
      // console.log("Specialist",JSON.parse(result1.Response));
      if (result && result1) {
        const tes = JSON.parse(result1.Response);
        //  console.log(typeof(tes));
        const tes1 = JSON.parse(result.Response);
        //  console.log(typeof(tes1));
        const mergedData = [...tes, ...tes1];
        // console.log(mergedData);
        // test
        const combinedObject = mergedData.map((item1) => {

          const matchingObject = specialistParseed.find((item2) => item2.UserID === item1.AssigneeId);
          // console.log("matching",matchingObject);

          return {
            ...item1,
            AssigneeName: matchingObject ? matchingObject.UserDisplayName : null,
          };

        });
        // 
        setRows(combinedObject.map((row, index) => ({
          ...row,
          id: index
        })))
        console.log("combined successfull");


      } else {
        console.log("error in combined scsns");
      }
    } catch (err) {
      console.log("error combined occured", err);
    }

  }




  // OG
  //  console.log("Scans",rows);
  useEffect(() => {
    const token = localStorage.getItem('token');
    getCombinedReports(token);
  }, [])



  // tabe


  return (
    <div style={{
      // backgroundImage:"linear-gradient(rgb(236 243 245), rgb(161 188 202))",
      backgroundColor: '#eeecec',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", paddingTop: "0.5rem", height: "calc(100vh - 4rem)", width: "100%"
    }}>

      {rows.length > 0 ? <HomeTable heading={'all scans'} columns={columns} rows={rows} /> :
        <>

          <div class="loader-container">
            <div class="loader"></div>
          </div>
        </>}


    </div>

  );
}

export default AppLayout()(Home)