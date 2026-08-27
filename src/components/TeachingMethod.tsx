import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Edit3, Award, TrendingUp, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const defaultSteps = [
  {
    step: '01',
    title: 'Learn',
    description: 'Understand concepts clearly with simple explanations.',
    icon: BookOpen,
    badge: 'Step 1',
    themeColor: 'red',
  },
  {
    step: '02',
    title: 'Practice',
    description: 'Strengthen knowledge through worksheets and assignments.',
    icon: Edit3,
    badge: 'Step 2',
    themeColor: 'blue',
  },
  {
    step: '03',
    title: 'Test',
    description: 'Regular assessments identify strengths and weaknesses.',
    icon: Award,
    badge: 'Step 3',
    themeColor: 'amber',
  },
  {
    step: '04',
    title: 'Improve',
    description: 'Personal feedback and doubt-clearing help students progress.',
    icon: TrendingUp,
    badge: 'Step 4',
    themeColor: 'emerald',
  },
];

const colorStyles: Record<string, any> = {
  red: {
    color: 'from-red-500 to-rose-500',
    lightBg: 'bg-red-50',
    borderColor: 'border-red-100',
    textColor: 'text-[var(--color-primary)]',
    icon: BookOpen,
  },
  blue: {
    color: 'from-blue-500 to-indigo-500',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-100',
    textColor: 'text-blue-600',
    icon: Edit3,
  },
  amber: {
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-100',
    textColor: 'text-amber-600',
    icon: Award,
  },
  emerald: {
    color: 'from-emerald-500 to-teal-500',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    textColor: 'text-emerald-600',
    icon: TrendingUp,
  },
  purple: {
    color: 'from-purple-500 to-indigo-600',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-100',
    textColor: 'text-purple-600',
    icon: Sparkles,
  },
};

export const TeachingMethod = () => {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-learning')
      .then((res) => res.json())
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch((err) => console.error('Error fetching teaching method config:', err));
  }, []);

  if (config && config.teachingMethodVisible === false) return null;

  const rawSteps = config?.teachingMethodSteps?.length > 0 ? config.teachingMethodSteps : defaultSteps;
  const stepsList = rawSteps.filter((s: any) => s.active !== false);

  const sectionBadge = config?.teachingMethodBadge || 'Our Teaching Method';
  const sectionTitle = config?.teachingMethodTitle || 'How We Help Students Improve';
  const sectionDesc =
    config?.teachingMethodDescription ||
    'A proven 4-step structured learning journey designed to build conceptual clarity, boost confidence, and drive continuous academic growth.';
  const assuranceTitle = config?.teachingMethodAssuranceTitle || 'Why Parents Trust Our Methodology';
  const assuranceDesc =
    config?.teachingMethodAssuranceDesc ||
    'Every student gets personalized attention with weekly updates delivered directly to parents.';

  return (
    <section className="py-10 md:py-12 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4"
          >
            {sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {sectionDesc}
          </motion.p>
        </div>

        {/* 4-Step Journey Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative items-stretch">
          {stepsList.map((item: any, idx: number) => {
            const themeKey = item.themeColor || (idx === 0 ? 'red' : idx === 1 ? 'blue' : idx === 2 ? 'amber' : 'emerald');
            const style = colorStyles[themeKey] || colorStyles.red;
            const Icon = item.icon || style.icon || BookOpen;
            const stepNum = item.step || `0${idx + 1}`;
            const stepBadge = item.badge || `Step ${idx + 1}`;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`relative h-full group bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border ${style.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Top Bar: Icon & Step Badge */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${style.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className={`text-lg sm:text-2xl font-black ${style.textColor} opacity-40 group-hover:opacity-100 transition-opacity`}>
                      {stepNum}
                    </span>
                  </div>

                  {/* Step Name */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <h3 className="text-lg sm:text-2xl font-black text-gray-900">{item.title}</h3>
                    <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${style.textColor}`} />
                  </div>

                  {/* Step Description */}
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Flow indicator arrow completely outside card box with 0% line overlap */}
                {idx < stepsList.length - 1 && (
                  <div className="hidden lg:flex absolute left-[calc(100%+1rem)] -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-400 shadow-2xs group-hover:border-red-500 group-hover:text-red-500 group-hover:scale-110 transition-all pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500" />
                  </div>
                )}

                {/* Bottom Step Indicator */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span className={`px-2.5 py-1 rounded-lg ${style.lightBg} ${style.textColor} font-extrabold uppercase tracking-wider`}>
                    {stepBadge}
                  </span>
                  <span className="text-gray-400 font-medium">Phase {idx + 1} of {stepsList.length}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Parent Assurance Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-red-50 via-rose-50 to-white p-6 sm:p-8 rounded-3xl border border-red-100/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">{assuranceTitle}</h4>
              <p className="text-sm text-gray-600">{assuranceDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              {stepsList.map((s: any) => s.title).join(' → ')}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
