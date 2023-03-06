#!/usr/bin/env node
import * as fs from 'fs';
import { existsSync, readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { promisify } from 'util';
import { SourceMapConsumer } from 'source-map';
import commander from 'commander';
import ora from 'ora';

const writeFile = promisify(fs.writeFile);

async function extractFiles(mapFile: string) {
  if (!existsSync(mapFile)) {
    console.error(`No input file given or the provided file '${mapFile}' does not exist`);
    process.exit(1);
  }

  const mapFileContent = readFileSync(mapFile, 'utf-8');
  const outputDir = join(process.cwd(), 'output');

  try {
    mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(`Cannot create output directory: ${error}`);
  }

  const consumer = await new SourceMapConsumer(mapFileContent);

  const spinner = ora('Extracting source files...').start();

  try {
    await Promise.all(consumer.sources.map(async (source) => {
      const content = consumer.sourceContentFor(source);
      const outputPath = join(outputDir, source);
      mkdirSync(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, content).catch((error) => {
        console.error(`Error writing file: ${error}`);
      });
    }));

    spinner.succeed('All files extracted!');
  } catch (error) {
    spinner.fail('Failed to extract files!');
    console.error(`Error extracting source files: ${error}`);
  }
}

async function main() {
  const program = new commander.Command();

  program
    .version('1.0.0')
    .name('sourcemap-extractor')
    .description('A command-line tool to extract source files based on a provided source map file.');

  program
    .command('extract <map-file>')
    .alias('e')
    .description('Extract source files based on a provided source map file')
    .action(extractFiles);

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main().catch(console.error);
