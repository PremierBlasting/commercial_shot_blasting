import { useCallback, useRef } from 'react';

// Map of route paths to their lazy import functions
const routeImports: Record<string, () => Promise<unknown>> = {
  '/services': () => import('../pages/Services'),
  '/industries': () => import('../pages/Industries'),
  '/our-work': () => import('../pages/OurWork'),
  '/about': () => import('../pages/About'),
  '/contact': () => import('../pages/Contact'),
  '/blog': () => import('../pages/Blog'),
  '/service-areas': () => import('../pages/ServiceAreas'),
  '/preparation-cleanup': () => import('../pages/PreparationCleanup'),
  '/free-site-survey': () => import('../pages/FreeSiteSurvey'),
  '/privacy-policy': () => import('../pages/PrivacyPolicy'),
  '/terms': () => import('../pages/Terms'),
};

// Service detail pages
const serviceDetailRoutes = [
  '/services/structural-steel',
  '/services/factory-cladding',
  '/services/warehouse-racking',
  '/services/pipework',
  '/services/bridges-infrastructure',
  '/services/concrete-floors',
  '/services/radiators-heating',
  '/services/doors-gates',
  '/services/stairs-ladders',
  '/services/telecom-towers',
  '/services/vehicles-machinery',
  '/services/steel-sheeting',
];

serviceDetailRoutes.forEach(route => {
  routeImports[route] = () => import('../pages/ServiceDetail');
});

