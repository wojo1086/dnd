import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPlayersPage } from './add-players.page';

describe('AddPlayersPage', () => {
  let component: AddPlayersPage;
  let fixture: ComponentFixture<AddPlayersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
