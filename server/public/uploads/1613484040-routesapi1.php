<?php

/*
|--------------------------------------------------------------------------
| WEB API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// AUTH APIs
Route::post('api/auth/password-setup', array('as'=>'apiPasswordSetup','uses'=>'AuthController@setupPassword', 'middleware'=>['api','cors']));
Route::get('api/auth/verify-token', array('as'=>'apiVerifyToken','uses'=>'AuthController@verifyPasswordToken', 'middleware'=>['api','cors']));
Route::get('api/auth/validate-reset-link', array('as'=>'apiValidateResetPasswordLink','uses'=>'AuthController@validateResetPasswordLink', 'middleware'=>['api','cors']));
Route::get('api/auth/request-reset-password', array('as'=>'apiRequestResetPassword','uses'=>'AuthController@requestResetPassword', 'middleware'=>['api','cors']));
Route::post('api/auth/reset-password', array('as'=>'apiResetPassword','uses'=>'AuthController@resetPassword', 'middleware'=>['api','cors']));

//SAMPLE API

// Route::get('api/samples/find', array('as'=>'apiSamplesFind','uses'=>'SampleController@find', 'middleware'=>['api','cors']));
// Route::get('api/samples/get', array('as'=>'apiSamplesGet','uses'=>'SampleController@get', 'middleware'=>['api','cors']));
// Route::post('api/samples/store', array('as'=>'apiSamplesStore','uses'=>'SampleController@store', 'middleware'=>['api','cors']));
// Route::post('api/samples/update', array('as'=>'apiSamplesUpdate','uses'=>'SampleController@update', 'middleware'=>['api','cors']));
// Route::post('api/samples/destroy', array('as'=>'apiSamplesDestroy','uses'=>'SampleController@destroy', 'middleware'=>['api','cors']));

//products
Route::post('api/products/find', array('as'=>'apiProductsFind','uses'=>'ProductController@find', 'middleware'=>'cors'));
Route::post('api/products/old-find', array('as'=>'apiProductsOldFind','uses'=>'ProductController@oldFind', 'middleware'=>'cors'));
Route::get('api/products/get', array('as'=>'apiProductsGet','uses'=>'ProductController@get', 'middleware'=>'cors'));
Route::get('api/products/search', array('as'=>'apiProductsSearch','uses'=>'ProductController@search', 'middleware'=>'cors'));
Route::get('api/search/suggestion', array('as'=>'apiProductsSearchSuggestion','uses'=>'ProductController@searchSuggestion', 'middleware'=>'cors'));

Route::get('api/products/caboodle_get', array('as'=>'apiProductsCaboodleGet','uses'=>'ProductController@caboodleGet', 'middleware'=>'cors'));
Route::get('api/products/periwinkle_get', array('as'=>'apiProductsPeriwinkleGet','uses'=>'ProductController@periwinkleGet', 'middleware'=>'cors'));
Route::get('api/products/get-by-multiple-filters', array('as'=>'apiProductsGetByMultipleFilters','uses'=>'ProductController@getByMultipleFilters', 'middleware'=>'cors'));
Route::get('api/products/get-best-products', array('as'=>'apiProductsGetBestProducts','uses'=>'ProductController@getBestProducts', 'middleware'=>'cors'));

/* PRODUCTS GET BY */
Route::get('api/products/get_by_category', array('as'=>'apiProductsGetByCategory','uses'=>'ProductController@getByCategory', 'middleware'=>'cors'));
Route::get('api/products/get-featured', array('as'=>'apiProductsFeatured','uses'=>'ProductController@getFeatured', 'middleware'=>'cors'));

