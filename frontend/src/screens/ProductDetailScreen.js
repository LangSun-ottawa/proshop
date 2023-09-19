import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate, useLocation, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { userLogin, userLogout } from '../actions/userAction'
import { listProductDetails, updateProduct } from '../actions/productActions'
import axios from 'axios'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { LinkContainer } from 'react-router-bootstrap'


function ProductDetailScreen() {
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const { id } = useParams();
    const productId = id;

    const loginUser = useSelector(state => state.user)
    const {loading, userInfo, error} = loginUser

    const productDetails = useSelector(state => state.productDetails)
    const {loading: loadingProduct, product, error: productError} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: updateLoading, success: udpateSuccess, error: updateError} = productUpdate
    
    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        if(!product || Number(product._id) !== Number(productId)){
            dispatch(listProductDetails(productId))
        }
        if(product && Number(product._id) === Number(productId)){
            setDescription(product.description)
            setBrand(product.brand)
            setCategory(product.category)
            setName(product.name)
            setImage(product.image)
            setPrice(product.price)
            setCountInStock(product.countInStock)
        }
    }, [dispatch, navigate, product, productId, userInfo])

    useEffect(() => {

        if(udpateSuccess){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }

    }, [dispatch, navigate, udpateSuccess])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('subimiting')
        dispatch(updateProduct(productId,{name, category, description, brand, price, countInStock}))
    }

    const uploadFileHandler = async (e) => {
        console.log('submitting image')
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)
        
        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)
            setUploading(false)
            console.log('data...')
            console.log(data)
            setImage(data.image_url)

        }catch(error){
            setUploading(false)
        }
    }

    return (
        <FormContainer>
            <h1>EDIT PRODUCT</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {productError && <Message variant='danger'>{productError}</Message>}
            {updateError && <Message variant='danger'>{updateError}</Message>}
            {(loading || loadingProduct) && <Loader />}
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

                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='brand'
                        placeholder='Enter Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='category'
                        placeholder='Enter Category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        style={{ display: 'none' }}
                    >

                    </Form.Control>

                    <Col>
                        <Image src={image} alt={product.name} fluid/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="image-file" className="mb-3">
                    <Form.Label> Choose File </Form.Label>
                    <Form.Control type="file" onChange={uploadFileHandler}/>
                    {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='description'
                        placeholder='Enter Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>CountInStock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter CountInStock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <hr />
                <Row className="align-items-center justify-content-center">
                    <Col md={6} className="text-center">
                        <LinkContainer to={'/admin/productlist'}>
                            <Button variant='dark'>Back</Button>
                        </LinkContainer>
                    </Col>
                    <Col md={6} className="text-center">
                        <Button type='submit' variant='dark'>Save</Button>
                    </Col>
                </Row>
            </Form>

        </FormContainer>
    )
}

export default ProductDetailScreen
