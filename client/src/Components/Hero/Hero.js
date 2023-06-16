import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="hero-heading">
            Elevate Your Wardrobe with Our Trendy Collection
            </h1>
            <p className="hero-description">
            Welcome to our online store where you can find the latest trends in fashion for women, men, and kids. Discover a wide range of stylish clothing, shoes, and accessories that are perfect for any occasion
            </p>
            <Button variant="primary" className="hero-button">
              Get Started
            </Button>
          </Col>
          <Col md={6}>
            <></>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
