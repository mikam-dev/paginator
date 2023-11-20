import chance from 'chance';
import { progressUpdate, sleep } from './all.generator';
import Organization from '../models/organization.model';
import User from '../models/user.model';
import chalk from 'chalk';

const CHANCE = chance();

export default async function generateUsers(count = 100) {
  const errors = [];
  const owners = await Organization.find({}).limit(100);
  const batches = Math.floor(count / 100);
  const remainders = count % 100;

  for (let i = 0; i < batches; i++) {
    progressUpdate(`Generating User Batch ${i + 1}/${batches}`)
    const batch = [];
    for (let i = 0; i < 100; i++) {
      try {
        batch.push({
          organization: owners[CHANCE.integer({ min: 0, max: owners.length - 1 })]._id,
          info: {
            given_name: CHANCE.first(),
            family_name: CHANCE.last(),
            email: CHANCE.email(),
            phone: CHANCE.phone(),
            dob: CHANCE.date()
          },
          assets: {
            avatar_url: CHANCE.url()
          }
        })
      } catch (err) {
        errors.push(JSON.stringify(err));
      }
    }
    await User.insertMany(batch);
    // sleep briefly to not overwhelm the DB CPU
    await sleep(250);
  }

  console.log('\n')

  for (let i = 0; i < remainders; i++) {
    progressUpdate(`Generating User ${i + 1}/${remainders}`)
    try {
      await User.create({
        organization: owners[CHANCE.integer({ min: 0, max: owners.length - 1 })]._id,
        info: {
          given_name: CHANCE.first(),
          family_name: CHANCE.last(),
          email: CHANCE.email(),
          phone: CHANCE.phone(),
          dob: CHANCE.date()
        },
        assets: {
          avatar_url: CHANCE.url()
        }
      })
    } catch (err) {
      errors.push(JSON.stringify(err))
    }
  }
  console.log(chalk.green(`\nGenerated ${count} Users using ${batches} batches and ${remainders} individual inserts`));
  if (errors.length > 0) {
    console.log(chalk.red(`${errors.length} Errors while generating User documents`))
  }
}
