import ContactUsForm from './ContactUsForm.jsx'
import FAQsSection from './FAQsSection.jsx'

export default function ContactUsPage() {
    return (
        <>
        <h1 className="h1_style mt-8">Contact Us</h1>
        <p className="text-gray-600 text-lg text-center">Have a question or want to get in touch? Fill out the form below or check out our FAQs.</p>
        <div className="flex flex-col md:flex-row gap-8 mt-8 mb-8">
            <div className="flex-1">
                <ContactUsForm />
            </div>
            <div className="flex-1">
                <FAQsSection />
            </div>
        </div>
        </>
    )
}