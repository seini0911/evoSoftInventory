import React from 'react'
import CustomSubmitButton from '../../components/CustomSubmitButton/CustomSubmitButton'
import {stores, products} from '../../data/data';
import { Product, Store } from '../../types/DataType';
import { useTranslation } from 'react-i18next';

const NewInventory = () => {
    const date = new Date();
    const {t} = useTranslation();
    console.log(date); 
    return (
    <div className='container px-8 py-8 overflow-auto'>
        <h2 className='font-bold text-3xl text-gray-600 mb-8 text-center'>{t('new_inventory')}</h2>
        <form className="font-[sans-serif] max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6">
            {/* inventory date selection  */}
              <div className="relative flex items-center">
                <label className="text-gray-400 w-36 text-sm mr-2">{t('inventory_date')} </label>
                  <input type="date" 
                    className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" />
              </div>
            {/* product selection  */}
              <div className="relative flex items-center">
              <label className="text-gray-400 w-36 text-sm mr-2">{t('select_product')}</label>
              <select className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" name="store" id="store">
                  <option value="">{t('choose_product')}</option>
                  {products && products.map((product: Product) => (
                    <option value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
            {/* display stores with quantity to add */}
            {stores && stores.map((store: Store) => (
              <>
                 <div className="relative flex items-center">
                 <label className="text-gray-400 w-36 text-sm mr-2">{t('select_store')}</label>
                 <input type="text" 
                 placeholder={store.name}
                    className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" disabled/>
                 </div>
                 <div className="relative flex items-center">
                 <label className="text-gray-400 w-36 text-sm mr-2">{t('quantity')}</label>
                   <input key={store.id}  type="number" placeholder={t('quantity')}
                     className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all" />
                 </div> 
                </>
            ))}
            
        </div>
        <CustomSubmitButton buttonText={t('save_inventory')} isActive={false}/>
      </form>
    </div>
  )
}

export default NewInventory
