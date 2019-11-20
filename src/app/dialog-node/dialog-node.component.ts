import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-node',
  templateUrl: './dialog-node.component.html',
  styleUrls: ['./dialog-node.component.css']
})
export class DialogNodeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openUserEditor(){
    const selectedBubble: HTMLElement = document.getElementById('userBubble');
    const selectedText: HTMLElement = document.getElementById('userText');
    selectedBubble.style.backgroundColor = '#DD0B2F';
    selectedText.style.color = 'white';
  }

  openChatbotEditor(){
    const selectedBubble: HTMLElement = document.getElementById('chatbotBubble');
    const selectedText: HTMLElement = document.getElementById('chatbotTextDialogNode');
    selectedBubble.style.backgroundColor = '#DD0B2F';
    selectedText.style.color = 'white';
  }
}
