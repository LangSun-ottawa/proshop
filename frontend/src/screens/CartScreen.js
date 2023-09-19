import React, {useEffect} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen() {
    const { id } = useParams();
    const productId = id;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const qty = location.search ? searchParams.get('qty') : 1;
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const navigate = useNavigate()

    useEffect(() => {
        // console.log(productId)
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const updateCartHandler = (e, productId) => dispatch(addToCart(productId, Number(e.target.value)))

    const removeFromCartHandler = (productId) => {
        if(productId) {
            dispatch(removeFromCart(productId))
        }
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        $ {item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control className='text-center' as='select' value={item.qty} onChange={(e) => updateCartHandler(e, item.product)}>
                                        {
                                            [...Array(5 > item.countInStock ? 5 : item.countInStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                                )
                                            ) 
                                        }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>   
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
                            <h2>Price : ${cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button type='button' className='btn btn-dark' onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                    Proceed To Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
