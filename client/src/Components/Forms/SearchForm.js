import axios from 'axios'
import React from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../Context/Search'

function SearchForm() {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`/products/search/${values?.keyword}`)
            setValues({...values, results: data})
            navigate('/search')
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Form onSubmit={handleSubmit} inline>
      <Form.Group className='d-flex'>
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        onChange={(e) => setValues({...values, keyword: e.target.value})}
        value={values.keyword}
      />
      <Button className='ms-2' type="submit" variant="outline-success">Search</Button>
      </Form.Group>
      
      
    </Form>
  )
}

export default SearchForm