import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {listProducts} from '../../actions/productAction'
import Product from '../../components/Product'
import Loader from '../Loader'
import Message from '../Message'
import ProductCarousel from '../../components/screens/ProductCarousel'

const HomeScreen = ({history}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products} = productList

    let keyword = history.location.search
    console.log(keyword)
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    const renderProducts = products.map((product) => {
        return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
        )
    })

    return (
        <div>
            {loading ? <h2><Loader /></h2> : error ? <Message variant='danger'>{error}</Message>
                : (
                <div>
                {!keyword && <ProductCarousel />}
                    <Row>
                    <h1>Latest Products</h1>
                        {renderProducts}
                    </Row>
                </div>
                )
            }
        </div>
    )
}

export default HomeScreen
