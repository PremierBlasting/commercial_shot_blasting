#!/usr/bin/env node
import fs from 'fs';

const filePath = 'server/metaTags.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const fixes = [
  // bridges
  ['Comprehensive shot blasting for bridge steelwork including girders, crossmembers, and support structures. We remove rust, mill scale, and old coatings to prepare bridge steel for long-lasting protective coatings.',
   'Comprehensive shot blasting for bridge steelwork including girders, crossmembers, and supports. We remove rust, mill scale, and old coatings for long-lasting protective finishes.'],
  // ladders
  ['Comprehensive shot blasting for fixed ladders, caged ladder systems, and step-over platforms. We remove rust and old coatings from access equipment to prepare surfaces for galvanizing or protective coatings.',
   'Comprehensive shot blasting for fixed ladders, caged ladder systems, and step-over platforms. We remove rust and old coatings for galvanizing or protective coatings.'],
  // racking
  ['Specialist shot blasting for pallet racking systems, storage frames, and industrial shelving. We remove rust, old paint, and surface contaminants to prepare racking for powder coating or galvanizing.',
   'Specialist shot blasting for pallet racking systems, storage frames, and industrial shelving. We remove rust and old paint to prepare racking for powder coating or galvanizing.'],
  // pipework
  ['Professional shot blasting for process pipework, pipe spools, and manifolds. We remove rust, mill scale, and old coatings from pipework to prepare surfaces for protective coatings, galvanizing, or specialist pipe coatings.',
   'Professional shot blasting for process pipework, pipe spools, and manifolds. We remove rust, mill scale, and old coatings to prepare surfaces for protective coatings or galvanizing.'],
  // telecom-towers
  ['Specialist shot blasting for telecom masts, lattice towers, and communication infrastructure. We remove rust, old coatings, and surface contaminants to prepare tower steelwork for protective coatings or galvanizing.',
   'Specialist shot blasting for telecom masts, lattice towers, and communication infrastructure. We remove rust and old coatings to prepare tower steelwork for protective coatings.'],
  // floor-preparation
  ['Industrial floor shot blasting for concrete and steel floor surfaces. We prepare floors for resin coatings, epoxy systems, and industrial floor treatments by removing surface contaminants and creating the correct surface profile.',
   'Industrial floor shot blasting for concrete and steel surfaces. We prepare floors for resin coatings, epoxy systems, and industrial treatments by removing contaminants and creating the correct profile.'],
  // powder-coating
  ['Combined shot blasting and powder coating service for steel components. We prepare surfaces by shot blasting then apply durable powder coatings for a long-lasting, corrosion-resistant finish.',
   'Combined shot blasting and powder coating service for steel components. We prepare surfaces by shot blasting then apply durable powder coatings for a corrosion-resistant finish.'],
  // radiators
  ['Specialist shot blasting for commercial and industrial radiators. We clean internal and external surfaces to remove rust, scale, and old coatings, restoring radiator efficiency and preparing surfaces for protective coatings or powder coating.',
   'Specialist shot blasting for commercial and industrial radiators. We remove rust, scale, and old coatings, restoring radiator efficiency and preparing surfaces for protective coatings.'],
  // vehicles
  ['Professional shot blasting for commercial vehicles, agricultural machinery, and industrial equipment. We remove rust, old paint, and surface contaminants to prepare vehicles and machinery for repainting or protective coatings.',
   'Professional shot blasting for commercial vehicles, agricultural machinery, and industrial equipment. We remove rust and old paint to prepare for repainting or protective coatings.'],
  // steel-doors
  ['Professional shot blasting for steel doors, roller shutters, and industrial door systems. We remove rust, old paint, and surface contaminants to prepare door components for powder coating or painting.',
   'Professional shot blasting for steel doors, roller shutters, and industrial door systems. We remove rust and old paint to prepare door components for powder coating or painting.'],
  // steel-sheeting
  ['Specialist shot blasting for steel sheet, plate, and profiled sheeting. We prepare steel surfaces by removing mill scale, rust, and old coatings to achieve the correct surface profile for coating.',
   'Specialist shot blasting for steel sheet, plate, and profiled sheeting. We remove mill scale, rust, and old coatings to achieve the correct surface profile for coating.'],
  // gates-railings
  ['Professional shot blasting for steel gates, railings, fencing, and ornamental ironwork. We remove rust, old paint, and surface contaminants to prepare metalwork for powder coating, painting, or galvanizing.',
   'Professional shot blasting for steel gates, railings, fencing, and ornamental ironwork. We remove rust and old paint to prepare metalwork for powder coating or galvanizing.'],
  // plant-machinery
  ['Comprehensive shot blasting for industrial plant, heavy machinery, and manufacturing equipment. We remove rust, old coatings, and surface contaminants to prepare plant and machinery for protective coatings.',
   'Comprehensive shot blasting for industrial plant, heavy machinery, and manufacturing equipment. We remove rust and old coatings to prepare plant and machinery for protective coatings.'],
  // structural-steel-frames SSR body description
  ['Our structural steel frame shot blasting service delivers exceptional surface preparation for steel frames, roof trusses, and load-bearing steel structures. We remove mill scale, rust, and old coatings to prepare surfaces for galvanizing or protective coatings.',
   'Our structural steel frame shot blasting service delivers exceptional surface preparation for steel frames, roof trusses, and load-bearing structures. We remove mill scale, rust, and old coatings for galvanizing or protective coatings.'],
  // steel-containers SSR body description
  ['We are specialists in shot blasting services for steel containers and large storage structures. We remove rust, old coatings, and surface contaminants to prepare containers for repainting or long-term reuse.',
   'We are specialists in shot blasting services for steel containers and large storage structures. We remove rust and old coatings to prepare containers for repainting or long-term reuse.'],
  // factory-cladding SSR body description
  ['Specialist shot blasting for factory and industrial cladding panels. We remove original plastisol, multiple layers of paint, rust, and weathering from metal cladding to restore surfaces to bare metal condition ready for new protective coatings.',
   'Specialist shot blasting for factory and industrial cladding panels. We remove plastisol, paint layers, and rust to restore surfaces to bare metal ready for new protective coatings.'],
  // fire-escapes SSR body description
  ['Our fire escape and external stair tower shot blasting service provides comprehensive surface preparation for fire safety infrastructure. We remove rust, old paint, and corrosion to prepare surfaces for protective coatings or galvanizing.',
   'Our fire escape and external stair tower shot blasting service provides comprehensive surface preparation for fire safety infrastructure. We remove rust and corrosion for protective coatings or galvanizing.'],
  // staircases SSR body description
  ['Our internal steel staircase and balustrade shot blasting service provides meticulous surface preparation for architectural metalwork. We remove rust, old paint, powder coating, and welding residue to prepare surfaces for powder coating, painting, or galvanizing.',
   'Our internal steel staircase and balustrade shot blasting service provides meticulous surface preparation for architectural metalwork. We remove rust, old paint, and welding residue for powder coating or painting.'],
  // bridges SSR body description
  ['Our bridge steelwork shot blasting service provides comprehensive surface preparation for bridge structures. We remove rust, mill scale, and old coatings to prepare bridge steel for long-lasting protective coatings.',
   'Our bridge steelwork shot blasting service provides comprehensive surface preparation for bridge structures. We remove rust, mill scale, and old coatings for long-lasting protective coatings.'],
  // ladders SSR body description
  ['Our fixed ladder and step-over platform shot blasting service provides comprehensive surface preparation for access equipment. We remove rust and old coatings to prepare surfaces for galvanizing or protective coatings.',
   'Our fixed ladder and step-over platform shot blasting service provides comprehensive surface preparation for access equipment. We remove rust and old coatings for galvanizing or protective coatings.'],
  // racking SSR body description
  ['Our specialist warehouse racking shot blasting service provides comprehensive surface preparation for pallet racking, storage frames, and industrial shelving. We remove rust, old paint, and surface contaminants to prepare racking for powder coating or galvanizing.',
   'Our specialist warehouse racking shot blasting service provides comprehensive surface preparation for pallet racking, storage frames, and industrial shelving. We remove rust and old paint for powder coating or galvanizing.'],
  // pipework SSR body description
  ['Our specialized pipework shot blasting service delivers exceptional surface preparation for process pipework, pipe spools, and manifolds. We remove rust, mill scale, and old coatings to prepare surfaces for protective coatings or galvanizing.',
   'Our specialized pipework shot blasting service delivers exceptional surface preparation for process pipework, pipe spools, and manifolds. We remove rust, mill scale, and old coatings for protective coatings or galvanizing.'],
  // telecom SSR body description
  ['Our specialist telecommunications tower shot blasting service provides comprehensive surface preparation for telecom masts, lattice towers, and communication infrastructure. We remove rust, old coatings, and surface contaminants to prepare tower steelwork for protective coatings.',
   'Our specialist telecommunications tower shot blasting service provides comprehensive surface preparation for telecom masts, lattice towers, and communication infrastructure. We remove rust and old coatings for protective coatings.'],
  // floor-preparation SSR body description
  ['Specialist shot blasting services for floor preparation across commercial and industrial facilities. We prepare concrete and steel floor surfaces for resin coatings, epoxy systems, and industrial floor treatments.',
   'Specialist shot blasting services for floor preparation across commercial and industrial facilities. We prepare concrete and steel floor surfaces for resin coatings, epoxy systems, and industrial floor treatments.'],
  // powder-coating SSR body description
  ['Complete metal surface preparation and powder coating service for commercial and industrial components. We shot blast surfaces to the correct profile then apply durable powder coatings for a long-lasting finish.',
   'Complete metal surface preparation and powder coating service for commercial and industrial components. We shot blast surfaces to the correct profile then apply durable powder coatings.'],
  // radiators SSR body description
  ['Our commercial radiators shot blasting service provides comprehensive restoration and surface preparation for commercial and industrial heating systems. We remove rust, scale, and old coatings to restore radiator efficiency.',
   'Our commercial radiators shot blasting service provides comprehensive restoration and surface preparation for commercial and industrial heating systems. We remove rust, scale, and old coatings.'],
  // vehicles SSR body description
  ['Our commercial and agricultural vehicle shot blasting service provides comprehensive surface preparation for commercial vehicles, agricultural machinery, and industrial equipment. We remove rust, old paint, and surface contaminants.',
   'Our commercial and agricultural vehicle shot blasting service provides comprehensive surface preparation for commercial vehicles, agricultural machinery, and industrial equipment. We remove rust and old paint.'],
  // steel-doors SSR body description
  ['Our steel doors and roller shutters shot blasting service provides comprehensive surface preparation for steel doors, roller shutters, and industrial door systems. We remove rust, old paint, and surface contaminants.',
   'Our steel doors and roller shutters shot blasting service provides comprehensive surface preparation for steel doors, roller shutters, and industrial door systems. We remove rust and old paint.'],
  // steel-sheeting SSR body description
  ['Our steel sheeting shot blasting service provides comprehensive surface preparation for steel sheet, plate, and profiled sheeting. We remove mill scale, rust, and old coatings to achieve the correct surface profile.',
   'Our steel sheeting shot blasting service provides comprehensive surface preparation for steel sheet, plate, and profiled sheeting. We remove mill scale, rust, and old coatings for the correct surface profile.'],
  // gates-railings SSR body description
  ['Our steel gates and railings shot blasting service provides comprehensive restoration and surface preparation for steel gates, railings, fencing, and ornamental ironwork. We remove rust, old paint, and surface contaminants.',
   'Our steel gates and railings shot blasting service provides comprehensive restoration and surface preparation for steel gates, railings, fencing, and ornamental ironwork. We remove rust and old paint.'],
  // plant-machinery SSR body description
  ['Our mobile plant and machinery shot blasting brings professional surface preparation to your site. We remove rust, old coatings, and surface contaminants from industrial plant, heavy machinery, and manufacturing equipment.',
   'Our mobile plant and machinery shot blasting brings professional surface preparation to your site. We remove rust and old coatings from industrial plant, heavy machinery, and manufacturing equipment.'],
  // structural-steel-frames process step 3 description (164 chars)
  ['Using appropriate blast media, we systematically clean all frame surfaces to achieve professional cleanliness for your coating system.',
   'Using appropriate blast media, we systematically clean all frame surfaces to achieve professional cleanliness for your coating system.'],
];

let fixCount = 0;
fixes.forEach(([old, replacement]) => {
  if (content.includes(old)) {
    content = content.replaceAll(old, replacement);
    if (replacement.length > 160) {
      console.log('STILL OVER 160 (' + replacement.length + '):', replacement.substring(0, 60) + '...');
    } else {
      console.log('Fixed (' + replacement.length + ' chars):', replacement.substring(0, 60) + '...');
    }
    fixCount++;
  }
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('\nDone. Fixed', fixCount, 'descriptions.');

// Verify remaining over-160 descriptions
const matches = [...content.matchAll(/description: "([^"]+)"/g)];
let over = 0;
matches.forEach(m => {
  const desc = m[1];
  if (desc.length > 160) {
    console.log('STILL OVER 160 (' + desc.length + '):', desc.substring(0, 80));
    over++;
  }
});
console.log('Remaining over 160 chars:', over, 'out of', matches.length);
