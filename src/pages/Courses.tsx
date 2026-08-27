import { motion } from 'framer-motion';
import { Star, MapPin, Users, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RequestQueryModal } from '../components/RequestQueryModal';
import { WatchVideoModal } from '../components/WatchVideoModal';
import { CourseDetailsModal } from '../components/CourseDetailsModal';

// Reusing a similar CourseCard component for consistency
const CourseCard = ({ image, title, instructor, rating, location, duration, students, price, subject, videoUrl, delay, onViewDetails }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col"
  >
    <div className="relative h-28 sm:h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      
      {/* Subject Badge */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-purple-100/90 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold text-purple-700">
        {subject || 'Uncategorized'}
      </div>

      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-[11px] sm:text-sm font-bold flex items-center gap-1">
        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
        {rating}
      </div>
    </div>
    <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
      <div>
        <h3 className="font-bold text-xs sm:text-xl text-gray-900 mb-2 sm:mb-4 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug">{title}</h3>
        
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-4 text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-6 font-medium">
          <span className="flex items-center gap-1 truncate max-w-[120px]"><MapPin className="w-3 h-3 shrink-0" /> {location || duration || 'N/A'}</span>
          <span className="flex items-center gap-1 shrink-0"><Users className="w-3 h-3 shrink-0" /> {students}</span>
        </div>
      </div>
      
      <div className="pt-2 sm:pt-4 border-t border-gray-100 mt-auto flex gap-2">
        <button 
          onClick={() => onViewDetails({ image, title, instructor, rating, location, duration, students, price, subject, videoUrl })} 
          className="flex-1 py-1.5 sm:py-2.5 bg-[var(--color-primary)] hover:bg-red-700 text-white font-bold rounded-lg sm:rounded-xl transition-all text-[11px] sm:text-xs flex items-center justify-center gap-2 shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  </motion.div>
);

const defaultMockCourses = [
  {
    _id: 'mock-1',
    title: 'Complete Mathematics & Calculus Mastery',
    instructor: 'Prof. Rajesh Sharma',
    rating: '4.9',
    location: 'YashEdu Main Campus & Online',
    duration: '6 Months',
    students: '1,240 Students',
    price: '₹4,999',
    subject: 'Mathematics',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: 'mock-2',
    title: 'Advanced Physics: Mechanics & Electromagnetism',
    instructor: 'Dr. Anita Verma',
    rating: '4.8',
    location: 'YashEdu Science Lab',
    duration: '4 Months',
    students: '980 Students',
    price: '₹5,499',
    subject: 'Science',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: 'mock-3',
    title: 'Organic & Inorganic Chemistry Foundation',
    instructor: 'Dr. Suresh Kumar',
    rating: '4.9',
    location: 'Online Live Interactive',
    duration: '5 Months',
    students: '1,150 Students',
    price: '₹4,799',
    subject: 'Science',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: 'mock-4',
    title: 'English Communication & Literature Excellence',
    instructor: 'Ms. Priya Menon',
    rating: '4.7',
    location: 'YashEdu Language Wing',
    duration: '3 Months',
    students: '820 Students',
    price: '₹3,499',
    subject: 'English',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: 'mock-5',
    title: 'Cell Biology & Human Anatomy Deep Dive',
    instructor: 'Dr. Meenakshi Sundaram',
    rating: '4.9',
    location: 'YashEdu Medical Prep Wing',
    duration: '6 Months',
    students: '1,420 Students',
    price: '₹5,999',
    subject: 'Science',
    image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: 'mock-6',
    title: 'Competitive Mathematics & Olympiad Problem Solving',
    instructor: 'Prof. Rajesh Sharma',
    rating: '5.0',
    location: 'Online Live & Recorded',
    duration: '4 Months',
    students: '670 Students',
    price: '₹4,299',
    subject: 'Mathematics',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>(defaultMockCourses);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const defaultSubjects = ['Mathematics', 'Science', 'English'];
  const [subjectsList, setSubjectsList] = useState<string[]>(defaultSubjects);
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<any | null>(null);
  const [selectedCourseForQuery, setSelectedCourseForQuery] = useState<string | null>(null);
  const [selectedWatchVideo, setSelectedWatchVideo] = useState<{ title: string; image?: string; videoUrl?: string } | null>(null);

  useEffect(() => {
    const apiBase = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:5000' : '';
    // Fetch courses with mock fallback
    fetch(`${apiBase}/api/courses`)
      .then(res => res.json())
      .then(data => {
        const fetchedCourses = Array.isArray(data) && data.length > 0 ? data : defaultMockCourses;
        setCourses(fetchedCourses);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Using mock courses fallback:", err);
        setCourses(defaultMockCourses);
        setLoading(false);
      });

    // Fetch subjects dynamically from backend
    fetch(`${apiBase}/api/subjects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const names = data.map((s: any) => s.name).filter(Boolean);
          if (names.length > 0) {
            setSubjectsList(names);
          }
        }
      })
      .catch(err => console.warn("Using default subjects list:", err));
  }, []);

  const getSubjectCount = (subjectName: string) => {
    if (subjectName === 'All') return courses.length;
    return courses.filter(c => c.subject?.toLowerCase().trim() === subjectName.toLowerCase().trim()).length;
  };

  const filteredCourses = courses.filter(c => {
    const matchesSubject = selectedSubject === 'All' || c.subject?.toLowerCase().trim() === selectedSubject.toLowerCase().trim();
    const query = courseSearchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      c.title?.toLowerCase().includes(query) || 
      c.subject?.toLowerCase().includes(query) ||
      c.location?.toLowerCase().includes(query);
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* All Courses Grid */}
      <section className="w-full px-6 sm:px-10 lg:px-16 pt-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">All Available Courses</h2>
            <p className="text-gray-500 text-sm mt-1">Explore our complete catalog of certified courses and training programs</p>
          </div>

          {/* Middle Subject Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 bg-white border border-gray-200 rounded-2xl shadow-xs max-w-full">
            <button
              onClick={() => setSelectedSubject('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedSubject === 'All'
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>All Subjects</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                selectedSubject === 'All' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {getSubjectCount('All')}
              </span>
            </button>
            {subjectsList.map((subjectName, idx) => {
              const count = getSubjectCount(subjectName);
              const isSelected = selectedSubject.toLowerCase().trim() === subjectName.toLowerCase().trim();
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSubject(subjectName)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>{subjectName}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Search Bar */}
          <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto shrink-0 mt-2 lg:mt-0">
            <div className="relative flex-1 sm:w-64">
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={courseSearchQuery}
                onChange={(e) => setCourseSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-xs font-medium shadow-xs transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <span className="inline-flex text-[11px] sm:text-xs font-extrabold text-[var(--color-primary)] bg-red-50 px-3 py-2 rounded-full border border-red-100 shrink-0 whitespace-nowrap">
              {filteredCourses.length} Total
            </span>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {filteredCourses.map((course, index) => (
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
                onViewDetails={(cDetails: any) => navigate('/course-details', { state: { course: cDetails } })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-base font-medium">No courses available yet.</p>
          </div>
        )}
      </section>
      
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
