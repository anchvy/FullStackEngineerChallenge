import DataLoader from 'dataloader'
import { readWithDataloader } from './employee/models'

export default {
  readEmployees: new DataLoader(ids => readWithDataloader(ids)),
}
