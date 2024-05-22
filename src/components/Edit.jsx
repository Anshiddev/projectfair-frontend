import React, { useEffect, useState,useContext } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import base_url from "../services/server_url";
import { toast } from "react-toastify";
import { editProject } from "../services/allApis";
import { editProjectResponseContext } from "../context_api/ContextShare";

function Edit({project}) {
  const { editResponse,setEditResponse} = useContext(editProjectResponseContext)
  const [show, setShow] = useState(false);
  const [projectData,setProjectData] = useState({id:project._id,title:project.title,overview:project.overview,languages:project.languages,github:project.github,demo:project.demo,image:""})
  const [imgStatus,setImgStatus] = useState(false)
  const [preview,setPreview] = useState("")

  useEffect(()=>{
    if (projectData.image){
      if (projectData.image.type == 'image/jpg' || projectData.image.type == 'image/jpeg' || projectData.image.type == 'image/png'){
        setImgStatus(false)
        setPreview(URL.createObjectURL(projectData.image))
      }
      else {
        setImgStatus(true)
        setPreview("")
      }
    }
  },[projectData.image])

  console.log(projectData);
  // const[imageStatus,setImageStatus] = useState(false)
  // const[preview,setPreview] = useState("")

  // useEffect(() => {
  //   if(projectData.image){
  //     if(projectData.image.type == 'image/jpg' || projectData.image.type == 'image/jpeg' || projectData.image.type == 'image/png'){
  //       setImageStatus(false)
  //       setPreview(URL.createObjectURL(projectData.image))
  //     }
  //     else{
  //       setImageStatus(true)
  //       setPreview("")
  //     }
  //   }
  // },[projectData.image])

  const handleSubmit=async()=>{
    console.log(projectData);
    const{title,overview,languages,demo,github,image} = projectData
    if (!title || !overview || !languages || !demo || !github){
      toast.warning("invalid Inputs!!")
    }
    else {
      const formData = new FormData()
      formData.append("title",title)
      formData.append("overview",overview)
      formData.append("languages",languages)
      formData.append("github",github)
      formData.append("demo",demo)
      formData.append("image",image?image:project.image)

      if (preview){
        const header = {
          'Content-Type': 'multipart/form-data',
          'Authorization':`Bearer ${sessionStorage.getItem('token')}`
        }
        const result = await editProject(formData,header,projectData.id)
        if(result.status == 200){
          toast.success("project updated successfully...")
          handleClose()
          setEditResponse(result)
        }
        else {
          console.log(result);
          toast.error(result.response.data)
        }
      }
      else {
        const header = {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${sessionStorage.getItem('token')}`
        }
        const result = await editProject(formData,header,projectData.id)
        if(result.status == 200){
          toast.success("project updated successfully...")
          handleClose()
          setEditResponse(result)
        }
        else {
          console.log(result);
          toast.error(result.response.data)
        }
      }
    }
  }

  const handleClose = () =>{
    setShow(false)
    setProjectData({ id:project._id,title:project.title,overview:project.overview,languages:project.languages,github:project.github,demo:project.demo,image:"" })
    setPreview("")
  }

  const handleShow = () => setShow(true);
  return (
    <>
      <button className="btn" onClick={handleShow}>
        <i className="fa-regular fa-pen-to-square fa-2xl"></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>

              <label>
                <input
                  type="file"
                  onChange={e=>setProjectData({...projectData,image:e.target.files[0]})}
                  name=""
                  id="img"
                  style={{ display: "none" }}
                />
                <img
                  src={preview?preview:`${base_url}/uploads/${project.image}`} 
                  alt="img"
                  srcset=""
                  className="img-fluid"
                />
                {
                  imgStatus &&
                  <p className="text-center text-warning">Image extension should be jpg,png,jpeg...</p>
                }
              </label>

            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingPassword"
                label="Project Title"
                className="mb-2"
              >
                <Form.Control type="text" placeholder="Project Title" onChange={e=>setProjectData({...projectData,title:e.target.value})} value={projectData.title} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Project Overview"
                className="mb-2"
              >
                <Form.Control type="text" placeholder="Project Overview" onChange={e=>setProjectData({...projectData,overview:e.target.value})} value={projectData.overview} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Languages Used"
                className="mb-2"
              >
                <Form.Control type="text" placeholder="Languages Used" onChange={e=>setProjectData({...projectData,languages:e.target.value})} value={projectData.languages} />
              </FloatingLabel>
            </Col>
            <FloatingLabel
              controlId="floatingPassword"
              label="Github Url"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Github Url" onChange={e=>setProjectData({...projectData,github:e.target.value})} value={projectData.github} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Demo Url"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Demo url" onChange={e=>setProjectData({...projectData,demo:e.target.value})} value={projectData.demo} />
            </FloatingLabel>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
