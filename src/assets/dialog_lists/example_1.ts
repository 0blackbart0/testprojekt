export let example1 = {
  title: "Beispiel 1",
  nodeList: [
    {
      id: "1",
      type: "startNode",
      title: "Start",
      childId: "2",
      parentId: "null",
      greeting: "Hallo, wie darf ich Ihnen helfen?"
    },
    { id: "2", type: "dividerNode", title: "Beispiel Baum", parentId: "1" },
    {
      id: "3",
      type: "dividerBranch",
      selectionText: "Produktberatung",
      parentId: "2",
      childId: "4"
    },
    {
      id: "4",
      type: "monolog",
      title: "Vorhandene Verträge",
      childId: "5",
      parentId: "3",
      forwardText: "Haben sie bereits Verträge bei uns?"
    },
    { id: "5", type: "dividerNode", title: "", parentId: "4" },
    {
      id: "6",
      type: "dividerBranch",
      selectionText: "Ja",
      parentId: "5",
      childId: "7"
    },
    { id: "7", type: "link", title: "BAUM: Produktberatung", parentId: "6" },
    {
      id: "8",
      type: "dividerBranch",
      selectionText: "Nein",
      parentId: "5",
      childId: "9"
    },
    {
      id: "9",
      type: "monolog",
      title: "Erlaubnis nach Verfügbarkeit",
      childId: "10",
      parentId: "8",
      forwardText:
        "Sie können nur unsere Produkte wählen, sofern das TV Signal von uns ist. Dürfen wir dies vorab prüfen oder wünschen sie trotzdem eine Produktberatung?"
    },
    { id: "10", type: "dividerNode", title: "", parentId: "9" },
    {
      id: "11",
      type: "dividerBranch",
      selectionText: "Produktberatung",
      parentId: "10",
      childId: "12"
    },
    { id: "12", type: "link", title: "BAUM: Produktberatung", parentId: "11" },
    {
      id: "13",
      type: "dividerBranch",
      selectionText: "Verfügbarkeit prüfen",
      parentId: "10",
      childId: "14"
    },
    {
      id: "14",
      type: "monolog",
      title: "Start Verfügbarkeit",
      childId: "15",
      parentId: "13",
      forwardText:
        "Wir erfragen nun einige Daten, um eine Verfügbarkeit zu prüfen - Wünschen sie dies nicht, schließen sie ganz einfach dieses Fenster."
    },
    {
      id: "15",
      type: "monolog",
      title: "Anschlussadresse",
      childId: "16",
      parentId: "14",
      forwardText: "Bitte nennen Sie uns Ihre Anschlussadresse, etc."
    },
    {
      id: "16",
      type: "dialog",
      title: "Eingabe: Anschlussadresse",
      childId: "17",
      parentId: "15",
      question: "Max Musterfrau    \nLingmusterweg 6    \n1234 Musterhausen",
      answer: "Möchten Sie das Ergebnis via Email erfahren?"
    },
    { id: "17", type: "dividerNode", title: "", parentId: "16" },
    {
      id: "18",
      type: "dividerBranch",
      selectionText: "Ja",
      parentId: "17",
      childId: "19"
    },
    {
      id: "19",
      type: "monolog",
      title: "EmailAdresse",
      childId: "20",
      parentId: "18",
      forwardText: "Bitte nennen Sie uns hierfür Ihre Email Adresse."
    },
    {
      id: "20",
      type: "dialog",
      title: "Eingabe: Email",
      childId: "21",
      parentId: "19",
      question: "Max@Musterfrau.de",
      answer:
        "Wunderbar, wir leiten alles in die Wege und halten sie auf dem laufenden."
    },
    {
      id: "21",
      type: "monolog",
      title: "Verabschiedung",
      childId: "undefined",
      parentId: "20",
      forwardText:
        "Vielen Dank für Ihr Vertrauen und Ihr Interesse an ***** haben sie noch weitere Fragen oder Anliegen? (ggfs. Abschied)"
    },
    {
      id: "22",
      type: "dividerBranch",
      selectionText: "Nein",
      parentId: "17",
      childId: "23"
    },
    {
      id: "23",
      type: "monolog",
      title: "Telefonnummer",
      childId: "24",
      parentId: "22",
      forwardText:
        "Gerne kontaktieren wir Sie auch telefonisch. Bitte nennen Sie uns hierfür Ihre Telefonnummer."
    },
    {
      id: "24",
      type: "dialog",
      title: "Eingabe: Telefonnummer",
      childId: "30",
      parentId: "23",
      question: "0431-1234567",
      answer:
        "Wunderbar, wir leiten alles in die Wege und halten sie auf dem laufenden."
    },
    {
      id: "25",
      type: "dividerBranch",
      selectionText: "unsicher",
      parentId: "5",
      childId: "26"
    },
    {
      id: "26",
      type: "link",
      title: "Erlaubnis nach Verfügbarkeit",
      parentId: "25"
    },
    {
      id: "27",
      type: "dividerBranch",
      selectionText: "Störung",
      parentId: "2",
      childId: "28"
    },
    { id: "28", type: "link", title: "BAUM: Störungsbaum", parentId: "27" },
    { id: "30", type: "link", title: "Verabschiedung", parentId: "24" }
  ]
};

