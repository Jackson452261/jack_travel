function Newsletter() {
  return (
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        <form 
          action="https://app.us2.list-manage.com/subscribe/post?u=bbfa906dade4eff5d0c97100f&amp;id=0e06aa5b5e&amp;f_id=005dfce3f0" 
          method="post" 
          id="mc-embedded-subscribe-form" 
          name="mc-embedded-subscribe-form" 
          className="validate" 
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <h2>訂閱電子報</h2>
            <div className="indicates-required">
              <span className="asterisk">*</span> 信箱必填
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">電子信箱 <span className="asterisk">*</span></label>
              <input 
                type="email" 
                name="EMAIL" 
                className="required email" 
                id="mce-EMAIL" 
                required 
              />
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-FNAME">名字</label>
              <input 
                type="text" 
                name="FNAME" 
                className="text" 
                id="mce-FNAME" 
              />
            </div>
            <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
              <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              <input 
                type="text" 
                name="b_bbfa906dade4eff5d0c97100f_0e06aa5b5e" 
                tabIndex="-1" 
                defaultValue="" 
              />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input 
                  type="submit" 
                  name="subscribe" 
                  id="mc-embedded-subscribe" 
                  className="button" 
                  value="訂閱" 
                />
                <p style={{ margin: '0px auto' }}>
                  <a 
                    href="http://eepurl.com/jhHp9w" 
                    title="Mailchimp - email marketing made easy and fun"
                  >
                    <span style={{ 
                      display: 'inline-block', 
                      backgroundColor: 'transparent', 
                      borderRadius: '4px' 
                    }}>
                      <img 
                        className="refferal_badge" 
                        src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" 
                        alt="Intuit Mailchimp" 
                        width="220" 
                        height="40" 
                        loading="lazy" 
                        style={{ 
                          width: '220px', 
                          height: '40px', 
                          display: 'flex', 
                          padding: '2px 0px', 
                          justifyContent: 'center', 
                          alignItems: 'center' 
                        }}
                      />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Newsletter
