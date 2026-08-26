import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, Award, CalendarCheck, Activity, FileText } from 'lucide-react';

// Default images as fallback if gallery is empty
const defaultStudyImages = [
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80'
];

export const EducationalJourney = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-learning')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setConfig(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching home learning section config:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null; // Or a subtle skeleton loader if preferred
  
  // If explicitly hidden, or failed to fetch and we want to hide it
  if (!config || config.isVisible === false) return null;

  // Prepare images
  let activeImages = (config.galleryImages || [])
    .filter((img: any) => img.active !== false && img.image)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((img: any) => img.image);

  if (activeImages.length === 0) {
    activeImages = defaultStudyImages;
  } else {
    // Fill up to at least 6 images so diagonal rows are completely populated
    const baseList = [...activeImages];
    while (activeImages.length < 6) {
      activeImages = [...activeImages, ...baseList];
    }
  }

  // Duplicate images for infinite loop, chunking into rows
  const halfLen = Math.ceil(activeImages.length / 2) || 1;
  const row1 = activeImages;
  const row2 = [...activeImages.slice(halfLen), ...activeImages.slice(0, halfLen)];
  const row3 = activeImages.length > 2 ? [...activeImages.slice(1), ...activeImages.slice(0, 1)] : activeImages;

  const scrollingRows = [
    [...row1, ...row1, ...row1, ...row1],
    [...row2, ...row2, ...row2, ...row2],
    [...row3, ...row3, ...row3, ...row3]
  ];

  return (
    <section className="relative pt-10 md:pt-12 pb-0 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 right-20 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10 pb-0">
        
        {/* Optional Title Section above the manga layout (if the admin entered one) */}
        {(config.sectionTitle || config.sectionDescription) && (
          <div className="text-center mb-8">
            {config.sectionTitle && <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">{config.sectionTitle}</h2>}
            {config.sectionDescription && <p className="text-gray-500 text-lg">{config.sectionDescription}</p>}
          </div>
        )}

        {/* Parent Progress Card (Full Width Banner - Controlled from Admin) */}
        {config?.showParentProgress !== false && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-7xl mx-auto mb-16 p-8 sm:p-10 md:p-12 rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-2xl relative z-30"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-500 to-rose-400 flex items-center justify-center text-white shadow-xl shadow-red-200 shrink-0">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                    {config?.parentProgressTitle || 'Parent Progress Live Tracking'}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-500 font-semibold mt-1">
                    {config?.parentProgressSubtitle || 'Real-time student growth, regular tests & report updates'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-600 text-sm sm:text-base font-extrabold border border-emerald-200/80 shadow-xs shrink-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                {config?.parentProgressStatusText || 'Active Live'}
              </div>
            </div>

            {/* Progress Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-red-50/80 via-rose-50/30 to-white border border-red-100 shadow-md hover:shadow-xl transition-all group">
                <div className="flex items-center justify-center text-red-500 mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                  {config?.parentProgressQuizScore || '96%'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-extrabold uppercase tracking-wider mt-2">Quiz Score</div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-white border border-blue-100 shadow-md hover:shadow-xl transition-all group">
                <div className="flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                  <CalendarCheck className="w-8 h-8" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                  {config?.parentProgressAttendance || '98%'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-extrabold uppercase tracking-wider mt-2">Attendance</div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-purple-50/80 via-indigo-50/30 to-white border border-purple-100 shadow-md hover:shadow-xl transition-all group">
                <div className="flex items-center justify-center text-purple-500 mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                  {config?.parentProgressRegularTests || 'Weekly'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-extrabold uppercase tracking-wider mt-2">Regular Tests</div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-50/80 via-orange-50/30 to-white border border-amber-100 shadow-md hover:shadow-xl transition-all group">
                <div className="flex items-center justify-center text-amber-500 mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                  {config?.parentProgressBatchRank || 'Top 5%'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-extrabold uppercase tracking-wider mt-2">Batch Rank</div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-end justify-between min-h-[600px] pb-0">
          
          {/* Left Side: Manga Character & Dialog */}
          <div className="lg:w-[45%] relative w-full flex flex-col items-center lg:items-start pt-12 md:pt-16 pb-0">

            {/* Modern Glassmorphic Speech Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
              className="relative bg-white border-2 border-red-200/90 rounded-3xl p-6 md:p-8 shadow-[0_20px_45px_rgba(225,29,72,0.12)] z-20 max-w-sm ml-auto mr-auto lg:mr-0 lg:ml-12 mt-6 md:mt-10 lg:mt-14 mb-[-55px] lg:mb-[-98px] translate-x-16 lg:translate-x-56"
            >
              <p className="text-xl md:text-2xl font-black text-gray-900 leading-snug mb-4 relative z-10">
                "{config.dialogText}"
              </p>
              {config.dialogSecondaryText && (
                <div className="pt-3 border-t border-red-100 flex items-center justify-between">
                  <p className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
                    {config.dialogSecondaryText}
                  </p>
                </div>
              )}
              
              {/* Smooth Curved Speech Pointer */}
              <svg 
                className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 z-30" 
                width="28" 
                height="16" 
                viewBox="0 0 28 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 0 -2 L 0 0 C 6 0, 8 4, 12 13 C 13.2 15.5, 14.8 15.5, 16 13 C 20 4, 22 0, 28 0 L 28 -2 Z" fill="#ffffff" />
                <path d="M 0 0 C 6 0, 8 4, 12 13 C 13.2 15.5, 14.8 15.5, 16 13 C 20 4, 22 0, 28 0" stroke="rgba(254, 202, 202, 0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            {/* Standing Character (Transparent Cutout) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full flex justify-center lg:justify-start -mb-2 lg:-mb-4"
            >
              <img 
                src={config.characterImage || 'https://cdn.pixabay.com/photo/2023/08/19/13/26/anime-8200639_1280.png'} 
                alt="Character standing" 
                className="w-auto h-[480px] md:h-[620px] lg:h-[730px] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.18)] block align-bottom origin-bottom transition-all"
              />
            </motion.div>
          </div>

          {/* Right Side: Artistic Animated Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-[50%] w-full relative h-[400px] md:h-[500px] lg:h-[580px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-red-50/50 to-white border border-red-100 shadow-2xl flex items-center justify-center mb-6 lg:mb-10"
          >
            {/* Masked Diagonal Scrolling Wrapper */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-visible">
              <div className="flex flex-col gap-6 md:gap-8 -rotate-12 scale-[1.35] lg:scale-[1.5]">
                {scrollingRows.map((row, rowIndex) => (
                  <div 
                    key={rowIndex} 
                    className={`flex gap-6 md:gap-8 w-max ${config.animationEnabled !== false ? 'animate-diagonal-scroll' : ''}`}
                    style={{ 
                      animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse', 
                      animationDuration: `${(config.animationSpeed || 50) + rowIndex * 15}s` 
                    }}
                  >
                    {row.map((img, index) => {
                      const rotationClass = index % 2 === 0 ? 'rotate-2' : '-rotate-2';
                      const marginClass = index % 3 === 0 ? 'mt-4' : (index % 3 === 1 ? '-mt-4' : '');
                      
                      return (
                        <div 
                          key={index} 
                          className={`w-40 h-28 md:w-56 md:h-40 flex-shrink-0 bg-white p-2 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-50 ${rotationClass} ${marginClass} transition-transform hover:scale-105`}
                        >
                          <img src={img} alt="Study" className="w-full h-full object-cover rounded-xl" loading="lazy" />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_40px_rgba(255,255,255,0.8)] pointer-events-none z-10"></div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
