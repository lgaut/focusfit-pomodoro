export const programs = [
  {
    id: "program_abs_tablettes",
    name: "Tablettes (2 pauses/jour)",
    goal: "abs",
    description: "2 pauses abdos par jour, 5 minutes chacune.",
    blocks: [
      {
        id: "abs_block_1",
        name: "Pause Abdos #1",
        total_duration_seconds: 300,
        items: [
          { exercise_id: "abs_plank", duration_seconds: 60 },
          { exercise_id: "abs_crunch", duration_seconds: 60 },
          { exercise_id: "abs_reverse_crunch", duration_seconds: 60 },
          { exercise_id: "abs_knee_drive", duration_seconds: 60 },
          { exercise_id: "abs_hollow_hold", duration_seconds: 60 }
        ]
      },
      {
        id: "abs_block_2",
        name: "Pause Abdos #2",
        total_duration_seconds: 300,
        items: [
          { exercise_id: "abs_side_plank_left", duration_seconds: 30 },
          { exercise_id: "abs_side_plank_right", duration_seconds: 30 },
          { exercise_id: "abs_bicycle", duration_seconds: 60 },
          { exercise_id: "abs_crunch", duration_seconds: 60 },
          { exercise_id: "abs_plank", duration_seconds: 120 }
        ]
      }
    ]
  }
];

export const rotations = [
  {
    id: "rotation_basic",
    name: "Rotation Basique",
    pattern: ["bike", "dumbbell", "bike", "abs", "bike", "dumbbell", "bike", "abs"]
  }
];
