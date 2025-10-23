import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Notional Machine Evaluator
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    A comprehensive AI-powered tool for evaluating notional machines using rigorous academic criteria in computer science education
                </p>
            </div>

            {/* What is a Notional Machine */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    What is a Notional Machine?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    A notional machine is a simplified, conceptual model of how a computer or programming language works. 
                    It serves as a pedagogical tool in computer science education, helping students understand complex 
                    computational processes through accessible mental models and analogies.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    These conceptual models bridge the gap between abstract programming concepts and concrete understanding, 
                    making it easier for learners to grasp how code execution, memory management, and data structures operate.
                </p>
            </div>

            {/* Evaluation System */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Academic Evaluation System
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Our evaluation system uses rigorous academic criteria based on computer science education research, 
                    providing detailed feedback across four key dimensions:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Part A: Teaching Goal Accessibility (10 pts)</h3>
                        <p className="text-gray-600 text-sm">
                            Evaluates whether the notional machine successfully achieves its intended pedagogical objectives.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Part B: Conceptual Clarity of Representations/Analogy (40 pts)</h3>
                        <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Familiarity of terms for target audience (20 pts)</li>
                            <li>• Ease of building conceptual linkages (20 pts)</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Part C: Misconception Risk (30 pts)</h3>
                        <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Prevention of conceptual errors (15 pts)</li>
                            <li>• Avoiding scope limitations (15 pts)</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Part D: Teaching and Learning Cost (20 pts)</h3>
                        <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Staff preparation requirements (10 pts)</li>
                            <li>• Student learning effort (10 pts)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* How to Use */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    How to Use This Website
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-primary-600">1</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Your Model</h3>
                        <p className="text-gray-600">
                            Describe your notional machine using our structured format, including mappings and conceptual advantages
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-primary-600">2</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
                        <p className="text-gray-600">
                            Our AI evaluates your model using academic criteria, providing detailed scores across all dimensions
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-primary-600">3</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Detailed Feedback</h3>
                        <p className="text-gray-600">
                            Receive comprehensive analysis, score breakdowns, and specific suggestions for improvement
                        </p>
                    </div>
                </div>
            </div>

            {/* Example Results */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Example: Array as Clothesline (Score: 93/100)
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Detailed Score Breakdown:</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                                <span>Part A: Teaching Goal Accessibility</span>
                                <span className="font-semibold text-green-600">10/10 (Achieved)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Part B1: Familiarity of Terms</span>
                                <span className="font-semibold text-yellow-600">18/20 (Good)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Part B2: Building Linkages</span>
                                <span className="font-semibold text-green-600">19/20 (Excellent)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Part C1: No Wrong Understanding</span>
                                <span className="font-semibold text-yellow-600">14/15 (Excellent)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Part C2: No Scope Misunderstanding</span>
                                <span className="font-semibold text-yellow-600">14/15 (Excellent)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Part D1: Staff Preparation Cost</span>
                                <span className="font-semibold text-green-600">9/10 (Excellent)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Part D2: Student Learning Cost</span>
                                <span className="font-semibold text-green-600">9/10 (Excellent)</span>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-indigo-200">
                            <h4 className="font-medium text-gray-900 mb-2">Summary by Parts:</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Part A:</span>
                                    <span className="font-semibold">10/10</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Part B:</span>
                                    <span className="font-semibold">37/40</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Part C:</span>
                                    <span className="font-semibold">28/30</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Part D:</span>
                                    <span className="font-semibold">18/20</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Key Insights from Detailed Analysis:</h3>
                        <ul className="text-sm text-gray-700 space-y-2">
                            <li>• <strong>Excellent conceptual mapping:</strong> Clear linkages between array concepts and clothesline analogy (19/20)</li>
                            <li>• <strong>Minor familiarity concerns:</strong> Clothesline metaphor may be less familiar to some modern students (18/20)</li>
                            <li>• <strong>Low misunderstanding risk:</strong> Analogy is generally clear with minor potential for sequential access misconceptions</li>
                            <li>• <strong>Highly practical:</strong> Easy for both staff preparation and student learning with minimal resources required</li>
                            <li>• <strong>Strong pedagogical foundation:</strong> Successfully achieves core teaching objectives for array understanding</li>
                        </ul>
                        
                        <div className="mt-4 p-3 bg-white rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-1">Performance Grade</h4>
                            <div className="text-2xl font-bold text-green-600">A- (93/100)</div>
                            <div className="text-xs text-gray-600">Excellent with minor improvements possible</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-primary-50 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Ready to Evaluate Your Notional Machine?
                </h2>
                <p className="text-gray-700 mb-6">
                    Get comprehensive academic-grade evaluation with detailed feedback and actionable insights
                </p>
                <Link 
                    to="/evaluation" 
                    className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                    Start Evaluation
                </Link>
            </div>
        </div>
    )
}

export default Home 