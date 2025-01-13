# Pie in the Sky Airlines

## Installation

This application requires Node.js in order to run. It was developed with version 22.7.0, however I'm unaware of any compatibility issues with any other versions. You can find Node.js in your package manager or [here](https://nodejs.org/en/download)

It is written in TypeScript, but I've included the compiled JavaScript files as well. If you would like to compile your own set of js files, ensure TypeScript is installed with:

```bash
npm install -g typescript
```

Then compile with:

```bash
tsc index.ts
```

## Usage

In bash you should be able to run:

```bash
node index.js < input.txt > output.txt 2> error.txt
```

However in git-bash on Windows it may be necessary to invoke the node executable directly due to aliasing issues:

```bash
node.exe index.js < input.txt > output.txt 2> error.txt
```

My tested output is in the root directory as `realOutput.txt` and `realError.txt`.
