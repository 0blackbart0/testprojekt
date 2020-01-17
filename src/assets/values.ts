export enum NodeType {
  MENU = "menu",
  DIALOG = "dialog",
  MONOLOG = "monolog",
  STARTNODE = "startNode",
  DIVIDERNODE = "dividerNode",
  BASICNODE = "basicNode",
  DIVIDERBRANCH = "dividerBranch",
  LINK = "link"
}

export enum PlaceHolder {
  TITLE = "Titel",
  LINKTITLE = "Verlinkung",
  GREETING = "Hallo ich bin Bot MultOS, wie kann ich dir zu Diensten sein?",
  SELECTIONTEXT = "Auswahltext",
  QUESTION = "Frage",
  ANSWER = "Antwort",
  FORWARDTEXT = "Ich leite sie gerne weiter"
}

export enum NodeSizes {

  BASICSCALEBALANCE = 0,

  STARTNODETOP = 2,
  BASEMARGIN = 0,
  BASELEFT = 0,

  BASICNODEWIDTH = 36,

  STARTNODEHEIGHT = 30,
  STARTNODELEFT = 60,

  DIVIDERNODEHEIGHT = 15,

  MENUHEIGHT = 13,

  DIALOGHEIGHT = 55,

  MONOLOGHEIGHT = 35,

  LINKHEIGHT = 20
}

export enum MenuType {
  BRANCHLEAF = 'branchLeaf',
  BRANCHWITHCHILD = 'branchWithChild',
  STARTNODELEAF = 'startNodeLeaf',
  STARTNODEWITHCHILD = 'startNodeWithChild',
  STARTNODEWITHCHILDDIVIDER = 'startNodeWithChildDivider',
  BASICNODEWITHCHILD = 'basicNodeWithChild',
  BASICNODEWITHCHILDDIVIDER = 'basicNodeWithChildDivider',
  BASICNODELEAF = 'basicNodeLeaf'


}
