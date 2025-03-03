
import { useRef } from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Briefcase, Building, Calendar, MapPin } from 'lucide-react';
import { workExperience } from '@/lib/constants';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, 0.1);
  
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
            My work history and professional experience.
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
                      </div>
                      <div className="flex items-center text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        <span>{experience.period}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-6">
                      <p>{experience.description}</p>
                    </div>
                    
                    <h4 className="font-semibold mb-3 text-sm">Key Responsibilities:</h4>
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
      </div>
    </section>
  );
};

export default Experience;
