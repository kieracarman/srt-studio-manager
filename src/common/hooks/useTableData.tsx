import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'

type SortConfig = {
  direction: string
  key: string
}

const useSortableData = (array: any[] | undefined, config: SortConfig) => {
  const [sort, setSort] = useState(config)

  const sortedData = useMemo(() => {
    const sortableData = [...array]
    if (sort.direction !== '') {
      sortableData.sort((a, b) => {
        if (a[sort.key] < b[sort.key]) {
          return sort.direction === 'ascending' ? -1 : 1
        }
        if (a[sort.key] > b[sort.key]) {
          return sort.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [array, sort])

  const requestSort = (key: string) => {
    let direction = 'ascending'
    if (sort.key === key && sort.direction === 'ascending') {
      direction = 'descending'
    } else if (sort.key === key && sort.direction === 'descending') {
      direction = ''
    }
    setSort({ ...sort, key, direction })
  }

  const sortArrow = (key: string) => {
    if (key === sort.key) {
      return sort.direction === 'ascending' ? (
        <ChevronDown />
      ) : sort.direction === 'descending' ? (
        <ChevronUp />
      ) : (
        ''
      )
    }
  }
  return { tableData: sortedData, requestSort, sortArrow }
}

export default useSortableData
