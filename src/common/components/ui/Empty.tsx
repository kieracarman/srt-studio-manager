import { FilePlus } from 'react-feather'

import { Button } from '@components/form'

type EmptyProps = {
  item: string
}

const Empty = ({ item }: EmptyProps) => (
  <section className='m-4 flex flex-col items-center gap-4 rounded-xl border-4 border-dashed border-gray-200 p-4 sm:m-auto sm:mt-32 sm:py-12 sm:px-24'>
    <FilePlus />
    <h3 className='text-xl font-semibold'>No {item}s</h3>
    <p>Get started by creating a new {item}.</p>
    <Button href={`/${item}s/new`}>New {item}</Button>
  </section>
)

export default Empty
