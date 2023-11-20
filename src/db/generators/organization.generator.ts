import chance from 'chance';
import { progressUpdate, sleep } from './all.generator';
import Organization from '../models/organization.model';
import chalk from 'chalk';

const CHANCE = chance();

export default async function generateOrganizations(count = 100) {
  const errors = [];
  const batches = Math.floor(count / 100);
  const remainders = count % 100;

  for (let i = 0; i < batches; i++) {
    progressUpdate(`Generating Organization Batch ${i + 1}/${batches}`)
    const batch = [];
    for (let i = 0; i < 100; i++) {
      try {
        batch.push({
          name: CHANCE.company(),
          location: {
            line1: CHANCE.address({short_suffix: true}),
            line2: null,
            city: CHANCE.city(),
            state: CHANCE.state(),
            zip: CHANCE.zip()
          },
          members: []
        })
      } catch (err) {
        errors.push(JSON.stringify(err));
      }
    }
    await Organization.insertMany(batch);
    // sleep briefly to not overwhelm the DB CPU
    await sleep(250);
  }

  console.log('\n')

  for (let i = 0; i < remainders; i++) {
    progressUpdate(`Generating Organization ${i + 1}/${count}`)
    try {
      await Organization.create({
        name: CHANCE.company(),
        location: {
          line1: CHANCE.address({short_suffix: true}),
          line2: null,
          city: CHANCE.city(),
          state: CHANCE.state(),
          zip: CHANCE.zip()
        },
        members: []
      })
    } catch (err) {
      errors.push(JSON.stringify(err))
    }
  }

  console.log(chalk.green(`\nGenerated ${count} Organizations using ${batches} batches and ${remainders} individual inserts`));

  if (errors.length > 0) {
    console.log(chalk.red(`${errors.length} Errors while generating Organization documents`))
  }
}