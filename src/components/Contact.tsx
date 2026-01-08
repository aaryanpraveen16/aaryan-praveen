
import { socialLinks } from '@/lib/constants';
import { useInView } from '@/lib/animations';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, 0.1);

  const formRef = useRef<HTMLFormElement>(null);
  const isFormInView = useInView(formRef, 0.5);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mqearjry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: 'Thank you for reaching out. I\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Something went wrong.', {
          description: 'Please try again later or email me directly.',
        });
      }
    } catch (error) {
      toast.error('Network error.', {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-md mx-auto mb-16">
          <span className={cn(
            "inline-block px-4 py-1.5 mb-4 text-sm rounded-full bg-secondary/80 text-secondary-foreground backdrop-blur-sm opacity-0 transition-opacity duration-700",
            isInView && "opacity-100"
          )}>
            Get In Touch
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 opacity-0 transition-opacity duration-700 delay-100",
            isInView && "opacity-100"
          )}>
            Contact Me
          </h2>
          <p className={cn(
            "text-muted-foreground opacity-0 transition-opacity duration-700 delay-200",
            isInView && "opacity-100"
          )}>
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className={cn(
            "opacity-0 transition-all duration-1000 transform translate-y-[20px]",
            isInView && "opacity-100 translate-y-0"
          )}>
            <h3 className="text-2xl font-bold mb-6">Let's talk about your project</h3>
            <p className="text-muted-foreground mb-8">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              Feel free to reach out using the form or through social platforms.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:text-primary transition-colors"
                    aria-label={`Connect with me on ${link.name}`}
                  >
                    {getSocialIcon(link.name)}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Email me directly</h4>
              <a
                href="mailto:aaryan.praveen@gmail.com"
                className="text-primary hover:underline flex items-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                aaryan.praveen@gmail.com
              </a>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={cn(
              "bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border opacity-0 transition-all duration-1000 transform translate-y-[20px]",
              isFormInView && "opacity-100 translate-y-0"
            )}
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
                placeholder="Your email address"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center transition-all",
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:translate-y-[-2px] active:translate-y-[0px]"
              )}
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
