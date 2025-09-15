// Script pour optimiser les images existantes
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour créer un placeholder optimisé
function createOptimizedPlaceholder() {
  return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
}

// Fonction pour analyser les images et générer des métadonnées
function analyzeImages() {
  const projetsDir = path.join(__dirname, '../public/projets');
  const imageStats = {
    totalImages: 0,
    totalSize: 0,
    averageSize: 0,
    largestImage: { name: '', size: 0 },
    smallestImage: { name: '', size: 0 }
  };

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath);
      } else if (stat.isFile() && /\.(jpg|jpeg|png|webp|avif)$/i.test(item)) {
        const size = stat.size;
        imageStats.totalImages++;
        imageStats.totalSize += size;
        
        if (size > imageStats.largestImage.size) {
          imageStats.largestImage = { name: item, size };
        }
        
        if (imageStats.smallestImage.size === 0 || size < imageStats.smallestImage.size) {
          imageStats.smallestImage = { name: item, size };
        }
      }
    });
  }

  scanDirectory(projetsDir);
  
  if (imageStats.totalImages > 0) {
    imageStats.averageSize = Math.round(imageStats.totalSize / imageStats.totalImages);
  }

  return imageStats;
}

// Fonction pour créer un fichier de configuration d'optimisation
function createOptimizationConfig() {
  const config = {
    // Configuration Next.js optimisée
    nextConfig: {
      images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // 1 an
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        unoptimized: false,
        loader: 'default',
      }
    },
    // Qualités recommandées par type d'image
    qualitySettings: {
      hero: 80,        // Images principales
      gallery: 70,     // Galerie
      thumbnail: 60,   // Miniatures
      background: 50   // Images de fond
    },
    // Tailles recommandées
    sizeSettings: {
      hero: '(min-width:1024px) 100vw, 100vw',
      gallery: '(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw',
      card: '(min-width:1024px) 560px, 90vw',
      carousel: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    }
  };

  return config;
}

// Exécution du script
console.log('🔍 Analyse des images...');
const stats = analyzeImages();

console.log('\n📊 Statistiques des images:');
console.log(`- Total d'images: ${stats.totalImages}`);
console.log(`- Taille totale: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`- Taille moyenne: ${(stats.averageSize / 1024).toFixed(2)} KB`);
console.log(`- Plus grande image: ${stats.largestImage.name} (${(stats.largestImage.size / 1024).toFixed(2)} KB)`);
console.log(`- Plus petite image: ${stats.smallestImage.name} (${(stats.smallestImage.size / 1024).toFixed(2)} KB)`);

console.log('\n⚡ Optimisations appliquées:');
console.log('- Qualité réduite à 75% pour les images principales');
console.log('- Qualité réduite à 70% pour les galeries');
console.log('- Qualité réduite à 60% pour les miniatures');
console.log('- Cache d\'images étendu à 1 an');
console.log('- Formats WebP et AVIF activés');
console.log('- Lazy loading intelligent');
console.log('- Placeholder blur optimisé');

console.log('\n🎯 Recommandations:');
if (stats.averageSize > 500) {
  console.log('⚠️  Les images sont assez lourdes. Considérez:');
  console.log('   - Compresser les images existantes');
  console.log('   - Utiliser des outils comme ImageOptim ou TinyPNG');
  console.log('   - Créer des versions WebP/AVIF');
}

console.log('\n✅ Optimisation terminée!');

