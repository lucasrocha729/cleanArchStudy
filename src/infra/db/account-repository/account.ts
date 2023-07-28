import { AccountModel } from '../../../domain/models/account'
import { AddAccountReporitory } from '../../../data/protocols/add-account-reporitory'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { MongoHelper } from '../../db/mongodb/helpers/mongo-helpers'

export class AccountMongoRepository implements AddAccountReporitory {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    return result as unknown as AccountModel
  }
}
