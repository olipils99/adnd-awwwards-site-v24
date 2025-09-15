// Script pour générer automatiquement les galeries de projets
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projetsDir = path.join(__dirname, '../public/projets');

// Fonction pour obtenir toutes les images d'un dossier
function getProjectImages(projectDir) {
  try {
    const files = fs.readdirSync(projectDir);
    return files
      .filter(file => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file))
      .map(file => `/projets/${path.basename(projectDir)}/${file}`)
      .sort();
  } catch (error) {
    console.error(`Erreur lors de la lecture du dossier ${projectDir}:`, error);
    return [];
  }
}

// Fonction pour obtenir les vidéos d'un dossier
function getProjectVideos(projectDir) {
  try {
    const files = fs.readdirSync(projectDir);
    const videos = files
      .filter(file => /\.(mp4|MP4)$/i.test(file))
      .map(file => `/projets/${path.basename(projectDir)}/${file}`)
      .sort();
    return videos.length > 0 ? videos[0] : null; // Prendre la première vidéo
  } catch (error) {
    return null;
  }
}

// Fonction pour générer les détails d'un projet
function generateProjectDetails(projectName) {
  const details = {
    budget: "Sur mesure",
    duration: "2-4 semaines",
    materials: ["Végétation", "Paillis", "Système d'irrigation"],
    year: "2024"
  };

  // Personnaliser selon le type de projet
  if (projectName.toLowerCase().includes('commercial') || 
      projectName.toLowerCase().includes('inc') ||
      projectName.toLowerCase().includes('complexe')) {
    details.duration = "6-8 semaines";
    details.materials = ["Végétation commerciale", "Pavé uni", "Éclairage paysager"];
  } else if (projectName.toLowerCase().includes('dalle') || 
             projectName.toLowerCase().includes('pavé')) {
    details.duration = "1-2 semaines";
    details.materials = ["Dalles de pavé", "Sable polymère", "Bordures"];
  } else if (projectName.toLowerCase().includes('gare') || 
             projectName.toLowerCase().includes('plateau')) {
    details.duration = "8-10 semaines";
    details.materials = ["Végétation native", "Pavé uni", "Éclairage paysager", "Système d'irrigation"];
  }

  return details;
}

// Fonction principale
function generateAllProjectGalleries() {
  try {
    const projects = fs.readdirSync(projetsDir);
    const results = [];

    projects.forEach(project => {
      const projectPath = path.join(projetsDir, project);
      
      if (fs.statSync(projectPath).isDirectory() && 
          !project.includes('Photo') && 
          project !== '2024') {
        
        const images = getProjectImages(projectPath);
        const video = getProjectVideos(projectPath);
        
        if (images.length > 0) {
          const projectData = {
            name: project,
            slug: project.toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, ''),
            images: images,
            video: video,
            details: generateProjectDetails(project)
          };
          
          results.push(projectData);
          console.log(`✓ ${project}: ${images.length} images, ${video ? '1 vidéo' : 'pas de vidéo'}`);
        }
      }
    });

    // Sauvegarder les résultats
    fs.writeFileSync(
      path.join(__dirname, '../project-galleries.json'), 
      JSON.stringify(results, null, 2)
    );
    
    console.log(`\n✅ ${results.length} projets traités avec succès!`);
    console.log('📁 Résultats sauvegardés dans: project-galleries.json');
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Exécuter le script
generateAllProjectGalleries();
