import React from 'react'
import {Helmet} from 'react-helmet-async'
const Title = ({title="Scan Dashboard" , description="It's a scan connect dashboard"}) => {
  return (
    <>
    <Helmet>
    <title>{title}</title>
    <meta name='description' content={description} />   
    </Helmet>
 
    </>
  )
}

export default Title