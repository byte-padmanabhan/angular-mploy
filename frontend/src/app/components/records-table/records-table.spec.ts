import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsTable } from './records-table';

describe('RecordsTable', () => {
  let component: RecordsTable;
  let fixture: ComponentFixture<RecordsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
