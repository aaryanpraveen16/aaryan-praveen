
import { skills } from '@/lib/constants';
import { useInView } from '@/lib/animations';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, 0.1);
  
  const imageRef = useRef<HTMLDivElement>(null);
  const isImageInView = useInView(imageRef, 0.5);
  
  const bioRef = useRef<HTMLDivElement>(null);
  const isBioInView = useInView(bioRef, 0.5);
  
  const skillsRef = useRef<HTMLDivElement>(null);
  const isSkillsInView = useInView(skillsRef, 0.3);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-md mx-auto mb-16">
          <span className={cn(
            "inline-block px-4 py-1.5 mb-4 text-sm rounded-full bg-secondary/80 text-secondary-foreground backdrop-blur-sm opacity-0 transition-opacity duration-700",
            isInView && "opacity-100"
          )}>
            About Me
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 opacity-0 transition-opacity duration-700 delay-100",
            isInView && "opacity-100"
          )}>
            My Background
          </h2>
          <p className={cn(
            "text-muted-foreground opacity-0 transition-opacity duration-700 delay-200",
            isInView && "opacity-100"
          )}>
            Discover my journey, skills, and what drives me as a developer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            ref={imageRef}
            className={cn(
              "relative opacity-0 transition-all duration-1000 transform translate-x-[-20px]",
              isImageInView && "opacity-100 translate-x-0"
            )}
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                alt="Professional portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-2xl -z-10"></div>
          </div>

          <div>
            <div 
              ref={bioRef}
              className={cn(
                "mb-10 opacity-0 transition-all duration-1000 transform translate-x-[20px]",
                isBioInView && "opacity-100 translate-x-0"
              )}
            >
              <h3 className="text-2xl font-bold mb-4">Hello, I'm John Doe</h3>
              <p className="text-muted-foreground mb-6">
                I'm a passionate frontend developer and UI designer with over 5 years of experience
                creating beautiful, functional, and user-centered digital experiences. 
              </p>
              <p className="text-muted-foreground mb-6">
                My approach combines technical expertise with creative problem-solving. I believe
                that great design is about making complex things simple and intuitive.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you'll find me exploring new design trends, contributing to
                open-source projects, or enjoying outdoor activities to refresh my creative thinking.
              </p>
            </div>

            <div 
              ref={skillsRef}
              className={cn(
                "opacity-0 transition-all duration-1000 delay-200",
                isSkillsInView && "opacity-100"
              )}
            >
              <h3 className="text-xl font-bold mb-4">Skills & Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={cn(
                      "opacity-0 transition-all duration-500",
                      isSkillsInView && "opacity-100",
                      { "transition-delay-100": index % 2 === 1,
                        "transition-delay-200": index % 2 === 0 && index > 0 }
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                        style={{ 
                          transform: isSkillsInView ? `scaleX(${skill.level / 100})` : 'scaleX(0)',
                          transitionDelay: `${200 + index * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
