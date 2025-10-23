import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
    const location = useLocation()

    const isActiveLink = (path) => {
        return location.pathname === path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:text-primary-600'
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link to="/" className="text-2xl font-bold text-primary-700">
                            Notional Machine Evaluator
                        </Link>
                        <nav className="flex space-x-8">
                            <Link 
                                to="/" 
                                className={`pb-2 transition-colors ${isActiveLink('/')}`}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/evaluation" 
                                className={`pb-2 transition-colors ${isActiveLink('/evaluation')}`}
                            >
                                Evaluation
                            </Link>
                            <Link 
                                to="/references" 
                                className={`pb-2 transition-colors ${isActiveLink('/references')}`}
                            >
                                References
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-gray-500">
                        <p>&copy; 2024 Notional Machine Evaluator. Built for computer science education.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout 