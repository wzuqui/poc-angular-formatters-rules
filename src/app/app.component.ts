/* eslint-disable sort-imports */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import type { User } from 'microsoft-graph';
import { filter, Subject, takeUntil } from 'rxjs';

import { xMenu as Menu } from './menu';

interface IAba {
  id: string;
  titulo: string;
  icone: string;
  fixo?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public usuario?: { nome: string; email: string; foto: string; unidade: string };
  protected abas: IAba[] = [{ id: 'tela-inicial', titulo: 'Tela inicial', icone: '🏠', fixo: true }];
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private _route: Router,
    private _authService: MsalService,
    private _httpClient: HttpClient,
    private _msalBroadcastService: MsalBroadcastService,
  ) {
    this._route.events.subscribe(pEvento => {
      if (pEvento instanceof NavigationEnd) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, xRota] = pEvento.url.split('/');
        const xExiste = this.abas.find(p => p.id === xRota);
        if (!xExiste) {
          const xMenu = Menu.find(p => p.id == xRota);
          if (xMenu) {
            this.abas.push({
              id: xMenu.id,
              icone: xMenu.icone,
              titulo: xMenu.titulo,
            });
          }
        }
      }
    });
  }

  public acaoMenu(pEvento: { itemData: { name: string } }): void {
    this._route.navigate([pEvento.itemData.name]);
  }

  public acaoMenuFechar(pId: string): void {
    event?.stopPropagation();
    const xIndice = this.abas.findIndex(p => p.id === pId);
    if (xIndice > -1) {
      this.abas.splice(xIndice, 1);
      setTimeout(() => {
        const xAba = this.abas[xIndice - 1] ?? this.abas[0];
        console.log(xAba);
        this._route.navigate([xAba.id]);
      }, 10);
    }
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
