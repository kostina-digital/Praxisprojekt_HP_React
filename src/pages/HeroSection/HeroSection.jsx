import heroSectionBg from '../../assets/images/horizons_train.png'

export default function HeroSection() {
    return (
        <section className="flex flex-col gap-4">
            <h1 className="h1_style">Welcome to the Hogwarts Paradise!</h1>
            <img src={heroSectionBg} alt="Hero Section Background" className="w-full h-full object-cover" />
            <h2 className="h2_style !text-center">The world of Harry Potter is a magical place where you can explore the wizarding world and learn about the characters and the stories.</h2>
            <h3 className="h3_style !text-center">Click on the buttons below to learn more about the Harry Potter universe.</h3>
            <hr className="border-t-2 border-gray-300 w-full my-4" />
        </section>
    )
}