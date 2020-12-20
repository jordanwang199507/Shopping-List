var entry = 0;
var total = 0;
$(document).ready(function(){
    $.getJSON("/api/shoppinglist")
    .then(addShoppings)
    .catch(function(err){
        console.log(err);
    })

    $('.content').keypress(function(event){
        if(event.which == 13){
            createShopping();
        }
    });

    $('#submit').on('click', function(){
        createShopping();
    });

    $('#plus').on('click', function(){
        var count = $('#shoppingQuantity').val();
        count++;
        $('#shoppingQuantity').val(count);
    })

    $('#minus').on('click', function(){
        if($('#shoppingQuantity').val()>0){
            var count = $('#shoppingQuantity').val();
            count--;
            $('#shoppingQuantity').val(count);
        }
    })

    $('.list').on('click', '.information',  function(){
        updateShopping($(this));
    })

    $('.list').on('click', '.delete', function(e){
        e.stopPropagation();
        removeShopping($(this).parent());
        // var rounded = total.toFixed(2);
        // $('.total-value').text(rounded);
    })
});

function addShoppings(shoppings){
    shoppings.forEach(function(item){
        addShopping(item);
    });
}

function addShopping(item){
    entry++;
    var newItem = $('<li class="item'+entry+
                    '"><span class="information"><span class="name">'
                    +item.name+
                    '</span><span class="price"> $ '
                    +item.price+
                    '</span><span class="quantity"> x '
                    +item.quantity+
                    '</span></span><span class="delete">X</span></li>'
    );
    var increment = item.price * item.quantity;
    total += increment;
    var rounded = total.toFixed(2);
    $('.total-value').text(rounded);
    newItem.data('id', item._id);
    newItem.data('quantity', item.quantity);
    newItem.data('completed', item.completed);
    newItem.data('type', item.type);
    newItem.data('price', item.price);
    if(item.completed){
        newItem.addClass("done");
    }
    assignClassAndAdd(item, newItem);
}

function createShopping(){
    if($('#shoppingInput').val()!== '' && $('#shoppingQuantity').val()>0 &&  $('#shoppingPrice').val()>0){
        var itemInput = $('#shoppingInput').val();
        var itemType = $('#shoppingType').val();
        var itemQuantity = $('#shoppingQuantity').val()
        var itemPrice = $('#shoppingPrice').val();
        $.post('/api/shoppinglist', {name: itemInput, type: itemType, quantity: itemQuantity, price: itemPrice})
        .then(function(newItem){
            $('#shoppingInput').val('');
            $('#shoppingType').val('');
            $('#shoppingQuantity').val('');
            $('#shoppingPrice').val('');
            addShopping(newItem);
        })
        .catch(function(err){
            console.log(err);
        })
    } else {
        if($('#shoppingInput').val()== ''){
            alert("please enter a valid item");
        } else if($('#shoppingQuantity').val()<=0){
            alert("please enter a valid quantity");
        } else if($('#shoppingPrice').val()<=0){
            alert("please enter a valid price");
        }
    }
}

function removeShopping(shopping){
    var clickedId = shopping.data('id');
    var deleteUrl = 'api/shoppinglist/' + clickedId;
    var increment = shopping.data('price') * shopping.data('quantity');
    total -= increment;
    var rounded = total.toFixed(2);
    $('.total-value').text(rounded);
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        shopping.remove();
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateShopping(item){
    var updateUrl = '/api/shoppinglist/' + item.data('id');
    var isDone = !item.data('completed');
    var updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedItem){
        item.toggleClass("done");
        item.data('completed', isDone);
    })
}

function assignClassAndAdd(item, newItem){
    if(item.type==="fruits"){
        $('.fruits').append(newItem);
    } else if(item.type ==="veggies"){
        $('.veggies').append(newItem);
    } else if(item.type ==="dairy"){
        $('.dairy').append(newItem);
    } else if(item.type ==="grains"){
        $('.grains').append(newItem);
    } else if(item.type ==="meat"){
        $('.meat').append(newItem);
    } else if(item.type ==="drinks"){
        $('.drinks').append(newItem);
    } else if(item.type ==="freezer"){
        $('.freezer').append(newItem);
    } else if(item.type ==="other"){
        $('.other').append(newItem);
    }
}