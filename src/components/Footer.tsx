import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, Hash, Camera, Briefcase, Video } from 'lucide-react';
import logoImg from '../images/Untitled design.png';
import { useState, useEffect } from 'react';

export const Footer = () => {
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/subjects')
      .then(res => res.json())
      .then(data => setSubjects(data.slice(0, 6))) // limit to 6 for footer
      .catch(err => console.error('Failed to fetch subjects:', err));
  }, []);
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="YashEdu Logo" className="h-20 w-auto object-contain scale-125 origin-left" />
            </Link>
            <p className="text-gray-500 max-w-sm">
              Learn without limits. Interactive live classes, recorded courses, AI learning, and comprehensive progress tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-gray-500">
              <li><Link to="/about" className="hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-[var(--color-primary)] transition-colors">Blogs</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-primary)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Courses</h4>
            <ul className="flex flex-col gap-3 text-gray-500">
              {subjects.length > 0 ? (
                subjects.map(subject => (
                  <li key={subject._id}>
                    <Link to={`/courses/${subject.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[var(--color-primary)] transition-colors">
                      {subject.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/courses/math" className="hover:text-[var(--color-primary)] transition-colors">Mathematics</Link></li>
                  <li><Link to="/courses/science" className="hover:text-[var(--color-primary)] transition-colors">Science & Tech</Link></li>
                  <li><Link to="/courses/engineering" className="hover:text-[var(--color-primary)] transition-colors">Engineering</Link></li>
                  <li><Link to="/courses/design" className="hover:text-[var(--color-primary)] transition-colors">UI/UX Design</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="flex flex-col gap-3 text-gray-500">
              <li><Link to="/help" className="hover:text-[var(--color-primary)] transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-[var(--color-primary)] transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} YashEdu Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-[var(--color-primary)] hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-[var(--color-primary)] hover:text-white transition-colors">
              <Hash className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/yasheduacademy?igsi=cjA5eTM2dTEycnlk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-pink-600 hover:text-white transition-colors"
              title="Instagram - Yash Edu Academy"
            >
              <Camera className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-[var(--color-primary)] hover:text-white transition-colors">
              <Briefcase className="w-5 h-5" />
            </a>
            <a 
              href="https://www.youtube.com/@yasheduacademy/videos" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white transition-colors"
              title="YouTube - Yash Edu Academy"
            >
              <Video className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
