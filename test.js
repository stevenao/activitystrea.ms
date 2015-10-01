'use strict';

const Collection = require('./src/models/_collection2');

const c = new Collection();

c.orderedItems = ['a',new Collection(['http://www.w3.org/ns/activitystreams#Story'])];

console.log(c.items);

c.pipe(process.stdout, {space:2});

c.items.push('a');

console.log(c.items);
