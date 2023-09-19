import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Container } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart, cartSavingShippingAction, cartPaymentMethodAction } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen() {

    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const navigate = useNavigate()

    const cartInfo = useSelector(state => state.cart)
    const { cartPaymentMethod, cartSavingShipping } = cartInfo

    const dispatch = useDispatch()

    const handlePaymentMethodChange = (e) => {
        const newPaymentMethod = e.target.value;
        setPaymentMethod(newPaymentMethod);
    };

    const submitHandler = () => {
        dispatch(cartPaymentMethodAction(paymentMethod));
        navigate("/placeorder")
    }

    useEffect(() => {
        if(!cartSavingShipping){
            navigate("/shipping")
        }
        if(cartPaymentMethod){
            setPaymentMethod(cartPaymentMethod)
        }
    }, [navigate, cartPaymentMethod, cartSavingShipping])

    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1={true} step2={true} step3={true} />
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'> Select Method </Form.Label>
                        <Col>
                            <Form.Check 
                                    type='radio' 
                                    label='Paypal' 
                                    id='paypal' 
                                    name='paymentMethod' 
                                    value='Paypal'
                                    checked={paymentMethod === 'Paypal'}
                                    onChange={handlePaymentMethodChange}
                                />
                            <Form.Check 
                                type='radio' 
                                label='Credit Card' 
                                id='creditCard' 
                                name='paymentMethod' 
                                value='CreditCard'
                                checked={paymentMethod === 'CreditCard'}
                                onChange={handlePaymentMethodChange}
                            />
                        </Col>
                    </Form.Group>

                    <Button type='submit' variant='dark'>
                        Continue
                    </Button>
                </Form>

            </FormContainer>
        </div>
    )
}

export default PaymentScreen




