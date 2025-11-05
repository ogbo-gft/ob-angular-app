import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
// other imports

@NgModule({
  declarations: [
    // other components
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    // other modules
  ],
  providers: [],
  // Note: App is a standalone component and should be bootstrapped with bootstrapApplication in main.ts
})
export class AppModule {}
