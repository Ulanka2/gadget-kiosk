import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'

import Rating from '../Rating'
import Loader from '../Loader'
import Message from '../Message'
import {listProductDetails} from '../../actions/productAction'

const ProductScreen = ({match, history}) => {
    const [qty, setQty] = useState(1)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match.params.id])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    let productsDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productsDetails
    
    return (
        <div>
            {loading ? <h2><Loader /></h2> : error ? <Message variant='danger'>{error}</Message>
                :<div>
                    <Link to='/' className='btn btn-dark my-3'>Go Back</Link>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>

                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                </ListGroup.Item>
                                
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price: </Col>
                                            <Col> 
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status: </Col>
                                            <Col> 
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {/* Quantity Selection */}
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col sx='auto' className='my-1'>
                                                    <Form>
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(event) => {setQty(event.target.value)}}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => {
                                                                    return (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Row>
                                            <Button
                                                onClick={() => addToCartHandler()} 
                                                block 
                                                disabled={product.countInStock === 0} 
                                                type='button'>Add To Cart
                                            </Button>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    )
}

export default ProductScreen
