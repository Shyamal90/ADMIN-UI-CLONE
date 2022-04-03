import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CustomizedDialogs from '../PopupBox/CustomizedDialogs';
import Pagination from '../Pagination/Pagination';
import Button from '@mui/material/Button';


function User() {
    /* =====================
     =====================
     Fetching Data
     =====================
     =====================
  */
    const [usersData, setUserData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`).then((resp) => {
            setUserData(resp.data);
        })
    }



    /* =====================
     =====================
     Search  Data
     =====================
     =====================
  */
    const [searchResult, setSearchResult] = useState("");

    useEffect(() => {
        if (searchResult.length !== 0) {
            getFilterData(searchResult)
        } else if (searchResult.length === 0) {
            getData()
        }


    }, [searchResult])

    const getFilterData = (query) => {
        const filterData = usersData.filter((user) => {
            return Object.values(user).join(" ").toLowerCase().includes(query.toLowerCase())
        })
        console.log(filterData)
        setUserData(filterData)
    }



    /* =====================
     =====================
     Handling Selected checkbox
     =====================
     =====================
  */

    const handleSelected = (Selected_user) => {
        let { name, checked } = Selected_user;

        if (name === "allSelected") {
            let updateUserData = usersData.map((user) => { return { ...user, isChecked: checked } })
            setUserData(updateUserData)
        } else {
            let updateUserData = usersData.map((user) => user.name === name ? { ...user, isChecked: checked } : user)
            console.log(updateUserData)
            setUserData(updateUserData)
        }

    }


    /* =====================
     =====================
     Delete User Data
     =====================
     =====================
  */

    const handleDelete = (id) => {
        let updatedData = usersData.filter((user) => user.id !== id)
        setUserData(updatedData);
    }



    /* =====================
     =====================
     Pagination
     =====================
     =====================
  */

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);



    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = usersData.slice(indexOfFirstPost, indexOfLastPost)

    //chage page
    const paginate = (page_number) => setCurrentPage(page_number)



   console.log(currentPage)


  /* =====================
     =====================
     Delete Seleted Row
     =====================
     =====================
  */

   const handle_Seleted_Delete_Users = () => {
       let updatedData = usersData.filter((user)=> user.isChecked !== true)
       setUserData(updatedData)
   }



   /* =====================
     =====================
     Updated User Details
     =====================
     =====================
  */

  const updatedUser = (newUserData) =>{
       let tempData = usersData.map((user)=>{
           if(user.id === newUserData.id){
            return {...newUserData}
           }

           return user;
       })

       
       setUserData(tempData);
  }




    return (
        <>
            
            <div className="container">

                {/* ==============================
                    ==============================
                        Search Bar(Start)
                    ==============================
                    ==============================*/}
                <div className="search_bar">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="standard-basic" label="Search" variant="standard" placeholder='Search by name , email or role' value={searchResult} onChange={(event) => setSearchResult(event.target.value)} />
                    </Box>
                </div>
                {/* ==============================
                    ==============================
                        Search Bar(End)
                    ==============================
                    ==============================*/}




                {/* ==============================
                    ==============================
                       Users Details(Start)
                    ==============================
                    ==============================*/}


                <div className="users_details">
                    <table id="users_details__table">
                        <thead>
                            <th><input type="checkbox" name="allSelected" onChange={(event) => handleSelected(event.target)} checked={usersData.filter((user) => user?.isChecked !== true).length < 1} /></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {
                                currentPosts.length === 0 ? <tr>
                                    <td colSpan="4"><h1>No Data Found!!!</h1></td>
                                </tr> :
                                    currentPosts.map((user) => {
                                        return (<tr>
                                            <td><input type="checkbox" className='seleted_user' name={user.name} onChange={(event) => handleSelected(event.target)}
                                                checked={user?.isChecked || false}
                                            /></td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button className='edit_button'>
                                                    <CustomizedDialogs user={user} updatedUser={updatedUser}/>
                                                </button>
                                                <button className='delete_button' onClick={() => handleDelete(user.id)}>
                                                    <IconButton>
                                                        <DeleteIcon sx={{ color: "red" }} />
                                                    </IconButton>
                                                </button>
                                            </td>
                                        </tr>)
                                    })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="footer">
                    <Button variant="outlined" color="error" className='delete_seleted_users' onClick={()=>handle_Seleted_Delete_Users()}>
                    Delete Selected
                    </Button>
                    
                    <Pagination postsPerPage={10} totalPosts={usersData.length} paginate={paginate} currentPage={currentPage}/>
                    
                </div>


                {/* ==============================
                    ==============================
                       Users Details(End)
                    ==============================
                    ==============================*/}
            </div>

        </>
    )
}

export default User
