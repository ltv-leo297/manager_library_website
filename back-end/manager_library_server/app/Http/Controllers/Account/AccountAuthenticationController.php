<?php

namespace App\Http\Controllers\Account;

use Illuminate\Http\Request;

use App\Http\Utilities\ResponseUtil as responseUtil;
use Illuminate\Routing\Controller as BaseController;

use App\Http\Utilities\ValidationUtil as validationUtil;

use App\Http\Services\Account\AccountService as AccountService;

class AccountAuthenticationController extends BaseController
{
//    private $commonCtl;
	//use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	private $accountService;

	private $rulesMess = [
		'email.required' => 'common.validation.email-required',
		'email.email' => 'common.validation.email-format',
		'email.between' => 'common.validation.email-between',
		'password.required' => 'common.validation.password-required',
		'password.between' => 'common.validation.password-between',
		'accountId.required'=>'common.validation.accountId-required',
		'newPassword'=>'common.validation.newPassword-required'
	];

	public function __construct(
		AccountService $accountService
	) {
		$this->accountService = $accountService;
	}

	protected function doLogin(Request $request){

		$rules = [
			'email' => 'required|email|between:3,150',
			'password' => 'required|between:3,100'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}

		return $this->accountService->doLogin($request);
	}

	protected function doRegisterAccount(Request $request){
		// console.log("abcs");
		$rules = [

			'email' => 'required|email|between:3,150',
			'password' => 'required|between:3,100'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}

		return $this->accountService->doRegisterAccount($request);
	}
	protected function doGetInfor(Request $request){
		
		
		$rules = [
			'email' => 'required|email|between:3,150',
			'accountId'=>'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		
		return $this->accountService->doGetInfor($request);
	}
	
	protected function doGetAllAccount(Request $request){
		return $this->accountService->doGetAllAccount($request);
	}
	protected function doFindAccount(Request $request){
		
		return $this->accountService->doFindAccount($request);
	}
	
	protected function doUpdateAccount(Request $request){
		$rules = [
			'email' => 'required|email|between:3,150',
			'accountId'=>'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		return $this->accountService->doUpdateAccount($request);
	}

	
	protected function doDeleteAccount(Request $request){
		$rules = [
			'email' => 'required|email|between:3,150',
			'accountId'=>'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		return $this->accountService->doDeleteAccount($request);
	}
	
	protected function doChangePassword(Request $request){
		
		
		$rules = [
			'email' => 'required|email|between:3,150',
			'password' => 'required|between:3,100',
			'accountId'=>'required',
			'newPassword'=>'required|between:3,100'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		
		return $this->accountService->doChangePassword($request);
	}
}
