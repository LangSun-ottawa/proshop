import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container, Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { userList, userDeletion as userDeletionAction, userDeletion } from '../actions/userAction'
import { LinkContainer } from 'react-router-bootstrap'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants' 
import { Link, useParams, useNavigate, useLocation, redirect } from 'react-router-dom'
import { createProduct, listProducts, deleteProduct as productDeleteAction } from '../actions/productActions'
import Paginate from '../components/Paginate'

function ProductAdminListScreen() {

    const productList = useSelector(state => state.productList)
    const { loading, products, error, page, pages } = productList
    
    const loginUser = useSelector(state => state.user)
    const { userInfo: currentUserInfo } = loginUser

    const productDelete = useSelector(state => state.productDelete)
    const { loading: deletionLoading, success: deletionSuccess, error: deletionError } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: createLoading, success: createSuccess, error: createError, product } = productCreate


    const navigate = useNavigate()

    const dispatch = useDispatch();

    const location = useLocation();
    const keyword = location.search;

    useEffect(()=>{
        if(currentUserInfo && currentUserInfo.isAdmin){
            dispatch(listProducts(keyword))
        }else{
            navigate('/login')
        }
    }, [dispatch, navigate, currentUserInfo, deletionSuccess, keyword])

    useEffect(()=>{
        if(createSuccess){
            navigate(`/admin/product/${product._id}/edit`)
            dispatch({type: PRODUCT_CREATE_RESET})
        }
    }, [dispatch, navigate, createSuccess])


    const deleteHandler = (productIdTodelete) => {
        console.log('productIdTodelete: '+productIdTodelete)
        if(window.confirm('Are you sure to delete this product?')){
            dispatch(productDeleteAction(productIdTodelete))
        }
    }

    const clickHandler = () => {
        dispatch(createProduct())
    }

  return (
    <div>
      <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right' xs='auto'>
                <Button className='my-3' onClick={clickHandler}>
                    <i className='fas fa-plus'>Create Product</i>
                </Button>
            </Col>
      </Row>
      {loading 
        ? (<Loader />) 
        : error ? (<Message variant='danger'>{error}</Message>) 
        :  (

            <Table striped responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button className='btn-sm' variant='light'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button className='btn-sm' variant='danger' onClick={() => deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )
        }
        <div className="d-flex justify-content-center">
              <Paginate keyword={keyword} page={page} pages={pages} isAdmin={true} />
        </div>
    </div>
  )
}

export default ProductAdminListScreen
