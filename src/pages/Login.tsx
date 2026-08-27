import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock, ArrowRight, User, Shield, Users, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import logoImg from '../images/Untitled design.png';

import { API_BASE_URL } from '../config/api';

export const Login = () => {
  const [role, setRole] = useState<'student' | 'parent'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const userEmail = email.trim();
    if (!userEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      let firebaseUid = '';

      // Firebase authentication
      try {
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
        firebaseUid = userCredential.user.uid;
      } catch (fbErr: any) {
        console.error("Firebase auth failed:", fbErr);
        let msg = 'Invalid email or password. Please try again.';
        if (fbErr.code === 'auth/wrong-password' || fbErr.code === 'auth/invalid-credential') {
          msg = 'Invalid password. Please check your password and try again.';
        } else if (fbErr.code === 'auth/user-not-found') {
          msg = 'No account found with this email address.';
        } else if (fbErr.code === 'auth/invalid-email') {
          msg = 'Invalid email address format.';
        } else if (fbErr.message) {
          msg = fbErr.message;
        }
        throw new Error(msg);
      }

      // Authenticate with backend API
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          role: role,
          firebaseUid: firebaseUid,
          fullName: userEmail.split('@')[0]
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Login failed. Please verify your email and password.');
      }

      const data = await res.json();
      const userRole = data.user.role || role;

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userFullName', data.user.fullName || userEmail.split('@')[0]);

      navigate(`/dashboard/${userRole}`, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Login failed. Please check your credentials or contact administrator.');
    }
  };

  const roleOptions = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'parent', label: 'Parent', icon: Users },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 xl:p-24 bg-white relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2">
          <img src={logoImg} alt="YashEdu Logo" className="h-12 w-auto object-contain" />
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-8">Please sign in to access your dashboard.</p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRole(option.id)}
                      className={`flex items-center gap-2 p-3 border rounded-xl font-medium transition-all ${
                        role === option.id 
                          ? 'border-[var(--color-primary)] bg-red-50 text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm font-medium text-[var(--color-primary)] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors text-lg mt-8 shadow-lg shadow-red-200">
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

        </motion.div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Students learning" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="inline-block px-4 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold mb-6">
              Learn Without Limits
            </span>
            <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              Unlock your potential<br/>with YashEdu Academy.
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              Join thousands of students and educators in the most engaging online learning platform.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
