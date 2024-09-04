// import { useTranslation } from "react-i18next";

// check if the date selected by the user is in a correct format and is not greater than the actual system date

export const isDateValid= (date:string)=>{
    const currentSystemDate = new Date();
    const dateSelected = new Date(date);
    //selected date > system current date
    if(dateSelected> currentSystemDate) return 'error_date_is_greater';
    if(isNaN(dateSelected.getDate())) return 'error_invalid_date';
    return true;
  }
  //validate the product selected (product.id  can be stored as number or a string)
 export const isProductSelectedValid = (value: string|number)=>{
    if(value ==='' || value === null) return 'error_select_product';
    return true;
  }
  //validate the product quantity entered for a store
 export const isStockQuantityValid = (value: string | number)=>{
    if((typeof value==='number'&& isNaN(value)) ||(typeof value==='number' && value < 0) || value==null ) return 'error_invalid_stock_quantity';
    return true;
  }