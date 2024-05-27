// src/main/Routes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import Feedback from '../components/Feedback/Feedback';
import Comments from '../components/Comments/Comments';

export default props => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<UserCrud />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="*" element={<Home />} />
    </Routes>
);
