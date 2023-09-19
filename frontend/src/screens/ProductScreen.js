import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating';
import axios from 'axios'
import { listProductDetails, createReviewInProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const DetailInfo = ({product}) => {

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const addToCartHandler = () => {
        navigate(`/cart/${product._id}?qty=${quantity}`)
    }

    const loginUser = useSelector(state => state.user)
    const { userInfo: currentUserInfo } = loginUser

    const { error: productReviewCreateError, loading: loadingProductReview, success} = useSelector(state => state.productReviewCreate)

    useEffect(() => {
        if(success){
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        if(product._id){
            dispatch(listProductDetails(product._id))
        }
    
      }, [dispatch, product._id, success]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(product._id)
        console.log(rating)
        console.log(comment)
        dispatch(createReviewInProduct(
            product._id,
            {
                rating,
                comment,
            }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Home</Link>
            <h1>Product</h1>
            {/* <p>ID: {product._id}</p> */}
            <p>Name: {product.name}</p>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating id={product._id} value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroupItem>
        
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
        
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
        
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty:</Col>
                                    <Col className='text-center'>
                                        <Form.Control className='text-center' as='select' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                            {
                                                [...Array(5 > product.countInStock ? 5 : product.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                    )
                                                ) 
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroup.Item className='text-center'>
                                <Button className={product.countInStock > 0 ? 'btn' : 'btn-secondary'} type='button' disabled={product.countInStock <= 0} onClick={addToCartHandler}>ADD TO CART</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={6}>
                    <h1>Reviews</h1>
                    {product.reviews.length === 0 && <Message variant='info'>No Review</Message>}
                    
                    <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating id={review._id} value={review.rating} color={'#f8e825'}/>
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                            <h4>Write a review</h4>
                            {loadingProductReview && <Loader />}
                            {success && <Message variant='success'>Review Submitted</Message>}
                            {productReviewCreateError && <Message variant='danger'>{productReviewCreateError}</Message>}
                            {currentUserInfo ? 
                                (<Form onSubmit={submitHandler} className="d-flex flex-column">
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='comment'>
                                        <Form.Label>Review</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            rows='5'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            >

                                        </Form.Control>
                                    </Form.Group>

                                    <Button
                                        className='mx-auto'
                                        disabled={loadingProductReview}
                                        type='submit'
                                        variant='dark'
                                    >
                                        Submit
                                    </Button>
                                </Form>)
                                : 
                                (<Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>)}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const {error, loading, product} = useSelector(state => state.productDetails)

  useEffect(() => {
    
    dispatch(listProductDetails(id))

  }, [dispatch, id]);

//   const [product, setProduct] = useState({})
//   useEffect(() => {
//     axios.get(`/api/products/${id}`)
//       .then(response => {
//         const data = response.data;
//         setProduct(data);
//       })
//       .catch(error => {
//         console.log(error)
//       });
//   }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <DetailInfo product={product}/>
      )}
    </div>
  )
}

export default ProductScreen
