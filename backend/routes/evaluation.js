import express from 'express'
import OpenAI from 'openai'
import Evaluation from '../models/Evaluation.js'

const router = express.Router()

// Function to get OpenAI client (lazy initialization)
const getOpenAIClient = () => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY environment variable is not set. Please check your .env file.')
    }
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
}

// GET /api/evaluate/demo - Demo evaluation with Array as Clothesline example
// This route must come BEFORE the POST route to avoid conflicts
router.get('/demo', async (req, res) => {
    try {
        console.log('Demo endpoint hit') // Debug log
        
        const demoEvaluation = {
            score: 93,
            detailedScores: {
                partA: 10,
                partB1: 18,
                partB2: 19,
                partC1: 14,
                partC2: 14,
                partD1: 9,
                partD2: 9
            },
            feedback: `The "Array as Clothesline" notional machine is a well-conceived analogy that makes the abstract concept of arrays more relatable to novice programmers. Its mappings are straightforward, fostering a clear understanding of arrays as compound data structures.`,
            suggestions: `Consider updating the materials to include alternative analogies for diverse student groups less familiar with clotheslines, ensuring the analogy's relevance and accessibility. More dynamic analogies could also address potential misconceptions about the immutable nature of arrays.`,
            additionalComments: `Incorporating physical activities, such as setting up a real or virtual clothesline, could enhance the experiential learning aspect, further solidifying the understanding. Additionally, connecting this analogy to more advanced array operations can bridge foundational concepts to more complex programming topics.`,
            fullEvaluation: `--- EVALUATION FORM TEMPLATE START ---
# Name of the Evaluated Notional Machine: Array as Clothesline

# Full mark is 100:
------------------------------------------------------------------------------------------------------------------------------
# Part A - 10 marks - teaching goal achieved
## i. (10 basic marks) if teaching goal is ACHIEVED, have 10 marks as BASIC marks.
### Mark of A(i): 10
### Reasons for mark above: The notional machine effectively achieves its teaching goal by making the concept of arrays more tangible and accessible, especially for beginners, by using a relatable analogy.

## ii. (total zero) if teaching goal is NOT achieved, directly receive TOTAL ZERO marks.
### Mark of A(ii): N/A
### Reasons for mark above: As the teaching goal is achieved, this marking criterion is not applicable.

------------------------------------------------------------------------------------------------------------------------------
# Part B - 40 marks - feeling easy to understand the analogy or representation been used from PL term(s) to NM term(s)
## i. (20 marks) the NM term(s) must be popular for most learners in reality, the learners here are assumed to be university year 1 students around 20 years old.
### Mark of B(i): 18
### Reasons for mark above: The clothesline analogy is relatively common and should be familiar to most learners. However, it is slightly dated, as not all students may have direct experience with a clothesline, potentially limiting familiarity.

## ii. (20 marks) easy to build linkages between PL term(s) and NM term(s)
### Mark of B(ii): 19
### Reasons for mark above: There is a clear mapping of concepts: arrays to clotheslines, array elements to clothespins, index labels to labels on pins, and values to paper sheets. This structure facilitates easy conceptual linkage.

------------------------------------------------------------------------------------------------------------------------------
# Part C - 30 marks - not easy to lead to misunderstanding of concepts, including:
## i. (15 marks) not easy to misunderstand PL term(s) in a wrong way, e.g., misunderstand that "apple is an animal, not a fruit".
### Mark of C(i): 14
### Reason for mark above: The analogy is straightforward but could lead to a minor misunderstanding if students perceive the linear nature of a clothesline as a constraint on array operations, imagining arrays as always sequentially accessed.

## ii. (15 marks) not easy to lead to limitation scope misunderstanding, e.g., misunderstand that "the standards of being a square are standards of being all rectangles".
### Mark of C(ii): 14
### Reason for mark above: While the analogy works well, it might implicitly suggest that arrays are static structures like clotheslines, potentially obscuring the dynamic nature of arrays in programming (e.g., resizing).

## iii. (Part C zero) if there exist serious misunderstanding very likely to happen, receive Part C zero.
### Mark of C(iii): N/A
### Reason for mark above: There is no serious likelihood of misunderstanding that would warrant a zero in this part.

------------------------------------------------------------------------------------------------------------------------------
# Part D - 20 mark - Teaching and Learning Cost is proper
## i. (10 marks) time and other costs for teaching staff to prepare is proper
### Mark of D(i): 9
### Reason for mark above: Preparation for using this notional machine is straightforward, possibly requiring minimal physical materials or diagrams, which are easily procurable or creatable.

## ii. (10 marks) time and other costs for students to learn is proper
### Mark of D(ii): 9
### Reason for mark above: Students can quickly grasp the analogy, requiring only a short introduction. Some might need additional examples if they are unfamiliar with a clothesline.

------------------------------------------------------------------------------------------------------------------------------
# Total Mark: 93
## Overall Comments:
### About Evaluation on What Have Been Done:
The "Array as Clothesline" notional machine is a well-conceived analogy that makes the abstract concept of arrays more relatable to novice programmers. Its mappings are straightforward, fostering a clear understanding of arrays as compound data structures.

### About Possible Future Developments:
Consider updating the materials to include alternative analogies for diverse student groups less familiar with clotheslines, ensuring the analogy's relevance and accessibility. More dynamic analogies could also address potential misconceptions about the immutable nature of arrays.

### Others (optional):
Incorporating physical activities, such as setting up a real or virtual clothesline, could enhance the experiential learning aspect, further solidifying the understanding. Additionally, connecting this analogy to more advanced array operations can bridge foundational concepts to more complex programming topics.

--- EVALUATION FORM TEMPLATE END ---`
        }

        console.log('Sending demo evaluation response') // Debug log
        res.json(demoEvaluation)
    } catch (error) {
        console.error('Demo evaluation error:', error)
        res.status(500).json({ message: 'Failed to load demo evaluation' })
    }
})

