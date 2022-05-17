import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  delay,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CandidateService {
  private lastCandidatesLoad = 0;

  constructor(private http: HttpClient) {}

  private _candidates$ = new BehaviorSubject<Candidate[]>([]);

  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  private _loading$ = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  getCandidatesFromServeur() {
    if (Date.now() - this.lastCandidatesLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http
      .get<Candidate[]>(`${environment.apiUrl}/candidates`)
      .pipe(
        delay(1000),
        tap((candidates) => {
          this.lastCandidatesLoad = Date.now();
          this.setLoadingStatus(false);
          this._candidates$.next(candidates);
        })
      )
      .subscribe();
  }

  getCandidateById(Id: number): Observable<Candidate> {
    if (!this.lastCandidatesLoad) {
      this.getCandidatesFromServeur();
    }
    return this.candidates$.pipe(
      map(
        (candidates) => candidates.filter((candidate) => candidate.id === Id)[0]
      )
    );
  }

  refuseCandidate(id: number): void {
    this.setLoadingStatus(true);
    this.http
      .delete(`${environment.apiUrl}/candidates/:id`)
      .pipe(
        delay(1000),
        switchMap(() => this.candidates$),
        take(1),
        map((candidates) =>
          candidates.filter((candidate) => candidate.id !== id)
        ),
        tap((candidates) => {
          this._candidates$.next(candidates);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }
}