// Service area pages - map URL slugs to their component imports
const serviceAreaImports: Record<string, () => Promise<unknown>> = {
  '/service-areas/aylesbury': () => import('../pages/AylesburyServiceArea'),
  '/service-areas/banbury': () => import('../pages/BanburyServiceArea'),
  '/service-areas/barnsley': () => import('../pages/BarnsleyServiceArea'),
  '/service-areas/basildon': () => import('../pages/BasildonServiceArea'),
  '/service-areas/bath': () => import('../pages/BathServiceArea'),
  '/service-areas/bedford': () => import('../pages/BedfordServiceArea'),
  '/service-areas/birkenhead': () => import('../pages/BirkenheadServiceArea'),
  '/service-areas/birmingham': () => import('../pages/BirminghamServiceArea'),
  '/service-areas/bolton': () => import('../pages/BoltonServiceArea'),
  '/service-areas/bristol': () => import('../pages/BristolServiceArea'),
  '/service-areas/burton-upon-trent': () => import('../pages/BurtonUponTrentServiceArea'),
  '/service-areas/bury-st-edmunds': () => import('../pages/BuryStEdmundsServiceArea'),
  '/service-areas/cambridge': () => import('../pages/CambridgeServiceArea'),
  '/service-areas/cannock-chase': () => import('../pages/CannockChaseServiceArea'),
  '/service-areas/cannock': () => import('../pages/CannockServiceArea'),
  '/service-areas/cardiff': () => import('../pages/CardiffServiceArea'),
  '/service-areas/chelmsford': () => import('../pages/ChelmsfordServiceArea'),
  '/service-areas/cheltenham': () => import('../pages/CheltenhamServiceArea'),
  '/service-areas/chester': () => import('../pages/ChesterServiceArea'),
  '/service-areas/chesterfield': () => import('../pages/ChesterfieldServiceArea'),
  '/service-areas/coalville': () => import('../pages/CoalvilleServiceArea'),
  '/service-areas/colchester': () => import('../pages/ColchesterServiceArea'),
  '/service-areas/corby': () => import('../pages/CorbyServiceArea'),
  '/service-areas/coventry': () => import('../pages/CoventryServiceArea'),
  '/service-areas/crewe': () => import('../pages/CreweServiceArea'),
  '/service-areas/derby': () => import('../pages/DerbyServiceArea'),
  '/service-areas/doncaster': () => import('../pages/DoncasterServiceArea'),
  '/service-areas/dronfield': () => import('../pages/DronfieldServiceArea'),
  '/service-areas/dudley': () => import('../pages/DudleyServiceArea'),
  '/service-areas/gloucester': () => import('../pages/GloucesterServiceArea'),
  '/service-areas/grantham': () => import('../pages/GranthamServiceArea'),
  '/service-areas/great-yarmouth': () => import('../pages/GreatYarmouthServiceArea'),
  '/service-areas/guildford': () => import('../pages/GuildfordServiceArea'),
  '/service-areas/halifax': () => import('../pages/HalifaxServiceArea'),
  '/service-areas/hemel-hempstead': () => import('../pages/HemelHempsteadServiceArea'),
  '/service-areas/hereford': () => import('../pages/HerefordServiceArea'),
  '/service-areas/high-wycombe': () => import('../pages/HighWycombeServiceArea'),
  '/service-areas/huddersfield': () => import('../pages/HuddersfieldServiceArea'),
  '/service-areas/ipswich': () => import('../pages/IpswichServiceArea'),
  '/service-areas/kettering': () => import('../pages/KetteringServiceArea'),
  '/service-areas/kidderminster': () => import('../pages/KidderminsterServiceArea'),
  '/service-areas/kings-lynn': () => import('../pages/KingsLynnServiceArea'),
  '/service-areas/kingswood': () => import('../pages/KingswoodServiceArea'),
  '/service-areas/leamington-spa': () => import('../pages/LeamingtonSpaServiceArea'),
  '/service-areas/leeds': () => import('../pages/LeedsServiceArea'),
  '/service-areas/leicester': () => import('../pages/LeicesterServiceArea'),
  '/service-areas/leighton-buzzard': () => import('../pages/LeightonBuzzardServiceArea'),
  '/service-areas/lichfield': () => import('../pages/LichfieldServiceArea'),
  '/service-areas/lincoln': () => import('../pages/LincolnServiceArea'),
  '/service-areas/liverpool': () => import('../pages/LiverpoolServiceArea'),
  '/service-areas/loughborough': () => import('../pages/LoughboroughServiceArea'),
  '/service-areas/lowestoft': () => import('../pages/LowestoftServiceArea'),
  '/service-areas/luton': () => import('../pages/LutonServiceArea'),
  '/service-areas/macclesfield': () => import('../pages/MacclesfieldServiceArea'),
  '/service-areas/manchester': () => import('../pages/ManchesterServiceArea'),
  '/service-areas/mansfield': () => import('../pages/MansfieldServiceArea'),
  '/service-areas/milton-keynes': () => import('../pages/MiltonKeynesServiceArea'),
  '/service-areas/newcastle-under-lyme': () => import('../pages/NewcastleUnderLymeServiceArea'),
  '/service-areas/newport': () => import('../pages/NewportServiceArea'),
  '/service-areas/northampton': () => import('../pages/NorthamptonServiceArea'),
  '/service-areas/norwich': () => import('../pages/NorwichServiceArea'),
  '/service-areas/nottingham': () => import('../pages/NottinghamServiceArea'),
  '/service-areas/nuneaton': () => import('../pages/NuneatonServiceArea'),
  '/service-areas/oldham': () => import('../pages/OldhamServiceArea'),
  '/service-areas/oxford': () => import('../pages/OxfordServiceArea'),
  '/service-areas/peterborough': () => import('../pages/PeterboroughServiceArea'),
  '/service-areas/portsmouth': () => import('../pages/PortsmouthServiceArea'),
  '/service-areas/reading': () => import('../pages/ReadingServiceArea'),
  '/service-areas/redditch': () => import('../pages/RedditchServiceArea'),
  '/service-areas/rochdale': () => import('../pages/RochdaleServiceArea'),
  '/service-areas/rotherham': () => import('../pages/RotherhamServiceArea'),
  '/service-areas/rugby': () => import('../pages/RugbyServiceArea'),
  '/service-areas/runcorn': () => import('../pages/RuncornServiceArea'),
  '/service-areas/salford': () => import('../pages/SalfordServiceArea'),
  '/service-areas/salisbury': () => import('../pages/SalisburyServiceArea'),
  '/service-areas/scunthorpe': () => import('../pages/ScunthorpeServiceArea'),
  '/service-areas/sheffield': () => import('../pages/SheffieldServiceArea'),
  '/service-areas/shrewsbury': () => import('../pages/ShrewsburyServiceArea'),
  '/service-areas/slough': () => import('../pages/SloughServiceArea'),
  '/service-areas/solihull': () => import('../pages/SolihullServiceArea'),
  '/service-areas/southend-on-sea': () => import('../pages/SouthendOnSeaServiceArea'),
  '/service-areas/st-albans': () => import('../pages/StAlbansServiceArea'),
  '/service-areas/stafford': () => import('../pages/StaffordServiceArea'),
  '/service-areas/stevenage': () => import('../pages/StevenageServiceArea'),
  '/service-areas/stockport': () => import('../pages/StockportServiceArea'),
  '/service-areas/stoke': () => import('../pages/StokeServiceArea'),
  '/service-areas/stratford-upon-avon': () => import('../pages/StratfordUponAvonServiceArea'),
  '/service-areas/sutton-coldfield': () => import('../pages/SuttonColdfieldServiceArea'),
  '/service-areas/swindon': () => import('../pages/SwindonServiceArea'),
  '/service-areas/tamworth': () => import('../pages/TamworthServiceArea'),
  '/service-areas/taunton': () => import('../pages/TauntonServiceArea'),
  '/service-areas/telford': () => import('../pages/TelfordServiceArea'),
  '/service-areas/thetford': () => import('../pages/ThetfordServiceArea'),
  '/service-areas/walsall': () => import('../pages/WalsallServiceArea'),
  '/service-areas/warrington': () => import('../pages/WarringtonServiceArea'),
  '/service-areas/watford': () => import('../pages/WatfordServiceArea'),
  '/service-areas/wellingborough': () => import('../pages/WellingboroughServiceArea'),
  '/service-areas/welwyn-garden-city': () => import('../pages/WelwynGardenCityServiceArea'),
  '/service-areas/weston-super-mare': () => import('../pages/WestonSuperMareServiceArea'),
  '/service-areas/wolverhampton': () => import('../pages/WolverhamtonServiceArea'),
  '/service-areas/worcester': () => import('../pages/WorcesterServiceArea'),
  '/service-areas/wrexham': () => import('../pages/WrexhamServiceArea'),
};

