describe('Filters', function(){ //describe your object type
    beforeEach(module('workers')); //load module
    describe('reverse',function(){ //describe your app name
        var reverse;
        // beforeEach, inject  are jasmine API
        beforeEach(inject(function($filter){ //initialize your filter
            reverse = $filter('reverse',{});
        }));
        it('Should reverse a string', function(){  //write tests
            // expect, toBe  are jasmine API also
            expect(reverse('rahil')).toBe('lihar'); //pass
            expect(reverse('don')).toBe('nod'); //pass
            // expect(reverse('jam')).toBe('oops'); // this test should fail
        });
    });
});