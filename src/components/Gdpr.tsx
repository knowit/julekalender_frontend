import React from 'react'
import { ReactComponent as Border } from './svg/mistletoeborder.svg'
import { Link } from 'react-router-dom'
import './Gdpr.css'

const Gdpr = () => {
    return (
        <div className='gdprContainer'>
            <Link className='gdprBackButton' to='/'>&larr; Tilbake til lukene</Link>
            <div className='gdprBorderWrapper'>
                <Border className='gdprBorder' />
            </div>
            <div className='gdprContentWrapper'>
                <h1 className='gdprContentTitle'>Personvernerklæring for Kodekalenderen 2020</h1>
                <div className="tldr"><h2>0. <i>TL;DR</i></h2>
                <ul>
                    <li>Vi bruker cookies for innlogging.</li>
                    <li>Registrert epostadresse kan brukes til å kontakte deg om du vinner.</li>
                    <li>Vi sletter alle data etter at vinner er trukket og kontaktet.</li>
                </ul>
                </div>

                <h3>1. Behandlingsansvarlig</h3>
                <p>Kristin Meyer Kristiansen er på vegne av Knowit Objectnet AS behandlingsansvarlig for selskapets behandling av personopplysninger.</p>

                <h3>2. Personopplysninger som lagres</h3>
                <p>Vi lagrer følgende personopplysninger om våre kunder: Epost, brukernavn og eventuelt profilbilde hentet fra Gravatar.</p>

                <h3>3. Formål med behandlingen</h3>
                <p>Påmelding/deltagelse i konkurranse.</p>

                <h3>4. Grunnlaget for behandlingen</h3>
                <p>Innhentede data er nødvendig for å delta i konkurransen, diskusjonsfelt og for å kontakte vinner, samt vise statistikk over løste oppgaver.</p>

                <h3>5. Innhenting av personopplysninger</h3>
                <p>Vi bruker informasjonskapsler/cookies på våre nettsider for å gi deg som besøker siden best brukeropplevelse.</p>

                <h3>6. Utlevering av opplysninger til tredjeparter</h3>
                <p>Vi vil ikke dele, selge, overføre eller på annen måte utlevere personopplysninger til andre.</p>

                <h3>7. Sletting av personopplysninger</h3>
                <p>Opplysninger vi har mottatt i forbindelse med deltagelse slettes etter at vinner er trukket og kontaktet.</p>

                <h3>8. Rettigheter for den registrerte</h3>
                <p>Vi behandler dine personopplysninger i henhold til personopplysningsloven og gjeldende forskrifter. Det gjøres oppmerksom på at du kan kreve innsyn i og flytting av egne personopplysninger, samt kreve retting eller sletting av opplysninger. Det kan klages til Datatilsynet på behandling i strid med reglene.</p>

                <h3>9. Personvernombud</h3>
                <p>Vi har et personvernombud, [navn på personvernombud], som påser at personopplysningslovens regler om behandling av personopplysninger blir fulgt.</p>

                <h3>10. Informasjonssikkerhet</h3>
                <p>Vi sikrer dine personopplysninger ved både fysisk og virtuell adgangs- og tilgangskontroll, samt ved kryptering av sensitive deler av avgitte opplysninger.</p>

                <h3>Kontaktinformasjon</h3>
                <p>Henvendelser om hvilke opplysninger som er registrert, retting og sletting kan sendes til <a href="mailto:julekalender@knowit.no">julekalender@knowit.no</a></p>
            </div>
        </div >
    )
}

export default Gdpr