Route::post('api/products/store', array('as'=>'apiProductsStore','uses'=>'ProductController@store', 'middleware'=>'cors'));
Route::post('api/products/update', array('as'=>'apiProductsUpdate','uses'=>'ProductController@update', 'middleware'=>'cors'));
Route::post('api/products/destroy', array('as'=>'apiProductsDestroy','uses'=>'ProductController@destroy', 'middleware'=>'cors'));
Route::get('api/products/getFilteredProducts', array('as'=>'apiProductsGetFilteredProducts','uses'=>'ProductController@getFilteredProducts', 'middleware'=>'cors'));
Route::post('api/product_reviews/store', array('as'=>'apiProductReviewsStore','uses'=>'ProductReviewController@store', 'middleware'=>'cors'));
Route::post('api/product_reviews/flag', array('as'=>'apiFlagReviewsStore','uses'=>'ProductReviewController@flagReview', 'middleware'=>'cors'));
Route::post('api/product_reviews/load_more', array('as'=>'apiLoadMoreReviews','uses'=>'ProductReviewController@loadMore', 'middleware'=>'cors'));
Route::post('api/product/notification', array('as'=>'apiProductNotification','uses'=>'ProductController@notification', 'middleware'=>'cors'));
Route::get('api/product/reviewed_product/get', array('as'=>'apiReviewedProduct','uses'=>'ProductReviewController@getReviewedProduct', 'middleware'=>'cors'));

Route::post('api/products/related', array('as'=>'apiProductsRelated','uses'=>'ProductController@related', 'middleware'=>'cors'));
Route::post('api/products/multiple/related', array('as'=>'apiProductsMultipleRelated','uses'=>'ProductController@get_multiple_related_products', 'middleware'=>'cors'));
Route::post('api/home', array('as'=>'apiHomepage','uses'=>'ProductController@home', 'middleware'=>'cors'));
Route::get('api/new-arrivals', array('as'=>'apiNewArrivals','uses'=>'ProductController@new_arrivals', 'middleware'=>'cors'));
Route::get('api/best-sellers', array('as'=>'apiBestSellers','uses'=>'ProductController@best_sellers', 'middleware'=>'cors'));
Route::get('api/get/announcements', array('as'=>'getAnnouncements','uses'=>'PageController@getAnnouncements', 'middleware'=>'cors'));

Route::get('api/products/flashsale', array('as'=>'apiFlashsale','uses'=>'ProductController@get_flash_sale', 'middleware'=>'cors'));
Route::get('api/products/upcoming-flashsale', array('as'=>'apiUpcomingFlashsale','uses'=>'ProductController@get_upcoming_flash_sale', 'middleware'=>'cors'));

// GET ALL TAGS WITH PRODUCT
Route::get('api/products/tags', array('as'=>'apiProductTags','uses'=>'ProductController@getProductTags', 'middleware'=>'cors'));

Route::post('api/orders/sync-cart', array('as'=>'apiOrdersSyncCart','uses'=>'OrderController@syncCart', 'middleware'=>['api','cors', 'jwt-auth']));
Route::get('api/orders/user/cart', array('as'=>'apiOrderUserCart','uses'=>'OrderController@getUserCart', 'middleware'=>['api','cors', 'jwt-auth']));
Route::post('api/orders/checkout', array('as'=>'apiOrdersCheckout','uses'=>'OrderController@saveCheckout', 'middleware'=>['api','cors']));
Route::post('api/orders/place', array('as'=>'apiOrdersPlace','uses'=>'OrderController@place', 'middleware'=>['api','cors']));
Route::post('api/guest/email/validate', array('as'=>'apiOrderEmailChecker','uses'=>'OrderController@emailChecker', 'middleware'=>['api','cors']));
Route::get('api/orders/history', array('as'=>'apiOrdersHistory','uses'=>'OrderController@history', 'middleware'=>['api','cors','jwt-auth']));
Route::get('api/orders/status', array('as'=>'apiOrdersStatus','uses'=>'OrderController@status', 'middleware'=>['api','cors']));
Route::get('api/checkout/process_paynamics', array('as'=>'apiCheckoutProcessPaynamics','uses'=>'CheckoutController@process_paynamics', 'middleware'=>['api']));

