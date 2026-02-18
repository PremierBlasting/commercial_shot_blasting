#!/bin/bash

echo "Verifying LocalBusinessSchema implementation across all service area pages..."
echo "=============================================================================="
echo ""

total_pages=0
pages_with_schema=0
pages_with_location_data=0

for file in client/src/pages/*ServiceArea.tsx; do
    ((total_pages++))
    filename=$(basename "$file")
    
    has_import=$(grep -c "import.*LocalBusinessSchema" "$file" || echo "0")
    has_component=$(grep -c "<LocalBusinessSchema" "$file" || echo "0")
    has_location_data=$(grep -c "locationData\[" "$file" || echo "0")
    
    if [ "$has_import" -gt "0" ] && [ "$has_component" -gt "0" ]; then
        if [ "$has_location_data" -gt "0" ]; then
            echo "✓  $filename: Complete (import + component + locationData)"
            ((pages_with_schema++))
            ((pages_with_location_data++))
        else
            echo "⚠️  $filename: Has schema but not using locationData"
            ((pages_with_schema++))
        fi
    elif [ "$has_import" -gt "0" ] || [ "$has_component" -gt "0" ]; then
        echo "⚠️  $filename: Incomplete (import: $has_import, component: $has_component)"
    else
        echo "✗  $filename: Missing structured data"
    fi
done

echo ""
echo "=============================================================================="
echo "Summary:"
echo "  Total pages: $total_pages"
echo "  Pages with schema: $pages_with_schema"
echo "  Pages using locationData: $pages_with_location_data"
echo "=============================================================================="

if [ "$pages_with_schema" -eq "$total_pages" ]; then
    echo "✓ All pages have structured data implemented!"
    exit 0
else
    echo "⚠️  Some pages are missing structured data"
    exit 1
fi
