#!/usr/bin/env python3
"""
Generate nearby towns data for all service area locations.
Uses GeoNames UK data to find towns within 20km radius of each location.
"""

import math
import json
from collections import defaultdict

# Service area locations with coordinates (approximate city centers)
SERVICE_AREAS = {
    "birmingham": {"lat": 52.4862, "lon": -1.8904, "name": "Birmingham"},
    "wolverhampton": {"lat": 52.5868, "lon": -2.1289, "name": "Wolverhampton"},
    "coventry": {"lat": 52.4068, "lon": -1.5197, "name": "Coventry"},
    "leicester": {"lat": 52.6369, "lon": -1.1398, "name": "Leicester"},
    "derby": {"lat": 52.9226, "lon": -1.4746, "name": "Derby"},
    "nottingham": {"lat": 52.9548, "lon": -1.1581, "name": "Nottingham"},
    "sheffield": {"lat": 53.3811, "lon": -1.4701, "name": "Sheffield"},
    "leeds": {"lat": 53.8008, "lon": -1.5491, "name": "Leeds"},
    "manchester": {"lat": 53.4808, "lon": -2.2426, "name": "Manchester"},
    "liverpool": {"lat": 53.4084, "lon": -2.9916, "name": "Liverpool"},
    "newcastle": {"lat": 54.9783, "lon": -1.6178, "name": "Newcastle upon Tyne"},
    "stoke-on-trent": {"lat": 53.0027, "lon": -2.1794, "name": "Stoke-on-Trent"},
    "telford": {"lat": 52.6766, "lon": -2.4469, "name": "Telford"},
    "worcester": {"lat": 52.1920, "lon": -2.2200, "name": "Worcester"},
    "gloucester": {"lat": 51.8644, "lon": -2.2381, "name": "Gloucester"},
    "bristol": {"lat": 51.4545, "lon": -2.5879, "name": "Bristol"},
    "cardiff": {"lat": 51.4816, "lon": -3.1791, "name": "Cardiff"},
    "swansea": {"lat": 51.6214, "lon": -3.9436, "name": "Swansea"},
    "newport": {"lat": 51.5842, "lon": -2.9977, "name": "Newport"},
    "hereford": {"lat": 52.0565, "lon": -2.7160, "name": "Hereford"},
    "shrewsbury": {"lat": 52.7081, "lon": -2.7539, "name": "Shrewsbury"},
    "chester": {"lat": 53.1905, "lon": -2.8908, "name": "Chester"},
    "warrington": {"lat": 53.3900, "lon": -2.5970, "name": "Warrington"},
    "st-albans": {"lat": 51.7520, "lon": -0.3360, "name": "St Albans"},
    "luton": {"lat": 51.8787, "lon": -0.4200, "name": "Luton"},
    "milton-keynes": {"lat": 52.0406, "lon": -0.7594, "name": "Milton Keynes"},
    "northampton": {"lat": 52.2405, "lon": -0.9027, "name": "Northampton"},
    "peterborough": {"lat": 52.5695, "lon": -0.2405, "name": "Peterborough"},
    "cambridge": {"lat": 52.2053, "lon": 0.1218, "name": "Cambridge"},
    "oxford": {"lat": 51.7520, "lon": -1.2577, "name": "Oxford"},
    "reading": {"lat": 51.4543, "lon": -0.9781, "name": "Reading"},
}

