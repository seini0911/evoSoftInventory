import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { HandleLocalStorage } from '../../utils/HandleLocalStorage';
import { Inventory, Product, Store } from '../../types/DataType';
import { products, stores } from '../../data/data';
import CustomEditButton from '../../components/CustomButtons/CustomEditButton';
import CustomDeleteButton from '../../components/CustomButtons/CustomDeleteButton';
// import { employees } from '../../data/data';

const InventoryList = () => {
  const {user} = useContext(AuthContext)??{};
  let inventories = [];
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
                      <CustomEditButton/>
                      <CustomDeleteButton/>
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
