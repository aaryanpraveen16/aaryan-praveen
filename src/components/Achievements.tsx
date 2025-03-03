
import { useRef } from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Trophy, Medal, Award } from 'lucide-react';
import { achievements } from '@/lib/constants';

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, 0.1);
  
  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section-padding bg-secondary/10"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-md mx-auto mb-16">
          <span className={cn(
            "inline-block px-4 py-1.5 mb-4 text-sm rounded-full bg-secondary/80 text-secondary-foreground backdrop-blur-sm opacity-0 transition-opacity duration-700",
            isInView && "opacity-100"
          )}>
            Achievements
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 opacity-0 transition-opacity duration-700 delay-100",
            isInView && "opacity-100"
          )}>
            Recognition & Awards
          </h2>
          <p className={cn(
            "text-muted-foreground opacity-0 transition-opacity duration-700 delay-200",
            isInView && "opacity-100"
          )}>
            Key accomplishments and recognitions I've received throughout my career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id}
              className={cn(
                "bg-card p-8 rounded-xl shadow-md border border-border relative overflow-hidden opacity-0 transition-all duration-700",
                isInView && "opacity-100 transform-none",
                { "delay-100": index % 3 === 0,
                  "delay-200": index % 3 === 1,
                  "delay-300": index % 3 === 2 }
              )}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  {achievement.icon === 'trophy' && <Trophy className="w-6 h-6" />}
                  {achievement.icon === 'medal' && <Medal className="w-6 h-6" />}
                  {achievement.icon === 'award' && <Award className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
