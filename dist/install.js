#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('========================================');
console.log('Custom Homepage - Dark Blue Theme');
console.log('========================================');
console.log();
console.log('This script will help you set up your custom homepage.');
console.log();

// Get the current directory
const homepageDir = process.cwd();
const homepageUrl = `file://${homepageDir.replace(/\\/g, '/')}/index.html`;

console.log(`Homepage directory: ${homepageDir}`);
console.log(`Homepage URL: ${homepageUrl}`);
console.log();

console.log('Choose your browser:');
console.log('1. Google Chrome');
console.log('2. Microsoft Edge');
console.log('3. Firefox');
console.log('4. Manual setup (show instructions)');
console.log();

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your choice (1-4): ', (choice) => {
  switch (choice) {
    case '1':
      console.log();
      console.log('Setting up for Google Chrome...');
      console.log();
      console.log('1. Open Chrome and go to: chrome://settings/');
      console.log('2. Scroll down to "On startup"');
      console.log('3. Select "Open a specific page or set of pages"');
      console.log('4. Click "Add a new page"');
      console.log(`5. Enter this URL: ${homepageUrl}`);
      console.log('6. Click "Add" and then "Save"');
      console.log();
      console.log('Your homepage is ready!');
      break;
    case '2':
      console.log();
      console.log('Setting up for Microsoft Edge...');
      console.log();
      console.log('1. Open Edge and go to: edge://settings/');
      console.log('2. Go to "Start, home, and new tabs"');
      console.log('3. Under "Home page", select "A specific page"');
      console.log(`4. Enter this URL: ${homepageUrl}`);
      console.log('5. Click "Save"');
      console.log();
      console.log('Your homepage is ready!');
      break;
    case '3':
      console.log();
      console.log('Setting up for Firefox...');
      console.log();
      console.log('1. Open Firefox and go to: about:preferences#home');
      console.log('2. Under "Homepage and new windows", select "Custom URLs"');
      console.log(`3. Enter this URL: ${homepageUrl}`);
      console.log('4. Click "Save"');
      console.log();
      console.log('Your homepage is ready!');
      break;
    case '4':
      console.log();
      console.log('Manual Setup Instructions:');
      console.log();
      console.log('1. Open your browser\'s settings');
      console.log('2. Find the "Homepage" or "Start page" setting');
      console.log(`3. Set it to: ${homepageUrl}`);
      console.log('4. Save your settings');
      console.log();
      console.log('Alternative: You can also open the file directly by double-clicking index.html');
      break;
    default:
      console.log();
      console.log('Invalid choice. Please run the script again and choose 1-4.');
  }

  console.log();
  console.log('========================================');
  console.log('Setup complete! Enjoy your new homepage.');
  console.log('========================================');
  
  rl.close();
});
