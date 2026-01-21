import { Card } from "@/components/ui/card";

interface CaseStudyProps {
  title: string;
  client: string;
  location: string;
  duration: string;
  area: string;
  completionDate: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  beforeImage?: string;
  afterImage?: string;
}

export function CaseStudy({
  title,
  client,
  location,
  duration,
  area,
  completionDate,
  challenge,
  solution,
  outcomes,
  testimonial,
  beforeImage,
  afterImage,
}: CaseStudyProps) {
  return (
    <section className="py-16 bg-[#F5F1E8]">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7C] mb-4 text-center">
          Featured Case Study
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Real results from our shot blasting projects in the region
        </p>

        <Card className="bg-white p-8 md:p-12 shadow-lg">
          {/* Project Header */}
          <h3 className="text-2xl md:text-3xl font-bold text-[#2C5F7C] mb-6">
            {title}
          </h3>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-[#F5F1E8] rounded-lg">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Client</p>
              <p className="text-base text-gray-900">{client}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Location</p>
              <p className="text-base text-gray-900">{location}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Duration</p>
              <p className="text-base text-gray-900">{duration}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Service Area</p>
              <p className="text-base text-gray-900">{area}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Completion</p>
              <p className="text-base text-gray-900">{completionDate}</p>
            </div>
          </div>

          {/* Before/After Images */}
          {(beforeImage || afterImage) && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {beforeImage && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-3">Before</p>
                  <img
                    src={beforeImage}
                    alt="Before shot blasting"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              {afterImage && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-3">After</p>
                  <img
                    src={afterImage}
                    alt="After shot blasting"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          )}

          {/* The Challenge */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-[#2C5F7C] mb-4">The Challenge</h4>
            <p className="text-gray-700 leading-relaxed">{challenge}</p>
          </div>

          {/* Our Solution */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-[#2C5F7C] mb-4">Our Solution</h4>
            <p className="text-gray-700 leading-relaxed">{solution}</p>
          </div>

          {/* Measurable Outcomes */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-[#2C5F7C] mb-4">Measurable Outcomes</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-700">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonial */}
          <div className="bg-[#2C5F7C] text-white p-8 rounded-lg">
            <svg
              className="w-10 h-10 text-[#D4AF37] mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-lg italic mb-6 leading-relaxed">
              "{testimonial.quote}"
            </p>
            <div className="border-t border-white/20 pt-4">
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-white/80">{testimonial.position}</p>
              <p className="text-sm text-white/80">{testimonial.company}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
