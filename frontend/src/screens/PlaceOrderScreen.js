import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderAction'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {
    const cartInfo = useSelector(state => state.cart)
    const { cartPaymentMethod, cartSavingShipping, cartItems } = cartInfo

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const[itemsPrice, setItemsPrice] = useState(0)
    const[shippingPrice, setShippingPrice] = useState(0)
    const[taxPrice, setTaxPrice] = useState(0)
    const[totalPrice, setTotalPrice] = useState(0)

    const placeOrderHandler = (e) => {
        e.preventDefault()
        console.log("place ordering...")
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: cartSavingShipping,
            paymentMethod: cartPaymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        }))
    }

    useEffect(() => {
        if(cartItems.length !== 0){
            let itemPrices_ = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
            let taxPrice_ = itemPrices_ * 0.13;
            let shippingPrice_ = itemPrices_ > 35 ? 0 : 10;
            let totalPrice_ = itemPrices_ + taxPrice_ + shippingPrice_;
    
            setItemsPrice(itemPrices_.toFixed(2));
            setTaxPrice(taxPrice_.toFixed(2));  // Convert to string with 2 decimal places
            setShippingPrice(shippingPrice_.toFixed(2)); // Convert to string with 2 decimal places
            setTotalPrice(totalPrice_.toFixed(2));
        }
        if(success){
            navigate(`/order/${order._id}`)
            dispatch({ type : ORDER_CREATE_RESET })
        }
    },[cartItems, success, navigate, order, dispatch])

    return (
        <div>
            <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
            <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Shipping:</strong>
                                    {cartSavingShipping.address}, {cartSavingShipping.city},
                                    {' '}
                                    {cartSavingShipping.postalCode},
                                    {' '}
                                    {cartSavingShipping.country}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {cartPaymentMethod}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>ORDER ITEMS</h2>
                                {   cartItems.length === 0 ? 
                                    <Message variant="info">Your cart is empty</Message> :
                                    cartItems.map(item => (
                                        <ListGroup variant='flush' key={item.product}>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={3}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X $ {item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>   
                                ))}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <h2>Order Summary</h2>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Items: </Col>
                                        <Col>${itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping: </Col>
                                        <Col>${shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax: </Col>
                                        <Col>${taxPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total: </Col>
                                        <Col>${totalPrice}</Col>
                                    </Row>
                                </ListGroupItem>

                                <ListGroupItem>
                                        {error && <Message variant='danger'>{error}</Message>}
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Button type='button' className='btn btn-dark' onClick={placeOrderHandler} disabled={cartItems.length === 0}>
                                            Place Order
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
