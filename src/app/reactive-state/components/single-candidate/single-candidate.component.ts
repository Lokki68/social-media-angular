import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(
    private candidatesService: CandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initObservables();
    this.candidate$ = this.route.params.pipe(
      switchMap((params) =>
        this.candidatesService.getCandidateById(+params['id'])
      )
    );
  }

  onHire() {
    this.candidate$
      .pipe(
        take(1),
        tap((candidate) => {
          this.candidatesService.hireCandidate(candidate.id);
          this.onGoBack();
        })
      )
      .subscribe();
  }

  onRefuse() {
    this.candidate$
      .pipe(
        take(1),
        tap((candidate) => {
          this.candidatesService.refuseCandidate(candidate.id);
          this.onGoBack();
        })
      )
      .subscribe();
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
  }
}
