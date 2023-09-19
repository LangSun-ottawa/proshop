import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux'

function CheckoutSteps({step1, step2, step3, step4}) {
    const loginUser = useSelector(state => state.user)
    const { userInfo } = loginUser

    const linkPath = userInfo ? "/login" : "/register";
    const linkText = userInfo ? "Login" : "Register";

    return (
        <Nav>
            <Nav.Item>
                {step1 ? 
                    (<LinkContainer to={linkPath}>
                        <Nav.Link>{linkText}</Nav.Link>
                    </LinkContainer>):
                    (<LinkContainer to={linkPath}>
                        <Nav.Link disabled>{linkText}</Nav.Link>
                    </LinkContainer>)
                }
            </Nav.Item>
            <Nav.Item>
                {step2 ? 
                    (<LinkContainer to={"/shipping"}>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>):
                    (<LinkContainer to={"/shipping"}>
                        <Nav.Link disabled>Shipping</Nav.Link>
                    </LinkContainer>)
                }
            </Nav.Item>
            <Nav.Item>
                {step3 ? 
                    (<LinkContainer to={"/payment"}>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>):
                    (<LinkContainer to={"/payment"}>
                        <Nav.Link disabled>Payment</Nav.Link>
                    </LinkContainer>)
                }
            </Nav.Item>
            <Nav.Item>
                {step4 ? 
                    (<LinkContainer to={"/placeorder"}>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>):
                    (<LinkContainer to={"/placeorder"}>
                        <Nav.Link disabled>Place Order</Nav.Link>
                    </LinkContainer>)
                }
            </Nav.Item>
        </Nav>
    );
}

export default CheckoutSteps
