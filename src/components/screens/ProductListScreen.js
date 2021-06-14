import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts, deleteProduct} from '../../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import Loader from '../Loader'
import Message from '../Message'

const ProductListScreen = ({history}) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, products, error} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, success:successDelete, error:errorDelete} = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin) {
            history.push('/login')
        }else{
            dispatch(listProducts())
        }
        
    }, [dispatch, userInfo, history, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product')){
            dispatch(deleteProduct(id))
        }
        
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-center'>
                    <LinkContainer to={'/admin/product/create/'}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Create Product
                        </Button>
                    </LinkContainer>
                    
                </Col>
            
            {/* {errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-md'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                        </tr>  
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>

                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            </Row>
        </div>
    )
}

export default ProductListScreen
