/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './Footer.css';

import { FaFacebook, FaTwitter, FaMedium, FaGithub } from 'react-icons/fa';

// TODO: Mobile responsiveness
const Footer = () => (
  <footer>
    <h2>Om kodekalenderen</h2>
    <p>
      Kodekalenderen er høytidskalenderen for deg som er glad i
      programmering. Bak hver luke skjuler det seg en oppgave du små svare
      på i form av en enkel tekststreng eller et tall. Lukene varierer i
      vanskelighetsgrad og utforming, men felles for alle er at de er
      best egnet for å løses med kode.
    </p>
    <p>
      En ny luke åpnes hver dag klokken 06:00 helt fram til jul. Dersom
      du svarer riktig innen 24 timer får du et lodd i trekningen av en
      valgfri telefon eller nettbrett. Løs så mange luker som mulig for å
      øke vinnersjansene dine!
    </p>
    <p>
      {/* TODO: Fix emoji accessibility (?) */}
      🎄 <em>Lykke til og god jul!</em> 🎄
    </p>

    <br />

    <h2>Jobbe i Knowit?</h2>
    <p>
      Dersom du ønsker å vite mer om Knowit må du gjerne ta kontakt med
      Sigmund Marius Nilssen på <a href="mailto:julenissen@knowit.no">julenissen@knowit.no</a>
      for en uformell prat.
    </p>
    <div id="social">
      <a href="https://www.facebook.com/weareknowit" target="_blank" rel="noopener noreferrer"><FaFacebook aria-label="Facebook"/></a>
      <a href="https://twitter.com/knowitnorge" target="_blank" rel="noopener noreferrer"><FaTwitter aria-label="Facebook"/></a>
      <a href="https://github.com/knowit/" target="_blank" rel="noopener noreferrer"><FaGithub aria-label="Facebook"/></a>
      <a href="https://knowitlabs.no/" target="_blank" rel="noopener noreferrer"><FaMedium aria-label="Facebook"/></a>
    </div>
  </footer>
);

export default Footer
