// * components
import Spinner from './Spinner';

// * interfaces
interface TableCol {
  key?: string;
  title: string;
  className?: string;
  cellElem?: Function;
}

interface TableProps<T> {
  cols: TableCol[];
  rows: T[];
  className?: string;
  headClassName?: string;
  loading: boolean;
}

const Table = <T extends object>(props: TableProps<T>) => {
  const { cols, rows, className = '', headClassName = '', loading } = props;
  const setCell = (rowData: T, col: TableCol) => {
    if (col.cellElem) return col.cellElem(rowData);

    if (col.key) {
      const keys = col.key.split('.');
      // @ts-ignore
      let data = rowData[keys[0]];
      for (let i = 1; i < keys.length; i++) {
        data = data[keys[i]];
      }
      return data;
    }

    // @ts-ignore
    return rowData[col.title];
  };

  return (
    <div
      className={`table-wrap w-full overflow-x-auto md:overflow-visible mx-auto mb-10 md:mb-0 ${className}`}
    >
      <table className='w-full text-sm'>
        <thead
          className={`sticky z-10 text-right bg-white shadow-md ${headClassName}`}
        >
          <tr className='border-b border-gray-500'>
            {cols.map((col, idx) => (
              <th key={idx} className={`${col.className} pt-4 pb-2 px-3`}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='text-right'>
          {!loading &&
            rows.length > 0 &&
            rows.map((row, idx) => (
              <tr
                key={idx}
                className={`even:bg-gray-300/50 ${
                  rows.length > 1 && 'hover:bg-[#61dafb]'
                }`}
              >
                {cols.map((col, idx) => (
                  <td key={idx} className={`${col.className} py-4 px-3`}>
                    {setCell(row, col)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {loading && <Spinner className='w-16 mx-auto mt-20' />}
    </div>
  );
};

export default Table;
