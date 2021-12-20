<?php

namespace App\Http\Services\Order;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Utilities\ResponseUtil as responseUtil;
use App\Models\Order;
use App\Models\OrderDetails;

class OrderService
{

	public function doAddOrder(Request $request)
	{


		DB::beginTransaction();

		$newOrder = new Order;
        $newOrderDetail = new OrderDetails;
        $arrayBookBought = $request->input('arrayBookBought');
		error_log($request->dateOfOrder);
		try {

			// $newOrder->OrderId = $request->input('OrderId');
			$newOrder->moneyOfOrder = $request->input('moneyOfOrder');
			// $newOrder->dateOfOrder = $request->input('dateOfOrder');
            $newOrder->nameUser = $request->input('nameUser');
			$newOrder->addressUser = $request->input('addressUser');
			$newOrder->countryUser = $request->input('countryUser');
			$newOrder->nationalUser = $request->input('nationalUser');
			$newOrder->phoneNumberUser = $request->input('phoneNumberUser');
			$newOrder->emailUser = $request->input('emailUser');
			$newOrder->descriptionOrder = $request->input('descriptionOrder');

            $newOrder->save();
			if ($arrayBookBought){
				foreach ($arrayBookBought as $elementInArray) {
					$book=(object)$elementInArray;
					$newOrderDetail->orderId=$newOrder->orderId;

					$totalMoneyOfOrderDetail=$book->numberBookWantToBuy*$book->price;
	
					$newOrderDetail->moneyOfOrderDetail=$totalMoneyOfOrderDetail;
					$newOrderDetail->bookId=$book->id;;
					$newOrderDetail->numberOfBook=$book->numberBookWantToBuy;
					// $newOrderDetail->dateOfOrder= $request->input('dateOfOrder');
					$newOrderDetail->save();
				}
				
				
				
			}else{
				error_log("ko ton tai arr");
			}
            
            
			
		} catch (Exception $e) {
			DB::rollback();
			return responseUtil::respondedError("common.error-messages.common-server-error");
		}

		DB::commit();
		
		return responseUtil::respondedSuccess("pages.register.registration-success");
	}
    
	public function doGetAllOrder(){	
		$allOrder=Order::all();
		return responseUtil::respondedSuccess("pages.get.getAllOrder-success", $allOrder);
	}

	public function doFindOrder(Request $request){	
		$allOrder=DB::table('orders')->where('orderId','LIKE','%'.$request->input('inforWantToFind').'%')
										->orWhere('moneyOfOrder','LIKE','%'.$request->input('inforWantToFind').'%')
                                        ->orWhere('dateOfOrder','LIKE','%'.$request->input('inforWantToFind').'%')
                                        ->orWhere('totalNumberOfBook','LIKE','%'.$request->input('inforWantToFind').'%')->get();
										
										
		return responseUtil::respondedSuccess("pages.get.getAllAccount-success", $allOrder);
	}

    public function doGetInfor(Request $request){
		$conditions = array(
			['orderId' => $request->input('orderId')],
		);
		$arrayOrderDetails = DB::table('order_details')->where($conditions)->first();
		if ($arrayOrderDetails) {
			return responseUtil::respondedSuccess("pages.getinfor.getInforUser-successfull",$arrayOrderDetails);
		}else{
			return responseUtil::respondedNotFound("pages.getinfor.getInforUser-notfound");
		}

	}

	public function doDeleteOrder(Request $request){
		error_log("abc");
		$array = ['orderId' => $request->input('orderId'),];

		$existsOrder = DB::table('orders')->where($array)->first();
		
        if ($existsOrder) {
			$conditions=['orderId'=>$existsOrder->OrderId];
            $orderDelete=DB::table('orders')->where($conditions)->delete();
            $orderDelete=DB::table('order_details')->where($conditions)->delete();
			
			return responseUtil::respondedSuccess("pages.changes-password-success", $orderDelete);

        }else{
            return responseUtil::respondedNotFound("cannot find this Order in database");
        }
	}

}
