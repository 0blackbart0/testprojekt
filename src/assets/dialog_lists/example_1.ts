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
    { id: "2", type: "dividerNode", title: "", parentId: "1" },
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
    { id: "30", type: "link", title: "Verabschiedung", parentId: "24" },
  ]
};
