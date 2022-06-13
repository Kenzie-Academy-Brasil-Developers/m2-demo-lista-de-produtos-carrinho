/*
PASSO A PASSO

1) Criar cards de Produtos
2) Renderizar cards no Container de todos os produtos
3) criar card de produtos do carrinho
4) Add card ao carrinho
5) Remover card do carrinho
6) Cálculo do vlaor total/ qtd total
*/

//1) Criar cards de Produtos

const cardProduct = (product) => {
  const li = document.createElement("li");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const ol = document.createElement("ol");
  const button = document.createElement("button");
  const div = document.createElement("div");
  const span = document.createElement("span");

  img.src = product.img;
  img.alt = product.nome;

  h3.innerText = product.nome;

  p.innerText = product.secao;
  span.innerText = product.preco;

  product.componentes.forEach((nutriente) => {
    const nutrienteCard = document.createElement("li");
    nutrienteCard.innerText = nutriente;
    ol.appendChild(nutrienteCard);
  });

  button.innerText = "Comprar";
  button.id = product.id;

  button.addEventListener("click", () => {
    addToCart(product);
  });

  div.append(span, button);
  li.append(img, h3, p, ol, div);

  return li;
};

//2) Renderizar cards no Container de todos os produtos
const createProductContainer = (arr) => {
  const divParent = document.querySelector(".containerListaProdutos");
  divParent.innerHTML = "";

  const ul = document.createElement("ul");
  arr.forEach((product) => {
    const li = cardProduct(product);
    ul.appendChild(li);
  });

  divParent.appendChild(ul);
};
createProductContainer(produtos);

// 3) criar card de produtos do carrinho

const createCardCart = (cart) => {
  const ul = document.querySelector(".containerCart--itens");

  ul.innerHTML = "";
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.id = product.id;
    const img = document.createElement("img");
    const div = document.createElement("div");
    const name = document.createElement("p");
    const category = document.createElement("span");
    const price = document.createElement("p");
    const button = document.createElement("button");
    const trash = document.createElement("img");
    trash.classList.add("trash");

    img.src = product.img;
    img.alt = product.nome;
    img.classList.add("product-img");

    name.innerText = product.nome;
    category.innerText = product.categoria;
    price.innerText = product.preco;

    trash.src = "./src/img/trash.png";
    trash.alt = "Lixeirinha";

    button.appendChild(trash);
    button.addEventListener("click", () => {
      removeFromCart(product);
    });

    div.append(name, category, price);
    li.append(img, div, button);
    ul.appendChild(li);
  });
};

let cart = [];
//4) Add card ao carrinho -- Bubbling
// const addToCart = (event) => {
//     const alvo = event.target
//     console.log(alvo.tagName)
//     if (alvo.tagName == "BUTTON") {
//         const found = produtos.find((product) => product.id == alvo.id)
//         cart.push(found)
//         createCardCart(cart)

//     }
// }
// const containerMain = document.querySelector(".containerListaProdutos")
// containerMain.addEventListener("click", addToCart)

// const removeFromCart = (event) => {
//     const alvo = event.target
//     console.log(alvo)
//     if (alvo.tagName == "BUTTON" || alvo.tagName == "IMG") {
//         const targetParentId = alvo.closest("li").id
//         const found = cart.find((product) => product.id == targetParentId.id)
//         const index = cart.indexOf(found)
//         cart.splice(index, 1)
//         createCardCart(cart)

//     }
// }

// const containerCartMain = document.querySelector(".containerCart--itens")
// containerCartMain.addEventListener("click", removeFromCart)

//Array

const addToCart = (product) => {
  cart.push(product);
  createCardCart(cart);
  totalValue();
};
// cart[i];
const removeFromCart = (product) => {
  const index = cart.indexOf(product);
  cart = cart.filter((el, i) => i !== index);
  createCardCart(cart);
  totalValue();
};

const totalValue = () => {
  const preco = document.querySelector(".containerCart--price");
  if (cart.length > 0) {
    preco.style.display = "flex";
  } else {
    preco.style.display = "none";
  }
  const qtdTotal = document.querySelector("#qtdTotal");
  const precoTotal = document.querySelector("#precoTotal");
  qtdTotal.innerText = cart.length;
  precoTotal.innerText = cart.reduce((a, b) => a + Number(b.preco), 0);
};
