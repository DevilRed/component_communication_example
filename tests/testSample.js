describe('buyItNow a small angularJS app', function(){ //describe your object type
    beforeEach(module('buyItNow')); //load module
    describe('cartService is a provider service',function(){ //describe your app name
        beforeEach(module("buyItNow"));
        var cartService;
        beforeEach(inject(function (_cartService_){
            cartService = _cartService_;
        }));

        it('should return products', function (){
            var products = cartService.getProducts();
            expect(products).not.toBe(null);
        });
    });
});