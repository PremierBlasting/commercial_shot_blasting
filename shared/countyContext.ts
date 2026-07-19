/**
 * Unique local context paragraphs for each county.
 * Used on town/service-area pages to give each page a county-specific
 * intro sentence that improves uniqueness signals for Google.
 *
 * Key: county slug (matches countyData.ts slug field)
 * Value: 2–3 sentence paragraph referencing local industries, geography, or landmarks.
 */
export const countyContext: Record<string, string> = {
  "bedfordshire": "Bedfordshire is home to a strong logistics and distribution sector centred around Luton and Bedford, with large warehouse complexes and industrial estates requiring regular surface preparation and protective coating work. The county's proximity to the M1 and A1 makes it a key hub for construction and manufacturing supply chains, generating consistent demand for structural steel shot blasting.",

  "cambridgeshire": "Cambridgeshire supports a rapidly expanding construction sector driven by the Cambridge tech corridor and major housing developments across Peterborough and Ely. The county's extensive agricultural and food-processing industries also generate significant demand for plant and machinery shot blasting and protective coating services.",

  "hertfordshire": "Hertfordshire's dense industrial and commercial property market — stretching from Watford to Stevenage — includes a high concentration of steel-framed warehouses, distribution centres, and manufacturing facilities that regularly require shot blasting and surface preparation. The county's position on the M25 and A1(M) corridors makes it one of the most active areas for commercial construction in the South East.",

  "norfolk": "Norfolk's agricultural heartland supports a large fleet of farm machinery, grain storage structures, and steel-framed agricultural buildings that require regular rust removal and protective coating. The county's coastal exposure — particularly around Great Yarmouth and the North Sea energy sector — accelerates corrosion on structural steelwork, making SA2.5 shot blasting essential for long-term asset protection.",

  "suffolk": "Suffolk combines a thriving agricultural sector with a growing industrial base around Ipswich and Felixstowe — one of the UK's busiest container ports — creating strong demand for container shot blasting, structural steelwork preparation, and plant and machinery restoration. The county's coastal and estuarine environment also accelerates corrosion on steel structures, making regular surface preparation critical.",

  "derbyshire": "Derbyshire has a proud industrial heritage rooted in steel fabrication, engineering, and manufacturing — particularly around Derby, Chesterfield, and the Amber Valley. The county's active construction sector and large number of steel fabricators and engineering firms generate consistent demand for structural steel shot blasting, rust removal, and protective coating preparation.",

  "leicestershire": "Leicestershire is one of the UK's most important logistics and distribution hubs, with the East Midlands Airport cargo zone and major distribution parks around Hinckley, Lutterworth, and Leicester generating large volumes of steel-framed warehouse construction. The county's strong manufacturing base — including automotive components and food processing — also drives demand for plant and machinery shot blasting.",

  "lincolnshire": "Lincolnshire's vast agricultural landscape supports one of the UK's largest concentrations of farm buildings, grain stores, and agricultural machinery, all of which require regular shot blasting and protective coating to combat the county's exposed, moisture-rich environment. The county also has a significant food processing and engineering sector around Lincoln and Grimsby that generates demand for industrial surface preparation.",

  "northamptonshire": "Northamptonshire sits at the heart of the UK's logistics triangle, with major distribution centres and steel-framed warehouses concentrated around Daventry, Corby, and Northampton. The county's long history in steel manufacturing — particularly in Corby — means there is a well-established base of fabricators and engineering firms requiring structural steel shot blasting and surface preparation services.",

  "nottinghamshire": "Nottinghamshire has a diverse industrial base spanning construction, engineering, and food manufacturing, with significant steel fabrication activity around Nottingham, Mansfield, and Newark. The county's ongoing regeneration projects and new commercial developments generate strong demand for structural steelwork preparation, factory cladding restoration, and protective coating services.",

  "herefordshire": "Herefordshire's predominantly rural economy supports a large number of agricultural and equestrian steel structures — from cattle housing and grain stores to arena steelwork — that require regular shot blasting to combat the county's wet, border climate. The county also has a growing food and drink manufacturing sector around Hereford that generates demand for plant and machinery surface preparation.",

  "shropshire": "Shropshire's mix of rural agriculture and light manufacturing creates consistent demand for shot blasting services across farm buildings, steel-framed commercial units, and industrial plant. The county's border location — with easy access into Wales and the West Midlands — means our mobile units regularly serve clients across the full width of the Marches region.",

  "staffordshire": "Staffordshire has a rich industrial heritage in ceramics, engineering, and steel fabrication, with active manufacturing clusters around Stoke-on-Trent, Tamworth, and Burton upon Trent. The county's strong construction sector and large number of steel fabricators and engineering workshops generate consistent demand for structural steel shot blasting, rust removal, and factory cladding preparation.",

  "warwickshire": "Warwickshire's central location on the M40 and M6 corridors makes it a key area for logistics, automotive supply chain, and construction activity, with major steel-framed developments around Coventry, Rugby, and Leamington Spa. The county's proximity to the West Midlands manufacturing heartland also means there is strong demand for plant and machinery shot blasting and industrial surface preparation.",

  "west-midlands": "The West Midlands is one of the UK's most industrially active regions, with a dense concentration of steel fabricators, engineering firms, and construction contractors across Birmingham, Wolverhampton, Dudley, and the Black Country. The region's long manufacturing heritage and ongoing regeneration programmes generate some of the highest volumes of structural steel shot blasting and surface preparation work in England.",

  "worcestershire": "Worcestershire's mix of light manufacturing, food processing, and agricultural industries — centred around Worcester, Redditch, and Kidderminster — creates steady demand for plant and machinery shot blasting, factory cladding restoration, and structural steelwork preparation. The county's rural areas also support a significant number of agricultural steel structures requiring regular protective coating maintenance.",

  "south-yorkshire": "South Yorkshire has one of the UK's strongest concentrations of steel fabricators, structural engineers, and construction contractors, rooted in Sheffield's world-famous steel industry and Rotherham's manufacturing heritage. The region's active construction sector — including major infrastructure projects and commercial developments — generates some of the highest volumes of structural steel shot blasting work in the country.",

  "west-yorkshire": "West Yorkshire's dense urban and industrial landscape — spanning Leeds, Bradford, Huddersfield, and Halifax — supports a large number of steel fabricators, engineering firms, and commercial construction projects that require regular shot blasting and surface preparation. The region's ongoing regeneration and infrastructure investment continues to drive strong demand for structural steelwork and factory cladding services.",

  "north-yorkshire": "North Yorkshire's diverse economy spans agricultural estates, food manufacturing, and light engineering, with large rural areas generating demand for farm building shot blasting and agricultural machinery restoration. The county's coastal exposure around Scarborough and Whitby also accelerates corrosion on structural steelwork, making regular surface preparation essential for long-term asset protection.",

  "cheshire": "Cheshire's strong chemical, pharmaceutical, and food manufacturing sectors — centred around Ellesmere Port, Northwich, and Crewe — generate significant demand for industrial plant and machinery shot blasting, pipeline preparation, and structural steelwork services. The county's proximity to the Port of Liverpool and Manchester's logistics hub also drives active commercial construction requiring surface preparation.",

  "gloucestershire": "Gloucestershire's growing commercial and industrial base — including aerospace manufacturing around Cheltenham and Gloucester, and active construction across the Cotswold fringe — generates consistent demand for structural steel shot blasting and protective coating preparation. The county's agricultural sector also supports a large number of farm buildings and rural steel structures requiring regular maintenance.",

  "north-devon": "North Devon's coastal and rural environment creates some of the most challenging corrosion conditions in England, with salt-laden air accelerating rust on structural steelwork, farm buildings, and marine infrastructure. The region's agricultural sector and growing tourism construction industry generate steady demand for shot blasting and protective coating services across a wide geographic area.",

  "somerset": "Somerset's agricultural and food processing industries — including the county's famous dairy and cider sectors — operate large fleets of machinery and steel-framed buildings that require regular shot blasting and protective coating to withstand the county's wet, mild climate. The region's growing construction activity around Taunton and Bridgwater also drives demand for structural steelwork preparation.",

  "wiltshire": "Wiltshire's mix of defence, aerospace, and agricultural industries — including major MOD sites around Salisbury Plain and Swindon's engineering heritage — generates demand for precision surface preparation on structural steel, plant, and specialist equipment. The county's active commercial construction sector and large rural estates also provide consistent work for mobile shot blasting services.",

  "buckinghamshire": "Buckinghamshire's proximity to London and the M40 corridor supports a high volume of commercial construction, logistics, and light manufacturing activity, particularly around Milton Keynes, Aylesbury, and High Wycombe. The county's strong construction pipeline and large number of steel-framed commercial developments generate consistent demand for structural steel shot blasting and surface preparation.",

  "greater-manchester": "Greater Manchester is one of the UK's most active regions for commercial construction, regeneration, and infrastructure investment, with major steel-framed developments across the city centre, Salford Quays, and the wider conurbation. The region's dense concentration of engineering firms, steel fabricators, and construction contractors makes it one of our highest-demand areas for structural steel shot blasting and factory cladding services.",

  "essex": "Essex's position on the Thames Estuary and its proximity to London make it one of the most active counties for commercial and industrial construction, with large logistics parks, steel-framed warehouses, and infrastructure projects across Basildon, Chelmsford, and Thurrock. The county's coastal and estuarine environment also accelerates corrosion on structural steelwork, making regular shot blasting and protective coating essential.",

  "berkshire": "Berkshire's strong commercial and technology sector — centred around Reading, Slough, and the M4 corridor — supports a high volume of steel-framed office, logistics, and data centre construction that requires surface preparation and protective coating. The county's proximity to Heathrow and London also drives active infrastructure and industrial maintenance work.",

  "hampshire": "Hampshire's diverse economy spans defence, aerospace, maritime, and commercial construction, with major employers around Southampton, Portsmouth, and Farnborough generating consistent demand for structural steel shot blasting and protective coating services. The county's extensive coastline and naval heritage also create significant demand for corrosion prevention on marine and industrial steelwork.",

  "lancashire": "Lancashire's strong manufacturing and engineering heritage — rooted in Preston, Blackburn, and Burnley — supports a large base of steel fabricators, engineering workshops, and industrial facilities that require regular shot blasting and surface preparation. The county's active construction sector and significant agricultural areas also generate demand for structural steelwork, factory cladding, and farm building services.",

  "east-wales": "East Wales — spanning the border counties of Wrexham, Flintshire, and Powys — has a strong industrial heritage in steel, chemicals, and manufacturing, with active fabrication and engineering firms generating consistent demand for structural steel shot blasting. The region's agricultural sector and rural steel structures also benefit from regular protective coating maintenance in the wet Welsh climate.",

  "cumbria": "Cumbria's combination of heavy industry around Barrow-in-Furness and Workington, nuclear energy at Sellafield, and a vast agricultural hinterland creates diverse demand for shot blasting services across structural steelwork, plant and machinery, and farm buildings. The county's exposed coastal and upland environment significantly accelerates corrosion, making SA2.5 surface preparation essential for long-term asset protection.",

  "durham": "County Durham's industrial legacy in coal, steel, and engineering has given way to a modern economy of manufacturing, logistics, and construction, with active development around Durham City, Newton Aycliffe, and the Tees Valley. The region's significant number of steel fabricators, engineering firms, and construction contractors generates strong demand for structural steel shot blasting and surface preparation.",

  "tyne-and-wear": "Tyne and Wear's proud shipbuilding and engineering heritage underpins a modern industrial base of steel fabrication, offshore energy, and construction across Newcastle, Sunderland, and Gateshead. The region's coastal exposure and active construction sector — including major regeneration projects along the Tyne and Wear rivers — generate consistent demand for structural steel shot blasting and corrosion prevention.",

  "northumberland": "Northumberland's vast rural landscape supports a large number of agricultural estates, farm buildings, and rural steel structures that require regular shot blasting and protective coating to withstand the county's exposed, windswept climate. The county also has growing renewable energy infrastructure — including wind farm steelwork and substations — that requires specialist surface preparation and corrosion protection.",

  "bristol": "Bristol is one of the UK's fastest-growing cities for commercial construction and regeneration, with major steel-framed developments across the city centre, Temple Quarter, and the wider Bristol Urban Area generating consistent demand for structural steel shot blasting and surface preparation. The city's strong aerospace, engineering, and creative industries also produce significant volumes of plant and machinery requiring specialist surface treatment.",

  "merseyside": "Merseyside's industrial heritage in shipbuilding, engineering, and manufacturing — centred around Liverpool, Birkenhead, and the Mersey waterfront — creates strong demand for structural steel shot blasting, marine surface preparation, and factory cladding restoration. The region's ongoing regeneration and major infrastructure investment, including the Liverpool2 deep-water terminal, continue to drive active construction requiring specialist surface preparation.",

  "oxfordshire": "Oxfordshire's diverse economy spans automotive manufacturing at Cowley, defence and research facilities around Harwell and Culham, and a rapidly growing commercial construction sector across Oxford and Bicester. The county's strong engineering and technology base generates consistent demand for structural steel shot blasting, plant and machinery preparation, and specialist surface treatment services.",

  "surrey": "Surrey's proximity to London and the M25 corridor supports a high volume of commercial construction, logistics, and light industrial activity, with steel-framed warehouses, data centres, and commercial developments across Guildford, Woking, and the Thames Valley generating consistent demand for structural steel shot blasting. The county's affluent residential and heritage property market also creates demand for specialist metalwork restoration and protective coating services."
};
