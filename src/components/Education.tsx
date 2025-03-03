
import { useRef } from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { GraduationCap, BookOpen } from 'lucide-react';
import { education } from '@/lib/constants';

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, 0.1);
  
  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-md mx-auto mb-16">
          <span className={cn(
            "inline-block px-4 py-1.5 mb-4 text-sm rounded-full bg-secondary/80 text-secondary-foreground backdrop-blur-sm opacity-0 transition-opacity duration-700",
            isInView && "opacity-100"
          )}>
            Education
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 opacity-0 transition-opacity duration-700 delay-100",
            isInView && "opacity-100"
          )}>
            Academic Background
          </h2>
          <p className={cn(
            "text-muted-foreground opacity-0 transition-opacity duration-700 delay-200",
            isInView && "opacity-100"
          )}>
            My educational journey and relevant coursework.
          </p>
        </div>

        <div className="space-y-16">
          {education.map((edu, index) => (
            <div 
              key={edu.id}
              className={cn(
                "relative opacity-0 transition-all duration-1000",
                isInView && "opacity-100"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="sticky top-20">
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-xl">{edu.degree}</h3>
                    </div>
                    <p className="text-lg font-medium mb-2">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground mb-4">{edu.period}</p>
                    {edu.gpa && (
                      <p className="text-sm"><span className="font-medium">GPA:</span> {edu.gpa}</p>
                    )}
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <h4 className="flex items-center gap-2 font-semibold mb-4">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Relevant Coursework
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {edu.courses.map((course, idx) => (
                        <div 
                          key={idx} 
                          className="bg-background/50 p-3 rounded-md text-sm border border-border transition-colors hover:bg-background duration-300"
                        >
                          {course}
                        </div>
                      ))}
                    </div>
                    
                    {edu.thesis && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="font-semibold mb-2">Thesis</h4>
                        <p className="text-sm text-muted-foreground">{edu.thesis}</p>
                      </div>
                    )}

                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="font-semibold mb-2">Academic Achievements</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {edu.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">
                              {achievement}
                            </li>
                          ))}
                        </ul>
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

export default Education;
