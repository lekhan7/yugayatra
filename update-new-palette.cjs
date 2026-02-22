// Script to update all colors to the new palette from image
const fs = require('fs');
const path = require('path');

const colorReplacements = {
  // Forest Green + Gold to new palette
  '#064E3B': '#72B0AB', // Forest Green to Sapphire
  '#D97706': '#B89D47', // Gold to Pistachio
  '#34D399': '#BCDDDC', // Light green to Arctic
  
  // RGB replacements
  'rgb(6, 78, 59)': 'rgb(114, 176, 171)', // Forest Green to Sapphire
  'rgb(217, 119, 6)': 'rgb(184, 157, 71)', // Gold to Pistachio
  'rgb(52, 211, 153)': 'rgb(188, 221, 220)', // Light green to Arctic
  
  // Update all hardcoded Tailwind classes to new palette
  'text-accent-main': 'text-accent-main', // Keep Sapphire
  'text-accent-dark': 'text-accent-dark', // Keep Peacock
  'text-accent-light': 'text-accent-light', // Keep Arctic
  'bg-accent-main/10': 'bg-accent-main/10', // Keep Sapphire
  'bg-accent-main/20': 'bg-accent-main/20', // Keep Sapphire
  'border-accent-main/30': 'border-accent-main/30', // Keep Sapphire
  'border-accent-dark': 'border-accent-dark', // Keep Peacock
  'dark:bg-accent-dark': 'dark:bg-accent-dark', // Keep Peacock
  'dark:bg-accent-dark/20': 'dark:bg-accent-dark/20', // Keep Peacock
  'dark:text-accent-light': 'dark:text-accent-light', // Keep Arctic
  'from-accent-main': 'from-accent-main', // Keep Sapphire
  'from-accent-dark': 'from-accent-dark', // Keep Peacock
  'to-accent-dark': 'to-accent-dark', // Keep Peacock
  'to-accent-gold': 'to-accent-gold', // Keep Pistachio
  'hover:from-accent-dark': 'hover:from-accent-dark', // Keep Peacock
  'hover:to-accent-dark': 'hover:to-accent-dark', // Keep Peacock
  'hover:to-accent-gold': 'hover:to-accent-gold', // Keep Pistachio
  
  // Update any remaining green colors to Sapphire
  'text-green-500': 'text-accent-main',
  'text-green-600': 'text-accent-dark',
  'text-green-700': 'text-accent-dark',
  'text-green-800': 'text-accent-dark',
  'text-green-300': 'text-accent-light',
  'text-green-400': 'text-accent-light',
  'bg-green-50': 'bg-accent-main/10',
  'bg-green-100': 'bg-accent-main/20',
  'bg-green-500': 'bg-accent-main',
  'bg-green-600': 'bg-accent-dark',
  'bg-green-800': 'bg-accent-dark',
  'bg-green-900': 'bg-accent-dark',
  'border-green-200': 'border-accent-main/30',
  'border-green-600': 'border-accent-dark',
  'border-green-800': 'border-accent-dark',
  'dark:bg-green-900': 'dark:bg-accent-dark',
  'dark:bg-green-900/20': 'dark:bg-accent-dark/20',
  'dark:bg-green-900/30': 'dark:bg-accent-dark/30',
  'dark:text-green-300': 'dark:text-accent-light',
  'dark:text-green-400': 'dark:text-accent-light',
  'from-green-500': 'from-accent-main',
  'from-green-600': 'from-accent-dark',
  'to-green-600': 'to-accent-dark',
  'to-green-800': 'to-accent-dark',
  
  // Update yellow/orange to Pistachio
  'text-yellow-500': 'text-accent-gold',
  'text-yellow-600': 'text-accent-gold',
  'text-yellow-700': 'text-accent-gold',
  'text-yellow-800': 'text-accent-gold',
  'text-yellow-300': 'text-accent-gold/80',
  'text-yellow-400': 'text-accent-gold/80',
  'bg-yellow-100': 'bg-accent-gold/20',
  'bg-yellow-500': 'bg-accent-gold',
  'bg-yellow-600': 'bg-accent-gold',
  'bg-yellow-800': 'bg-accent-gold',
  'bg-yellow-900': 'bg-accent-gold',
  'border-yellow-600': 'border-accent-gold',
  'dark:bg-yellow-900': 'dark:bg-accent-gold',
  'dark:bg-yellow-900/20': 'dark:bg-accent-gold/20',
  'dark:bg-yellow-900/30': 'dark:bg-accent-gold/30',
  'dark:text-yellow-300': 'dark:text-accent-gold/80',
  'dark:text-yellow-400': 'dark:text-accent-gold/80',
  'from-yellow-500': 'from-accent-gold',
  'from-yellow-600': 'from-accent-gold',
  'to-yellow-600': 'to-accent-gold',
  'to-yellow-800': 'to-accent-gold',
  'from-orange-500': 'from-accent-gold',
  'to-red-600': 'to-accent-dark',
  'from-orange-500': 'from-accent-gold',
  'to-red-600': 'to-accent-dark',
  
  // Update purple to Sapphire/Arctic
  'text-purple-500': 'text-accent-main',
  'text-purple-600': 'text-accent-dark',
  'text-purple-700': 'text-accent-dark',
  'text-purple-800': 'text-accent-dark',
  'text-purple-300': 'text-accent-light',
  'text-purple-400': 'text-accent-light',
  'bg-purple-100': 'bg-accent-main/20',
  'bg-purple-500': 'bg-accent-main',
  'bg-purple-600': 'bg-accent-dark',
  'bg-purple-800': 'bg-accent-dark',
  'bg-purple-900': 'bg-accent-dark',
  'border-purple-200': 'border-accent-main/30',
  'border-purple-600': 'border-accent-dark',
  'border-purple-800': 'border-accent-dark',
  'dark:bg-purple-900': 'dark:bg-accent-dark',
  'dark:bg-purple-900/20': 'dark:bg-accent-dark/20',
  'dark:bg-purple-900/30': 'dark:bg-accent-dark/30',
  'dark:text-purple-300': 'dark:text-accent-light',
  'dark:text-purple-400': 'dark:text-accent-light',
  'from-purple-500': 'from-accent-main',
  'from-purple-600': 'from-accent-dark',
  'to-purple-600': 'to-accent-dark',
  'to-purple-800': 'to-accent-dark',
  'from-indigo-500': 'from-accent-main',
  'to-pink-600': 'to-accent-gold',
  
  // Update red to Pistachio
  'text-red-500': 'text-accent-gold',
  'text-red-600': 'text-accent-gold',
  'text-red-700': 'text-accent-gold',
  'text-red-400': 'text-accent-gold/80',
  'text-red-900': 'text-accent-gold',
  'bg-red-50': 'bg-accent-gold/10',
  'bg-red-500': 'bg-accent-gold',
  'bg-red-600': 'bg-accent-gold',
  'bg-red-800': 'bg-accent-gold',
  'bg-red-900': 'bg-accent-gold',
  'border-red-200': 'border-accent-gold/30',
  'border-red-600': 'border-accent-gold',
  'border-red-800': 'border-accent-gold',
  'dark:bg-red-900': 'dark:bg-accent-gold',
  'dark:bg-red-900/20': 'dark:bg-accent-gold/20',
  'dark:text-red-300': 'dark:text-accent-gold/80',
  'dark:text-red-400': 'dark:text-accent-gold/80',
  
  // Update gradients
  'linear-gradient(135deg, #064E3B, #D97706)': 'linear-gradient(135deg, #72B0AB, #B89D47)',
  'linear-gradient(135deg, #72B0AB, #B89D47)': 'linear-gradient(135deg, #72B0AB, #B89D47)',
  'boxShadow: 0 0 20px rgba(6, 78, 59, 0)': 'boxShadow: 0 0 20px rgba(114, 176, 171, 0)',
  'boxShadow: 0 0 40px rgba(6, 78, 59, 0.3)': 'boxShadow: 0 0 40px rgba(114, 176, 171, 0.3)',
};

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    for (const [oldColor, newColor] of Object.entries(colorReplacements)) {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.includes(oldColor)) {
        content = content.replace(regex, newColor);
        changed = true;
      }
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDirectory(filePath);
    } else if (file.match(/\.(jsx|js|css|tsx|ts)$/)) {
      replaceInFile(filePath);
    }
  }
}

// Start processing
console.log('Updating colors to new palette (Sapphire, Arctic, Lace, Bubblegum, Ballet Slipper, Sage, Pistachio, Spruce, Peacock)...');
walkDirectory('./src');
console.log('Color update complete!');
