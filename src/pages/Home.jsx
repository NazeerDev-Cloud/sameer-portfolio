import { useState } from 'react'
import Hero from '../components/home/Hero'
import AboutSection from '../components/home/AboutSection'
import ProjectCarousel from '../components/home/ProjectCarousel'
import ProfessionalServices from '../components/home/ProfessionalServices'
import WorkflowPipeline from '../components/home/WorkflowPipeline'
import Testimonials from '../components/home/Testimonials'
import Impact from '../components/home/Impact'
import Pricing from '../components/home/Pricing'
import Faq from '../components/home/Faq'
import Contact from '../components/home/Contact'

export default function Home() {
    // ✅ State for selected pricing plan (pura object store karega)
    const [selectedPlan, setSelectedPlan] = useState(null)

    // ✅ Handle plan selection from Pricing component
    const handleSelectPlan = (plan) => {
        // Naya object har click par Contact useEffect ko trigger karega
        setSelectedPlan({ ...plan })
    }

    return (
        <>
            {/* Hero / Home */}
            <div id="home" className="scroll-mt-28">
                <Hero />
            </div>

            {/* About */}
            <div id="about" className="scroll-mt-28">
                <AboutSection />
            </div>

            {/* Projects */}
            <div id="projects" className="scroll-mt-28">
                <ProjectCarousel />
            </div>

            {/* Services */}
            <div id="services" className="scroll-mt-28">
                <ProfessionalServices />
            </div>

            {/* Process */}
            <div id="process" className="scroll-mt-28">
                <WorkflowPipeline />
            </div>

            {/* Testimonials */}
            <div id="testimonials" className="scroll-mt-28">
                <Testimonials />
            </div>

            {/* Impact */}
            <div id="impact" className="scroll-mt-28">
                <Impact />
            </div>

            {/* Pricing */}
            <div id="pricing" className="scroll-mt-28">
                {/* ✅ Pass onSelectPlan callback to Pricing */}
                <Pricing onSelectPlan={handleSelectPlan} />
            </div>

            {/* FAQ */}
            <div id="faq" className="scroll-mt-28">
                <Faq />
            </div>

            {/* Contact */}
            <div id="contact" className="scroll-mt-28">
                {/* ✅ Pass selectedPlan object prop to Contact */}
                <Contact selectedPlan={selectedPlan} />
            </div>
        </>
    )
}