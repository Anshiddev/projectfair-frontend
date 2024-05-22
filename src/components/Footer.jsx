import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="w-100 bg-dark p-5">
        <Row>
          <Col>
            <h3 className="text-light mb-3">Project Fair</h3>
            <p style={{ textAlign: "justify" }} className="text-light">
              Rotary's project fairs connect clubs that are seeking
              international service projects with those that are interested in
              collaborating with global partners. Project fairs typically last
              two to three days and may include visits to service projects or
              opportunities to experience the local culture.
            </p>
          </Col>

          <Col className="d-flex flex-column justify-content-center align-items-center">
            <h3 className="text-light mb-3">Links</h3>
            <Link to={"/"}>Landing</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/Projects"}>Projects</Link>
          </Col>

          <Col className="d-flex flex-column justify-content-center align-items-center">
            <h3 className="text-light mb-5">References</h3>
            <a href="https://react.dev/" target="_blank">
              React
            </a>
            <a href="https://react-bootstrap.netlify.app/" target="_blank">
              React-Bootstrap
            </a>
          </Col>
        </Row>
        <h4 className="text-light text-center mt-4">
          Project Fair 2024 &copy; all rights reserved.
        </h4>
      </div>
    </>
  );
}

export default Footer;
