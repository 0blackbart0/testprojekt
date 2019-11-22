import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-node',
  templateUrl: './start-node.component.html',
  styleUrls: ['./start-node.component.css']
})
export class StartNodeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openEditor() {
    const selectedBubble: HTMLElement = document.getElementById('bubble');
    const selectedText: HTMLElement = document.getElementById('chatbotText');
    selectedBubble.style.backgroundColor = '#DD0B2F';
    selectedText.style.color = 'white';

  }

}
