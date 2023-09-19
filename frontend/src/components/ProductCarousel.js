import React, {useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Carousel} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {

    const productsTop = useSelector(state => state.productTop)
    const {loading, error, products} = productsTop

    const dispatch =  useDispatch()

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        (
            <Carousel pause='hover' className='bg-dark'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className='carousel.caption'>
                                <h4>{product.name} (${product.price})</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel
