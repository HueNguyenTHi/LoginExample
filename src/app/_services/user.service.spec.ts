import { TestBed, getTestBed  } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@environments/environment';
import { User } from '@app/_models';



describe('UserService', () => {

  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Test_case_1_getAll', () => {
    const expectedUsers: User[] =
      [{ id: 1, username: 'A_B', password: '123456', firstName: 'A', lastName: 'B', token: 'abcde1234' },
       { id: 2, username: 'C_D', password: '123456', firstName: 'C', lastName: 'D', token: 'abcde5678' },];
  
       service.getAll().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(expectedUsers);
      });
  
      const req = httpMock.expectOne(`${environment.apiUrl}/users`);
      expect(req.request.method).toBe("GET");
      req.flush(expectedUsers);
  });
});
