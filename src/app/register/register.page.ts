import {Component, OnInit} from '@angular/core';
import {catchError, finalize, first, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {of} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingService} from '../services/loading/loading.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.sass'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;
    successMessage: string = '';
    errorMessage: string = '';
    readonly validationMessages = {
        email: [],
        password: []
    };

    constructor(private auth: AuthService,
                private loadingService: LoadingService,
                private router: Router) {
    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    tryRegister(value): void {
        this.loadingService.presentLoading('Registering...').then(() => this.continueRegister(value));

    }

    private continueRegister(value): void {
        this.auth.register(value.email, value.password).pipe(
            catchError(err => {
                console.log(err);
                return of();
            }),
            switchMap(() => this.auth.sendVerificationEmail()),
            first(),
            finalize(() => this.loadingService.cancelLoading())
        ).subscribe(res => {
            this.router.navigateByUrl('activate-account');
        });
    }

}
