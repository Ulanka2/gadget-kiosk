import React, {useState, useEffect} from 'react'
import {Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import FormContainer from '../../containers/FormContainer'
import {updateProduct, listProductDetails} from '../../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import Loader from '../Loader'
import Message from '../Message'

const ProductEditScreen = ({history, match}) => {
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [uploadingImage, setUploadingImage] = useState(false)
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const productId = match.params.id
    const productUpdate = useSelector(state => state.productUpdate)
    const {
        loading:loadingUpdate, 
        success:successUpdate, 
        error:errorUpdate} = productUpdate
    
    const productDetails = useSelector(state => state.productDetails)
    const {product:productDetail} = productDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const token = userLogin.userInfo.token

    useEffect(() => {
        if(!userInfo.isAdmin){
            history.push('/login')
        }

        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else {
            if (!productDetail || Number(productDetail._id) !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(productDetail.name)
                setBrand(productDetail.brand)
                setCategory(productDetail.category)
                setDescription(productDetail.description)
                setPrice(productDetail.price)
                setCountInStock(productDetail.countInStock)
                setImage(productDetail.image)
            }
        }
        
    }, [userInfo, dispatch, productDetail, productId, history, successUpdate])

    const updateProductHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            brand,
            category,
            description,
            price,
            countInStock,
        }))
    }

    const uploadFileHandler = async (e) => {
        console.log(e)
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploadingImage(true)

        try{
            const data = await axios.post('/api/products/image-upload/', formData, {
                headers: {
                    'Content-type': 'multipart/form',
                    Authorization: `Bearer ${token}` 
                }
            })
            console.log(data)
            setImage(data.data)
            setUploadingImage(false)

        }catch(error){
            setUploadingImage(false)
        }
    }
    return (
        <FormContainer>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <h1>Update Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <Form onSubmit={updateProductHandler}>
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

                <Form.Group className='mb-3' controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    >
                    </Form.Control>

                    <Form.File
                        id='image-file'
                        custom
                        onChange={uploadFileHandler}
                    >

                    </Form.File>
                    {uploadingImage && <Loader />}

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
                    Update Product
                </Button>
            </Form>
            
        </FormContainer>
    )
}

export default ProductEditScreen
