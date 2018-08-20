import axios from 'axios';

const host = 'http://localhost:3000/api';

const API = {
    User: {
        Initialize: async () =>
            await axios.get(`${host}/Users/Me`)
                .catch(err => getError(err)),
        Get: async (userId = '') =>
            await axios.get(`${host}/Users/${userId}`)
                .catch(err => getError(err)),
        Login: async loginInfo =>
            await axios.post(`${host}/Users/Login`, loginInfo)
                .catch(err => getError(err)),
        Register: async registerInfo =>
            await axios.post(host + '/Users/Register', registerInfo)
                .catch(err => getError(err)),
        Logout: async () => await axios.get(`${host}/Users/Logout`)
            .catch(err => getError(err)),
        Forgot: async (forgotInfo) => {
            const { username, email } = forgotInfo;
            const res = await axios.post(`${host}/Account/Forgot`, {
                Username: username,
                Email: email
            });
            return res.data;
        },
        Create: async createInfo =>
            await axios.post(`${host}/Users`, createInfo)
                .catch(err => getError(err)),
        Update: async updateInfo =>
            await axios.put(`${host}/Users`, updateInfo)
                .catch(err => getError(err)),
        Account: {
            Get: async (accountId = '') =>
                axios.get(`${host}/Accounts/${accountId}`)
                    .catch(err => getError(err)),
            Create: async accountInfo =>
                axios.post(`${host}/Accounts`, accountInfo)
                    .catch(err => getError(err))
        }
    },
    Sprint: {
        Import: async formData =>
            await axios.post(`${host}/Sprints/Import`, formData)
                .catch(err => getError(err)),
        Addon: {
            Get: async (addonId = '') =>
                await axios.get(`${host}/Addons/${addonId}`)
                    .catch(err => getError(err)),
            Create: async addonInfo =>
                await axios.post(`${host}/Addons`, addonInfo)
                    .catch(err => getError(err))
        },
        ServiceLevel: {
            Get: async (serviceLevelId = '') =>
                await axios.get(`${host}/ServiceLevels/${serviceLevelId}`)
                    .catch(err => getError(err)),
            Create: async serviceLevelInfo =>
                await axios.post(`${host}/ServiceLevels`, serviceLevelInfo)
                    .catch(err => getError(err))
        }
    },
    OperatingLocation: {
        Get: async (locationId = '') =>
            await axios.get(`${host}/OperatingLocations/${locationId}`)
                .catch(err => getError(err)),
        Create: async operatingLocationInfo =>
            await axios.post(`${host}/OperatingLocations`, operatingLocationInfo)
                .catch(err => getError(err))
    },
    Package: {
        Type: {
            Get: async (typeId = '') =>
                await axios.get(`${host}/PackageTypes/${typeId}`)
                    .catch(err => getError(err)),
            Create: async packageTypeInfo =>
                await axios.post(`${host}/PackageTypes`, packageTypeInfo)
                    .catch(err => getError(err))
        },
        TrackingLogType: {
            Get: async (typeId = '') =>
                await axios.get(`${host}/TrackingLogs/Types/${typeId}`)
                    .catch(err => getError(err)),
            Create: async trackingLogTypeInfo =>
                await axios.post(`${host}/TrackingLogs/Types`, trackingLogTypeInfo)
                    .catch(err => getError(err))
        }
    },
    Address: {
        Get: async (addressId = '') =>
            await axios.get(`${host}/Addresses/${addressId}`)
                .catch(err => getError(err)),
        GetCountries: async () =>
            await axios.get(`${host}/Addresses/Countries`)
                .catch(err => getError(err)),
        GetTimezones: async () =>
            await axios.get(`${host}/Addresses/Timezones`)
                .catch(err => getError(err)),
        UserAddress: {
            Get: async (addressId = '') =>
                await axios.get(`${host}/Addresses/UserAddresses/${addressId}`)
                    .catch(err => getError(err)),
            Create: async userAddressInfo =>
                await axios.post(`${host}/Addresses/UserAddresses`, userAddressInfo)
                    .catch(err => getError(err))
        }
    },
    Client: {
        Get: async (clientId = '') =>
            await axios.get(`${host}/Clients/${clientId}`)
                .catch(err => getError(err)),
        Create: async normalizedClientData =>
            await axios.post(`${host}/Clients`, normalizedClientData)
                .catch(err => getError(err))
    },
    Page: {
        Get: async (pageId = '') =>
            await axios.get(`${host}/Pages/${pageId}`)
                .catch(err => getError(err)),
        Create: async pageInfo =>
            await axios.post(`${host}/Pages`, pageInfo)
                .catch(err => getError(err)),
        Update: async pageInfo =>
            await axios.put(`${host}/Pages`, pageInfo)
                .catch(err => getError(err)),
        Delete: async pageId =>
            await axios.delete(`${host}/Pages/${pageId}`)
                .catch(err => getError(err))
    }
}

const getError = err => {
    const { response } = err;
    console.log('API getError', response, err);
    const data = {
        status: response && response.status
    };

    if (response.data.ExceptionMessage) {
        data.exception = response.data.ExceptionMessage;
    }
    if (response.data.ModelState) {
        data.modelState = [
            ...response.data.ModelState['']
        ];
    }
    if (response.data.Message) {
        data.message = response.data.Message;
    }
    data.response = response;

    return data;
}

export default API;