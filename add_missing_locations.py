#!/usr/bin/env python3
"""
Add missing service area locations to nearbyTowns data.
"""

import math
import json

# Missing locations with coordinates
MISSING_LOCATIONS = {
    "chesterfield": {"lat": 53.2350, "lon": -1.4210, "name": "Chesterfield"},
    "ipswich": {"lat": 52.0594, "lon": 1.1556, "name": "Ipswich"},
    "lincoln": {"lat": 53.2307, "lon": -0.5406, "name": "Lincoln"},
    "norwich": {"lat": 52.6309, "lon": 1.2974, "name": "Norwich"},
    "stratford-upon-avon": {"lat": 52.1917, "lon": -1.7083, "name": "Stratford-upon-Avon"},
    "swindon": {"lat": 51.5558, "lon": -1.7797, "name": "Swindon"},
    "wrexham": {"lat": 53.0462, "lon": -2.9930, "name": "Wrexham"},
    "luton": {"lat": 51.8787, "lon": -0.4200, "name": "Luton"},
    "swansea": {"lat": 51.6214, "lon": -3.9436, "name": "Swansea"},
    "newport": {"lat": 51.5842, "lon": -2.9977, "name": "Newport"},
    "reading": {"lat": 51.4543, "lon": -0.9781, "name": "Reading"},
    "telford": {"lat": 52.6766, "lon": -2.4469, "name": "Telford"},
    "warrington": {"lat": 53.3900, "lon": -2.5970, "name": "Warrington"},
    "newcastle": {"lat": 54.9783, "lon": -1.6178, "name": "Newcastle upon Tyne"},
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
    
    valid_feature_codes = {'PPL', 'PPLA', 'PPLA2', 'PPLA3', 'PPLC', 'PPLS', 'PPLX'}
    
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            fields = line.strip().split('\t')
            if len(fields) < 15:
                continue
            
            feature_class = fields[6]
            feature_code = fields[7]
            population = int(fields[14]) if fields[14] else 0
            
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
    
    places_with_distance = []
    for place in all_places:
        distance = haversine_distance(center_lat, center_lon, place['lat'], place['lon'])
        
        if distance < 1.0:
            continue
            
        if distance <= max_distance_km:
            places_with_distance.append({
                'name': place['name'],
                'distance': distance,
                'population': place['population']
            })
    
    places_with_distance.sort(key=lambda x: (x['distance'], -x['population']))
    
    if len(places_with_distance) < min_results:
        extended_radius = max_distance_km
        while len(places_with_distance) < min_results and extended_radius < 40:
            extended_radius += 5
            for place in all_places:
                distance = haversine_distance(center_lat, center_lon, place['lat'], place['lon'])
                if distance < 1.0:
                    continue
                if max_distance_km < distance <= extended_radius:
                    if not any(p['name'] == place['name'] for p in places_with_distance):
                        places_with_distance.append({
                            'name': place['name'],
                            'distance': distance,
                            'population': place['population']
                        })
            places_with_distance.sort(key=lambda x: (x['distance'], -x['population']))
    
    return places_with_distance[:max_results]

def main():
    print("Loading GeoNames UK data...")
    all_places = load_geonames_data('GB.txt')
    print(f"Loaded {len(all_places)} populated places from UK\n")
    
    # Load existing data
    print("Reading existing nearbyTowns.ts file...")
    with open('client/src/data/nearbyTowns.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract existing data
    import re
    json_match = re.search(r'export const nearbyTownsData: Record<string, NearbyTownsData> = ({.*?});', content, re.DOTALL)
    if not json_match:
        print("Error: Could not find nearbyTownsData in file")
        return
    
    existing_data = json.loads(json_match.group(1))
    print(f"Found {len(existing_data)} existing locations\n")
    
    # Generate data for missing locations
    new_entries = {}
    for area_key, area_data in MISSING_LOCATIONS.items():
        if area_key in existing_data:
            print(f"Skipping {area_data['name']} - already exists")
            continue
            
        print(f"Processing {area_data['name']}...")
        nearby = find_nearby_towns(area_key, area_data, all_places)
        
        town_names = [town['name'] for town in nearby]
        
        new_entries[area_key] = {
            'location': area_data['name'],
            'towns': town_names,
            'count': len(town_names)
        }
        
        print(f"  Found {len(town_names)} nearby towns")
        print(f"  Sample: {', '.join(town_names[:5])}...\n")
    
    # Merge with existing data
    existing_data.update(new_entries)
    
    # Write updated file
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
        f.write(json.dumps(existing_data, indent=2, ensure_ascii=False))
        f.write(';\n')
    
    print(f"\n✓ Updated nearby towns data saved to {output_file}")
    print(f"✓ Total service areas: {len(existing_data)}")
    print(f"✓ New locations added: {len(new_entries)}")
    print(f"✓ Total towns: {sum(data['count'] for data in existing_data.values())}")

if __name__ == '__main__':
    main()
