/* eslint-disable sort-imports */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';

import type { User } from 'microsoft-graph';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public usuario?: { nome: string; email: string; foto: string; unidade: string };
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private _route: Router,
    private _authService: MsalService,
    private _httpClient: HttpClient,
    private _msalBroadcastService: MsalBroadcastService,
  ) {}

  public acaoMenu(pEvento: { itemData: { name: string } }): void {
    this._route.navigate([pEvento.itemData.name]);
  }

  public acaoSair(): void {
    this._authService.logout();
  }

  public ngOnInit(): void {
    this._msalBroadcastService.inProgress$
      .pipe(
        filter((pInteractionStatus: InteractionStatus) => pInteractionStatus === InteractionStatus.None),
        takeUntil(this._destroying$),
      )
      .subscribe(() => {
        const xAccounts = this._authService.instance.getAllAccounts();
        let xEstaLogado = false;
        if (xAccounts) {
          xEstaLogado = xAccounts.length > 0;
        }
        if (xEstaLogado) {
          const [xAccount] = xAccounts;
          this._httpClient
            .get('https://graph.microsoft.com/v1.0/me/photos/48x48/$value', {
              headers: { 'Content-Type': 'image/*' },
              responseType: 'arraybuffer',
            })
            .subscribe(pData => {
              const xBase64 = btoa(String.fromCharCode(...new Uint8Array(pData)));

              this._httpClient.get('https://graph.microsoft.com/v1.0/me').subscribe((pUser: User) => {
                this.usuario = {
                  nome: `${pUser.displayName}`,
                  email: `${pUser.mail}`,
                  foto: `data:image/*;base64,${xBase64}`,
                  unidade: `${xAccount.homeAccountId}`,
                };
              });
            });
        }
      });
  }
}
