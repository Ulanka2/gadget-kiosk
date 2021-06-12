import React, {useState, useEffect} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import FormContainer from '../../containers/FormContainer'
import {createProduct} from '../../actions/productAction'
import Loader from '../Loader'
import Message from '../Message'

const ProductCreateScreen = ({history}) => {
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading:loadingCreate, 
        product:createdProduct, 
        success:successCreate, 
        error:errorCreate} = productCreate
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo.isAdmin) {
            history.push('/login')
        }

        if(successCreate){
            history.push('/admin/productlist')
        }
        
    }, [history, userInfo, successCreate, createdProduct])

    const createProductHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct({
            name,
            brand,
            category,
            description,
            price,
            countInStock,
            image
        }))
    }
    return (
        <FormContainer>
            <h1>Create Product</h1>
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            <Form onSubmit={createProductHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        required
                        type='text'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>Available Stock</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Available Stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button className='mt-2' block type='submit' variant='primary'>
                    Create Product
                </Button>
            </Form>
            
        </FormContainer>
    )
}

export default ProductCreateScreen
