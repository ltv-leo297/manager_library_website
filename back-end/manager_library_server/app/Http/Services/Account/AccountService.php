<?php

namespace App\Http\Services\Account;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Utilities\ResponseUtil as responseUtil;
use App\Models\Account;
use App\Models\Role;

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
				"account" => $account,
			];
			return responseUtil::respondedSuccess("pages.login.login-success", $respondedResult);

        }else{
            return responseUtil::respondedNotFound("cannot find this account in database");
        }

    }

	public function doGetAllAccount(){
        $allAccount=Account::all();
		return responseUtil::respondedSuccess("pages.get.getAllAccount-success", $allAccount);
	}

	public function doFindAccount(Request $request){

		$allAccount=DB::table('accounts')->where('email','LIKE','%'.$request->input('inforWantToFind').'%')
										->orWhere('name','LIKE','%'.$request->input('inforWantToFind').'%')
										->orWhere('dateOfBird','LIKE','%'.$request->input('inforWantToFind').'%')
										->orWhere('gender','LIKE','%'.$request->input('inforWantToFind').'%')
										->orWhere('role','LIKE','%'.$request->input('inforWantToFind').'%')
										->get();

		return responseUtil::respondedSuccess("pages.get.getAllAccount-success", $allAccount);
	}

	public function doGetInfor(Request $request){
		$conditions = array(
			['email' => $request->input('email')],
			['accountId' => $request->input('accountId')],

		);
		$existsAccount = DB::table('Accounts')->where($conditions)->first();
		if ($existsAccount) {
			return responseUtil::respondedSuccess("pages.getinfor.getInforUser-successfull",$existsAccount);
		}else{
			return responseUtil::respondedNotFound("pages.getinfor.getInforUser-notfound");
		}

	}
	public function doChangePassword(Request $request){
		$conditions = array(
			['email' => $request->input('email')],
			['accountId' => $request->input('accountId')],
		);


		$existsAccount = DB::table('Accounts')->where($conditions)->first();
		if ($existsAccount) {
			$changePassword=array(['password'=>Hash::make($request->input('newPassword'))]);

			DB::table('Accounts')->where($conditions)->update($changePassword);
			return responseUtil::respondedSuccess("pages.change.password.changePassword-successfull",$existsAccount);
		}else{
			return responseUtil::respondedNotFound("pages.account-notfound");
		}

	}


	// Update của Vinh
/* 	public function doUpdateAccount(Request $request){
		$conditions = array(
			['email' => $request->input('email')],
			['accountId' => $request->input('accountId')],
		);
		$existsAccount = DB::table('Accounts')->where($conditions)->first();
		if ($existsAccount) {
			$changePassword=array(['password'=>Hash::make($request->input('newPassword'))]);
			DB::table('Accounts')->where($conditions)->update($changePassword);
			return responseUtil::respondedSuccess("pages.change.password.changePassword-successfull",$existsAccount);
		}else{
			return responseUtil::respondedNotFound("pages.account-notfound");
		}
	} */

    // Update của Khoa
    public function doUpdateAccount(Request $request){
        $conditions = [
			'accountId'=>$request->input('accountId')
		];

        $existsAccount = DB::table('accounts')->where($conditions)->first();
		
        if ($request->input('email')){
            $emailUpdate= Hash::make($request->input('password'));
        }else{
            $emailUpdate=$existsAccount->email;
        }

        if ($request->input('password')){
            $passwordUpdate=$request->input('password');
        }else{
            $passwordUpdate=$existsAccount->password;
        }

        if ($request->input('role')){
            $roleUpdate=$request->input('role');
        }else{
            $roleUpdate=$existsAccount->role;
        }


        $updateArray =
        [
				 'name'=>$request->input('name'),
				 'email'=>$emailUpdate,
                 'password'=>$passwordUpdate,
				 'gender'=>$request->input('gender'),
				 'dateOfBird'=>$request->input('dateOfBird'),
				 'role'=>$roleUpdate
		];


        if ($existsAccount) {
            $updateAccount=DB::table('accounts')->where($conditions)->update($updateArray);
			return responseUtil::respondedSuccess("pages.updated-account-success", $updateAccount);
        }else{
            return responseUtil::respondedNotFound("cannot find this account in database");
        }
	}
	public function doDeleteAccount(Request $request){
		$array = [
			'accountId' => $request->input('accountId'),
		];
		$existsAccount = DB::table('accounts')->where($array)->first();
        if ($existsAccount) {
			$conditions=['accountId'=>$existsAccount->accountId];
            $AccountUpdated=DB::table('accounts')->where($conditions)->delete();
			return responseUtil::respondedSuccess("pages.delete-success", $AccountUpdated);
        }else{
            return responseUtil::respondedNotFound("cannot find this Account in database");
        }
	}

    public function doGetRoleForAccount(){
        $allRole=Role::all();
		return responseUtil::respondedSuccess("pages.get.getRoleForUser-success", $allRole);
	}

    public function doAddAccount(Request $request) {
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
            $newAccount->name = $request->input('name');
			$newAccount->email = $request->input('email');
			$newAccount->password = Hash::make($request->input('password'));
            $newAccount->gender = $request->input('gender');
			$newAccount->dateOfBird = $request->input('dateOfBird');
			$newAccount->role = $request->input('role');
			$newAccount->save();
		} catch (Exception $e) {
			DB::rollback();
			return responseUtil::respondedError("common.error-messages.common-server-error");
		}
		DB::commit();
		return responseUtil::respondedSuccess("add-success", $newAccount);
    }
}
