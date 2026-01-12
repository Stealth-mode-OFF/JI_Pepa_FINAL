import { legalEntity } from "./legal";

export type LegalSectionKey = "privacy" | "terms" | "cookies";

export type LegalDocSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  intro?: string[];
  sections: LegalDocSection[];
};

export const legalSectionLabels: Record<LegalSectionKey, string> = {
  privacy: "Zásady zpracování osobních údajů (GDPR)",
  terms: "Obchodní podmínky",
  cookies: "Zásady cookies",
};

const companyLine = `${legalEntity.companyName}, ${legalEntity.legalForm}, IČO: ${legalEntity.idNumber}`;
const registryLine = `Zapsaná v ${legalEntity.registry.name} vedeném u ${legalEntity.registry.court}, spisová značka ${legalEntity.registry.fileNumber}.`;
const addressLine = `Sídlo: ${legalEntity.registeredAddress}.`;

export const legalDocs: Record<LegalSectionKey, LegalDoc> = {
  privacy: {
    title: legalSectionLabels.privacy,
    intro: [
      `Tyto zásady vysvětlují, jak ${legalEntity.companyName} (dále jen „Správce“) zpracovává osobní údaje v souvislosti s poskytováním jazykových kurzů a provozem webu.`,
      "Zpracování probíhá v souladu s nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a souvisejícími právními předpisy.",
    ],
    sections: [
      {
        heading: "Správce osobních údajů",
        paragraphs: [
          companyLine,
          addressLine,
          registryLine,
          `Kontakt: ${legalEntity.contact.email}, tel. ${legalEntity.contact.phone}.`,
          `Kontakt pro GDPR: ${legalEntity.dataProtectionContact.email}${legalEntity.dataProtectionContact.phone ? `, tel. ${legalEntity.dataProtectionContact.phone}` : ""}.`,
        ],
      },
      {
        heading: "Jaké údaje zpracováváme",
        paragraphs: [
          "Zpracováváme pouze údaje nezbytné pro komunikaci, poskytování kurzů a plnění zákonných povinností.",
        ],
        bullets: [
          "identifikační a kontaktní údaje (jméno, e-mail, telefon)",
          "údaje o kurzu/objednávce a historii komunikace",
          "fakturační údaje potřebné pro účetnictví",
          "technické údaje o zařízení a používání webu (IP adresa, logy, cookies/podobné technologie)",
        ],
      },
      {
        heading: "Účely a právní základy zpracování",
        bullets: [
          "plnění smlouvy a poskytování kurzu (čl. 6 odst. 1 písm. b) GDPR)",
          "plnění právních povinností (čl. 6 odst. 1 písm. c) GDPR)",
          "oprávněný zájem – ochrana práv, zajištění provozu webu, bezpečnost (čl. 6 odst. 1 písm. f) GDPR)",
          "marketing a zasílání novinek pouze se souhlasem (čl. 6 odst. 1 písm. a) GDPR)",
        ],
      },
      {
        heading: "Doba uložení",
        paragraphs: [
          "Údaje uchováváme po dobu trvání smluvního vztahu a poté po dobu nezbytnou pro ochranu práv a plnění zákonných povinností.",
        ],
        bullets: [
          "běžná komunikace a poptávky: zpravidla do 12 měsíců",
          "smluvní a účetní doklady: po dobu stanovenou zákonem (obvykle 10 let)",
          "marketingové údaje: do odvolání souhlasu",
        ],
      },
      {
        heading: "Příjemci a zpracovatelé",
        paragraphs: [
          "Osobní údaje mohou být zpřístupněny pouze nezbytným zpracovatelům, se kterými máme uzavřené smlouvy o zpracování osobních údajů.",
        ],
        bullets: [
          "poskytovatelé hostingu a IT správy",
          "poskytovatelé e-mailových služeb a komunikace",
          "účetní a daňoví poradci",
          "případní externí lektoři zapojení do kurzu",
        ],
      },
      {
        heading: "Předávání mimo EU",
        paragraphs: [
          "Osobní údaje standardně zpracováváme v rámci EU/EHP. Pokud by došlo k předávání mimo EU, zajistíme odpovídající záruky (např. standardní smluvní doložky).",
        ],
      },
      {
        heading: "Práva subjektů údajů",
        paragraphs: [
          "Máte právo na přístup k údajům, opravu, výmaz, omezení zpracování, přenositelnost, vznést námitku a odvolat souhlas se zpracováním, pokud je zpracování založeno na souhlasu.",
        ],
        bullets: [
          "právo požádat o potvrzení, zda údaje zpracováváme",
          "právo na opravu nepřesných údajů",
          "právo na výmaz, pokud není dán zákonný důvod pro uchování",
          "právo podat stížnost u dozorového úřadu",
        ],
      },
      {
        heading: "Dozorový úřad",
        paragraphs: [
          "Dozorovým úřadem je Úřad pro ochranu osobních údajů (www.uoou.cz).",
        ],
      },
      {
        heading: "Bezpečnost",
        paragraphs: [
          "Přijímáme přiměřená technická a organizační opatření k zabezpečení osobních údajů proti ztrátě, zneužití či neoprávněnému přístupu.",
        ],
      },
      {
        heading: "Změny těchto zásad",
        paragraphs: [
          "Tyto zásady můžeme průběžně aktualizovat. Doporučujeme je čas od času zkontrolovat.",
        ],
      },
    ],
  },
  terms: {
    title: legalSectionLabels.terms,
    intro: [
      "Tyto obchodní podmínky upravují poskytování jazykových kurzů a souvisejících služeb. Konkrétní rozsah a cena služby jsou vždy uvedeny v aktuální nabídce a v potvrzení objednávky.",
    ],
    sections: [
      {
        heading: "Poskytovatel služby",
        paragraphs: [companyLine, addressLine, registryLine],
      },
      {
        heading: "Předmět služby",
        paragraphs: [
          "Poskytujeme mimoškolní vzdělávání a jazykové kurzy pro jednotlivce i malé skupiny. Obsah kurzu, počet lekcí a forma výuky jsou specifikovány v nabídce nebo individuální dohodě.",
        ],
      },
      {
        heading: "Objednávka a uzavření smlouvy",
        paragraphs: [
          "Smlouva je uzavřena potvrzením objednávky ze strany poskytovatele (e-mailem nebo jiným dohodnutým způsobem).",
          "Poskytovatel si vyhrazuje právo odmítnout objednávku v odůvodněných případech (např. kapacita kurzu).",
        ],
      },
      {
        heading: "Cena a platební podmínky",
        paragraphs: [
          "Cena je stanovena dle aktuální nabídky nebo individuální dohody. Platba probíhá bankovním převodem, případně jiným dohodnutým způsobem.",
          "Daňový doklad je vystaven po úhradě ceny služby.",
        ],
      },
      {
        heading: "Průběh kurzu a změny",
        paragraphs: [
          "Rozsah, termíny a místo výuky jsou uvedeny v nabídce nebo dohodě. Poskytovatel může z provozních důvodů termín změnit; o změně informuje s přiměřeným předstihem.",
          "Pokud se student nemůže výuky zúčastnit, může po dohodě zajistit náhradníka nebo domluvit náhradní termín, pokud to kapacita umožní.",
        ],
      },
      {
        heading: "Storno a odstoupení",
        paragraphs: [
          "Podmínky storna a případné storno poplatky jsou uvedeny v nabídce nebo v potvrzení objednávky. Tyto podmínky mají přednost před obecným zněním těchto obchodních podmínek.",
          "Spotřebitel má při uzavření smlouvy na dálku obecně právo odstoupit do 14 dnů, pokud již nezačalo plnění služby. Pokud s plněním začne se souhlasem spotřebitele, právo na odstoupení zaniká v rozsahu poskytnutého plnění.",
        ],
      },
      {
        heading: "Reklamace a vady",
        paragraphs: [
          "Případné vady služby může klient uplatnit bez zbytečného odkladu na kontaktu uvedeném v těchto podmínkách. Reklamace bude vyřízena v přiměřené lhůtě.",
        ],
      },
      {
        heading: "Mimosoudní řešení sporů",
        paragraphs: [
          "Spotřebitel má právo na mimosoudní řešení sporu. Subjektem mimosoudního řešení je Česká obchodní inspekce (www.coi.cz).",
        ],
      },
      {
        heading: "Závěrečná ustanovení",
        paragraphs: [
          "Tyto obchodní podmínky jsou platné a účinné od zveřejnění na webu. Poskytovatel je může změnit; nové znění je účinné dnem zveřejnění.",
        ],
      },
    ],
  },
  cookies: {
    title: legalSectionLabels.cookies,
    intro: [
      "Tato stránka používá cookies a podobné technologie (např. localStorage) k zajištění základní funkčnosti, bezpečnosti a uložení vašich preferencí.",
    ],
    sections: [
      {
        heading: "Co jsou cookies",
        paragraphs: [
          "Cookies jsou malé textové soubory ukládané do vašeho zařízení, které umožňují zapamatovat si vaše volby a zlepšit uživatelský zážitek.",
        ],
      },
      {
        heading: "Kategorie cookies",
        bullets: [
          "nezbytné – zajišťují fungování webu a ukládají vaše volby",
          "analytické – pomáhají měřit návštěvnost a výkon (pouze se souhlasem)",
          "marketingové – slouží k personalizaci reklamy (pouze se souhlasem)",
        ],
      },
      {
        heading: "Cookies, které používáme",
        paragraphs: [
          "Aktuálně používáme pouze nezbytné cookies/podobné úložiště pro uložení vašich voleb.",
        ],
        bullets: [
          "cookie_consent – informace o tom, zda jste již udělili souhlas",
          "cookie_preferences – uložené preference kategorií",
        ],
      },
      {
        heading: "Jak změnit nastavení",
        paragraphs: [
          "Nastavení můžete kdykoli změnit kliknutím na tlačítko „Settings“ v cookie liště nebo v prohlížeči smazáním uložených cookies.",
        ],
      },
      {
        heading: "Další informace",
        paragraphs: [
          "Pokud budete mít dotazy k používání cookies, kontaktujte nás na e-mailu uvedeném v zásadách zpracování osobních údajů.",
        ],
      },
    ],
  },
};
