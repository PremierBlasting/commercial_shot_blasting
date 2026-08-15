import { describe, expect, it } from "vitest";
import { locationData } from "../shared/locationData";

const HIGH_POPULATION_TOWN_SLUGS = [
  "newcastle-upon-tyne", "brighton-and-hove", "kingston-upon-hull", "plymouth", "southampton",
  "bournemouth", "swansea", "sunderland", "blackpool", "middlesbrough", "york", "poole",
  "exeter", "blackburn", "crawley", "basingstoke", "gateshead", "worthing", "maidstone",
  "gillingham-medway", "st-helens", "eastbourne", "preston", "southport", "harlow", "darlington",
  "hastings", "hartlepool", "stockton-on-tees", "ashford", "wigan", "bury", "bracknell", "burnley",
  "carlisle", "chatham", "woking", "harrogate", "south-shields", "gosport",
  "kingswood-and-fishponds", "wythenshawe", "wallasey", "dartford", "bognor-regis", "paignton",
  "maidenhead", "rochester", "margate", "sale", "farnborough", "tynemouth", "huyton-with-roby",
  "scarborough", "gravesend", "bebington", "weymouth", "brentwood", "barrow-in-furness", "canterbury",
  "sittingbourne", "bootle", "clacton-on-sea", "lancaster", "torquay", "folkestone", "washington",
  "royal-leamington-spa", "royal-tunbridge-wells", "durham", "wokingham", "crosby", "horsham",
] as const;

describe("high-population service-area expansion", () => {
  it("includes the complete researched first batch in the SSR location dataset", () => {
    HIGH_POPULATION_TOWN_SLUGS.forEach((slug) => {
      expect(locationData[slug]).toBeDefined();
    });
  });

  it("gives every new high-population page a dedicated spotlight and three local FAQs", () => {
    HIGH_POPULATION_TOWN_SLUGS.forEach((slug) => {
      const location = locationData[slug];
      expect(location.spotlightText?.split(/\s+/).length).toBeGreaterThanOrEqual(80);
      expect(location.uniqueFaqs).toHaveLength(3);
      location.uniqueFaqs?.forEach((faq) => {
        expect(faq.question.length).toBeGreaterThan(20);
        expect(faq.answer.length).toBeGreaterThan(40);
      });
    });
  });
});
