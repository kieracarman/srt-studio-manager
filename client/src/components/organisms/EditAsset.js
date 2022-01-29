import React, { Component } from 'react';

export default class AssetList extends Component {
  componentDidMount() {
    this.props.onEdit(this.props.id);
  }

  onChange(e) {
    // copy asset object into holder object
    const holderObject = this.props.asset;

    // update holder object with new value
    holderObject[e.target.id] = e.target.value;

    console.log(holderObject);

    // send updated holder object back up to parent component
    this.props.onChange(holderObject);
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {

    if (!this.props.isLoading) return (
      <div className='edit-form'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            onChange={this.onChange.bind(this)}
            value={this.props.asset.description}
            id='description'
          />
          <button type='submit' className='btn'>Save</button>
        </form>

      </div>
    );
  };
};