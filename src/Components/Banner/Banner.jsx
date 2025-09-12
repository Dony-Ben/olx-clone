import img1 from '../../assets/footerimg1.webp'
import img2 from '../../assets/footerimg2.webp'
import img3 from '../../assets/footerimg3.webp'
import "./Banner.css"
function Banner() {
    return (
        <div> 

        <div className="Banner-container">

            <div className="img-section">
                <img src={img1} alt="image1" />
            </div>

            <div className="text-section">
                <div className='txt-1'>
                <span >Try the olx app</span>
                </div>
                <div className='txt-2'>
                    <span>Buy, sell and find just about anything using the app on your mobile.</span>
                </div>
            </div>
            <div className='img-text'>
                <div className="bottom-section">
                    <img src={img2} alt="" />
                    <img src={img3} alt="" />
                </div>
            </div>
        </div>
        
        </div>
    )
}
export default Banner; 