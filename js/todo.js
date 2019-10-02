
$(document)
    .ready(function () {
        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        function appendItems(){
            var str1 = '<li id="' + generateUUID() +'" class=""> <input name="done-todo" type="checkbox" class="done-todo"><span>' + $('.input-text').val() + '</span></li>';
            $('ol').append(str1);
        }

        function updateViewListCheckBox(element){
            var listId = '#' + $(element.parentElement).attr('id');

            if($(listId).hasClass('checked')){
                $(listId).removeClass();
            }else{
                $(listId).attr('class','checked');
            }
        }

        // code to be implemented

        $('#button').click(function(){
            appendItems();
        });

        $(document).on('click', '.done-todo' , function() {
            updateViewListCheckBox(this);
        });

        $(document).on('dblclick', 'li' , function(e) {
            $(this).children('span').attr('contenteditable', 'true').focus();
            $(this).keypress(function(e){
                if(e.keyCode == 13){
                    // $(this).html($(this).text());
                    $(this).children('span').attr('contenteditable', 'false').focus();
                }
            });
        });

        $('#filters li a').on('click', function(){
            var condition = this.text;
            $('ol li').each(function(){
                var listElements = this;
                if(condition == "ALL"){
                    $(listElements).show();
                }
                else if (condition == "Active"){
                    if($(listElements).hasClass('checked')){
                        $(listElements).hide();
                    }
                    else{
                        $(listElements).show();
                    }
                }
                else{
                    if(!$(listElements).hasClass('checked')){
                        $(listElements).hide();
                    }
                    else{
                        $(listElements).show();
                    }
                }
            });
        });
    });

    