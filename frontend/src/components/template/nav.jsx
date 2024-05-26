import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='menu-area'>
        <nav className='menu'>
    <Link to="/">
        <i className='fa fa-home'></i> Inicio
    </Link>
    <Link to="/users">
        <i className='fa fa-users'></i> Usuários
    </Link>
    <Link>
        <i className="fa fa-star"></i> FeedBack
    </Link>
    <Link to={"/comments"}>
        <i className="fa fa-comment"></i> Comentarios
    </Link>
        </nav>
    </aside>