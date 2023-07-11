import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { HouseSchema } from '../models/House.js';
import { JobSchema } from '../models/Job.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Houses = mongoose.model('House', HouseSchema);
  Jobs = mongoose.model('Job', JobSchema)
}

export const dbContext = new DbContext()
