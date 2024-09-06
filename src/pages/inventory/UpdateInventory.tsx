import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CustomSubmitButton from '../../components/CustomSubmitButton/CustomSubmitButton';
import { SaveInventoryFields, storeStock } from '../../types/FormTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { isDateValid, isProductSelectedValid, isStockQuantityValid } from '../../utils/InventoryFormValidators';
import { Inventory, Product} from '../../types/DataType';
import { HandleLocalStorage } from '../../utils/HandleLocalStorage';
import {stores, products} from '../../data/data';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
const UpdateInventory = () => {
  const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<SaveInventoryFields>({
    defaultValues: {
      date: '',
      product: 0,
      stocks: [{
        storeId: 0,
        quantity: 0
      }]
    }
  });
  const inventoryIdToUpdate = useParams();
  const {t} = useTranslation();
  //get the authenticated user state 
  const {user} = useContext(AuthContext)??{};
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const {getItemFromLocalStorage, setItemInLocalStorage}= HandleLocalStorage(`inventory_${user?.email}`);
  //get the inventory to update
  const inventoriesInLocalStorage: Inventory[] = getItemFromLocalStorage();
  console.log("inventories in local storage before update : ", inventoriesInLocalStorage);
  const inventoryToUpdate =  inventoriesInLocalStorage.filter((inventory)=> inventory.id == inventoryIdToUpdate['id']);
  const stockToUpdate: storeStock[] = inventoryToUpdate[0].stock.map((stock)=> {
    return{storeId: stock.storeId, quantity: stock.quantity}});

  useEffect(() => {
    //we set the form values with the inventory to update info
    const inventoryIwantToEdit : SaveInventoryFields = {
      date: inventoryToUpdate[0].date,
      product: parseInt(inventoryToUpdate[0].productId),
      stocks: stockToUpdate
    }
    // console.log("Inventory I want to edit is :", inventoryIwantToEdit);
    reset(inventoryIwantToEdit);
  }, [reset,inventoryIdToUpdate['id']]);

  const onUpdateInventory :SubmitHandler<SaveInventoryFields> = async(data)=> {
    await new Promise((resolve)=> setTimeout(resolve, 3500));
    //we update the inventory in the inventories array
    inventoriesInLocalStorage.map((inventory: Inventory)=> {
      if(inventory.id == inventoryIdToUpdate['id']){
        inventory.date = data.date;
        inventory.productId = typeof data.product== 'string' ? data.product: data.product.toString();
        inventory.stock = data.stocks;
      }
    });
    setItemInLocalStorage(inventoriesInLocalStorage);
    setIsUpdated(true);
  } 
 
  return (
    <div className='container px-8 py-8 overflow-auto'>
      {/* update inventory
       */}
       <h2 className='mb-8 text-3xl font-bold text-center text-gray-600'>{t('update_inventory')}</h2>
       {isUpdated&& (
          <CustomAlert alertType='success' message={t('inventory_updated_successfully')} />
        )}
       {/* form to update an inventory  */}
      <form onSubmit={handleSubmit(onUpdateInventory)} className="font-[sans-serif] max-w-4xl mx-auto mt-4">
        <div className="grid gap-6 sm:grid-cols-2">
            {/* inventory date selection  */}
              <div className="relative flex items-center">
                <label className="mr-2 text-sm text-gray-400 w-36">{t('inventory_date')} </label>
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
                        className='text-sm text-red-500'>{errors.date.message}
                        </div>
                      )}
                  </div>
              </div>
              {/* product selection  */}
              <div className="relative flex items-center">
                <label className="mr-2 text-sm text-gray-400 w-36">
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
                      className='text-sm text-red-500'>{errors.product.message}
                      </div>
                  )}
                </div>
              </div>
            {/* display stores with quantity to add */}
            {stockToUpdate && stockToUpdate.map((stock: storeStock, index: number) => (
              <div key={index}>
                 <div className="relative flex items-center">
                    <label className="mr-2 text-sm text-gray-400 w-36">
                      {t('select_store')}
                    </label>
                  <input  
                  type="text"
                  placeholder={stores.filter((store)=> store.id === stock.storeId)[0].name}
                      className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" disabled/>
                </div>
                <br /> 
                <div className="relative flex items-center">
                  <label className="mr-2 text-sm text-gray-400 w-36">
                    {t('quantity')}
                  </label>
                    {/* store stock/quantity */}
                    <div className='flex flex-col w-full'>
                        <input 
                      {...register(`stocks.${index}.quantity`,{
                        validate:(value: string| number)=> isStockQuantityValid(value)
                      })}
                      key={typeof stock.storeId == 'string'? parseInt(stock.storeId)+1: stock.storeId+1}  
                      type="number"
                      min={0}
                      placeholder={t('quantity')}
                        className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" />
                        <br/>
                        {errors.stocks &&(
                            <div 
                            className='text-sm text-red-500'>{errors.stocks.message}
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
