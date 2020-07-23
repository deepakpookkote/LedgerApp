import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  allTab =  true;
  spendsTab = false;
  receivedTab = false;

  amount: number;
  reason = '';

  totalAmount = 1000;
  currentDate = new Date();

  ledgerInfo: any = [];
  spendInformation: any = [];
  creditInformation: any = [];


  switchTabs(currentTab: string) {
    if(!this.ledgerInfo.length) return;
    if (currentTab === 'all') {
        this.allTab = true;
        this.spendsTab = false;
        this.receivedTab = false;
    } else if (currentTab === 'spend') {
        this.spendsTab = true;
        this.receivedTab = false;
        this.allTab = false;
        this.findSpends();
    } else {
        this.receivedTab = true;
        this.allTab = false;
        this.spendsTab = false;
        this.findCredits();
    }
  }

  findSpends() {
    this.spendInformation = this.ledgerInfo.slice().filter((item) => {
      return item.type === 'debit';
    });
  }


  findCredits() {
    this.creditInformation = this.ledgerInfo.slice().filter((item) => {
      return item.type === 'credit';
    });
  }


  debitAmount() {
    if(this.totalAmount === 0 || this.amount > this.totalAmount) return;
    const debitedTotal = Number(this.totalAmount) - Number(this.amount);
    const debitInfo = {
      'amount': this.amount,
      'reason': this.reason,
      'type': 'debit',
      'date': new Date(),
      'balance': debitedTotal
    };
    this.ledgerInfo.push(debitInfo);
    this.totalAmount =  debitedTotal;
  }

  creditAmount() {
    const creditedTotal = Number(this.totalAmount) + Number(this.amount);
    const debitInfo = {
      'amount': this.amount,
      'reason': this.reason,
      'type': 'credit',
      'date': new Date(),
      'balance': creditedTotal
    };
    this.ledgerInfo.push(debitInfo);
    this.totalAmount =  creditedTotal;
  }

}
