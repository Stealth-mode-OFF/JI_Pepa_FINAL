export type StatutoryPerson = {
  name: string;
  city: string;
  role: string;
  since: string;
};

export type LegalEntity = {
  companyName: string;
  legalForm: string;
  incorporationDate: string;
  registry: {
    name: string;
    court: string;
    fileNumber: string;
  };
  registeredAddress: string;
  idNumber: string;
  vatId?: string;
  businessActivity: string;
  statutoryBody: StatutoryPerson[];
  contact: {
    email: string;
    phone: string;
  };
  dataProtectionContact: {
    email: string;
    phone?: string;
  };
};

const legalEntity: LegalEntity = {
  companyName: "Jazyk a Integrace s.r.o.",
  legalForm: "společnost s ručením omezeným",
  incorporationDate: "9. říjen 2025",
  registry: {
    name: "Obchodní rejstřík",
    court: "Městský soud v Praze",
    fileNumber: "C 433136/MSPH",
  },
  registeredAddress: "Černomořská 384/9, Praha 10",
  idNumber: "23812036",
  businessActivity:
    "výroba, obchod a služby neuvedené v přílohách 1 až 3 živnostenského zákona - mimoškolní výchova a vzdělávání, pořádání kurzů, školení, včetně lektorské činnosti",
  statutoryBody: [
    {
      name: "JEKATĚRINA NASIROVA",
      city: "Praha",
      role: "Jednatel",
      since: "9. říjen 2025",
    },
    {
      name: "MARTA CASSANO",
      city: "Praha",
      role: "Jednatel",
      since: "9. říjen 2025",
    },
    {
      name: "Josef Hofman",
      city: "Praha",
      role: "Jednatel",
      since: "9. říjen 2025",
    },
  ],
  contact: {
    email: "jazykaintegrace@gmail.com",
    phone: "+420 601 177 208",
  },
  dataProtectionContact: {
    email: "jazykaintegrace@gmail.com",
    phone: "+420 601 177 208",
  },
};

export default legalEntity;
