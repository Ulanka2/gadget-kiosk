import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'

import Loader from '../Loader'
import Message from '../Message'
import { listTopProducts } from '../../actions/productAction'

const ProductCarousel = () => {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {loading:loadingTopRated, error:errorTopRated, products:productsTopRated} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
    return (
        loadingTopRated ? <Loader/> 
        : errorTopRated ? <Message variant='danger'>{errorTopRated}</Message>
        : (
            <Carousel interval={3000} pause='hover' className='bg-dark'>
                {productsTopRated.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
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
