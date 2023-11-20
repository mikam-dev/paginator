import dotEnvExtended from 'dotenv-extended';
import envConfig from '../../env.json';
import chalk from 'chalk';

export default function loadEnv(){
  try {
    dotEnvExtended.load();
    const warnings = [];
    const errors = [];
    for (const env of Object.entries(envConfig)) {
      if (env[1].required && (!process.env[env[0]] || typeof process.env[env[0]] !== env[1].type)) {
        errors.push(`Env Variable ${env[0]} | ${env[1].description} is required, but has not been defined or is the wrong type.`)
      } else if (!process.env[env[0]]) {
        warnings.push(`Env Variable ${env[0]} | ${env[1].description} has been listed in the env.json config file, but has not been defined`)
      }
    }
    if (warnings.length > 0) {
      for (const warning of warnings) {
        console.log(chalk.yellow(warning));
      }
    }
    if (errors.length > 0) {
      for (const error of errors) {
        console.log(chalk.red(error));
      }
      throw Error('Cannot start server due to missing required Env Variables');
    }
  } catch (e) {
    console.error(`Environment check failed with ${JSON.stringify(e)}`);
    throw e;
  }
}