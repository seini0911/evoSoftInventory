import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { HandleLocalStorage } from './HandleLocalStorage';
const { getItemFromLocalStorage } = HandleLocalStorage('lng');
const resources = {
    en:{
    translation:{
            app_name:'SOGEC - Inventory Management Software',
            app_description: 'Best Commercial Inventory Management Software',
            authentication: 'Connect to your account',
            fr_lng: 'French',
            en_lng: 'English',
            login: 'Login',  
            username: 'Username',
            password: 'Password', 
            contact: 'Contact', 
            enter_email: 'Enter your email',
            enter_password: 'Enter your password',
            forgot_password: 'Forgot your password ?',
            address: 'Address',
            email_required_error: 'Email is required',
            email_invalid_error: 'Email entered is invalid',
            password_required_error: 'Password is required',
            password_length_error: 'Password must have atleast 8 characters',
            password_invalid_error: 'Password entered is invalid/ not correct',
            error:'Error !',
            error_wrong_credentials:'Wrong credentials. Enter the correct email and password.',
            name:'Name',
            email: 'Email',
            role: 'Role',
            actions: 'Actions',
            inventory: 'Inventory',
            stores: 'Stores',
            products: 'Products',
            employees: 'Employees',
            dashboard: 'Dashboard',
            logout: 'Logout',
            information:'Information',
            employees_list: 'Employees List',
            stores_list: 'Stores List',
            new_inventory: 'New Inventory',
            select_store:'Store',
            choose_store:'Choose a store',
            select_product:'Product',
            choose_product:'Choose a product',
            inventory_date:'Inventory date',
            quantity:'Quantity',
            save_inventory:'Save Inventory',
            error_invalid_date: 'Invalid date',
            error_select_date: 'Select a date',
            error_date_is_greater:'Date selected cannot be more than today',
            error_select_product:'Please select a product',
            error_invalid_stock_quantity:'Invalid stock quantity',
            saving_loading: 'Saving...',
            inventory_saved_successfully: 'Inventory saved successfully',
            success: 'Success !',
            warning: 'Danger !',
            info: 'Info !',
            greeting: 'Hello',
        }  
    },
    fr:{
    translation:{
            app_name:'SOGEC - Application de Gestion d\'inventaire',
            app_description: 'Meilleure Solution de Gestion de Stock Commercial',
            authentication: 'Connectez-vous',
            login: 'Connexion',
            fr_lng: 'Français',
            en_lng: 'Anglais',
            username: 'Utilisateur',
            password: 'Mot de passe', 
            address: 'Addresse',
            contact: 'Contact', 
            enter_email: 'Entrer votre email',
            enter_password: 'Entrer votre mot de passe',
            forgot_password: 'Mot de passe oublier ?',
            email_required_error: 'L\'email est obligatoire',
            email_invalid_error: 'Entrer une adresse mail valide',
            password_required_error: 'Le mot de passe est obligatoire',
            password_length_error: 'Le mot de passe doit avoir au moins 8 caractères',
            password_invalid_error: 'Le mot de passe entre est invalide ou incorrect',
            error:'Erreur !',
            error_wrong_credentials: 'Identifiants incorrect. Entrez le bon email et mot de passe.',
            name:'Nom',
            email: 'Email',
            role: 'Role',
            actions: 'Actions',
            inventory: 'Inventaire',
            stores: 'Magasins',
            products: 'Produits',
            employees: 'Employés',
            dashboard: 'Tableau de bord',
            logout: 'Déconnexion',
            information:'Information',
            employees_list: 'Liste des Employes',
            stores_list: 'Liste des Magasins',
            new_inventory: 'Nouveau Inventaire',
            select_store:'Magasin',
            choose_store:'Choisir un magasin',
            select_product:'Produit',
            choose_product:'Choisir un produit',
            inventory_date:'Date d\'inventaire',
            quantity:'Quantité',
            save_inventory:'Enregistrer l\'inventaire',
            error_invalid_date: 'Date invalide',
            error_date_is_greater:'La Date selectionnée ne doit pas être plus grande que aujourd\'hui',
            error_select_product:'Veuillez choisir un produit',
            error_select_date: 'Choisir une date',
            error_invalid_stock_quantity: 'Quantité de stock invalide',
            saving_loading: 'Enregistrement en cours ...',
            inventory_saved_successfully: 'Inventaire enregistrer avec succès',
            success: 'Succès !',
            warning: 'Danger !',
            info: 'Info !',
            greeting: 'Bonjour',
        }  

    }
}
i18n
.use(initReactI18next)
.init({
    resources,
    fallbackLng: 'en', //default language to be used in case the language selected isn't available
    lng: JSON.stringify(getItemFromLocalStorage), //language to be used currently
    interpolation:{
        escapeValue: false,
    },
});


export default i18n;