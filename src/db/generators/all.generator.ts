import chalk from 'chalk';
import prompts from 'prompts';
import User from '../models/user.model';
import Case from '../models/case.model';
import Organization from '../models/organization.model';
import generateUsers from './user.generator';
import generateCases from './case.generator';
import generateOrganizations from './organization.generator';
import dbConnect from '../db-connect';
import loadEnv from '../../globals/loadenv';

async function generateAllModels(): Promise<void> {
  loadEnv();
  console.log(chalk.green(`Starting the DB model generation process`));
  await dbConnect();
  const { wipe } = await prompts({
    type: 'confirm',
    name: 'wipe',
    message: chalk.yellow(`Do you want to wipe the DB before the generation?`),
    initial: true,
  });
  if (wipe) {
    const wipeLoader = showLoader('Wiping DB');
    await User.deleteMany();
    await Case.deleteMany();
    await Organization.deleteMany();
    clearLoader(wipeLoader);
    console.log(chalk.green(`All DB documents cleared`));
  }
  const { userCount } = await prompts({
    type: 'number',
    name: 'userCount',
    message: chalk.white(`How many users should be generated?`),
    initial: 100,
    min: 1,
    max: 300000,
  });
  const { caseCount } = await prompts({
    type: 'number',
    name: 'caseCount',
    message: chalk.white(`How many cases should be generated?`),
    initial: 100,
    min: 1,
    max: 300000,
  });
  const { organizationCount } = await prompts({
    type: 'number',
    name: 'organizationCount',
    message: chalk.white(`How many organizations should be generated?`),
    initial: 100,
    min: 1,
    max: 300000,
  });

  await generateOrganizations(organizationCount);
  await generateUsers(userCount);
  await generateCases(caseCount);

}

export function showLoader(prompt: string) {
  const P = ['\\', '|', '/', '-'];
  let x = 0;
  return setInterval(function () {
    process.stdout.write('\r' + P[x++] + prompt);
    x &= 3;
  }, 250);
}

export function clearLoader(id: NodeJS.Timer) {
  clearInterval(id);
  process.stdout.write('\r');
}

export function progressUpdate(message: string) {
  process.stdout.write('\r' + message);
}

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

if (require.main === module) {
  generateAllModels().then(() => process.exit());
}
