class ContactModel {
    constructor(title, firstName, lastName, company, suffix, nickname, jobTitle,
        address, phoneNumbers, emailAddresses, website, birthDate, image) {
        this._Title = title;
        this._FirstName = firstName;
        this._LastName = lastName;
        this._Company = company;
        this._Suffix = suffix;
        this._Nickname = nickname;
        this._JobTitle = jobTitle;
        this._Address = address;
        this._PhoneNumbers = phoneNumbers;
        this._EmailAddresses = emailAddresses;
        this._Website = website;
        this._BirthDate = birthDate;
        this._Image = image;
    }

    get Title() { return this._Title; }
    set Title(val) { this._Title = val; }

    get FirstName() { return this._FirstName; }
    set FirstName(val) { this._FirstName = val; }

    get LastName() { return this._LastName; }
    set LastName(val) { this._LastName = val; }

    get Company() { return this._Company; }
    set Company(val) { this._Company = val; }

    get Suffix() { return this._Suffix; }
    set Suffix(val) { this._Suffix = val; }

    get Nickname() { return this._Nickname; }
    set Nickname(val) { this._Nickname = val; }

    get JobTitle() { return this._JobTitle; }
    set JobTitle(val) { this._JobTitle = val; }

    get Address() { return this._Address; }
    set Address(val) { this._Address = val; }

    get PhoneNumbers() { return this._PhoneNumbers; }
    set PhoneNumbers(val) { this._PhoneNumbers = val; }

    get EmailAddresses() { return this._EmailAddresses; }
    set EmailAddresses(val) { this._EmailAddresses = val; }

    get Website() { return this._Website; }
    set Website(val) { this._Website = val; }

    get BirthDate() { return this._BirthDate; }
    set BirthDate(val) { this._BirthDate = val; }

    get Image() { return this._Image; }
    set Image(val) { this._Image = val; }

    toJSON() {
        return {
            ContactID
        } = this;
    }

    static fromJSON(obj) {
        const props = {
            'Title': this.Title,
            'FirstName': this.FirstName,
            'LastName': this.LastName,
            'Company': this.Company,
            'Suffix': this.Suffix,
            'Nickname': this.Nickname,
            'JobTitle': this.JobTitle,
            'Address': this.Address,
            'PhoneNumbers': this.PhoneNumbers,
            'EmailAddresses': this.EmailAddresses,
            'Website': this.Website,
            'BirthDate': this.BirthDate,
            'Image': this.Image
        };
        return props;
    }
}