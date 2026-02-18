#!/bin/bash

# Remove duplicate NearbyTowns imports from service area pages

FILES=(
  "client/src/pages/ChesterServiceArea.tsx"
  "client/src/pages/CoventryServiceArea.tsx"
  "client/src/pages/GloucesterServiceArea.tsx"
  "client/src/pages/HerefordServiceArea.tsx"
  "client/src/pages/LeicesterServiceArea.tsx"
  "client/src/pages/StAlbansServiceArea.tsx"
)

for file in "${FILES[@]}"; do
  echo "Processing $file..."
  
  # Create temp file with duplicates removed
  awk '
    /import { NearbyTowns } from "@\/components\/NearbyTowns";/ {
      if (!seen_nearby) {
        seen_nearby = 1
        print
      }
      next
    }
    /import { nearbyTownsData } from "@\/data\/nearbyTowns";/ {
      if (!seen_data) {
        seen_data = 1
        print
      }
      next
    }
    { print }
  ' "$file" > "$file.tmp"
  
  mv "$file.tmp" "$file"
  echo "  ✓ Removed duplicates"
done

echo "Done!"
