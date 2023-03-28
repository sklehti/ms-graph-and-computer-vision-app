import React, { useEffect, useState } from "react";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { Login } from "@microsoft/mgt-react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import PageView from "./PageView";

function useIsSignedIn(): [boolean] {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return [isSignedIn];
}

function Navigation() {
  const [isSignedIn] = useIsSignedIn();
  const [userPermission, setUserPermission] = useState(false);

  const personInfo = async () => {
    let provider = Providers.globalProvider;
    if (provider) {
      let graphClient = provider.graph.client;
      let userDetails = await graphClient.api("/me").get();
      // let users = await graphClient.api("/users").get();
      // console.log(users, "users");

      let email = userDetails.mail.split("@")[0];

      setUserPermission(true);
    }
  };

  if (isSignedIn) {
    personInfo();
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="md" className="navbar-style">
        <Container>
          <Navbar.Brand id="top" className="title-style" href="#home">
            Testi-sovellus
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isSignedIn && (
              <Nav className="me-auto">
                {userPermission ? (
                  <Nav.Link href="#save-form">Tallenna lomake</Nav.Link>
                ) : (
                  <></>
                )}

                <Nav.Link href="#all-forms">Lomakkeet</Nav.Link>
                <Nav.Link href="#all-files">Omat tiedostosi</Nav.Link>
              </Nav>
            )}
            <Nav>
              <Nav.Link href="#admin-info">
                <div className="login-button-style">
                  <Login />
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {isSignedIn && (
          <div>
            <PageView userPermission={userPermission} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
