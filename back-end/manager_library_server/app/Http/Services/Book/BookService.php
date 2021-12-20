<?php

namespace App\Http\Services\Book;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Utilities\ResponseUtil as responseUtil;
use App\Models\Book;

class BookService
{

	public function doAddBook(Request $request)
	{


		// echo($request->file("linkImageBook"));
		// if($request->linkImageBook->isValid()){
		// 	error_log($request->linkImageBook->getClientOriginalName());
		// 	$path=$request->linkImageBook->path();
		// 	error_log($path);
		// }
		error_log($request->input("bookName"));
		error_log($request->input('linkImageBook'));
		$conditions = array(
			['bookId', '=', $request->input('bookId')],
			['bookName', '=', $request->input('bookName')]
		);
		$existsBook = DB::table('books')->where($conditions)->first();
		if ($existsBook) {
			return responseUtil::respondedBadRequest("pages.register.warning-messages.email-exist");
		}

		DB::beginTransaction();

		$newBook = new Book;
		try {

			// $newBook->bookId = $request->input('bookId');
			$newBook->bookName = $request->input('bookName');
			 $newBook->bookAuthor = $request->input('bookAuthor');
			 $newBook->bookCategory = $request->input('bookCategory');
			 $newBook->money = $request->input('money');
			 $newBook->numberOfBook = $request->input('numberOfBook');
			 $newBook->linkImageBook = $request->input('linkImageBook');
			 $newBook->publishingCompany = $request->input('publishingCompany');
			 $newBook->numberOfPage = $request->input('numberOfPage');
			 $newBook->mass = $request->input('mass');
			 $newBook->sizeOfBook = $request->input('sizeOfBook');
			 $newBook->dateOfPublishing = $request->input('dateOfPublishing');
			 $newBook->description = $request->input('description');
			$newBook->save();

		} catch (Exception $e) {
			DB::rollback();
			return responseUtil::respondedError("common.error-messages.common-server-error");
		}

		DB::commit();

		return responseUtil::respondedSuccess("pages.register.registration-success", $newBook);
	}

	public function doGetAllBook(){
		// $allBook=DB::table('Books')->select("*");
		$allBook=Book::all();
		return responseUtil::respondedSuccess("pages.get.getAllBook-success", $allBook);
	}

	public function doFindBook(Request $request){
		$allBook=DB::table('books')->where('bookName','LIKE','%'.$request->input('inforWantToFind').'%')
										->orwhere('bookAuthor','LIKE','%'.$request->input('inforWantToFind').'%')
										->orwhere('bookCategory','LIKE','%'.$request->input('inforWantToFind').'%')
										->orwhere('money','LIKE','%'.$request->input('inforWantToFind').'%')
										->orwhere('publishingCompany','LIKE','%'.$request->input('inforWantToFind').'%')
										->orwhere('mass','LIKE','%'.$request->input('inforWantToFind').'%')
										->orwhere('sizeOfBook','LIKE','%'.$request->input('inforWantToFind').'%')
										->orwhere('dateOfPublishing','LIKE','%'.$request->input('inforWantToFind').'%')
										->orwhere('description','LIKE','%'.$request->input('inforWantToFind').'%')->get();
										
		return responseUtil::respondedSuccess("pages.get.getAllAccount-success", $allBook);
	}

	public function doGetInforBook(Request $request){

		$conditions = array(
			'bookId' => $request->input('bookId'),
		);
		$existsBook = DB::table('Books')->where($conditions)->first();
		if ($existsBook) {
			return responseUtil::respondedSuccess("pages.getinfor.getInforUser-successfull",$existsBook);
		}else{
			return responseUtil::respondedNotFound("pages.getinfor.getInforUser-notfound");
		}
	}
	public function doUpdateBook(Request $request){
		$array = [
			'bookId' => $request->input('bookId'),
		];

		$updateArray = [
				 'bookName'=>$request->input('bookName'),
				 'bookAuthor'=>$request->input('bookAuthor'),
				 'bookCategory'=>$request->input('bookCategory'),
				 'money'=>$request->input('money'),
				 'numberOfBook'=>$request->input('numberOfBook'),
				 'linkImageBook'=>$request->input('linkImageBook'),
				 'publishingCompany'=>$request->input('publishingCompany'),
				 'numberOfPage'=>$request->input('numberOfPage'),
				 'mass'=>$request->input('mass'),
				 'sizeOfBook'=>$request->input('sizeOfBook'),
				 'dateOfPublishing'=>$request->input('dateOfPublishing'),
				 'description'=>$request->input('description')
		];
		$existsBook = DB::table('Books')->where($array)->first();
        if ($existsBook) {
			$conditions=['bookId'=>$existsBook->bookId];
            $BookUpdated=DB::table('Books')->where($conditions)->update($updateArray);
			return responseUtil::respondedSuccess("pages.updated-Book-success", $BookUpdated);
        }else{
            return responseUtil::respondedNotFound("cannot find this Book in database");
        }
	}

	public function doDeleteBook(Request $request){

		$array = [
			'bookId' => $request->input('bookId'),
		];

		$existsBook = DB::table('Books')->where($array)->first();

		// $idBookNeedDelete=$existsBook->bookId;

        if ($existsBook) {
			$conditions=['bookId'=>$existsBook->bookId];
            $BookUpdated=DB::table('Books')->where($conditions)->delete();

			return responseUtil::respondedSuccess("pages.changes-password-success", $BookUpdated);

        }else{
            return responseUtil::respondedNotFound("cannot find this Book in database");
        }
	}

}
