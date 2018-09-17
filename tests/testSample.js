describe('buyItNow a small angularJS app', function(){ //describe your object type
    beforeEach(module('buyItNow')); //load module
    describe('cartService is a provider service',function(){ //describe your app name
        beforeEach(module("buyItNow"));
        var cartService;
        beforeEach(inject(function (_cartService_){
            cartService = _cartService_;
        }));

        it('should return products and not be null', function (){
            var products = cartService.getProducts();
            expect(products).not.toBe(null);
            expect(products.length).toBe(3);
        });
        it('products should definite products', function (){
            var products = cartService.getProducts();
            expect(products).toContain({ name: 'TV', price: 500});
            expect(products).toContain({ name: 'Microwave', price: 150});
            expect(products).toContain({ name: 'ChromeCast', price: 70});
        });
    });
});