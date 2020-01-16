export let example1 = {
  title: "Beispiel 1",
  nodeList: [
    {
      id: "0",
      type: "startNode",
      title: "Example 1",
      childId: "2",
      parentId: "null",
      greeting:
        "Hallo ich bin der erste Beispielsbaum.. ich bin zwar nicht so spannend, aber durch mich kannst du viele tolle Eigenschaften von mir kennenlernen."
    },
    { id: "2", type: "dividerNode", title: "", parentId: "0" },
    {
      id: "3",
      type: "dividerBranch",
      selectiontext: "Kannst du Monologe?",
      parentId: "2",
      childId: "8"
    },
    {
      id: "4",
      type: "dividerBranch",
      selectiontext: "",
      parentId: "2",
      childId: "10"
    },
    {
      id: "6",
      type: "dividerBranch",
      selectiontext: "",
      parentId: "2",
      childId: "12"
    },
    {
      id: "8",
      type: "monolog",
      title: "Monolog",
      childId: "undefined",
      parentId: "3",
      forwardText:
        "Aber sicher kann ich Monologe darstellen.. ich könnte den ganzen Tag so vor mich hin monologieren.. :)"
    },
    {
      id: "10",
      type: "dialog",
      title: "",
      childId: "undefined",
      parentId: "4",
      question: "",
      answer: ""
    },
    {
      id: "12",
      type: "monolog",
      title: "",
      childId: "undefined",
      parentId: "6",
      forwardText: ""
    }
  ]
};