// GET /api/evaluate/stats - Get evaluation statistics
router.get('/stats', async (req, res) => {
    try {
        const stats = await Evaluation.aggregate([
            {
                $group: {
                    _id: null,
                    totalEvaluations: { $sum: 1 },
                    averageScore: { $avg: '$evaluation.score' },
                    topLanguages: { $push: '$programmingLanguage' }
                }
            }
        ])

        const languageStats = await Evaluation.aggregate([
            {
                $group: {
                    _id: '$programmingLanguage',
                    count: { $sum: 1 },
                    avgScore: { $avg: '$evaluation.score' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ])

        res.json({
            total: stats[0]?.totalEvaluations || 0,
            averageScore: Math.round((stats[0]?.averageScore || 0) * 100) / 100,
            topLanguages: languageStats
        })
    } catch (error) {
        console.error('Stats error:', error)
        res.status(500).json({ message: 'Failed to fetch statistics' })
    }
})

// Validation middleware
const validateEvaluationRequest = (req, res, next) => {
    const { title, description, programmingLanguage } = req.body

    if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: 'Title is required' })
    }

    if (!description || description.trim().length === 0) {
        return res.status(400).json({ message: 'Description is required' })
    }

    if (!programmingLanguage || programmingLanguage.trim().length === 0) {
        return res.status(400).json({ message: 'Programming language/concept is required' })
    }

    if (description.length > 10000) {
        return res.status(400).json({ message: 'Description is too long (max 10,000 characters)' })
    }

    next()
}

