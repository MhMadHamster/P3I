;(function($) {

    $(document).ready(function() {

            // базовый путь к картинке, его можно поменять,
            // однако порядковый номер картинки должен обозначаться "N"
        var baseURI = 'img/model/img-hp-specked-orange-N.png',
            // количество кадров
            imgCount = 24,
            // переменная определяет какое расстояние необходимо "пройти"
            // курсором чтобы поменять картинку на 1 кадр
            turnRate = 15,
            imgLoaded = 0,
            $mainDiv = $('#main'),
            $loader = $('.loader'),
            $percent = $loader.find('.percent'),
            $mainWrapper = $('.wrapper'),
            positionsArray = [];

        // управляющие кнопки
        $('.left-arrow').click(function(e) {
            changeImgPos(turnRate * -1);
            e.preventDefault();
        });

        $('.right-arrow').click(function(e) {
            changeImgPos(turnRate);
            e.preventDefault();
        });

        $('.close').click(function(e) {
            $mainWrapper.fadeOut();
            e.preventDefault();
        });

        $('.open').click(function(e) {
            $mainWrapper.fadeIn();
            positionsArray = init3d();
            e.preventDefault();
        })

        var currentFrame = 0;

        var isDragging = false,
            mouseDown = false,
            startPos = 'undefined',
            currentPos = 'undefined';

        $mainDiv
            .mousedown(function(e) {
                isDragging = false;
                startPos = e.pageX;
            })
            .mousemove(function(e) {
                isDragging = true;
                currentPos = e.pageX;
                if (isDragging && startPos !== 'undefined' && Math.abs(startPos - currentPos) > 15) {
                    changeImgPos(startPos - currentPos);
                    startPos = currentPos;
                };
            })
            .mouseup(function() {
                isDragging = false;
                startPos = 'undefined';
            });

        $(document).mouseup(function() {
            isDragging = false;
            startPos = 'undefined';
        });

        function init3d() {
            $mainDiv.css({
                'background-image': 'url("' + baseURI.replace(/N/, 1) + '")',
                'background-position': '50% 50%'
            });

            imgLoaded++;

            for (var i = 2; i <= imgCount; i++) {
                (function(i) {
                    $('<img>').attr('src', baseURI.replace(/N/, i)).load(function() {
                        $percent.html(+$percent.html() + Math.floor(100 / imgCount));
                        imgLoaded++;
                        if (imgLoaded === imgCount) $loader.hide();
                    });
                })(i);
                $mainDiv.css({
                    'background-image': $mainDiv.css('background-image') + ', url("' + baseURI.replace(/N/, i) + '")',
                    'background-position': $mainDiv.css('background-position') + ', 50% -10000px'
                });
            };

            return $mainDiv.css('background-position').split(', ');
        }

        // меняет текущий кадр в зависимости от передаваемого числа
        // число подразумевает под собой разницу в начальном положении и текущем положении курсора
        function changeImgPos(diff) {
            diff = diff || 0;
            if (Math.abs(diff) < turnRate) return;
            var turnFrames = Math.floor(diff / turnRate);

            positionsArray[currentFrame] = positionsArray[currentFrame].replace(/\s50%/, ' -10000px');

            if ((turnFrames < 0) && (Math.abs(turnFrames) > currentFrame)) {
                currentFrame = currentFrame + imgCount + turnFrames;
            } else if ((turnFrames > 0) && (turnFrames + currentFrame > imgCount - 1)) {
                currentFrame = currentFrame + turnFrames - imgCount;
            } else {
                currentFrame += turnFrames;
            }

            positionsArray[currentFrame] = positionsArray[currentFrame].replace(/-10000px/, '50%');

            $mainDiv.css('background-position', positionsArray.join(', '));
        }

    });

})(jQuery);