/* CHECKOUT */
Route::post('api/checkout/find', array('as'=>'apiCheckoutFind','uses'=>'CheckoutController@find', 'middleware'=>['api','cors']));
Route::post('api/checkout/save/customer-info', array('as'=>'apiCheckoutSaveCustomerInfo','uses'=>'CheckoutController@saveCustomerInformation', 'middleware'=>['api','cors']));
Route::post('api/coupon/apply', array('as'=>'apiCouponValidate','uses'=>'CheckoutController@validateCoupon', 'middleware'=>['api','cors']));

Route::get('api/coupon/validate', array('as'=>'apiCouponValidateV2','uses'=>'CheckoutController@validate_coupon', 'middleware'=>['api','cors']));

Route::post('api/checkout/save/address', array('as'=>'apiCheckoutSaveAddress','uses'=>'CheckoutController@saveAddress', 'middleware'=>['api','cors']));
Route::get('api/checkout/get_addons', array('as'=>'apiCheckoutAddons','uses'=>'CheckoutController@getAddons', 'middleware'=>['api','cors']));
Route::get('api/checkout/bank_details', array('as'=>'apiCheckoutAddons','uses'=>'CheckoutController@getBankDetails', 'middleware'=>['api','cors']));
Route::get('api/bae_address', array('as'=>'apiBaeAddress','uses'=>'CustomerController@bae_address', 'middleware'=>'cors'));
Route::get('api/get_bae_ncr_address', array('as'=>'apiNCRAvailbleBaeAddress','uses'=>'CustomerController@get_bae_ncr_address', 'middleware'=>'cors'));

/* CHECKOUT PAYMENT VIEWS */
Route::get('api/checkout/payment/redirect/success/{token}', array('as'=>'apiCheckoutPaymentRedirectSuccess','uses'=>'CheckoutController@payment_success', 'middleware'=>['api','cors']));
Route::get('api/checkout/payment/redirect/cancelled', array('as'=>'apiCheckoutPaymentRedirectCancelled','uses'=>'CheckoutController@payment_cancelled', 'middleware'=>['api','cors']));
Route::post('api/checkout/payment/redirect/notif/{slug}', array('as'=>'apiCheckoutPaymentRedirectNotif','uses'=>'CheckoutController@payment_notif', 'middleware'=>['api', 'frame']));


Route::post('api/shipping/fee', array('as'=>'appShippingFee','uses'=>'OrderController@getShippingFee', 'middleware'=>['api','cors']));
// Route::post('api/order/email-confirmation', array('as'=>'apiOrderEmailConfirmation','uses'=>'OrderController@emailConfirmation', 'middleware'=>['api','cors']));

/* CATEGORIES */
Route::get('api/categories/parents', array('as'=>'apiCategoriesParents','uses'=>'ProductCategoryController@parents', 'middleware'=>'cors'));

Route::get('api/categories/all', array('as'=>'apiCategoriesAll','uses'=>'ProductCategoryController@all', 'middleware'=>'cors'));
Route::get('api/categories/tree', array('as'=>'apiCategoriesTree','uses'=>'ProductCategoryController@tree', 'middleware'=>'cors'));

/* VENDORS */
Route::get('api/brands', array('as'=>'apiBrands','uses'=>'VendorController@get', 'middleware'=>'cors'));

