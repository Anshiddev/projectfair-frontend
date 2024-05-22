import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from "react-bootstrap";
import base_url from '../services/server_url'

function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`${base_url}/uploads/${project.image}`} 
          onClick={handleShow}
        />
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.tite}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>

            <Col>
            <img className="img-fluid" src={`${base_url}/uploads/${project.image}`} alt="img" />
            </Col>

            <Col>
            <h2>{project.title}</h2>
            <h2>{project.Overview}</h2>
            <h3>{project.languages}</h3>
            <div className="d-flex justify-content-between">
                <a href={project.github}>
                <i className="fa-brands fa-github"></i>
                </a>
                <a href={project.demo}>
                <i className="fa-solid fa-link"></i>
                </a>
            </div>
            </Col>

          </Row>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectCard;
