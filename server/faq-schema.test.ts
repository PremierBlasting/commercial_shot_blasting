import { describe, it, expect } from 'vitest';

describe('FAQ Schema Generation', () => {
  it('should generate location-specific FAQs', async () => {
    const { generateLocationFAQs } = await import('../client/src/components/FAQSchema');
    
    const faqs = generateLocationFAQs('Bedford', 'Bedfordshire');
    
    expect(faqs).toBeDefined();
    expect(faqs.length).toBeGreaterThan(0);
    expect(faqs.length).toBe(8); // Should generate 8 FAQs
  });

  it('should include location name in FAQ questions', async () => {
    const { generateLocationFAQs } = await import('../client/src/components/FAQSchema');
    
    const faqs = generateLocationFAQs('London');
    
    faqs.forEach(faq => {
      expect(faq.question).toContain('London');
    });
  });

  it('should include phone number in FAQ answers', async () => {
    const { generateLocationFAQs } = await import('../client/src/components/FAQSchema');
    
    const faqs = generateLocationFAQs('Manchester');
    
    // At least one FAQ should mention the phone number
    const hasPhoneNumber = faqs.some(faq => 
      faq.answer.includes('07970 566409')
    );
    
    expect(hasPhoneNumber).toBe(true);
  });

  it('should include county information when provided', async () => {
    const { generateLocationFAQs } = await import('../client/src/components/FAQSchema');
    
    const faqs = generateLocationFAQs('Bedford', 'Bedfordshire');
    
    // At least one FAQ should mention the county
    const hasCounty = faqs.some(faq => 
      faq.answer.includes('Bedfordshire')
    );
    
    expect(hasCounty).toBe(true);
  });

  it('should generate valid FAQ schema structure', async () => {
    const { generateLocationFAQs } = await import('../client/src/components/FAQSchema');
    
    const faqs = generateLocationFAQs('Liverpool', 'Merseyside');
    
    faqs.forEach(faq => {
      expect(faq).toHaveProperty('question');
      expect(faq).toHaveProperty('answer');
      expect(typeof faq.question).toBe('string');
      expect(typeof faq.answer).toBe('string');
      expect(faq.question.length).toBeGreaterThan(0);
      expect(faq.answer.length).toBeGreaterThan(0);
    });
  });

  it('should cover common shot blasting questions', async () => {
    const { generateLocationFAQs } = await import('../client/src/components/FAQSchema');
    
    const faqs = generateLocationFAQs('Birmingham');
    const questions = faqs.map(f => f.question.toLowerCase());
    
    // Check for key topics
    expect(questions.some(q => q.includes('cost') || q.includes('price'))).toBe(true);
    expect(questions.some(q => q.includes('long') || q.includes('take'))).toBe(true);
    expect(questions.some(q => q.includes('surfaces') || q.includes('types'))).toBe(true);
  });

  it('should not include environmental or standards wording', async () => {
    const { generateLocationFAQs } = await import('../client/src/components/FAQSchema');
    
    const faqs = generateLocationFAQs('Leeds', 'West Yorkshire');
    
    faqs.forEach(faq => {
      const combined = `${faq.question} ${faq.answer}`.toLowerCase();
      expect(combined).not.toContain('environmental');
      expect(combined).not.toContain('environment');
      expect(combined).not.toContain('certification');
      expect(combined).not.toContain('certified');
      expect(combined).not.toContain('compliance');
      expect(combined).not.toContain('regulation');
      expect(combined).not.toContain('standard');
    });
  });

  it('should work without county parameter', async () => {
    const { generateLocationFAQs } = await import('../client/src/components/FAQSchema');
    
    const faqs = generateLocationFAQs('Oxford');
    
    expect(faqs).toBeDefined();
    expect(faqs.length).toBe(8);
    faqs.forEach(faq => {
      expect(faq.question).toContain('Oxford');
    });
  });
});
