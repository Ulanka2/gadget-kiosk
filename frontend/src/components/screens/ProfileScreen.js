import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {userDetails, userUpdate} from '../../actions/userActions'
import FormContainer from '../../containers/FormContainer'
import Loader from '../Loader'
import Message from '../Message'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

const ProfileScreen = ({history}) => {
    // const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetail = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetail

    const userProfileUpdate = useSelector(state => state.userUpdate)
    const {success} = userProfileUpdate

    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name || success) {
                dispatch({type: USER_UPDATE_RESET})
                dispatch(userDetails('profile'))

            }else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, user, userInfo, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(userUpdate({
                'id':user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h3>User Profile</h3>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
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

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button className='mt-2' block type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>

            </Col>
        </Row>
    )
}

export default ProfileScreen

    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    // const [message, setMessage] = useState('')

    // const userDetail = useSelector(state => state.userDetails)
    // const {error, loading, user} = userDetail
    // console.log(user.name)
    
    // const userLogin = useSelector(state => state.userLogin)
    // const {userInfo} = userLogin

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     if(!userInfo) {
    //         history.push('/login')
    //     }else{
    //         if(!user || user.name){
    //             dispatch(userDetails('profile'))
    //         }else{
    //             setName(user.name)
    //             setEmail(user.email)
    //             console.log("hi")
    //         }
    //     }
    // },[history, userInfo, dispatch, user])

    // const submitHandler = (e) => {
    //     e.preventDefault()

    //     if(password !== confirmPassword) {
    //         setMessage('Passwords do not match')
    //     } else {
    //         dispatch(userUpdate('update'))
    //     }
    // }