// CUSTOMERS
Route::post('api/customers/create-address', array('as'=>'apiCustomersCreateAddress','uses'=>'CustomerController@create_address', 'middleware'=>['api','cors']));
Route::post('api/customers/update-address', array('as'=>'apiCustomersUpdateAddress','uses'=>'CustomerController@update_address', 'middleware'=>['api','cors']));
Route::post('api/customers/delete-address', array('as'=>'apiCustomersUpdateAddress','uses'=>'CustomerController@delete_address', 'middleware'=>['api','cors', 'jwt-auth']));
Route::post('api/customers/set-default-address', array('as'=>'apiCustomersSetDefaultAddress','uses'=>'CustomerController@set_default_address', 'middleware'=>['api','cors', 'jwt-auth']));
Route::post('api/customers/add_wish_list', array('as'=>'apiCustomersAddWishList','uses'=>'CustomerController@addWishList', 'middleware'=>['api','jwt-auth']));
Route::post('api/customers/load_wish_list', array('as'=>'apiCustomersLoadWishList','uses'=>'CustomerController@loadWishList', 'middleware'=>['api','jwt-auth']));
Route::post('api/customers/remove_wish_list', array('as'=>'apiCustomersRemoveWishList','uses'=>'CustomerController@removeWishList', 'middleware'=>['api','jwt-auth']));
Route::post('api/options/address', array('as'=>'apiOptionsAddress','uses'=>'CustomerController@options_address', 'middleware'=>'cors', 'jwt-auth'));
Route::get('api/options/cities/{province_id?}', array('as'=>'apiOptionsCities','uses'=>'CustomerController@get_cities', 'middleware'=>'cors'));
Route::get('api/options/areas/{city_id?}', array('as'=>'apiOptionsAreas','uses'=>'CustomerController@get_areas', 'middleware'=>'cors'));
Route::get('api/customers/get-customer-order', array('as'=>'apiCustomersCustomerOrder','uses'=>'CustomerController@paginateOrder', 'middleware'=>['api','cors','jwt-auth']));
Route::get('api/customers/available-credits', array('as'=>'apiCustomerGetAvailableCredits','uses'=>'CustomerController@get_available_credits', 'middleware'=>['api','cors','jwt-auth']));


Route::post('api/customers/update-details', array('as'=>'apiCustomersUpdateDetails','uses'=>'CustomerController@update_user_details', 'middleware'=>['api','cors','jwt-auth']));
Route::patch('api/customers/update-password', array('as'=>'apiCustomersUpdatePassword','uses'=>'CustomerController@update_user_password', 'middleware'=>['api','cors','jwt-auth']));
Route::patch('api/customers/create-password', array('as'=>'apiCustomersCreatePassword','uses'=>'CustomerController@create_user_password', 'middleware'=>['api','cors','jwt-auth']));
Route::get('api/customers/get-active-cod', array('as'=>'apiCustomerGetActiveCod','uses'=>'CustomerController@get_active_cod_order', 'middleware'=>['api','cors','jwt-auth']));

Route::post('api/oauth/login', array('as'=>'apiFbLogin','uses'=>'AuthController@oauth_login', 'middleware'=>['api','cors']));
Route::post('api/oauth/connect/account', array('as'=>'apiConnectToOAuth','uses'=>'AuthController@oauth_connect', 'middleware'=>['api','cors','jwt-auth']));
//Site Option
Route::get('api/get-currency', array('as'=>'apiGetSiteOptionController','uses'=>'SiteOptionController@getCurrency', 'middleware'=>['api','cors']));
Route::post('api/get_site_option', array('as'=>'apiGetSiteOptionController','uses'=>'SiteOptionController@getOptionsBySlug', 'middleware'=>['api','cors']));
Route::get('api/get-instagram-feed', array('as'=>'apiGetInstagramFeed','uses'=>'SiteOptionController@getInstagramFeed', 'middleware'=>['api','cors']));
Route::get('api/get-instagram-account', array('as'=>'apiGetInstagramAccount','uses'=>'SiteOptionController@getInstagramAccount', 'middleware'=>['api','cors']));
Route::get('api/instagram-return', array('as'=>'apiGetInstagramReturn','uses'=>'SiteOptionController@instagramReturn', 'middleware'=>['api','cors']));
Route::post('api/get-currency-by-location', array('as' =>'apiGetCurrencyByLocation', 'uses' => 'SiteOptionController@getCurrencyByLocation', 'middleware'=>['api','cors'] ));


