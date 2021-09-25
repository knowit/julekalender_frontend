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
      "Vi lagrer følgende personopplysninger om våre brukere: e-post, visningsnavn og eventuelt profilbilde hentet fra Gravatar. Visningsnavn og profilbilde vil være synlig i løsningen."
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
      "Personopplysninger vi har mottatt i forbindelse med deltagelse slettes etter at vinner er trukket og kontaktet."
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
    <Page>
      <div className="py-12 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 text-gray-700 rounded-md">
        <h1 className="text-2xl">Personvernerklæring for Kodekalenderen 2021</h1>
        <h2 className="mt-4 font-medium">
          <em>TL;DR</em>
        </h2>
        <ul className="mt-2 ml-4 mb-8">
          <li>Vi bruker cookies for innlogging.</li>
          <li>Registrert e-postadresse kan brukes til å kontakte deg om du vinner.</li>
          <li>Registrert visningsnavn og profilbilde hentet fra Gravatar er synlige i diskusjonsfeltet og ledertavlen.</li>
          <li>Vi sletter alle persondata etter at vinner er trukket og kontaktet.</li>
        </ul>

        {map(sections, ([header, content], i) => <GdprSection key={i} no={i + 1} header={header} content={content} />)}

        <div className="mt-8">
          Henvendelser om hvilke opplysninger som er registrert, retting og
          sletting kan sendes til <a href="mailto:julekalender@knowit.no">julekalender@knowit.no</a>
        </div>
      </div>
    </Page>
  )
}

export default Gdpr
