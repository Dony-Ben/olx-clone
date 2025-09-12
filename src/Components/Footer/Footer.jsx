import img2 from '../../Assets/footerimg2.webp'
import img3 from '../../Assets/footerimg3.webp'
import "./Footer.css"

function Footer() {
    return (
        <footer className="footer-container">
            <div className="top-container">
                <div className="items-section">
                    <section className="main-section">

                        <section className="sec-1">
                            <h4>POPULAR LOCATIONS</h4>
                            <ul>
                                <li>Kolkata</li>
                                <li>Mumbai</li>
                                <li>Chennai</li>
                                <li>Pune</li>
                            </ul>
                        </section>

                        <section className="sec-2">
                            <h4>TRENDING LOCATIONS</h4>
                            <ul>
                                <li>Bhubaneshwar</li>
                                <li>Hyderabad</li>
                                <li>Chandigarh</li>
                                <li>Nashik</li>
                            </ul>
                        </section>

                        <section className="sec-3">
                            <h4>ABOUT US</h4>
                            <ul>
                                <li>Tech@OLX</li>
                                <li>Careers</li>
                            </ul>
                        </section>

                        <section className="sec-4">
                            <h4>OLX</h4>
                            <ul>
                                <li>Blog</li>
                                <li>Help</li>
                                <li>Sitemap</li>
                                <li>Legal & Privacy information</li>
                                <li>Vulnerability Disclosure Program</li>
                            </ul>
                        </section>

                        <section className="sec-5">
                            <h4>Follow Us</h4>
                            <div className="social-icons">
                                <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Facebook" />
                                <img src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000" alt="Instagram" />
                                <img src="https://img.icons8.com/?size=100&id=omVNNE6wkyP7&format=png&color=000000" alt="YouTube" />
                                <img src="https://img.icons8.com/?size=100&id=01GWmP9aUoPj&format=png&color=000000" alt="X" />
                                <img src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000" alt="WhatsApp" />
                                <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" alt="LinkedIn" />
                            </div>
                            <div className="app-buttons">
                                <img src={img2} alt="Google Play" />
                                <img src={img3} alt="App Store" />
                            </div>
                        </section>

                    </section>
                </div>
            </div>

            {/* <div className="sub-footer">
                <div className="left">Help - Sitemap</div>

                <div className="center">
                    <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1" alt="CarTradeTech" className="logo" />
                    <div className="divider"></div>
                    <img src="https://statics.olx.in/external/base/img/cartrade/logo/olx_2025.svg?v=1" alt="OLX" className="logo" />
                    <img src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1" alt="CarWale" className="logo" />
                    <img src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1" alt="BikeWale" className="logo" />
                    <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1" alt="CarTrade" className="logo" />
                    <img src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1" alt="Mobility Outlook" className="logo" />
                </div>

                <div className="right">All rights reserved © 2006-2025 OLX</div>
            </div> */}

        </footer>
    )
}
export default Footer;