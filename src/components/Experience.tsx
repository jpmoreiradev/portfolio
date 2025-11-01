import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const experiences = t('experience.experiences', {
    returnObjects: true,
  }) as Array<{
    title: string;
    company: string;
    position: string;
    period: string;
    description: string[];
    link: string;
  }>;

  return (
    <section id="experiencia" className="py-20 section-padding bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('experience.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Tab buttons */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 text-left whitespace-nowrap md:whitespace-normal border-l-2 md:border-l-2 md:border-b-0 border-b-2 transition-all duration-200 ${
                    activeTab === index
                      ? 'border-primary text-primary bg-primary/10'
                      : 'border-border text-muted-foreground hover:text-primary hover:border-primary/50'
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 animate-fade-in">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {experiences[activeTab].position}{' '}
                    <a
                      href={experiences[activeTab].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary inline-flex items-center"
                    >
                      @ {experiences[activeTab].title}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {experiences[activeTab].period}
                  </p>
                </div>

                <ul className="space-y-3">
                  {experiences[activeTab].description.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-muted-foreground"
                    >
                      <span className="text-primary mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
