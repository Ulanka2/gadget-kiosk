import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'

import Rating from '../Rating'
import Loader from '../Loader'
import Message from '../Message'
import {listProductDetails, createProductReview} from '../../actions/productAction'
import { PRODUCT_DETAILS_RESET, PRODUCT_CREATE_REVIEWS_RESET } from '../../constants/productConstants'

const ProductScreen = ({match, history}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading:loadingProductReview, 
        error:errorProductReview, 
        success:successProductReview} = productReviewCreate

    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({type:  PRODUCT_CREATE_REVIEWS_RESET})

        }
        dispatch({type: PRODUCT_DETAILS_RESET})
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match.params.id, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    const productsDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productsDetails
    
    return (
        <div>
            {loading ? <h2><Loader /></h2> : error ? <Message variant='danger'>{error}</Message>
                :<div>
                    <Link to='/' className='btn btn-dark my-3'>Go Back</Link>
                    <div>
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
                                                    {product.countInStock === 0 || product.countInStock === ''? 'Out of Stock' : 'In Stock'}
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
                                                    disabled={product.countInStock === 0 || product.countInStock === ''} 
                                                    type='button'>Add To Cart
                                                </Button>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                <ListGroup variant='flush'>
                                    {product.reviews.map((review) => (
                                        <ListGroup.Item ley={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} color='#f8e825'/>
                                            <p>{review.createdAt.substring(0,10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}

                                    <ListGroup.Item>
                                        <h4>Write a review</h4>
                                        {loadingProductReview && <Loader/>}
                                        {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                        
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={e => setRating(e.target.value)}
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
                                                        row='5'
                                                        value={comment}
                                                        onChange={e => setComment(e.target.value)}
                                                    >

                                                    </Form.Control>
                                                </Form.Group>

                                                <Button
                                                    disable={loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                    className='mt-2'
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message variant='info'>
                                                Please <Link to='/login'>login</Link> to write a review
                                            </Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            
                        </Row>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductScreen
