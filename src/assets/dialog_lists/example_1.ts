export let example1 = {
  title: "Beispiel 1",
  nodeList: [
    {
      id: "1",
      type: "startNode",
      title: "Example 1",
      childId: "2",
      parentId: "null",
      greeting:
        "Hallo ich bin der erste Beispielsbaum.. ich bin zwar nicht so spannend, aber durch mich kannst du viele tolle Eigenschaften von mir kennenlernen."
    },
    { id: "2", type: "dividerNode", title: "", parentId: "1" },
    {
      id: "3",
      type: "dividerBranch",
      selectiontext: "undefined",
      parentId: "2",
      childId: "4"
    },
    {
      id: "4",
      type: "monolog",
      title: "Monolog",
      childId: "undefined",
      parentId: "3",
      forwardText:
        "Aber sicher kann ich Monologe darstellen.. ich könnte den ganzen Tag so vor mich hin monologieren.. :)"
    },
    {
      id: "5",
      type: "dividerBranch",
      selectiontext: "undefined",
      parentId: "2",
      childId: "6"
    },
    {
      id: "6",
      type: "dialog",
      title: "",
      childId: "undefined",
      parentId: "5",
      question: "",
      answer: ""
    },
    {
      id: "7",
      type: "dividerBranch",
      selectiontext: "undefined",
      parentId: "2",
      childId: "8"
    },
    {
      id: "8",
      type: "monolog",
      title: "",
      childId: "12",
      parentId: "7",
      forwardText: ""
    },
    {
      id: "10",
      type: "monolog",
      title: "",
      childId: "undefined",
      parentId: "13",
      forwardText: ""
    },
    { id: "12", type: "dividerNode", title: "", parentId: "8" },
    {
      id: "13",
      type: "dividerBranch",
      selectiontext: "",
      parentId: "12",
      childId: "10"
    },
    {
      id: "14",
      type: "dividerBranch",
      selectiontext: "",
      parentId: "12",
      childId: "undefined"
    },
    {
      id: "15",
      type: "dividerBranch",
      selectiontext: "",
      parentId: "12",
      childId: "undefined"
    }
  ]
};
