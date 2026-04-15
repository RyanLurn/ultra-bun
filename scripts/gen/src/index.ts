#!/usr/bin/env bun

const bunLockfile = `
{
"": {
    "name": "ultra-bun",
    "devDependencies": {
      "prettier": "3.8.2",
      "turbo": "^2.9.6",
    }
  }
}
`;
const jsonObject = JSON.parse(bunLockfile) as unknown;
console.log(jsonObject);
