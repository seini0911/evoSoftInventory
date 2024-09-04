import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import CustomSubmitButton from '../../components/CustomSubmitButton/CustomSubmitButton';
import { SaveInventoryFields } from '../../types/FormTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { isDateValid, isProductSelectedValid, isStockQuantityValid } from '../../utils/InventoryFormValidators';
import { Inventory, Product, Store } from '../../types/DataType';
import { HandleLocalStorage } from '../../utils/HandleLocalStorage';
import {stores, products} from '../../data/data';
const UpdateInventory = () => {
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SaveInventoryFields>();
  const inventoryIdToUpdate = useParams();
  const {t} = useTranslation();
  //get the authenticated user state 
  const {user} = useContext(AuthContext)??{};
  const {getItemFromLocalStorage, setItemInLocalStorage}= HandleLocalStorage(`inventory_${user?.email}`);
  console.log('inventory id to update is :', inventoryIdToUpdate);

  //get the inventory to update
  const inventoriesInLocalStorage: Inventory[] = getItemFromLocalStorage();
  const inventoryToUpdate =  inventoriesInLocalStorage.filter((inventory)=> inventory.id.toString() === inventoryIdToUpdate.toString());
  console.log("inventory to update is :", inventoryToUpdate)
  const onUpdateInventory :SubmitHandler<SaveInventoryFields> = async(data)=> {
    console.log('updating an inventory with the following data :', data);
  } 
  return (
    <div className='container px-8 py-8 overflow-auto'>
      {/* update inventory
       */}
       <h2 className='font-bold text-3xl text-gray-600 mb-8 text-center'>{t('update_inventory')}</h2>
       {/* form to update an inventory  */}
       <form onSubmit={handleSubmit(onUpdateInventory)} className="font-[sans-serif] max-w-4xl mx-auto mt-4">
        <div className="grid sm:grid-cols-2 gap-6">
            {/* inventory date selection  */}
              <div className="relative flex items-center">
                <label className="text-gray-400 w-36 text-sm mr-2">{t('inventory_date')} </label>
                  <div className='flex flex-col w-full'>
                      <input
                      {...register("date",{
                        required: t('error_select_date'),
                        validate: (value: string)=> isDateValid(value)
                      })}
                      type="date" 
                      className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" />
                      {errors.date &&(
                        <div 
                        className='text-red-500 text-sm'>{errors.date.message}
                        </div>
                      )}
                  </div>
              </div>
              {/* product selection  */}
              <div className="relative flex items-center">
                <label className="text-gray-400 w-36 text-sm mr-2">
                    {t('select_product')}
                </label>
                <div className='flex flex-col w-full '>
                  <select 
                    {...register("product", {
                      required: t('error_select_product'),
                      validate: (value: string | number)=>isProductSelectedValid(value)
                    })}
                    className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                    >
                    <option value="">{t('choose_product')}</option>
                    {products && products.map((product: Product) => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                  {errors.product &&(
                      <div 
                      className='text-red-500 text-sm'>{errors.product.message}
                      </div>
                  )}
                </div>
              </div>
            {/* display stores with quantity to add */}
            {stores && stores.map((store: Store) => (
              <div key={store.id}>
                 <div className="relative flex items-center">
                    <label className="text-gray-400 w-36 text-sm mr-2">
                      {t('select_store')}
                    </label>
                  <input  
                  type="text"
                  placeholder={store.name as string}
                      className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" disabled/>
                </div>
                <div className="relative flex items-center">
                  <label className="text-gray-400 w-36 text-sm mr-2">
                    {t('quantity')}
                  </label>
                    {/* store stock/quantity */}
                    <div className='flex flex-col w-full'>
                        <input 
                      {...register(`stocks.${store.id as unknown as number}.quantity`,{
                        validate:(value: string| number)=> isStockQuantityValid(value)
                      })}
                      key={store.id}  
                      type="number"
                      min={0}
                      placeholder={t('quantity')}
                        className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" />
                        <br/>
                        {errors.stocks &&(
                            <div 
                            className='text-red-500 text-sm'>{errors.stocks.message}
                            </div>
                        )}
                    </div>
                 </div> 
              </div>
            ))}
        </div>
        <CustomSubmitButton buttonText={ isSubmitting ? t('saving_loading'): t('save_inventory')} isActive={isSubmitting}/>
      </form>
    </div>
  )
}

export default UpdateInventory;
