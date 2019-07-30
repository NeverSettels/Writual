import { useState } from 'react'

const useForm = () => {
  const [form, setForm] = useState({})

  const handleInputs = e => {
    e.persist()
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleStaticInputs = (name, value) => {
    console.log(value)
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return [form, handleInputs, handleStaticInputs]
}

export default useForm
