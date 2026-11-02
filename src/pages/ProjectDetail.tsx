import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '@/lib/constants';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { ArrowLeft, Github, ExternalLink, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, 0.1);
  const [activeImageTab, setActiveImageTab] = useState<'new' | 'old'>('new');

  // Find project by converting title to URL-friendly format
  const project = projects.find(p => 
    p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') === projectName
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link 
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const hasComparison = 'comparisonImages' in project && Boolean((project as any).comparisonImages);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24" ref={sectionRef}>
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/projects"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to All Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className={cn(
          "mb-12 opacity-0 transition-opacity duration-700",
          isInView && "opacity-100"
        )}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Github className="mr-2 w-5 h-5" />
                  View Code
                </a>
                
                {/* Only show live demo if liveUrl exists */}
                {'liveUrl' in project && project.liveUrl && (
                  <a 
                    href={project.liveUrl as string} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <ExternalLink className="mr-2 w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Project Image / Comparison View */}
            <div className="relative">
              {hasComparison ? (
                <div>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      UI/UX Showcase
                    </span>
                    <div className="inline-flex rounded-lg bg-secondary/80 p-0.5 border border-border">
                      <button
                        type="button"
                        onClick={() => setActiveImageTab('new')}
                        className={cn(
                          "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                          activeImageTab === 'new'
                            ? "bg-background text-foreground shadow-sm font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        ✨ Redesigned (New)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveImageTab('old')}
                        className={cn(
                          "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                          activeImageTab === 'old'
                            ? "bg-background text-foreground shadow-sm font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        ⏳ Original (Old)
                      </button>
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border bg-muted/20">
                    <img 
                      src={activeImageTab === 'new' ? (project as any).comparisonImages.new : (project as any).comparisonImages.old} 
                      alt={activeImageTab === 'new' ? (project as any).comparisonImages.newLabel : (project as any).comparisonImages.oldLabel}
                      className="w-full h-auto max-h-[500px] object-cover object-top transition-all duration-300"
                    />
                    <div className="p-3 bg-card/90 backdrop-blur-sm border-t border-border flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        {activeImageTab === 'new' ? (project as any).comparisonImages.newLabel : (project as any).comparisonImages.oldLabel}
                      </span>
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-medium",
                        activeImageTab === 'new' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      )}>
                        {activeImageTab === 'new' ? 'Live Storefront' : 'Pre-Redesign'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full rounded-xl shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Full Description */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Key Features & Impact</CardTitle>
                <CardDescription>
                  Core responsibilities and technical deliverables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Before & After Detailed Transformation (if comparison images available) */}
        {hasComparison && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <CardTitle>Storefront Redesign: Before vs After</CardTitle>
                </div>
                <CardDescription>
                  Side-by-side visual progression showing the transition from the original baseline storefront to the custom-coded, high-converting modern Shopify Dawn 2.0 experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-1.5">
                        ⏳ Original Storefront (Old)
                      </h4>
                      <Badge variant="outline" className="text-amber-600 border-amber-500/30">Before</Badge>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-border bg-muted/20 shadow-sm aspect-[4/5] overflow-y-auto">
                      <img 
                        src={(project as any).comparisonImages.old} 
                        alt="Original Storefront" 
                        className="w-full h-auto object-cover object-top"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Initial baseline layout prior to custom Liquid templates, SEO/AEO optimizations, and product trust badges.
                    </p>
                  </div>

                  {/* After */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                        ✨ Redesigned Storefront (New UI/UX)
                      </h4>
                      <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white">Current Production</Badge>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-border bg-muted/20 shadow-sm aspect-[4/5] overflow-y-auto ring-2 ring-primary/20">
                      <img 
                        src={(project as any).comparisonImages.new} 
                        alt="Redesigned Storefront" 
                        className="w-full h-auto object-cover object-top"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Bespoke Shopify Dawn 2.0 architecture with tailored Liquid templates, Klaviyo dynamic review integrations, and conversion-optimized checkout funnel.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Related Projects */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  to={`/project/${relatedProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                  className="group"
                >
                  <Card className="h-full transition-transform duration-300 hover:translate-y-[-5px]">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={relatedProject.image} 
                        alt={relatedProject.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedProject.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