def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two points in kilometers using Haversine formula."""
    R = 6371  # Earth's radius in kilometers
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    
    a = math.sin(delta_lat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c

def load_geonames_data(filename):
    """Load UK places from GeoNames data file."""
    places = []
    
    # Feature codes for populated places
    # P.PPL = populated place, P.PPLA = seat of first-order administrative division
    # P.PPLA2 = seat of second-order administrative division, P.PPLA3 = seat of third-order
    # P.PPLC = capital, P.PPLX = section of populated place
    valid_feature_codes = {'PPL', 'PPLA', 'PPLA2', 'PPLA3', 'PPLC', 'PPLS', 'PPLX'}
    
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            fields = line.strip().split('\t')
            if len(fields) < 15:
                continue
            
            # Field structure: geonameid, name, asciiname, alternatenames, lat, lon, feature_class, feature_code, ...
            feature_class = fields[6]
            feature_code = fields[7]
            population = int(fields[14]) if fields[14] else 0
            
            # Only include populated places (P class) with valid feature codes
            if feature_class == 'P' and feature_code in valid_feature_codes:
                try:
                    place = {
                        'name': fields[1],
                        'lat': float(fields[4]),
                        'lon': float(fields[5]),
                        'population': population,
                        'feature_code': feature_code
                    }
                    places.append(place)
                except (ValueError, IndexError):
                    continue
    
    return places

def find_nearby_towns(service_area_key, service_area_data, all_places, max_distance_km=20, min_results=20, max_results=50):
    """Find towns near a service area within specified radius."""
    center_lat = service_area_data['lat']
    center_lon = service_area_data['lon']
    center_name = service_area_data['name']
    
    # Calculate distances to all places
    places_with_distance = []
    for place in all_places:
        distance = haversine_distance(center_lat, center_lon, place['lat'], place['lon'])
        
        # Skip the center city itself (distance < 1km)
        if distance < 1.0:
            continue
            
        if distance <= max_distance_km:
            places_with_distance.append({
                'name': place['name'],
                'distance': distance,
                'population': place['population']
            })
    
    # Sort by distance, then by population (descending)
    places_with_distance.sort(key=lambda x: (x['distance'], -x['population']))
    
    # If we have fewer than min_results, extend radius gradually
    if len(places_with_distance) < min_results:
        extended_radius = max_distance_km
        while len(places_with_distance) < min_results and extended_radius < 40:
            extended_radius += 5
            for place in all_places:
                distance = haversine_distance(center_lat, center_lon, place['lat'], place['lon'])
                if distance < 1.0:
                    continue
                if max_distance_km < distance <= extended_radius:
                    # Check if not already in list
                    if not any(p['name'] == place['name'] for p in places_with_distance):
                        places_with_distance.append({
                            'name': place['name'],
                            'distance': distance,
                            'population': place['population']
                        })
            places_with_distance.sort(key=lambda x: (x['distance'], -x['population']))
    
    # Return up to max_results towns
    return places_with_distance[:max_results]

def main():
    print("Loading GeoNames UK data...")
    all_places = load_geonames_data('GB.txt')
    print(f"Loaded {len(all_places)} populated places from UK")
    
    # Generate nearby towns for each service area
    nearby_towns_data = {}
    
    for area_key, area_data in SERVICE_AREAS.items():
        print(f"\nProcessing {area_data['name']}...")
        nearby = find_nearby_towns(area_key, area_data, all_places)
        
        # Extract just the town names for the output
        town_names = [town['name'] for town in nearby]
        
        nearby_towns_data[area_key] = {
            'location': area_data['name'],
            'towns': town_names,
            'count': len(town_names)
        }
        
        print(f"  Found {len(town_names)} nearby towns")
        print(f"  Sample: {', '.join(town_names[:5])}...")
    
    # Save to JSON file
    output_file = 'client/src/data/nearbyTowns.ts'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('// Auto-generated nearby towns data for service area pages\n')
        f.write('// Generated from GeoNames UK geographic database\n\n')
        f.write('export interface NearbyTownsData {\n')
        f.write('  location: string;\n')
        f.write('  towns: string[];\n')
        f.write('  count: number;\n')
        f.write('}\n\n')
        f.write('export const nearbyTownsData: Record<string, NearbyTownsData> = ')
        f.write(json.dumps(nearby_towns_data, indent=2, ensure_ascii=False))
        f.write(';\n')
    
    print(f"\n✓ Generated nearby towns data saved to {output_file}")
    print(f"✓ Total service areas: {len(nearby_towns_data)}")
    print(f"✓ Total towns: {sum(data['count'] for data in nearby_towns_data.values())}")

if __name__ == '__main__':
    main()