// PAGES
Route::get('api/miscellaneous/find', array('as'=>'apiPagesFind','uses'=>'PageController@find', 'middleware'=>['api', 'cors']));
Route::get('api/page/{slug}', array('as'=>'apiPagesFind','uses'=>'PageController@find', 'middleware'=>['api', 'cors']));
Route::get('api/pages/socials', array('as'=>'apiPagesSocials','uses'=>'PageController@socials', 'middleware'=>['api', 'cors']));
Route::get('api/latest-articles', array('as'=>'apiLatestArticles','uses'=>'PageController@latest_articles', 'middleware'=>['api', 'cors']));
Route::get('api/featured-articles', array('as'=>'apiFeaturedArticles','uses'=>'PageController@featured_articles', 'middleware'=>['api', 'cors']));
/* CRON FUNCTION */
// Void expired pendings
Route::get('api/cron/void-pending-orders', array('as'=>'apiVoidPendingOrders','uses'=>'OrderController@cron_void_pending', 'middleware'=>['api', 'cors']));

// BRANCH 
Route::get('api/branches/list', array('as'=>'apiBranchList','uses'=>'BranchController@getList', 'middleware'=>['api', 'cors'])); 
Route::get('api/branches/all', array('as'=>'apiBranchAll','uses'=>'BranchController@all', 'middleware'=>['api', 'cors']));

Route::get('api/auth/test', array('as'=>'apiAuthTest','uses'=>'AuthController@test', 'middleware'=>['api','cors']));

// BANNERS
Route::get('api/banners/getAll', array('as'=>'apiBannerGetAll','uses'=>'BannerController@getAll', 'middleware'=>['api', 'cors'])); 

// PLANS
Route::get('api/plans/getAll', array('as'=>'apiPlansGetAll','uses'=>'PlanController@getAll', 'middleware'=>['api', 'cors'])); 

//SCHEDULES
Route::get('api/schedules/get_plan_schedule', array('as'=>'apiPlanScheduleGet','uses'=>'ScheduleController@get_plan_schedule', 'middleware'=>['api', 'cors'])); 


//TAGS or COLLECTION
Route::get('api/products/get_tags', array('as'=>'apiProductsGetTags','uses'=>'ProductController@getTags', 'middleware'=>'cors'));
Route::get('api/products/get_vendors', array('as'=>'apiProductsGetVendors','uses'=>'ProductController@getVendors', 'middleware'=>'cors'));
Route::get('api/products/find_by_tags', array('as'=>'apiProductsFindByTags','uses'=>'ProductController@findByTags', 'middleware'=>'cors'));

//ARTICLES
Route::get('api/articles/find', array('as'=>'apiArticlesFind','uses'=>'ArticleController@find', 'middleware'=>'cors'));
Route::get('api/articles/get', array('as'=>'apiArticlesGet','uses'=>'ArticleController@get', 'middleware'=>'cors'));
Route::get('api/articles/filters', array('as'=>'apiArticlesGetFilters','uses'=>'ArticleController@filters', 'middleware'=>'cors'));
Route::get('api/articles/featured', array('as'=>'apiArticlesGetFeaturedArticles','uses'=>'ArticleController@featuredArticles', 'middleware'=>'cors'));
Route::post('api/articles/post/comment', array('as'=>'apiArticlesPostComment','uses'=>'ArticleController@postComment', 'middleware'=>'cors'));
// Route::post('api/articles/store', array('as'=>'apiArticlesStore','uses'=>'ArticleController@store', 'middleware'=>'cors'));
// Route::post('api/articles/update', array('as'=>'apiArticlesUpdate','uses'=>'ArticleController@update', 'middleware'=>'cors'));
// Route::post('api/articles/destroy', array('as'=>'apiArticlesDestroy','uses'=>'ArticleController@destroy', 'middleware'=>'cors'));

//INQUIRY
Route::post('api/inquiry/send', array('as'=>'apiInquirySend','uses'=>'InquiryController@save', 'middleware'=>['api', 'cors']));

//api/miscellaneous/findIBER
Route::post('api/subscriber/send', array('as'=>'apiSubscriberStore','uses'=>'SubscriberController@store', 'middleware'=>['api', 'cors']));

