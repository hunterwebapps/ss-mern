import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import MasterReducer from './Modules/Master/Master.reducer';
import UsersReducer from './Modules/Users/Users.reducer';
import SprintsReducer from './Modules/Sprints/Sprints.reducer';
import OperatingLocationReducer from './Modules/OperatingLocations/OperatingLocations.reducers';
import PackagesReducer from './Modules/Packages/Packages.reducer';
import AddressesReducer from './Modules/Addresses/Addresses.reducer';
import ClientsReducer from './Modules/Clients/Clients.reducer';
import PagesReducer from './Modules/Pages/Pages.reducer';

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
        return {
            ...location,
            PackageType: state.packages.types.find(type => type._id === location.PackageType)[0]
        }
    });

export const getUserAccounts = state => {
    if (!state.users.current ||
        !state.users.current.Customer ||
        !state.users.current.Customer.Accounts ||
        !state.users.accounts.length) return [];
    const userAccounts = state.users.current.Customer.Accounts.map(userAcctId =>
        state.users.accounts.find(acct => acct._id === userAcctId)
    );
    return userAccounts;
}

export const getUserAddresses = state => {
    if (!state.users.current ||
        !state.users.current.Customer ||
        !state.users.current.Customer.UserAddresses ||
        !state.addresses.all.length) return [];
    const userAddresses = state.users.current.Customer.UserAddresses.map(userAddrId =>
        state.addresses.all.find(addr => addr._id === userAddrId)
    );
    return userAddresses;
}

export const getUsersWithAddress = state =>
    state.users.all.map(user => {
        if (user.Contact && user.Contact.Address) {
            user.Contact.Address =
                state.addresses.all.find(addr =>
                    addr._id === user.Contact.Address
                );
        }

        return user;
    });

export const getPagesWithCreator = state =>
    state.pages.all.map(page => ({
        ...page,
        Creator: state.users.all.find(user => user._id === page.Creator)
    }));

//export const getUserTypes = state =>
//    state.users.types.map(type => ({
//        ...type,
//        HomePage: state.pages.all.find(page => page._id === type.HomePageID)
//    }));

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