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
    prompt: "Professional fitness instruction diagram: Person standing upright, arms extended horizontally to sides at shoulder height. SHOW: Circular motion arrows around both arms indicating rotation direction. Red dots marking shoulder joints. Side view with clean white background. Athletic figure in simple workout attire. Anatomical accuracy with emphasis on shoulder mobility. Motion lines showing circular path. Educational fitness poster style with clear movement indicators."
  },
  {
    id: "pushups_light",
    name: "Pompes légères",
    prompt: "Professional fitness instruction diagram: Person performing modified push-up on knees. SHOW: Body alignment from knees to head forming straight line (indicated by dotted line). Hands positioned shoulder-width apart (marked with red dots). Downward arrow showing lowering motion. Side view with clean background. Highlight core engagement zone in light blue. Clear form demonstration with proper knee position. Educational fitness illustration."
  },
  {
    id: "plank_light",
    name: "Gainage léger",
    prompt: "Professional fitness instruction diagram: Person in forearm plank position. SHOW: Straight body alignment line from head to heels (yellow dotted line). Elbows directly under shoulders (marked with red dots). Core engagement zone highlighted in light blue. Side view. Proper hip position (not sagging or raised). Clear anatomical positioning. Educational fitness poster with form indicators."
  },
  {
    id: "breathing",
    name: "Respiration et mise en place",
    prompt: "Professional wellness instruction diagram: Person sitting cross-legged in meditation pose. SHOW: Hands on chest and belly with breathing arrows (inhale up, exhale down). Relaxed posture with straight spine (indicated by line). Eyes closed. Calm expression. Soft blue/green color palette. Front view. Peaceful atmosphere. Educational breathing technique illustration."
  },
  
  // Bloc Pectoraux
  {
    id: "pushups",
    name: "Pompes",
    prompt: "Professional fitness instruction diagram: Person in full push-up position. SHOW: Straight body line from head to heels (yellow dotted line). Hands shoulder-width apart (red dots). Vertical arrows showing up/down movement. Core and chest muscles highlighted in light red. Side view with clean background. Proper elbow angle at 45 degrees. Educational fitness poster with clear form indicators and movement arrows."
  },
  {
    id: "dumbbell_press",
    name: "Développé haltères",
    prompt: "Professional fitness instruction diagram: Person lying on back performing dumbbell chest press. SHOW: Dumbbells at chest level with upward arrows indicating press motion. Elbow position at 90 degrees (marked). Chest muscles highlighted in light red. Proper wrist alignment (straight line indicated). Side view. Dumbbells clearly visible. Educational strength training illustration with movement indicators."
  },
  {
    id: "dumbbell_fly",
    name: "Écartés haltères",
    prompt: "Professional fitness instruction diagram: Person lying on back doing dumbbell flyes. SHOW: Arms extended in wide arc with curved arrows showing opening/closing motion. Slight elbow bend (marked). Chest stretch zone highlighted in light red. Top-down view showing full range of motion. Dumbbells at shoulder level. Educational illustration with clear movement path and muscle engagement zones."
  },
  
  // Bloc Abdominaux
  {
    id: "plank",
    name: "Gainage",
    prompt: "Professional fitness instruction diagram: Person in forearm plank. SHOW: Perfect body alignment line from head to heels (yellow dotted line). Elbows under shoulders (red dots). Core engagement zone highlighted in light blue. Hip position indicator (not sagging). Side view. Breathing reminder icon. Educational core training illustration with anatomical precision and form markers."
  },
  {
    id: "leg_raises",
    name: "Relevés de jambes",
    prompt: "Professional fitness instruction diagram: Person lying on back performing leg raises. SHOW: Legs extended upward with vertical arrow showing lift motion. Lower back pressed to ground (emphasized with contact indicator). Hands at sides for stability. Lower abs highlighted in light blue. Side view. Leg angle markers (90 degrees). Educational ab exercise illustration with clear movement path."
  },
  {
    id: "crunch",
    name: "Crunch lent",
    prompt: "Professional fitness instruction diagram: Person doing controlled crunch. SHOW: Shoulders lifting off ground with curved arrow showing motion. Knees bent at 90 degrees. Hands behind head (not pulling neck). Upper abs highlighted in light blue. Side view. Small range of motion emphasized. Educational ab exercise with proper form indicators and neck safety reminder."
  },
  
  // Retour au calme
  {
    id: "chest_stretch",
    name: "Étirement pectoraux",
    prompt: "Professional stretching instruction diagram: Person standing sideways to wall/doorframe with arm extended back. SHOW: Chest opening angle (curved arrow). Shoulder position (red dot). Stretch zone highlighted in light green on chest. Side view. Proper stance with feet shoulder-width. Hold time indicator (30-60s). Educational flexibility illustration with stretch intensity zones."
  },
  {
    id: "breathing_relax",
    name: "Respiration profonde",
    prompt: "Professional wellness instruction diagram: Person standing relaxed with eyes closed. SHOW: One hand on chest, one on belly. Breathing flow arrows (inhale through nose - blue, exhale through mouth - green). Diaphragm movement indicator. Calm posture with relaxed shoulders. Front view. Soft calming colors. Educational breathing technique with clear airflow visualization."
  },
  
  // Exercices de repos
  {
    id: "rest",
    name: "Repos",
    prompt: "Professional recovery instruction diagram: Person in comfortable standing rest position. SHOW: Relaxed posture with hands on hips or at sides. Breathing rhythm indicator (slow, steady). Recovery timer icon. Calm expression. Soft blue/green palette. Front view. Educational rest period illustration emphasizing active recovery and breathing."
  },
  
  // Exercices abdominaux supplémentaires
  {
    id: "side_plank_left",
    name: "Planche latérale gauche",
    prompt: "Professional fitness instruction diagram: Person in left side plank. SHOW: Straight body alignment from head to feet (yellow dotted line). Left elbow under shoulder (red dot). Hips lifted (not sagging). Oblique muscles highlighted in light blue on left side. Front-angled view. Stacked feet position. Educational core exercise with clear alignment markers and muscle engagement zones."
  },
  {
    id: "side_plank_right",
    name: "Planche latérale droite",
    prompt: "Professional fitness instruction diagram: Person in right side plank. SHOW: Straight body alignment from head to feet (yellow dotted line). Right elbow under shoulder (red dot). Hips lifted (not sagging). Oblique muscles highlighted in light blue on right side. Front-angled view. Stacked feet position. Educational core exercise with clear alignment markers and muscle engagement zones."
  },
  {
    id: "pelvic_tilt",
    name: "Relevé de bassin",
    prompt: "Professional fitness instruction diagram: Person lying on back doing pelvic tilt. SHOW: Knees bent at 90 degrees. Pelvis lifting with upward curved arrow. Lower abs engagement zone highlighted in light blue. Lower back contact with ground emphasized. Side view. Small controlled movement indicator. Educational lower ab exercise with movement path and engagement zones."
  },
  {
    id: "bicycle_crunches",
    name: "Vélo au sol",
    prompt: "Professional fitness instruction diagram: Person doing bicycle crunches. SHOW: Alternating elbow-to-opposite-knee motion with curved crossing arrows. Rotation indicators. Obliques highlighted in light blue. Legs in cycling motion (one extended, one bent). Angled view showing full rotation. Educational ab exercise with clear movement pattern and muscle engagement."
  },
  {
    id: "mountain_climbers",
    name: "Montées de genoux rapides",
    prompt: "Professional fitness instruction diagram: Person in plank doing mountain climbers. SHOW: Alternating knee-to-chest motion with forward arrows. Plank position maintained (body alignment line). Core engagement highlighted. Dynamic movement indicators (speed lines). Side view. Proper hand position (red dots). Educational cardio-core exercise with movement pattern."
  },
  {
    id: "hollow_hold",
    name: "Gainage sur le dos",
    prompt: "Professional fitness instruction diagram: Person in hollow body hold. SHOW: Legs and shoulders raised off ground. Lower back pressed flat (contact indicator). Core engagement zone highlighted in light blue. Arms extended overhead. Side view. Body curve emphasized (C-shape). Educational advanced core exercise with proper form markers."
  },
  {
    id: "oblique_crunches",
    name: "Crunch + rotation",
    prompt: "Professional fitness instruction diagram: Person doing oblique crunch with rotation. SHOW: Shoulder rotating toward opposite knee with curved arrow. Oblique muscles highlighted in light blue. Controlled twist motion. Hands behind head (not pulling). Angled view showing rotation. Educational oblique exercise with movement path and muscle engagement."
  },
  
  // Exercices bras et épaules
  {
    id: "bicep_curls",
    name: "Curl biceps",
    prompt: "Professional strength training diagram: Person standing doing bicep curls. SHOW: Dumbbells at sides with upward curved arrows showing curl motion. Elbow position fixed at sides (red dots). Biceps highlighted in light red. Controlled movement path. Front view. Proper posture with core engaged. Educational arm exercise with clear movement arc and muscle engagement."
  },
  {
    id: "overhead_triceps",
    name: "Triceps au-dessus de la tête",
    prompt: "Professional strength training diagram: Person doing overhead triceps extension. SHOW: Dumbbell held overhead with both hands. Downward arrow showing lowering behind head. Elbow position (pointing up, not flaring). Triceps highlighted in light red. Side view. Controlled range of motion indicators. Educational arm exercise with proper elbow alignment."
  },
  {
    id: "shoulder_press",
    name: "Développé épaules",
    prompt: "Professional strength training diagram: Person doing shoulder press. SHOW: Dumbbells at shoulder height with upward arrows showing press motion. Shoulder muscles highlighted in light orange. Proper wrist alignment (straight). Core engaged. Front view. Full range of motion indicators (shoulder to overhead). Educational shoulder exercise with movement path."
  },
  {
    id: "dumbbell_rows",
    name: "Rowing haltère",
    prompt: "Professional strength training diagram: Person bent forward doing dumbbell rows. SHOW: Dumbbells pulling toward torso with upward arrows. Shoulder blade squeeze indicator (back muscles highlighted in light blue). Flat back position (spine alignment line). Side view. Elbow path close to body. Educational back exercise with proper form markers."
  },
  {
    id: "hammer_curls",
    name: "Curl marteau",
    prompt: "Professional strength training diagram: Person doing hammer curls. SHOW: Dumbbells with neutral grip (palms facing each other). Upward curved arrows showing curl motion. Biceps and forearms highlighted in light red. Elbows at sides (red dots). Front view. Grip position emphasized. Educational arm exercise with neutral grip demonstration."
  },
  {
    id: "lateral_raises",
    name: "Élévations latérales",
    prompt: "Professional strength training diagram: Person doing lateral raises. SHOW: Arms lifting out to sides with curved upward arrows. Shoulder muscles highlighted in light orange. Slight elbow bend maintained. Arms reaching shoulder height (horizontal line indicator). Front view. Controlled movement path. Educational shoulder exercise with proper form markers."
  },
  
  // Exercices cardio
  {
    id: "cycling",
    name: "Vélo",
    prompt: "Professional cardio instruction diagram: Person on stationary bike. SHOW: Proper posture with slight forward lean. Knee angle at bottom of pedal stroke (25-35 degrees marked). Hands on handlebars. Pedaling motion with circular arrows. Leg muscles highlighted in light orange. Side view. Seat height indicator. Educational cycling form with biomechanical markers."
  },
  
  // Exercices jambes et full body
  {
    id: "squats",
    name: "Squats",
    prompt: "Professional strength training diagram: Person doing bodyweight squat. SHOW: Downward arrow showing squat motion. Knees tracking over toes (alignment lines). Hip depth indicator (parallel to ground). Chest up, back straight (spine line). Leg muscles highlighted in light orange. Side view. Weight on heels emphasized. Educational leg exercise with proper form markers."
  },
  {
    id: "lunges",
    name: "Fentes alternées",
    prompt: "Professional strength training diagram: Person in lunge position. SHOW: Front knee at 90 degrees (angle marked). Back knee hovering above ground. Forward step arrow. Vertical torso alignment (dotted line). Leg muscles highlighted in light orange. Side view. Weight distribution indicator. Educational lunge exercise with proper form markers."
  },
  {
    id: "glute_bridge",
    name: "Pont fessier",
    prompt: "Professional strength training diagram: Person doing glute bridge. SHOW: Hips lifting with upward arrow. Knees bent at 90 degrees. Glutes and hamstrings highlighted in light orange. Shoulder-to-knee alignment line. Squeeze indicator at top. Side view. Feet flat on ground. Educational glute exercise with movement path and muscle engagement."
  },
  {
    id: "jumping_jacks",
    name: "Jumping jacks",
    prompt: "Professional cardio instruction diagram: Person doing jumping jacks. SHOW: Arms and legs spreading with outward arrows. Two positions shown (closed and open). Dynamic movement lines. Cardiovascular intensity indicator. Front view. Landing position (soft knees). Educational cardio exercise with clear movement pattern."
  },
  {
    id: "high_knees",
    name: "Marche rapide sur place",
    prompt: "Professional cardio instruction diagram: Person doing high knees. SHOW: Knee lifting to hip height with upward arrow. Alternating leg motion indicators. Arms pumping (running motion arrows). Core engagement highlighted. Side view. Tempo indicator (fast pace). Educational cardio exercise with movement rhythm and form markers."
  },
  
  // Exercices dos et posture
  {
    id: "superman",
    name: "Superman",
    prompt: "Professional back training diagram: Person lying face down doing superman. SHOW: Arms and legs lifting simultaneously with upward arrows. Back muscles highlighted in light blue. Neck neutral position (alignment indicator). Small controlled lift emphasized. Side view. Hold time indicator (2-5 seconds). Educational back extension exercise with proper form markers."
  },
  {
    id: "bird_dog",
    name: "Oiseau-chien",
    prompt: "Professional core stability diagram: Person on hands and knees doing bird dog. SHOW: Opposite arm and leg extended (indicated by arrows). Body alignment line (horizontal from hand to foot). Core engagement highlighted in light blue. Balance indicators. Side view. Neutral spine position. Educational stability exercise with clear extension pattern."
  },
  
  // Étirements
  {
    id: "back_stretch",
    name: "Étirements dos/hanches",
    prompt: "Professional stretching instruction diagram: Person in seated forward fold or child's pose. SHOW: Stretch zones highlighted in light green (lower back and hips). Breathing indicator (slow, deep). Relaxation cues. Gentle stretch emphasis (no pain). Side view. Hold time indicator (30-60s). Educational flexibility exercise with stretch intensity zones."
  },
  {
    id: "cooldown",
    name: "Retour au calme",
    prompt: "Professional recovery instruction diagram: Person walking slowly or standing with relaxed posture. SHOW: Slow movement indicator (walking pace arrow). Breathing rhythm (calm, steady). Heart rate降 indicator. Relaxed shoulders and arms. Side view. Soft calming colors. Educational cooldown phase with recovery markers and breathing cues."
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
