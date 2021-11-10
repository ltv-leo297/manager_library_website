<?php

namespace App\Http\Services\Account;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Utilities\ResponseUtil as responseUtil;
use App\Models\Account;

class AccountService
{

	public function doRegisterAccount(Request $request)
	{

		$conditions = array(
			['email', '=', $request->input('email')]
		);
		$existsAccount = DB::table('accounts')->where($conditions)->first();
		if ($existsAccount) {
			return responseUtil::respondedBadRequest("pages.register.warning-messages.email-exist");
		}

		DB::beginTransaction();

		$newAccount = new Account;
		try {

			$newAccount->email = $request->input('email');
			$newAccount->password = Hash::make($request->input('password'));
			$newAccount->name = $request->input('name');
			$newAccount->dateOfBird = $request->input('dateOfBird');
			$newAccount->gender = $request->input('gender');
			$newAccount->role = '1';
			$newAccount->save();
			
		} catch (Exception $e) {
			DB::rollback();
			return responseUtil::respondedError("common.error-messages.common-server-error");
		}

		DB::commit();
		
		return responseUtil::respondedSuccess("pages.register.registration-success", $newAccount);
	}
    
	public function doLogin(Request $request){
		$array = ['email'=>$request->input('email'),
					'password'=>$request->input('password')];
		echo($account=auth()->user());
        if (auth()->attempt($array)) {
            $account=auth()->user();
			
			$respondedResult = [
				"Account" => $account,
			];
			return responseUtil::respondedSuccess("pages.login.login-success", $respondedResult);

        }else{
            return responseUtil::respondedNotFound("cannot find this account in database");
        }
     
    }
	public function getInfor(){
		$account = auth()->user();
		 return responseUtil::respondedSuccess("pages.login.login-success", $account);

	}
}
