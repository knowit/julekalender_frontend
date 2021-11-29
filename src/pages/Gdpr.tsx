import { map } from "lodash"

import Page from "./Page"


const GdprSection = ({ no, header, content }: { no: number, header: string, content: string }) => (
  <>
    <h3 className="mt-6 font-medium">{no}. {header}</h3>
    <p className="mt-1 ml-4">{content}</p>
  </>
)

const Gdpr = () => {
  const sections = [
    [
      "Behandlingsansvarlig",
      "Kristin Meyer Kristiansen er på vegne av Knowit Objectnet AS behandlingsansvarlig for selskapets behandling av personopplysninger."
    ],
    [
      "Personopplysninger som lagres",
      "Vi lagrer følgende personopplysninger om våre brukere: e-post, brukernavn og eventuelt profilbilde lastet opp eller oppgitt ved URL. Brukernavn og profilbilde er synlig i løsningen."
    ],
    [
      "Formål med behandlingen",
      "Påmelding/deltagelse i konkurranse."
    ],
    [
      "Grunnlaget for behandlingen",
      "Innhentede data er nødvendig for å delta i konkurranse og diskusjonsfelt, samt for å kontakte vinner og vise statistikk over løste oppgaver."
    ],
    [
      "Innhenting av personopplysninger",
      "Vi bruker informasjonskapsler/cookies på våre nettsider for å gi deg som besøker siden best brukeropplevelse."
    ],
    [
      "Utlevering av opplysninger til tredjeparter",
      "Vi vil ikke dele, selge, overføre eller på annen måte utlevere personopplysninger til andre."
    ],
    [
      "Sletting av personopplysninger",
      "Personopplysninger vi har mottatt i forbindelse med deltagelse vil lagres for at brukere skal kunne bruke samme konto om igjen neste gang julekalenderen holdes. Brukerdata kan slettes permanent via nettsiden eller ved å kontakte oss via en av e-postadressene under."
    ],
    [
      "Rettigheter for den registrerte",
      "Vi behandler dine personopplysninger i henhold til personopplysningsloven og gjeldende forskrifter. Det gjøres oppmerksom på at du kan kreve innsyn i og flytting av egne personopplysninger, samt kreve retting eller sletting av opplysninger. Det kan klages til Datatilsynet på behandling i strid med reglene."
    ],
    [
      "Personvernombud",
      "Vi har et personvernombud, Kristin Meyer Kristiansen, som påser at personopplysningslovens regler om behandling av personopplysninger blir fulgt."
    ],
    [
      "Informasjonssikkerhet",
      "Vi sikrer dine personopplysninger ved både fysisk og virtuell adgangs- og tilgangskontroll, samt ved kryptering av sensitive deler av avgitte opplysninger."
    ]
  ]

  return (
    <Page className="py-12 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 text-gray-700 rounded-md">
      <h1 className="text-4xl text-center font-semibold">Personvernerklæring for Kodekalenderen 2021</h1>
      <h2 className="mt-8 font-medium">
        <em>TL;DR</em>
      </h2>
      <ul className="mt-2 ml-4 mb-12">
        <li>Vi bruker cookies for innlogging.</li>
        <li>Registrert e-postadresse kan brukes til å kontakte deg om du vinner.</li>
        <li>Registrert brukernavn og profilbilde er synlige i diskusjonsfeltet og ledertavlen.</li>
        <li>Dersom du vil slette brukerdataen din kan du gjøre dette på brukersiden din, eller ved å kontakte oss.</li>
      </ul>

      {map(sections, ([header, content], i) => <GdprSection key={i} no={i + 1} header={header} content={content} />)}

      <div className="mt-12">
        Henvendelser om hvilke opplysninger som er registrert, retting og
        sletting kan sendes til <a className="underline" href="mailto:julekalender@knowit.no">julekalender@knowit.no</a>{' '}
        eller <a className="underline" href="mailto:personvern@knowit.no">personvern@knowit.no</a>
      </div>
    </Page>
  )
}

export default Gdpr
