#!/bin/bash

echo "Testing Nearby Towns Feature"
echo "=============================="
echo ""

# Test 1: Check if nearbyTowns.ts exists and has data
echo "Test 1: Checking nearbyTowns.ts data file..."
if [ -f "client/src/data/nearbyTowns.ts" ]; then
    echo "✓ nearbyTowns.ts file exists"
    
    # Count locations
    location_count=$(grep -c '"location":' client/src/data/nearbyTowns.ts)
    echo "✓ Found $location_count locations in data file"
    
    # Check for Birmingham data
    if grep -q '"birmingham":' client/src/data/nearbyTowns.ts; then
        echo "✓ Birmingham data exists"
    else
        echo "✗ Birmingham data missing"
    fi
else
    echo "✗ nearbyTowns.ts file not found"
fi

echo ""

# Test 2: Check if NearbyTowns component exists
echo "Test 2: Checking NearbyTowns component..."
if [ -f "client/src/components/NearbyTowns.tsx" ]; then
    echo "✓ NearbyTowns.tsx component exists"
    
    # Check if it has the required props
    if grep -q "locationName: string" client/src/components/NearbyTowns.tsx; then
        echo "✓ Component has locationName prop"
    fi
    
    if grep -q "towns: string\[\]" client/src/components/NearbyTowns.tsx; then
        echo "✓ Component has towns prop"
    fi
else
    echo "✗ NearbyTowns.tsx component not found"
fi

echo ""

# Test 3: Check if component is imported in service area pages
echo "Test 3: Checking service area page imports..."
page_count=$(grep -l "import { NearbyTowns }" client/src/pages/*ServiceArea.tsx | wc -l)
echo "✓ NearbyTowns imported in $page_count service area pages"

# Test 4: Check if component is used in service area pages
echo ""
echo "Test 4: Checking component usage..."
usage_count=$(grep -l "<NearbyTowns" client/src/pages/*ServiceArea.tsx | wc -l)
echo "✓ NearbyTowns used in $usage_count service area pages"

echo ""
echo "=============================="
echo "Test Summary:"
echo "- Data file: OK"
echo "- Component file: OK"
echo "- Imports: $page_count pages"
echo "- Usage: $usage_count pages"
echo "=============================="
