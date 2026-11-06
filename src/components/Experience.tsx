import { useState, useRef } from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Building, Calendar, MapPin, ExternalLink, Maximize2, Sparkles } from 'lucide-react';
import { workExperience } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, 0.1);
  const [selectedViews, setSelectedViews] = useState<Record<number, 'after' | 'before'>>({});
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string; subtitle?: string } | null>(null);
  
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-secondary/10"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-md mx-auto mb-16">
          <span className={cn(
            "inline-block px-4 py-1.5 mb-4 text-sm rounded-full bg-secondary/80 text-secondary-foreground backdrop-blur-sm opacity-0 transition-opacity duration-700",
            isInView && "opacity-100"
          )}>
            Experience
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 opacity-0 transition-opacity duration-700 delay-100",
            isInView && "opacity-100"
          )}>
            Professional Journey
          </h2>
          <p className={cn(
            "text-muted-foreground opacity-0 transition-opacity duration-700 delay-200",
            isInView && "opacity-100"
          )}>
            My work history, startup leadership, and professional experience.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
          
          {workExperience.map((experience, index) => (
            <div 
              key={experience.id}
              className={cn(
                "relative mb-12 opacity-0 transition-all duration-1000",
                isInView && "opacity-100"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={cn(
                "flex flex-col md:flex-row items-start",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"></div>
                
                {/* Content */}
                <div className={cn(
                  "pl-12 md:pl-0 w-full md:w-1/2",
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                )}>
                  <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <div>
                        <h3 className="font-bold text-xl mb-1">{experience.position}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Building className="w-4 h-4 mr-1.5" />
                          <span>{experience.company}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1.5" />
                          <span>{experience.location}</span>
                        </div>
                        {'liveUrl' in experience && experience.liveUrl && (
                          <div className="mt-2.5">
                            <a 
                              href={experience.liveUrl as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs font-semibold text-primary hover:underline gap-1.5 bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-md transition-colors"
                              aria-label={`Visit ${experience.company} live store`}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Live Store: {(experience.liveUrl as string).replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        <span>{experience.period}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-6">
                      <p>{experience.description}</p>
                    </div>
                    
                    <h4 className="font-semibold mb-3 text-sm">{('responsibilitiesTitle' in experience && (experience as any).responsibilitiesTitle) || 'Key Responsibilities:'}</h4>
                    <ul className="space-y-2">
                      {experience.responsibilities.map((item, idx) => (
                        <li key={idx} className="text-sm flex gap-2 text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {experience.achievements && (
                      <>
                        <h4 className="font-semibold mb-3 mt-5 text-sm">Achievements:</h4>
                        <ul className="space-y-2">
                          {experience.achievements.map((item, idx) => (
                            <li key={idx} className="text-sm flex gap-2 text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Before & After Storefront Transformation (if available) */}
                    {'comparison' in experience && (experience as any).comparison && (
                      <div className="mt-6 pt-5 border-t border-border">
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <h4 className="font-semibold text-sm">Storefront Transformation</h4>
                          </div>
                          <div className="inline-flex rounded-lg bg-secondary/80 p-0.5 border border-border">
                            <button
                              type="button"
                              onClick={() => setSelectedViews(prev => ({ ...prev, [experience.id]: 'after' }))}
                              className={cn(
                                "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
                                (selectedViews[experience.id] ?? 'after') === 'after'
                                  ? "bg-background text-foreground shadow-sm font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              ✨ Redesigned (New)
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedViews(prev => ({ ...prev, [experience.id]: 'before' }))}
                              className={cn(
                                "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
                                selectedViews[experience.id] === 'before'
                                  ? "bg-background text-foreground shadow-sm font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              ⏳ Original (Old)
                            </button>
                          </div>
                        </div>
                        
                        <div className="relative group rounded-lg overflow-hidden border border-border bg-muted/20">
                          <div className="aspect-[16/10] w-full overflow-hidden bg-muted/40 relative cursor-pointer"
                            onClick={() => {
                              const comp = (experience as any).comparison;
                              const isAfter = (selectedViews[experience.id] ?? 'after') === 'after';
                              setZoomedImage({
                                src: isAfter ? comp.after : comp.before,
                                title: isAfter ? comp.afterLabel : comp.beforeLabel,
                                subtitle: isAfter
                                  ? 'Current production storefront redesigned for high conversion, trust badges, and custom Dawn 2.0 Liquid layout.'
                                  : 'Initial storefront layout prior to custom Liquid templates and SEO/AEO overhaul.'
                              });
                            }}
                          >
                            <img
                              src={(selectedViews[experience.id] ?? 'after') === 'after' 
                                ? (experience as any).comparison.after 
                                : (experience as any).comparison.before}
                              alt={(selectedViews[experience.id] ?? 'after') === 'after'
                                ? (experience as any).comparison.afterLabel
                                : (experience as any).comparison.beforeLabel}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute top-2 left-2 pointer-events-none">
                              <span className={cn(
                                "text-[11px] px-2 py-0.5 rounded-full font-medium shadow-sm backdrop-blur-md",
                                (selectedViews[experience.id] ?? 'after') === 'after'
                                  ? "bg-emerald-500/90 text-white"
                                  : "bg-amber-500/90 text-white"
                              )}>
                                {(selectedViews[experience.id] ?? 'after') === 'after' ? 'After Redesign' : 'Before Redesign'}
                              </span>
                            </div>
                          </div>
                          <div className="p-2.5 bg-card/90 backdrop-blur-sm border-t border-border flex items-center justify-between text-xs">
                            <span className="font-medium text-muted-foreground truncate mr-2">
                              {(selectedViews[experience.id] ?? 'after') === 'after' 
                                ? (experience as any).comparison.afterLabel 
                                : (experience as any).comparison.beforeLabel}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const comp = (experience as any).comparison;
                                const isAfter = (selectedViews[experience.id] ?? 'after') === 'after';
                                setZoomedImage({
                                  src: isAfter ? comp.after : comp.before,
                                  title: isAfter ? comp.afterLabel : comp.beforeLabel,
                                  subtitle: isAfter
                                    ? 'Current production storefront redesigned for high conversion, trust badges, and custom Dawn 2.0 Liquid layout.'
                                    : 'Initial storefront layout prior to custom Liquid templates and SEO/AEO overhaul.'
                                });
                              }}
                              className="inline-flex items-center gap-1 text-primary hover:underline font-semibold shrink-0"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              Zoom
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {experience.technologies && (
                      <div className="mt-6 pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2.5 py-1 rounded-full bg-background border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing zoomed storefront comparison screenshots */}
        <Dialog open={!!zoomedImage} onOpenChange={(open) => !open && setZoomedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                {zoomedImage?.title}
              </DialogTitle>
              {zoomedImage?.subtitle && (
                <p className="text-sm text-muted-foreground mt-1">
                  {zoomedImage.subtitle}
                </p>
              )}
            </DialogHeader>
            {zoomedImage && (
              <div className="mt-3 rounded-lg overflow-hidden border border-border shadow-inner bg-black/5 dark:bg-black/20">
                <img 
                  src={zoomedImage.src} 
                  alt={zoomedImage.title} 
                  className="w-full h-auto object-contain max-h-[70vh] mx-auto" 
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Experience;
