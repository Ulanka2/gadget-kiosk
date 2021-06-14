import React, {useState, useEffect} from 'react'
import { Button, Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    useEffect(() => {
        if(keyword){
            history.push(`/?keywords=${keyword}`)
        }else{
            history.push(history.push(history.push(history.location.pathname)))
        }
    },[keyword, history])

    return (
        <Form inline>
            <Form.Control
                type='text'
                name='q'
                placeholder='Search'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

        </Form>
    )
}

export default SearchBox