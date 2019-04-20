import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
