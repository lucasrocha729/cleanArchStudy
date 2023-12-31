import { AccountModel } from './../../domain/models/account'
import { AddAccountModel } from './../../domain/usecases/add-account'

export interface AddAccountReporitory {
  add: (value: AddAccountModel) => Promise<AccountModel>
}
