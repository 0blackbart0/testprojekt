export let example1 = {
  title: "Beispiel 1",
  nodeList: [
    {
      id: "0",
      type: "startNode",
      title: "titeeeeel",
      childId: "2",
      parentId: "null",
      greeting: "qw"
    },
    { id: "2", type: "dividerNode", title: "", parentId: "0" },
    {
      id: "3",
      type: "dividerBranch",
      selectionText: "test",
      parentId: "2",
      childId: "undefined"
    },
    {
      id: "4",
      type: "dividerBranch",
      selectionText: "test1",
      parentId: "2",
      childId: "undefined"
    }
  ]
};
