import mongoose from 'mongoose'

const evaluationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10000
    },
    programmingLanguage: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    targetAudience: {
        type: String,
        trim: true,
        maxlength: 200
    },
    evaluation: {
        score: {
            type: Number,
            min: 0,
            max: 100
        },
        feedback: {
            type: String,
            maxlength: 5000
        },
        suggestions: {
            type: String,
            maxlength: 5000
        },
        evaluationDate: {
            type: Date,
            default: Date.now
        },
        // Enhanced detailed scoring structure
        detailedScores: {
            partA: { type: Number, min: 0, max: 10, default: 0 },      // Teaching Goal Accessibility
            partB1: { type: Number, min: 0, max: 20, default: 0 },     // Familiarity of NM terms
            partB2: { type: Number, min: 0, max: 20, default: 0 },     // Ease of building linkages
            partC1: { type: Number, min: 0, max: 15, default: 0 },     // No wrong understanding
            partC2: { type: Number, min: 0, max: 15, default: 0 },     // No limitation misunderstanding
            partD1: { type: Number, min: 0, max: 10, default: 0 },     // Teaching staff preparation cost
            partD2: { type: Number, min: 0, max: 10, default: 0 }      // Student learning cost
        },
        fullEvaluation: {
            type: String,
            maxlength: 15000  // Store the complete evaluation form
        },
        additionalComments: {
            type: String,
            maxlength: 2000
        }
    },
    metadata: {
        ipAddress: String,
        userAgent: String,
        evaluationDuration: Number, // in milliseconds
        modelUsed: String,
        tokensUsed: Number
    }
}, {
    timestamps: true
})

// Index for better query performance
evaluationSchema.index({ createdAt: -1 })
evaluationSchema.index({ 'evaluation.score': -1 })
evaluationSchema.index({ programmingLanguage: 1 })
evaluationSchema.index({ 'evaluation.detailedScores.partA': -1 })
evaluationSchema.index({ 'evaluation.detailedScores.partB1': -1 })
evaluationSchema.index({ 'evaluation.detailedScores.partB2': -1 })

// Virtual for evaluation age
evaluationSchema.virtual('evaluationAge').get(function() {
    return Date.now() - this.evaluation.evaluationDate.getTime()
})

// Virtual for detailed breakdown
evaluationSchema.virtual('evaluation.scoreBreakdown').get(function() {
    const scores = this.evaluation.detailedScores
    return {
        partA: scores.partA,
        partB: scores.partB1 + scores.partB2,
        partC: scores.partC1 + scores.partC2,
        partD: scores.partD1 + scores.partD2,
        total: scores.partA + scores.partB1 + scores.partB2 + scores.partC1 + scores.partC2 + scores.partD1 + scores.partD2
    }
})

const Evaluation = mongoose.model('Evaluation', evaluationSchema)

export default Evaluation 