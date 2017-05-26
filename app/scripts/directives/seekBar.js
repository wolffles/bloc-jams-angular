(function() {
    function seekBar($document) {
        
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent
        };
        
        //link directive logic to the DOM: scope and link below.
        // scope : specifies a new scope be created for the directive
        // link Responsible for regisering DOM listeners and updating the DOM. This is where we put most of the directive logic. but all logic that manipulates dom will go.
            // link functions take the same argument in strict order. altering order will cause errors
            /*  1The link method's first argument is its scope object. Attributes and methods on the scope object are accessible within the directive's view.
                2The second argument is the jqLite-wrapped element that the directive matches.
                3The third argument is a hash of attributes with which the directive was declared. If we declare <seek-bar> with no attributes in the HTML, then this hash will be empty.
                */
        return{
            templateUrl: '/templates/directives/seek_bar.html',
            replace:true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes){
                scope.value = 0;
                scope.max = 100;
                
                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue){
                    scope.value = newValue;
                });
                
                attributes.$observe('max', function(newValue){
                    scope.max = newValue;
                });
                
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                scope.fillStyle = function(){
                    return {width: percentString()};
                };
                scope.thumbStyle = function(){
                    return {left: percentString()}
                }
                
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });
                    $document.bind('mouseup.thumb', function(){
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();


 /*(function() {angular.module('blocJams').directives('seekBar', 
    function seekBar(){
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace:true,
            restrict: 'E'
        };
    })
})*/