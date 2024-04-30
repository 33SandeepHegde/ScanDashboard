import { Container, Paper, Typography } from '@mui/material'
import { DataGrid, GridLogicOperator, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import './style.css'
const HomeTable = ({rows,columns,heading,rowHeight=45}) => {
  return (
    <div style={{
        width:'95%',
        height:'93vh'
    }
    }>
   
    {/* <Typography 
    textAlign={"left"}
    variant='h5'
    sx={{
        marginTop:'1rem',
        marginBottom:'0.5rem',
        textTransform:"uppercase"
    }}
    >{heading}</Typography> */}
    {/* <Paper> */}
    <DataGrid 
    rows={rows}
    columns={columns}
    rowHeight={rowHeight}
    disableRowSelectionOnClick 
    getRowClassName={(params) =>
      params.indexRelativeToCurrentPage % 2 === 0 ? 'primary' : 'Mui-odd'
    }
    initialState={{
        sorting: {
            sortModel: [{ field: 'StudyDate', sort: 'desc' }],
          },
        filter: {
            filterModel: {
              items: ['UploadUserName','InstitutionName','ScanId','PatientName','StudyDate'],
              quickFilterLogicOperator: GridLogicOperator.Or,
            },
          },
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
    headerAlign ={"center"}
    style={{
        height:"80vh",
    }}
    sx={{
        border:"none",
        marginTop:"4rem",
        // borderColor: 'primary.light',
        ".table-header":{
            // bgcolor:'#cce2fe',
            backgroundImage:"linear-gradient(rgb(236 243 245), rgb(144 200 230)); ",
            color:'black',
            display:'flex',
            alignContent:"center",
            justifyContent:"center"
        },
    }}
    />
        
    {/* </Paper> */}
    


    </div>
   

  )
}

export default HomeTable