describe('buyItNow a small angularJS app', function(){ //describe your object type
    beforeEach(module('buyItNow')); //load module
    describe('cartService is a provider service',function(){ //describe your app name
        beforeEach(module("buyItNow"));
        var cartService;
        beforeEach(inject(function (_cartService_){
            cartService = _cartService_;
        }));

        it('should return 3 products only', function (){
            var products = cartService.getProducts();
            expect(products.length).toBe(3);
            expect(products.length).not.toBe(5);
        });
        it('getProducts should return specific products', function (){
            var products = cartService.getProducts();
            expect(products).toContain({ name: 'TV', price: 500});
            expect(products).toContain({ name: 'Microwave', price: 150});
            expect(products).toContain({ name: 'ChromeCast', price: 70});
        });
        it('testing callbacks being called when addItemToCart fn is triggered', function (){
            var cb = function (item, q){
                console.log(item, q);
            };
            cartService.onItemsAdded(cb);
            spyOn(console, 'log');// jasmine signature: spyOn(object, method)
            var item = {name: 'TV', price: 500};
            var q = 3;
            cartService.addItemToCart(item, 3);
            expect(console.log).toHaveBeenCalledWith({name: 'TV', price: 500}, q);
        });
    });
});