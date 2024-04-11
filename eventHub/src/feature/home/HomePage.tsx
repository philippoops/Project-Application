import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";

import "./Homepage.css";

export default function HomePage() {
  const [hovered, setHovered] = useState(false);

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <video autoPlay loop muted playsInline className="back-video">
          <source src="./src/assets/bgimage.mp4" type="video/mp4" />
        </video>

        <Header as="h1" className="content">
          <Image
            size="massive"
            src="./src/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12, width: 400, height: 400 }}
          />
        </Header>

        <Button
          size="huge"
          inverted
          as={Link}
          to="/events"
          className="custom-button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Get started
          <Icon name="caret right" />
        </Button>
      </Container>
    </Segment>
  );
}
