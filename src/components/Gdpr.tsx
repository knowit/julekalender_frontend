import React from 'react'
import { ReactComponent as Border } from './svg/mistletoeborder.svg'
import { Link } from 'react-router-dom'
import './Gdpr.css'


const Gdpr = () => {
    return (
        <div className='gdprContainer'>
            <Link className='gdprBackButton' to='/'>&larr; Tilbake til lukene</Link>
            <div className='gdprBorderWrapper'>
                    <Border className='gdprBorder'/>
                </div>
            <div className='gdprContentWrapper'>
                <h1 className='gdprContentTitle'>GDPR</h1>
                <p className='gdprContentText'>
                    Vår nettside benytter informasjonskapsler, ofte kalt cookies. Disse støtter opp under kjernefunksjonalitet knyttet til autorisering og autentisering. Epostadresser kan bli brukt til å kontakte vinneren av konkurransen. All data vil bli slettet etter konkurransen avsluttes.
                </p>
            </div>
        </div>
    )
}

export default Gdpr