import React,{ useState,useEffect } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { allProjects } from '../services/allApis'
import { Col, Row } from 'react-bootstrap'

function Projects() {

  const [projects,setProjects] = useState([])
  const [logStatus,setLogStatus] = useState(false)
  const [search,setSearch] = useState("")

  useEffect(()=>{
    if (sessionStorage.getItem('token')){
      getData()
      setLogStatus(true)
    }
    else {
      console.log("Login First!!");
      setLogStatus(false)
    }
  },[search])

  console.log(projects);


  const getData = async()=>{
    const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const result = await allProjects(header,search)
    // console.log(result)
    if (result.status==200){
      setProjects(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }


  return (
    <>
    <Header status={true}/>

    <div className='d-flex justify-content-between p-5'>
    <h3>All Projects</h3>
    <input type="text" name="" id="" onChange={(e)=>{setSearch(e.target.value)}} className="form-control w-25" placeholder='please enter programming language...' />
    </div>
    

    <div className='p-5'>
      {
        logStatus ?
        <Row>
        {
          projects.length > 0 ?
          projects.map(item => (
            <Col>
            <ProjectCard project={item} />
            </Col>
          ))
          :
          <h3 className='text-center text-danger'>No projects Available!!!</h3>
        }
      </Row>
      :
      <h2 className='text-center text-warning'>please login First...</h2>
      }
    </div>
    </>
  )
}

export default Projects