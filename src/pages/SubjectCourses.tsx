import { motion } from 'framer-motion';
import { Star, MapPin, Users } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RequestQueryModal } from '../components/RequestQueryModal';
import { WatchVideoModal } from '../components/WatchVideoModal';
import { CourseDetailsModal } from '../components/CourseDetailsModal';

const CourseCard = ({ image, title, instructor, rating, location, duration, students, price, subject, videoUrl, delay, onViewDetails }: any) => (
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
      
      <div className="pt-4 border-t border-gray-100 mt-auto">
        <button 
          onClick={() => onViewDetails({ image, title, instructor, rating, location, duration, students, price, subject, videoUrl })} 
          className="w-full py-2.5 bg-[var(--color-primary)] hover:bg-red-700 text-white font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-sm"
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
  }
];

export const SubjectCourses = () => {
  const navigate = useNavigate();
  const { subject } = useParams(); // gets 'mathematics', 'science-&-tech', etc.
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<any | null>(null);
  const [selectedCourseForQuery, setSelectedCourseForQuery] = useState<string | null>(null);
  const [selectedWatchVideo, setSelectedWatchVideo] = useState<{ title: string; image?: string; videoUrl?: string } | null>(null);

  useEffect(() => {
    const apiBase = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:5000' : '';
    const getFallback = () => {
      return defaultMockCourses.filter(c => {
        if (!c.subject) return false;
        const cSlug = c.subject.toLowerCase().replace(/\s+/g, '-');
        return cSlug === subject || subject?.includes(c.subject.toLowerCase());
      });
    };

    fetch(`${apiBase}/api/courses`)
      .then(res => res.json())
      .then(data => {
        const sourceData = Array.isArray(data) && data.length > 0 ? data : defaultMockCourses;
        const filtered = sourceData.filter((course: any) => {
          if (!course.subject) return false;
          const courseSlug = course.subject.toLowerCase().replace(/\s+/g, '-');
          return courseSlug === subject || subject?.includes(course.subject.toLowerCase());
        });
        setCourses(filtered.length > 0 ? filtered : getFallback());
        setLoading(false);
      })
      .catch(err => {
        console.warn("Using mock subject courses fallback:", err);
        setCourses(getFallback());
        setLoading(false);
      });
  }, [subject]);

  const displaySubject = subject ? subject.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <section className="bg-white py-20 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50 to-transparent opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/courses" className="text-[var(--color-primary)] hover:underline mb-4 inline-block font-medium">
            &larr; Back to all courses
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{displaySubject} Courses</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Explore our comprehensive collection of courses in {displaySubject}. Master new skills with expert instructors.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
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
                onViewDetails={(cDetails: any) => navigate('/course-details', { state: { course: cDetails } })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500">We couldn't find any courses for {displaySubject} right now.</p>
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
