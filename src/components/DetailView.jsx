// DetailView.js
import React from 'react';

const DetailView = ({ selectedCategory }) => {
  return (
    <div style={{borderBlockStyle:'solid',borderBlockWidth:'2px'}}>
      <h3>Detail View</h3>
      {selectedCategory ? <p>{selectedCategory}</p> : <p>No item selected</p>}
    </div>
  )
  
}

export default DetailView;
