import React, { useContext, useState } from 'react'
import CustomSubmitButton from '../../components/CustomSubmitButton/CustomSubmitButton'
import {stores, products} from '../../data/data';
import { Inventory, Product, Store } from '../../types/DataType';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SaveInventoryFields, storeStock } from '../../types/FormTypes';
import { HandleLocalStorage } from '../../utils/HandleLocalStorage';
import { AuthContext } from '../../context/AuthContext';
import CustomAlert from '../../components/CustomAlert/CustomAlert';



const NewInventory = () => {
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SaveInventoryFields>();
    const {t} = useTranslation();
    //state to handle the saving of an inventory
    const [isSave, setIsSave] = useState<boolean>(false);
    
    //get the authenticated user state 
    const {user} = useContext(AuthContext)??{};
    /**
     * We store inventories in the localStorage with the email of the use
     * so we can have a trace of who saved the inventory
     */
    const {getItemFromLocalStorage, setItemInLocalStorage}= HandleLocalStorage(`inventory_${user?.email}`);

    const itemInLocalStorage = getItemFromLocalStorage();
    if(itemInLocalStorage)console.log('item in locs: ', itemInLocalStorage);
    // check if the date selected by the user is in a correct format and is not greater than the actual system date
    const isDateValid= (date:string)=>{
      const currentSystemDate = new Date();
      const dateSelected = new Date(date);
      //selected date > system current date
      if(dateSelected> currentSystemDate) return t('error_date_is_greater');
      if(isNaN(dateSelected.getDate())) return t('error_invalid_date');
      return true;
    }
    //validate the product selected (product.id  can be stored as number or a string)
    const isProductSelectedValid = (value: string|number)=>{
      if(value ==='' || value === null) return t('error_select_product');
      return true;
    }
    //validate the product quantity entered for a store
    const isStockQuantityValid = (value: string | number)=>{
      if((typeof value==='number'&& isNaN(value)) ||(typeof value==='number' && value < 0) || value==null ) return t('error_invalid_stock_quantity');
      return true;
    }
    const onSaveInventory: SubmitHandler<SaveInventoryFields> = async(data)=>{
          //create a delay to simulate a loading process
          await new Promise((resolve)=> setTimeout(resolve, 2000));
        const stockDataKeys = [...Object.keys(data.stocks)];
        const stockDataValues = [...Object.values(data.stocks)];
        const stockToSave: storeStock[] = stockDataKeys.map((value, index)=>{
          return {
            storeId: value,
            quantity: stockDataValues[index].quantity
          }
        })
        const newInventoryToSave : Inventory = {
          id: (Math.floor(Math.random()*(99)) +1).toString(),
          date: data.date,
          productId: data.product.toString(),
          stock: stockToSave
        } 
        //if there exist already an inventory in the localStorage with the user.email
        if(itemInLocalStorage && itemInLocalStorage.length>0){
            //we create a list to store the existing inventories and the new inventory to save
            const newInventories = [...itemInLocalStorage, newInventoryToSave];
            setItemInLocalStorage(newInventories);
            console.log("New inventories : ", newInventories);
        }else{
          //if it is the first item to save 
          setItemInLocalStorage([newInventoryToSave]);
        }
        setIsSave(true);
   }
    return (
    <div className='container px-8 py-8 overflow-auto'>
        <h2 className='mb-8 text-3xl font-bold text-center text-gray-600'>{t('new_inventory')}</h2>
        {isSave && (
          <CustomAlert alertType='success' message={t('inventory_saved_successfully')} />
        )}
        {/* form to create a new inventory  */}
        <form onSubmit={handleSubmit(onSaveInventory)} className="font-[sans-serif] max-w-4xl mx-auto mt-4">
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
            {stores && stores.map((store: Store) => (
              <div key={store.id}>
                 <div className="relative flex items-center">
                    <label className="mr-2 text-sm text-gray-400 w-36">
                      {t('select_store')}
                    </label>
                  <input  
                  type="text"
                  placeholder={store.name as string}
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

export default NewInventory;
