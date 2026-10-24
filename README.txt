HAS LIVE OP VERCEL (iPhone en iPad)

Wat het is: een eigen site met wachtwoord. HAS zet het telefoonbestand erop met de knop "Zet op telefoon". Je iPad of iPhone opent de site en ziet de wedstrijden. De Mac hoeft daarna niet aan te staan.

Eenmalig instellen (ongeveer 10 minuten)

1. Maak op github.com een nieuwe privé-repository, bijvoorbeeld "has-live". Kies "uploading an existing file" en sleep de inhoud van deze map erin (api, public, package.json, vercel.json). Klik op Commit.
2. Ga naar vercel.com, Add New, Project. Kies de repository has-live en klik Import. Laat alle instellingen staan en klik Deploy. Wacht tot het klaar is.
3. Open in het project het tabblad Storage. Kies Create Database, dan Blob. Naam: has-live-data. Kies Public en Connect Project (has-live). Vercel voegt zelf de sleutel BLOB_READ_WRITE_TOKEN toe.
4. Open Settings, Environment Variables. Voeg twee variabelen toe voor Production:
   HAS_PASSWORD = nyQUPrDqJwo5
   HAS_BLOB_PATH = has-aee7dbedbf67168eac98/telefoon.json
   (Kies zelf een ander wachtwoord als je wilt.)
5. Open Settings, Deployment Protection. Zet Vercel Authentication uit. De site heeft haar eigen wachtwoord. Anders komt HAS er niet doorheen.
6. Ga naar Deployments, klik bij de laatste op de drie puntjes en kies Redeploy.
7. In HAS: pagina Ik volg, klap "Instellingen voor HAS Live op Vercel" open. Vul in het adres van je site (staat bovenaan het project, bijvoorbeeld https://has-live.vercel.app) en het wachtwoord. Klik Bewaar.
8. Klik op "Zet op telefoon". Er staat dan "Staat nu op je HAS Live-site".
9. Open het adres op je iPhone of iPad, vul het wachtwoord in en kies in Safari Deel, Zet op beginscherm.

Elke wedstrijd daarna: Bijwerken in HAS, de wedstrijd volgen, Zet op telefoon. Op de iPad tik je op Vernieuwen.
