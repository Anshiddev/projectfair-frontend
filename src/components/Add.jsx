import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState,useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addProject } from "../services/allApis";
import { toast } from "react-toastify";
import { useContext } from "react";
import { addProjectResponseContext } from "../context_api/ContextShare";

function Add() {

  const {addResponse,setAddResponse}=useContext(addProjectResponseContext)


  const [show, setShow] = useState(false);
  const [project,setProject] = useState({
    title:"" ,overview: "",languages: "" ,github: "",demo: "",image: ""
  })
  const [imageStatus,setImageStatus] = useState(false)
  const[preview,setPreview] = useState("")
  // console.log(project);

  useEffect(()=>{
    if(project.image){
      if(project.image.type == "image/jpg" || project.image.type == "image/jpeg" || project.image.type == "image/png"){
        setImageStatus(false)
        setPreview(URL.createObjectURL(project.image))
      }
      else {
        setImageStatus(true)
        setPreview("")
        setProject({
          title:"",overview:"",languages:"",github:"",demo:"",image:""
        })
      }
    }
  },[project.image])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddProject =async() =>{
    const {title,overview,languages,github,demo,image} = project
    if(!title || !overview || !languages || !github || !demo || !image){
      console.log("invalid Input");
    } else {
      const formData = new FormData()
      formData.append("title",title)
      formData.append("overview",overview)
      formData.append("languages",languages)
      formData.append("github",github)
      formData.append("demo",demo)
      formData.append("image",image)

      const header = {
        "Content-Type" : 'multipart/form-data',
        "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
      }

      const result = await addProject(formData,header)
      console.log(result);

      if(result.status == 200){
        toast.success("Project Added Successfully...")
        setProject({
          title:"",overview:"",languages:"",demo:"",github:"",image:""
        })
        setPreview("")
        handleClose()
        setAddResponse(result)
      }
      else {
        toast.error(result.response.data)
      }
    }
  }

  return (
    <>
      <button className="btn btn-info m-3" onClick={handleShow}>
        Add Projects
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="mb-3">

              <label htmlFor="img">
                <input
                  type="file"
                  name=""
                  onChange={e=>setProject({...project,image:e.target.files[0]})}
                  id="img"
                  style={{ display: "none" }}
                />
                <img
                  src={preview?preview:"https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"}
                  alt=""
                  srcset=""
                  className="img-fluid"
                />
              </label>

              {
              imageStatus && <p className="text-danger">Invalid Extension !!! please use image/img/jpeg/jpg/png</p>
              }
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingPassword"
                label="Project Title"
                className="mb-2"
              >
                <Form.Control type="text" placeholder="Project Title" onChange={e=>setProject({...project,title:e.target.value})} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Project Overview"
                className="mb-2"
              >
                <Form.Control type="text" placeholder="Project Overview" onChange={e=>setProject({...project,overview:e.target.value})}  />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Languages Used"
                className="mb-2"
              >
                <Form.Control type="text" placeholder="Languages Used" onChange={e=>setProject({...project,languages:e.target.value})}  />
              </FloatingLabel>
            </Col>
            <FloatingLabel
              controlId="floatingPassword"
              label="Github Url"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Github Url" onChange={e=>setProject({...project,github:e.target.value})}  />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Demo Url"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Demo url" onChange={e=>setProject({...project,demo:e.target.value})} />
            </FloatingLabel>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
