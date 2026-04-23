// Quick test of simulation logic
class Moth {
  constructor(isDark) {
    this.isDark = isDark;
    this.alive = true;
  }
}

// Test 1: Light moths on light trees should survive better
let lightTreeSurvival = { light: 0, dark: 0 };
let iterations = 1000;

for (let i = 0; i < iterations; i++) {
  let moths = [new Moth(false), new Moth(false), new Moth(true), new Moth(true)];
  let predationRate = 0.3;
  
  moths.forEach(moth => {
    // Light tree = #8B7355
    let visibility = moth.isDark ? 0.8 : 0.2; // Dark moths visible on light trees
    if (Math.random() < predationRate * visibility) {
      moth.alive = false;
    }
  });
  
  moths.forEach(m => {
    if (m.alive) {
      if (m.isDark) lightTreeSurvival.dark++;
      else lightTreeSurvival.light++;
    }
  });
}

console.log("Light trees - Light moth survivals:", lightTreeSurvival.light);
console.log("Light trees - Dark moth survivals:", lightTreeSurvival.dark);
console.log("Ratio (light:dark):", (lightTreeSurvival.light / lightTreeSurvival.dark).toFixed(2));

// Test 2: Dark moths on dark trees should survive better
let darkTreeSurvival = { light: 0, dark: 0 };

for (let i = 0; i < iterations; i++) {
  let moths = [new Moth(false), new Moth(false), new Moth(true), new Moth(true)];
  
  moths.forEach(moth => {
    // Dark tree = #2c3e50
    let visibility = moth.isDark ? 0.2 : 0.8; // Light moths visible on dark trees
    if (Math.random() < 0.3 * visibility) {
      moth.alive = false;
    }
  });
  
  moths.forEach(m => {
    if (m.alive) {
      if (m.isDark) darkTreeSurvival.dark++;
      else darkTreeSurvival.light++;
    }
  });
}

console.log("\nDark trees - Light moth survivals:", darkTreeSurvival.light);
console.log("Dark trees - Dark moth survivals:", darkTreeSurvival.dark);
console.log("Ratio (dark:light):", (darkTreeSurvival.dark / darkTreeSurvival.light).toFixed(2));