export let example2 = {
  title: "Beispiel 2",
  nodeList: [
    {
      id: "0",
      type: "startNode",
      title: "Tarifberatung",
      childId: "2",
      parentId: "null",
      greeting:
        "xxx bietet ihnen verschiedene Produkte im Bereich Internet, Festnetz oder Mobilfunk - für was interessieren Sie sich?"
    },
    { id: "2", type: "dividerNode", title: "", parentId: "0" },
    {
      id: "3",
      type: "dividerBranch",
      selectionText: "IP",
      parentId: "2",
      childId: "7"
    },
    {
      id: "4",
      type: "dividerBranch",
      selectionText: "Voice + IP",
      parentId: "2",
      childId: "50"
    },
    {
      id: "5",
      type: "dividerBranch",
      selectionText: "Voice",
      parentId: "2",
      childId: "86"
    },
    {
      id: "7",
      type: "monolog",
      title: "Internetanschluss",
      childId: "9",
      parentId: "3",
      forwardText:
        "Benötigen Sie einen einfachen Internetanschluss oder möchten Sie mit Highspeed surfen?"
    },
    { id: "9", type: "dividerNode", title: "", parentId: "7" },
    {
      id: "10",
      type: "dividerBranch",
      selectionText: "Einfach",
      parentId: "9",
      childId: "34"
    },
    {
      id: "11",
      type: "dividerBranch",
      selectionText: "Gegenfrage",
      parentId: "9",
      childId: "14"
    },
    {
      id: "12",
      type: "dividerBranch",
      selectionText: "Highspeed",
      parentId: "9",
      childId: "22"
    },
    {
      id: "14",
      type: "monolog",
      title: "Hilfestellung",
      childId: "16",
      parentId: "11",
      forwardText: ""
    },
    {
      id: "16",
      type: "monolog",
      title: "Highspeed",
      childId: "18",
      parentId: "14",
      forwardText:
        "Wir bieten grundsätzlich 100mbits. Sollten Sie eine schnellere Geschwindigkeit wünschen, gibt es diese nur in Verbindung mit einer Telefonflatrate. Wünschen sie dies? "
    },
    { id: "18", type: "dividerNode", title: "", parentId: "16" },
    {
      id: "19",
      type: "dividerBranch",
      selectionText: "Nein",
      parentId: "18",
      childId: "24"
    },
    {
      id: "20",
      type: "dividerBranch",
      selectionText: "Ja",
      parentId: "18",
      childId: "26"
    },
    { id: "22", type: "link", title: "Highspeed", parentId: "12" },
    {
      id: "24",
      type: "monolog",
      title: "web 100 (IP)",
      childId: "32",
      parentId: "19",
      forwardText: ""
    },
    {
      id: "26",
      type: "monolog",
      title: "duo 250",
      childId: "28",
      parentId: "20",
      forwardText: ""
    },
    {
      id: "28",
      type: "monolog",
      title: "Prüfung",
      childId: "30",
      parentId: "26",
      forwardText: ""
    },
    { id: "30", type: "link", title: "BAUM: Verfügbarkeit", parentId: "28" },
    {
      id: "32",
      type: "monolog",
      title: "Unterlagen ohne Portierung",
      childId: "38",
      parentId: "24",
      forwardText: ""
    },
    {
      id: "34",
      type: "monolog",
      title: "web basic",
      childId: "36",
      parentId: "10",
      forwardText: ""
    },
    {
      id: "36",
      type: "link",
      title: "Unterlagen ohne Portierung",
      parentId: "34"
    },
    {
      id: "38",
      type: "monolog",
      title: "Erhalt der Unterlagen",
      childId: "40",
      parentId: "32",
      forwardText:
        "Wie möchten sie ihre Unterlagen von unserer Homepage erhalten oder dürfen wir sie Ihnen zuschicken?"
    },
    { id: "40", type: "dividerNode", title: "", parentId: "38" },
    {
      id: "41",
      type: "dividerBranch",
      selectionText: "Website",
      parentId: "40",
      childId: "44"
    },
    {
      id: "42",
      type: "dividerBranch",
      selectionText: "Zuschicken",
      parentId: "40",
      childId: "undefined"
    },
    {
      id: "44",
      type: "monolog",
      title: "Link zu Unterlagen",
      childId: "undefined",
      parentId: "41",
      forwardText: "Unter diesem Link finden sie alle relevanten Unterlagen."
    },
    {
      id: "50",
      type: "monolog",
      title: "Flatrate dt. Festnetz (V + IP)",
      childId: "52",
      parentId: "4",
      forwardText:
        "Benötigen Sie zu ihrem Internet und Telefonanschluss auch eine Flatrate auf das deutsche Festnetz?"
    },
    { id: "52", type: "dividerNode", title: "", parentId: "50" },
    {
      id: "53",
      type: "dividerBranch",
      selectionText: "Ja",
      parentId: "52",
      childId: "59"
    },
    {
      id: "54",
      type: "dividerBranch",
      selectionText: "Gegenfrage",
      parentId: "52",
      childId: "57"
    },
    {
      id: "55",
      type: "dividerBranch",
      selectionText: "Nein",
      parentId: "52",
      childId: "61"
    },
    {
      id: "57",
      type: "monolog",
      title: "Hilfestellung",
      childId: "63",
      parentId: "54",
      forwardText: ""
    },
    {
      id: "59",
      type: "monolog",
      title: "Duoflat",
      childId: "73",
      parentId: "53",
      forwardText: ""
    },
    {
      id: "61",
      type: "monolog",
      title: "web 100 (V+IP)",
      childId: "71",
      parentId: "55",
      forwardText: ""
    },
    { id: "63", type: "dividerNode", title: "", parentId: "57" },
    {
      id: "64",
      type: "dividerBranch",
      selectionText: "Duoflat",
      parentId: "63",
      childId: "67"
    },
    {
      id: "65",
      type: "dividerBranch",
      selectionText: "web 100",
      parentId: "63",
      childId: "69"
    },
    { id: "67", type: "link", title: "Duoflat", parentId: "64" },
    { id: "69", type: "link", title: "web 100", parentId: "65" },
    {
      id: "71",
      type: "monolog",
      title: "Rufnummer Mitnahme",
      childId: "75",
      parentId: "61",
      forwardText:
        "Möchten Sie ihre Momentane Rufnummer mitnehmen oder soll es schnell gehen?"
    },
    { id: "73", type: "link", title: "Rufnummer Mitnahme", parentId: "59" },
    { id: "75", type: "dividerNode", title: "", parentId: "71" },
    {
      id: "76",
      type: "dividerBranch",
      selectionText: "Schnell",
      parentId: "75",
      childId: "80"
    },
    {
      id: "77",
      type: "dividerBranch",
      selectionText: "Ich habe zurzeit keine eigene Rufnummer / Frage",
      parentId: "75",
      childId: "82"
    },
    {
      id: "78",
      type: "dividerBranch",
      selectionText: "Rufnummer behalten",
      parentId: "75",
      childId: "84"
    },
    {
      id: "80",
      type: "link",
      title: "Unterlagen ohne Portierung",
      parentId: "76"
    },
    {
      id: "82",
      type: "link",
      title: "Unterlagen ohne Portierung",
      parentId: "77"
    },
    {
      id: "84",
      type: "monolog",
      title: "Kündigung",
      childId: "112",
      parentId: "78",
      forwardText: "Bereits gekündigt?"
    },
    {
      id: "86",
      type: "monolog",
      title: "Flatrate dt. Festnetz (V)",
      childId: "88",
      parentId: "5",
      forwardText:
        "Benötigen Sie zu ihrem Telefonanschluss auch eine Flatrate auf das deutsche Festnetz?"
    },
    { id: "88", type: "dividerNode", title: "", parentId: "86" },
    {
      id: "89",
      type: "dividerBranch",
      selectionText: "Ja",
      parentId: "88",
      childId: "95"
    },
    {
      id: "90",
      type: "dividerBranch",
      selectionText: "Gegenfrage",
      parentId: "88",
      childId: "93"
    },
    {
      id: "91",
      type: "dividerBranch",
      selectionText: "Nein",
      parentId: "88",
      childId: "97"
    },
    {
      id: "93",
      type: "monolog",
      title: "Hilfestellung",
      childId: "99",
      parentId: "90",
      forwardText: ""
    },
    {
      id: "95",
      type: "monolog",
      title: "Fonflat",
      childId: "107",
      parentId: "89",
      forwardText: ""
    },
    {
      id: "97",
      type: "monolog",
      title: "Fon",
      childId: "109",
      parentId: "91",
      forwardText: ""
    },
    { id: "99", type: "dividerNode", title: "", parentId: "93" },
    {
      id: "100",
      type: "dividerBranch",
      selectionText: "Fonflat",
      parentId: "99",
      childId: "103"
    },
    {
      id: "101",
      type: "dividerBranch",
      selectionText: "Fon",
      parentId: "99",
      childId: "105"
    },
    { id: "103", type: "link", title: "Fonflat", parentId: "100" },
    { id: "105", type: "link", title: "Fon", parentId: "101" },
    { id: "107", type: "link", title: "Rufnummer Mitnahme", parentId: "95" },
    { id: "109", type: "link", title: "Rufnummer Mitnahme", parentId: "97" },
    { id: "112", type: "dividerNode", title: "", parentId: "84" },
    {
      id: "113",
      type: "dividerBranch",
      selectionText: "Ja",
      parentId: "112",
      childId: "116"
    },
    {
      id: "114",
      type: "dividerBranch",
      selectionText: "Nein",
      parentId: "112",
      childId: "118"
    },
    {
      id: "116",
      type: "monolog",
      title: "Beratung RRNP",
      childId: "120",
      parentId: "113",
      forwardText: "7 Tage ohne Anschluss?"
    },
    {
      id: "118",
      type: "monolog",
      title: "Beratung Portierung",
      childId: "141",
      parentId: "114",
      forwardText: "Wir kündigen für Sie."
    },
    { id: "120", type: "dividerNode", title: "", parentId: "116" },
    {
      id: "121",
      type: "dividerBranch",
      selectionText: "Nein",
      parentId: "120",
      childId: "124"
    },
    {
      id: "122",
      type: "dividerBranch",
      selectionText: "Ja",
      parentId: "120",
      childId: "130"
    },
    {
      id: "124",
      type: "monolog",
      title: "Vorabanschluss",
      childId: "126",
      parentId: "121",
      forwardText: "Es entstehen ggf. doppelte Kosten."
    },
    { id: "126", type: "dividerNode", title: "", parentId: "124" },
    {
      id: "127",
      type: "dividerBranch",
      selectionText: "Ja",
      parentId: "126",
      childId: "134"
    },
    {
      id: "128",
      type: "dividerBranch",
      selectionText: "Nein",
      parentId: "126",
      childId: "132"
    },
    {
      id: "130",
      type: "monolog",
      title: "RRNP vermerken",
      childId: "136",
      parentId: "122",
      forwardText: "RRNP wird auf Ihrem Antrag vermerkt. "
    },
    { id: "132", type: "link", title: "RRNP vermerken", parentId: "128" },
    {
      id: "134",
      type: "monolog",
      title: "Unterlagen + Portierungsformular",
      childId: "139",
      parentId: "127",
      forwardText:
        "Ihre Angaben werden entsprechend in Ihrem Formular vorgemerkt."
    },
    {
      id: "136",
      type: "link",
      title: "Unterlagen + Portierungsformular",
      parentId: "130"
    },
    {
      id: "139",
      type: "link",
      title: "Erhalt der Unterlagen",
      parentId: "134"
    },
    {
      id: "141",
      type: "link",
      title: "Unterlagen + Portierung",
      parentId: "118"
    }
  ]
};





