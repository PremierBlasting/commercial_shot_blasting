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
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "fire-escapes",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "/warehouse-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "internal-staircases",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "/warehouse-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "bridge-steelwork",
    beforeImage: "/steel-frame-before.jpg",
    afterImage: "/steel-frame-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "steel-containers",
    beforeImage: "/tank-before-1.jpg",
    afterImage: "/tank-after-1.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "steel-containers",
    beforeImage: "/tank-before-2.jpg",
    afterImage: "/tank-after-2.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "fixed-ladders",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "/warehouse-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "warehouse-racking",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "/warehouse-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "pipework",
    beforeImage: "/steel-frame-before.jpg",
    afterImage: "/steel-frame-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "telecom-towers",
    beforeImage: "/steel-frame-before.jpg",
    afterImage: "/steel-frame-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "factory-cladding",
    beforeImage: "/factory-cladding-before-1.jpeg",
    afterImage: "/factory-cladding-after-1.jpeg",
    beforeLabel: "Before",
    afterLabel: "After"
  }
];

export function getServiceGallery(serviceId: string): ServiceGallery | undefined {
  return serviceGalleries.find(gallery => gallery.serviceId === serviceId);
}

export function getServiceGalleries(serviceId: string): ServiceGallery[] {
  return serviceGalleries.filter(gallery => gallery.serviceId === serviceId);
}