//COLLECTION
Route::get('api/collection/list', array('as'=>'apiCollectionList','uses'=>'CollectionController@getList', 'middleware'=>'cors'));
Route::get('api/collection/products', array('as'=>'apiCollectionProducts','uses'=>'CollectionController@products', 'middleware'=>'cors'));

//SUGGESTED IMPORTANT DATES
Route::get('api/suggested_important_dates/find', array('as'=>'apiSuggestedImportantDatesFind','uses'=>'SuggestedImportantDateController@find', 'middleware'=>['api', 'cors']));


//IMPORTANT DATES
Route::get('api/important_dates/find', array('as'=>'apiImportantDatesFind','uses'=>'ImportantDateController@find', 'middleware'=>['api', 'cors','jwt-auth']));
Route::post('api/important_dates/store', array('as'=>'apiImportantDatesStore','uses'=>'ImportantDateController@store', 'middleware'=>['api', 'cors','jwt-auth']));
Route::patch('api/important_dates/update', array('as'=>'apiImportantDatesUpdate','uses'=>'ImportantDateController@update', 'middleware'=>['api', 'cors','jwt-auth']));
Route::delete('api/important_dates/delete', array('as'=>'apiImportantDatesDelete','uses'=>'ImportantDateController@destroy', 'middleware'=>['api', 'cors','jwt-auth']));



/* GLOBE LABS SMS */
Route::get('api/globe-labs/redirect', array('as'=>'apiGlobeLabsRedirect','uses'=>'GlobeLabsController@redirect', 'middleware'=>['api']));
Route::post('api/globe-labs/notify', array('as'=>'apiGlobeLabsNotify','uses'=>'GlobeLabsController@notify', 'middleware'=>['api']));
Route::get('api/globe-labs/send-sms', array('as'=>'apiGlobeLabsSend','uses'=>'GlobeLabsController@sendSms', 'middleware'=>['api']));



// SUBSCRIPTION
Route::get('api/subscription/items', array('as' => 'apiSubscriptionProducts', 'uses'=>'SubscriptionController@getSubscriptionItems', 'middleware'=>['api', 'cors']));
Route::post('api/subscription/checkout', array('as' => 'apiSubscriptionCheckout', 'uses'=>'SubscriptionController@checkout', 'middleware'=>['api', 'cors', 'jwt-auth']));
Route::post('api/subscription/renew', array('as'=>'apiSubscriptionRenew', 'uses'=>'SubscriptionController@paynamicsRenew', 'middleware'=>['api', 'cors']));

Route::get('api/subscription/user', array('as'=>'apiSubscriptionUser', 'uses'=>'SubscriptionController@userSubscription', 'middleware'=>['api', 'cors', 'jwt-auth']));
Route::post('api/subscription/update', array('as'=>'apiSubscriptionUpdate', 'uses'=>'SubscriptionController@update', 'middleware'=>['api','cors','jwt-auth']));
Route::get('api/subscription/status', array('as'=>'apiSubscriptionUser', 'uses'=>'SubscriptionController@check_subscription_status', 'middleware'=>['api', 'cors', 'jwt-auth']));

/* CRON CONTROLLER */
Route::get('api/scheduler/update-currency', array('as'=>'apiSchedulerUpdateCurrency','uses'=>'CronController@update_currency', 'middleware'=>['api']));
Route::get('api/scheduler/auto-void', array('as'=>'apiSchedulerAutoVoid','uses'=>'CronController@auto_void', 'middleware'=>['api']));
Route::get('api/scheduler/apply-credits', array('as'=>'apiSchedulerApplyCredits','uses'=>'CronController@applyCredits', 'middleware'=>['api']));
Route::get('api/scheduler/stock-announcement', array('as'=>'apiStockAnnouncement','uses'=>'CronController@stockAnnouncement', 'middleware'=>['api']));

