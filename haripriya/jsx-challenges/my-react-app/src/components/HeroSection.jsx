import heroImage from "../assets/hero.png";

function HeroSection() {
    return (
        <div>
            <img className="w-100" src={heroImage} alt="Hero" />
        </div>
    );
}

export default HeroSection;