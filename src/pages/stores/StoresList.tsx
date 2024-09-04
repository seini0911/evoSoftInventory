import React from 'react'
import {stores} from '../../data/data';

const StoresList = () => {
   
    return (
    <div className='container px-4'>
        <h2 className='font-bold text-3xl mb-3'>Stores List</h2>
      <div className="font-[sans-serif] overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-blue-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">
             Code N°
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Name
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Address
            </th>
            
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">

            {stores && (
               stores.map((store) => (
                    <tr className="even:bg-blue-50">
                        <td className="p-4 text-sm text-black">
                        {store.id}
                        </td>
                        <td className="p-4 text-sm text-black">
                        {store.name}
                        </td>
                        <td className="p-4 text-sm text-black">
                        { store.address}
                        </td>
                    </tr>
                ))
            )}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default StoresList
