import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement depuis .env
dotenv.config();

// Configuration
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY n'est pas définie dans les variables d'environnement");
  console.log("💡 Créez un fichier .env avec: GEMINI_API_KEY=votre_clé_api");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

// Dossier de sortie pour les images
const OUTPUT_DIR = path.join(__dirname, "..", "public", "exercise-images");

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`📁 Dossier créé: ${OUTPUT_DIR}`);
}

// Liste des exercices à illustrer
const exercises = [
  // Échauffement
  {
    id: "arm_circles",
    name: "Cercles de bras",
    prompt: "A clean, minimalist illustration of a fit person doing arm circles exercise. The person is standing upright with arms extended to the sides, making circular motions. Simple, modern style with a light background. Focus on proper form and movement. Fitness illustration style, side view, clear demonstration of the exercise technique."
  },
  {
    id: "pushups_light",
    name: "Pompes légères",
    prompt: "A clean, minimalist illustration of a person doing light push-ups on their knees (modified push-up). The person is in proper form with hands shoulder-width apart, body aligned. Simple, modern fitness illustration style with a light background. Side view showing correct technique."
  },
  {
    id: "plank_light",
    name: "Gainage léger",
    prompt: "A clean, minimalist illustration of a person in a forearm plank position. The person has a straight body line from head to heels, elbows directly under shoulders, core engaged. Simple, modern fitness illustration style with a light background. Side view showing perfect plank form."
  },
  {
    id: "breathing",
    name: "Respiration et mise en place",
    prompt: "A calm, minimalist illustration of a person sitting in a meditation pose, focusing on deep breathing. The person is relaxed with eyes closed, hands resting on knees. Peaceful atmosphere with soft colors. Simple, modern wellness illustration style."
  },
  
  // Bloc Pectoraux
  {
    id: "pushups",
    name: "Pompes",
    prompt: "A clean, minimalist illustration of a person doing a standard push-up. The person is in perfect form with straight body alignment, hands shoulder-width apart, lowering chest toward the ground. Simple, modern fitness illustration style with a light background. Side view showing proper push-up technique."
  },
  {
    id: "dumbbell_press",
    name: "Développé haltères",
    prompt: "A clean, minimalist illustration of a person lying on their back doing a dumbbell chest press. The person is holding dumbbells above their chest, arms extended. Simple, modern fitness illustration style with a light background. Side view showing proper form for dumbbell press."
  },
  {
    id: "dumbbell_fly",
    name: "Écartés haltères",
    prompt: "A clean, minimalist illustration of a person lying on their back doing dumbbell flyes. The person has arms extended to the sides in a wide arc, holding dumbbells, focusing on chest stretch. Simple, modern fitness illustration style with a light background. Top view showing the fly motion."
  },
  
  // Bloc Abdominaux
  {
    id: "plank",
    name: "Gainage",
    prompt: "A clean, minimalist illustration of a person in a perfect forearm plank position. Strong core engagement, straight body line, elbows under shoulders. Simple, modern fitness illustration style with a light background. Side view emphasizing core stability."
  },
  {
    id: "leg_raises",
    name: "Relevés de jambes",
    prompt: "A clean, minimalist illustration of a person lying on their back doing leg raises. The person has legs extended and raised, lower back pressed to the ground, hands at sides. Simple, modern fitness illustration style with a light background. Side view showing proper leg raise form."
  },
  {
    id: "crunch",
    name: "Crunch lent",
    prompt: "A clean, minimalist illustration of a person doing a slow crunch exercise. The person is lying on their back with knees bent, lifting shoulders off the ground in a controlled motion. Simple, modern fitness illustration style with a light background. Side view showing proper crunch technique."
  },
  
  // Retour au calme
  {
    id: "chest_stretch",
    name: "Étirement pectoraux",
    prompt: "A clean, minimalist illustration of a person doing a chest stretch against a wall or doorframe. The person has one arm extended back, opening the chest. Simple, modern fitness illustration style with a light background. Side view showing proper stretching form."
  },
  {
    id: "breathing_relax",
    name: "Respiration profonde",
    prompt: "A calm, minimalist illustration of a person in a relaxed standing position doing deep breathing. The person has eyes closed, hands on chest/belly, focusing on breath. Peaceful atmosphere with soft colors. Simple, modern wellness illustration style."
  },
  
  // Exercices de repos
  {
    id: "rest",
    name: "Repos",
    prompt: "A calm, minimalist illustration representing rest and recovery. A person in a relaxed standing or sitting position, breathing calmly. Soft colors, peaceful atmosphere. Simple, modern wellness illustration style emphasizing recovery and rest."
  },
  
  // Exercices abdominaux supplémentaires
  {
    id: "side_plank_left",
    name: "Planche latérale gauche",
    prompt: "A clean, minimalist illustration of a person in a left side plank position. The person is balanced on their left forearm and side of left foot, body forming a straight line. Simple, modern fitness illustration style with a light background. Side view showing proper form."
  },
  {
    id: "side_plank_right",
    name: "Planche latérale droite",
    prompt: "A clean, minimalist illustration of a person in a right side plank position. The person is balanced on their right forearm and side of right foot, body forming a straight line. Simple, modern fitness illustration style with a light background. Side view showing proper form."
  },
  {
    id: "pelvic_tilt",
    name: "Relevé de bassin",
    prompt: "A clean, minimalist illustration of a person doing pelvic tilts. The person is lying on their back with knees bent, lifting the pelvis slightly off the ground, engaging lower abs. Simple, modern fitness illustration style with a light background. Side view showing the movement."
  },
  {
    id: "bicycle_crunches",
    name: "Vélo au sol",
    prompt: "A clean, minimalist illustration of a person doing bicycle crunches. The person is lying on their back, alternating bringing opposite elbow to knee in a cycling motion. Simple, modern fitness illustration style with a light background. Side view showing the exercise."
  },
  {
    id: "mountain_climbers",
    name: "Montées de genoux rapides",
    prompt: "A clean, minimalist illustration of a person doing mountain climbers. The person is in a plank position, alternating bringing knees toward chest rapidly. Simple, modern fitness illustration style with a light background. Side view showing dynamic movement."
  },
  {
    id: "hollow_hold",
    name: "Gainage sur le dos",
    prompt: "A clean, minimalist illustration of a person doing a hollow body hold. The person is lying on their back with legs and shoulders slightly raised, core engaged, lower back pressed to ground. Simple, modern fitness illustration style with a light background. Side view."
  },
  {
    id: "oblique_crunches",
    name: "Crunch + rotation",
    prompt: "A clean, minimalist illustration of a person doing oblique crunches with rotation. The person is doing a crunch while rotating torso to engage obliques. Simple, modern fitness illustration style with a light background. Angled view showing the rotation."
  },
  
  // Exercices bras et épaules
  {
    id: "bicep_curls",
    name: "Curl biceps",
    prompt: "A clean, minimalist illustration of a person doing bicep curls with dumbbells. The person is standing upright, curling dumbbells toward shoulders with controlled form. Simple, modern fitness illustration style with a light background. Front view showing proper technique."
  },
  {
    id: "overhead_triceps",
    name: "Triceps au-dessus de la tête",
    prompt: "A clean, minimalist illustration of a person doing overhead triceps extension. The person holds a dumbbell overhead with both hands, lowering it behind the head. Simple, modern fitness illustration style with a light background. Side view showing the movement."
  },
  {
    id: "shoulder_press",
    name: "Développé épaules",
    prompt: "A clean, minimalist illustration of a person doing shoulder press with dumbbells. The person is pressing dumbbells overhead from shoulder height. Simple, modern fitness illustration style with a light background. Front view showing proper form."
  },
  {
    id: "dumbbell_rows",
    name: "Rowing haltère",
    prompt: "A clean, minimalist illustration of a person doing dumbbell rows. The person is bent forward at hips, pulling dumbbells toward torso, squeezing shoulder blades. Simple, modern fitness illustration style with a light background. Side view showing back engagement."
  },
  {
    id: "hammer_curls",
    name: "Curl marteau",
    prompt: "A clean, minimalist illustration of a person doing hammer curls with dumbbells. The person holds dumbbells with palms facing each other, curling upward. Simple, modern fitness illustration style with a light background. Front view showing neutral grip."
  },
  {
    id: "lateral_raises",
    name: "Élévations latérales",
    prompt: "A clean, minimalist illustration of a person doing lateral raises with dumbbells. The person lifts arms out to the sides to shoulder height. Simple, modern fitness illustration style with a light background. Front view showing the movement."
  },
  
  // Exercices cardio
  {
    id: "cycling",
    name: "Vélo",
    prompt: "A clean, minimalist illustration of a person on a stationary bike. The person is cycling with proper posture, hands on handlebars. Simple, modern fitness illustration style with a light background. Side view showing cycling position."
  },
  
  // Exercices jambes et full body
  {
    id: "squats",
    name: "Squats",
    prompt: "A clean, minimalist illustration of a person doing a bodyweight squat. The person is squatting down with proper form, chest up, knees tracking over toes. Simple, modern fitness illustration style with a light background. Side view showing squat depth."
  },
  {
    id: "lunges",
    name: "Fentes alternées",
    prompt: "A clean, minimalist illustration of a person doing alternating lunges. The person steps forward into a lunge position with front knee bent at 90 degrees. Simple, modern fitness illustration style with a light background. Side view showing proper lunge form."
  },
  {
    id: "glute_bridge",
    name: "Pont fessier",
    prompt: "A clean, minimalist illustration of a person doing a glute bridge. The person is lying on their back with knees bent, lifting hips up while squeezing glutes. Simple, modern fitness illustration style with a light background. Side view showing hip extension."
  },
  {
    id: "jumping_jacks",
    name: "Jumping jacks",
    prompt: "A clean, minimalist illustration of a person doing jumping jacks. The person is jumping with arms and legs spreading out. Simple, modern fitness illustration style with a light background. Front view showing the dynamic movement."
  },
  {
    id: "high_knees",
    name: "Marche rapide sur place",
    prompt: "A clean, minimalist illustration of a person doing high knees or marching in place. The person is lifting knees high while moving arms in a running motion. Simple, modern fitness illustration style with a light background. Side view showing the movement."
  },
  
  // Exercices dos et posture
  {
    id: "superman",
    name: "Superman",
    prompt: "A clean, minimalist illustration of a person doing the superman exercise. The person is lying face down, lifting arms and legs off the ground simultaneously. Simple, modern fitness illustration style with a light background. Side view showing back extension."
  },
  {
    id: "bird_dog",
    name: "Oiseau-chien",
    prompt: "A clean, minimalist illustration of a person doing the bird dog exercise. The person is on hands and knees, extending opposite arm and leg while maintaining balance. Simple, modern fitness illustration style with a light background. Side view showing the position."
  },
  
  // Étirements
  {
    id: "back_stretch",
    name: "Étirements dos/hanches",
    prompt: "A calm, minimalist illustration of a person doing back and hip stretches. The person is in a gentle stretching position, focusing on lower back and hip flexibility. Peaceful atmosphere with soft colors. Simple, modern wellness illustration style."
  },
  {
    id: "cooldown",
    name: "Retour au calme",
    prompt: "A calm, minimalist illustration of a person in a cooldown position. The person is standing or walking slowly, breathing deeply, relaxed posture. Peaceful atmosphere with soft colors. Simple, modern wellness illustration style emphasizing recovery."
  }
];

