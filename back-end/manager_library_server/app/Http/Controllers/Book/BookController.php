<?php

namespace App\Http\Controllers\Book;

use App\Http\Services\Book\BookService;
use Illuminate\Http\Request;

use App\Http\Utilities\ResponseUtil as responseUtil;
use Illuminate\Routing\Controller as BaseController;

use App\Http\Utilities\ValidationUtil as validationUtil;

class BookController extends BaseController
{

	private $bookService;
	public function __construct(
		BookService $bookService
	) {
		$this->bookService = $bookService;
	}

    private $rulesMess = [
	];

    protected function doAddBook(Request $request){
		
		
		$rules = [
			// 'bookId' => 'required',
			'bookName'=>'required',
			//  'bookAuthor'=>'required',
			//  'bookCategory' => 'required',
			//  'money'=>'required',
			//  'numberOfBook' => 'required',
			'linkImageBook'=>'required',
			//  'publishingCompany' => 'required',
			//  'numberOfPage'=>'required',
			//  'mass' => 'required',
			//  'sizeOfBook'=>'required',
			//  'dateOfPublishing' => 'required',
			//  'description'=>'required',
		];
		
		
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		
		return $this->bookService->doAddBook($request);
	}

	protected function doGetInforBook(Request $request){
		
		
		$rules = [
			'bookId' => 'required',
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		
		return $this->bookService->doGetInforBook($request);
	}
	protected function doGetAllBook(){
		return $this->bookService->doGetAllBook();
	}
	
	protected function doUpdateBook(Request $request){
		$rules = [
			'bookId' => 'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		return $this->bookService->doUpdateBook($request);
	}

	
	protected function doDeleteBook(Request $request){
		$rules = [
			'bookId' => 'required'
		];
		$inValidRequestData = validationUtil::checkValidRequest($request, $rules, $this->rulesMess);
		if ($inValidRequestData->fails()) {
			return responseUtil::respondedBadRequest($inValidRequestData->errors()->first(), $inValidRequestData->errors());
		}
		return $this->bookService->doDeleteBook($request);
	}
}
