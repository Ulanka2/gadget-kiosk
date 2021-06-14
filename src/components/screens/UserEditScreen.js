import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import {USER_ADMIN_UPDATE_RESET} from '../../constants/userConstants'
import {userDetails, adminUpdateUser} from '../../actions/userActions'
import FormContainer from '../../containers/FormContainer'
import Loader from '../Loader'
import Message from '../Message'

const UserEditScreen = ({match, history}) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const getUserDetails = useSelector(state => state.userDetails)
    const {loading:loadingDetails, error:errorDetails, user:userDetail} = getUserDetails

    const userAdminUpdate = useSelector(state => state.userAdminUpdate)
    const {success:successAdmin, loading:loadingAdmin, error:errorAdmin, user:userAdmin} = userAdminUpdate

    const dispatch = useDispatch()

    useEffect(() => {

        if(successAdmin) {
            dispatch({type:USER_ADMIN_UPDATE_RESET})
            history.push('/admin/userlist')
        } else {
            if(!userDetail || Number(userDetail._id) !== Number(userId)){
            dispatch(userDetails(userId))
        } else {
            setName(userDetail.name)
            setEmail(userDetail.email)
            setIsAdmin(userDetail.isAdmin)
            }
        }
        
    },[dispatch, userId, userDetail, successAdmin, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUpdateUser({_id:userDetail._id, name, email, isAdmin}))
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                <Button>
                    Go Back
                </Button>
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingAdmin && <Loader/>}
                {errorAdmin && <Message variant='danger'>{errorAdmin}</Message>}
                
                {loadingDetails ? <Loader/> : errorDetails ? <Message variant='danger'>{errorDetails}</Message> 
                : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
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
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>
                        </Form.Group>

                        <Button className='mt-2' block type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>

                )}
            </FormContainer>
        </div> 
    )
}

export default UserEditScreen