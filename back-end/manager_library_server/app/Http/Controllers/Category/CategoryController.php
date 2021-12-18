<?php

namespace App\Http\Controllers\Category;

use App\Http\Services\Category\CategoryService;
use Illuminate\Http\Request;

use App\Http\Utilities\ResponseUtil as responseUtil;
use Illuminate\Routing\Controller as BaseController;

use App\Http\Utilities\ValidationUtil as validationUtil;

class categoryController extends BaseController
{

	private $categoryService;
	public function __construct(
		categoryService $categoryService
	) {
		$this->categoryService = $categoryService;
	}

    private $rulesMess = [
	];

    protected function doAddcategory(Request $request){
		
		
		$rules = [
			// 'categoryId' => 'required',
			'categoryName'=>'required',
			'description'=>'required',
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		
		return $this->categoryService->doAddcategory($request);
	}

    protected function doGetAllCategory(){
		return $this->categoryService->doGetAllCategory();
	}
	
	protected function doFindCategory(Request $request){
		
		return $this->categoryService->doFindCategory($request);
	}
	protected function doUpdateCategory(Request $request){
		$rules = [
			'categoryId' => 'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		return $this->categoryService->doUpdateCategory($request);
	}

	
	protected function doDeletecategory(Request $request){
		$rules = [
			'categoryId' => 'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		return $this->categoryService->doDeleteCategory($request);
	}
}
