import React from 'react';
import './style.css';
import NotFoundImg from '../../assets/images/page-404.png';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <section className='notFound'>
            <div className="container-fluid">
                <div className='box'>
                    <img src={NotFoundImg} />
                    <br /><br />
                    <h1>Page Not Found</h1>
                    <p>The link you clicked may be broken or the page may have been removed.
                        visit the Homepage or Contact us about the problem</p>
                    <br />

                    <div className='d-flex'>
                        <Button onClick={() => navigate('/')} className='btn-g btn-lg m-auto'><Link >Back to Home Page</Link></Button>
                    </div>

                </div>
            </div>
        </section>
    )
}


export default NotFound;