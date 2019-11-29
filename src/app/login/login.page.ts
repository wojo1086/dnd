import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, finalize, first} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';
import {ErrorHandler} from '../classes/error-handler';
import {AuthService} from '../services/auth/auth.service';
import {LoadingService} from '../services/loading/loading.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.sass'],
})
export class LoginPage extends ErrorHandler implements OnInit {
    loginForm: FormGroup;
    successMessage: string = '';
    errorMessage: string = '';
    readonly validationMessages = {
        email: [],
        password: []
    };

    constructor(public toastController: ToastController,
                private loadingService: LoadingService,
                private auth: AuthService,
                private router: Router) {
        super(toastController);
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }


    tryLogin(value): void {
        this.loadingService.presentLoading('Logging in...').then(() => this.continueLogin(value));
    }

    private continueLogin(value): void {
        this.auth.login(value.email, value.password).pipe(
            catchError((err) => super.handleError(err)),
            first(),
            finalize(() => this.loadingService.cancelLoading())
        ).subscribe(res => {
            console.log(res);
            if (res) {
                if (!res.user.emailVerified) {
                    this.auth.sendVerificationEmail().pipe(first()).subscribe(() => this.router.navigateByUrl('activate-account'));
                } else {
                    this.router.navigateByUrl('secure/home');
                }
            }
        });
    }

}
