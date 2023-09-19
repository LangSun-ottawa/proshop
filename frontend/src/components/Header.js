import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../actions/userAction';
import SearchBox from './SearchBox';

function Header() {
  const loginUser = useSelector(state => state.user)
  const {userInfo} = loginUser


  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(userLogout())
  }

  return (
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container className="d-flex justify-content-between">
        <LinkContainer to={"/"}>
          <Navbar.Brand >Proshop</Navbar.Brand>
        </LinkContainer>

        <div className="mx-auto">
          <SearchBox />
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
        <Nav className="ml-auto">
            <Nav.Item>
              <LinkContainer to={'/cart'}>
                <Nav.Link><i className='fas fa-shopping-cart'>Cart</i></Nav.Link>
              </LinkContainer>
            </Nav.Item>
            {
              userInfo ? (
                <Nav.Item>
                  <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                          <NavDropdown.Item>
                            Profile
                          </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
              ) : (
                <Nav.Item>
                  <LinkContainer to='/login'>
                      <Nav.Link><i className='fas fa-user'>Login</i></Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              )
            }
            {
              userInfo && userInfo.isAdmin && (
                <Nav.Item>
                  <NavDropdown title='Admin' id='Admin'>
                      <LinkContainer to='/admin/listusers'>
                          <NavDropdown.Item>
                            Users
                          </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                          <NavDropdown.Item>
                            Products
                          </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/listorders'>
                          <NavDropdown.Item>
                            Orders
                          </NavDropdown.Item>
                      </LinkContainer>
                  </NavDropdown>
                </Nav.Item>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
