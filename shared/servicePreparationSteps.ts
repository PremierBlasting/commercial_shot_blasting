
export interface PreparationStep {
  title: string;
  text: string;
}

export const servicePreparationSteps: Record<string, PreparationStep[]> = {
  'default': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free, no-obligation site visit. Our team will assess the surfaces, confirm the blast standard required, and provide a written quote. Call 07721 375756 or use our online form.' },
    { title: 'Clear the Work Area', text: 'Ensure the surfaces to be blasted are accessible. Remove vehicles, equipment, or materials stored directly adjacent to the work area. A clear 2–3 metre perimeter around the blast zone is ideal.' },
    { title: 'Arrange Site Access', text: 'Confirm access for our mobile unit — typically a van or small lorry. Advise us of any height restrictions, locked gates, or site induction requirements so we can plan accordingly.' },
    { title: 'Notify Relevant Personnel', text: 'Inform your site supervisor, facilities manager, or health and safety officer that shot blasting work is scheduled. Ensure any affected staff are briefed on the work area and any temporary access restrictions.' },
    { title: 'Coordinate Coating Application', text: 'Arrange for protective coating or primer to be applied as soon as possible after blasting — ideally within 4 hours for steel surfaces. Discuss timing with your coating contractor in advance so there is no delay between blasting and coating.' }
  ],
  'structural-steel-frames': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free site visit. We will assess the steel frame components, confirm the blast standard (SA2.5 or SA3), and provide a detailed written quote.' },
    { title: 'Identify All Frame Components', text: 'Prepare a list or drawing of all structural steel components to be blasted — beams, columns, trusses, purlins, and fabricated sections. This helps us plan media usage, timing, and access requirements accurately.' },
    { title: 'Clear Access Around Steelwork', text: 'Ensure a clear working zone around all frame sections. Remove stored materials, equipment, and vehicles from the blast area. A minimum 3-metre clearance around each component is recommended.' },
    { title: 'Protect Adjacent Surfaces', text: 'Identify any surfaces adjacent to the steelwork that should not be blasted — concrete, brickwork, glazing, or existing coatings. Flag these for our team so we can apply appropriate masking before work begins.' },
    { title: 'Coordinate Coating or Galvanizing', text: 'Arrange for primer, paint, or galvanizing to be applied immediately after blasting. Steel surfaces begin to oxidise within hours of blasting — coordinate with your coating contractor to ensure no delay.' }
  ],
  'steel-containers': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free site visit. We will inspect the container, assess the extent of corrosion and coating failure, and provide a written quote for the work.' },
    { title: 'Position the Container for Access', text: 'Ensure the container is positioned so our team can access all external surfaces — ideally with at least 2 metres clearance on all sides. For internal blasting, confirm the container doors can be fully opened and secured.' },
    { title: 'Remove Contents and Clean Out', text: 'Empty the container completely before our arrival. Remove any loose debris, standing water, or contamination from the interior. A clean, empty container allows us to work safely and efficiently.' },
    { title: 'Identify Areas Requiring Special Attention', text: 'Mark or photograph any areas of heavy corrosion, previous repairs, or weld seams that require particular attention. Share this information with our team at the start of the job.' },
    { title: 'Arrange Coating Application', text: 'Coordinate with a coating contractor to apply protective paint or primer immediately after blasting. Steel surfaces will begin to flash rust within hours — prompt coating is essential for a durable result.' }
  ],
  'factory-cladding': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free site visit. We will assess the cladding condition, identify coating types (plastisol, paint, or bare metal), and provide a written quote.' },
    { title: 'Arrange Safe Access to Cladding', text: 'Confirm access arrangements for working at height — scaffolding, MEWP (cherry picker), or access platform. Advise us of any existing access equipment on site or whether we need to arrange our own.' },
    { title: 'Clear the Building Perimeter', text: 'Remove vehicles, equipment, and materials from the building perimeter below the work area. Blast media and debris will fall during work — a clear zone of at least 5 metres from the base of the building is recommended.' },
    { title: 'Notify Building Occupants', text: 'Inform all building occupants and staff that shot blasting work is taking place on the exterior. Advise them to keep windows and doors closed during blasting to prevent ingress of dust.' },
    { title: 'Coordinate Recoating', text: 'Arrange for new cladding coating or primer to be applied promptly after blasting. Exposed bare metal cladding will begin to oxidise quickly — coordinate with your coating contractor to minimise the gap between blasting and recoating.' }
  ],
  'fire-escapes': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free site visit. We will assess the fire escape structure, check for any structural concerns, and provide a written quote for the blasting work.' },
    { title: 'Confirm Alternative Egress Routes', text: 'Before work begins, confirm that alternative fire escape routes are available for building occupants. The fire escape being blasted must be taken out of service during the work — ensure your fire safety plan is updated accordingly.' },
    { title: 'Clear the Work Area Below', text: 'Remove vehicles, equipment, and materials from the area directly below and around the fire escape. Blast media and debris will fall during work — a clear zone of at least 3 metres is recommended.' },
    { title: 'Notify Building Management and Occupants', text: 'Inform your building manager, fire safety officer, and all occupants that the fire escape will be temporarily out of service. Provide clear signage directing people to alternative exits.' },
    { title: 'Arrange Coating or Galvanizing', text: 'Coordinate with a coating contractor or galvanizer to apply protective treatment immediately after blasting. Fire escapes are exposed to weather — prompt coating is essential to prevent rapid re-rusting.' }
  ],
  'floor-preparation': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free site visit. We will assess the floor condition, existing coatings or contamination, and confirm the surface profile required for your specified coating system.' },
    { title: 'Clear the Floor Area Completely', text: 'Remove all racking, equipment, vehicles, and materials from the area to be blasted. The floor must be completely clear before our team arrives. Partial clearance will result in incomplete blasting and may affect coating adhesion.' },
    { title: 'Clean the Floor Surface', text: 'Sweep and remove loose debris, standing water, and surface contamination before our arrival. Heavy grease or oil contamination may require degreasing treatment prior to blasting — advise us of any contaminated areas during the site survey.' },
    { title: 'Protect Drainage Points and Sensitive Areas', text: 'Identify drainage channels, floor joints, and any areas that should not be blasted. Our team will mask these before work begins, but flagging them in advance helps us plan the job accurately.' },
    { title: 'Arrange Coating Application', text: 'Coordinate with your resin or epoxy coating contractor to apply the floor coating promptly after blasting. The surface profile created by shot blasting is optimal for coating adhesion — delay increases the risk of contamination and reduced adhesion.' }
  ],
  'warehouse-racking': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free site visit. We will assess the racking components, confirm the extent of rust or coating failure, and provide a written quote.' },
    { title: 'Disassemble Racking Components', text: 'For optimal blasting results, racking uprights, beams, and frames should be disassembled before our arrival. Confirm with our team whether in-situ blasting or component blasting is the right approach for your racking system.' },
    { title: 'Remove All Stored Goods', text: 'Ensure all pallets, goods, and materials are removed from the racking before work begins. The racking must be completely empty and, where possible, disassembled for access.' },
    { title: 'Identify Components Requiring Replacement', text: 'Before blasting, inspect racking components for damage, bending, or cracking that may make them unsuitable for reuse. Blasting will not repair structural damage — identify and replace damaged components before recoating.' },
    { title: 'Arrange Powder Coating or Painting', text: 'Coordinate with a powder coating or painting contractor to apply new coating promptly after blasting. Bare steel racking components will begin to oxidise quickly — prompt coating is essential.' }
  ],
  'plant-machinery': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free site visit. We will assess the machinery, identify sensitive components, and provide a written quote for the blasting work.' },
    { title: 'Isolate and De-energise the Equipment', text: 'Before our team arrives, ensure all machinery to be blasted is fully isolated from electrical, hydraulic, and pneumatic supplies. Follow your site lockout/tagout procedure. Our team will not blast energised equipment.' },
    { title: 'Protect Sensitive Components', text: 'Identify bearings, seals, electrical connections, gauges, and other sensitive components that must not be blasted. Our team will mask these before work begins, but a list or marked-up drawing prepared in advance speeds up the process.' },
    { title: 'Clear the Work Area', text: 'Ensure a clear working zone around the machinery. Remove adjacent equipment, materials, and vehicles from the blast area. A minimum 3-metre clearance is recommended.' },
    { title: 'Arrange Coating Application', text: 'Coordinate with a painting or coating contractor to apply protective treatment promptly after blasting. Bare steel machinery surfaces will begin to oxidise within hours — prompt coating is essential for a durable result.' }
  ],
  'commercial-vehicles': [
    { title: 'Request a Free Site Survey', text: 'Contact us to arrange a free site visit. We will assess the vehicle or machinery, confirm the extent of rust and corrosion, and provide a written quote.' },
    { title: 'Remove Glass, Rubber Seals, and Trim', text: 'Where possible, remove or protect glass panels, rubber seals, plastic trim, and any non-metal components before our arrival. These items can be damaged by shot blasting and should be removed or masked before work begins.' },
    { title: 'Drain Fluids and Disconnect Electrics', text: 'Drain fuel, oil, and coolant from the vehicle before blasting. Disconnect the battery and protect all electrical connectors, sensors, and wiring looms. Advise our team of any components that cannot be removed.' },
    { title: 'Confirm Access and Working Space', text: 'Ensure the vehicle is positioned in a location with sufficient space for our team to work around all sides — typically a minimum of 2 metres clearance. Confirm access for our mobile unit.' },
    { title: 'Arrange Primer and Painting', text: 'Coordinate with a vehicle painter or coating contractor to apply primer and topcoat promptly after blasting. Bare metal vehicle bodywork will begin to oxidise within hours — prompt priming is essential.' }
  ]
};

export function getPreparationSteps(serviceId: string): PreparationStep[] {
  return servicePreparationSteps[serviceId] || servicePreparationSteps['default'];
}
