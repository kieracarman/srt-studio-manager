import Link from 'next/link'

import styles from './AssetListItem.module.css'

type AssetListItemProps = {
  id: string
  tagNumber: string
  description: string
  make: string
  model: string
  location: string
  status: string
}

const AssetListItem = ({
  id,
  tagNumber,
  description,
  make,
  model,
  location,
  status
}: AssetListItemProps) => {
  const content = (
    <Link href={`/assets/${id}`}>
      <tr className={styles.listItem}>
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
    </Link>
  )

  return content
}

export default AssetListItem
