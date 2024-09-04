import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { HandleLocalStorage } from '../../utils/HandleLocalStorage';
import { Inventory, Product, Store } from '../../types/DataType';
import { products, stores } from '../../data/data';

import { useNavigate } from 'react-router-dom';

// import { employees } from '../../data/data';

const InventoryList = () => {
  const {user} = useContext(AuthContext)??{};
  const navigate = useNavigate();
  let inventories: Inventory[] = [];
  const allProducts : Product[] = products;
  const allStores : Store[] = stores;
  if(user?.isAdmin){
    /** 
     * get all the inventories from the localStorage and display them
     * The inventories list is dependend on employees email.
    */
   //TODO: Get all the inventories with the employees emails
  //  employees.map((employee)=>{
     //for each employee we will check in the localstorage a value inventory_employee.email
  //  })
  }else{
    const {getItemFromLocalStorage}= HandleLocalStorage(`inventory_${user?.email}`);
    inventories = getItemFromLocalStorage();
    console.log('logged user inventories: ', JSON.stringify(inventories));
  }

  const deleteInventory = (inventoryId: number|string) => {
    alert('Do you want to delete this inventory ?');
      inventories = inventories.filter((inventory)=> inventory.id !== inventoryId);
      const {setItemInLocalStorage, removeItemFromLocalStorage} = HandleLocalStorage(`inventory_${user?.email}`);
      removeItemFromLocalStorage();// we remove items from the localStorage and replace it with the new ones
      setItemInLocalStorage(inventories);
      console.log('inventories after delete: ', inventories);
      window.location.reload();
  }
  const gotoUpdateInventoryForm = (inventoryId: number|string) => {
    console.log('gotoUpdateInventory: ', inventoryId);
    navigate(`/dashboard/employee/update/inventory/${inventoryId}`,)
  }
  return (
    <div className="container px-4 py-4">
      <h2 className='font-bold text-3xl mb-3'>My Inventories</h2>
      <div className="font-[sans-serif] overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="whitespace-nowrap bg-gray-700 text-white items-center justify-center">
          <tr>
            <th className="p-4 text-left text-sm font-semibold ">
              Inventory Date
            </th>
            <th className="p-4 text-left text-sm font-semibold ">
              Inventory Code
            </th>
            <th className="p-4 text-left text-sm font-semibold ">
              Product
            </th>
            <th className="p-4 text-left text-sm font-semibold ">
              Stock
            </th>
            <th className="p-4 text-left text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {
            inventories && inventories.map((inventory: Inventory)=>{
              return(
                <tr className="odd:bg-blue-50">
                    {/* inventory date */}
                    <td className="p-4 text-sm text-black font-bold">
                      {inventory.date}
                    </td>
                   {/* inventory code/id */}
                    <td className="p-4 text-sm">
                      {inventory.id}
                    </td>
                    
                    {/* inventory product name */}
                    <td className="p-4 text-sm">
                      {allProducts.find((product) => product.id === inventory.productId)?.name.toLocaleUpperCase()}
                    </td>
                    <td className="p-4 text-sm">
                      {
                        inventory.stock.map((stock)=>{
                          return (
                            <>
                              <tr>
                                  {/* display store name  */}
                                  <td className="p-2 text-sm ">
                                    {
                                      allStores.find((store)=> store.id===stock.storeId)?.name
                                    }
                                  </td>
                                  <hr/>
                                  {/* display quantity */}
                                  <td className="p-2 text-sm font-bold text-center items-center">
                                    {stock.quantity}
                                  </td>
                              </tr>
                              <hr/>
                            </>
                          )
                        })
                      }
                    </td>
                    <td className="p-4 text-sm">
                      {/* update button */}
                      <button 
                      onClick={()=> gotoUpdateInventoryForm(inventory.id)}
                      className="mr-4" 
                      title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
                              viewBox="0 0 348.882 348.882">
                              <path
                              d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                              data-original="#000000" />
                              <path
                              d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                              data-original="#000000" />
                          </svg>
                      </button>
                      {/* delete button */}
                      <button type="button" onClick={()=>deleteInventory(inventory.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                              <path
                              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                              data-original="#000000" />
                              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                              data-original="#000000" />
                          </svg>
                        </button> 
                    </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <div className="md:flex m-4">
        <p className="text-sm text-gray-500 flex-1">Showing 1 to 5 of 100 entries</p>

        <div className="flex items-center max-md:mt-4">
          <p className="text-sm text-gray-500">Display</p>
          <select className="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>

          <ul className="flex space-x-1 ml-2">
            <li className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              1
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded">
              2
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              3
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              4
            </li>
            <li className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InventoryList
