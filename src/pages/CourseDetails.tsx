import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Star, Clock, Users, BookOpen, CheckCircle2, 
  ChevronDown, FileText, Award, Shield, Monitor
} from 'lucide-react';

export const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [openModule, setOpenModule] = useState(0);

  const curriculum = [
    { title: 'Module 1: Introduction to React', duration: '2h 15m', lectures: 5 },
    { title: 'Module 2: State and Props Deep Dive', duration: '3h 45m', lectures: 8 },
    { title: 'Module 3: Hooks & Custom Hooks', duration: '4h 20m', lectures: 10 },
    { title: 'Module 4: Routing and Navigation', duration: '2h 50m', lectures: 6 },
    { title: 'Module 5: State Management (Redux/Zustand)', duration: '5h 10m', lectures: 12 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Course Banner / Header */}
      <div className="bg-gray-900 text-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex gap-2 text-sm font-medium text-gray-400 mb-4">
                <span>Development</span>
                <span>›</span>
                <span>Web Development</span>
                <span>›</span>
                <span className="text-white">React</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Advanced React & Next.js Masterclass</h1>
              <p className="text-lg text-gray-300 mb-6">Master modern React from fundamentals to advanced patterns. Build enterprise-level applications with Next.js, Tailwind CSS, and TypeScript.</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-8">
                <div className="flex items-center gap-1 text-yellow-400 font-bold">
                  <Star className="w-4 h-4 fill-yellow-400" /> 4.9 <span className="text-gray-400 font-normal">(12,450 ratings)</span>
                </div>
                <div className="flex items-center gap-1"><Users className="w-4 h-4" /> 45,210 Students Enrolled</div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 32 Hours Total</div>
              </div>

              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=47" alt="Instructor" className="w-12 h-12 rounded-full border-2 border-gray-700" />
                <div>
                  <p className="font-bold">Created by Sarah Jenkins</p>
                  <p className="text-sm text-gray-400">Senior Frontend Engineer @ TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tabs */}
            <div className="bg-white rounded-t-2xl border-b border-gray-200 px-6 flex gap-8">
              {['About', 'Curriculum', 'Reviews', 'FAQ'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-bold text-sm border-b-2 transition-colors ${
                    activeTab === tab 
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]' 
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-b-2xl p-8 border border-gray-100 shadow-sm">
              {activeTab === 'About' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Build powerful, fast, user-friendly and reactive web apps",
                        "Provide amazing user experiences by leveraging the power of React",
                        "Learn all about React Hooks and Components",
                        "Build enterprise-level applications with Next.js App Router",
                        "Implement authentication, databases, and APIs",
                        "Master state management with Redux and Zustand"
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h3>
                    <div className="prose prose-gray max-w-none text-gray-600">
                      <p>React is the most popular Javascript library for building user interfaces. Next.js is the React framework for production. In this comprehensive course, you will learn both from scratch.</p>
                      <p>We'll start with the very basics of React, exploring components, props, state, and hooks. Then, we'll dive deep into advanced topics like performance optimization, context API, and complex state management.</p>
                      <p>Finally, we'll transition to Next.js, building a full-stack application with server-side rendering, static site generation, API routes, and database integration.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Curriculum' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex justify-between items-center mb-6 text-sm text-gray-500 font-medium">
                    <span>24 Sections • 245 Lectures • 32h 40m total length</span>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {curriculum.map((module, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-b-0">
                        <button 
                          onClick={() => setOpenModule(openModule === index ? -1 : index)}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left font-bold text-gray-900"
                        >
                          <span className="flex items-center gap-3">
                            <ChevronDown className={`w-5 h-5 transition-transform ${openModule === index ? 'rotate-180' : ''}`} />
                            {module.title}
                          </span>
                          <span className="text-sm font-normal text-gray-500 hidden sm:block">
                            {module.lectures} lectures • {module.duration}
                          </span>
                        </button>
                        
                        {openModule === index && (
                          <div className="p-4 bg-white space-y-2">
                            {[1, 2, 3].map(lecture => (
                              <div key={lecture} className="flex justify-between items-center py-2 px-2 hover:bg-gray-50 rounded-lg group cursor-pointer text-sm">
                                <div className="flex items-center gap-3">
                                  <Play className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)]" />
                                  <span className="text-gray-700 group-hover:text-[var(--color-primary)] transition-colors">Understanding React Fundamentals Part {lecture}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                  <span className="text-xs border border-[var(--color-primary)] text-[var(--color-primary)] px-2 py-0.5 rounded uppercase font-bold">Preview</span>
                                  <span>14:30</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column (Floating Card) */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              
              {/* Video Preview */}
              <div className="relative h-56 bg-gray-900 cursor-pointer group">
                <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <span className="text-white font-bold tracking-wide shadow-sm">Preview this course</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  {/* Price removed */}
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    Add to Cart
                  </button>
                  <button className="w-full py-4 bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-900 font-bold rounded-xl transition-all">
                    Buy Now
                  </button>
                </div>
                
                <p className="text-center text-xs text-gray-500 mb-6">30-Day Money-Back Guarantee</p>

                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-sm">This course includes:</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-3"><Monitor className="w-4 h-4" /> 32 hours on-demand video</li>
                    <li className="flex items-center gap-3"><FileText className="w-4 h-4" /> 14 articles & 28 downloadable resources</li>
                    <li className="flex items-center gap-3"><Monitor className="w-4 h-4" /> Access on mobile and TV</li>
                    <li className="flex items-center gap-3"><Award className="w-4 h-4" /> Certificate of completion</li>
                  </ul>
                </div>
                
                <hr className="my-6 border-gray-100" />
                
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Shield className="w-5 h-5 text-gray-400" />
                  Enterprise learning available
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
