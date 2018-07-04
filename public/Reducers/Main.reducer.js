import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import MasterReducer from './Master.reducer';
import UsersReducer from './Users.reducer';
import SprintsReducer from './Sprints.reducer';
import OperatingLocationReducer from './OperatingLocation.reducers';
import PackagesReducer from './Packages.reducer';
import AddressesReducer from './Addresses.reducer';
import ClientsReducer from './Clients.reducer';
import PagesReducer from './Pages.reducer';

export default combineReducers({
    form: FormReducer,
    master: MasterReducer,
    sprints: SprintsReducer,
    users: UsersReducer,
    operatingLocations: OperatingLocationReducer,
    packages: PackagesReducer,
    addresses: AddressesReducer,
    clients: ClientsReducer,
    pages: PagesReducer
});

export const getOperatingLocations = state =>
    state.operatingLocations.all.map(location => {
        const contactInfo = state.users.contacts.filter(contact => contact.ContactID === location.ContactID)[0];
        return {
            ...location,
            ContactInfo: {
                ...contactInfo,
                Address: state.addresses.all.filter(address => address.AddressID === contactInfo.AddressID)[0]
            },
            DefaultPackageType: state.packages.types.filter(type => type.PackageTypeID === location.PackageTypeID)[0]
        }
    });

export const getPackageTypes = state =>
    state.packages.types.map(type => ({
        ...type,
        Client: state.clients.all.filter(client => client.ClientID === type.ClientID)[0]
    }));

export const getClients = state =>
    state.clients.all.map(client => ({
        ...client,
        ContactInfo: state.users.contacts.filter(contact => contact.ContactID === client.ContactID)[0]
    }));

export const getPagesWithCreator = state =>
    state.pages.all.map(page => ({
        ...page,
        Creator: state.users.all.filter(user => user.UserID === page.CreatorID)[0]
    }));

export const getAddons = state =>
    state.sprints.addons.map(addon => ({
        ...addon,
        Client: state.clients.all.filter(client => client.ClientID === addon.ClientID)[0]
    }));

export const getUserTypes = state =>
    state.users.types.map(type => ({
        ...type,
        Client: state.clients.all.filter(client => client.ClientID === type.ClientID)[0],
        HomePage: state.pages.all.filter(page => page.PageID === type.HomePageID)[0]
    }));

//export const getUsernames = state => state.users.all.map(user => user.Username);

//export const getUserEmails = state => {
//    const emails = [];
//    state.users.all.forEach(user => {
//        emails.concat(
//            user.ContactInfo.EmailAddresses.map(email => email.EmailAddress)
//        );
//    });
//    return emails;
//};