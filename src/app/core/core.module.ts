import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  imports: [CommonModule],
})
export class CoreModule {
  /* make sure CoreModule is imported only by the AppModule and none else */
  constructor(@Optional() @SkipSelf() presentInParent: CoreModule) {
    if (presentInParent) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
