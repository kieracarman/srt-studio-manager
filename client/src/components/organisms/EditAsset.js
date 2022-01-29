import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export default withRouter(class AssetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asset: {
        description: ''
      },
      errors: {}
    }
  }

  // Starting lifecycle and calling for data from the database
  componentDidMount() {
    if (this.props.id === 'new') {
      console.log(this.state.asset);
      return;
    }
    
    axios.get(`/api/assets/${this.props.id}`)
      .then(response => {
        // Create a holder object for data
        const object = response.data;

        // Set asset state to object
        this.setState({asset: object});
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChange = e => {
    // copy asset object into holder object
    const holderObject = this.state.asset;

    // update holder object with new value
    holderObject[e.target.id] = e.target.value;

    // copy holder object back to asset object
    this.setState({ asset: holderObject});
  };

  onSubmit = e => {
    e.preventDefault();

    const data = this.state.asset;
    
    if (!data._id) {
      console.log(data);
      axios.post('/api/assets/', data)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      axios.put('/api/assets/' + data._id, data)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
      this.props.history.push('/assets');
    };
  }

  render() {
    return (
      <div className='edit-form'>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={this.state.asset.description}
            id='description'
          />
          <button type='submit' className='btn'>Save</button>
        </form>

      </div>
    )
  }

});