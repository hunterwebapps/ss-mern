import axios from 'axios';

const host = 'http://localhost:3000/api';

const API = {
    User: {
        Initialize: async () => {
            const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
            if (token !== null && username !== null) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return await axios.get(`${host}/Users/Me`);
            }
        },
        Get: async (userId = '') =>
            await axios.get(`${host}/Users/${userId}`)
                .catch(err => getError(err)),
        Login: async loginInfo => {
            var params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('username', loginInfo.Username);
            params.append('password', loginInfo.Password);

            const res = await axios.post('/Token', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).catch(err => getError(err));

            const token = res.data.access_token;
            const username = res.data.userName;
            console.log('Login', `Token ${token}`, `Username ${username}`);
            if (token) {
                const storage = loginInfo.RememberMe ? localStorage : sessionStorage;
                storage.setItem('auth-token', token);
                storage.setItem('username', username);
                console.log('Login Storage', storage);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

                console.log('Axios Common Headers', axios.defaults.headers.common);
                return await axios.get(`${host}/Users/${username}`).catch(err => getError(err));
            }
        },
        Register: async registerInfo =>
            await axios.post(host + '/Users/Register', registerInfo)
                .catch(err => getError(err)),
        Logout: () => {
            localStorage.removeItem('auth-token');
            sessionStorage.removeItem('auth-token');
            axios.defaults.headers.common['Authorization'] = '';
            axios.get(`${host}/Account/Logout`)
        },
        Forgot: async (forgotInfo) => {
            const { username, email } = forgotInfo;
            const res = await axios.post(`${host}/Account/Forgot`, {
                Username: username,
                Email: email
            });
            return res.data;
        },
        Create: async createInfo =>
            await axios.post(`${host}/Users/Create`, createInfo)
                .catch(err => getError(err)),
        GetContactInfo: async (contactId = '') =>
            await axios.get(`${host}/Users/ContactInfo/${contactId}`)
                .catch(err => getError(err))
    },
    OperatingLocation: {
        Get: async (locationId = '') =>
            await axios.get(`${host}/OperatingLocations/${locationId}`)
                .catch(err => getError(err)),
        Create: async operatingLocationInfo =>
            await axios.post(`${host}/OperatingLocations`, operatingLocationInfo)
                .catch(err => getError(err))
    },
    PackageType: {
        Get: async (typeId = '') =>
            await axios.get(`${host}/Packages/Types/${typeId}`)
                .catch(err => getError(err)),
        Create: async packageTypeInfo =>
            await axios.post(`${host}/Packages/Types`, packageTypeInfo)
                .catch(err => getError(err))
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
                .catch(err => getError(err))
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
    },
    Addon: {
        Create: async addonInfo =>
            await axios.post(`${host}/Sprints/CreateAddon`, addonInfo)
                .catch(err => getError(err))
    }
}

const getError = err => {
    const { response } = err;
    console.log('API getError', response);
    const data = {
        status: response.status
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