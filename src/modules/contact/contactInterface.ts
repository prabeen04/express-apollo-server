export interface IContact {
    contactId: String
    contactType: String
    contactSubtype: String
    salutation: String
    designation: String
    description: String
    department: String
    language: String
    contactOwner: String
    creatorId: String
    creationDate: String
    userId: String
    organizationId: String
    account: IAccount
    firstName: String
    middleName: String
    lastName: String
    gender: String
    phoneNo: String
    alternateNo: String
    mobileNo: String
    emailId: String
    secondaryEmailId: String
    linkedinPublicUrl: String
    skypeId: String
    fax: String
    imageId: String
}


export interface IAccount {
    accountId: String
    accountName: String
    accountOwner: String
    website: String
    tickerSymbol: String
    tradeCurrency: String
    companySize: String
    industryType: String
    baseCountry: String
    phone1: String
    phone2: String
    fax: String
    email: String
    rating: String
    sicCode: String
    annualRevenue: String
    description: String
    creator: String
    creationDate: String
    userId: String
    organizationId: String
    imageId: String
    imageURL: String
}