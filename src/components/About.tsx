
import { skills } from '@/lib/constants';
import { useInView } from '@/lib/animations';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import profilePic from "../assets/profile-pic.jpg";
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
                src= {profilePic}
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
              <h3 className="text-2xl font-bold mb-4">Hello, I'm Aaryan</h3>
              <p className="text-muted-foreground mb-6">
              I'm a full-stack software engineer with a background in electronics engineering, now focused on building scalable, secure, and intelligent applications.
              </p>
              <p className="text-muted-foreground mb-6">
              With 2 years of industry experience, I’ve worked across frontend, backend, and cloud technologies, crafting intuitive user experiences and robust backend architectures.
              </p>
              <p className="text-muted-foreground">
              Outside of coding, I spend time exploring blockchain technology, competing in hackathons, and training in powerlifting and calisthenics. I also enjoy playing table tennis whenever I get the chance.
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={cn(
                      "bg-secondary/50 rounded-lg p-3 opacity-0 transition-all duration-500 transform hover:scale-105 hover:bg-secondary/80",
                      isSkillsInView && "opacity-100",
                      { "transition-delay-100": index % 3 === 1,
                        "transition-delay-200": index % 3 === 2 }
                    )}
                    style={{ 
                      transitionDelay: `${100 + index * 50}ms` 
                    }}
                  >
                    <div className="text-center">
                      <span className="font-medium">{skill.name}</span>
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
