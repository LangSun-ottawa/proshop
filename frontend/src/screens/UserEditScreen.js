import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate, useLocation, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { userLogin, userLogout, userRegister, userDetails, userEdit } from '../actions/userAction'
import { USER_EDIT_RESET } from '../constants/userContants'

function UserEditScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const loginUser = useSelector(state => state.user)
    const { userInfo } = loginUser

    const userDetail = useSelector(state => state.userDetail)
    const { loading, user, error } = userDetail

    const updateUser = useSelector(state => state.updateUser)
    const { loading: loadingEdit, success, error: updateError } = updateUser

    const { id } = useParams();
    const userIdToEdit = id;

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userEdit(userIdToEdit, {name, email, isAdmin}))
    }

    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
    }, [navigate, userInfo])

    useEffect(() => {
        if(success){
            navigate('/admin/listusers')
            dispatch({type: USER_EDIT_RESET})
        }
    }, [dispatch, navigate, success])

    useEffect(() => {

        if(!user || user._id != userIdToEdit){
            dispatch(userDetails(userIdToEdit))
        }
    }, [dispatch, user, userIdToEdit])

    useEffect(() => {
        if (user) {
            setName(user.username)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

  return (
        <div>
            <Link to={'/admin/listusers'}>Go Back</Link>
            <FormContainer>
                <h1>Edit</h1>
                {loadingEdit && <Loader/>}
                {updateError &&  <Message variant='danger'>{updateError}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
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

                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => {setIsAdmin(e.target.checked)}}
                            >
                            </Form.Check>
                        </Form.Group>
                        <hr />
                        <Container className='text-center'>
                            <Button type='submit' variant='dark'> Update </Button>
                        </Container>
                </Form>
                )}
                
                
            </FormContainer>
        </div>
  )
}

export default UserEditScreen
