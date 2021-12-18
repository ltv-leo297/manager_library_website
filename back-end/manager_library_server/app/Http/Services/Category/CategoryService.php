<?php

namespace App\Http\Services\Category;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Utilities\ResponseUtil as responseUtil;
use App\Models\Category;

class CategoryService
{

	public function doAddCategory(Request $request)
	{

		$conditions = array(
			// ['categoryId', '=', $request->input('categoryId')],
			['categoryName', '=', $request->input('categoryName')]
			
		);
		$existsCategory = DB::table('categories')->where($conditions)->first();
		if ($existsCategory) {
			return responseUtil::respondedBadRequest("pages.register.warning-messages.email-exist");
		}

		DB::beginTransaction();

		$newCategory = new Category;
		try {

			// $newCategory->categoryId = $request->input('categoryId');
			$newCategory->categoryName = $request->input('categoryName');
			$newCategory->description = $request->input('description');
			$newCategory->save();
			
		} catch (Exception $e) {
			DB::rollback();
			return responseUtil::respondedError("common.error-messages.common-server-error");
		}

		DB::commit();
		
		return responseUtil::respondedSuccess("pages.register.registration-success", $newCategory);
	}
    
	public function doGetAllCategory(){	
		$allCategory=Category::all();
		return responseUtil::respondedSuccess("pages.get.getAllCategory-success", $allCategory);
	}

	public function doFindCategory(Request $request){	
		$allCategory=DB::table('categories')->where('categoryName','LIKE','%'.$request->input('inforWantToFind'.'%'))
										->where('description','LIKE','%'.$request->input('inforWantToFind'.'%'));
										
										
		return responseUtil::respondedSuccess("pages.get.getAllAccount-success", $allCategory);
	}

	public function doUpdatecategory(Request $request){
		$array = [
			'categoryName' => $request->input('categoryName'),
		];

		$updateArray = [
				 //'categoryId'=>$request->input('categoryId'),
				 'categoryName'=>$request->input('categoryName'),
				 'description'=>$request->input('description')
		];

		$existsCategory = DB::table('categorys')->where($array)->first();

        if ($existsCategory) {
			$conditions=['categoryId'=>$existsCategory->categoryId];
            $categoryUpdated=DB::table('categorys')->where($conditions)->update($updateArray);
			
			return responseUtil::respondedSuccess("pages.updated-category-success", $categoryUpdated);

        }else{
            return responseUtil::respondedNotFound("cannot find this category in database");
        }
	}

	public function doDeletecategory(Request $request){
		
		$array = ['categoryId' => $request->input('categoryId'),];

		$existsCategory = DB::table('categorys')->where($array)->first();

		$idCategoryNeedDelete=$existsCategory->categoryId;

        if ($existsCategory) {
			$conditions=['categoryId'=>$existsCategory->categoryId];
            $categoryUpdated=DB::table('categorys')->where($conditions)->delete($idCategoryNeedDelete);
			
			return responseUtil::respondedSuccess("pages.changes-password-success", $categoryUpdated);

        }else{
            return responseUtil::respondedNotFound("cannot find this category in database");
        }
	}

}
