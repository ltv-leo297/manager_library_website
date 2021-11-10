<?php

namespace App\Http\Utilities;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class ValidationUtil
{
	public static function checkValidRequest(Request $request, $customRules, $rulesMess)
	{
		$rule = $customRules;

		if (empty($customRules)) {
			return null;
		}

		return Validator::make($request->all(), $rule, $rulesMess);
	}
}
