


import {refs} from "./refs";
import {userBasket, onClickBasketBackdrop, onEscKeyPressBasket, ESC_KEY_CODE} from "./basket";
import userEventApi from "./api"
import {closeModal} from "./modal"
export {onClickModalBuyBtn}



// refs.modalBuyBtn.addEventListener("click", onClickModalBuyBtn);
function onClickModalBuyBtn (event) {
    refs.miniModal.classList.toggle("hidden");
    const basketId = event.target.closest("[data-id]").dataset.id
    userBasket.addEvent(basketId)
    userBasket.increaseStandardQuantity ()
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    refs.miniModalBackdrop.addEventListener("click", onClickMiniModalBackdrop);
    window.addEventListener("keydown", onEscKeyPressMiniModal);
}
function onEscKeyPressMiniModal (event) {
    if(event.code === ESC_KEY_CODE) {
        window.removeEventListener("keydown", onEscKeyPressMiniModal);
        refs.miniModalBackdrop.removeEventListener("click", onClickMiniModalBackdrop)
        refs.miniModal.classList.toggle("hidden")
    }
}
function onClickMiniModalBackdrop (event) {
    if(event.currentTarget === event.target) {
        window.removeEventListener("keydown", onEscKeyPressMiniModal);
        refs.miniModalBackdrop.removeEventListener("click", onClickMiniModalBackdrop)
        refs.miniModal.classList.toggle("hidden")
    }
}

refs.miniModalBtnClose.addEventListener("click", onClickMiniModalBtnClose);
function onClickMiniModalBtnClose (event) {
    refs.miniModal.classList.toggle("hidden")
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    window.removeEventListener("keydown", onEscKeyPressMiniModal);
    refs.miniModalBackdrop.removeEventListener("click", onClickMiniModalBackdrop)
}



refs.miniModalBtnCart.addEventListener("click", onClickMiniModalBtnOpenBasket);
function onClickMiniModalBtnOpenBasket (event) {
    refs.miniModal.classList.toggle("hidden")
    closeModal();
    refs.basketModal.classList.toggle("hidden")
    refs.basketQuantity.textContent = userBasket.totalQuantity;
    refs.basketNum.textContent = userBasket.totalQuantity;
    if (userBasket.totalQuantity !== 0 && refs.basketContainer.classList.contains("hidden")) refs.basketContainer.classList.remove("hidden")
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
    refs.miniModalBackdrop.removeEventListener("click", onClickMiniModalBackdrop)
    window.removeEventListener("keydown", onEscKeyPressMiniModal);
    refs.basketBackdrop.addEventListener("click", onClickBasketBackdrop)
    window.addEventListener("keydown", onEscKeyPressBasket);

}

function renderBasketMarkup(data) {
  refs.basketMarkupContainer.innerHTML = '';
  let markup = '';
  data.forEach(name => {
    markup += `<li><div><div class="modal-basket__name">${name}</div></div></li>`;
  });
  refs.basketMarkupContainer.insertAdjacentHTML('beforeend', markup);
}
