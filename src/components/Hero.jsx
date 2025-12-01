function Hero() {
  return (
    <section className="main__hero hero _section">
      <div className="hero__container">
        <div className="hero__wrap">
          <div className="hero__img">
            <img 
              src="https://res.cloudinary.com/dtbj43yha/image/upload/q_auto,f_auto,w_1200/v1757301588/sky_acu00i.jpg" 
              alt="Beautiful sky landscape" 
              width="1200" 
              height="800" 
              loading="eager"
              fetchpriority="high"
            />
          </div>
          <div className="hero__body">
            <div className="hero__content">
              <h1 className="hero__title">
                Jack
                <span>旅遊照片分享</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
