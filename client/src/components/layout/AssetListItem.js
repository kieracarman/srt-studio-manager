import { React, Component } from 'react';

export default class AssetListItem extends Component {
  render () {
    return(
      <tr className='asset-list-item'>
        <td>{this.props.tagNumber}</td>
        <td>{this.props.make}</td>
        <td>{this.props.model}</td>
        <td>{this.props.status}</td>
      </tr>
    )
  }
}