import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom';
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const ProductList = ({ products }) => {
  return (
    <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

function HomeScreen() {

  const dispatch = useDispatch()
  const {error, loading, products, page, pages} = useSelector(state => state.productList)

  const location = useLocation();
  const keyword = location.search;

  console.log(keyword)

  useEffect(() => {
    
    dispatch(listProducts(keyword))

  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}

      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div >
            <ProductList products={products} />
            <hr ></hr>
            <div className="d-flex justify-content-center">
              <Paginate keyword={keyword} page={page} pages={pages}/>
            </div>
        </div>
      )}
    </div>
  )
}

export default HomeScreen
