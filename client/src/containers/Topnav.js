import React from 'react';

const TopNav = () => {

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <div className='d-inline-block'>
          <a href='/'>Home</a>
        </div>
        <div className='d-inline-block'>
          <a href='/images' className='ml-3'>Images</a>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
