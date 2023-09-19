import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate(location.pathname)
        }
    }
    
    return (
        <Form onSubmit={submitHandler} className="d-flex align-items-center" inline="true">
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            />
            <Button type='submit' variant='outline-success' className='p-2'>
                search
            </Button>
        </Form>
    );
    
}

export default SearchBox
