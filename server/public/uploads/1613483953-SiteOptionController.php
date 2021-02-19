<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Bank;
use App\Customer;
use App\User;
use App\CustomerAddress;
use App\Province;
use App\Country;
use App\City;
use App\Area;
use App\Order;
use App\Currency;
use App\Language;
use App\StaticTranslation;

use Validator;
use Acme\Facades\Option;
use App\Option as OptionModel;
use SumoMail;
use Auth;
use Hash;
use JWTAuth;
use Session;
use Acme\Facades\General;

class SiteOptionController extends Controller
{	
	public function getCurrencyByLocation(Request $request){
		
		$input = $request->all(); 

		$client  = @$_SERVER['HTTP_CLIENT_IP'];
		$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
		$remote  = @$_SERVER['REMOTE_ADDR'];
		$result  = array('country'=>'', 'city'=>'', 'currencyCode' => '');
		
		if(filter_var($client, FILTER_VALIDATE_IP)){
			$ip = $client;
		}elseif(filter_var($forward, FILTER_VALIDATE_IP)){
			$ip = $forward;
		}else{
			$ip = $remote;
		}
		$ip_data = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=".$ip));    
		if($ip_data && $ip_data->geoplugin_countryName != null){
			$result['country'] = $ip_data->geoplugin_countryCode;
			$result['city'] = $ip_data->geoplugin_city;
			$result['currencyCode'] = $ip_data->geoplugin_currencyCode;
		}

		$currency_location = Currency::where('short_name', @$result['currencyCode'])->first();
		if (!$currency_location) $currency_location = Option::getCurrency(['currencies.short_name', 'currencies.symbol']);
		$currency_config = OptionModel::where('slug', 'currency-config')->first();
		$default_currency = OptionModel::where('slug', 'currency')->first();

		$user = false;

		if(isset($input['token'])){
			$user = JWTAuth::toUser($input['token']);
		}
		
		//config for scenario 1 to be scenario A and 2 for scenario B
		if($currency_config->value == 1){
			if($user){
				$currency_data = $currency_location;
			}else{
				$currency_data  = Option::getCurrency(['currencies.short_name', 'currencies.symbol']);
			}
		}else{
			$currency_data  = $currency_location;
		}
		$currency['short_name'] = $currency_data->short_name;
		$currency['symbol'] = $currency_data->symbol;

		if (! is_null($currency)) {
            $response['data'] = $currency;
            $response['message'] = 'Successfully retrieved data.';
            $status = 200;
        } else {
            $response['message'] = 'Failed to retrieve data.';
            $status = 500;
        }

		return $response;

	}

    public function getCurrency()
    {
        $response = [];
        $data = Option::getCurrency();

        if (! is_null($data)) {
            $response['data'] = $data;
            $response['message'] = 'Successfully retrieved data.';
            $status = 200;
        } else {
            $response['message'] = 'Failed to retrieve data.';
            $status = 500;
        }

        return response($response, $status);
	}

    public function getInstagramFeed()
    {
        $response = [];
		$data = General::getIGPosts();

        if (! is_null($data)) {
            $response['data'] = $data;
            $response['message'] = 'Successfully retrieved data.';
            $status = 200;
        } else {
            $response['message'] = 'Failed to retrieve data.';
            $status = 500;
        }

        return response($response, $status);
	}

	public function getInstagramAccount()
	{
		$option = OptionModel::where('slug', 'instagram-access-token')->first();
		
		if (! is_null($option)) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, 'https://graph.instagram.com/me?fields=id,username&access_token=' . $option->value);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			$data = curl_exec($ch);
			curl_close($ch);
			$data = @json_decode($data);
			
