import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Users, Search, BookOpen, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RequestQueryModal } from '../components/RequestQueryModal';
import { WatchVideoModal } from '../components/WatchVideoModal';

// Reusing a similar CourseCard component for consistency
const CourseCard = ({ image, title, instructor, rating, location, duration, students, price, subject, videoUrl, delay, onRequestQuery, onWatchVideo }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col"
  >
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      
      {/* Subject Badge */}
      <div className="absolute top-4 left-4 bg-purple-100/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-purple-700">
        {subject || 'Uncategorized'}
      </div>

      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        {rating}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">{title}</h3>
      
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-medium">
        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {location || duration || 'Location N/A'}</span>
        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {students}</span>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto gap-2">
        <button 
          onClick={() => onWatchVideo && onWatchVideo(title, image, videoUrl)} 
          className="px-3 py-2 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-[var(--color-primary)] font-bold rounded-lg transition-all text-xs flex items-center gap-1.5 border border-gray-200 hover:border-red-200"
        >
          <Play className="w-3.5 h-3.5 fill-red-600 text-red-600" /> Watch Video
        </button>

        <button 
          onClick={() => onRequestQuery(title)} 
          className="px-3.5 py-2 bg-red-50 text-[var(--color-primary)] font-bold rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors text-xs"
        >
          Request Query
        </button>
      </div>
    </div>
  </motion.div>
);

export const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseForQuery, setSelectedCourseForQuery] = useState<string | null>(null);
  const [selectedWatchVideo, setSelectedWatchVideo] = useState<{ title: string; image?: string; videoUrl?: string } | null>(null);
  
  // Subject filtering and expanding state
  const [subjectSearchQuery, setSubjectSearchQuery] = useState('');
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  useEffect(() => {
    // Fetch courses
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
      });

    // Fetch subjects
    fetch('http://localhost:5000/api/subjects')
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching subjects:", err);
        setLoading(false);
      });
  }, []);

  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(subjectSearchQuery.toLowerCase())
  );

  const displayedSubjects = showAllSubjects ? filteredSubjects : filteredSubjects.slice(0, 12);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <section className="bg-white py-20 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50 to-transparent opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Courses</h1>
          <p className="text-lg text-gray-500 max-w-2xl">Discover and master new skills. Browse through our extensive directory of subjects or check out our trending courses below.</p>
        </div>
      </section>

      {/* Subjects Directory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">Explore by Subject</h2>
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search subjects..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-white shadow-sm"
              value={subjectSearchQuery}
              onChange={(e) => {
                setSubjectSearchQuery(e.target.value);
                setShowAllSubjects(true); // Auto expand when searching
              }}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : (
          <>
            {filteredSubjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {displayedSubjects.map((subject, index) => (
                  <motion.div
                    key={subject._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (index % 12) }}
                  >
                    <Link 
                      to={`/courses/${subject.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all flex flex-col items-center justify-center text-center gap-3 group h-full"
                    >
                      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-gray-800 group-hover:text-[var(--color-primary)]">{subject.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">No subjects found matching "{subjectSearchQuery}".</p>
              </div>
            )}

            {!subjectSearchQuery && filteredSubjects.length > 12 && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setShowAllSubjects(!showAllSubjects)}
                  className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] rounded-xl font-bold transition-all shadow-sm"
                >
                  {showAllSubjects ? 'Back to Top Subjects' : 'View All Subjects'}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* All Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">All Available Courses</h2>
            <p className="text-gray-500 text-sm mt-1">Explore our complete catalog of certified courses and training programs</p>
          </div>
          <span className="text-xs font-extrabold text-[var(--color-primary)] bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            {courses.length} {courses.length === 1 ? 'Course' : 'Courses'} Total
          </span>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <CourseCard 
                key={course._id || index}
                image={course.image}
                title={course.title}
                instructor={course.instructor}
                rating={course.rating}
                location={course.location}
                duration={course.duration}
                students={course.students}
                price={course.price}
                subject={course.subject}
                videoUrl={course.videoUrl}
                delay={0.1 * (index % 4 + 1)}
                onRequestQuery={(title: string) => setSelectedCourseForQuery(title)}
                onWatchVideo={(title: string, image?: string, videoUrl?: string) => setSelectedWatchVideo({ title, image, videoUrl })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-base font-medium">No courses available yet.</p>
          </div>
        )}
      </section>
      
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
