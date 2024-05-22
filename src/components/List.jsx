import React from 'react'
import Edit from './Edit'
import { deleteProject } from '../services/allApis'
import { toast } from 'react-toastify'
import { deleteProjectResponseContext } from '../context_api/ContextShare'
import { useContext } from 'react'

function List({projects}) {

  const {deleteResponse,setDeleteResponse} = useContext(deleteProjectResponseContext)
  const handleDelete =async(id)=> {
    const header = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`
    }
    const result = await deleteProject(id,header)
    if (result.status == 200){
      toast.success('Deleted !!!')
      setDeleteResponse(result)
    }
    else {
      console.log(result.response.data);
      toast.error('deletion failed')
    }
  }

  return (
    <>
      <div>
        {
          projects.length > 0 ?
          projects.map(item => (
            <div className='d-flex justify-content-between border shadow p-3 mb-3'>
            <h3>{item.title}</h3>
            <div>
                <a href="" className='btn'>
                <i className="fa-brands fa-github fa-2xl"></i>
                </a>
                <Edit project={item} />
                <button className='btn' onClick={()=>{handleDelete(item._id)}}>
                <i className="fa-regular fa-trash-can fa-2xl"></i>
                </button>
            </div>
        </div>
          ))
          :
          <h2 className='text-center text-danger'>No project Available!!!</h2>
        }
        
      </div>
    </>
  )
}

export default List