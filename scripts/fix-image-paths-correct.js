// Script pour corriger les chemins d'images avec les vrais noms de dossiers
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping des slugs vers les vrais noms de dossiers
const folderMapping = {
  "1472-rue-barott": "1472 rue barott",
  "1605-1615-boul-concorde": "1605-1615 boul. de la concorde",
  "1705-charles-aubert": "1705 charles Aubert",
  "3075-boul-mascouche": "3075 Boul. Mascouche",
  "470-rue-des-tilleuls": "470 rue des tilleuls",
  "569-iberville": "569 Iberville",
  "714-le-bourg-neuf": "714 le Bourg neuf",
  "alice-619-louis-hebert": "Alice - 619 louis-hébert",
  "annie-cloutier-dalle-pavee": "Annie Cloutier - Dalle de pavée",
  "complexe-saint-charles": "Complexe Saint-Charles",
  "dkj-gascon-inc": "DKJ Gascon Inc.",
  "grande-allee": "Grande Allée",
  "ludimar-inc": "Ludimar Inc.",
  "marcel-lacasse": "Marcel Lacasse",
  "oceanne-leveille": "Océanne Leveille",
  "place-du-louvre": "Place du Louvre",
  "plateau-de-la-gare": "Plateau de la gare",
  "saint-charles": "Saint-Charles",
  "soeur-marie-rose": "Soeur-Marie-Rose",
  "station-g": "Station G",
  "steve-669-louis-hebert": "Steve - 669 louis hébert",
  "tour-cachemire": "Tour Cachemire",
  "villas-du-parc": "Villas du parc"
};

function fixImagePaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remplacer tous les chemins encodés par les vrais chemins
    Object.entries(folderMapping).forEach(([slug, realFolder]) => {
      const encodedFolder = realFolder.replace(/\s+/g, '%20').replace(/\./g, '%2E');
      const pattern = new RegExp(`/projets/${encodedFolder}/`, 'g');
      content = content.replace(pattern, `/projets/${realFolder}/`);
    });
    
    // Corriger les fichiers spécifiques avec des caractères spéciaux
    content = content.replace(/IMG_3582%202\.jpg/g, 'IMG_3582 2.jpg');
    content = content.replace(/IMG_9587%281%29\.jpg/g, 'IMG_9587(1).jpg');
    content = content.replace(/IMG_9589%281%29\.jpg/g, 'IMG_9589(1).jpg');
    content = content.replace(/IMG_9471%281%29\.jpg/g, 'IMG_9471(1).jpg');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed image paths in ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Corriger le fichier
const fileToFix = path.join(__dirname, '../lib/projects-updated.ts');
fixImagePaths(fileToFix);

console.log('🎉 Image path fixing completed!');
