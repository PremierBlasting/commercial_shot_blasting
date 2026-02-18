#!/bin/bash

echo "Checking NearbyTowns placement in all service area pages..."
echo "============================================================"
echo ""

error_count=0
warning_count=0

for file in client/src/pages/*ServiceArea.tsx; do
    filename=$(basename "$file")
    
    # Count occurrences of <NearbyTowns
    count=$(grep -c "<NearbyTowns" "$file" 2>/dev/null || echo "0")
    
    if [ "$count" -eq "0" ]; then
        echo "❌ $filename: NO NearbyTowns component found"
        ((error_count++))
    elif [ "$count" -gt "1" ]; then
        echo "⚠️  $filename: DUPLICATE NearbyTowns ($count instances)"
        # Show line numbers
        grep -n "<NearbyTowns" "$file" | sed 's/^/     Line /'
        ((warning_count++))
    else
        # Check if it's inside a component definition (indented more than 6 spaces before function/const)
        line_num=$(grep -n "<NearbyTowns" "$file" | cut -d: -f1)
        
        # Get context around the NearbyTowns usage
        context=$(sed -n "$((line_num-10)),$((line_num+2))p" "$file")
        
        # Check if it's inside a component (look for const/function definition nearby)
        if echo "$context" | grep -q "^const.*=.*{"; then
            echo "⚠️  $filename: NearbyTowns may be inside a component definition (line $line_num)"
            ((warning_count++))
        else
            echo "✓  $filename: OK (line $line_num)"
        fi
    fi
done

echo ""
echo "============================================================"
echo "Summary:"
echo "  Errors (missing): $error_count"
echo "  Warnings (duplicates/misplaced): $warning_count"
echo "============================================================"