// Merge service area imports into main routeImports
Object.assign(routeImports, serviceAreaImports);

// Cache for already prefetched routes
const prefetchedRoutes = new Set<string>();

/**
 * Hook for prefetching page components on hover/focus
 * This preloads the JavaScript bundle before the user clicks,
 * making navigation feel instant.
 */
export function usePrefetch() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prefetch = useCallback((path: string) => {
    // Don't prefetch if already done
    if (prefetchedRoutes.has(path)) return;

    // Check if we have an import for this route
    const importFn = routeImports[path];
    if (importFn) {
      // Add a small delay to avoid prefetching on quick mouse movements
      timeoutRef.current = setTimeout(() => {
        importFn().then(() => {
          prefetchedRoutes.add(path);
        }).catch(() => {
          // Silently fail - prefetch is an optimization, not critical
        });
      }, 100);
    }
  }, []);

  const cancelPrefetch = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { prefetch, cancelPrefetch };
}

/**
 * Prefetch critical pages immediately after initial load
 * This preloads the most commonly visited pages in the background
 */
export function prefetchCriticalPages() {
  // Wait for initial page to be interactive
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback if available, otherwise setTimeout
    const scheduleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000));
    
    scheduleCallback(() => {
      // Prefetch most important pages first
      const criticalPages = [
        '/services',
        '/contact',
        '/about',
        '/our-work',
        '/service-areas',
      ];

      criticalPages.forEach((path, index) => {
        setTimeout(() => {
          const importFn = routeImports[path];
          if (importFn && !prefetchedRoutes.has(path)) {
            importFn().then(() => {
              prefetchedRoutes.add(path);
            }).catch(() => {});
          }
        }, index * 200); // Stagger prefetches to avoid blocking
      });
    });
  }
}
