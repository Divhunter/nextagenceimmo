// styles
import './m-pages-headers.css'
import './d-pages-headers.css'

const PagesHeaders = (props) => { 

    return (
        <div className='title-container'>
            <div className='header-rubrik'>
                <h2 id='title' className='title'>
                    {props.titleCol1} 
                </h2>
                <h3 className='subTitle'>
                    {props.subTitle1}
                </h3>
                <h4 className='subTitle2'>
                    {props.subTitle2}
                </h4>
                <br/>
                {props.button}
            </div>
            <div className='paragraph'>
                {props.text1}
            </div>
        </div>
    )        
}

export default PagesHeaders