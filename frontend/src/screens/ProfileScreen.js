import React, {useEffect, useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useParams, useNavigate, useLocation, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container, Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { userLogin, userLogout, userRegister, userUpdate, userDetails } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userContants'
import {listMyOrders} from '../actions/orderAction'

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()
    // const location = useLocation()
    // const searchParams = new URLSearchParams(location.search)
    // const redirect = location.search ? searchParams.get('redirect') : '/'
    // const { id } = useParams();
    // const productId = id;

    // const qty = location.search ? searchParams.get('qty') : 1;

    const userLogin = useSelector(state => state.user)
    const {loading, userInfo, error} = userLogin

    const userDetail = useSelector(state => state.userDetail)
    const {user} = userDetail

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(userDetails('profile/'))
            }else{
                setName(user.name)
                setEmail(user.email)
                dispatch(listMyOrders())
            }
        }
    }, [navigate, userInfo, user, dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("password don't match")
        }else{
            dispatch(userUpdate({ 
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>Profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {userInfo.success && <Message variant='success'>{userInfo.success}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <hr />
                    <Container className='text-center'>
                        <Button type='submit' variant='dark'> Update </Button>
                    </Container>
                </Form>
            </Col>
            
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>    
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Details</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
                }
            </Col>

        </Row>
    )
}

export default ProfileScreen
