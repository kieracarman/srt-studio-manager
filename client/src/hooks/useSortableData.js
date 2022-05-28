import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

const useSortableData = (array, config = {}) => {
  const [sort, setSort] = useState(config);

  const sortedData = useMemo(() => {
    let sortableData = [...array];
    if (sort.direction !== '') {
      sortableData.sort((a, b) => {
        if (a[sort.key] < b[sort.key]) {
          return sort.direction === 'ascending' ? -1 : 1;
        }
        if (a[sort.key] > b[sort.key]) {
          return sort.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [array, sort]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sort.key === key && sort.direction === 'ascending') {
      direction = 'descending';
    } else if (sort.key === key && sort.direction === 'descending') {
      direction = '';
    }
    setSort({ key, direction });
  };

  const sortArrow = key => {
    if (key === sort.key) {
      return sort.direction === 'ascending' ? <ChevronDown /> :
        sort.direction === 'descending' ? <ChevronUp /> : '';
    }
  };
  return { sortedData: sortedData, requestSort, sortArrow, sort };
};

export default useSortableData;