import { IAccount } from "../account/accountInterface";
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

