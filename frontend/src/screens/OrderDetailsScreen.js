import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, orderDelivered as orderDeliveredAction } from '../actions/orderAction'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../constants/orderConstants'
import { LinkContainer } from 'react-router-bootstrap'

function OrderDetailsScreen() {

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading : loadingPay, success: successPay } = orderPay

    const orderDelivered = useSelector(state => state.orderDelivered)
    const { loading : loadingDelivered, success: successDelivered, error: deliverError } = orderDelivered

    const loginUser = useSelector(state => state.user)
    const { userInfo: currentUserInfo } = loginUser

    const dispatch = useDispatch()
    const { orderId } = useParams();

    const navigate = useNavigate()

    const[itemsPrice, setItemsPrice] = useState(0)
    const[shippingPrice, setShippingPrice] = useState(0)
    const[taxPrice, setTaxPrice] = useState(0)
    const[totalPrice, setTotalPrice] = useState(0)
    const[deliverTime, setDeliverTime] = useState()
    const[paidTime, setPaidTime] = useState()
    const[sdkReady, setSdkReady] = useState(false)

    useEffect(() => {
        if(!currentUserInfo || !currentUserInfo.isAdmin){
            navigate('/login')
        }
    }, [currentUserInfo, navigate])

    useEffect(() => {
        
        if(!order || successPay || Number(order._id) !== Number(orderId) || successDelivered){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVERED_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }

    },[order, orderId, dispatch, successPay, successDelivered])

    useEffect(() => {
        console.log("usestate ")
        if(order && order.orderItems && order.orderItems.length !== 0){
            let itemPrices_ = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0);
            let taxPrice_ = order.taxPrice;
            let shippingPrice_ = order.shippingPrice;
            let totalPrice_ = order.totalPrice;
    
            setItemsPrice(itemPrices_.toFixed(2));
            setTaxPrice(taxPrice_);  // Convert to string with 2 decimal places
            setShippingPrice(shippingPrice_); // Convert to string with 2 decimal places
            setTotalPrice(totalPrice_);
            setDeliverTime(convertToLocale(order.deliveredAt))
            setPaidTime(convertToLocale(order.paidAt))
        }
    }, [order])

    const convertToLocale = (dateStr)=>{
        const dateObj = new Date(dateStr);
        const localizedDateStr = dateObj.toLocaleString();
        console.log(localizedDateStr);
        return localizedDateStr;
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=${your client id}'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(orderDeliveredAction(orderId))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message />
    )
    :
    (
        <div>
                <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name: </strong>{order.user.name}</p>
                                    <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}> {order.user.email} </a></p>
                                    <p>
                                        <strong>Shipping:</strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city},
                                        {' '}
                                        {order.shippingAddress.postalCode},
                                        {' '}
                                        {order.shippingAddress.country}
                                    </p>

                                    {order.isDelivered ? (
                                        <Message variant='success'>Delivered on {deliverTime}</Message>
                                    ):(
                                        <Message variant='warning'>Not Delivered</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>Paid on {paidTime}</Message>
                                    ):(
                                        <Message variant='warning'>Not Paid</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>ORDER ITEMS</h2>
                                    {   order.orderItems.length === 0 ? 
                                        <Message variant="info">Your order is empty</Message> :
                                        order.orderItems.map(item => (
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
                                    <ListGroupItem className='text-center'>
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
                                    {!order.isPaid && (
                                        <ListGroupItem>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? (<Loader />) :
                                                (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                        // currency={'CAD'}
                                                    />
                                                )
                                            }
                                        </ListGroupItem>
                                    )}
                                </ListGroup>
                                {loadingDelivered && (<Loader />)}
                                {currentUserInfo && currentUserInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup variant='flush' className='text-center'>
                                        <ListGroup.Item >
                                            <Button
                                                type='button'
                                                className='btn btn-block'
                                                onClick={deliverHandler}
                                            >
                                                Mark As Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                )}
                            </Card>
                        </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <LinkContainer to={'/admin/listorders'}>
                                <Button className='btn-lg' variant='dark'>
                                    Back
                                </Button>
                        </LinkContainer>
                    </Col>
                </Row>
        </div>
    )
}

export default OrderDetailsScreen
