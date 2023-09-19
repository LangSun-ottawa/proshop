import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate, useLocation, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { userLogin, userLogout, userRegister } from '../actions/userAction'

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const redirect = location.search ? searchParams.get('redirect') : '/'
    // const { id } = useParams();
    // const productId = id;

    // const qty = location.search ? searchParams.get('qty') : 1;

    const registerUser = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = registerUser

    const navigate = useNavigate()

    useEffect(() => {
        console.log(redirect)
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("password don't match")
        }else{
            dispatch(userRegister(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                        required
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
                        required
                        type='password'
                        placeholder='Enter Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <hr />
                <Container className='text-center'>
                    <Button type='submit' variant='dark'> Register </Button>
                </Container>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an account ? 
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : `/login`}
                    >
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
