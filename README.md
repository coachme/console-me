Console-Me
============
Patches Node.js console log methods to add a UTC timestamp to each message

## Objectives

The main objective of this project is to be extremely simple. That and to display timestamps next to each message logged
using node's console logging methods. It will never depend on any other module to do its thing, therefore it doesn't
have any options, and that's on purpose.

## Usage

Just require it somewhere in your project before needing the timestamps:

```js
require('console-me')

console.log('something')
// Output: [2016-04-14T14:38:45.489Z] LOG something

console.error('oops')
// Output: [2016-04-14T14:38:45.489Z] ERROR oops
```

The message types will be colored according to the type of logging method used:

- red: `console.error`
- yellow: `console.warn`
- green: everything else
