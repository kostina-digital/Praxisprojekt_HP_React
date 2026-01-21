import CTAButton from './CTAButton.jsx'

export default function InfoSection({imgSrc, title, href, buttonText = "Explore More"}) {
    return (
      <div className="flex flex-col items-center bg-cover bg-center h-96 justify-between p-8" style={{ backgroundImage: `url(${imgSrc})` }}>
        <h3
          className="text-6xl text-center font-bold italic pt-16"
          style={{
            color: '#fff',
            fontFamily: `'Cormorant Garamond', 'Times New Roman', serif`,
            textShadow: `
              0 0 12px #555, 
              0 2px 4px #888, 
              0 8px 24px #666, 
              0 0 2px #fff
            `
          }}
        >
          {title}
        </h3>
        <CTAButton href={href} text={buttonText}/>
      </div>
    )
  }