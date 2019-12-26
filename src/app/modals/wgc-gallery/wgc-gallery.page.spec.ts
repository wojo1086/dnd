import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WgcGalleryPage } from './wgc-gallery.page';

describe('WgcGalleryPage', () => {
  let component: WgcGalleryPage;
  let fixture: ComponentFixture<WgcGalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WgcGalleryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WgcGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
