import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

type Question = {
  id: string;
  question: string;
  options: { label: string; value: string }[];
};

const questions: Question[] = [
  {
    id: "material",
    question: "What type of material needs shot blasting?",
    options: [
      { label: "Structural Steel & Frames", value: "structural" },
      { label: "Warehouse Racking & Storage", value: "warehouse" },
      { label: "Pipework & Process Equipment", value: "pipework" },
      { label: "Stairs, Ladders & Access", value: "access" },
      { label: "Bridges & Infrastructure", value: "infrastructure" },
      { label: "Telecom & Tower Structures", value: "telecom" },
      { label: "Concrete Floors & Surfaces", value: "floors" },
      { label: "Factory/Warehouse Cladding", value: "cladding" },
      { label: "Radiators & Heating Systems", value: "radiators" },
      { label: "Vehicles & Machinery", value: "vehicles" },
      { label: "Doors, Gates & Railings", value: "doors-gates" },
      { label: "Steel Sheeting & Panels", value: "sheeting" },
    ],
  },
  {
    id: "purpose",
    question: "What's your primary goal?",
    options: [
      { label: "Remove rust and corrosion", value: "rust" },
      { label: "Prepare for new coating/paint", value: "coating" },
      { label: "Refurbish existing equipment", value: "refurbish" },
      { label: "Meet safety/compliance standards", value: "compliance" },
    ],
  },
  {
    id: "scale",
    question: "What's the scale of your project?",
    options: [
      { label: "Small (Single items or components)", value: "small" },
      { label: "Medium (Multiple items or sections)", value: "medium" },
      { label: "Large (Full structures or facilities)", value: "large" },
    ],
  },
];

const serviceRecommendations: Record<string, { id: string; name: string; reason: string }[]> = {
  structural: [
    { id: "structural-steel-frames", name: "Structural Steel Frames", reason: "Perfect for large steel frame structures requiring comprehensive surface preparation" },
    { id: "bridge-steelwork", name: "Bridge Steelwork", reason: "Ideal for structural components in bridge and infrastructure projects" },
    { id: "powder-coating", name: "Shot Blasting & Powder Coating", reason: "Complete end-to-end solution combining surface preparation with durable powder coating" },
  ],
  warehouse: [
    { id: "warehouse-racking", name: "Warehouse Racking & Pallet Rack Frames", reason: "Specialized service for warehouse storage systems refurbishment" },
    { id: "steel-containers", name: "Steel Container Blasting", reason: "Specialist shot blasting for shipping containers and storage tanks" },
    { id: "factory-cladding", name: "Factory Cladding Shot Blasting", reason: "Professional restoration of warehouse and factory exterior cladding panels" },
  ],
  pipework: [
    { id: "pipework", name: "Process Pipework, Spools & Manifolds", reason: "Precision cleaning for industrial piping systems" },
  ],
  access: [
    { id: "staircases", name: "Internal Steel Staircases, Balustrades & Handrails", reason: "Comprehensive treatment for internal access structures" },
    { id: "fire-escapes", name: "Fire Escapes & External Stair Towers", reason: "Specialized service for external access and safety structures" },
    { id: "ladders", name: "Fixed Ladders & Step-Over Platforms", reason: "Expert refurbishment for industrial access equipment" },
  ],
  infrastructure: [
    { id: "bridge-steelwork", name: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)", reason: "Comprehensive service for bridge infrastructure components" },
    { id: "structural-steel-frames", name: "Structural Steel Frames", reason: "Ideal for large infrastructure steel frameworks" },
  ],
  telecom: [
    { id: "telecom-towers", name: "Telecom Masts & Lattice Towers", reason: "Specialized treatment for telecommunications infrastructure" },
  ],
  floors: [
    { id: "floor-preparation", name: "Floor Preparation & Shot Blasting", reason: "Professional concrete floor preparation removing coatings and creating ideal surface profiles" },
  ],
  cladding: [
    { id: "factory-cladding", name: "Factory Cladding Shot Blasting", reason: "Specialist restoration removing plastisol and paint layers from building cladding panels" },
  ],
  radiators: [
    { id: "commercial-radiators", name: "Commercial Radiators", reason: "Professional restoration for cast iron and steel radiators in commercial buildings and heritage properties" },
  ],
  vehicles: [
    { id: "commercial-vehicles", name: "Commercial & Agricultural Vehicles", reason: "Heavy-duty restoration for farm trucks, warehouse vehicles, and industrial transport equipment" },
    { id: "plant-machinery", name: "Plant & Machinery", reason: "On-site shot blasting for construction equipment, agricultural machinery, and industrial plant" },
  ],
  "doors-gates": [
    { id: "steel-doors", name: "Steel Doors & Roller Shutters", reason: "Professional restoration for industrial doors, warehouse roller shutters, and security systems" },
    { id: "steel-gates", name: "Steel Gates & Railings", reason: "Precision restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork" },
  ],
  sheeting: [
    { id: "steel-sheeting", name: "Steel Sheeting", reason: "Professional surface preparation for steel sheets, panels, and flat metal products used in construction and manufacturing" },
    { id: "steel-containers", name: "Steel Container Blasting", reason: "Specialist shot blasting for large steel panels and container surfaces" },
  ],
};

export default function ServiceSelector() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendations = () => {
    const materialType = answers.material;
    return serviceRecommendations[materialType] || [];
  };

  if (showResults) {
    const recommendations = getRecommendations();
    return (
      <Card className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle2 className="w-6 h-6" />
            <CardTitle className="text-2xl">Your Personalized Recommendations</CardTitle>
          </div>
          <CardDescription>
            Based on your project requirements, we recommend the following services:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{service.reason}</p>
              <Link href={`/services/${service.id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            <Button onClick={reset} variant="outline" className="flex-1">
              Start Over
            </Button>
            <Link href="/contact" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl">Find Your Perfect Service</CardTitle>
        <CardDescription>
          Answer a few quick questions to get personalized service recommendations
        </CardDescription>
        <div className="flex gap-2 mt-4">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-colors ${
                idx <= currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentQuestion.question}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                variant="outline"
                className="h-auto py-4 px-4 text-left justify-start hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 transition-all"
              >
                {option.label}
              </Button>
            ))}
          </div>
          {currentStep > 0 && (
            <Button
              onClick={() => setCurrentStep(currentStep - 1)}
              variant="ghost"
              className="mt-4"
            >
              ← Back
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
