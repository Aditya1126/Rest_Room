import React from 'react'

function Room(room) {
  return (
    <div className="row">
        <div className="col-md-4">
            <img src={room.imageurls} />
        </div>
        <h1>room.name</h1>
    </div>
  )
}

export default Room