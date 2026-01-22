export interface ServiceGallery {
  serviceId: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

export const serviceGalleries: ServiceGallery[] = [
  {
    serviceId: "structural-steel-frames",
    beforeImage: "/StructuralSteelFramesBefore.webp",
    afterImage: "/StructuralSteelFramesAfter.webp",
    beforeLabel: "Before: Rusted Steel Frame",
    afterLabel: "After: Shot Blasted & Ready"
  },
  {
    serviceId: "fire-escapes",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "/warehouse-after.jpg",
    beforeLabel: "Before: Corroded Structure",
    afterLabel: "After: Refurbished"
  },
  {
    serviceId: "internal-staircases",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "/warehouse-after.jpg",
    beforeLabel: "Before: Worn Steelwork",
    afterLabel: "After: Restored Finish"
  },
  {
    serviceId: "bridge-steelwork",
    beforeImage: "/steel-frame-before.jpg",
    afterImage: "/steel-frame-after.jpg",
    beforeLabel: "Before: Weathered Bridge Steel",
    afterLabel: "After: Protected Surface"
  },
  {
    serviceId: "steel-containers",
    beforeImage: "/steel-container-before.png",
    afterImage: "/steel-container-after.jpg",
    beforeLabel: "Before: Corroded Container",
    afterLabel: "After: Clean & Ready for Coating"
  },
  {
    serviceId: "fixed-ladders",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "/warehouse-after.jpg",
    beforeLabel: "Before: Rusted Access Equipment",
    afterLabel: "After: Safety Restored"
  },
  {
    serviceId: "warehouse-racking",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "/warehouse-after.jpg",
    beforeLabel: "Before: Corroded Racking",
    afterLabel: "After: Like-New Condition"
  },
  {
    serviceId: "pipework",
    beforeImage: "/steel-frame-before.jpg",
    afterImage: "/steel-frame-after.jpg",
    beforeLabel: "Before: Scaled Pipework",
    afterLabel: "After: Clean & Protected"
  },
  {
    serviceId: "telecom-towers",
    beforeImage: "/steel-frame-before.jpg",
    afterImage: "/steel-frame-after.jpg",
    beforeLabel: "Before: Weathered Tower",
    afterLabel: "After: Corrosion Protected"
  }
];

export function getServiceGallery(serviceId: string): ServiceGallery | undefined {
  return serviceGalleries.find(gallery => gallery.serviceId === serviceId);
}
