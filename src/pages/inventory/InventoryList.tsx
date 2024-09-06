import React, { useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { HandleLocalStorage } from '../../utils/HandleLocalStorage';
import { Employee, Inventory, Product, Store } from '../../types/DataType';
import { products, stores } from '../../data/data';
import { useNavigate } from 'react-router-dom';
import { employees } from '../../data/data';
import { useTranslation } from 'react-i18next';
import CustomButtonExportCSV from '../../components/CustomButtons/CustomButtonExportToCSV';

const InventoryList = () => {
  const {user} = useContext(AuthContext)??{};
  const{t} = useTranslation();
  const tableName = !user?.isAdmin ? t('my_inventories') :t('all_inventories');
  const tableHeaders = [
    t('inventory_date'),
    t('inventory_code'),
    t('product'),
    t('stock_store_quantity'),
    t('actions'),
  ];
  const numberOfItemsToDisplayOnTable : number[]= [
    3,5,7,
  ];
  // const [selectedNumberOfItemsToDisplay,setSelectedNumberOfItemsToDisplay] = useState<number>(3);
  // const [pageNumber, setPageNumber] = useState<number>(1);
  const navigate = useNavigate();
  let inventories: Inventory[] = [];
  const allProducts : Product[] = products;
  const allStores : Store[] = stores;
  if(user?.isAdmin){
    /** 
     * get all the inventories from the localStorage and display them
     * The inventories list is dependend on employees email.
    */
   employees.map((employee: Employee)=>{
    const {getItemFromLocalStorage}= HandleLocalStorage(`inventory_${employee?.email}`);
    //check if in the list of employees we have matching records of inventories having the employee's email, if yes we add it to the list of inventories to display to the admin on the table
    const employeesInventories : Inventory[] =  getItemFromLocalStorage()
    if(employeesInventories!=null) inventories.push(...employeesInventories);
   })
  }else{
    const {getItemFromLocalStorage}= HandleLocalStorage(`inventory_${user?.email}`);
    inventories = getItemFromLocalStorage();
  }

  const deleteInventory = (inventoryId: number|string) => {
    alert('Do you want to delete this inventory ?');
      inventories = inventories.filter((inventory)=> inventory.id !== inventoryId);
      if(!user?.isAdmin){
        const {setItemInLocalStorage, removeItemFromLocalStorage} = HandleLocalStorage(`inventory_${user?.email}`);
        removeItemFromLocalStorage();// we remove items from the localStorage and replace it with the new ones
        setItemInLocalStorage(inventories);
      }
      // console.log('inventories after delete: ', inventories);
      window.location.reload();
  }
  const gotoUpdateInventoryForm = (inventoryId: number|string) => {
    navigate(`/dashboard/employee/update/inventory/${inventoryId}`,)
  }

  return (
    <div className="container items-center justify-center px-4 py-4 mx-auto text-center justify-items-center">
      <h2 className='mb-3 text-3xl font-bold text-left'>{ tableName}</h2>
      <div className="container items-end justify-end mb-2 text-end justify-items-end">
        <CustomButtonExportCSV fileName={tableName} headersArray={tableHeaders} dataContent={inventories}/>
      </div>
      <div className="font-[sans-serif] md:flex overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="items-center justify-center text-white bg-gray-700 whitespace-nowrap">
              <tr>
                {
                  tableHeaders && tableHeaders.map((header:string)=>{
                      return(
                        <th key={header} className="p-4 text-sm font-semibold text-left ">
                              {header}
                        </th>
                      )
                  }) 
                } 
              </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {
              inventories && inventories.map((inventory: Inventory)=>{
                return(
                  <tr key={inventory.id} className="odd:bg-blue-50">
                      {/* inventory date */}
                      <td className="p-4 text-sm font-bold text-black">
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
                                <tr key={stock.id}>
                                    {/* display store name  */}
                                    <td className="p-2 text-sm ">
                                      {
                                        allStores.find((store)=> store.id===stock.storeId)?.name
                                      }
                                    </td>
                                    <hr/>
                                    {/* display quantity */}
                                    <td className="p-2 text-sm font-bold {stock.quantity > 0: 'text-green-400' :'text-red-400' }">
                                      {stock.quantity}
                                    </td>
                                </tr>
                                <hr/>
                              </>
                            )
                          })
                        }
                      </td>
                      <td className="items-center p-4 text-sm text-center">
                      { !user?.isAdmin && (
                        <>
                            {/* update button visible only to the author of the inventory */}
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
                        </>
                      )}
                       
                      </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className="m-4 md:flex">
        {/* <p className="flex-1 text-sm text-gray-500">Showing 1 to 5 of 100 entries</p> */}

        <div className="flex items-center max-md:mt-4">
          <p className="text-sm text-gray-500">{t('display')}</p>
          <select 
          className="px-1 mx-4 text-sm text-gray-500 border border-gray-400 rounded outline-none h-7">
            { numberOfItemsToDisplayOnTable && numberOfItemsToDisplayOnTable.map( (numberOfItems:number)=>{
              return(
                <option key={numberOfItems} value={numberOfItems}>{numberOfItems}</option>
              )
            }

            )}
          </select>

          <ul className="flex ml-2 space-x-1">
            <li className="flex items-center justify-center bg-blue-100 rounded cursor-pointer w-7 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </li>
            {/* {pageNumber && (
                <li className="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded">
                  {pageNumber <= 0 ?  pageNumber+1 : pageNumber}
                </li>
            )} */}
            <li className="flex items-center justify-center bg-blue-100 rounded cursor-pointer w-7 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 rotate-180 fill-gray-500" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InventoryList
