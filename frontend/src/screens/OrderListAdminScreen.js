import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container, Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderAction'
import { LinkContainer } from 'react-router-bootstrap'
import {USER_DELETION_RESET} from '../constants/userContants'
import { Link, useParams, useNavigate, useLocation, redirect } from 'react-router-dom'
function OrderListAdminScreen() {


    const orderListInfo = useSelector(state => state.orderList)
    const { loading, orders, error } = orderListInfo

    const loginUser = useSelector(state => state.user)
    const { userInfo: currentUserInfo } = loginUser

    // const userDeletionInfo = useSelector(state => state.userDeletion)
    // const { loading: deletionLoading, success: deletionSuccess, error: deletionError } = userDeletionInfo

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [checkError, setCheckError] = useState("")

    useEffect(()=>{
        if(currentUserInfo && currentUserInfo.isAdmin){
            dispatch(listOrders())
        }else{
            navigate('/login')
        }
    }, [dispatch, navigate, currentUserInfo])

  return (
    <div>
      <h1>Orders</h1>
      { checkError && (<Message variant='danger'>{checkError}</Message>) }
      {/* { deletionError && (<Message variant='danger'>{deletionError}</Message>) } */}
      {/* { !checkError && (<Message variant='success'>Detetion success!</Message>) } */}
      {loading 
        ? (<Loader />) 
        : error ? (<Message variant='danger'>{error}</Message>) 
        :  (
            <Table striped responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ADMIN</th>
                        <th>paymentMethod</th>
                        <th>taxPrice</th>
                        <th>shippingPrice</th>
                        <th>totalPrice</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Details</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.taxPrice}</td>
                            <td>{order.shippingPrice}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? 
                                (order.paidAt.substring(0, 10)) 
                                : 
                                (<i className='fas fa-times' style={{color: 'red'}}></i>)
                                }
                            </td>
                            <td>{order.isDelivered ? 
                                (order.deliveredAt.substring(0, 10)) 
                                : 
                                (<i className='fas fa-times' style={{color: 'red'}}></i>)
                                }
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
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

export default OrderListAdminScreen
