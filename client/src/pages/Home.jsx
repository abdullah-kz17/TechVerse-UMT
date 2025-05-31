import React, { useState, useEffect } from 'react';
import {
    Search,
    MapPin,
    Users,
    Shield,
    Clock,
    MessageCircle,
    Bell,
    Camera,
    ChevronRight,
    Star,
    CheckCircle,
    Menu,
    X,
    ArrowRight,
    Smartphone,
    Headphones,
    Backpack,
    Key
} from 'lucide-react';

const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentStat, setCurrentStat] = useState(0);

    const stats = [
        { number: '2,547', label: 'Items Recovered' },
        { number: '1,823', label: 'Active Users' },
        { number: '98%', label: 'Success Rate' },
        { number: '24/7', label: 'Support Available' }
    ];

    const features = [
        {
            icon: <Search className="w-8 h-8" />,
            title: 'Smart Search & Filter',
            description: 'Advanced filtering by category, location, date, and description to find items quickly.'
        },
        {
            icon: <Camera className="w-8 h-8" />,
            title: 'Photo Documentation',
            description: 'Upload clear images of lost or found items for better identification and verification.'
        },
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: 'Real-time Chat',
            description: 'Secure messaging system between finders and claimers for safe item recovery.'
        },
        {
            icon: <Bell className="w-8 h-8" />,
            title: 'Instant Notifications',
            description: 'Get notified immediately when potential matches are found or claims are made.'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Secure Verification',
            description: 'University email authentication and admin oversight ensure platform security.'
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: '24/7 Accessibility',
            description: 'Report lost items or browse found items anytime, anywhere on campus.'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Computer Science Student',
            content: 'Found my laptop within 2 hours of posting! The real-time notifications made all the difference.',
            rating: 5
        },
        {
            name: 'Dr. Michael Chen',
            role: 'Faculty Member',
            content: 'As a professor, I appreciate how organized and secure this platform is. Great for campus community.',
            rating: 5
        },
        {
            name: 'Alex Rodriguez',
            role: 'Engineering Student',
            content: 'The photo feature helped me identify my lost phone immediately. Amazing system!',
            rating: 5
        }
    ];

    const categoryIcons = [
        { icon: <Smartphone className="w-12 h-12" />, label: 'Electronics', count: '342' },
        { icon: <Backpack className="w-12 h-12" />, label: 'Bags & Cases', count: '198' },
        { icon: <Key className="w-12 h-12" />, label: 'Keys & Cards', count: '156' },
        { icon: <Headphones className="w-12 h-12" />, label: 'Accessories', count: '89' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">


            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Trusted by 2,500+ Students
                                </div>
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Lost Something?
                                    <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    We'll Help You Find It
                  </span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    The most trusted campus lost & found platform. Report, search, and recover your belongings with our secure, real-time system designed for the UMT community.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group">
                                    Report Lost Item
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="border-2 border-blue-200 text-blue-700 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 flex items-center justify-center">
                                    Browse Found Items
                                    <Search className="w-5 h-5 ml-2" />
                                </button>
                            </div>

                            {/* Dynamic Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`text-center p-4 rounded-lg transition-all duration-500 ${
                                            currentStat === index
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                                                : 'bg-white/70 text-gray-700'
                                        }`}
                                    >
                                        <div className="text-2xl font-bold">{stat.number}</div>
                                        <div className="text-sm opacity-90">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 shadow-2xl">
                                <div className="bg-white rounded-2xl p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {categoryIcons.map((category, index) => (
                                            <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                                                <div className="text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                                                    {category.icon}
                                                </div>
                                                <div className="text-sm font-medium text-gray-800">{category.label}</div>
                                                <div className="text-xs text-blue-600">{category.count} items</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <div className="text-sm text-green-800">
                                                <span className="font-medium">12 new matches</span> found today!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Built specifically for campus communities with advanced features that make finding lost items faster, safer, and more reliable than ever before.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-200/50">
                                    <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600">
                            Simple, secure, and effective - recover your items in three easy steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Report or Browse',
                                description: 'Post details about your lost item or browse through found items with photos and descriptions.'
                            },
                            {
                                step: '02',
                                title: 'Connect Securely',
                                description: 'Use our secure chat system to communicate with finders or claimers while protecting your privacy.'
                            },
                            {
                                step: '03',
                                title: 'Recover Item',
                                description: 'Meet safely on campus to verify and return the item with admin oversight for security.'
                            }
                        ].map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{step.title}</h3>
                                    <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ChevronRight className="w-8 h-8 text-blue-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            What Our Community Says
                        </h2>
                        <p className="text-xl text-gray-600">
                            Real stories from students and faculty who found their belongings
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-blue-200/50">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-blue-600">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Find Your Lost Items?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of students who trust our platform for safe item recovery
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                            Get Started Now
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;