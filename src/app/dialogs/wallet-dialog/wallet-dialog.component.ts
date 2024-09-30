import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WalletRequest } from "../../model/request/wallet-request.model";
import { User } from "../../model/user.model";
import { WalletService } from "../../service/wallet.service";
import { SnackBarService } from "../../service/snackbar.service";

@Component({
    selector: 'wallet-dialog',
    templateUrl: 'wallet-dialog.component.html',
    styleUrl: './wallet-dialog.component.scss'
})
export class WalletDialog implements OnInit {
    
    loginFormGroup: FormGroup;
    loading: boolean = false;
    isDeposit: boolean;
    user: User | null;

    constructor(
        private formBuilder: FormBuilder,
        private walletService: WalletService,
        private snackBarService: SnackBarService
    ) {}
    
    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.loginFormGroup = this.formBuilder.group({
            amount: ['', Validators.required],
        }); 
    }

    get amount() {
        return this.loginFormGroup?.get('amount')!.value;
    }

    public submit() {
        this.loading = true;
        let walletRequest: WalletRequest = this.buildWalletRequest();

        if (this.isDeposit) {
            this.walletService.deposit(walletRequest).subscribe(response => {
                this.walletService.setCurrentAmount(response.amount);
                this.snackBarService.showSuccess('Successful money deposit.');
                this.loading = false;
            });
        } else {
            this.walletService.withdraw(walletRequest).subscribe(response => {
                this.walletService.setCurrentAmount(response.amount);
                this.snackBarService.showSuccess('Successful money withdrawal.');
                this.loading = false;
            });
        }
    }

    private buildWalletRequest(): WalletRequest {
        return {
            userId: this.user!.id,
            amount: this.amount
        }
    }
    
}