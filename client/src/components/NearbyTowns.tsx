import React from 'react';
import { MapPin } from 'lucide-react';
import { trackPhoneCall } from '@/lib/analytics';

interface NearbyTownsProps {
  locationName: string;
  towns: string[];
}

export const NearbyTowns: React.FC<NearbyTownsProps> = ({ locationName, towns }) => {
  return (
    <section className="py-16 bg-[#F5F1E8]">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C5F7F]/10 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-[#2C5F7F]" />
              <span className="text-sm font-medium text-[#2C5F7F]">Local Coverage</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d52] mb-4">
              Towns & Areas Near {locationName}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We provide professional shot blasting services to {locationName} and the surrounding areas. 
              Our mobile service covers all these nearby towns and villages within our service radius.
            </p>
          </div>

          {/* Towns Grid */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {towns.map((town, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#F5F1E8] transition-colors duration-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A90A4] flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{town}</span>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  Don't see your specific location listed? We likely still cover your area!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#2C5F7F] text-white font-semibold rounded-lg hover:bg-[#1a3d52] transition-colors duration-200"
                  >
                    Request a Quote
                  </a>
                  <a
                    href="tel:07970566409"
                    onClick={() => trackPhoneCall('07970566409', 'Nearby Towns Section')}
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#2C5F7F] text-[#2C5F7F] font-semibold rounded-lg hover:bg-[#2C5F7F] hover:text-white transition-colors duration-200"
                  >
                    Call 07970 566409
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              <strong>Service Radius:</strong> We typically serve locations within 20km of {locationName}, 
              but can accommodate projects further afield depending on requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
