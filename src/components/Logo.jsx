import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div style={{ width }}>
      <svg height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="white"/>
        <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="22" fontWeight="bold" dy=".3em">B</text>
      </svg>
    </div>
  )
}

export default Logo
