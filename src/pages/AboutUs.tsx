import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, BookOpen, ShieldCheck, HeartHandshake, Sparkles, Target, Compass } from 'lucide-react';

export const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState({
    title: 'Empowering Future Leaders & Achievers',
    subtitle: 'Yash Educational Institute is dedicated to nurturing academic excellence, critical thinking, and holistic development for students across all grades.',
    ourMission: 'To provide world-class personalized education and accessible learning tools that empower students to achieve top rank results in competitive exams and school curriculums.',
    ourVision: 'To become India\'s most trusted learning platform combining innovative teaching methods with interactive digital assessment and real-time student progress tracking.',
    stats: {
      studentsEnrolled: '5,000+',
      expertFaculty: '50+',
      successRate: '98%',
      coursesOffered: '120+'
    },
    coreValues: [
      { title: 'Academic Excellence', description: 'Curated curriculum designed by top subject matter experts.' },
      { title: 'Student-Centric Approach', description: 'Personalized learning pathways and 1-on-1 mentorship.' },
      { title: 'Integrity & Innovation', description: 'Cutting-edge digital evaluation with transparent progress tracking.' }
    ]
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setAboutData({
            title: data.title || 'Empowering Future Leaders & Achievers',
            subtitle: data.subtitle || 'Yash Educational Institute is dedicated to nurturing academic excellence...',
            ourMission: data.ourMission || '',
            ourVision: data.ourVision || '',
            stats: {
              studentsEnrolled: data.stats?.studentsEnrolled || '5,000+',
              expertFaculty: data.stats?.expertFaculty || '50+',
              successRate: data.stats?.successRate || '98%',
              coursesOffered: data.stats?.coursesOffered || '120+'
            },
            coreValues: Array.isArray(data.coreValues) && data.coreValues.length > 0 ? data.coreValues : [
              { title: 'Academic Excellence', description: 'Curated curriculum designed by top subject matter experts.' },
              { title: 'Student-Centric Approach', description: 'Personalized learning pathways and 1-on-1 mentorship.' },
              { title: 'Integrity & Innovation', description: 'Cutting-edge digital evaluation with transparent progress tracking.' }
            ]
          });
        }
      })
      .catch(err => console.error('Error loading About Us page data:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gray-900 py-24 relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-600/30 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full font-bold text-xs uppercase tracking-widest inline-block"
          >
            About Yash Educational Institute
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            {aboutData.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {aboutData.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-12 relative z-20 space-y-16">
        
        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-4 hover:shadow-2xl transition-all"
          >
            <div className="w-14 h-14 bg-red-50 text-[var(--color-primary)] rounded-2xl flex items-center justify-center font-bold">
              <Target className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed text-base">{aboutData.ourMission}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-4 hover:shadow-2xl transition-all"
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
              <Compass className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-base">{aboutData.ourVision}</p>
          </motion.div>
        </div>

        {/* Statistics Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
            <div className="space-y-1">
              <p className="text-4xl lg:text-5xl font-black text-red-500">{aboutData.stats.studentsEnrolled}</p>
              <p className="text-sm font-bold text-gray-300">Students Enrolled</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl lg:text-5xl font-black text-red-500">{aboutData.stats.expertFaculty}</p>
              <p className="text-sm font-bold text-gray-300">Expert Faculty</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl lg:text-5xl font-black text-red-500">{aboutData.stats.successRate}</p>
              <p className="text-sm font-bold text-gray-300">Success Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl lg:text-5xl font-black text-red-500">{aboutData.stats.coursesOffered}</p>
              <p className="text-sm font-bold text-gray-300">Courses Offered</p>
            </div>
          </div>
        </motion.div>

        {/* Core Values Section */}
        <div className="space-y-8 text-center">
          <div>
            <span className="text-xs font-extrabold text-[var(--color-primary)] uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Our Core Pillars & Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {aboutData.coreValues.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-3 hover:border-red-200 transition-all"
              >
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center font-bold text-red-600">
                  #{idx + 1}
                </div>
                <h4 className="text-xl font-bold text-gray-900">{val.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};
