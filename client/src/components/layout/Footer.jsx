import React from 'react';
import {Search} from "lucide-react";


export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                                <Search className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">UMT Lost & Found</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            The trusted campus lost & found platform connecting the UMT community to recover lost belongings safely and efficiently.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <div className="space-y-2 text-gray-400">
                            <div>Report Lost Item</div>
                            <div>Browse Found Items</div>
                            <div>How It Works</div>
                            <div>Support</div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <div className="space-y-2 text-gray-400">
                            <div>support@umt.edu.pk</div>
                            <div>+92 42 111 300 200</div>
                            <div>UMT Campus, Lahore</div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 UMT Lost & Found Portal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
