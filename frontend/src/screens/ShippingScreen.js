import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart, cartSavingShippingAction } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartSavingShipping } = cart

    const [address, setAddress] = useState(cartSavingShipping.address? cartSavingShipping.address : "")
    const [city, setCity] = useState(cartSavingShipping.city? cartSavingShipping.city : "")
    const [postalCode, setPostalCode] = useState(cartSavingShipping.postalCode ? cartSavingShipping.postalCode : "")
    const [country, setCountry] = useState(cartSavingShipping.country ? cartSavingShipping.country: "")

    const loginUser = useSelector(state => state.user)
    const { userInfo } = loginUser

    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo){
            navigate("/login")
        }
    }, [dispatch, navigate, userInfo])

    const submitHandler = (e)=>{
        e.preventDefault()
        console.log("submit shipping saving")
        dispatch(cartSavingShippingAction({
            address,
            city,
            postalCode,
            country 
        }))
        navigate('/payment')
    }

    return (
        <div>
            <CheckoutSteps step1={true} step2={true}/>
            <FormContainer>
                <h1>Shipping</h1>
                {/* {message && <Message variant='danger'>{message}</Message>} */}
                {/* {error && <Message variant='danger'>{error}</Message>} */}
                {/* {loading && <Loader />} */}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='Address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type='Address'
                            placeholder='Enter Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type='city'
                            placeholder='Enter City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='PostalCode'>
                        <Form.Label>PostalCode</Form.Label>
                        <Form.Control
                            required
                            type='PostalCode'
                            placeholder='Enter Postal Code'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='Country'>
                        <Form.Label>Confirm Country</Form.Label>
                        <Form.Control
                            required
                            type='country'
                            placeholder='Enter Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <hr />
                    <Container className='text-center'>
                        <Button type='submit' variant='dark'> Continue </Button>
                    </Container>
                </Form>
            </FormContainer>
        </div>
        
    )
}

export default ShippingScreen
