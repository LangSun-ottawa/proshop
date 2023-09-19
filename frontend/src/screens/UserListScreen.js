import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container, Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { userList, userDeletion as userDeletionAction } from '../actions/userAction'
import { LinkContainer } from 'react-router-bootstrap'
import {USER_DELETION_RESET} from '../constants/userContants'
import { Link, useParams, useNavigate, useLocation, redirect } from 'react-router-dom'

function UserListScreen() {

    const userListInfo = useSelector(state => state.userList)
    const { loading, users, error } = userListInfo

    const loginUser = useSelector(state => state.user)
    const { userInfo: currentUserInfo } = loginUser

    const userDeletionInfo = useSelector(state => state.userDeletion)
    const { loading: deletionLoading, success: deletionSuccess, error: deletionError } = userDeletionInfo

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [checkError, setCheckError] = useState("")

    useEffect(()=>{
        if(currentUserInfo && currentUserInfo.isAdmin){
            dispatch(userList())
        }else{
            navigate('/login')
        }
    }, [dispatch, deletionSuccess, navigate, currentUserInfo])

    const deleteHandler = (userIdTodelete) => {
        console.log('userIdTodelete: '+userIdTodelete)
        console.log('currentUserInfo._id: '+currentUserInfo._id)
        if(userIdTodelete === currentUserInfo._id){
            setCheckError("current user can't delete his own account")
            return
        }
        if(window.confirm('Are you sure to delete this user?')){
            dispatch(userDeletionAction(userIdTodelete))
        }
        setCheckError("")
    }

  return (
    <div>
      <h1>Users</h1>
      { checkError && (<Message variant='danger'>{checkError}</Message>) }
      { deletionError && (<Message variant='danger'>{deletionError}</Message>) }
      { !checkError && !deletionError && deletionSuccess && (<Message variant='success'>Detetion success!</Message>) }
      {loading 
        ? (<Loader />) 
        : error ? (<Message variant='danger'>{error}</Message>) 
        :  (
            <Table striped responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Staff</th>
                        <th>Details</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 
                                (<i className='fas fa-check' style={{color: 'green'}}></i>) 
                                : 
                                (<i className='fas fa-times' style={{color: 'red'}}></i>)
                                }
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button className='btn-sm' variant='light'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button className='btn-sm' variant='danger' onClick={() => deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )
        }
    </div>
  )
}

export default UserListScreen
