import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LoginModule} from './core/login/login.module';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import { AuthAdminGuard } from './auth.guard';
import {AuthUserGuard} from './authUser.guard';
import { ImagesByProductComponent } from './core/images/images-by-product/images-by-product.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MenuTreeModule } from './elements_of_page/menu-tree/menu-tree.module';

@NgModule({
  declarations: [
    AppComponent,
    ImagesByProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatExpansionModule,
    MenuTreeModule
  ],
  providers: [
    AuthAdminGuard,
    AuthUserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
