import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            <div className="max-w-6xl mx-auto" style={{ backgroundColor: '#F5F5F5' }}>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;