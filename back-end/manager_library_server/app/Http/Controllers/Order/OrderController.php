<?php

namespace App\Http\Controllers\Order;

use App\Http\Services\Order\OrderService;
use Illuminate\Http\Request;

use App\Http\Utilities\ResponseUtil as responseUtil;
use Illuminate\Routing\Controller as BaseController;

use App\Http\Utilities\ValidationUtil as validationUtil;

class OrderController extends BaseController
{

	private $orderService;
	public function __construct(
		OrderService $orderService
	) {
		$this->orderService = $orderService;
	}

    private $rulesMess = [
	];

    protected function doAddOrder(Request $request){
		
		
		$rules = [
			
			// 'dateOfOrder'=>'required',
			'moneyOfOrder'=>'required',
            'totalNumberOfBook'=>'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		
		return $this->orderService->doAddOrder($request);
	}

    protected function doGetAllOrder(){
		return $this->orderService->doGetAllOrder();
	}
	
	protected function doFindOrder(Request $request){
		
		return $this->orderService->doFindOrder($request);
	}
	public function doGetInfor(Request $request){
		$rules = [
			'orderId' => 'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		return $this->orderService->doGetInfor($request);

	}
	
	protected function doDeleteOrder(Request $request){
		$rules = [
			'orderId' => 'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		return $this->orderService->doDeleteOrder($request);
	}
}
