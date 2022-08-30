import { useNavigate } from 'react-router-dom'

import styles from './AssetListItem.module.css'

const AssetListItem = ({
  id,
  tagNumber,
  description,
  make,
  model,
  location,
  status
}) => {
  const navigate = useNavigate()

  const handleEdit = (e) => navigate(`/assets/${id}`)

  const content = (
    <tr className={styles.listItem} onClick={handleEdit}>
      <td>{tagNumber}</td>
      <td className='bold'>{description}</td>
      <td>{make}</td>
      <td>{model}</td>
      <td>{location}</td>
      <td>
        <span
          className={`${styles.statusTag} ${
            status === 'in'
              ? styles.complete
              : status === 'out'
              ? styles.inProgress
              : status === 'lost'
              ? styles.pending
              : ''
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  )

  return content
}

export default AssetListItem