/**
 * Génère une image pour un exercice
 */
async function generateImage(exercise) {
  const filename = `${exercise.id}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);
  
  // Vérifier si l'image existe déjà
  if (fs.existsSync(filepath)) {
    console.log(`⏭️  Image déjà existante: ${exercise.name} (${filename})`);
    return { success: true, cached: true };
  }
  
  console.log(`🎨 Génération de l'image: ${exercise.name}...`);
  
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: exercise.prompt }] }],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      },
    });

    const response = await result.response;
    
    // Extraire l'image de la réponse
    if (response.candidates && response.candidates[0]) {
      const candidate = response.candidates[0];
      
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            // Sauvegarder l'image
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync(filepath, buffer);
            console.log(`✅ Image sauvegardée: ${filename}`);
            return { success: true, cached: false };
          }
        }
      }
    }
    
    console.error(`❌ Aucune image générée pour: ${exercise.name}`);
    return { success: false, error: "No image in response" };
    
  } catch (error) {
    console.error(`❌ Erreur lors de la génération de ${exercise.name}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Génère toutes les images avec un délai entre chaque pour respecter les limites de l'API
 */
async function generateAllImages() {
  console.log(`\n🚀 Début de la génération de ${exercises.length} images d'exercices\n`);
  
  const results = {
    success: 0,
    cached: 0,
    failed: 0,
    errors: []
  };
  
  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    console.log(`\n[${i + 1}/${exercises.length}] ${exercise.name}`);
    
    const result = await generateImage(exercise);
    
    if (result.success) {
      if (result.cached) {
        results.cached++;
      } else {
        results.success++;
        // Attendre 2 secondes entre chaque génération pour respecter les limites de l'API
        if (i < exercises.length - 1) {
          console.log("⏳ Attente de 2 secondes...");
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } else {
      results.failed++;
      results.errors.push({ exercise: exercise.name, error: result.error });
    }
  }
  
  // Résumé
  console.log("\n" + "=".repeat(60));
  console.log("📊 RÉSUMÉ DE LA GÉNÉRATION");
  console.log("=".repeat(60));
  console.log(`✅ Images générées avec succès: ${results.success}`);
  console.log(`📦 Images déjà en cache: ${results.cached}`);
  console.log(`❌ Échecs: ${results.failed}`);
  console.log(`📁 Dossier de sortie: ${OUTPUT_DIR}`);
  
  if (results.errors.length > 0) {
    console.log("\n⚠️  ERREURS:");
    results.errors.forEach(err => {
      console.log(`  - ${err.exercise}: ${err.error}`);
    });
  }
  
  console.log("\n✨ Génération terminée!\n");
}

// Exécuter le script
generateAllImages().catch(console.error);
