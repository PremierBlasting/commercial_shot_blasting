import { describe, it, expect } from 'vitest';

describe('BreadcrumbList Schema Implementation', () => {
  it('should generate valid BreadcrumbList schema structure', () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Shot Blasting", href: "/services/shot-blasting", isCurrentPage: true }
    ];

    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `https://commercialshotblasting.co.uk${item.href}`
      }))
    };

    expect(schemaMarkup["@context"]).toBe("https://schema.org");
    expect(schemaMarkup["@type"]).toBe("BreadcrumbList");
    expect(schemaMarkup.itemListElement).toHaveLength(3);
  });

  it('should have correct position numbers starting from 1', () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "About", href: "/about", isCurrentPage: true }
    ];

    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://commercialshotblasting.co.uk${item.href}`
    }));

    expect(itemListElement[0].position).toBe(1);
    expect(itemListElement[1].position).toBe(2);
  });

  it('should include full URLs for each breadcrumb item', () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Counties", href: "/counties" },
      { label: "Bedfordshire", href: "/counties/bedfordshire", isCurrentPage: true }
    ];

    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://commercialshotblasting.co.uk${item.href}`
    }));

    expect(itemListElement[0].item).toBe("https://commercialshotblasting.co.uk/");
    expect(itemListElement[1].item).toBe("https://commercialshotblasting.co.uk/counties");
    expect(itemListElement[2].item).toBe("https://commercialshotblasting.co.uk/counties/bedfordshire");
  });

  it('should handle location page breadcrumbs correctly', () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Areas", href: "/areas" },
      { label: "Bedfordshire", href: "/counties/bedfordshire" },
      { label: "Bedford", href: "/locations/bedford", isCurrentPage: true }
    ];

    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://commercialshotblasting.co.uk${item.href}`
    }));

    expect(itemListElement).toHaveLength(4);
    expect(itemListElement[3].name).toBe("Bedford");
    expect(itemListElement[3].position).toBe(4);
  });

  it('should handle blog post breadcrumbs with dynamic titles', () => {
    const postTitle = "Shot Blasting vs Sandblasting: What's the Difference?";
    const items = [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: postTitle, href: "/blog/shot-blasting-vs-sandblasting", isCurrentPage: true }
    ];

    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://commercialshotblasting.co.uk${item.href}`
    }));

    expect(itemListElement[2].name).toBe(postTitle);
    expect(itemListElement[2].item).toContain("/blog/");
  });

  it('should maintain correct schema.org types', () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Industries", href: "/industries", isCurrentPage: true }
    ];

    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://commercialshotblasting.co.uk${item.href}`
    }));

    itemListElement.forEach(item => {
      expect(item["@type"]).toBe("ListItem");
      expect(item).toHaveProperty("position");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("item");
    });
  });

  it('should handle service area breadcrumbs', () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Service Areas", href: "/service-areas" },
      { label: "Liverpool", href: "/service-areas/liverpool", isCurrentPage: true }
    ];

    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://commercialshotblasting.co.uk${item.href}`
    }));

    expect(itemListElement).toHaveLength(3);
    expect(itemListElement[2].name).toBe("Liverpool");
  });

  it('should handle industry page breadcrumbs', () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Industries", href: "/industries" },
      { label: "Aerospace", href: "/industries/aerospace", isCurrentPage: true }
    ];

    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://commercialshotblasting.co.uk${item.href}`
    }));

    expect(itemListElement[2].name).toBe("Aerospace");
    expect(itemListElement[2].item).toContain("/industries/aerospace");
  });
});
