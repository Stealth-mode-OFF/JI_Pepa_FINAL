import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";

interface PhraseItem {
  czech: string;
  pronunciation: string;
  meaning: string;
  context: string;
}

const CheatSheet: React.FC = () => {
  const { t } = useTranslation();

  const handleDownload = () => {
    window.print();
  };

  const phrases: Record<string, PhraseItem[]> = {
    conversation: [
      {
        czech: 'Jak se vede?',
        pronunciation: '(yahk seh VEH-deh)',
        meaning: 'How\'s it going?',
        context: 'More casual than "Jak se máš?" Use with friends, colleagues.'
      },
      {
        czech: 'Co je nového?',
        pronunciation: '(tso yeh NOH-veh-ho)',
        meaning: 'What\'s new?',
        context: 'Perfect for catching up with someone you haven\'t seen in a while.'
      },
      {
        czech: 'Nic moc.',
        pronunciation: '(neets mots)',
        meaning: 'Not much. / Not great.',
        context: 'The go-to Czech response. Modest and real.'
      },
      {
        czech: 'Ujde to.',
        pronunciation: '(OOY-deh toh)',
        meaning: 'It\'s okay. / It\'ll do.',
        context: 'Classic Czech understatement. Never too enthusiastic!'
      },
      {
        czech: 'To je jedno.',
        pronunciation: '(toh yeh YED-noh)',
        meaning: 'It doesn\'t matter. / Whatever.',
        context: 'When you\'re flexible about plans or choices.'
      }
    ],
    polite: [
      {
        czech: 'Mohl bys...?',
        pronunciation: '(moh-hl bees)',
        meaning: 'Could you...? (informal)',
        context: 'Way softer than commanding. "Mohl bys mi pomoct?" = Could you help me?'
      },
      {
        czech: 'Není problém.',
        pronunciation: '(NEH-nee PROB-lehm)',
        meaning: 'No problem.',
        context: 'Easy, friendly way to agree or reassure someone.'
      },
      {
        czech: 'Nevadilo by ti...?',
        pronunciation: '(NEH-vah-dee-loh bee tee)',
        meaning: 'Would you mind...?',
        context: 'Super polite. "Nevadilo by ti otevřít okno?" = Would you mind opening the window?'
      },
      {
        czech: 'Prosím tě',
        pronunciation: '(PROH-seem tyeh)',
        meaning: 'Please (informal)',
        context: 'Add this to any request to sound polite. "Dáš mi to, prosím tě?"'
      },
      {
        czech: 'Díky moc!',
        pronunciation: '(DEE-kee mots)',
        meaning: 'Thanks a lot!',
        context: 'Warmer than plain "Děkuji." Use it everywhere.'
      }
    ],
    fillers: [
      {
        czech: 'Tak...',
        pronunciation: '(tahk)',
        meaning: 'So... / Well...',
        context: 'The ultimate filler. Start sentences, pause, think. Czechs say this constantly.'
      },
      {
        czech: 'No...',
        pronunciation: '(noh)',
        meaning: 'Well... / Yeah...',
        context: 'NOT "no"! It\'s like "well" or a thinking sound. "No, nevím..." = Well, I don\'t know...'
      },
      {
        czech: 'Vlastně...',
        pronunciation: '(VLAHS-tnyeh)',
        meaning: 'Actually...',
        context: 'When you\'re correcting or reconsidering. "Vlastně, mám čas." = Actually, I have time.'
      },
      {
        czech: 'Jakože...',
        pronunciation: '(YAH-koh-zheh)',
        meaning: 'Like... / I mean...',
        context: 'Younger Czechs use this all the time to clarify or emphasize.'
      },
      {
        czech: 'Nevím...',
        pronunciation: '(NEH-veem)',
        meaning: 'I don\'t know...',
        context: 'Buys you time when thinking. Very natural.'
      },
      {
        czech: 'Prostě...',
        pronunciation: '(PROHS-tyeh)',
        meaning: 'Simply... / Just...',
        context: '"Prostě nevím" = I just don\'t know. Adds emphasis.'
      }
    ],
    reactions: [
      {
        czech: 'To je v pohodě.',
        pronunciation: '(toh yeh FPOH-hoh-dyeh)',
        meaning: 'That\'s fine. / It\'s all good.',
        context: 'Reassuring, chill. "V pohodě" = relaxed, no worries.'
      },
      {
        czech: 'To je síla!',
        pronunciation: '(toh yeh SEE-lah)',
        meaning: 'That\'s awesome! / Wow!',
        context: 'When you\'re impressed or excited.'
      },
      {
        czech: 'To je šílený!',
        pronunciation: '(toh yeh SHEE-leh-nee)',
        meaning: 'That\'s crazy!',
        context: 'Can be positive or negative depending on tone.'
      },
      {
        czech: 'Vážně?',
        pronunciation: '(VAAZH-nyeh)',
        meaning: 'Really? / Seriously?',
        context: 'Express surprise or disbelief.'
      },
      {
        czech: 'To je mi líto.',
        pronunciation: '(toh yeh mee LEE-toh)',
        meaning: 'I\'m sorry (to hear that).',
        context: 'Show sympathy when someone shares bad news.'
      },
      {
        czech: 'Bohužel.',
        pronunciation: '(BOH-hoo-zhel)',
        meaning: 'Unfortunately.',
        context: '"Bohužel nemůžu" = Unfortunately I can\'t. Very common.'
      }
    ],
    pub: [
      {
        czech: 'Dám si...',
        pronunciation: '(dahm see)',
        meaning: 'I\'ll have...',
        context: '"Dám si pivo" = I\'ll have a beer. Standard ordering phrase.'
      },
      {
        czech: 'Ještě jedno.',
        pronunciation: '(YESH-tyeh YED-noh)',
        meaning: 'One more.',
        context: 'At the pub when you want another round.'
      },
      {
        czech: 'Účet, prosím.',
        pronunciation: '(OO-chet PROH-seem)',
        meaning: 'Check, please.',
        context: 'How to ask for the bill at a restaurant.'
      },
      {
        czech: 'Platím kartou.',
        pronunciation: '(PLAH-teem KAR-toh)',
        meaning: 'I\'m paying by card.',
        context: 'Essential for modern transactions.'
      },
      {
        czech: 'Na zdraví!',
        pronunciation: '(nah ZDRAH-vee)',
        meaning: 'Cheers! / Bless you!',
        context: 'Toasting with drinks OR responding to a sneeze!'
      },
      {
        czech: 'Dobrou chuť!',
        pronunciation: '(DOH-broh HOOT)',
        meaning: 'Enjoy your meal!',
        context: 'Say this before eating or to others who are eating.'
      }
    ],
    practical: [
      {
        czech: 'Kde je...?',
        pronunciation: '(gdeh yeh)',
        meaning: 'Where is...?',
        context: 'Basic but essential. "Kde je metro?" = Where\'s the metro?'
      },
      {
        czech: 'Nevíte, kde...?',
        pronunciation: '(NEH-vee-teh gdeh)',
        meaning: 'Do you know where...?',
        context: 'Polite way to ask for directions from strangers.'
      },
      {
        czech: 'Promiňte',
        pronunciation: '(PROH-min-teh)',
        meaning: 'Excuse me / Sorry',
        context: 'Getting someone\'s attention or apologizing politely.'
      },
      {
        czech: 'Můžu projít?',
        pronunciation: '(MOO-zhoo PROH-yeet)',
        meaning: 'Can I get through?',
        context: 'On crowded trams or in shops when you need to pass.'
      },
      {
        czech: 'Hned tu budu.',
        pronunciation: '(hnet too BOO-doo)',
        meaning: 'I\'ll be right there.',
        context: 'When running late or someone\'s waiting for you.'
      }
    ],
    street: [
      {
        czech: 'Fakt?',
        pronunciation: '(fahkt)',
        meaning: 'Really?',
        context: 'Informal, common among young people. "To je fakt dobré!" = That\'s really good!'
      },
      {
        czech: 'Jasně!',
        pronunciation: '(YAHS-nyeh)',
        meaning: 'Sure! / Of course!',
        context: 'Agreeing enthusiastically. Very common.'
      },
      {
        czech: 'Jóó...',
        pronunciation: '(yoh-oh)',
        meaning: 'Yeah... / Uh-huh...',
        context: 'Agreeing or showing you\'re listening. Drawn out.'
      },
      {
        czech: 'Né?',
        pronunciation: '(neh)',
        meaning: 'Right? / Isn\'t it?',
        context: 'Added at the end for confirmation. "Je to dobrý, né?" = It\'s good, right?'
      },
      {
        czech: 'Pohoda!',
        pronunciation: '(POH-hoh-dah)',
        meaning: 'Cool! / No worries!',
        context: 'Super casual. Everything\'s chill.'
      },
      {
        czech: 'Máš pravdu.',
        pronunciation: '(mahsh PRAHV-doo)',
        meaning: 'You\'re right.',
        context: 'Agreeing with someone\'s point.'
      },
      {
        czech: 'To dává smysl.',
        pronunciation: '(toh DAH-vah SMEE-sl)',
        meaning: 'That makes sense.',
        context: 'When you understand and agree with reasoning.'
      }
    ],
    plans: [
      {
        czech: 'Domluveno.',
        pronunciation: '(dohm-LOO-veh-noh)',
        meaning: 'It\'s a deal. / Agreed.',
        context: 'Confirming plans. Very satisfying to say!'
      },
      {
        czech: 'Sejdeme se...',
        pronunciation: '(SEY-deh-meh seh)',
        meaning: 'Let\'s meet...',
        context: '"Sejdeme se v šest" = Let\'s meet at six.'
      },
      {
        czech: 'Ozvu se.',
        pronunciation: '(OH-zvoo seh)',
        meaning: 'I\'ll be in touch. / I\'ll call/text.',
        context: 'When ending a conversation and planning to reconnect.'
      },
      {
        czech: 'Musím jít.',
        pronunciation: '(MOO-seem yeet)',
        meaning: 'I have to go.',
        context: 'Polite way to exit a conversation.'
      },
      {
        czech: 'Držím palce.',
        pronunciation: '(DR-zheem PAHL-tseh)',
        meaning: 'I\'m keeping my fingers crossed for you. / Good luck!',
        context: 'Literal: "I\'m holding thumbs." Way to wish someone luck.'
      }
    ],
    goodbyes: [
      {
        czech: 'Měj se!',
        pronunciation: '(myay seh)',
        meaning: 'Take care!',
        context: 'Casual, friendly goodbye. "Měj se hezky!" = Have a nice one!'
      },
      {
        czech: 'Uvidíme se.',
        pronunciation: '(OO-vee-dee-meh seh)',
        meaning: 'We\'ll see each other. / See you.',
        context: 'Standard parting phrase when you\'ll meet again.'
      },
      {
        czech: 'Zatím!',
        pronunciation: '(ZAH-teem)',
        meaning: 'Bye for now! / See ya!',
        context: 'Casual, friendly. Perfect for people you see regularly.'
      },
      {
        czech: 'Hezký den!',
        pronunciation: '(HEZ-kee den)',
        meaning: 'Have a nice day!',
        context: 'Polite parting. Shopkeepers say this all the time.'
      },
      {
        czech: 'Nashle!',
        pronunciation: '(NAHS-hleh)',
        meaning: 'Goodbye! / See you!',
        context: 'Short for "na shledanou." More casual.'
      }
    ]
  };

  const sections = [
    {
      key: "conversation",
      emoji: "🗣️",
      title: t("cheatSheet.sections.conversation.title", "Conversation Starters & Small Talk"),
    },
    {
      key: "polite",
      emoji: "🤝",
      title: t("cheatSheet.sections.polite.title", "Softening Requests (Be Polite, Not Pushy)"),
    },
    {
      key: "fillers",
      emoji: "⏸️",
      title: t("cheatSheet.sections.fillers.title", "Filling Pauses & Thinking Out Loud"),
    },
    {
      key: "reactions",
      emoji: "😅",
      title: t("cheatSheet.sections.reactions.title", "Reacting & Expressing Emotion"),
    },
    {
      key: "pub",
      emoji: "🍺",
      title: t("cheatSheet.sections.pub.title", "At the Pub, Restaurant, or Shop"),
    },
    {
      key: "practical",
      emoji: "🚇",
      title: t("cheatSheet.sections.practical.title", "Getting Around & Practical Phrases"),
    },
    {
      key: "street",
      emoji: "💬",
      title: t("cheatSheet.sections.street.title", "Understanding Street Czech"),
    },
    {
      key: "plans",
      emoji: "🎯",
      title: t("cheatSheet.sections.plans.title", "Agreements & Plans"),
    },
    {
      key: "goodbyes",
      emoji: "😊",
      title: t("cheatSheet.sections.goodbyes.title", "Closing & Goodbyes"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <div className="no-print">
        <Header />
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-5xl">
        {/* Header Section */}
        <div className="bg-[#FFED00] border-4 border-black rounded-none p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] print-shadow-none">
          <h1 className="font-montserrat-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-3 sm:mb-4 uppercase tracking-tight">
            {t("cheatSheet.title", "Natural Czech Cheat Sheet")}
          </h1>
          <p className="font-montserrat-medium text-lg sm:text-xl md:text-2xl text-black mb-2">
            {t("cheatSheet.subtitle", "50 Essential Phrases Locals Actually Use")}
          </p>
          <p className="font-inter text-base sm:text-lg text-black/80 italic">
            {t(
              "cheatSheet.tagline",
              "Stop sounding like a textbook. Start sounding like you live here.",
            )}
          </p>
          
          <button
            onClick={handleDownload}
            aria-label={t("cheatSheet.downloadAriaLabel", "Download cheat sheet as PDF")}
            className="mt-6 sm:mt-8 no-print bg-black text-[#FFED00] font-montserrat-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-wide border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] w-full sm:w-auto"
          >
            {t("cheatSheet.downloadCta", "📥 Download as PDF")}
          </button>
        </div>

        {/* Intro Section */}
        <div className="bg-white border-4 border-black p-6 sm:p-8 mb-8 sm:mb-12 shadow-[4px_4px_0_0_rgba(0,0,0,1)] print-shadow-none">
          <h2 className="font-montserrat-bold text-2xl sm:text-3xl text-black mb-3 sm:mb-4">
            {t("cheatSheet.introTitle", "Why You Need This")}
          </h2>
          <p className="font-inter text-base sm:text-lg text-black mb-4">
            <strong>{t("cheatSheet.introBold", "Grammar tables won't help you at the pub.")}</strong>{" "}
            {t(
              "cheatSheet.introBody1",
              "This cheat sheet gives you the phrases Czechs use every single day—the ones that make you sound natural, not like you're reading from a language app.",
            )}
          </p>
          <p className="font-inter text-lg text-black">
            {t(
              "cheatSheet.introBody2",
              "Master these 50 phrases and you'll handle small talk, soften requests, fill awkward pauses, and actually understand what people say on the street.",
            )}
          </p>
        </div>

        {/* Phrase Sections */}
        {sections.map((section) => (
          <div
            key={section.key}
            className="mb-8 sm:mb-12 bg-white border-4 border-black p-5 sm:p-6 md:p-8 shadow-[4px_4px_0_0_rgba(0,0,0,1)] print-shadow-none break-inside-avoid"
          >
            <h3 className="font-montserrat-bold text-xl sm:text-2xl text-black mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-4 border-[#FFED00]">
              {section.emoji} {section.title}
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              {phrases[section.key].map((phrase, index) => (
                <div
                  key={index}
                  className="bg-[#FFED00]/10 border-l-4 border-black p-4 sm:p-5 rounded-none break-inside-avoid"
                >
                  <div className="font-montserrat-bold text-xl sm:text-2xl text-black mb-2">
                    {phrase.czech}
                  </div>
                  <div className="font-inter italic text-black/60 text-sm sm:text-base mb-2">
                    {phrase.pronunciation}
                  </div>
                  <div className="font-inter text-base sm:text-lg text-black mb-2">
                    {phrase.meaning}
                  </div>
                  <div className="font-inter text-sm sm:text-base text-black/70 italic">
                    {phrase.context}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Pro Tip */}
        <div className="bg-[#FFED00] border-l-4 sm:border-l-8 border-black p-5 sm:p-6 mb-8 sm:mb-12 print-shadow-none">
          <p className="font-inter text-base sm:text-lg text-black">
            <strong className="font-montserrat-bold text-xl">
              {t("cheatSheet.proTipLabel", "💡 Pro Tip:")}
            </strong>{" "}
            {t(
              "cheatSheet.proTipBody",
              "Don't try to memorize all 50 at once. Pick 5-10 phrases that fit situations you encounter daily. Use them until they feel automatic, then add more. The goal isn't perfection—it's sounding natural and feeling confident in real conversations.",
            )}
          </p>
        </div>

        {/* Footer CTA */}
        <div className="bg-black text-white p-12 text-center border-4 border-black shadow-[8px_8px_0_0_rgba(255,237,0,1)] print-shadow-none">
          <p className="font-montserrat-bold text-2xl mb-4 text-[#FFED00]">
            {t("cheatSheet.footerTitle", "Want to sound even more natural?")}
          </p>
          <p className="font-inter text-lg mb-8">
            {t(
              "cheatSheet.footerBody",
              "This cheat sheet is just the beginning. Our courses teach you how to actually USE these phrases in real conversations, understand responses, and build genuine fluency.",
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="no-print inline-block bg-[#FFED00] text-black font-montserrat-bold text-lg px-8 py-4 uppercase tracking-wide border-4 border-[#FFED00] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0_0_rgba(255,237,0,1)]"
            >
              {t("cheatSheet.footerCta", "Start Enrollment")}
            </a>
            <a
              href="/#courses"
              className="no-print inline-block bg-black text-[#FFED00] font-montserrat-bold text-lg px-8 py-4 uppercase tracking-wide border-4 border-[#FFED00] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0_0_rgba(255,237,0,1)]"
            >
              {t("cheatSheet.footerSecondaryCta", "See Cohorts")}
            </a>
          </div>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-shadow-none {
            box-shadow: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default CheatSheet;
