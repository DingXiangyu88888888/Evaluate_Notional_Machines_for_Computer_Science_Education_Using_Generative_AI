import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Evaluation from './pages/Evaluation'
import References from './pages/References'

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/evaluation" element={<Evaluation />} />
                    <Route path="/references" element={<References />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App 