//ZONES API
Route::get('api/zones/country_list', array('as'=>'apiCountryList','uses'=>'SiteOptionController@countryList', 'middleware'=>['api']));
Route::get('api/zones/province_list', array('as'=>'apiProvinceList','uses'=>'SiteOptionController@provinceList', 'middleware'=>['api']));
Route::get('api/zones/city_list', array('as'=>'apiCityList','uses'=>'SiteOptionController@cityList', 'middleware'=>['api']));
Route::get('api/zones/area_list', array('as'=>'apiAreaList','uses'=>'SiteOptionController@areaList', 'middleware'=>['api']));

Route::get('api/language/change', array('uses'=>'SiteOptionController@changeLanguage', 'middleware'=>['api']));
Route::get('api/language/get-all-languages', array('uses'=>'SiteOptionController@getLanguages', 'middleware'=>['api']));


// WAITLIST
Route::post('api/customers/add_wait_list', array('as'=>'apiCustomersAddWaitList','uses'=>'CustomerController@addWaitList', 'middleware'=>['api','jwt-auth']));
Route::post('api/customers/load_wait_list', array('as'=>'apiCustomersLoadWaaitList','uses'=>'CustomerController@LoadWaitList', 'middleware'=>['api','jwt-auth']));
Route::post('api/customers/remove_wait_list', array('as'=>'apiCustomersAddWaitList','uses'=>'CustomerController@removeWaitList', 'middleware'=>['api','jwt-auth']));

/* CREDIT HISTORY */
Route::get('api/credit_histories/get', array('as'=>'apiBannerGet','uses'=>'CreditHistoryController@get', 'middleware'=>['api', 'cors'])); 

/* Pending Reviews */
Route::get('api/pending_reviews/find', array('as'=>'apiPendingReviewsFind','uses'=>'PendingReviewController@find', 'middleware'=>'cors'));
Route::get('api/pending_reviews/get', array('as'=>'apiPendingReviewsGet','uses'=>'PendingReviewController@get', 'middleware'=>'cors'));
Route::post('api/pending_reviews/find_customer_product_review', array('as'=>'apiPendingReviewsGet','uses'=>'PendingReviewController@findByProdAndCustomer', 'middleware'=>'cors'));
Route::post('api/pending_reviews/store', array('as'=>'apiPendingReviewsStore','uses'=>'PendingReviewController@store', 'middleware'=>'cors'));
Route::post('api/pending_reviews/update', array('as'=>'apiPendingReviewsUpdate','uses'=>'PendingReviewController@update', 'middleware'=>'cors'));
Route::post('api/pending_reviews/destroy', array('as'=>'apiPendingReviewsDestroy','uses'=>'PendingReviewController@destroy', 'middleware'=>'cors'));

/* PAYPAL WEBHOOK */
Route::post('api/paypal-notify', array('as'=>'apiPaypalNotify','uses'=>'TransactionController@paypalNotify', 'middleware'=>['api'])); 

/* TRANSLATION */
Route::get('api/static-translations', array('as'=>'apiStaticTranslation','uses'=>'TranslationController@static_translation', 'middleware'=>['api']));


// COINS
Route::get('api/checkout/coins_link', array('as'=>'apiCheckoutProcessCoins','uses'=>'CheckoutController@handleCoinsPayment', 'middleware'=>['api','cors']));
Route::get('api/checkout/callback', array('as'=>'apiCheckoutCallBack','uses'=>'CheckoutController@hanldeCoinsPaymentConfirmation', 'middleware'=>['api','cors']));
Route::post('api/checkout/callback', array('as'=>'apiCheckoutCallBack','uses'=>'CheckoutController@hanldeCoinsPaymentConfirmation', 'middleware'=>['api','cors']));

// PAGE POPUPS
Route::get('api/popup/getPagepopup', array('as'=>'apiPagePopup','uses'=>'PagePopupController@getPagePopup', 'middleware'=>['api','cors']));

// Redeem Gift Cards
Route::post('api/redeem-gc', array('as'=>'apiRedeemGiftCards','uses'=>'GiftCardController@redeem', 'middleware'=>['api','cors']));
