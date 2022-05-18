import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './EditAsset.module.css';
import { getAsset, createAsset, updateAsset, deleteAsset } from '../../../actions/assets';

const EditAsset = (props) => {
  const { asset, isLoading } = useSelector((state) => state.assets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modifiedAsset, setModifiedAsset] = useState({ description: '' });
  const [deleteText, setDeleteText] = useState('Delete Asset');
  
  useEffect(() => {
    if (id !== 'new') dispatch(getAsset(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id !== 'new') setModifiedAsset(asset);
  }, [asset]);
  
  const handleChange = (e) => {
    setModifiedAsset({...modifiedAsset, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === 'new') {
      dispatch(createAsset(modifiedAsset, navigate));
    }
    dispatch(updateAsset(id, modifiedAsset, navigate));
  }

  const handleDelete = (e) => {
    e.preventDefault();

    deleteText === 'Delete Asset' ? setDeleteText('Are you sure?') : dispatch(deleteAsset(id, navigate));
  }

  return (
    <>
      {isLoading ? <h3>Loading...</h3> : (
        <div className={styles.editForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div><label>Description</label><input onChange={handleChange} value={modifiedAsset.description} id='description' /></div>
              <div><label>Tag #</label><input onChange={handleChange} value={modifiedAsset.tagNumber} id='tagNumber' /></div>
              <div><label>Make</label><input onChange={handleChange} value={modifiedAsset.make} id='make' /></div>
              <div><label>Model</label><input onChange={handleChange} value={modifiedAsset.model} id='model' /></div>
              <div><label>Serial #</label><input onChange={handleChange} value={modifiedAsset.serialNumber} id='serialNumber' /></div>
              <div><label>Location</label><input onChange={handleChange} value={modifiedAsset.location} id='location' /></div>
              <div><label>Acquisition Date</label><input onChange={handleChange} value={modifiedAsset.acquisitionDate} id='acquisitionDate' /></div>
              <div><label>Acquisition Amount</label><input onChange={handleChange} value={modifiedAsset.transactionAmount} id='transactionAmount' /></div>
              <div><label>Status</label><select onChange={handleChange} value={modifiedAsset.status} id='status'>
                <option value='' disabled selected hidden>Select...</option>
                <option value='in'>in</option>
                <option value='out'>out</option>
              </select></div>
              <div><label>Asset Type</label><select onChange={handleChange} value={modifiedAsset.assetType} id='assetType'>
                <option value='' disabled selected hidden>Select...</option>
                <option value='hardware'>hardware</option>
                <option value='software'>software</option>
              </select></div>
              <div><label>Maintenance Status</label><select onChange={handleChange} value={modifiedAsset.maintenanceStatus} id='maintenanceStatus'>
                <option value='' disabled selected hidden>Select...</option>
                <option value='active'>active</option>
                <option value='inactive'>inactive</option>
              </select></div>
              <div><label>Minimum Access Level</label><select onChange={handleChange} value={modifiedAsset.minimumAccessLevel} id='minimumAccessLevel'>
                <option value='' disabled selected hidden>Select...</option>
                <option value='sophomore'>sophomore</option>
                <option value='junior'>junior</option>
                <option value='senior'>senior</option>
                <option value='staff'>staff</option>
              </select></div>
            </div>
            <div>
              {id !== 'new' ? <button type='button' onClick={handleDelete} className='alert left'>Delete Asset</button> : <span></span>}
              <button type='submit' className='right'>Save</button>  
            </div>
          </form>
        </div>)}
    </>
  );
};

export default EditAsset;