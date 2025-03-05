
import { projects } from '@/lib/constants';
import { useInView } from '@/lib/animations';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, 0.1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24" ref={sectionRef}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={cn(
            "inline-block px-4 py-1.5 mb-4 text-sm rounded-full bg-secondary/80 text-secondary-foreground backdrop-blur-sm opacity-0 transition-opacity duration-700",
            isInView && "opacity-100"
          )}>
            Portfolio
          </span>
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-6 opacity-0 transition-opacity duration-700 delay-100",
            isInView && "opacity-100"
          )}>
            All Projects
          </h1>
          <p className={cn(
            "text-muted-foreground opacity-0 transition-opacity duration-700 delay-200",
            isInView && "opacity-100"
          )}>
            A comprehensive collection of all my development work, showcasing a diverse range of skills and technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const projectRef = useRef<HTMLDivElement>(null);
            const isProjectInView = useInView(projectRef, 0.1);
            
            return (
              <div 
                key={project.id}
                ref={projectRef}
                className={cn(
                  "group relative bg-card rounded-xl overflow-hidden border border-border transform transition-all duration-500 hover:translate-y-[-5px] opacity-0",
                  isProjectInView && "opacity-100"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
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
                      
                      {/* Only render the liveUrl button if the property exists */}
                      {'liveUrl' in project && project.liveUrl && (
                        <a 
                          href={project.liveUrl as string} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors"
                          aria-label={`Visit ${project.title} live site`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    
                    <Link 
                      to={`/projects/${project.id}`}
                      className="flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
      
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 z-40",
          showScrollTop 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AllProjects;
