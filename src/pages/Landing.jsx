import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { useEffect,useState } from "react";
import { homeProjects } from "../services/allApis";

function Landing() {

  const [logStatus,setLogStatus] = useState(false)
  const[projects,setProjects] = useState([])

  useEffect(() => {
    getData()
    if(sessionStorage.getItem("token")) {
      setLogStatus(true)
    }
    else {
      setLogStatus(false)
    }
  },[])
  console.log(projects);
  

  const getData = async()=>{
    const result = await homeProjects()
    // console.log(result);
    if(result.status == 200){
      setProjects(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }

  return (
    <>
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col sm={12} md={6} className="p-5">
            <h1>Project Fair</h1>
            <p style={{ textAlign: "justify" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            {
              logStatus?
              <Link to={'/dashboard'} className="btn btn-success">Manage your Projects...</Link>:
              <Link to={'/login'} className="btn btn-warning">
              Explore ...<i className="fa-solid fa-bomb"></i>
            </Link>
            }
            
          </Col>
          <Col sm={12} md={6} className="p-3">
            <img
              src="https://t4.ftcdn.net/jpg/02/83/46/33/360_F_283463385_mfnrx6RPU3BqObhVuVjYZjeZ5pegE7xq.jpg"
              alt="img"
              className="img-fluid"
              width={"80%"}
            />
          </Col>
        </Row>
      </div>

      <div className="p-5">
        <h3 className="text-center">Few Projects For You...</h3>

        {/* <marquee behavior="" direction="left"> */}
         <div className="d-flex justify-content-evenly mt-3">

          {
            projects.length>0 ?projects.map
            (item=>(<ProjectCard project={item} />)):
            <h3 className="text-center text-danger">Currently no projects available</h3>
          }

          

         </div>
      {/* </marquee> */}
      <div className="text-center">
        <Link to={'/projects'}>See more..</Link>
      </div>
      </div>

    </>
  );
}

export default Landing;
