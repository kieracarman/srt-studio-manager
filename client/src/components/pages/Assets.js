import React, { useState } from 'react';

import SearchBar from '../molecules/SearchBar';
import AssetList from '../organisms/AssetList';
import Modal from './Modal';

const Assets = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Assets</h1>
      <div className='list-container'>
        <SearchBar item='Asset' createNew={() => setIsOpen(true)} />
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <h1>This is my modal.</h1>
        </Modal>
        <AssetList />
      </div>

    </div>
  );
};

export default Assets;