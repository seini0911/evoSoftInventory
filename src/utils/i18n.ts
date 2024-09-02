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
        }  

    }
}
console.log(JSON.stringify(getItemFromLocalStorage))
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