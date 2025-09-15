// Script pour corriger TOUS les chemins d'images
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixAllImagePaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remplacer tous les chemins encodés par les vrais chemins
    const replacements = [
      // 1472 rue barott
      { from: /\/projets\/1472rue%20barott\//g, to: '/projets/1472 rue barott/' },
      
      // 1605-1615 boul. de la concorde
      { from: /\/projets\/1605-1615boul\.%20de%20la%20concorde\//g, to: '/projets/1605-1615 boul. de la concorde/' },
      
      // 1705 charles Aubert
      { from: /\/projets\/1705charles%20Aubert\//g, to: '/projets/1705 charles Aubert/' },
      
      // 3075 Boul. Mascouche
      { from: /\/projets\/3075Boul\.%20Mascouche\//g, to: '/projets/3075 Boul. Mascouche/' },
      
      // 470 rue des tilleuls
      { from: /\/projets\/470rue%20des%20tilleuls\//g, to: '/projets/470 rue des tilleuls/' },
      
      // 569 Iberville
      { from: /\/projets\/569Iberville\//g, to: '/projets/569 Iberville/' },
      
      // 714 le Bourg neuf
      { from: /\/projets\/714le%20Bourg%20neuf\//g, to: '/projets/714 le Bourg neuf/' },
      
      // Alice - 619 louis-hébert
      { from: /\/projets\/Alice-%20619%20louis-hébert\//g, to: '/projets/Alice - 619 louis-hébert/' },
      
      // Annie Cloutier - Dalle de pavée
      { from: /\/projets\/AnnieCloutier%20-%20Dalle%20de%20pavée\//g, to: '/projets/Annie Cloutier - Dalle de pavée/' },
      
      // Complexe Saint-Charles
      { from: /\/projets\/ComplexeSaint-Charles\//g, to: '/projets/Complexe Saint-Charles/' },
      
      // DKJ Gascon Inc.
      { from: /\/projets\/DKJGascon%20Inc\.\//g, to: '/projets/DKJ Gascon Inc./' },
      
      // Grande Allée
      { from: /\/projets\/GrandeAllée\//g, to: '/projets/Grande Allée/' },
      
      // Ludimar Inc.
      { from: /\/projets\/LudimarInc\.\//g, to: '/projets/Ludimar Inc./' },
      
      // Marcel Lacasse
      { from: /\/projets\/MarcelLacasse\//g, to: '/projets/Marcel Lacasse/' },
      
      // Océanne Leveille
      { from: /\/projets\/OcéanneLeveille\//g, to: '/projets/Océanne Leveille/' },
      
      // Place du Louvre
      { from: /\/projets\/Placedu%20Louvre\//g, to: '/projets/Place du Louvre/' },
      
      // Plateau de la gare
      { from: /\/projets\/Plateaude%20la%20gare\//g, to: '/projets/Plateau de la gare/' },
      
      // Station G
      { from: /\/projets\/StationG\//g, to: '/projets/Station G/' },
      
      // Steve - 669 louis hébert
      { from: /\/projets\/Steve-%20669%20louis%20hébert\//g, to: '/projets/Steve - 669 louis hébert/' },
      
      // Tour Cachemire
      { from: /\/projets\/TourCachemire\//g, to: '/projets/Tour Cachemire/' },
      
      // Villas du parc
      { from: /\/projets\/Villasdu%20parc\//g, to: '/projets/Villas du parc/' },
      
      // Fichiers spécifiques avec caractères spéciaux
      { from: /IMG_3582%202\.jpg/g, to: 'IMG_3582 2.jpg' },
      { from: /IMG_9587%281%29\.jpg/g, to: 'IMG_9587(1).jpg' },
      { from: /IMG_9589%281%29\.jpg/g, to: 'IMG_9589(1).jpg' },
      { from: /IMG_9471%281%29\.jpg/g, to: 'IMG_9471(1).jpg' }
    ];
    
    // Appliquer tous les remplacements
    replacements.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed all image paths in ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Corriger le fichier
const fileToFix = path.join(__dirname, '../lib/projects-updated.ts');
fixAllImagePaths(fileToFix);

console.log('🎉 All image paths fixed!');
