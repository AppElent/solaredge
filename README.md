# SolarEdge solar panel SDK

## What is this?

This package is an SDK for the SolarEdge inverter. You can use this to get inverter information, site information, or solar panel data.

## How to install?
Install using `npm install --save solaredge`

## How to use?
Import: `import SolarEdge from 'solaredge';`
Initialize: `const solaredge = new SolarEdge('<api key here>');`

Then, you can use the methods from this class
```
// Get Site data
solaredge.getSiteData();
```

