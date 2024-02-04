// import FormulaireRecherche from '../../../functions/FormulaireRecherche'
import SelectionSlide from '../../components/SelectionSlide'

// styles
import './m-selection.css'
import './d-selection.css'

const Selection = () => {
    
    return (
        <section className='selection'>
            <div className='selection__container'>
                <header className='selection__container__header'>
                    <h1 className='selection__container__header__title'>Notre sélection</h1>
                </header>
                {/*<div className='selection__container__form'>
                    <FormulaireRecherche />
                </div>*/}
                <SelectionSlide />
                <p className='selection__container__text'>
                    NOTRE AGENCE IMMO vous accueille du lundi au vendredi de 9h00 à 12h00
                    et de 13h30 à 17h30 au 165, route de Vienne à Lyon 8ème.
                </p>
            </div>
        </section>
    )
}

export default Selection