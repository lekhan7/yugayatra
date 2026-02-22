// Script to restore Forest Green + Gold color scheme
const fs = require('fs');
const path = require('path');

const colorReplacements = {
  // Restore Sapphire/Pistachio/Peacock back to Forest Green + Gold
  'text-accent-main': 'text-accent-main', // Keep Forest Green
  'text-accent-dark': 'text-accent-dark', // Keep Forest Green
  'text-accent-light': 'text-accent-light', // Keep light green
  'bg-accent-main/10': 'bg-accent-main/10', // Keep Forest Green
  'bg-accent-main/20': 'bg-accent-main/20', // Keep Forest Green
  'border-accent-main/30': 'border-accent-main/30', // Keep Forest Green
  'border-accent-dark': 'border-accent-dark', // Keep Forest Green
  'dark:bg-accent-dark': 'dark:bg-accent-dark', // Keep Forest Green
  'dark:bg-accent-dark/20': 'dark:bg-accent-dark/20', // Keep Forest Green
  'dark:text-accent-light': 'dark:text-accent-light', // Keep light green
  'from-accent-main': 'from-accent-main', // Keep Forest Green
  'from-accent-dark': 'from-accent-dark', // Keep Forest Green
  'to-accent-dark': 'to-accent-dark', // Keep Forest Green
  'to-accent-gold': 'to-accent-gold', // Keep Gold
  'hover:from-accent-dark': 'hover:from-accent-dark', // Keep Forest Green
  'hover:to-accent-dark': 'hover:to-accent-dark', // Keep Forest Green
  
  // Restore Pistachio for accents
  'text-accent-gold': 'text-accent-gold', // Keep Gold
  'bg-accent-gold': 'bg-accent-gold', // Keep Gold
  'border-accent-gold': 'border-accent-gold', // Keep Gold
  'dark:bg-accent-gold': 'dark:bg-accent-gold', // Keep Gold
  'dark:text-accent-gold/80': 'dark:text-accent-gold/80', // Keep Gold
  'from-accent-gold': 'from-accent-gold', // Keep Gold
  'hover:to-accent-gold': 'hover:to-accent-gold', // Keep Gold
  
  // Restore original color classes
  'text-green-500': 'text-green-500',
  'text-green-600': 'text-green-600',
  'text-green-700': 'text-green-700',
  'text-green-800': 'text-green-800',
  'text-green-300': 'text-green-300',
  'text-green-400': 'text-green-400',
  'bg-green-50': 'bg-green-50',
  'bg-green-100': 'bg-green-100',
  'bg-green-500': 'bg-green-500',
  'bg-green-600': 'bg-green-600',
  'bg-green-800': 'bg-green-800',
  'bg-green-900': 'bg-green-900',
  'border-green-200': 'border-green-200',
  'border-green-600': 'border-green-600',
  'border-green-800': 'border-green-800',
  'dark:bg-green-900': 'dark:bg-green-900',
  'dark:bg-green-900/20': 'dark:bg-green-900/20',
  'dark:bg-green-900/30': 'dark:bg-green-900/30',
  'dark:text-green-300': 'dark:text-green-300',
  'dark:text-green-400': 'dark:text-green-400',
  'from-green-500': 'from-green-500',
  'from-green-600': 'from-green-600',
  'to-green-600': 'to-green-600',
  'to-green-800': 'to-green-800',
  
  // Restore yellow/orange to original
  'text-yellow-500': 'text-yellow-500',
  'text-yellow-600': 'text-yellow-600',
  'text-yellow-700': 'text-yellow-700',
  'text-yellow-800': 'text-yellow-800',
  'text-yellow-300': 'text-yellow-300',
  'text-yellow-400': 'text-yellow-400',
  'bg-yellow-100': 'bg-yellow-100',
  'bg-yellow-500': 'bg-yellow-500',
  'bg-yellow-600': 'bg-yellow-600',
  'bg-yellow-800': 'bg-yellow-800',
  'bg-yellow-900': 'bg-yellow-900',
  'border-yellow-600': 'border-yellow-600',
  'dark:bg-yellow-900': 'dark:bg-yellow-900',
  'dark:bg-yellow-900/20': 'dark:bg-yellow-900/20',
  'dark:bg-yellow-900/30': 'dark:bg-yellow-900/30',
  'dark:text-yellow-300': 'dark:text-yellow-300',
  'dark:text-yellow-400': 'dark:text-yellow-400',
  'from-yellow-500': 'from-yellow-500',
  'from-yellow-600': 'from-yellow-600',
  'to-yellow-600': 'to-yellow-600',
  'to-yellow-800': 'to-yellow-800',
  'from-orange-500': 'from-orange-500',
  'to-red-600': 'to-red-600',
  
  // Restore purple colors
  'text-purple-500': 'text-purple-500',
  'text-purple-600': 'text-purple-600',
  'text-purple-700': 'text-purple-700',
  'text-purple-800': 'text-purple-800',
  'text-purple-300': 'text-purple-300',
  'text-purple-400': 'text-purple-400',
  'bg-purple-100': 'bg-purple-100',
  'bg-purple-500': 'bg-purple-500',
  'bg-purple-600': 'bg-purple-600',
  'bg-purple-800': 'bg-purple-800',
  'bg-purple-900': 'bg-purple-900',
  'border-purple-200': 'border-purple-200',
  'border-purple-600': 'border-purple-600',
  'border-purple-800': 'border-purple-800',
  'dark:bg-purple-900': 'dark:bg-purple-900',
  'dark:bg-purple-900/20': 'dark:bg-purple-900/20',
  'dark:bg-purple-900/30': 'dark:bg-purple-900/30',
  'dark:text-purple-300': 'dark:text-purple-300',
  'dark:text-purple-400': 'dark:text-purple-400',
  'from-purple-500': 'from-purple-500',
  'from-purple-600': 'from-purple-600',
  'to-purple-600': 'to-purple-600',
  'to-purple-800': 'to-purple-800',
  'from-indigo-500': 'from-indigo-500',
  'to-pink-600': 'to-pink-600',
  
  // Restore red colors
  'text-red-500': 'text-red-500',
  'text-red-600': 'text-red-600',
  'text-red-700': 'text-red-700',
  'text-red-400': 'text-red-400',
  'text-red-900': 'text-red-900',
  'bg-red-50': 'bg-red-50',
  'bg-red-500': 'bg-red-500',
  'bg-red-600': 'bg-red-600',
  'bg-red-800': 'bg-red-800',
  'bg-red-900': 'bg-red-900',
  'border-red-200': 'border-red-200',
  'border-red-600': 'border-red-600',
  'border-red-800': 'border-red-800',
  'dark:bg-red-900': 'dark:bg-red-900',
  'dark:bg-red-900/20': 'dark:bg-red-900/20',
  'dark:text-red-300': 'dark:text-red-300',
  'dark:text-red-400': 'dark:text-red-400',
  
  // Restore gradients
  'linear-gradient(135deg, #72B0AB, #72B0AB)': 'linear-gradient(135deg, #064E3B, #D97706)',
  'linear-gradient(135deg, #72B0AB, #B89D47)': 'linear-gradient(135deg, #064E3B, #D97706)',
  'boxShadow: 0 0 20px rgba(217, 104, 214, 0)': 'boxShadow: 0 0 20px rgba(6, 78, 59, 0)',
  'boxShadow: 0 0 40px rgba(217, 104, 214, 0.3)': 'boxShadow: 0 0 40px rgba(6, 78, 59, 0.3)',
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
      console.log(`Restored: ${filePath}`);
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
console.log('Restoring original color scheme...');
walkDirectory('./src');
console.log('Color restoration complete!');
