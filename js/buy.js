let cart = [];

const names = ['Video Suite', 'Video Suite + Photo Editor'];

const renderItems = () => {
  $('#cartItems').text('');
  $.each(cart, (index, item) => {
    addItem(index, item);
  })
}

const addItem = (id, type) => {
  const attributes = {
    'id': `cartItem-${id}`,
    'class': `cart-item`,
  }

  const elem = $('<div></div>').attr(attributes);
  const img = '<img src="img/product.png" width="134" height="75" class="cart-item__img" alt="product-img">';
  const text = $('<div class="cart-item__text"></div>');

  const name = names[type];
  const price = priceByTimer(type);

  text
    .append($('<div class="cart-item__name"></div>').text(name))
    .append($('<div class="cart-item__price"></div>').text(`${price} руб.`))
    .append($('<button class="cart-item__btn-del"></button>')
      .attr('id', `btnDelete`)
      .text('Delete'));

  elem
    .append(img)
    .append(text);
  elem.appendTo('#cartItems');
}

const loadCart = () => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

$('#btnDeleteAll').click(() => {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  $('#cartItems').text('');
  renderSum();
})

$('#buyProduct').click(() => {
  cart.push(0);
  addItem(cart.length - 1, 0);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderSum();
})

$('#buyProductBest').click(() => {
  cart.push(1);
  addItem(cart.length - 1, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderSum();
})

const renderSum = () => {
  const goodsSecond = cart.reduce((a, b) => a + b, 0);
  const goodsFirst = cart.length - goodsSecond;

  const sum = goodsFirst * priceByTimer(0) + goodsSecond * priceByTimer(1);

  $('#basketModalLink').text(`${sum} руб.`);
  $('#totalSum').text(`${sum} руб.`);
}

document.addEventListener('DOMContentLoaded', loadCart);
document.addEventListener('DOMContentLoaded', renderItems);
document.addEventListener('DOMContentLoaded', renderSum);
