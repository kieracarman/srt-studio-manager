import Link from 'next/link'

type RoomListItemProps = {
  id: string
  name: string
}

const RoomListItem = ({ id, name }: RoomListItemProps) => {
  const content = (
    <Link href={`/rooms/${id}`} legacyBehavior>
      <tr>
        <td className='bold'>{name}</td>
      </tr>
    </Link>
  )

  return content
}

export default RoomListItem
