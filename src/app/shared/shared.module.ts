import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingDirective } from './directives/loading.directive';

@NgModule({
  declarations: [LoadingDirective],
  imports: [CommonModule ],
  exports: [LoadingDirective],
})
export class SharedModule {}
