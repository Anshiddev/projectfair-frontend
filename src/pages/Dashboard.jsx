import React,{ useState,useEffect,useContext } from 'react'
import { Row,Col } from 'react-bootstrap'
import Profile from '../components/Profile'
import List from '../components/List'
import Add from '../components/Add'
import Header from '../components/Header'
import { userProjects } from '../services/allApis'
import { addProjectResponseContext,editProjectResponseContext,deleteProjectResponseContext } from '../context_api/ContextShare'

function Dashboard() {

  const {addResponse,setAddResponse}=useContext(addProjectResponseContext)
  const {editResponse,setEditResponse}=useContext(editProjectResponseContext)
  const {deleteResponse,setDeleteResponse}=useContext(deleteProjectResponseContext)

  const [user,setUser] = useState("")
  const [projects,setProjects] = useState([])

  useEffect(()=>{
    setUser(sessionStorage.getItem("username"))
    if(sessionStorage.getItem('token')){
      getData()
    }
    else {
      console.log("login first");
    }
  },[addResponse,editResponse,deleteResponse])

  console.log(projects);

  const getData = async()=>{
    const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const result = await userProjects(header)
    if (result.status == 200){
      setProjects(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }



  return (
    <div>
      <Header />
      <div className='p-4'>
        <h2>Dashboard</h2>
        <h4>Hi <span className='text-warning'>{user}</span> </h4>
        <Row>
            <Col sm={12} md={8}>
          <Add/>
              <div className='p-3 border border-3'>
                <List projects={projects}/>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Profile/>
            </Col>
        </Row>
      </div>
    </div>
  )
}

export default Dashboard