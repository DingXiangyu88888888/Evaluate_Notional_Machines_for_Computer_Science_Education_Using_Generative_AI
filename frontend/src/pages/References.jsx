import React from 'react'

const References = () => {
    const references = [
        {
            title: "The state of play: A notional machine for learning programming.",
            authors: "Berry, M., & Kölling, M.",
            year: "2014",
            description: "Proceedings of ITiCSE 2014 (pp. 21–26). ACM.",
            url: "https://doi.org/10.1145/2591708.2591721",
            type: "Academic Paper"
        },
        {
            title: "Dynamic mental model construction: A knowledge in pieces-based explanation for computing students’ erratic performance on recursion.",
            authors: "Chao, J., Feldon, D. F., & Cohoon, J. P.",
            year: "2018",
            description: "Journal of the Learning Sciences, 27(3), 431–473.",
            url: "https://doi.org/10.1080/10508406.2017.1392309",
            type: "Academic Paper"
        },
        {
            title: "Investigating the role of direct instruction about the notional machine in improving novice programmer mental models.",
            authors: "Chiarelli, V., & Muldner, K.",
            year: "2022",
            description: "In AIED 2022, Lecture Notes in Computer Science (Vol. 13356, pp. 419–423). Springer.",
            url: "https://doi.org/10.1007/978-3-031-11647-6_83",
            type: "Academic Paper"
        },
        {
            title: "Notional machines in computing education: The education of attention.",
            authors: "Fincher, S., Jeuring, J., Miller, C. S., Donaldson, P., du Boulay, B., Hauswirth, M., Hellas, A., Hermans, F., Lewis, C., Mühling, A., Pearce, J. L., & Petersen, A.",
            year: "2020",
            description: "Proceedings of the 2020 ITiCSE Working Group Reports (ITiCSE-WGR ’20), 21–50. ACM.",
            url: "https://doi.org/10.1145/3437800.3439202",
            type: "Academic Paper"
        },
        {
            title: "Mental models, conceptual models, and modelling.",
            authors: "Greca, I. M., & Moreira, M. A.",
            year: "2000",
            description: "International Journal of Science Education, 22(1), 1–11.",
            url: "https://doi.org/10.1080/095006900289976",
            type: "Academic Paper"
        },
        {
            title: "Analogies in modelling-based teaching and learning.",
            authors: "Justi, R., & Gilbert, J. K.",
            year: "2016",
            description: "In J. K. Gilbert & R. Justi (Eds.), Modelling-based teaching in science education (pp. 149–172). Springer.",
            url: "https://doi.org/10.1007/978-3-319-29039-3_8",
            type: "Book"
        },
        {
            title: "Investigating and improving the models of programming concepts held by novice programmers.",
            authors: "Ma, L., Ferguson, J., Roper, M., & Wood, M.",
            year: "2011",
            description: "Computer Science Education, 21(1), 57–80.",
            url: "https://doi.org/10.1080/08993408.2011.554722",
            type: "Academic Paper"
        },
        {
            title: "Beginners’ understanding of object-oriented programming.",
            authors: "Majoni, P.",
            year: "2021",
            description: "International Journal of Computer Science and Information Technology Research, 9(4), 1–21.",
            url: "",
            type: "Academic Paper"
        },
        {
            title: "A multi-national, multi-institutional study of assessment of programming skills of first-year CS students.",
            authors: "McCracken, M., Almstrum, V., Diaz, D., Guzdial, M., Hagan, D., Ben-David Kolikant, Y., Laxer, C., Thomas, L., Utting, I., & Wilusz, T.",
            year: "2001",
            description: "Proceedings of the 33rd SIGCSE Technical Symposium on Computer Science Education (SIGCSE ’01), 125–180. ACM.",
            url: "https://doi.org/10.1145/572133.572137",
            type: "Academic Paper"
        },
        {
            title: "GPT-4o System Card.",
            authors: "OpenAI",
            year: "2024",
            description: "System card documenting capabilities and safety evaluations for GPT-4o.",
            url: "https://openai.com/index/gpt-4o-system-card/",
            type: "Resource"
        },
        {
            title: "Learning and teaching programming: A review and discussion.",
            authors: "Robins, A., Rountree, J., & Rountree, N.",
            year: "2003",
            description: "Computer Science Education, 13(2), 137–172.",
            url: "https://doi.org/10.1076/csed.13.2.137.14200",
            type: "Academic Paper"
        },
        {
            title: "Model-based learning: A synthesis of theory and research.",
            authors: "Seel, N. M.",
            year: "2017",
            description: "Educational Technology Research and Development, 65, 931–966.",
            url: "https://doi.org/10.1007/s11423-016-9507-9",
            type: "Academic Paper"
        },
        {
            title: "Notional machines and introductory programming education.",
            authors: "Sorva, J.",
            year: "2013",
            description: "ACM Transactions on Computing Education, 13(2), Article 8.",
            url: "https://doi.org/10.1145/2483710.2483713",
            type: "Academic Paper"
        },
        {
            title: "A review of generic program visualization systems for introductory programming education.",
            authors: "Sorva, J., Karavirta, V., & Malmi, L.",
            year: "2013",
            description: "ACM Transactions on Computing Education, 13(4), Article 15.",
            url: "https://doi.org/10.1145/2490822",
            type: "Academic Paper"
        },
        {
            title: "Engage against the machine: Rise of the notional machines as effective pedagogical devices.",
            authors: "Dickson, P. E., Brown, N. C. C., & Becker, B. A.",
            year: "2020",
            description: "Proceedings of ITiCSE ’20, 159–165. ACM.",
            url: "https://doi.org/10.1145/3341525.3387404",
            type: "Academic Paper"
        },
        {
            title: "Extending the object-oriented notional machine notation with inheritance, polymorphism, and GUI events.",
            authors: "Čuvić, M. A., Maras, J., & Mladenović, S.",
            year: "2017",
            description: "Proceedings of the 40th International Convention on Information and Communication Technology, Electronics and Microelectronics (MIPRO 2017), 794–799. IEEE.",
            url: "https://doi.org/10.23919/MIPRO.2017.7973517",
            type: "Academic Paper"
        }
    ]

    const own_published_articles = [
        {
            title: "Evaluate Notional Machines for Computer Science Education Using Generative AI",
            authors: "Ding, X., Polash, M. M. A.",
            year: "2025",
            description: "Final camera-ready version accepted by AAEE 2025 (i.e. 36th Australasian Association for Engineering Education Annual Conference) on 17 Oct 2025",
            url: "(Link will be added, once officially published on AAEE 2025)",
            type: "Academic Paper"
        }
    ]

    const statistical_reports = [
        {
            title: "57 curated notional machines used in classroom CS teaching",
            authors: "Working Group Reports on Innovation and Technology in Computer Science Education - ITiCSE-WGR '20. June 2020",
            year: "2020",
            description: "Original source of training Corpus of 57 notional machines.",
            url: "https://notionalmachines.github.io/notional-machines.html"
        },
        {
            title: "Notional machines in computing education: The education of attention.",
            authors: "Fincher, S., Jeuring, J., Miller, C. S., Donaldson, P., du Boulay, B., Hauswirth, M., Hellas, A., Hermans, F., Lewis, C., Mühling, A., Pearce, J. L., & Petersen, A.",
            year: "2020",
            description: "Statistical report about 57 curated notional machines. Proceedings of the 2020 ITiCSE Working Group Reports (ITiCSE-WGR ’20), 21–50. ACM.",
            url: "https://doi.org/10.1145/3437800.3439202",
            type: "Academic Paper (Statiscal Report)"
        },
    ]

    const getTypeColor = (type) => {
        switch (type) {
            case 'Academic Paper':
                return 'bg-blue-100 text-blue-800'
            case 'Book':
                return 'bg-green-100 text-green-800'
            case 'Resource':
                return 'bg-purple-100 text-purple-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    About Us & References
                </h1>
                <p className="text-lg text-gray-600">
                    Explore key research and resources on notional machines and computer science education
                </p>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    About Us
                </h2>
                <p className="text-md text-gray-600">
                    Created by: Xiangyu Ding (Danny), School of Computer Science, Faculty of Engineering, the University of Sydney
                    <br />
                    Supervisor: Dr Mohammad Polash, School of Computer Science, Faculty of Engineering, the University of Sydney
                </p>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Links to Our Own (Creators') Published Article
                </h2>
                <p className="text-md text-gray-600">
                [This article includes explanation about evaluation framework and benchmark.]
                </p>
            </div>
            {/* Own Published Articles Section */}
            <div className="space-y-6">
                {(Array.isArray(own_published_articles) && own_published_articles.length > 0) ? (
                    own_published_articles.map((ref, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-semibold text-gray-900 pr-4">
                                    {ref.title}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(ref.type)}`}>
                                    {ref.type}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">{ref.authors}</span> • {ref.year}
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                {ref.description}
                            </p>
                            {ref.url && (
                                <a 
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Access Resource (Link will be added, once officially published on AAEE 2025 after around 10 Dec 2025)
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700 leading-relaxed">
                        Wait for update.
                    </p>
                )}
            </div>
            
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Links to the training corpus (57 notional machines) source and statistical report
                </h2>
            </div>

            
            <div className="space-y-6">
                {(Array.isArray(statistical_reports) && statistical_reports.length > 0) ? (
                    statistical_reports.map((ref, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-semibold text-gray-900 pr-4">
                                    {ref.title}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(ref.type)}`}>
                                    {ref.type}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">{ref.authors}</span> • {ref.year}
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                {ref.description}
                            </p>
                            {ref.url && (
                                <a 
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Access Resource
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700 leading-relaxed">
                        Wait for update.
                    </p>
                )}
            </div>
            

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    References
                </h2>
            </div>

            {/* References List */}
            <div className="space-y-6">
                {references.map((ref, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-gray-900 pr-4">
                                {ref.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(ref.type)}`}>
                                {ref.type}
                            </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">{ref.authors}</span> • {ref.year}
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            {ref.description}
                        </p>
                        
                        {ref.url && (
                            <a 
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Access Resource
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* Additional Resources */}
            <div className="bg-primary-50 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Want to Contribute?
                </h2>
                <p className="text-gray-700 mb-4">
                    If you know of additional valuable resources on notional machines that should be included in this list, 
                    we'd love to hear from you. Help us build a comprehensive collection for the computer science education community.
                </p>
                <div className="text-sm text-gray-600">
                    Contact us with your suggestions and we'll review them for inclusion.
                </div>
            </div>
        </div>
    )
}

export default References 