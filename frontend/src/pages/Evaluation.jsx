import React, { useState } from 'react'
import axios from 'axios'

// Configure API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const Evaluation = () => {
    const [formData, setFormData] = useState({
        title: '',
        form: 'analogy-based',
        programmingLanguage: '',
        contentCategory: '',
        contentCategoryOther: '',
        conceptualAdvantage: '',
        drawsAttentionTo: '',
        useWhen: '',
        mappings: [{ plTerm: '', nmTerm: '' }],
        cost: '',
        details: '',
        targetAudience: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [evaluation, setEvaluation] = useState(null)
    const [error, setError] = useState(null)

    const categoryOptions = [
        'Collection - Array',
        'Collection - List',
        'Collection - Stack',
        'Collection - Queue',
        'Control Flow - Loops',
        'Control Flow - Conditionals',
        'Control Flow - Recursion',
        'Data Types - Variables',
        'Data Types - Objects',
        'Data Types - Primitives',
        'Memory - Allocation',
        'Memory - Garbage Collection',
        'Functions - Calls',
        'Functions - Parameters',
        'Object-Oriented - Classes',
        'Object-Oriented - Inheritance',
        'Object-Oriented - Polymorphism',
        'Algorithms - Sorting',
        'Algorithms - Searching',
        'Other - \<specify-by-yourself\>'
    ]

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleMappingChange = (index, field, value) => {
        const newMappings = [...formData.mappings]
        newMappings[index][field] = value
        setFormData({
            ...formData,
            mappings: newMappings
        })
    }

    const addMapping = () => {
        setFormData({
            ...formData,
            mappings: [...formData.mappings, { plTerm: '', nmTerm: '' }]
        })
    }

    const removeMapping = (index) => {
        if (formData.mappings.length > 1) {
            const newMappings = formData.mappings.filter((_, i) => i !== index)
            setFormData({
                ...formData,
                mappings: newMappings
            })
        }
    }

    const formatSubmissionData = () => {
        const mappingText = formData.mappings
            .filter(m => m.plTerm.trim() && m.nmTerm.trim())
            .map((m, i) => `${i + 1}. ${m.plTerm} | ${m.nmTerm}`)
            .join('\n')

        const contentCategoryDisplay = formData.contentCategory === 'Other - \<specify-by-yourself\>'
            ? (formData.contentCategoryOther || 'Other')
            : formData.contentCategory

        const description = `# Name of NM: ${formData.title}

# Form 
(2 Types of Base)
${formData.form}

# Programming Language
${formData.programmingLanguage}

# Content About (Categories)
${contentCategoryDisplay}

# Conceptual Advantage
${formData.conceptualAdvantage}

# Draws Attention To
${formData.drawsAttentionTo}

# Use When
${formData.useWhen}

# Mapping (PL|NM)
${mappingText}

# Cost
${formData.cost || '<not captured>'}

# Details
${formData.details || '<not shown>'}`

        return {
            title: formData.title,
            description: description,
            programmingLanguage: formData.programmingLanguage,
            targetAudience: formData.targetAudience
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setEvaluation(null)

        try {
            const submissionData = formatSubmissionData()
            const response = await axios.post(`${API_BASE_URL}/api/evaluate`, submissionData)
            setEvaluation(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during evaluation')
        } finally {
            setIsLoading(false)
        }
    }

    const loadDemo = async () => {
        setIsLoading(true)
        setError(null)
        setEvaluation(null)

        try {
            console.log('Attempting to load demo...') // Debug log
            const response = await axios.get(`${API_BASE_URL}/api/evaluate/demo`)
            console.log('Demo response:', response.data) // Debug log
            setEvaluation(response.data)
            
            // Populate form with demo data
            setFormData({
                title: 'Array as Clothesline',
                form: 'analogy-based',
                programmingLanguage: 'imperative / any',
                contentCategory: 'Collection - Array',
                contentCategoryOther: '',
                conceptualAdvantage: 'Makes arrays tangible, embodied activity.',
                drawsAttentionTo: 'Arrays are compound data structures.',
                useWhen: 'When the concept of lists is new',
                mappings: [
                    { plTerm: 'array', nmTerm: 'clothesline' },
                    { plTerm: 'array element', nmTerm: 'clothespin' },
                    { plTerm: 'element index', nmTerm: 'label on the pin' },
                    { plTerm: 'element value', nmTerm: 'paper sheet in the pin' }
                ],
                cost: '<not captured>',
                details: '<not shown>',
                targetAudience: 'University year 1 students around 20 years old'
            })
        } catch (err) {
            console.error('Demo loading error:', err) // Debug log
            console.error('Error response:', err.response) // Debug log
            
            let errorMessage = 'Failed to load demo'
            if (err.response) {
                // Server responded with error status
                errorMessage = err.response.data?.message || `Server error: ${err.response.status}`
            } else if (err.request) {
                // Request was made but no response received
                errorMessage = 'No response from server. Make sure the backend is running on port 3001.'
            } else {
                // Something else happened
                errorMessage = err.message
            }
            
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const ScoreBreakdown = ({ detailedScores, totalScore }) => {
        const getScoreColor = (score, maxScore) => {
            const percentage = (score / maxScore) * 100
            if (percentage >= 80) return 'bg-green-500'
            if (percentage >= 60) return 'bg-yellow-500'
            if (percentage >= 40) return 'bg-orange-500'
            return 'bg-red-500'
        }

        const getScoreRange = (score, maxScore, section) => {
            if (maxScore === 20) {
                // Part B sections
                if (score >= 16) return 'Excellent (16-20)'
                if (score >= 12) return 'Good (12-16)'
                if (score >= 8) return 'Fair (8-12)'
                if (score >= 4) return 'Poor (4-8)'
                return 'Very Poor (0-4)'
            } else if (maxScore === 15) {
                // Part C sections
                if (score >= 12) return 'Excellent (12-15)'
                if (score >= 9) return 'Good (9-12)'
                if (score >= 6) return 'Fair (6-9)'
                if (score >= 3) return 'Poor (3-6)'
                return 'Very Poor (0-3)'
            } else if (maxScore === 10) {
                // Part A and D sections
                if (maxScore === 10 && section === 'A') {
                    return score === 10 ? 'Achieved (10)' : 'Not Achieved (0)'
                }
                // Part D sections
                if (score >= 8) return 'Excellent (8-10)'
                if (score >= 6) return 'Good (6-8)'
                if (score >= 4) return 'Fair (4-6)'
                if (score >= 2) return 'Poor (2-4)'
                return 'Very Poor (0-2)'
            }
            return ''
        }

        const scoreItems = [
            { 
                label: 'Part A: Teaching Goal Accessibility', 
                score: detailedScores.partA, 
                maxScore: 10, 
                color: getScoreColor(detailedScores.partA, 10),
                section: 'A',
                description: 'Achievement of intended pedagogical objectives'
            },
            { 
                label: 'Part B1: Familiarity of Terms', 
                score: detailedScores.partB1, 
                maxScore: 20, 
                color: getScoreColor(detailedScores.partB1, 20),
                section: 'B1',
                description: 'How familiar are NM terms to university year 1 students'
            },
            { 
                label: 'Part B2: Ease of Building Linkages', 
                score: detailedScores.partB2, 
                maxScore: 20, 
                color: getScoreColor(detailedScores.partB2, 20),
                section: 'B2',
                description: 'Clarity and intuitiveness of PL→NM mappings'
            },
            { 
                label: 'Part C1: No Wrong Understanding', 
                score: detailedScores.partC1, 
                maxScore: 15, 
                color: getScoreColor(detailedScores.partC1, 15),
                section: 'C1',
                description: 'Risk of misunderstanding PL terms incorrectly'
            },
            { 
                label: 'Part C2: No Limitation Misunderstanding', 
                score: detailedScores.partC2, 
                maxScore: 15, 
                color: getScoreColor(detailedScores.partC2, 15),
                section: 'C2',
                description: 'Risk of misunderstanding scope and limitations'
            },
            { 
                label: 'Part D1: Staff Preparation Cost', 
                score: detailedScores.partD1, 
                maxScore: 10, 
                color: getScoreColor(detailedScores.partD1, 10),
                section: 'D1',
                description: 'Time and effort required for teaching staff preparation'
            },
            { 
                label: 'Part D2: Student Learning Cost', 
                score: detailedScores.partD2, 
                maxScore: 10, 
                color: getScoreColor(detailedScores.partD2, 10),
                section: 'D2',
                description: 'Time and effort required for students to learn'
            }
        ]

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Score Breakdown</h3>
                {scoreItems.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                                <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                            </div>
                            <div className="ml-4 text-right">
                                <span className="text-lg font-bold text-gray-900">{item.score}</span>
                                <span className="text-sm text-gray-500">/{item.maxScore}</span>
                                <div className="text-xs text-gray-500 mt-1">
                                    {getScoreRange(item.score, item.maxScore, item.section)}
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className={`h-3 rounded-full ${item.color} transition-all duration-300`}
                                style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
                
                {/* Summary by Parts */}
                <div className="border-t pt-4 mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Summary by Parts</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm font-medium text-blue-900">Part A</div>
                            <div className="text-lg font-bold text-blue-600">{detailedScores.partA}/10</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-sm font-medium text-green-900">Part B</div>
                            <div className="text-lg font-bold text-green-600">{detailedScores.partB1 + detailedScores.partB2}/40</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <div className="text-sm font-medium text-yellow-900">Part C</div>
                            <div className="text-lg font-bold text-yellow-600">{detailedScores.partC1 + detailedScores.partC2}/30</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-sm font-medium text-purple-900">Part D</div>
                            <div className="text-lg font-bold text-purple-600">{detailedScores.partD1 + detailedScores.partD2}/20</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                        <div className="text-lg font-semibold text-primary-900">Total Score</div>
                        <div className="text-3xl font-bold text-primary-600">{totalScore}/100</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Notional Machine Evaluation
                </h1>
                <p className="text-lg text-gray-600">
                    Submit your notional machine description for comprehensive AI-powered analysis using academic evaluation criteria
                </p>
                
                {/* Demo Button */}
                <div className="mt-6">
                    <button
                        onClick={loadDemo}
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-primary-300 rounded-md shadow-sm text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {isLoading ? 'Loading...' : 'Try Demo: Array as Clothesline'}
                    </button>
                </div>
            </div>

            {/* Enhanced Evaluation Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Your Notional Machine</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Name of NM *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="e.g., Array as Clothesline"
                            />
                        </div>

                        <div>
                            <label htmlFor="form" className="block text-sm font-medium text-gray-700 mb-2">
                                Form (2 Types of Base) *
                            </label>
                            <select
                                id="form"
                                name="form"
                                required
                                value={formData.form}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="analogy-based">analogy-based</option>
                                <option value="representation-based">representation-based</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="programmingLanguage" className="block text-sm font-medium text-gray-700 mb-2">
                                Programming Language *
                            </label>
                            <input
                                type="text"
                                id="programmingLanguage"
                                name="programmingLanguage"
                                required
                                value={formData.programmingLanguage}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="e.g., imperative / any, Python, JavaScript"
                            />
                        </div>

                        <div>
                            <label htmlFor="contentCategory" className="block text-sm font-medium text-gray-700 mb-2">
                                Content About (Categories) *
                            </label>
                            <select
                                id="contentCategory"
                                name="contentCategory"
                                required
                                value={formData.contentCategory}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Select a category...</option>
                                {categoryOptions.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {formData.contentCategory === 'Other - \<specify-by-yourself\>' && (
                        <div>
                            <label htmlFor="contentCategoryOther" className="block text-sm font-medium text-gray-700 mb-2">
                                Please specify the category *
                            </label>
                            <input
                                type="text"
                                id="contentCategoryOther"
                                name="contentCategoryOther"
                                required
                                value={formData.contentCategoryOther}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Enter your category"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
                            Target Audience
                        </label>
                        <input
                            type="text"
                            id="targetAudience"
                            name="targetAudience"
                            value={formData.targetAudience}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="e.g., University year 1 students around 20 years old"
                        />
                    </div>

                    {/* Conceptual Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Conceptual Framework</h3>
                        
                        <div>
                            <label htmlFor="conceptualAdvantage" className="block text-sm font-medium text-gray-700 mb-2">
                                Conceptual Advantage *
                            </label>
                            <textarea
                                id="conceptualAdvantage"
                                name="conceptualAdvantage"
                                required
                                rows={2}
                                value={formData.conceptualAdvantage}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="What is the main advantage of this notional machine?"
                            />
                        </div>

                        <div>
                            <label htmlFor="drawsAttentionTo" className="block text-sm font-medium text-gray-700 mb-2">
                                Draws Attention To *
                            </label>
                            <textarea
                                id="drawsAttentionTo"
                                name="drawsAttentionTo"
                                required
                                rows={2}
                                value={formData.drawsAttentionTo}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="What key concepts does this notional machine highlight?"
                            />
                        </div>

                        <div>
                            <label htmlFor="useWhen" className="block text-sm font-medium text-gray-700 mb-2">
                                Use When *
                            </label>
                            <textarea
                                id="useWhen"
                                name="useWhen"
                                required
                                rows={2}
                                value={formData.useWhen}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="In what context or situation should this notional machine be used?"
                            />
                        </div>
                    </div>

                    {/* Mapping Table */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Mapping (PL → NM) *</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Programming Language Term</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Notional Machine Term</th>
                                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.mappings.map((mapping, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    value={mapping.plTerm}
                                                    onChange={(e) => handleMappingChange(index, 'plTerm', e.target.value)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                                                    placeholder="e.g., array"
                                                    required={index === 0}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    value={mapping.nmTerm}
                                                    onChange={(e) => handleMappingChange(index, 'nmTerm', e.target.value)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                                                    placeholder="e.g., clothesline"
                                                    required={index === 0}
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {formData.mappings.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMapping(index)}
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={addMapping}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Mapping
                        </button>
                    </div>

                    {/* Optional Fields */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Additional Information (Optional)</h3>
                        
                        <div>
                            <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-2">
                                Cost
                            </label>
                            <textarea
                                id="cost"
                                name="cost"
                                rows={2}
                                value={formData.cost}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Any cost considerations for implementing this notional machine..."
                            />
                        </div>

                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                                Details
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                rows={4}
                                value={formData.details}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Additional details about how this notional machine works, implementation notes, or examples..."
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-colors ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-primary-600 hover:bg-primary-700'
                        }`}
                    >
                        {isLoading ? 'Evaluating...' : 'Submit for Evaluation'}
                    </button>
                </form>
            </div>

            {/* Evaluation Criteria Information */}
            <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Detailed Evaluation Criteria (Total: 100 marks)</h3>
                
                <div className="space-y-4">
                    {/* Part A */}
                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Part A: Teaching Goal Accessibility (10 marks)</h4>
                        <div className="text-sm text-blue-800">
                            <p>• 10 marks if teaching goal is ACHIEVED (basic requirement)</p>
                            <p>• 0 marks if teaching goal is NOT achieved (total zero)</p>
                        </div>
                    </div>

                    {/* Part B */}
                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Part B: Conceptual Clarity of Representations/Analogy (40 marks)</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <strong className="text-green-800">B1: Familiarity of Terms (20 marks)</strong>
                                <ul className="text-green-700 mt-1 space-y-1">
                                    <li>• 16-20: Very popular, universally familiar</li>
                                    <li>• 12-16: Quite familiar, most students relate</li>
                                    <li>• 8-12: Moderately familiar</li>
                                    <li>• 4-8: Somewhat familiar</li>
                                    <li>• 0-4: Obscure or unfamiliar</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-green-800">B2: Building Linkages (20 marks)</strong>
                                <ul className="text-green-700 mt-1 space-y-1">
                                    <li>• 16-20: Exceptionally clear, direct, intuitive</li>
                                    <li>• 12-16: Strong and mostly intuitive</li>
                                    <li>• 8-12: Generally clear with some gaps</li>
                                    <li>• 4-8: Some linkages, many weak</li>
                                    <li>• 0-4: Unclear or forced linkages</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Part C */}
                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">Part C: Misconception Risk (30 marks)</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <strong className="text-yellow-800">C1: No Wrong Understanding (15 marks)</strong>
                                <ul className="text-yellow-700 mt-1 space-y-1">
                                    <li>• 12-15: Very clear, almost no risk</li>
                                    <li>• 9-12: Low risk, mostly clear</li>
                                    <li>• 6-9: Some risk, needs explanation</li>
                                    <li>• 3-6: Significant risk of confusion</li>
                                    <li>• 0-3: Highly misleading</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-yellow-800">C2: No Scope Misunderstanding (15 marks)</strong>
                                <ul className="text-yellow-700 mt-1 space-y-1">
                                    <li>• 12-15: Very clear about scope</li>
                                    <li>• 9-12: Clear scope, minor exceptions</li>
                                    <li>• 6-9: Some scope confusion risk</li>
                                    <li>• 3-6: Significant scope misunderstanding risk</li>
                                    <li>• 0-3: Major scope misunderstandings likely</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-yellow-700">
                            <strong>Note:</strong> If serious misunderstandings are very likely, Part C receives zero marks.
                        </div>
                    </div>

                    {/* Part D */}
                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Part D: Teaching and Learning Cost (20 marks)</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <strong className="text-purple-800">D1: Staff Preparation (10 marks)</strong>
                                <ul className="text-purple-700 mt-1 space-y-1">
                                    <li>• 8-10: Minimal, highly practical</li>
                                    <li>• 6-8: Easy and efficient</li>
                                    <li>• 4-6: Manageable</li>
                                    <li>• 2-4: Difficult, significant resources</li>
                                    <li>• 0-2: Extremely costly, impractical</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-purple-800">D2: Student Learning (10 marks)</strong>
                                <ul className="text-purple-700 mt-1 space-y-1">
                                    <li>• 8-10: Very easy, minimal effort</li>
                                    <li>• 6-8: Easy for most students</li>
                                    <li>• 4-6: Reasonable effort</li>
                                    <li>• 2-4: Challenging, significant effort</li>
                                    <li>• 0-2: Very difficult, high barrier</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Evaluation Error
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Evaluation Results */}
            {evaluation && (
                <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Evaluation Results
                        </h2>
                        
                        {/* Score Breakdown */}
                        {evaluation.detailedScores && (
                            <ScoreBreakdown 
                                detailedScores={evaluation.detailedScores} 
                                totalScore={evaluation.score} 
                            />
                        )}
                    </div>

                    {/* Detailed Feedback */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Overall Comments</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="whitespace-pre-wrap text-gray-700">
                                {evaluation.feedback}
                            </div>
                        </div>
                    </div>

                    {/* Future Development Suggestions */}
                    {evaluation.suggestions && (
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Possible Future Developments</h3>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="whitespace-pre-wrap text-blue-800">
                                    {evaluation.suggestions}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Additional Comments */}
                    {evaluation.additionalComments && (
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Comments</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="whitespace-pre-wrap text-gray-700">
                                    {evaluation.additionalComments}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Full Evaluation Details */}
                    {evaluation.fullEvaluation && (
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <details className="group">
                                <summary className="text-xl font-semibold text-gray-900 mb-4 cursor-pointer group-open:mb-6">
                                    Complete Evaluation Form
                                    <span className="ml-2 text-sm text-gray-500">(Click to expand)</span>
                                </summary>
                                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                                        {evaluation.fullEvaluation}
                                    </pre>
                                </div>
                            </details>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Evaluation 