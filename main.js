
// 使用建構式函式新增飲料物件
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

//add Drink prototype
Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
      defult:
      alert('No this drink')
  }
}
// new the alphaPos Instance
const alphaPos = new AlphaPos()

const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
addDrinkButton.addEventListener('click', function () {
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  console.log(`${drinkName}, ${ice}, ${sugar}`)
  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, ice, sugar)
  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink)
})

// AlphaPos Constructor Function
function AlphaPos() { }
// Constructor function for Alpha Pos System
AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`input[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}



//將飲料實例添加到飲料訂單區中的函數
const orderLists = document.querySelector('[data-order-lists]')
AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
      <div class="card-body pt-3 pr-3">
        <div class="text-right">
          <span data-alpha-pos="delete-drink">x</span>
        </div>
          <h6 class="card-title mb-1">${drink.name}</h6>
          <div class="card-text">${drink.ice}</div>
          <div class="card-text">${drink.sugar}</div>
        </div>
          <div class="card-footer text-right py-2">
            <div class="card-text card-muted">
              $<span data-drink-price>${drink.price()}</span>
            </div>
          </div>
    </div>
`
  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

//刪除功能
orderLists.addEventListener('click', function (event) {
  let isDeletButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeletButton) {
    return
  }
  //delete card element
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

//結帳功能
AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}
//清空訂單method
AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}

const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')
checkoutButton.addEventListener('click', function () {
  //1. 計算訂單總金額
  alert(`Total amount of drink is $${alphaPos.checkout()}`)
  //2. 清空訂單
  alphaPos.clearOrder(orderLists)
})


