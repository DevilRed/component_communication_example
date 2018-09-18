(function (angular){
	// good resource about components: https://scotch.io/tutorials/how-to-use-angular-1-5s-component-method
	angular.module('buyItNow')
		.component('customHeader', {
			templateUrl: 'js/components/common/header/header.html',
			controller: [headerController],
			bindings: {
				logo: '@'
			}
		})
	;

	function headerController(){
		var ctrl = this;
	};
})(window.angular);