// POST /api/evaluate - Evaluate a notional machine
router.post('/', validateEvaluationRequest, async (req, res) => {
    const startTime = Date.now()
    
    try {
        const { title, description, programmingLanguage, targetAudience } = req.body

        // Check if OpenAI API key is available
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ 
                message: 'OpenAI API key is not configured. Please contact the administrator.' 
            })
        }

        // Initialize OpenAI client
        const openai = getOpenAIClient()

        // Create evaluation prompt matching the prototype structure
        const prompt = `
You are an expert in computer science education and notional machines. Please evaluate the following notional machine description using the detailed marking criteria below.

**Notional Machine to Evaluate:**
Title: ${title}
Programming Language/Concept: ${programmingLanguage}
Target Audience: ${targetAudience || 'University year 1 students around 20 years old'}

Description:
${description}

**DETAILED EVALUATION CRITERIA (Total: 100 marks):**

**Part A - 10 marks - Teaching Goal Accessibility**
- i. (10 basic marks) if teaching goal is ACHIEVED, award 10 marks as BASIC marks. (ALL good NMs achieve this.)
- ii. (total zero) if teaching goal is NOT achieved, directly receive TOTAL ZERO marks.

**Part B - 40 marks - Ease of Conceptual Clarity of Representations/Analogy/Representation**
- i. (20 marks) The NM terms must be popular/familiar for most learners (university year 1 students around 20 years old)
  Mark ranges:
  [0, 4): NM term(s) are obscure or unfamiliar to most students; analogy is confusing.
  [4, 8): NM term(s) are only somewhat familiar; many students may not relate.
  [8, 12): NM term(s) are moderately familiar; some students relate, some do not.
  [12, 16): NM term(s) are quite familiar; most students can relate easily.
  [16, 20]: NM term(s) are very popular and universally familiar; analogy is immediately accessible.

- ii. (20 marks) Easy to build linkages between Programming Language terms and Notional Machine terms
  Mark ranges:
  [0, 4): Linkages are unclear or forced; students struggle to connect PL and NM terms.
  [4, 8): Some linkages present but many are weak or confusing.
  [8, 12): Linkages are generally clear but with some inconsistencies or gaps.
  [12, 16): Linkages are strong and mostly intuitive; minor improvements possible.
  [16, 20]: Linkages are exceptionally clear, direct, and intuitive; students can easily map concepts.

**Part C - 30 marks - Not Easy to Lead to Misunderstanding**
- i. (15 marks) Not easy to misunderstand PL terms in a wrong way (e.g., misunderstand that "apple is an animal, not a fruit")
  Mark ranges:
  [0, 3): Analogy is highly misleading; very likely to cause major misunderstandings.
  [3, 6): Analogy has significant risk of misunderstanding; many students may be confused.
  [6, 9): Some risk of misunderstanding; requires careful explanation to avoid confusion.
  [9, 12): Low risk of misunderstanding; analogy is mostly clear with minor caveats.
  [12, 15]: Analogy is very clear; almost no risk of misunderstanding PL terms.

- ii. (15 marks) Not easy to lead to limitation scope misunderstanding (e.g., misunderstand that "the standards of being a square are standards of being all rectangles")
  Mark ranges:
  [0, 3): Analogy is likely to cause major scope or limitation misunderstandings.
  [3, 6): Significant risk of students misunderstanding the scope or limitations.
  [6, 9): Some risk of scope confusion; analogy needs clarification.
  [9, 12): Low risk; analogy is clear about scope and limitations with minor exceptions.
  [12, 15]: Analogy is very clear about scope; students unlikely to misinterpret limitations.

- iii. (Part C zero) If there exist serious misunderstandings very likely to happen, receive Part C zero.

**Part D - 20 marks - Teaching and Learning Cost is Proper**
- i. (10 marks) Time and other costs for teaching staff to prepare is proper
  Mark ranges:
  [0, 2): Preparation is extremely time-consuming or costly; impractical for most instructors.
  [2, 4): Preparation is difficult or requires significant resources.
  [4, 6): Preparation is manageable but could be improved for efficiency.
  [6, 8): Preparation is easy and efficient; minor improvements possible.
  [8, 10]: Preparation is minimal and highly practical; very easy for staff.

- ii. (10 marks) Time and other costs for students to learn is proper
  Mark ranges:
  [0, 2): Learning is very time-consuming or difficult for students; high barrier to understanding.
  [2, 4): Learning is challenging; students require significant effort or support.
  [4, 6): Learning is reasonable but could be made easier.
  [6, 8): Learning is easy for most students; minor improvements possible.
  [8, 10]: Learning is very easy and efficient; minimal time or effort required from students.

**REQUIRED OUTPUT FORMAT:**

--- EVALUATION FORM TEMPLATE START ---
# Name of the Evaluated Notional Machine: ${title}

# Full mark is 100:
------------------------------------------------------------------------------------------------------------------------------
# Part A - 10 marks - teaching goal achieved
## i. (10 basic marks) if teaching goal is ACHIEVED, have 10 marks as BASIC marks.
### Mark of A(i): [0-10]
### Reasons for mark above: [explanation with reference to achievement of teaching goal]

## ii. (total zero) if teaching goal is NOT achieved, directly receive TOTAL ZERO marks.
### Mark of A(ii): [N/A or 0]
### Reasons for mark above: [explanation]

------------------------------------------------------------------------------------------------------------------------------
# Part B - 40 marks - feeling easy to understand the analogy or representation
## i. (20 marks) the NM term(s) must be popular for most learners in reality
### Mark of B(i): [0-20 based on familiarity ranges]
### Reasons for mark above: [explanation with reference to student familiarity with terms]

## ii. (20 marks) easy to build linkages between PL term(s) and NM term(s)
### Mark of B(ii): [0-20 based on linkage clarity ranges]
### Reasons for mark above: [explanation with reference to clarity and intuitiveness of mappings]

------------------------------------------------------------------------------------------------------------------------------
# Part C - 30 marks - not easy to lead to misunderstanding of concepts
## i. (15 marks) not easy to misunderstand PL term(s) in a wrong way
### Mark of C(i): [0-15 based on misunderstanding risk ranges]
### Reason for mark above: [explanation with reference to potential conceptual confusion]

## ii. (15 marks) not easy to lead to limitation scope misunderstanding
### Mark of C(ii): [0-15 based on scope clarity ranges]
### Reason for mark above: [explanation with reference to scope and limitation clarity]

## iii. (Part C zero) if there exist serious misunderstanding very likely to happen
### Mark of C(iii): [N/A or note about serious misunderstanding]
### Reason for mark above: [explanation]

------------------------------------------------------------------------------------------------------------------------------
# Part D - 20 mark - Teaching and Learning Cost is proper
## i. (10 marks) time and other costs for teaching staff to prepare is proper
### Mark of D(i): [0-10 based on preparation cost ranges]
### Reason for mark above: [explanation with reference to staff preparation requirements]

## ii. (10 marks) time and other costs for students to learn is proper
### Mark of D(ii): [0-10 based on learning cost ranges]
### Reason for mark above: [explanation with reference to student learning effort]

------------------------------------------------------------------------------------------------------------------------------
# Total Mark: [sum of all marks]
## Overall Comments:
### About Evaluation on What Have Been Done:
[detailed analysis of strengths and achievements]

### About Possible Future Developments:
[specific suggestions for improvement with reference to marking criteria]

### Others (optional):
[additional comments and recommendations]

--- EVALUATION FORM TEMPLATE END ---

**IMPORTANT:** Please use the specific score ranges provided for each section and justify your scores based on these criteria. Be precise with scoring and reference the appropriate range descriptions in your explanations.
`

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in computer science education, specializing in evaluating notional machines using rigorous academic criteria. You must follow the exact evaluation format provided and give precise numerical scores for each section."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 3000,
            temperature: 0.2
        })

        const response = completion.choices[0].message.content

        // Parse the detailed response to extract scores and sections
        const parseDetailedEvaluation = (text) => {
            // Extract total score
            const totalMatch = text.match(/# Total Mark:\s*(\d+)/i)
            const totalScore = totalMatch ? parseInt(totalMatch[1]) : 0

            // Extract individual section scores
            const aScoreMatch = text.match(/### Mark of A\(i\):\s*(\d+)/i)
            const b1ScoreMatch = text.match(/### Mark of B\(i\):\s*(\d+)/i)
            const b2ScoreMatch = text.match(/### Mark of B\(ii\):\s*(\d+)/i)
            const c1ScoreMatch = text.match(/### Mark of C\(i\):\s*(\d+)/i)
            const c2ScoreMatch = text.match(/### Mark of C\(ii\):\s*(\d+)/i)
            const d1ScoreMatch = text.match(/### Mark of D\(i\):\s*(\d+)/i)
            const d2ScoreMatch = text.match(/### Mark of D\(ii\):\s*(\d+)/i)

            // Extract comments sections
            const overallCommentsMatch = text.match(/### About Evaluation on What Have Been Done:\s*([\s\S]*?)(?=### About Possible Future Developments:|$)/i)
            const futureDevMatch = text.match(/### About Possible Future Developments:\s*([\s\S]*?)(?=### Others|--- EVALUATION FORM TEMPLATE END|$)/i)
            const othersMatch = text.match(/### Others \(optional\):\s*([\s\S]*?)(?=--- EVALUATION FORM TEMPLATE END|$)/i)

            return {
                totalScore,
                detailedScores: {
                    partA: aScoreMatch ? parseInt(aScoreMatch[1]) : 0,
                    partB1: b1ScoreMatch ? parseInt(b1ScoreMatch[1]) : 0,
                    partB2: b2ScoreMatch ? parseInt(b2ScoreMatch[1]) : 0,
                    partC1: c1ScoreMatch ? parseInt(c1ScoreMatch[1]) : 0,
                    partC2: c2ScoreMatch ? parseInt(c2ScoreMatch[1]) : 0,
                    partD1: d1ScoreMatch ? parseInt(d1ScoreMatch[1]) : 0,
                    partD2: d2ScoreMatch ? parseInt(d2ScoreMatch[1]) : 0
                },
                overallComments: overallCommentsMatch ? overallCommentsMatch[1].trim() : '',
                futureDevSuggestions: futureDevMatch ? futureDevMatch[1].trim() : '',
                additionalComments: othersMatch ? othersMatch[1].trim() : '',
                fullEvaluation: text
            }
        }

        const evaluationData = parseDetailedEvaluation(response)

        // Save to database with enhanced structure
        const evaluation = new Evaluation({
            title,
            description,
            programmingLanguage,
            targetAudience,
            evaluation: {
                score: evaluationData.totalScore,
                feedback: evaluationData.overallComments,
                suggestions: evaluationData.futureDevSuggestions,
                evaluationDate: new Date(),
                detailedScores: evaluationData.detailedScores,
                fullEvaluation: evaluationData.fullEvaluation,
                additionalComments: evaluationData.additionalComments
            },
            metadata: {
                ipAddress: req.ip,
                userAgent: req.get('User-Agent'),
                evaluationDuration: Date.now() - startTime,
                modelUsed: 'gpt-4',
                tokensUsed: completion.usage?.total_tokens || 0
            }
        })

        await evaluation.save()

        // Return enhanced evaluation results
        res.json({
            score: evaluationData.totalScore,
            feedback: evaluationData.overallComments,
            suggestions: evaluationData.futureDevSuggestions,
            detailedScores: evaluationData.detailedScores,
            fullEvaluation: evaluationData.fullEvaluation,
            additionalComments: evaluationData.additionalComments,
            evaluationId: evaluation._id
        })

    } catch (error) {
        console.error('Evaluation error:', error)
        
        if (error.message.includes('OPENAI_API_KEY')) {
            return res.status(500).json({ 
                message: 'OpenAI API key configuration error. Please check your environment setup.' 
            })
        }
        
        if (error.code === 'insufficient_quota') {
            return res.status(503).json({ 
                message: 'AI service temporarily unavailable. Please try again later.' 
            })
        }

        if (error.code === 'rate_limit_exceeded') {
            return res.status(429).json({ 
                message: 'AI service rate limit exceeded. Please try again in a moment.' 
            })
        }

        res.status(500).json({ 
            message: 'Failed to evaluate notional machine. Please try again.' 
        })
    }
})

export default router 