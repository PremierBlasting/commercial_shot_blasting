import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  detailedDescription?: string;
  before?: string;
  after?: string;
  video?: string;
  additionalPhotos?: string[];
  additionalImages?: string[];
  location?: string;
  completionDate?: string;
  duration?: string;
  specifications?: string[];
  challenges?: string;
  results?: string;
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!project) return null;

  const allPhotos = [
    ...(project.before ? [project.before] : []),
    ...(project.after ? [project.after] : []),
    ...(project.additionalPhotos || []),
    ...(project.additionalImages || [])
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            <Badge variant="secondary" className="text-sm">
              {project.category}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image/Video Gallery */}
          <div className="relative">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              {project.video ? (
                <video
                  src={project.video}
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <OptimizedImage
                    src={allPhotos[currentPhotoIndex]}
                    alt={`${project.title} - Photo ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {project.before && currentPhotoIndex === 0 && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded font-semibold text-sm">
                      Before
                    </div>
                  )}
                  {project.before && currentPhotoIndex === 1 && (
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded font-semibold text-sm">
                      After
                    </div>
                  )}
                </>
              )}
            </div>

            {allPhotos.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={prevPhoto}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={nextPhoto}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allPhotos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPhotoIndex
                          ? "bg-white w-6"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Project Metadata */}
          {(project.location || project.completionDate || project.duration) && (
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.completionDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Completed {project.completionDate}</span>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{project.duration}</span>
                </div>
              )}
            </div>
          )}

          {/* Detailed Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.detailedDescription || project.description}
            </p>
          </div>

          {/* Challenges */}
          {project.challenges && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Challenges</h3>
              <p className="text-muted-foreground leading-relaxed">{project.challenges}</p>
            </div>
          )}

          {/* Specifications */}
          {project.specifications && project.specifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Project Specifications</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.specifications.map((spec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {project.results && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Results</h3>
              <p className="text-muted-foreground leading-relaxed">{project.results}</p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Need Similar Work?</h3>
            <p className="text-muted-foreground mb-4">
              Get in touch to discuss your project requirements
            </p>
            <Button size="lg">Get a Free Quote</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
