import { NormalizeAddress } from "./Sagas/Addresses.saga";

export const NormalizeRelativeUrlField = value => {
    if (value && value[0] != '/') {
        return `/${value}`;
    }
    return value;
}

export const NormalizeCodeField = value => value && value.toUpperCase().replace(' ', '_');

export const NormalizePhoneNumbers = numberData =>
    numberData.PhoneNumbers
        .filter(number => number.PhoneNumber)
        .map((number, index) => ({
            PhoneNumber: number.PhoneNumber,
            Type: number.Type,
            Primary: index === 0
        }));

export const NormalizeEmailAddresses = emailData =>
    emailData.EmailAddresses
        .filter(email => email.EmailAddress)
        .map((email, index) => ({
            EmailAddress: email.EmailAddress,
            Primary: index === 0
        }));

export const NormalizeAddressData = addressData => ({
    Address1: addressData.Address1,
    Address2: addressData.Address2,
    City: addressData.City,
    State: addressData.State,
    PostalCode: addressData.PostalCode,
    CountryID: addressData.Country,
    TimezoneID: addressData.Timezone,
    Latitude: addressData.Latitude,
    Longitude: addressData.Longitude,
    Notes: addressData.Notes
});

export const NormalizeContactData = contactData => ({
    Title: contactData.Title,
    FirstName: contactData.FirstName,
    LastName: contactData.LastName,
    Company: contactData.Company,
    Suffix: contactData.Suffix,
    Nickname: contactData.Nickname,
    JobTitle: contactData.JobTitle,
    Address: NormalizeAddressData(contactData),
    PhoneNumbers: NormalizePhoneNumbers(contactData),
    EmailAddresses: NormalizeEmailAddresses(contactData),
    Website: contactData.Website,
    BirthDate: contactData.BirthDate
});

export const NormalizeClientForm = clientData => ({
    Code: clientData.Code,
    ContactInfo: NormalizeContactData(clientData),
    Inactive: clientData.Inactive || clientData.inactive
});

export const NormalizeUserForm = userData => ({
    Username: userData.Username,
    ContactInfo: NormalizeContactData(userData),
    Administrator: userData.Administrator,
    Superuser: userData.Superuser,
    FullClientAccess: userData.FullClientAccess,
    Locked: userData.Locked,
    Inactive: userData.Inactive
});

export const NormalizeDriverForm = driverData => ({
    OperatingLocationID: driverData.OperatingLocation,
    EndDate: driverData.EndDate,
    MaxWeight: driverData.MaxWeight,
    DriverLicenseNumber: driverData.DriverLicenseNumber,
    DriverLicenseState: driverData.DriverLicenseState,
    DriverLicenseExpiration: driverData.DriverLicenseExpiration,
    HourlyRate: driverData.HourlyRate,
    DailyRate: driverData.DailyRate,
    SprintRate: driverData.SprintRate,
    OwnVehicle: driverData.OwnVehicle,
    VehicleID: driverData.DefaultVehicle,
    Inactive: driverData.Inactive
});

export const NormalizeCustomerForm = customerData => ({
    DefaultAddonID: customerData.DefaultAddon,
    DefaultPackageTypeID: customerData.DefaultPackageType,
    ImportConversation: customerData.ImportConversation,
    LabelTemplate: customerData.LabelTemplate,
    LateDelivery: customerData.LateDelivery
});

export const NormalizePageForm = pageData => ({
    Code: pageData.Code,
    Description: pageData.Description,
    Link: pageData.Link,
    SortOrder: pageData.SortOrder,
    Inactive: pageData.Inactive
});

export const NormalizePackageTypeForm = packageTypeData => ({
    Description: packageTypeData.Description,
    Price: packageTypeData.Price,
    SortOrder: packageTypeData.SortOrder,
    InternalUseOnly: packageTypeData.InternalUseOnly,
    Inactive: packageTypeData.Inactive
});

export const NormalizeAddonForm = addonData => ({
    Code: addonData.Code,
    Description: addonData.Description,
    AdditionalCharge: addonData.AdditionalCharge,
    PerPackage: addonData.PerPackage,
    SortOrder: addonData.SortOrder,
    InternalUseOnly: addonData.InternalUseOnly,
    Inactive: addonData.Inactive
});

export const NormalizeUserTypeForm = userTypeData => ({
    Description: userTypeData.Description,
    HomePageID: userTypeData.HomePage,
    SortOrder: userTypeData.SortOrder,
    Inactive: userTypeData.Inactive
});

export const NormalizeOperatingLocationForm = locationData => ({
    Code: locationData.Code,
    ContactInfo: NormalizeContactData(locationData),
    MinutesPerMile: locationData.MinutesPerMile,
    MinutesPerStop: locationData.MinutesPerStop,
    PackageTypeID: locationData.DefaultPackageType,
    LoadListSort: locationData.LoadListSort,
    Inactive: locationData.Inactive,
    Zones: locationData.Zones
        .filter(zone => zone.ZoneNumber)
        .map(zone => ({
            ZoneNumber: zone.ZoneNumber,
            PostalCode: zone.PostalCode
        })),
    Addons: locationData.Addons
        .filter(addon => addon.AddonID)
        .map(addon => ({
            AddonID: addon
        }))
});