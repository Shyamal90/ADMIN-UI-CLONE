import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { width } from '@mui/system';
import axios from 'axios'
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 290,
  },
  {
    field:'role',
    headerName:'Role',
    width: 130
  },
  {
    field:'actions',
    headerName:'Actions',
    width:160
  }
];



export default function DataTable() {
  /* =====================
     =====================
     Fetching Data
     =====================
     =====================
  */
      const [usersData,setUserData] = useState([]);
      
      useEffect(()=>{
       getData();
      },[])

      const getData = () => {
        axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`).then((resp)=>{
          setUserData(resp.data);
        })
      }


      const rows = [...usersData];

      let newData = rows.map((user)=>{
        return
      })

      console.log(newData)
  /* ============== */


  return (
    <div style={{ height: 650, width: '75%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        editable={{
          onRowAdd:()=>(newdata) => null,
          onRowDelete:()=>(newdata)=>null,
          onRowUpdate:()=>(newData)=>null
        }}
      />
    </div>
  );
}

