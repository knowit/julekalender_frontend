import { FC } from "react"
import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaMedium, FaGithub } from "react-icons/fa"


const Footer: FC = () => (
  <footer className="md:mt-8 lg:mt-16 space-y-4 max-w-2xl text-center p-8 md:p-2 m-auto">
    <h2 className="text-xl">Om kodekalenderen</h2>
    <p>
      Kodekalenderen er høytidskalenderen for deg som er glad i
      programmering. Bak hver luke skjuler det seg en oppgave du må svare
      på i form av en enkel tekststreng eller et tall. Lukene varierer i
      vanskelighetsgrad og utforming, men felles for alle er at de er
      best egnet for å løses med kode.
    </p>
    <p>
      En ny luke åpnes hver dag klokken 04:00 helt fram til jul. For hver
      luke du løser før klokken 04:00 på første juledag får du et lodd i
      trekningen av en valgfri telefon eller nettbrett. Løs så mange luker
      som mulig for å øke vinnersjansene dine!
    </p>
    <p>
      {/* TODO: Fix emoji accessibility (?) */}
      🎄 <em>Lykke til og god jul!</em> 🎄
    </p>

    <p>
      <Link className="underline" to="/gdpr" title="gdpr">Les om vår håndtering av personopplysninger</Link>
    </p>

    <h2 className="text-xl pt-4">Kontakt oss</h2>
    <p>
      Funnet en feil? Ris eller ros? Send oss en mail!{" "}
      <a className="underline" href="mailto:julekalender@knowit.no">julekalender@knowit.no</a>
      <br />
      Følg utviklingen og kom med innspill på vårt{" "}
      <a className="underline" href="https://github.com/knowit/julekalender_frontend" target="_blank" rel="noopener noreferrer" title="GitHub repo">GitHub repo</a>
      !
    </p>

    <h2 className="text-xl pt-4">
      <a className="underline" href="https://www.knowit.no/karriere/systemutvikler-som-tror-pa-julenissen/" target="_blank" rel="noopener noreferrer">
        Jobbe i Knowit?
      </a>
    </h2>
    <p>
      Dersom du ønsker å vite mer om Knowit må du gjerne ta kontakt med
      en av våre alver på <a className="underline"
        href="mailto:julenissen@knowit.no">julenissen@knowit.no</a> for en
      uformell prat.
    </p>
    <div className="m-auto flex justify-between align-center w-32">
      <a href="https://www.facebook.com/weareknowit" target="_blank" rel="noopener noreferrer"><FaFacebook aria-label="Facebook"/></a>
      <a href="https://twitter.com/knowitnorge" target="_blank" rel="noopener noreferrer"><FaTwitter aria-label="Facebook"/></a>
      <a href="https://github.com/knowit/" target="_blank" rel="noopener noreferrer"><FaGithub aria-label="Facebook"/></a>
      <a href="https://knowitlabs.no/" target="_blank" rel="noopener noreferrer"><FaMedium aria-label="Facebook"/></a>
    </div>
  </footer>
)

export default Footer
