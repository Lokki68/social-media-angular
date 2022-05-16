import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CandidateService {
  private _candidate$ = new BehaviorSubject<Candidate[]>([]);

  constructor(private http: HttpClient) {}

  private _loading$ = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get candidates$(): Observable<Candidate[]> {
    return this._candidate$.asObservable();
  }

  getCandidatesFromServeur() {
    this.setLoadingStatus(true);
    this.http
      .get<Candidate[]>(`${environment.apiUrl}/candidates`)
      .pipe(
        delay(1000),
        tap((candidates) => {
          this.setLoadingStatus(false);
          this._candidate$.next(candidates);
        })
      )
      .subscribe();
  }

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }
}
