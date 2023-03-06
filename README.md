# sourcemap-extractor
[![npm version](https://badge.fury.io/js/sourcemap-extractor.svg)](https://badge.fury.io/js/sourcemap-extractor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/dt/sourcemap-extractor.svg)](https://www.npmjs.com/package/sourcemap-extractor)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/sourcemap-extractor.svg)](https://www.npmjs.com/package/sourcemap-extractor)

A command-line tool to extract source files based on a provided source map file.

# Installation
## Using npm:
```bash
npm install -g @uppo/sourcemap-extractor
```
## Using yarn:
```bash
yarn global add @uppo/sourcemap-extractor
```

# Usage
## Extracting source files
```bash
sourcemap-extractor extract <map-file>
//or 
sourcemap-extractor e <map-file>
```
If the command is successful, the tool creates an output directory in the current working directory and extracts all source files to it.

# License
This project is licensed under the terms of the MIT license.