import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Container, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'

const AppLayout = () => WrappedComponent => {
  
  return (props) =>{
    const params=useParams();

    return (
    <>
    <Title/>
      <Header/>
      {/* <Container > */}
      <WrappedComponent {...props} />
      {/* </Container> */}

      {/* <Grid container height={"calc(100vh - 4rem)"} xs={15} >
        
        <WrappedComponent {...props} />

      </Grid> */}

   
      {/* <div>Footer</div> */}
     </>
     )
    
  }
}

export default AppLayout