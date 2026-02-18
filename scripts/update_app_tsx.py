#!/usr/bin/env python3
"""
Generate updated App.tsx with all 71 new location routes
"""

# All 71 new locations
new_locations = [
    {"name": "Aylesbury", "slug": "aylesbury"},
    {"name": "Banbury", "slug": "banbury"},
    {"name": "Barnsley", "slug": "barnsley"},
    {"name": "Bath", "slug": "bath"},
    {"name": "Basildon", "slug": "basildon"},
    {"name": "Bedford", "slug": "bedford"},
    {"name": "Birkenhead", "slug": "birkenhead"},
    {"name": "Bolton", "slug": "bolton"},
    {"name": "Bury St Edmunds", "slug": "bury-st-edmunds"},
    {"name": "Burton upon Trent", "slug": "burton-upon-trent"},
    {"name": "Cannock", "slug": "cannock"},
    {"name": "Cannock Chase", "slug": "cannock-chase"},
    {"name": "Chelmsford", "slug": "chelmsford"},
    {"name": "Cheltenham", "slug": "cheltenham"},
    {"name": "Colchester", "slug": "colchester"},
    {"name": "Coalville", "slug": "coalville"},
    {"name": "Corby", "slug": "corby"},
    {"name": "Crewe", "slug": "crewe"},
    {"name": "Doncaster", "slug": "doncaster"},
    {"name": "Dronfield", "slug": "dronfield"},
    {"name": "Dudley", "slug": "dudley"},
    {"name": "Grantham", "slug": "grantham"},
    {"name": "Great Yarmouth", "slug": "great-yarmouth"},
    {"name": "Guildford", "slug": "guildford"},
    {"name": "Halifax", "slug": "halifax"},
    {"name": "Hemel Hempstead", "slug": "hemel-hempstead"},
    {"name": "High Wycombe", "slug": "high-wycombe"},
    {"name": "Huddersfield", "slug": "huddersfield"},
    {"name": "Kidderminster", "slug": "kidderminster"},
    {"name": "King's Lynn", "slug": "kings-lynn"},
    {"name": "Kingswood", "slug": "kingswood"},
    {"name": "Kettering", "slug": "kettering"},
    {"name": "Leamington Spa", "slug": "leamington-spa"},
    {"name": "Leighton Buzzard", "slug": "leighton-buzzard"},
    {"name": "Lichfield", "slug": "lichfield"},
    {"name": "Lowestoft", "slug": "lowestoft"},
    {"name": "Loughborough", "slug": "loughborough"},
    {"name": "Luton", "slug": "luton"},
    {"name": "Macclesfield", "slug": "macclesfield"},
    {"name": "Mansfield", "slug": "mansfield"},
    {"name": "Newport", "slug": "newport"},
    {"name": "Newcastle-under-Lyme", "slug": "newcastle-under-lyme"},
    {"name": "Nuneaton", "slug": "nuneaton"},
    {"name": "Oldham", "slug": "oldham"},
    {"name": "Portsmouth", "slug": "portsmouth"},
    {"name": "Reading", "slug": "reading"},
    {"name": "Redditch", "slug": "redditch"},
    {"name": "Rochdale", "slug": "rochdale"},
    {"name": "Rotherham", "slug": "rotherham"},
    {"name": "Rugby", "slug": "rugby"},
    {"name": "Runcorn", "slug": "runcorn"},
    {"name": "Salford", "slug": "salford"},
    {"name": "Salisbury", "slug": "salisbury"},
    {"name": "Scunthorpe", "slug": "scunthorpe"},
    {"name": "Slough", "slug": "slough"},
    {"name": "Solihull", "slug": "solihull"},
    {"name": "Southend-on-Sea", "slug": "southend-on-sea"},
    {"name": "Stafford", "slug": "stafford"},
    {"name": "Stevenage", "slug": "stevenage"},
    {"name": "Stockport", "slug": "stockport"},
    {"name": "Sutton Coldfield", "slug": "sutton-coldfield"},
    {"name": "Taunton", "slug": "taunton"},
    {"name": "Tamworth", "slug": "tamworth"},
    {"name": "Telford", "slug": "telford"},
    {"name": "Thetford", "slug": "thetford"},
    {"name": "Walsall", "slug": "walsall"},
    {"name": "Warrington", "slug": "warrington"},
    {"name": "Watford", "slug": "watford"},
    {"name": "Wellingborough", "slug": "wellingborough"},
    {"name": "Welwyn Garden City", "slug": "welwyn-garden-city"},
    {"name": "Weston-super-Mare", "slug": "weston-super-mare"},
]

def generate_component_name(name):
    """Convert location name to React component name"""
    clean = name.replace("-", " ").replace("'", "").replace("–", " ")
    parts = clean.split()
    return "".join(word.capitalize() for word in parts) + "ServiceArea"

# Generate imports
imports = []
for loc in new_locations:
    comp = generate_component_name(loc['name'])
    imports.append(f'import {comp} from "./pages/{comp}";')

# Generate routes
routes = []
for loc in new_locations:
    comp = generate_component_name(loc['name'])
    routes.append(f'      <Route path="/service-areas/{loc["slug"]}" component={{{comp}}} />')

print("// Add these imports after line 49 (after WrexhamServiceArea):")
print("\n".join(imports))
print("\n// Add these routes after line 129 (after wrexham route):")
print("\n".join(routes))
