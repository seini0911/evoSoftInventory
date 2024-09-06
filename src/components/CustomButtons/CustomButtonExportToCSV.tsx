import React from 'react';
import { useTranslation } from 'react-i18next';

const CustomButtonExportCSV = ({ fileName, headersArray, dataContent }:{fileName:string, headersArray:string[], dataContent: unknown[]| object| object[]}) => {

  const headers : string[]= headersArray;
  const data : unknown[] | object| object[] = dataContent; 
  
  const{t} = useTranslation();
  const downloadCSV = () => {
    alert(t('export_to_csv_alert_message'));
    // Convert the data array into a CSV string

    console.log('data to print : ', data);
    const csvString = [
      typeof data === "object" || Array.isArray(data)? [...Object.keys(data[0])] : ['id',...headers], 
      ...data.map((item: unknown[] | unknown | any[]) => {
        //if item is an object and not null and not an array of objects
        if(typeof item === "object" && item !=null && !(Array.isArray(item))){
          //we get all the keys of the object
          const keys = Object.keys(item);
          //we get all the values of the object
          const values = Object.values(item);
          //we create a new array  with values
          values.map((value:unkwnown)=>{
            if(value instanceof Date){
              //to handle dates formatted values
              return value.toISOString();
            }else if(typeof value === "object" && value !=null && !(Array.isArray(value))){
              //we get all the values of the object
              const values = Object.values(value);
              //we create a new array  with values
              const row = [...values];
              console.log("row to display", row);
              //we return the new array
              return row;
            }
          })
          const row = [...values];
          console.log("row to display", row);
          //we return the new array
          return row;
        }else if(Array.isArray(item) && item.length>0 && typeof item[0] === "object" && item[0] !=null && !(Array.isArray(item[0]))){
          //if the content is an array
          item.map((item: unknown) => {
            if(typeof item === "object" && item !=null && !(Array.isArray(item))){
              //we get all the keys of the object
              const keys = Object.keys(item);
              //we get all the values of the object
              const values = Object.values(item);
              //we create a new array  with values
              const row = [...values];
              console.log("row to display", row);
              //we return the new array
              return row;
            }else{
              return [...JSON.stringify(item)];
            }
          })
        }else{
          return JSON.stringify(item);
        }
      }) 
    ]
    .map((row: unknown) => row?.join(","))
    .join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });
    // const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });

    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'download.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return <button onClick={downloadCSV} className='px-4 py-3 mr-4 text-sm tracking-wide text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-1'>{t('export_to_csv')}</button>;
};

export default CustomButtonExportCSV;