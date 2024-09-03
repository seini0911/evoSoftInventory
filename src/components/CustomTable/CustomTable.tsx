import React from 'react'
export interface CustomTableData{
    key: number;
    values: unknown[];
}

const CustomTable = ({tableName, tableHeadings, tableData}:{tableName:string, tableHeadings:string[], tableData:unknown[]}) => {
  return (
    <>
      <h2 className='font-bold text-3xl mb-3'>{tableName}</h2>
      <div className="font-[sans-serif] overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-blue-800 whitespace-nowrap">
            <tr>
                {tableHeadings && tableHeadings.map((heading: string) => (
                    <th className="p-4 text-left text-sm font-medium text-white">
                        {heading}
                    </th>
                ))}
            </tr>
        </thead>

        <tbody className="whitespace-nowrap">
             <tr className="even:bg-blue-50">
                {tableData && (
                    tableData.map((data) => (
                    <td className="p-4 text-sm text-black">
                        {data?? '<></>'}
                    </td>

                        
                ))
                )}
                </tr>
        </tbody>
      </table>
    </div> 
    </>
  )
}

export default CustomTable
