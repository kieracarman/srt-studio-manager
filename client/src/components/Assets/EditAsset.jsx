import React, { useState } from 'react';

const EditAsset = (props) => {
  const [updateAsset, setUpdateAsset] = useState(props.asset);

  const handleChange = (e) => {
    setUpdateAsset({...updateAsset, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(updateAsset);
  }

  return (
    <>
      {!props.isLoading ? (
        <div className='edit-form'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <div className='form-field'><label>Description</label><input onChange={handleChange} value={updateAsset.description} id='description' /></div>
              <div className='form-field'><label>Tag #</label><input onChange={handleChange} value={updateAsset.tagNumber} id='tagNumber' /></div>
              <div className='form-field'><label>Make</label><input onChange={handleChange} value={updateAsset.make} id='make' /></div>
              <div className='form-field'><label>Model</label><input onChange={handleChange} value={updateAsset.model} id='model' /></div>
              <div className='form-field'><label>Serial #</label><input onChange={handleChange} value={updateAsset.serialNumber} id='serialNumber' /></div>
              <div className='form-field'><label>Location</label><input onChange={handleChange} value={updateAsset.location} id='location' /></div>
              <div className='form-field'><label>Acquisition Date</label><input onChange={handleChange} value={updateAsset.acquisitionDate} id='acquisitionDate' /></div>
              <div className='form-field'><label>Acquisition Amount</label><input onChange={handleChange} value={updateAsset.transactionAmount} id='transactionAmount' /></div>
              <div className='form-field'><label>Status</label><select onChange={handleChange} value={updateAsset.status} id='status'>
                <option value='in'>in</option>
                <option value='out'>out</option>
              </select></div>
              <div className='form-field'><label>Asset Type</label><select onChange={handleChange} value={updateAsset.assetType} id='assetType'>
                <option value='hardware'>hardware</option>
                <option value='software'>software</option>
              </select></div>
              <div className='form-field'><label>Maintenance Status</label><select onChange={handleChange} value={updateAsset.maintenanceStatus} id='maintenanceStatus'>
                <option value='active'>active</option>
                <option value='inactive'>inactive</option>
              </select></div>
              <div className='form-field'><label>Minimum Access Level</label><select onChange={handleChange} value={updateAsset.minimumAccessLevel} id='minimumAccessLevel'>
                <option value='sophomore'>sophomore</option>
                <option value='junior'>junior</option>
                <option value='senior'>senior</option>
                <option value='staff'>staff</option>
              </select></div>
            </div>
            <button type='submit' className='btn'>Save</button>
          </form>

        </div>)
        : <div><h2>Loading...</h2></div>}
    </>
  );
};

export default EditAsset;