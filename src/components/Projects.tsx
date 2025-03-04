
import { projects } from '@/lib/constants';
import { useInView } from '@/lib/animations';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, 0.1);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-md mx-auto mb-16">
          <span className={cn(
            "inline-block px-4 py-1.5 mb-4 text-sm rounded-full bg-secondary/80 text-secondary-foreground backdrop-blur-sm opacity-0 transition-opacity duration-700",
            isInView && "opacity-100"
          )}>
            My Work
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 opacity-0 transition-opacity duration-700 delay-100",
            isInView && "opacity-100"
          )}>
            Featured Projects
          </h2>
          <p className={cn(
            "text-muted-foreground opacity-0 transition-opacity duration-700 delay-200",
            isInView && "opacity-100"
          )}>
            Showcasing some of my recent work and creative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const projectRef = useRef<HTMLDivElement>(null);
            const isProjectInView = useInView(projectRef, 0.2);
            
            return (
              <div 
                key={project.id}
                ref={projectRef}
                className={cn(
                  "group relative bg-card rounded-xl overflow-hidden border border-border transform transition-all duration-500 hover:translate-y-[-5px] opacity-0",
                  isProjectInView && "opacity-100"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs rounded-full bg-secondary/80 text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      
                      {/* <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors"
                        aria-label={`Visit ${project.title} live site`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a> */}
                    </div>
                    
                    <a 
                      href={`/projects/${project.id}`}
                      className="flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      More <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://aaryanpraveen.wixsite.com/portfolio/projects" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Projects <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
