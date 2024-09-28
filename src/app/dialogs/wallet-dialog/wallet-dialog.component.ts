import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WalletRequest } from "../../model/wallet-request.model";

@Component({
    selector: 'wallet-dialog',
    templateUrl: 'wallet-dialog.component.html',
    styleUrl: './wallet-dialog.component.scss'
})
export class WalletDialog implements OnInit {
    
    loginFormGroup: FormGroup;
    loading: boolean = false;
    isDeposit: boolean;

    constructor(
        private formBuilder: FormBuilder,
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
    }

    private buildWalletRequest(): WalletRequest {
        return {
            amount: this.amount
        }
    }
    
}