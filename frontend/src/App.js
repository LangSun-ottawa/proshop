import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from 'react-bootstrap'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import UserScreen from './screens/UserScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen'
import ProductAdminListScreen from './screens/ProductAdminListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import OrderListAdminScreen from './screens/OrderListAdminScreen';

function App() {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact/>
              <Route path='/login' element={<UserScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:orderId' element={<OrderDetailsScreen />} />
              <Route path='/admin/listorders' element={<OrderListAdminScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart/:id?' element={<CartScreen />} />
              <Route path='/admin/listusers' element={<UserListScreen />} />
              <Route path='/admin/productlist' element={<ProductAdminListScreen />} />
              <Route path='/admin/product/:id/edit' element={<ProductDetailScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            </Routes>
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
