import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {Link as LinkComponent} from 'react-router-dom'

export const VisuallyHiddenInput = styled("input") (  {
    clip:'react(0 0 0 0)',
    position:'absolute',
    padding:0,
    border:0,
    height:1,
    overflow:"hidden",
    margin:-1,
    whiteSpace:'nowrap',
    width:1
}  )

export const Link=styled(LinkComponent)`
text-decoration:none;
color:black;
padding:0.5rem;
&:hover{
    background-color:rgba(0,0,0,0.1);
}
`;

// export const StyledDataGrid = styled(DataGrid)((theme) => ({
//     "& .MuiDataGrid-sortIcon": {
//     opacity: 1,
//     color: "white",
//     },
//     "& .MuiDataGrid-menuIconButton": {
//     opacity: 1,
//     color: "white"
//     },
//     }));