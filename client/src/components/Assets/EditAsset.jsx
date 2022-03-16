import React, { useEffect } from 'react';

const EditAsset = (props) => {
  useEffect(() => {
    props.onEdit(props.id);
  });
  

  const onChange = (e) => {
    // copy asset object into holder object
    const holderObject = props.asset;

    // update holder object with new value
    holderObject[e.target.id] = e.target.value;

    console.log(holderObject);

    // send updated holder object back up to parent component
    props.onChange(holderObject);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <>
      {!props.isLoading ? (
        <div className='edit-form'>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={props.asset.description}
              id='description'
            />
            <button type='submit' className='btn'>Save</button>
          </form>

        </div>)
        : <div><h2>Loading...</h2></div>}
    </>
  );
};

export default EditAsset;