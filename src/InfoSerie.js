import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match}) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('')

    const [data, setData] = useEffect({})
    useEffect(()=>{
        axios
            .get('/api/genres/' + match.params.id)
            .then(res => {
                setName(res.data)
            })
    },[match.params.id])

    //custom header
    const masterHeader = {
        heigth: '50vh',
        minHeigth: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios.post('/api/series', {
            name
        }).then(res => {
            setSuccess(true)
        })
    }
    if (success) {
        return <Redirect to='/series' />
    }

    return (
            <div>
                <header style={masterHeader}>
                    <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                        <div className='h-100 container'>
                            <div className='row h-100 align-items-center'>
                                <div className='col-3'>
                                    <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster}></img>
                                </div>
                                <div className='col-8'>
                                    <h1 className='font-weigth-light text-white'>{data.name}</h1>
                                </div>
                                <div className='lead text-white'>
                                    <Badge color='success'>Assistido</Badge>
                                    <Badge color='success'>Para assistir</Badge>
                                    <Badge color='success'>Assistido</Badge>
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
        <div className='container'>
            <h1>Nova Série</h1>
            <pre>{JSON.stringify(data)}</pre>
            <form>
                <div className='form-group'>
                    <label htmlFor='Name'>Nome</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='Name' placeholder='Nome da Série'></input>
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar Série</button>
            </form>
        </div> 
    </div>               
    )
}

export default InfoSerie