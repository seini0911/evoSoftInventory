/** Handles setting and getting of items from the localStorage */
export const HandleLocalStorage = (key: string) => {
    /** Function that sets an item in the localStorage */
    const setItemInLocalStorage = (value: unknown) =>{
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log("Error in setItemInLocalStorage : ",error);
        }
    }
    /** Function that gets an Item from the localStorage or returns undefined if the item doesnt exist */
    const getItemFromLocalStorage = () => {
        try {
            const item  = window.localStorage.getItem(key);
            return item ? JSON.parse(item): undefined;
        } catch (error) {
            console.log("Error in getItemFromLocalStorage : ",error);
        }
    }

    /**Function that removes an item from the localStorage */
    const removeItemFromLocalStorage = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log("Error in removeItemFromLocalStorage : ",error);
        }
    }
    return {setItemInLocalStorage, getItemFromLocalStorage, removeItemFromLocalStorage};
}
