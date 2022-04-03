import React from 'react'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function Pagination({postsPerPage,totalPosts,paginate,currentPage}) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage) ; i++){
        pageNumbers.push(i);
    }
  return (
    <div className='pagination__container'>
        <Button variant="outlined" onClick={()=>paginate(1)} className="firstPage">First Page</Button>
        <Button variant="outlined" onClick={()=>paginate((currentPage + 1) % (pageNumbers.length+1) )} className="nextPage" sx={{marginLeft:"0.4em",marginRight:"0.4em"}}>Next Page</Button>
        <ul className='pagination'>
          {
              pageNumbers.map((page_number)=> <li className='page-number'><IconButton onClick={()=>paginate(page_number)} sx={{border:"1px solid lightblue"}}>{page_number}</IconButton></li>)
          }
        </ul>
        <Button variant="outlined" onClick={()=>paginate((currentPage - 1) % (pageNumbers.length+1) === 0 ? 1 : currentPage - 1)} className="previousPage" sx={{marginLeft:"0.4em",marginRight:"0.4em"}}>Previous Page</Button>
        <Button variant="outlined" onClick={()=>paginate(pageNumbers.length)} className="lastPage">Last Page</Button>
    </div>
  )
}

export default Pagination
