import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAsset, createAsset, updateAsset, deleteAsset } from '../../actions/assets';

const EditAsset = (props) => {
  const { asset, isLoading } = useSelector((state) => state.assets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modifiedAsset, setModifiedAsset] = useState({ description: '' });
  
  useEffect(() => {
    if (id !== 'new') dispatch(getAsset(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id !== 'new') setModifiedAsset(asset);
  }, [id, asset])
  
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
    dispatch(deleteAsset(id, navigate));
  }

  return (
    <>
      {isLoading ? <h3>Loading...</h3> : (
        <div className='edit-form'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <div className='form-field'><label>Description</label><input onChange={handleChange} value={modifiedAsset.description} id='description' /></div>
              <div className='form-field'><label>Tag #</label><input onChange={handleChange} value={modifiedAsset.tagNumber} id='tagNumber' /></div>
              <div className='form-field'><label>Make</label><input onChange={handleChange} value={modifiedAsset.make} id='make' /></div>
              <div className='form-field'><label>Model</label><input onChange={handleChange} value={modifiedAsset.model} id='model' /></div>
              <div className='form-field'><label>Serial #</label><input onChange={handleChange} value={modifiedAsset.serialNumber} id='serialNumber' /></div>
              <div className='form-field'><label>Location</label><input onChange={handleChange} value={modifiedAsset.location} id='location' /></div>
              <div className='form-field'><label>Acquisition Date</label><input onChange={handleChange} value={modifiedAsset.acquisitionDate} id='acquisitionDate' /></div>
              <div className='form-field'><label>Acquisition Amount</label><input onChange={handleChange} value={modifiedAsset.transactionAmount} id='transactionAmount' /></div>
              <div className='form-field'><label>Status</label><select onChange={handleChange} value={modifiedAsset.status} id='status'>
                <option value='' disabled selected hidden>Select...</option>
                <option value='in'>in</option>
                <option value='out'>out</option>
              </select></div>
              <div className='form-field'><label>Asset Type</label><select onChange={handleChange} value={modifiedAsset.assetType} id='assetType'>
                <option value='' disabled selected hidden>Select...</option>
                <option value='hardware'>hardware</option>
                <option value='software'>software</option>
              </select></div>
              <div className='form-field'><label>Maintenance Status</label><select onChange={handleChange} value={modifiedAsset.maintenanceStatus} id='maintenanceStatus'>
                <option value='' disabled selected hidden>Select...</option>
                <option value='active'>active</option>
                <option value='inactive'>inactive</option>
              </select></div>
              <div className='form-field'><label>Minimum Access Level</label><select onChange={handleChange} value={modifiedAsset.minimumAccessLevel} id='minimumAccessLevel'>
                <option value='' disabled selected hidden>Select...</option>
                <option value='sophomore'>sophomore</option>
                <option value='junior'>junior</option>
                <option value='senior'>senior</option>
                <option value='staff'>staff</option>
              </select></div>
            </div>
            <div className='form-field'>
              {id !== 'new' ? <button type='button' onClick={handleDelete} className='btn-alert left'>Delete Asset</button> : <span></span>}
              <button type='submit' className='btn right'>Save</button>  
            </div>
          </form>
        </div>)}
    </>
  );
};

export default EditAsset;