import chance from 'chance';
import { progressUpdate, sleep } from './all.generator';
import Case from '../models/case.model';
import Organization from '../models/organization.model';
import chalk from 'chalk';

const CHANCE = chance();

export default async function generateCases(count = 100) {
  const errors = [];
  const owners = await Organization.find({}).limit(100);
  const batches = Math.floor(count / 100);
  const remainders = count % 100;

  for (let i = 0; i < batches; i++) {
    progressUpdate(`Generating Case Batch ${i + 1}/${batches}`)
    const batch = [];
    for (let i = 0; i < 100; i++) {
      try {
        batch.push({
          owner: owners[CHANCE.integer({ min: 0, max: owners.length - 1 })]._id,
          client: {
            given_name: CHANCE.first(),
            family_name: CHANCE.last(),
            email: CHANCE.email(),
            phone: CHANCE.phone(),
            address: {
              line1: CHANCE.address({short_suffix: true}),
              line2: null,
              city: CHANCE.city(),
              state: CHANCE.state(),
              zip: CHANCE.zip()
            }
          },
          incident: {
            date: CHANCE.date(),
            address: {
              line1: CHANCE.address({short_suffix: true}),
              line2: null,
              city: CHANCE.city(),
              state: CHANCE.state(),
              zip: CHANCE.zip()
            },
            details: CHANCE.paragraph()
          },
          recovery: {
            expected: CHANCE.integer({ min: 10000, max: 500000 }),
            actual: CHANCE.integer({ min: 10000, max: 500000 }),
            received: CHANCE.date()
          }
        })
      } catch (err) {
        errors.push(JSON.stringify(err));
      }
    }
    await Case.insertMany(batch);
    // sleep briefly to not overwhelm the DB CPU
    await sleep(250);
  }

  console.log('\n')

  for (let i = 0; i < remainders; i++) {
    progressUpdate(`Generating Case ${i + 1}/${remainders}`)
    try {
      await Case.create({
        owner: owners[CHANCE.integer({ min: 0, max: owners.length - 1 })]._id,
        client: {
          given_name: CHANCE.first(),
          family_name: CHANCE.last(),
          email: CHANCE.email(),
          phone: CHANCE.phone(),
          address: {
            line1: CHANCE.address({short_suffix: true}),
            line2: null,
            city: CHANCE.city(),
            state: CHANCE.state(),
            zip: CHANCE.zip()
          }
        },
        incident: {
          date: CHANCE.date(),
          address: {
            line1: CHANCE.address({short_suffix: true}),
            line2: null,
            city: CHANCE.city(),
            state: CHANCE.state(),
            zip: CHANCE.zip()
          },
          details: CHANCE.paragraph()
        },
        recovery: {
          expected: CHANCE.integer({ min: 10000, max: 500000 }),
          actual: CHANCE.integer({ min: 10000, max: 500000 }),
          received: CHANCE.date()
        }
      })
    } catch (err) {
      errors.push(JSON.stringify(err));
    }
  }

  console.log(chalk.green(`\nGenerated ${count} Cases using ${batches} batches and ${remainders} individual inserts`));

  if (errors.length > 0) {
    console.log(chalk.red(`${errors.length} Errors while generating Case documents`))
  }
}
