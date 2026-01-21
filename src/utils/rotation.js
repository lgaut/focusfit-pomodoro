import { exercises, getExercisesByCategory } from '../data/exercises';
import { rotations, programs } from '../data/programs';

export class RotationManager {
  constructor(settings, todayStats) {
    this.settings = settings;
    this.todayStats = todayStats || {
      abs_breaks_done: 0,
      breaks_done: 0
    };
    this.rotation = rotations.find(r => r.id === settings.rotation) || rotations[0];
    this.program = programs.find(p => p.id === settings.program);
  }

  getNextActivity() {
    const breakIndex = this.todayStats.breaks_done;
    const patternIndex = breakIndex % this.rotation.pattern.length;
    let category = this.rotation.pattern[patternIndex];

    if (category === 'abs' && this.todayStats.abs_breaks_done >= 2) {
      category = 'bike';
    }

    if (category === 'bike' && !this.settings.equipment.bike) {
      category = this.settings.equipment.dumbbell ? 'dumbbell' : 'abs';
    }

    if (category === 'dumbbell' && !this.settings.equipment.dumbbell) {
      category = this.settings.equipment.bike ? 'bike' : 'abs';
    }

    if (category === 'abs') {
      return this.getAbsBlock();
    }

    return this.getSimpleExercise(category);
  }

  getAbsBlock() {
    if (!this.program || !this.program.blocks) {
      return this.getSimpleExercise('abs');
    }

    const blockIndex = this.todayStats.abs_breaks_done % this.program.blocks.length;
    const block = this.program.blocks[blockIndex];

    return {
      type: 'block',
      category: 'abs',
      block: block,
      exercises: block.items.map(item => ({
        ...exercises.find(ex => ex.id === item.exercise_id),
        duration_seconds: item.duration_seconds
      }))
    };
  }

  getSimpleExercise(category) {
    const categoryExercises = getExercisesByCategory(category);
    if (categoryExercises.length === 0) {
      return this.getSimpleExercise('bike');
    }

    const randomExercise = categoryExercises[Math.floor(Math.random() * categoryExercises.length)];
    
    return {
      type: 'simple',
      category: category,
      exercise: randomExercise
    };
  }

  changeActivity(currentCategory) {
    const categories = ['bike', 'dumbbell', 'abs'].filter(cat => {
      if (cat === 'bike') return this.settings.equipment.bike;
      if (cat === 'dumbbell') return this.settings.equipment.dumbbell;
      if (cat === 'abs') return this.todayStats.abs_breaks_done < 2;
      return true;
    }).filter(cat => cat !== currentCategory);

    if (categories.length === 0) return this.getNextActivity();

    const newCategory = categories[Math.floor(Math.random() * categories.length)];
    
    if (newCategory === 'abs') {
      return this.getAbsBlock();
    }
    
    return this.getSimpleExercise(newCategory);
  }
}
