import React, {useEffect} from 'react'
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { PaystackButton } from 'react-paystack';
import { Link } from 'react-router-dom'

import Message from '../Message'
import Loader from '../Loader'
import { getOrderDetails, payOrder, deliveredOrder } from '../../actions/orderActions'
import {ORDER_PAY_RESET, ORDER_DELIVERED_RESET} from '../../constants/orderConstant'

const OrderScreen = ({match, history}) => {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const {loading, order, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success:successPay } = orderPay

    const orderDelivered = useSelector(state => state.orderDelivered)
    const {loading:loadingDelivered, success:successDelivered } = orderDelivered

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    
    // FOR PAYSTACK IMPLEMENTATION
    const config = {
        reference: (new Date()).getTime(),
        email: userInfo.email,
        amount: parseInt(order.totalPrice*100),
        publicKey: 'pk_test_931db6c54665877a14ec0a8a17843d29fec9215d',
      }
    const paystackSuccess = (reference) => {
        dispatch(payOrder(orderId, reference))
        console.log(reference)
    }
    const paystackClose = () => {
        console.log("Closed")
    }

    const componentProps = {
        ...config,
        text: 'Paystack Button Implementation',
        onSuccess: (reference) => paystackSuccess(reference),
        onClose: paystackClose,
    }

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        
        if(!order || successPay || order._id !== Number(orderId) || successDelivered){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVERED_RESET})
            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, order, orderId, successPay, successDelivered])


    const deliveredHandler = () => {
        dispatch(deliveredOrder(order))
    }
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) :(
        <div>
        <Link to='/profile'>
            <Button>
                Go Back
            </Button>
        </Link>
        <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {' '}
                                {order.shippingAddress.postalCode},
                                {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on: {order.deliveredAt}</Message>
                            ): (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on: {order.paidAt}</Message>
                            ): (
                                <Message variant='warning'>Not paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                Order is empty
                            </Message>: (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item,index) => {
                                        return <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                    
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${order.totalPrice}</Col>
                                    
                                </Row>
                            </ListGroup.Item>
                            
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    <PaystackButton {...componentProps} />                 
                                </ListGroup.Item>
                            )}

                        </ListGroup>

                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliveredHandler}
                                >
                                    Mark as deliver
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen