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
    beforeImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/wJwsaHcuUbnccMGP.webp",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YzKopXuBMqxwnNZz.webp",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "fire-escapes",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VSswHThKTIBhMiLV.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "internal-staircases",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VSswHThKTIBhMiLV.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "bridge-steelwork",
    beforeImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/tTMVDWvgFQknRYda.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ilOrbRRrXfwPVsjS.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "steel-containers",
    beforeImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/wDGKnMNLjhjxyvgq.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WFcCNTfDoapJZzQP.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "steel-containers",
    beforeImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YDDNYeFnHOUPKrow.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/LtptiQSbxiuiKbhI.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "fixed-ladders",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VSswHThKTIBhMiLV.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "warehouse-racking",
    beforeImage: "/warehouse-before.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VSswHThKTIBhMiLV.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "pipework",
    beforeImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/tTMVDWvgFQknRYda.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ilOrbRRrXfwPVsjS.jpg",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  {
    serviceId: "telecom-towers",
    beforeImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/tTMVDWvgFQknRYda.jpg",
    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ilOrbRRrXfwPVsjS.jpg",
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
