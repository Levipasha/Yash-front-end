import { motion } from 'framer-motion';
import { Play, ArrowRight, Users, BookOpen, Monitor, Award, CheckCircle2, Sparkles, Brain, Target, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RequestQueryModal } from '../components/RequestQueryModal';
import { WatchVideoModal } from '../components/WatchVideoModal';
import { CourseDetailsModal } from '../components/CourseDetailsModal';
import { EducationalJourney } from '../components/EducationalJourney';
import { TeachingMethod } from '../components/TeachingMethod';
import heroCtaImg from '../images/hero-cta.jpg';

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
  >
    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export const Home = () => {
  const navigate = useNavigate();
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<any | null>(null);
  const [selectedCourseForQuery, setSelectedCourseForQuery] = useState<string | null>(null);
  const [selectedWatchVideo, setSelectedWatchVideo] = useState<{ title: string; image?: string; videoUrl?: string } | null>(null);
  const [homeConfig, setHomeConfig] = useState<any>(null);

  const [aboutData, setAboutData] = useState<any>({
    heroTitle: 'About Yash Educational Institute',
    heroDescription: 'At Yash Educational Institute, we believe every student has the potential to achieve greatness. We are committed to providing quality education, expert guidance, and a nurturing environment that inspires confidence, curiosity, and character.'
  });

  useEffect(() => {
    const apiBase = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:5000' : '';
    fetch(`${apiBase}/api/home-learning`)
      .then(res => res.json())
      .then(data => {
        if (data) setHomeConfig(data);
      })
      .catch(err => console.warn('Using default home config:', err));

    fetch(`${apiBase}/api/about`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setAboutData((prev: any) => ({
            ...prev,
            heroTitle: data.heroTitle || data.title || prev.heroTitle,
            heroDescription: data.heroDescription || data.subtitle || prev.heroDescription
          }));
        }
      })
      .catch(err => console.warn('Using default about data in home:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-10 pb-8 md:pb-10 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50 via-white to-white opacity-70"></div>
        
        <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Hero Image / Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px] flex items-center justify-center order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-red-100 to-transparent rounded-full blur-3xl opacity-50"></div>
              <img 
                src={heroCtaImg} 
                alt="Students learning" 
                className="relative z-10 rounded-3xl shadow-2xl object-cover h-full w-full"
              />
              
              {/* Floating Stat 1 */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-6 sm:-left-10 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Students</div>
                </div>
              </motion.div>

              {/* Floating Stat 2 */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -right-5 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</div>
                </div>
              </motion.div>

              {/* Floating Stat 3 */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -left-6 sm:-left-12 glass px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-20"
              >
                <CheckCircle2 className="w-6 h-6 text-red-500" />
                <span className="font-bold text-gray-900">Live Classes Daily</span>
              </motion.div>

            </motion.div>

            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-start pt-2 order-1 lg:order-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
                Learn Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-red-400">Limits.</span>
              </h1>
              <div className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl leading-relaxed space-y-2.5 font-normal">
                <p>Give your child the right guidance, personal attention, and strong academic foundation they need to succeed.</p>
                <p>Our tuition program provides a supportive and engaging learning environment for every student. We focus on helping students understand concepts clearly rather than simply memorizing answers.</p>
                <p>Our experienced teachers use simple and effective teaching methods to make learning easier and more interesting. Students receive individual attention based on their learning needs, strengths, and areas for improvement.</p>
                <p className="font-bold text-gray-900 pt-0.5">Together, we help every student discover their potential, achieve their goals, and build a brighter future.</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/courses" className="px-7 py-3.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 flex items-center gap-2">
                  Start Learning <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Home Section */}
      <section className="py-6 md:py-8 bg-white border-t border-gray-100">
        <div className="w-full px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                About <span className="text-[var(--color-primary)]">Yash Educational</span> Institute
              </h2>
              <div className="w-16 h-1 bg-[var(--color-primary)] rounded-full mx-auto mt-3"></div>
            </div>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              {aboutData.heroDescription}
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0f172a] hover:bg-gray-800 text-white font-bold text-sm rounded-full transition-all shadow-md hover:shadow-xl active:scale-95 group"
              >
                Know More About Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-10 bg-gray-50">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 sm:whitespace-nowrap">Everything you need to succeed</h2>
            <p className="text-gray-500 text-lg">Our platform provides a comprehensive suite of tools designed to enhance learning and teaching experiences.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={Monitor} title="Live Classes" desc="Real-time interactive sessions with top educators." delay={0.1} />
            <FeatureCard icon={Play} title="Recorded Courses" desc="Learn at your own pace with high-quality video content." delay={0.2} />
            <FeatureCard icon={CheckCircle2} title="Mock Tests" desc="Prepare effectively with full-length timed practice tests." delay={0.3} />
            <FeatureCard icon={BookOpen} title="Regular Tests" desc="Weekly evaluations and practice tests for mastery." delay={0.4} />
            <FeatureCard icon={BookOpen} title="Assignments" desc="Regular homework and practice tasks for mastery." delay={0.1} />
            <FeatureCard icon={Award} title="Report Cards" desc="Detailed performance analysis and progress reports." delay={0.2} />
            <FeatureCard icon={Users} title="Parent Dashboard" desc="Keep track of your child's progress and attendance." delay={0.3} />
            <FeatureCard icon={Monitor} title="Student Dashboard" desc="Comprehensive analytics and personalized learning paths." delay={0.4} />
          </div>
        </div>
      </section>

      {/* Classes We Teach Section */}
      <section className="py-10 md:py-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              {homeConfig?.classesWeTeachSectionTitle || 'Classes We Teach'}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              {homeConfig?.classesWeTeachSectionSubtitle || 'Tailored curriculum and expert coaching designed for every milestone of your academic journey.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {(
              (homeConfig?.classesWeTeachCards?.length > 0)
                ? homeConfig.classesWeTeachCards
                : [
                    { title: 'Classes 1 – 5', tag: 'Primary', description: 'Building strong fundamentals in Math, Science & Language with activity-based learning.', highlights: ['Activity-Based Learning', 'Core Math & Science', 'Interactive Live Quizzes'], themeColor: 'red' },
                    { title: 'Classes 6 – 8', tag: 'Middle School', description: 'Conceptual clarity, analytical problem solving, and early Olympiad foundation.', highlights: ['Conceptual Deep Dives', 'Olympiad Preparation', 'Dedicated Doubt Clearing'], themeColor: 'blue' },
                    { title: 'Classes 9 – 10', tag: 'Boards Prep', description: 'Board Exam mastery, mock test series, and strong competitive foundation.', highlights: ['Board Exam Preparation', 'Timed Mock Test Series', '1-on-1 Academic Mentorship'], themeColor: 'amber' },
                    { title: 'Classes 11 – 12', tag: 'Senior & Entrance', description: 'Advanced Science & Commerce streams, JEE/NEET prep & board strategies.', highlights: ['JEE / NEET Focused Tracks', 'Science & Commerce Specialization', 'Live Problem Solving'], themeColor: 'purple' }
                  ]
            ).map((card: any, idx: number) => {
              const theme = card.themeColor || (idx === 0 ? 'red' : idx === 1 ? 'blue' : idx === 2 ? 'amber' : 'purple');
              
              const colorClasses = {
                red: { bg: 'from-rose-50/60 via-white to-white', border: 'border-rose-100/80 hover:border-red-200', iconBg: 'from-red-500 to-rose-400 shadow-red-200', badge: 'bg-rose-50 border-rose-200 text-rose-600', check: 'text-red-500', btn: 'bg-red-50 group-hover:bg-[var(--color-primary)] text-[var(--color-primary)] group-hover:text-white', icon: Sparkles },
                blue: { bg: 'from-blue-50/60 via-white to-white', border: 'border-blue-100/80 hover:border-blue-200', iconBg: 'from-blue-500 to-indigo-500 shadow-blue-200', badge: 'bg-blue-50 border-blue-200 text-blue-600', check: 'text-blue-500', btn: 'bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white', icon: Brain },
                amber: { bg: 'from-amber-50/60 via-white to-white', border: 'border-amber-100/80 hover:border-amber-200', iconBg: 'from-amber-500 to-orange-400 shadow-amber-200', badge: 'bg-amber-50 border-amber-200 text-amber-600', check: 'text-amber-500', btn: 'bg-amber-50 group-hover:bg-amber-600 text-amber-600 group-hover:text-white', icon: Target },
                purple: { bg: 'from-purple-50/60 via-white to-white', border: 'border-purple-100/80 hover:border-purple-200', iconBg: 'from-purple-600 to-indigo-600 shadow-purple-200', badge: 'bg-purple-50 border-purple-200 text-purple-600', check: 'text-purple-500', btn: 'bg-purple-50 group-hover:bg-purple-600 text-purple-600 group-hover:text-white', icon: Zap }
              }[theme as 'red' | 'blue' | 'amber' | 'purple'] || { bg: 'from-rose-50/60 via-white to-white', border: 'border-rose-100/80 hover:border-red-200', iconBg: 'from-red-500 to-rose-400 shadow-red-200', badge: 'bg-rose-50 border-rose-200 text-rose-600', check: 'text-red-500', btn: 'bg-red-50 group-hover:bg-[var(--color-primary)] text-[var(--color-primary)] group-hover:text-white', icon: Sparkles };

              const CardIcon = colorClasses.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 1) * 0.1, duration: 0.5 }}
                  className={`group bg-gradient-to-b ${colorClasses.bg} p-7 rounded-3xl border ${colorClasses.border} shadow-md hover:shadow-2xl transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses.iconBg} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <CardIcon className="w-7 h-7" />
                      </div>
                      <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${colorClasses.badge}`}>
                        {card.tag || 'Academic'}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {card.description}
                    </p>

                    <ul className="space-y-2.5 mb-2">
                      {(card.highlights || []).map((highlight: string, hIdx: number) => (
                        <li key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <CheckCircle2 className={`w-4 h-4 ${colorClasses.check} shrink-0`} /> {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching Method Section */}
      <TeachingMethod />

      {/* Educational Journey Section */}
      <EducationalJourney />

      {/* Course Details Modal */}
      {selectedCourseForDetails && (
        <CourseDetailsModal
          course={selectedCourseForDetails}
          onClose={() => setSelectedCourseForDetails(null)}
          onRequestQuery={(title: string) => setSelectedCourseForQuery(title)}
          onWatchVideo={(title: string, image?: string, videoUrl?: string) => {
            setSelectedCourseForDetails(null);
            navigate('/course-details', { state: { course: { title, image, videoUrl } } });
          }}
        />
      )}

      {/* Request Query Modal */}
      {selectedCourseForQuery && (
        <RequestQueryModal 
          courseTitle={selectedCourseForQuery} 
          onClose={() => setSelectedCourseForQuery(null)} 
        />
      )}

      {/* Watch Video Modal */}
      {selectedWatchVideo && (
        <WatchVideoModal 
          courseTitle={selectedWatchVideo.title}
          courseImage={selectedWatchVideo.image}
          videoUrl={selectedWatchVideo.videoUrl}
          onClose={() => setSelectedWatchVideo(null)} 
        />
      )}

    </div>
  );
};
