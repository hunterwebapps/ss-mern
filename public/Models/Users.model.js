export default class UserModel {
    constructor() {
        //this.UserID = null;
        this.Username = null;
        this.PasswordHash = null;
        this.Client = null;
        this.EmailAddress = null;
        this.EmailConfirmed = null;
        this.Contact = {
            Title: null,
            FirstName: null,
            LastName: null,
            Suffix: null,
            Nickname: null,
            Company: null,
            JobTitle: null,
            Address: null,
            PhoneNumbers: null,
            EmailAddresses: null,
            Website: null,
            BirthDate: null,
            Avatar: null
        }
        this.Groups = null;
        this.Driver = {
            OperatingLocation: null,
            StartDate: null,
            EndDate: null,
            MaxWeight: null,
            DriverLicense: {
                Number: null,
                State: null,
                Expiration: null
            },
            PayRate: {
                PerSprint: null,
                PerHour: null,
                PerDay: null
            },
            Vehicle: null,
        }
        this.Customer = {
            DefaultAddon: null,
            DefaultPackageType: null,
            ImportConversion: null,
            LabelTemplate: null,
            LateDelivery: null,
            Sprints: null
        }
        this.TimeCreated = null
    }

    //static fromJSON(obj) {
    //    const model = Object.assign(new this, obj, { UserID: obj._id });
    //    delete model._id;
    //    return model;
    //}

    toJSON() {
        const { ...props } = this;
        props._id = props.UserID;
        delete props.UserID;
        return eval(JSON.stringify(props));
    }
};