			if (@$data->id) {
				$response['data'] = $option->value;
				$response['message'] = 'Successfully retrieved data.';
				$status = 200;
			} else {
				$response['message'] = 'Instagram not connected.';
				$status = 500;
			}
        } else {
            $response['message'] = 'Instagram not connected.';
            $status = 500;
        }

        return response($response, $status);
	}
	
	//params array of slug
	public function getOptionsBySlug(Request $request) {
		$input = $request->all();
		$response = [];
		$data = [];
		if (isset($input['slug']) && count($input['slug'])>0) {
			foreach ($input['slug'] as $slug) {
				$option = OptionModel::where('slug',$slug)->first();

				if ($option) {
					$data[] = $option;
				}

			}
		} else {
            $response['data'] = $data;
            $response['message'] = 'Empty data.';
			$status = 200;
			
       		return response($response, $status);
		}
		
		$response['data'] = $data;
		$response['message'] = 'Sucessfully retrieved data.';
		$status = 200;
        return response($response, $status);
		
	}

	public function instagramReturn(Request $request)
	{
		$input = $request->all();

		$option = OptionModel::whereIn('slug', ['instagram-access-token', 'instagram-user-id'])->get();
		
		if (count($option) > 1 && isset($input['code']) && @$input['code'] != '') {

			$access_token_url = 'https://api.instagram.com/oauth/access_token';

			$access_token_data = [
				'client_id' => getenv('INSTAGRAM_ID'),
				'client_secret' => getenv('INSTAGRAM_SECRET'),
				'grant_type' => 'authorization_code',
				'redirect_uri' => route("apiGetInstagramReturn"),
				'code' => $input['code']
			];
			
			$ch = curl_init();
			
			$headers[] = "Content-Type: multipart/form-data";
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			curl_setopt($ch, CURLOPT_URL, $access_token_url);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $access_token_data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			
			$data = curl_exec($ch);
			curl_close($ch);
			$data = @json_decode($data);
			
			if(count($data) > 0 && @$data->access_token != null) {

				$access_token = $data->access_token;
			} else {
				$response['message'] = 'Token not found.';
				$status = 500;

				return response($response, $status);
			}

			OptionModel::where('slug', 'instagram-user-id')->update(['value' => $data->user_id]);

			$long_live_token = $this->getIGLongLiveToken($data);
			if(@$long_live_token->access_token != null) {
				$access_token = $long_live_token->access_token;
			}

			if(@$access_token != '') {
				$access_token = OptionModel::where('slug', 'instagram-access-token')->update(['value' => $access_token]);
			}

            $response['data'] = $access_token;
            $response['message'] = 'Logged in successfully.';
            $status = 200;
        } else {
            $response['message'] = 'Token not found.';
            $status = 500;
        }

        return response($response, $status);
	}

	public function getIGLongLiveToken($data) {

		$access_token_url = 'https://graph.instagram.com/access_token?';

		$access_token_data = [
			'grant_type' => 'ig_exchange_token',
			'client_secret' => getenv('INSTAGRAM_SECRET'),
			'access_token' => $data->access_token,
		];

		$post_fields = http_build_query($access_token_data);

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $access_token_url . $post_fields);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		
		$data = curl_exec($ch);
		curl_close($ch);
		$data = @json_decode($data);
		return $data;

	}


	public function countryList() {

		$data = Country::get();

		$response['data'] = $data;
		$response['message'] = 'Countries successfully retrieved.';
		$status = 200;
			
        return response($response, $status);
	}

	public function provinceList() {

		$data = Province::get();

		$response['data'] = $data;
		$response['message'] = 'Provinces successfully retrieved.';
		$status = 200;
			
        return response($response, $status);
	}

	public function cityList(Request $request) {

		$input = $request->all();

		if(@$input['name']) {
			$data = City::where('name', 'LIKE', $input['name'] . '%')->limit(20)->get();
		} else {
			$data = City::limit(20)->get();
		}

		$response['data'] = $data;
		$response['message'] = 'Cities successfully retrieved.';
		$status = 200;
			
        return response($response, $status);
	}

	public function areaList(Request $request) {

		$input = $request->all();
		if(@$input['name']) {
			$data = Area::where('name', 'LIKE', $input['name'] . '%')->limit(20)->get();
		} else {
			$data = Area::limit(20)->get();
		}

		$response['data'] = $data;
		$response['message'] = 'Areas successfully retrieved.';
		$status = 200;
			
        return response($response, $status);
	}

	public function changeLanguage(Request $request)
	{
		$response = [];
		$input = $request->all();
		// dd(session()->get('language_id'));
		session()->put('language_id',$input['language_id']);
		$language = Language::where('id', $input['language_id'])->first();
		$static_translations = General::getLanguageTranslationFile(@$language->slug ? @$language->slug : '');
		
		if (! is_null($static_translations)) {
			// Session::set('language_id', $input['language_id']);
			// dd(Session::get('language_id'));			
			// dd(session()->get('language_id'));
			$response['data'] = $input['language_id'];
			$response['static_translations'] = $static_translations;
			$response['message'] = 'Language successfully changed.';
		}
		
		$status = 200;
			
        return response($response, $status);
	}

	public function getLanguages() {

		$languages = Language::get();

		$response = [];
		$response['data'] = $languages;
		$response['message'] = 'Language successfully changed.';
		
		$status = 200;
			
        return response($response, $status);
	}
}
