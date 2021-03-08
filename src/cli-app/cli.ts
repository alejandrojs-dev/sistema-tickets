import Vorpal from 'vorpal'
import path from 'path'
import find from 'find'
import fs from 'fs'
import nodeEval from 'node-eval'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { Command } from 'commander'
import ts, { TranspileOutput } from 'typescript'

const vorpal = new Vorpal()
const program = new Command()
const log = console.log

//vorpal.delimiter('myapp$').show()

program
  .version('0.0.1')
  .description('Execute seeders')
  .name('populater')
  .usage('<commands> [options] <seederName | seederNames>')
// .requiredOption('-o, --one <name>', 'Execute a single seeder')
// .requiredOption('-m, --multiple <names...>', 'Execute multiple seeders')

program
  .command('populater:seed')
  .description('Execute seeders')
  .option('-a, --all', 'Execute all seeders')
  .action(options => {
    console.log('Hola mundo')
    process.exit(1)
  })

program.on('command:*', operands => {
  console.log(operands)
})

program.parse(process.argv)

// program
//   .requiredOption('-o', '--one <name>', 'Execute a single seeder')
//   .requiredOption('-m','--multiple <names...>', 'Execute multiple seeders')
//   .parse(process.argv)
//   .action(function (args, callback) {
//     this.log(args.length)
//     if (!args.length) {
//       this.log('No hay seeders')
//       inquirer
//         .prompt([
//           {
//             name: 'faveReptile',
//             message: 'What is your favorite reptile?',
//           },
//         ])
//         .then(answers => {
//           log(answers)
//         })
//     } else {
//       const root = path.join(process.cwd() + '/src/database/seeders')
//       if (!fs.existsSync(root)) {
//         this.log(chalk.redBright('La ruta de lectura no existe'))
//         return
//       } else {
//         const files: string[] = find
//           .fileSync(root)
//           .map(file => path.basename(file, '.ts'))
//         for (let x = 0; x < args.seeders.length; x++) {
//           const arg: string = args.seeders[x]
//           if (!validate(arg, files)) {
//             this.log(chalk.redBright(`No se encontró el seeder con el nombre ${arg}`))
//             //revert changes
//             break
//           }
//           this.log(`${chalk.greenBright('Seeding:')} ${arg}`)
//           // const typeScriptTemplate: string = `
//           //     class Ejemplo {
//           //       public saludar():string{
//           //         const seeder = new ${args.seeders[x]}()
//           //         return seeder.saludar()
//           //       }
//           //     }
//           //     const c = new Ejemplo()
//           //     c.saludar()
//           //   `
//           // executeTypeScript(typeScriptTemplate)
//         }
//       }
//     }

//     callback()
//   })

function executeTypeScript(typeScriptTemplate: string) {
  const result: TranspileOutput = ts.transpileModule(typeScriptTemplate, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2017,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    },
  })
  var evaluated: any = nodeEval(result)
  console.log(evaluated)
  console.log('Seeders executed successfully')
}

function validate(arg: string, files: string[]): boolean {
  const callback = file => file === arg
  return files.some(callback)
}
