import React, { ReactElement } from 'react';
import './Footer.css';

import { ReactComponent as Logo } from './svg/knowitlogo.svg';
import { FaFacebook, FaTwitter, FaMedium, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return <footer>
        <a href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer"><Logo id="knowitlogo"/></a>
        <div id="social">
          <a href="https://www.facebook.com/weareknowit" target="_blank" rel="noopener noreferrer"><FaFacebook aria-label="Facebook"/></a>
          <a href="https://twitter.com/knowitnorge" target="_blank" rel="noopener noreferrer"><FaTwitter aria-label="Facebook"/></a>
          <a href="https://github.com/knowit/" target="_blank" rel="noopener noreferrer"><FaGithub aria-label="Facebook"/></a>
          <a href="https://knowitlabs.no/" target="_blank" rel="noopener noreferrer"><FaMedium aria-label="Facebook"/></a>
          </div>
        <h2>Om kodekalenderen</h2>
        <p>Kodekalenderen er kalenderen for deg som er glad i programmering. Hver luke er en oppgave som løses best ved hjelp av kode.</p>
        <p>Lukene varierer i vanskelighetsgrad og utforming, men felles for alle er at koden til løsningen din skal resultere i et svar på en linje som systemet kan sjekke om er korrekt.</p>
        <p>Hver luke som løses er et lodd i trekningen av en telefon eller et nettbrett. Løs så mange luker som mulig for å øke vinnersjansene dine!</p>
        <p>Lukene åpnes klokken 06:00 hver dag, og du har 24 timer på på å løse oppgaven. Vinneren trekkes på nyåret og vil bli kontaktet. Lykke til og god jul!</p>
        <h2>Jobbe i Knowit?</h2>
        <p>Blablabla søk jobb</p>
    </footer>
}

export default Footer