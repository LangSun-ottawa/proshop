import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate, useLocation, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { userLogin, userLogout } from '../actions/userAction'

function UserScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const redirect = location.search ? searchParams.get('redirect') : '/'
    // const { id } = useParams();
    // const productId = id;

    // const qty = location.search ? searchParams.get('qty') : 1;

    const loginUser = useSelector(state => state.user)
    const {loading, userInfo, error} = loginUser

    const navigate = useNavigate()

    useEffect(() => {
        console.log(redirect)
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('subimiting')
        dispatch(userLogin(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
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
                <hr />
                <Container className='text-center'>
                    <Button type='submit' variant='dark'> Sign In</Button>
                </Container>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer ? 
                    <Link
                        to={redirect ? `/register?redirect=${redirect}` : `/register`}
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default UserScreen
