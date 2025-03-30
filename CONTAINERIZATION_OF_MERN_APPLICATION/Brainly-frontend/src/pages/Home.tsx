import  { useEffect } from 'react';
import { Brain, Share2, Youtube, Calendar, Twitter, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const features = [
  {
    icon: <Youtube className="w-6 h-6 text-indigo-500" />,
    title: 'Save YouTube Videos',
    description: 'Store and organize your favorite YouTube videos for easy access and future reference.'
  },
  {
    icon: <Twitter className="w-6 h-6 text-indigo-500" />,
    title: 'Tweet Collection',
    description: 'Keep track of important tweets and threads in your personal knowledge base.'
  },
  {
    icon: <Calendar className="w-6 h-6 text-indigo-500" />,
    title: 'Reminders & Tasks',
    description: 'Never miss important deadlines with our integrated reminder and task management system.'
  },
  {
    icon: <Share2 className="w-6 h-6 text-indigo-500" />,
    title: 'Shared Dashboards',
    description: 'Collaborate with others by sharing your dashboards and knowledge collections.'
  }
];

export function Home() {
  const navigate=useNavigate();
  const BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL;



  async function first() {
    try {
      const response = await axios.post(`${BACKEND_URL2}/test`);
      console.log("response", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(() => {
    first(); // Corrected function call
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Brain className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Digital Second Brain</span>
            <span className="block text-indigo-600">Organized and Accessible</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Store, organize, and share your digital life. From tweets to YouTube videos, 
            tasks to reminders – everything in one place.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <div onClick={()=>{
                navigate("/signin")
              }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get Started
              </div>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="absolute top-6 left-6">{feature.icon}</div>
                <div className="pt-12">
                  <h3 className="text-xl font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Trusted by creators worldwide</h2>
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">UI</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">50k+ Notes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">99% Uptime</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default Home;