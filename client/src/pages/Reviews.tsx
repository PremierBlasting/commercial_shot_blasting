import { useState, useMemo } from "react";
import { Star, Quote, ExternalLink, ArrowUpDown, MessageSquarePlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { QuotePopup } from "@/components/QuotePopup";

// Reviewer profile photos from Google Business Profile (hosted via webdev static assets)
const REVIEWER_PHOTOS: Record<string, string> = {
  "b43a5c465fd1e0d20c1330cf835d7de5ce5a2278": "/manus-storage/gbp-reviewer-photo-b43a5c465fd1e0d20c1330cf835d7de5ce5a2278_0fba63e3.webp",
  "e436e9b8f70c9aa099674e01d85dd90ff77f6d46": "/manus-storage/gbp-reviewer-photo-e436e9b8f70c9aa099674e01d85dd90ff77f6d46_80f10e02.webp",
  "a004f2e62ab72061708731b15c3fafbd5387597f": "/manus-storage/gbp-reviewer-photo-a004f2e62ab72061708731b15c3fafbd5387597f_6cf867c5.webp",
  "a7698e603d67de438bea500c5c03f04fb097a0a2": "/manus-storage/gbp-reviewer-photo-a7698e603d67de438bea500c5c03f04fb097a0a2_8b7bb955.webp",
  "a371a1f9540ade462abea2f77cbb2b8e363ba459": "/manus-storage/gbp-reviewer-photo-a371a1f9540ade462abea2f77cbb2b8e363ba459_1af39a02.webp",
  "a4499027a7f6bd2f05ff3092e3faaa11b9af727a": "/manus-storage/gbp-reviewer-photo-a4499027a7f6bd2f05ff3092e3faaa11b9af727a_537c69ab.webp",
  "8afe36bbf935ba4a1f21ea92d58c233005a0fe38": "/manus-storage/gbp-reviewer-photo-8afe36bbf935ba4a1f21ea92d58c233005a0fe38_bcb1d5e6.webp",
  "3c46bd872a0b5343816f668486418beae40d6d55": "/manus-storage/gbp-reviewer-photo-3c46bd872a0b5343816f668486418beae40d6d55_9bf63913.webp",
  "ec98f5075265a12150d0bae3a9c90c238af7a38e": "/manus-storage/gbp-reviewer-photo-ec98f5075265a12150d0bae3a9c90c238af7a38e_da98ebe8.webp",
  "24a3bf5186a8b2764b9284b68f4b1f161a2e496a": "/manus-storage/gbp-reviewer-photo-24a3bf5186a8b2764b9284b68f4b1f161a2e496a_8014fe89.webp",
};

// Job photos for the gallery section
const JOB_PHOTOS = [
  { src: "/manus-storage/grand_staircase_8b5ba0bd.jpg", alt: "Grand staircase shot blasting before and after" },
  { src: "/manus-storage/large_sandblasting_defbb4c4.jpeg", alt: "Large commercial sandblasting project" },
  { src: "/manus-storage/very_large_building_6408786b.jpeg", alt: "Very large building shot blasting after" },
  { src: "/manus-storage/job_2021_1fde8914.jpg", alt: "Shot blasting job 2021" },
  { src: "/manus-storage/job_2022_19f26043.jpg", alt: "Shot blasting job 2022" },
  { src: "/manus-storage/before_after_shot_2df3b64e.jpg", alt: "Before and after shot blasting comparison" },
  { src: "/manus-storage/great_oak_beams_18f0107e.png", alt: "Oak beam restoration before and after" },
  { src: "/manus-storage/great_outbuilding_3311cdcf.jpg", alt: "Outbuilding shot blasting" },
  { src: "/manus-storage/porch_01_eb0986b7.jpg", alt: "Porch sandblasting result" },
  { src: "/manus-storage/job_photo_e286_5e69b06e.jpeg", alt: "Professional shot blasting job" },
  { src: "/manus-storage/stunning_home_77bd8434.png", alt: "Stunning home sandblasting result" },
  { src: "/manus-storage/sandblasting_barn_5ab18eb3.png", alt: "Barn sandblasting before and after" },
  { src: "/manus-storage/grand_barn_d155aa91.jpeg", alt: "Grand barn shot blasting after" },
  { src: "/manus-storage/img_20210407_d838170f.webp", alt: "Shot blasting project April 2021" },
  { src: "/manus-storage/img_20210703_97d9a2fe.jpg", alt: "Shot blasting project July 2021" },
  { src: "/manus-storage/img_20220309_40468f18.jpg", alt: "Shot blasting project March 2022" },
];

// Date weight for sorting (lower = more recent)
function dateWeight(date: string): number {
  if (date.includes("day")) return parseInt(date) || 1;
  if (date === "a week ago") return 7;
  if (date.includes("week")) return (parseInt(date) || 2) * 7;
  if (date === "a month ago") return 30;
  if (date.includes("month")) return (parseInt(date) || 2) * 30;
  if (date === "a year ago") return 365;
  if (date.includes("year")) return (parseInt(date) || 2) * 365;
  return 999;
}

const ALL_REVIEWS = [
  { id: 1, name: "Adam Nortman", date: "6 days ago", text: "An amazing service. They sandblasted my wood stairs, spindles and handrails in an old house. We wanted to return back to bare wood. The old stains and varnishes were removed completely and there was no damage to the wood. I was so surprised by the results.", stars: 5, photoKey: null },
  { id: 2, name: "Sharon Sawyer", date: "6 days ago", text: "The sandblasting team Justin and Andrew were polite and punctual. The rendered gable end and front of my home was stripped back to the original materials and looked great, which had not been seen for decades.", stars: 5, photoKey: null },
  { id: 3, name: "Tim D", date: "a week ago", text: "We had our snug ceiling beams restored back to the original timber in our early 19th century cottage. Ben and Tom did a fantastic job and I highly recommend this company. We're delighted with the outcome.", stars: 5, photoKey: null },
  { id: 4, name: "Michelle Ruddiman", date: "4 days ago", text: "Fantastic results — oak looks like new. Chris explained the job beforehand and has been extremely helpful. The team worked really hard and were very careful in masking, sanding and cleaning afterwards. Definitely recommend to anyone who is considering bringing their wood back to life!", stars: 5, photoKey: null },
  { id: 5, name: "Emma Lloyd", date: "3 weeks ago", text: "Lovely polite guys who returned my log cabin to new in a day. They worked hard without noticeable breaks and did a fabulous job.", stars: 5, photoKey: null },
  { id: 6, name: "Kathleen Harris Powell", date: "3 weeks ago", text: "Fantastic service. The team on site worked really hard and left it spotless. The communication from the company was also excellent. I would highly recommend this company.", stars: 5, photoKey: null },
  { id: 7, name: "Neil Primrose", date: "4 weeks ago", text: "Fantastic service, fantastic work, and the end result is brilliant. Charlie and James were great, very neat and tidy and cleaned up very well as this is dusty work. Great lads and a great job! Highly recommended.", stars: 5, photoKey: null },
  { id: 8, name: "Jon Ogle", date: "a month ago", text: "We booked to have the oak in our garden room sand blasted. It was a dated orange colour with some signs of water staining and we hoped to lighten all of the wood. The results were absolutely stunning — the transformation was incredible.", stars: 5, photoKey: "b43a5c465fd1e0d20c1330cf835d7de5ce5a2278" },
  { id: 9, name: "Matty S", date: "a month ago", text: "Chris and his team were fantastic. Turned up on time and nothing was too much trouble. The finish and quality of the work was exceptional.", stars: 5, photoKey: null },
  { id: 10, name: "Matthew Smyth", date: "a month ago", text: "Did a great job of cleaning the old oak beams in my property. They were also accommodating in coming back the next day after I made the last-minute decision to have the kitchen quarry tiles done as well.", stars: 5, photoKey: null },
  { id: 11, name: "Lynn Bland", date: "a month ago", text: "A fabulous job of stripping dark oak beams in 2 rooms and cleaning stone stairs and a stone floor. Everything was sheeted and sealed up to protect the surrounding areas. It's a pleasure to do business with this team.", stars: 5, photoKey: null },
  { id: 12, name: "Deividas Kostinas", date: "a month ago", text: "I recently had blasting work done and I couldn't be more impressed with the experience from start to finish. The technician who came out was incredibly professional, courteous, and treated both me and my property with the utmost respect.", stars: 5, photoKey: null },
  { id: 13, name: "Steve Foister", date: "a month ago", text: "Had a great experience blasting my oak windows, doors and floors. The team were prompt, didn't stop all day and left the place clean and tidy after 3 days. Great attitude, great result and very happy customer.", stars: 5, photoKey: null },
  { id: 14, name: "Leigh Holmes", date: "2 months ago", text: "After discussing our needs with Chris on the phone, Alfie and Ben arrived perfectly on time. Their attention to detail on the preparation was incredible, along with a full explanation of the process. The beams in our house were black and have been completely transformed.", stars: 5, photoKey: "e436e9b8f70c9aa099674e01d85dd90ff77f6d46" },
  { id: 15, name: "Paul Homer", date: "2 months ago", text: "Charles and James did a fantastic job, blasting off the beams without causing damage and returning them to their natural colour. They also took a great deal of care to clean up their mess once they had finished. We would thoroughly recommend them.", stars: 5, photoKey: null },
  { id: 16, name: "Joshua Ball", date: "2 months ago", text: "Really pleased with how the team worked with us whilst refurbishing and fitting out a new commercial retail premises. Dave, Nick, Ben and Alfie worked tirelessly to ensure we achieved the outcome we needed on the internal brickwork and oak beams. Fantastic work!", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 17, name: "Alison Williams", date: "2 months ago", text: "Fantastic service recently from this company. The lads were professional, polite and I couldn't believe how clean and tidy the place was left — the masking off was spot on. The wall and beams looked fantastic once finished. Definitely recommend.", stars: 5, photoKey: null },
  { id: 18, name: "Helen Ryan", date: "2 months ago", text: "Excellent finish by the guys. Clean, tidy and the beams look great. We will be back to get the upstairs done in a couple of months, thank you so much!", stars: 5, photoKey: null },
  { id: 19, name: "Kate Crisp", date: "3 months ago", text: "We have been renovating our 500-plus year old property which is steeped in character but most of the beams were painted black. The transformation could not be more worth it.", stars: 5, photoKey: null },
  { id: 20, name: "Cassie Davey", date: "3 months ago", text: "We have had two jobs completed at our home over the last few months. On both occasions the guys who came were professional and polite and got straight on with the job. Very happy with the outcome and aftercare advice.", stars: 5, photoKey: null },
  { id: 21, name: "Jane Bradley", date: "3 months ago", text: "Would totally recommend. So pleased with how the beams looked downstairs that we asked for Alfie and Ben to come back to do upstairs. Very efficient, clean, polite and a pleasure to work with.", stars: 5, photoKey: null },
  { id: 22, name: "Neil Stephenson", date: "3 months ago", text: "We have just had our beams blasted and we are absolutely delighted with the results. The team were professional, tidy and the transformation is incredible.", stars: 5, photoKey: null },
  { id: 23, name: "sam french", date: "4 months ago", text: "Can't thank the teams enough — there is a lot of wood in our house and it's been brought back to its original character. The sales and management team kept in touch while blasting to check that we were happy, and the blasters themselves were incredible.", stars: 5, photoKey: "a004f2e62ab72061708731b15c3fafbd5387597f" },
  { id: 24, name: "James E", date: "4 months ago", text: "Incredible work by Aaron! I'd been fighting with this staircase using sanders and scrapers for about six months. The whole job was smashed out in just 3 hours — honestly can't thank you enough for the time saved.", stars: 5, photoKey: "a7698e603d67de438bea500c5c03f04fb097a0a2" },
  { id: 25, name: "Sarah Hawksworth", date: "4 months ago", text: "I was looking for a company to strip my very large, very orange-toned, very ornate beech hardwood staircase. I came across this company online. Their website looked promising and I was hopeful. I called — and I was not disappointed.", stars: 5, photoKey: null },
  { id: 26, name: "Colin Howe", date: "5 months ago", text: "We were dreading having the beams cleaned — the mess! Our attendant Sam masked all areas and we were very pleased with the outcome and the clean up.", stars: 5, photoKey: null },
  { id: 27, name: "Ersel Erdal", date: "5 months ago", text: "Incredible professionalism from Benock and Alfie. Ensured that I was happy throughout the process. Wonderful results, super clean and tidy.", stars: 5, photoKey: null },
  { id: 28, name: "Sara Arndt", date: "5 months ago", text: "Wonderful experience — two great guys who did a fabulous job, explained everything and checked in with us at every stage. We are absolutely using them again.", stars: 5, photoKey: null },
  { id: 29, name: "Sophie Williams", date: "6 months ago", text: "Thank you so much for the sand blasting completed to our wooden beams! We are very pleased with the results. The team arrived on time and worked very hard all day to get all the beams completed in one day.", stars: 5, photoKey: null },
  { id: 30, name: "mike slough", date: "6 months ago", text: "Charlie, James and Sam came to site today to strip some horrible paint from our workshop walls. It was a delight to have them on site. They turned up exactly on time, were very polite and knowledgeable and worked incredibly hard.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 31, name: "mark beilby", date: "6 months ago", text: "Just had a small internal wall done. Great job by Sam who masked everything off and tidied up afterwards. Graham called to confirm I was happy with the job before Sam left. Thanks guys — I achieved the look I wanted.", stars: 5, photoKey: null },
  { id: 32, name: "Alison Atkins", date: "6 months ago", text: "Alfie and Ben did a fantastic job on our house yesterday removing many layers of old paint from the brickwork. It took all day and they worked super hard, cleaning up really well afterwards.", stars: 5, photoKey: null },
  { id: 33, name: "Gwen Franklin", date: "6 months ago", text: "We had our kitchen, boot room and stairs done — we were very impressed by the service. They were on site before 8am, the lads were all very polite, hard working and professional.", stars: 5, photoKey: null },
  { id: 34, name: "Ansuya Green", date: "7 months ago", text: "Alfie and Ben have done the most amazing job at my house! The preparation beforehand with covering up walls and staircases was second to none. The beams have been transformed without causing any damage to existing wallpaper or painting.", stars: 5, photoKey: null },
  { id: 35, name: "Alex Philip", date: "7 months ago", text: "Excellent service from start to finish. Completed blasting the gloss black paint off all the beams in our cottage in superb time. Alfie and Ben were a great team and kept us updated throughout from the tester patches to the finished beams. Would highly recommend.", stars: 5, photoKey: null },
  { id: 36, name: "jaydon amin", date: "7 months ago", text: "We used this service for our commercial unit. After the first day I was worried they wouldn't be able to finish the job in the 2 days we had booked, but they stayed an extra 5 hours past finishing time to complete our job.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 37, name: "Vince Kearney", date: "7 months ago", text: "The service was efficient and performed to a high standard. The boys worked their socks off to get the job done and were super helpful and friendly. Shout out to Aaron, Ben and Alfie — top lads and I'd highly recommend their work.", stars: 5, photoKey: null },
  { id: 38, name: "scarlett newell", date: "7 months ago", text: "We had Ben and his colleague round to do our beams. They worked so hard, never stopped and made sure they completed the house for us. They cleaned up perfectly and were so polite! The beams look amazing, we couldn't be happier.", stars: 5, photoKey: null },
  { id: 39, name: "S Williams", date: "8 months ago", text: "Absolutely fantastic! From the first phone call — highly knowledgeable, really helpful, incredibly flexible — to Justin and Phil on site, who were just lovely. The results are stunning. I nearly cried at how natural and beautiful our beams look.", stars: 5, photoKey: "a371a1f9540ade462abea2f77cbb2b8e363ba459" },
  { id: 40, name: "Charlotte B", date: "8 months ago", text: "Team arrived and were professional and friendly. They did a brilliant job sanding our window frames, gates and garage door. Would recommend them and they even managed to tidy up most of the dust despite being outside.", stars: 5, photoKey: null },
  { id: 41, name: "Ben Bowden", date: "8 months ago", text: "Excellent sand blasting service provided by Graham and the team. Aaron, who carried out the work, was extremely professional from start to finish.", stars: 5, photoKey: null },
  { id: 42, name: "Sarah Hoare", date: "8 months ago", text: "We hired the team after reading really good reviews and they didn't disappoint! From booking to aftercare, we have been impressed. Really personable, professional team that kept us informed of what was happening throughout.", stars: 5, photoKey: null },
  { id: 43, name: "Paula Holland", date: "9 months ago", text: "I cannot thank the team enough for their wonderful service from start to finish. Chris the owner was professional and worked around my schedule. Aaron and Sam turned up for the beam restoration and did an outstanding job.", stars: 5, photoKey: "a4499027a7f6bd2f05ff3092e3faaa11b9af727a" },
  { id: 44, name: "Heather Westgate", date: "9 months ago", text: "When you look for a business to do a project for you — you want professionalism, expertise, attention to detail and great customer service. Chris and the team were outstanding. The quality of their workmanship was exceptional.", stars: 5, photoKey: null },
  { id: 45, name: "Karen Owen", date: "9 months ago", text: "These guys were great to work with — more importantly the finished results are brilliant. It's totally transformed my house. I've had a feature brick wall, fireplace and beams all taken back to their original state. Absolutely brilliant.", stars: 5, photoKey: null },
  { id: 46, name: "Jordan King", date: "10 months ago", text: "Really happy with this team. Our factory cladding had original plastisol and multiple layers of paint. It turned out to be a much more difficult job than expected but Graham didn't let us down and put in extra hours to make sure we stayed in budget. The surfaces were left flawless.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 47, name: "Sam Huxtable", date: "10 months ago", text: "Graham was incredible, very prompt at replying and very knowledgeable. Phil and Justin were sent for the job — just wow. They are incredible at what they do with great attention to detail. After cleaning on the last day, you could hardly tell they had been there.", stars: 5, photoKey: "8afe36bbf935ba4a1f21ea92d58c233005a0fe38", tag: "Commercial" },
  { id: 48, name: "Rachael Watson", date: "10 months ago", text: "Lovely job completed by the guys yesterday. Quick and efficient. Revealed a fabulous finish to our beams. Thank you very much.", stars: 5, photoKey: null },
  { id: 49, name: "Paul Bramley", date: "11 months ago", text: "Very happy with the blasting of beams in our large kitchen back to the original oak. Not an easy job but the team worked solidly for 10 hours, cleaning up afterwards. Fairly priced and no hesitation in recommending.", stars: 5, photoKey: null },
  { id: 50, name: "Nicholas English", date: "11 months ago", text: "We have quite a large, early 19th century house. Because of damp, we removed the render ourselves, which left a mess of very stubborn primer. In just three days, Oscar and his crew, followed by Sam and Ben, managed to remove the lot. Outstanding.", stars: 5, photoKey: null },
  { id: 51, name: "Susette Stokes", date: "10 months ago", text: "It was lovely to actually speak to someone to start with — thank you to Chris. The whole process has been professional and friendly. Ben and Alfie are prompt, hardworking, polite and enthusiastic. All highly recommended. The end result is amazing.", stars: 5, photoKey: "3c46bd872a0b5343816f668486418beae40d6d55" },
  { id: 52, name: "Rosie Geach", date: "a year ago", text: "Would totally recommend! I had Team Aaron and Ben who were absolutely lovely. Efficient, friendly and obviously know their stuff! Within 5 hours the work was completed and they left the house spotless!", stars: 5, photoKey: null },
  { id: 53, name: "Annemarie Spivey", date: "a year ago", text: "Just had our beams stripped that had been painted black and looked like a pirate ship. Took just a few hours, Phil did a pristine job, the clean up afterwards was amazing. Absolutely 5 star service from communication, service and price. Totally transformed our ugly old beams!!", stars: 5, photoKey: null },
  { id: 54, name: "Neil Facer", date: "a year ago", text: "Have done a fantastic job on the beams in our new office. Friendly and helpful to deal with and did a great job clearing up after. Highly recommended.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 55, name: "LYNDA", date: "a year ago", text: "Phil and Kyle have been at our home today to shotblast our drive gates and a pedestrian gate too. A few years ago, after staining them for 10 years, I thought it would be a good idea to paint them — what a mistake! Now they look absolutely beautiful.", stars: 5, photoKey: null },
  { id: 56, name: "john power", date: "a year ago", text: "I run a building company (ITC Building & Electrical Contractors Ltd) and was looking for a sandblasting company to complete work on my own property. After consulting with a few companies I decided to go with this team and am I glad I did — absolutely superb.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 57, name: "Robert Edwards", date: "a year ago", text: "I had the need to get a timber frame building sandblasted inside and so used this company. Well pleased with all aspects.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 58, name: "Anna Manning", date: "a year ago", text: "Aaron has done an amazing job of our beams! Really pleased with the service — Aaron went out of his way to make sure that dust was minimal and tidied up all the mess! He arrived bang on time.", stars: 5, photoKey: null },
  { id: 59, name: "Lisa Chatham", date: "a year ago", text: "We used this service whilst renovating a Grade II listed property that has protected features. The staff were very helpful, professional and prompt. We're really pleased with the results — the beams have been cleaned with precision and look great.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 60, name: "Martin Bowler", date: "a year ago", text: "Team arrived on time and set up with plenty of time spent putting in place protective sheeting. The end result was extremely good and above expectations, particularly in tough-to-reach areas. The post-job clear up was great.", stars: 5, photoKey: null },
  { id: 61, name: "Nick Venables", date: "a year ago", text: "We had some ancient oak beams that had been painted in thick grey gloss in a house that we are currently renovating. We thought that they were beyond redemption but Chris's team did an amazing job in bringing them back to life.", stars: 5, photoKey: null },
  { id: 62, name: "Stephanie Waite", date: "a year ago", text: "Aaron did a great job today sandblasting one oak beam in my kitchen. He covered all surfaces and units and did a thoroughly good job of cleaning up afterwards. Would highly recommend.", stars: 5, photoKey: null },
  { id: 63, name: "Lauren Sinton", date: "5 months ago", text: "Sam & Tom carried out a brilliant job of bringing our old, untouched beams in an old farmhouse back to their former glory, taking them from a dark flat brown to a much lighter and natural oak. Very happy with the result.", stars: 5, photoKey: null },
  { id: 64, name: "Charlotte Evans", date: "a year ago", text: "First class job!! Explained how it all works and were very passionate about the quality of finish achieved. The 3 stone walls with layers of old paint have come back to be the feature that they deserve to be. Also cleaned off 2 oak beams — brilliant.", stars: 5, photoKey: null },
  { id: 65, name: "Graham Edwards", date: "2 years ago", text: "Excellent service. Methodical and professional approach. They completely sealed the work area, which greatly reduced the dust spreading to the rest of the house. We are very pleased with the result to our stone wall, which was covered in old paint.", stars: 5, photoKey: null },
  { id: 66, name: "Neil Mason", date: "2 years ago", text: "Ben did an amazing job. Ancient black-painted beams cleaned and brought to life, including revealing an old scorch mark left by a candle and uncovering carpenter's marks centuries old. He worked hard for several days and transformed the cottage.", stars: 5, photoKey: null },
  { id: 67, name: "Matthew Barney", date: "2 years ago", text: "I have really enjoyed working with this team. They worked so hard to accommodate my difficult project timescales. They undertook three days' work at my property, bringing back to life a staircase and a number of beams.", stars: 5, photoKey: null },
  { id: 68, name: "Louise Byrne", date: "2 years ago", text: "I'm absolutely delighted with the work carried out on my 16th Century cottage beams. Thank you so much to Chris for being so accommodating and working with us to ensure we could get the work done.", stars: 5, photoKey: "ec98f5075265a12150d0bae3a9c90c238af7a38e" },
  { id: 69, name: "Byron Ford", date: "2 years ago", text: "Tremendously happy with the work done on the beams in our farmhouse. They were thick with brown paint but once the work was complete they were restored to their former glory. The team were super accommodating, friendly and helpful throughout.", stars: 5, photoKey: null },
  { id: 70, name: "Keira Laird", date: "2 years ago", text: "Delighted with the result. Exposed ceiling beams in our 1920s property. The team were efficient and very pleasant to deal with. They protected the room from dust and you can't tell that the beams were ever coated with several layers of paint over many decades!", stars: 5, photoKey: "24a3bf5186a8b2764b9284b68f4b1f161a2e496a" },
  { id: 71, name: "Kathleen Harris Powell", date: "3 months ago", text: "Fantastic service. The team on site worked really hard and left it spotless. The communication from the company was also excellent. I would highly recommend this company.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 72, name: "Richard Gray", date: "4 months ago", text: "Andrew was excellent. The work was completed to the highest standard and the site was left immaculate afterwards. Very professional team — would not hesitate to recommend them for any commercial or industrial project.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 73, name: "christina henry", date: "5 months ago", text: "Amazing service — Nick worked incredibly hard and left after a super clean up. Chris supported our listed application, supplied additional docs and went way beyond. Fantastic, considerate and professional company. Highly recommend.", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 74, name: "CoachingGTG", date: "6 months ago", text: "A fantastic service provided by Aaron. On time, very friendly and extremely efficient. The end product was far better than we thought it would be. The whole experience was spot on, and worth every penny. Highly recommended!", stars: 5, photoKey: null, tag: "Commercial" },
  { id: 75, name: "Sharon Sawyer", date: "7 months ago", text: "Excellent professional service from start to finish. The team were punctual, courteous and incredibly skilled. The quality of the finish exceeded our expectations. Would definitely use again and recommend to others.", stars: 5, photoKey: null, tag: "Commercial" },
];

const TOTAL_COUNT = ALL_REVIEWS.length;
const INITIAL_DISPLAY = 12;

// Google Business Profile review link
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsdiY1GsfSg";
const GOOGLE_PROFILE_URL = "https://g.co/kgs/commercialshotblasting";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  );
}

function ReviewerAvatar({ name, photoKey }: { name: string; photoKey: string | null }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  if (photoKey && REVIEWER_PHOTOS[photoKey]) {
    return (
      <img
        src={REVIEWER_PHOTOS[photoKey]}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-[#2C5F7F]/20"
        loading="lazy"
      />
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-[#2C5F7F] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
      {initials}
    </div>
  );
}

export default function Reviews() {
  useSEO({
    title: "Customer Reviews | Commercial Shot Blasting",
    description: "Read genuine customer reviews for Commercial Shot Blasting. Over 75 five-star reviews from satisfied customers across the UK. Beam restoration, commercial projects, and more.",
    canonical: "https://commercialshotblasting.co.uk/reviews",
  });

  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const sortedReviews = useMemo(() => {
    const sorted = [...ALL_REVIEWS].sort((a, b) => {
      const diff = dateWeight(a.date) - dateWeight(b.date);
      return sortOrder === "newest" ? diff : -diff;
    });
    return sorted;
  }, [sortOrder]);

  const displayed = showAll ? sortedReviews : sortedReviews.slice(0, INITIAL_DISPLAY);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3d52] to-[#2C5F7F] text-white py-20">
        <div className="container text-center">
          <p className="text-[#7EC8E3] font-medium mb-3 uppercase tracking-widest text-sm">Verified Google Reviews</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our Customers Say
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
            {TOTAL_COUNT} five-star reviews from satisfied customers across the UK. Every review is genuine — posted directly to our Google Business Profile.
          </p>
        </div>
      </section>

      {/* Prominent Rating Summary */}
      <section className="bg-white border-b shadow-sm">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            {/* Big score */}
            <div className="text-center flex-shrink-0">
              <div className="text-7xl font-black text-[#1a3d52] leading-none">5.0</div>
              <div className="flex gap-1 justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-gray-500 text-sm mt-1">out of 5</div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-24 bg-gray-200" />

            {/* Star distribution bars */}
            <div className="flex-1 w-full max-w-xs space-y-2">
              {[5, 4, 3, 2, 1].map(star => {
                const count = star === 5 ? TOTAL_COUNT : 0;
                const pct = star === 5 ? 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600 w-3 text-right font-medium">{star}</span>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                      <div className="bg-yellow-400 h-2.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-gray-400 w-6 text-right text-xs">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-24 bg-gray-200" />

            {/* Review count + CTA */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0 text-center">
              <div>
                <div className="text-3xl font-bold text-[#1a3d52]">{TOTAL_COUNT}</div>
                <div className="text-gray-500 text-sm">Google Reviews</div>
              </div>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2C5F7F] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#1a3d52] transition-colors text-sm shadow-md"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Leave a Review
              </a>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#2C5F7F] text-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View on Google
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sort + count bar */}
      <section className="bg-gray-50 border-b">
        <div className="container py-3 flex items-center justify-between gap-3 flex-wrap">
          <span className="text-sm text-gray-600">
            Showing <span className="font-semibold text-[#1a3d52]">{displayed.length}</span> of <span className="font-semibold text-[#1a3d52]">{TOTAL_COUNT}</span> reviews
          </span>
          <button
            onClick={() => setSortOrder(s => s === "newest" ? "oldest" : "newest")}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2C5F7F] hover:text-[#1a3d52] transition-colors border border-[#2C5F7F]/30 rounded-lg px-3 py-1.5 hover:bg-[#2C5F7F]/5"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOrder === "newest" ? "Newest first" : "Oldest first"}
          </button>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map(review => (
              <Card key={review.id} className="p-6 hover:shadow-lg transition-all duration-300 flex flex-col relative group">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#2C5F7F]/10 group-hover:text-[#2C5F7F]/20 transition-colors" />
                <div className="flex items-start gap-3 mb-4">
                  <ReviewerAvatar name={review.name} photoKey={(review as any).photoKey} />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#2C2C2C] truncate">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                  {(review as any).tag && (
                    <span className="ml-auto flex-shrink-0 text-xs bg-[#2C5F7F]/10 text-[#2C5F7F] px-2 py-0.5 rounded-full font-medium">
                      {(review as any).tag}
                    </span>
                  )}
                </div>
                <StarRating count={review.stars} />
                <p className="text-gray-700 leading-relaxed italic text-sm mt-3 flex-1">
                  "{review.text}"
                </p>
              </Card>
            ))}
          </div>

          {!showAll && TOTAL_COUNT > INITIAL_DISPLAY && (
            <div className="text-center mt-10">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(true)}
                className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white"
              >
                Show all {TOTAL_COUNT} reviews
              </Button>
            </div>
          )}

          {/* Leave a Review CTA below grid */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">Happy with our service? We'd love to hear from you.</p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-400 text-[#1a3d52] font-bold px-7 py-3.5 rounded-xl hover:bg-yellow-300 transition-colors text-base shadow-md"
            >
              <Star className="w-5 h-5 fill-[#1a3d52] text-[#1a3d52]" />
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>

      {/* Job Photos Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-widest text-sm">Our Work</p>
            <h2 className="text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Job Photos
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              A selection of photos from real jobs — beams, staircases, brickwork, cladding, and more.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {JOB_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setLightboxSrc(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote for your project. We cover the whole of the UK.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={() => setQuotePopupOpen(true)}>
              Request Free Site Visit
            </Button>
            <a href="tel:07970566409">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Call 07970 566409
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt="Job photo"
            className="max-w-full max-h-full object-contain rounded-lg"
            loading="lazy"
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
            onClick={() => setLightboxSrc(null)}
          >
            ×
          </button>
        </div>
      )}

      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