let Bsp1 = {
  nodeType: "StartNode",
  title: "Start",
  greeting: "Hallo, wie darf ich Ihnen helfen?",
  child: {
    nodeType: "Divider",
    childs: [
      {
        nodeType: "DividerBranch",
        selectionText: "Produktberatung",
        child: {
          nodeType: "Monolog",
          title: "Vorhandene Verträge",
          forwardText: "Haben sie bereits Verträge bei uns?",
          child: {
            nodeType: "Divider",
            childs: [
              {
                nodeType: "DividerBranch",
                selectionText: "Ja",
                child: {
                  nodeType: "Link",
                  title: "BAUM: Produktberatung",
                  child: null
                }
              },
              {
                nodeType: "DividerBranch",
                selectionText: "Nein",
                child: {
                  nodeType: "Monolog",
                  title: "Erlaubnis nach Verfügbarkeit",
                  forwardText:
                    "Sie können nur unsere Produkte wählen, sofern das TV Signal von uns ist. Dürfen wir dies vorab prüfen oder wünschen sie trotzdem eine Produktberatung?",
                  child: {
                    nodeType: "Divider",
                    childs: [
                      {
                        nodeType: "DividerBranch",
                        selectionText: "Produktberatung",
                        child: {
                          nodeType: "Link",
                          title: "BAUM: Produktberatung",
                          child: null
                        }
                      },
                      {
                        nodeType: "DividerBranch",
                        selectionText: "Verfügbarkeit prüfen",
                        child: {
                          nodeType: "Monolog",
                          title: "Start Verfügbarkeit",
                          forwardText:
                            "Wir erfragen nun einige Daten, um eine Verfügbarkeit zu prüfen - Wünschen sie dies nicht, schließen sie ganz einfach dieses Fenster.",
                          child: {
                            nodeType: "Monolog",
                            title: "Anschlussadresse",
                            forwardText:
                              "Bitte nennen Sie uns Ihre Anschlussadresse, etc.",
                            child: {
                              nodeType: "DialogNode",
                              title: "Eingabe: Anschlussadresse",
                              question:
                                "Max Musterfrau     \nLingmusterweg 6     \n1234 Musterhausen",
                              answer:
                                "Möchten Sie das Ergebnis via Email erfahren?",
                              child: {
                                nodeType: "Divider",
                                childs: [
                                  {
                                    nodeType: "DividerBranch",
                                    selectionText: "Ja",
                                    child: {
                                      nodeType: "Monolog",
                                      title: "EmailAdresse",
                                      forwardText:
                                        "Bitte nennen Sie uns hierfür Ihre Email Adresse.",
                                      child: {
                                        nodeType: "DialogNode",
                                        title: "Eingabe: Email",
                                        question: "Max@Musterfrau.de",
                                        answer:
                                          "Wunderbar, wir leiten alles in die Wege und halten sie auf dem laufenden.",
                                        child: {
                                          nodeType: "Monolog",
                                          title: "Verabschiedung",
                                          forwardText:
                                            "Vielen Dank für Ihr Vertrauen und Ihr Interesse an ***** haben sie noch weitere Fragen oder Anliegen? (ggfs. Abschied)",
                                          child: null
                                        }
                                      }
                                    }
                                  },
                                  {
                                    nodeType: "DividerBranch",
                                    selectionText: "Nein",
                                    child: {
                                      nodeType: "Monolog",
                                      title: "Telefonnummer",
                                      forwardText:
                                        "Gerne kontaktieren wir Sie auch telefonisch. Bitte nennen Sie uns hierfür Ihre Telefonnummer.",
                                      child: {
                                        nodeType: "DialogNode",
                                        title: "Eingabe: Telefonnummer",
                                        question: "0431-1234567",
                                        answer:
                                          "Wunderbar, wir leiten alles in die Wege und halten sie auf dem laufenden.",
                                        child: {
                                          nodeType: "Link",
                                          title: "Verabschiedung",
                                          child: null
                                        }
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              },
              {
                nodeType: "DividerBranch",
                selectionText: "unsicher",
                child: {
                  nodeType: "Link",
                  title: "Erlaubnis nach Verfügbarkeit",
                  child: null
                }
              }
            ]
          }
        }
      },
      {
        nodeType: "DividerBranch",
        selectionText: "Störung",
        child: { nodeType: "Link", title: "BAUM: Störungsbaum", child: null }
      }
    ]
  }
};


let Bsp2 = {
  nodeType: "StartNode",
  title: "Tarifberatung",
  greeting:
    "xxx bietet ihnen verschiedene Produkte im Bereich Internet, Festnetz oder Mobilfunk - für was interessieren Sie sich?",
  child: {
    nodeType: "Divider",
    childs: [
      {
        nodeType: "DividerBranch",
        selectionText: "IP",
        child: {
          nodeType: "Monolog",
          title: "Internetanschluss",
          forwardText:
            "Benötigen Sie einen einfachen Internetanschluss oder möchten Sie mit Highspeed surfen?",
          child: {
            nodeType: "Divider",
            childs: [
              {
                nodeType: "DividerBranch",
                selectionText: "Einfach",
                child: {
                  nodeType: "Monolog",
                  title: "web basic",
                  forwardText: "",
                  child: {
                    nodeType: "Link",
                    title: "Unterlagen ohne Portierung",
                    child: null
                  }
                }
              },
              {
                nodeType: "DividerBranch",
                selectionText: "Gegenfrage",
                child: {
                  nodeType: "Monolog",
                  title: "Hilfestellung",
                  forwardText: "",
                  child: {
                    nodeType: "Monolog",
                    title: "Highspeed",
                    forwardText:
                      "Wir bieten grundsätzlich 100mbits. Sollten Sie eine schnellere Geschwindigkeit wünschen, gibt es diese nur in Verbindung mit einer Telefonflatrate. Wünschen sie dies? ",
                    child: {
                      nodeType: "Divider",
                      childs: [
                        {
                          nodeType: "DividerBranch",
                          selectionText: "Nein",
                          child: {
                            nodeType: "Monolog",
                            title: "web 100 (IP)",
                            forwardText: "",
                            child: {
                              nodeType: "Monolog",
                              title: "Unterlagen ohne Portierung",
                              forwardText: "",
                              child: {
                                nodeType: "Monolog",
                                title: "Erhalt der Unterlagen",
                                forwardText:
                                  "Wie möchten sie ihre Unterlagen von unserer Homepage erhalten oder dürfen wir sie Ihnen zuschicken?",
                                child: {
                                  nodeType: "Divider",
                                  childs: [
                                    {
                                      nodeType: "DividerBranch",
                                      selectionText: "Website",
                                      child: {
                                        nodeType: "Monolog",
                                        title: "Link zu Unterlagen",
                                        forwardText:
                                          "Unter diesem Link finden sie alle relevanten Unterlagen.",
                                        child: null
                                      }
                                    },
                                    {
                                      nodeType: "DividerBranch",
                                      selectionText: "Zuschicken",
                                      child: null
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        },
                        {
                          nodeType: "DividerBranch",
                          selectionText: "Ja",
                          child: {
                            nodeType: "Monolog",
                            title: "duo 250",
                            forwardText: "",
                            child: {
                              nodeType: "Monolog",
                              title: "Prüfung",
                              forwardText: "",
                              child: {
                                nodeType: "Link",
                                title: "BAUM: Verfügbarkeit",
                                child: null
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                nodeType: "DividerBranch",
                selectionText: "Highspeed",
                child: { nodeType: "Link", title: "Highspeed", child: null }
              }
            ]
          }
        }
      },
      {
        nodeType: "DividerBranch",
        selectionText: "Voice + IP",
        child: {
          nodeType: "Monolog",
          title: "Flatrate dt. Festnetz (V + IP)",
          forwardText:
            "Benötigen Sie zu ihrem Internet und Telefonanschluss auch eine Flatrate auf das deutsche Festnetz?",
          child: {
            nodeType: "Divider",
            childs: [
              {
                nodeType: "DividerBranch",
                selectionText: "Ja",
                child: {
                  nodeType: "Monolog",
                  title: "Duoflat",
                  forwardText: "",
                  child: {
                    nodeType: "Link",
                    title: "Rufnummer Mitnahme",
                    child: null
                  }
                }
              },
              {
                nodeType: "DividerBranch",
                selectionText: "Gegenfrage",
                child: {
                  nodeType: "Monolog",
                  title: "Hilfestellung",
                  forwardText: "",
                  child: {
                    nodeType: "Divider",
                    childs: [
                      {
                        nodeType: "DividerBranch",
                        selectionText: "Duoflat",
                        child: {
                          nodeType: "Link",
                          title: "Duoflat",
                          child: null
                        }
                      },
                      {
                        nodeType: "DividerBranch",
                        selectionText: "web 100",
                        child: {
                          nodeType: "Link",
                          title: "web 100",
                          child: null
                        }
                      }
                    ]
                  }
                }
              },
              {
                nodeType: "DividerBranch",
                selectionText: "Nein",
                child: {
                  nodeType: "Monolog",
                  title: "web 100 (V+IP)",
                  forwardText: "",
                  child: {
                    nodeType: "Monolog",
                    title: "Rufnummer Mitnahme",
                    forwardText:
                      "Möchten Sie ihre Momentane Rufnummer mitnehmen oder soll es schnell gehen?",
                    child: {
                      nodeType: "Divider",
                      childs: [
                        {
                          nodeType: "DividerBranch",
                          selectionText: "Schnell",
                          child: {
                            nodeType: "Link",
                            title: "Unterlagen ohne Portierung",
                            child: null
                          }
                        },
                        {
                          nodeType: "DividerBranch",
                          selectionText:
                            "Ich habe zurzeit keine eigene Rufnummer / Frage",
                          child: {
                            nodeType: "Link",
                            title: "Unterlagen ohne Portierung",
                            child: null
                          }
                        },
                        {
                          nodeType: "DividerBranch",
                          selectionText: "Rufnummer behalten",
                          child: {
                            nodeType: "Monolog",
                            title: "Kündigung",
                            forwardText: "Bereits gekündigt?",
                            child: {
                              nodeType: "Divider",
                              childs: [
                                {
                                  nodeType: "DividerBranch",
                                  selectionText: "Ja",
                                  child: {
                                    nodeType: "Monolog",
                                    title: "Beratung RRNP",
                                    forwardText: "7 Tage ohne Anschluss?",
                                    child: {
                                      nodeType: "Divider",
                                      childs: [
                                        {
                                          nodeType: "DividerBranch",
                                          selectionText: "Nein",
                                          child: {
                                            nodeType: "Monolog",
                                            title: "Vorabanschluss",
                                            forwardText:
                                              "Es entstehen ggf. doppelte Kosten.",
                                            child: {
                                              nodeType: "Divider",
                                              childs: [
                                                {
                                                  nodeType: "DividerBranch",
                                                  selectionText: "Ja",
                                                  child: {
                                                    nodeType: "Monolog",
                                                    title:
                                                      "Unterlagen + Portierungsformular",
                                                    forwardText:
                                                      "Ihre Angaben werden entsprechend in Ihrem Formular vorgemerkt.",
                                                    child: {
                                                      nodeType: "Link",
                                                      title:
                                                        "Erhalt der Unterlagen",
                                                      child: null
                                                    }
                                                  }
                                                },
                                                {
                                                  nodeType: "DividerBranch",
                                                  selectionText: "Nein",
                                                  child: {
                                                    nodeType: "Link",
                                                    title: "RRNP vermerken",
                                                    child: null
                                                  }
                                                }
                                              ]
                                            }
                                          }
                                        },
                                        {
                                          nodeType: "DividerBranch",
                                          selectionText: "Ja",
                                          child: {
                                            nodeType: "Monolog",
                                            title: "RRNP vermerken",
                                            forwardText:
                                              "RRNP wird auf Ihrem Antrag vermerkt. ",
                                            child: {
                                              nodeType: "Link",
                                              title:
                                                "Unterlagen + Portierungsformular",
                                              child: null
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  }
                                },
                                {
                                  nodeType: "DividerBranch",
                                  selectionText: "Nein",
                                  child: {
                                    nodeType: "Monolog",
                                    title: "Beratung Portierung",
                                    forwardText: "Wir kündigen für Sie.",
                                    child: {
                                      nodeType: "Link",
                                      title: "Unterlagen + Portierung",
                                      child: null
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
      },
      {
        nodeType: "DividerBranch",
        selectionText: "Voice",
        child: {
          nodeType: "Monolog",
          title: "Flatrate dt. Festnetz (V)",
          forwardText:
            "Benötigen Sie zu ihrem Telefonanschluss auch eine Flatrate auf das deutsche Festnetz?",
          child: {
            nodeType: "Divider",
            childs: [
              {
                nodeType: "DividerBranch",
                selectionText: "Ja",
                child: {
                  nodeType: "Monolog",
                  title: "Fonflat",
                  forwardText: "",
                  child: {
                    nodeType: "Link",
                    title: "Rufnummer Mitnahme",
                    child: null
                  }
                }
              },
              {
                nodeType: "DividerBranch",
                selectionText: "Gegenfrage",
                child: {
                  nodeType: "Monolog",
                  title: "Hilfestellung",
                  forwardText: "",
                  child: {
                    nodeType: "Divider",
                    childs: [
                      {
                        nodeType: "DividerBranch",
                        selectionText: "Fonflat",
                        child: {
                          nodeType: "Link",
                          title: "Fonflat",
                          child: null
                        }
                      },
                      {
                        nodeType: "DividerBranch",
                        selectionText: "Fon",
                        child: { nodeType: "Link", title: "Fon", child: null }
                      }
                    ]
                  }
                }
              },
              {
                nodeType: "DividerBranch",
                selectionText: "Nein",
                child: {
                  nodeType: "Monolog",
                  title: "Fon",
                  forwardText: "",
                  child: {
                    nodeType: "Link",
                    title: "Rufnummer Mitnahme",
                    child: null
                  }
                }
              }
            ]
          }
        }
      }
    ]
  }
};
